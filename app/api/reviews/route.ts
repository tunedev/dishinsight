import { prisma } from "@/utils/db";
import { fetchSentiment } from "@/utils/sentiment";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { content, dishId } = await req.json();
  const sentimentAnalysis = await fetchSentiment(content);
  console.log({ sentimentAnalysis });
  await prisma.review.create({
    data: {
      dishId,
      content,
      sentiment: sentimentAnalysis.label,
      posProb: sentimentAnalysis.probability.pos,
      negProb: sentimentAnalysis.probability.neg,
      neutralProb: sentimentAnalysis.probability.neutral,
    },
  });
  const updatedDish = await prisma.dish.findUniqueOrThrow({
    where: {
      id: dishId,
    },
    include: {
      reviews: true,
    },
  });

  revalidatePath(`/dishes/${dishId}`);
  return NextResponse.json({ data: updatedDish });
};
