import { Dish } from "@prisma/client";
import { DishCard } from "../components";
import { prisma } from "@/utils/db";
import { getDishAvgScore } from "@/utils/helpers";

const getDishes = async (): Promise<(Dish & { averageScore: number })[]> => {
  const dishesWithReviews = await prisma.dish.findMany({
    include: { reviews: true },
  });

  return dishesWithReviews.map((dish) => ({
    ...dish,
    averageScore: getDishAvgScore(dish.reviews),
  }));
};

const MyApp = async () => {
  const dishes = await getDishes();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      {dishes.map((data) => (
        <DishCard key={data.id} dish={data} />
      ))}
    </div>
  );
};

export default MyApp;
