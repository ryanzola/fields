import { useEffect } from 'react';
import { Link } from "react-router-dom";
import clsx from "clsx"
import 'wicg-inert';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  useEffect(() => {
    // give focus to the sidebar when it opens
    if (isSidebarOpen) {
      const sidebar = document.querySelector('aside[role="dialog"]');
      if (sidebar) {
        sidebar.focus();
      }
    }
  }, [isSidebarOpen]);

  return <>
      {/* overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-[#000]/50 z-40 transition-opacity duration-300",
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* sidebar */}
      <aside
        className={clsx(
          "fixed top-0 right-0 w-84 md:w-72 h-full flex flex-col bg-white shadow-lg z-50 transform transition-transform duration-300 ease-out",
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        onClick={e => e.stopPropagation()}
        role="dialog"
        inert={!isSidebarOpen}
        aria-label="User Sidebar"
        tabIndex={!isSidebarOpen ? -1 : 0}
      >
        {/* sidebar content */}
        <div className="p-4 flex items-center">
          <button className="text-gray-500" onClick={() => setIsSidebarOpen(false)}>
            <FontAwesomeIcon icon={faXmarkCircle} size="xl" />
            <span className="sr-only">Close Sidebar</span>
          </button>
        </div>

        <nav className="" aria-label="Main Navigation">
          <ul className="flex flex-col gap-4">
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/">Home</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/early-access">Early Access</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/faq">FAQ</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/blog">Blog</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/newsletter">Newsletter</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/team">Team</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/feedback">Feedback & Bugs</Link></li>
            <li className="p-2 text-center"><Link onClick={() => setIsSidebarOpen(false)} to="/press-kit">Press Kit</Link></li>
          </ul>
        </nav>
      </aside>
  </>
}

export default Sidebar;