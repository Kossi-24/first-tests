import { createContext, useContext, useState } from "react";
import { ChevronFirst, MoreVertical, ChevronLast } from "lucide-react";
import {useNavigate, useLocation} from "react-router-dom"
import { DropdownMenuDialog } from "@/components/Dialog"
const SidebarContext = createContext({ expanded: true });


export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    return (
        <aside className={`h-screen ${expanded ? "w-64" : "w-16"} transition-all`}>
                <nav className="h-full flex flex-col bg-white border-r shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src="https://img.logoipsum.com/243.svg" alt=""  className="w-32" />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                                {expanded ? <ChevronFirst /> : <ChevronLast />}
                         </button>
        
                    </div>
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>
                
                <div className="border-t flex p-3 dark:border-slate-800">
          <img
            src="https://ui-avatars.com/api/?name=Noryah+Betsalel"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 text-gray-900 dark:text-gray-100">
              <h4 className="font-semibold">Noryah Betsalel</h4>
              <span className="text-xs text-gray-600 dark:text-gray-300">NoryahAi@gmail.com</span>
            </div>
            <DropdownMenuDialog />
          </div>
        </div>
        </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, alert, path }) {
    const { expanded } = useContext(SidebarContext)
    const navigate = useNavigate()
    const location = useLocation()
    
    // Détermine si cet item est actif en comparant le path actuel
    const isActive = location.pathname === path || (path === "/dashboard" && location.pathname === "/")

    const handleClick = () =>{
      if (path){
        navigate(path);
      }
    };
    return (
      <li
        onClick={handleClick}
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-sky-600 text-white"
              : "hover:bg-sky-100 text-gray-600 dark:text-gray-200 dark:hover:bg-slate-800"
          }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-sky-600 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
  
        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-neutral-200 text-stone-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    )
  }