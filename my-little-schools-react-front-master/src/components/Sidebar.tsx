import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { SignUpIcon } from "./icons/SignUpIcon";
import { UserIcon } from "./icons/UserIcon";
import { DashboardIcon } from "./icons/DashboardIcon";
import { resetCookie } from "./functions/resetCookie";

export function Sidebar() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const navigate = useNavigate();

  return (
    <>
      <button
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
        onClick={handleMobileSidebarToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isMobileSidebarOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <XMarkIcon
            width={36}
            className="absolute right-4 top-0 cursor-pointer inline-flex items-center p-2 mt-2 ml-3 text-sm  rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            onClick={handleMobileSidebarToggle}
          />
          <ul className="space-y-2 mt-8 font-medium">
            <li>
              <Link
                to={"/admin"}
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <DashboardIcon />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/students"}
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <UserIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Alunos</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
                onClick={() => {
                  resetCookie();
                  navigate("/", { replace: true });
                }}
              >
                <SignUpIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
