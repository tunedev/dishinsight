import { DishListing } from "../components";
import { prisma } from "@/utils/db";
import { getDishAvgScore } from "@/utils/helpers";
import { IDishWithReviewsAndAverageRatings } from "@/interface";

const getDishes = async (): Promise<IDishWithReviewsAndAverageRatings[]> => {
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
    <div>
      <DishListing dishes={dishes} />
    </div>
  );
};

export default MyApp;
