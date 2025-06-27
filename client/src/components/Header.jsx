import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  return <>
    <header className="relative">
      <nav className="hidden md:block" aria-label="Main Navigation">
        <div className="container mx-auto flex justify-center items-center">
          <ul className="flex md:gap-2 lg:gap-4 text-white">
            <li className="px-2 py-4 lg:px-4"><Link to="/">Home</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/early-access">Early Access</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/faq">FAQ</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/blog">Blog</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/newsletter">Newsletter</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/team">Team</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/feedback">Feedback & Bugs</Link></li>
            <li className="px-2 py-4 lg:px-4"><Link to="/press-kit">Press Kit</Link></li>
          </ul>
        </div>
      </nav>

      <div className="flex justify-end md:hidden p-2">
        <button className="p-2 focus:outline-none focus:ring-2 focus:ring-white rounded" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>

    <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
  </>;
}

export default Header;
