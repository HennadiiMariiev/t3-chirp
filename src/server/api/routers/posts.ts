import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const authorId = ctx.userId;

    if (!authorId) {
      return ctx.prisma.post.findMany();
    }

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
        return null;
      }

      const post = await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
      return post;
    }),
});
