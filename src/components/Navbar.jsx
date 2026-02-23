import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <nav className="bg-black border-b-4 border-[#A100FF] px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center group cursor-pointer">
          <span className="text-[#A100FF] text-3xl font-bold mr-2 pb-1 transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
          <div className="text-white font-extrabold text-2xl tracking-tight">IMS Dashboard</div>
        </div>

        <ul className="flex space-x-10">
          {['Home', 'Entry', 'Report'].map((item) => (
            <li key={item}>
              <Link 
                to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`} 
                className="relative text-sm font-bold uppercase tracking-wider text-white hover:text-[#A100FF] transition-colors duration-300 py-2 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A100FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;