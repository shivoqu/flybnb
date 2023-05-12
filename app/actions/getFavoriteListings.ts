import prisma from "@/app/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getFavoriteListings;
