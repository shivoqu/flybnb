import prisma from "@/app/lib/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map(
      (favorite: { createdAt: { toString: () => any } }) => ({
        ...favorite,
        createdAt: favorite.createdAt.toString(),
      })
    );

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
