export const prepareUserInitials = (userMeta: string) =>
  userMeta
    ?.split(" ")
    ?.map((i) => i?.[0])
    ?.join("");
