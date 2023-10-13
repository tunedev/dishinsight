import Link from "next/link";

export const Header = () => {
  return (
    <header className="header-background text-white p-4">
      <Link href="/" className="block cursor-pointer">
        <h1 className="text-xl md:text-2xl font-bold">Dish Insight</h1>
      </Link>
    </header>
  );
};
