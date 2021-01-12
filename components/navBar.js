import React from 'react';
import Link from 'next/link';

const NavBar = (props) => {
  return (
    <nav className="flex justify-between items-center  mx-5">
      <Link href="/">
        <a className="text-2xl text-indigo-600 font-bold ">Samme om Danske</a>
      </Link>
      <div className="flex items-center space-x-5">
        <Link href="/about">
          <a className="text-sm font-semibold rounded p-3 bg-indigo-600 hover:bg-indigo-400 text-white" >About Us</a>
        </Link>
        <Link href="/profile">
          <a className="text-sm font-semibold rounded p-3 bg-indigo-600 hover:bg-indigo-400 text-white" >Create Profile</a>
        </Link>
        <Link href="/search/Immigrant">
          <a className="text-sm font-semibold rounded p-3 bg-indigo-600 hover:bg-indigo-400 text-white" >Immigrents</a>
        </Link>
        <Link href="/search/Danish">
          <a className="text-sm font-semibold rounded p-3 bg-indigo-600 hover:bg-indigo-400 text-white" >Danish</a>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar;