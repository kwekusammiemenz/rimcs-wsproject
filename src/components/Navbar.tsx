import Link from "next/link";
export const Navbar = ({ uri }: any) => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        GTCodeing.
      </Link>
      <Link className="bg-slate-500 p-2" href={uri}>
        Add New Record
      </Link>
    </nav>
  );
};
