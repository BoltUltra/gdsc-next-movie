import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full text-white font-semibold font-oswald">
      <Link href="/">Movies</Link>
      <img src="/movieLogo.png" alt="" className="w-10" />
      <Link href="/tvshows">TvShows</Link>
    </nav>
  );
};

export default Navbar;
