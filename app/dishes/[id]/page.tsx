import { DishDetails } from "@/components";
import { prisma } from "@/utils/db";
import { Dish, Review } from "@prisma/client";
import { redirect } from "next/navigation";

const getDishById = async (
  id: string
): Promise<(Dish & { reviews: Review[] }) | null> => {
  try {
    const dish = await prisma.dish.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        reviews: true,
      },
    });
    return dish;
  } catch (err) {
    return null;
  }
};

const DishDetailPage = async ({ params }) => {
  const dish = await getDishById(params.id);

  if (!dish) {
    redirect("/");
  }

  return <DishDetails dish={dish} />;
};

export default DishDetailPage;
