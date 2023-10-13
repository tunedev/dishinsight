"use client";

import { IDishWithReviewsAndAverageRatings } from "@/interface";
import { DishCard } from "./DishCard";
import { ChangeEvent, useState } from "react";

export const DishListing: React.FC<{
  dishes: IDishWithReviewsAndAverageRatings[];
}> = ({ dishes }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDishes, setFilteredDishes] =
    useState<IDishWithReviewsAndAverageRatings[]>(dishes);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDishes(filtered);
    } else {
      setFilteredDishes(dishes);
    }
  };

  return (
    <div>
      <div className="md:flex md:justify-between">
        <h2 className="rounded-2 md:px-4 pt-4 pb-2 font-semibold text-xl">
          Nigerian Dish to try
        </h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border-none rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {filteredDishes.map((data) => (
          <DishCard key={data.id} dish={data} />
        ))}
      </div>
    </div>
  );
};
