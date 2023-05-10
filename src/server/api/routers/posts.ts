import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";
import { User, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    userName: `${user.firstName as string} ${user.lastName as string}`,
    profilePicture: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({ take: 100 });
    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return posts.map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.authorId),
    }));
  }),
  getAllByAuthor: privateProcedure.query(({ ctx }) => {
    const authorId = ctx?.userId;

    return ctx.prisma.post.findMany({ where: { authorId } });
  }),
  addPost: privateProcedure
    .input(z.object({ content: z.string().min(2).max(280) }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });
      return post;
    }),
  deletePost: privateProcedure
    .input(z.object({ id: z.string().nonempty() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      if (!authorId) {
        return [];
      }

      const post = await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
      return post;
    }),
});
