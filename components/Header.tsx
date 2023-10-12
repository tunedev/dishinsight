import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <Link href="/" className="block cursor-pointer">
        <h1 className="text-xl md:text-2xl">Dish Insight</h1>
      </Link>
    </header>
  );
};
