import prisma from "../lib/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString,
    }));

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
