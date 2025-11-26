import React from "react";
import { Button } from "@/components/ui/button"
import { StatsCards } from "./StatsCards";
import { AlarmClock, BookCopy, Clock9, FileStack, Users } from "lucide-react";
import { UsersTab } from "@/components/UsersTab";
import { BooksTab } from "@/components/BooksTab";

export const Dashboard = () =>{
    return(
      <><div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
        
        <h1 className="text-xl font-bold">Hello, <span className="text-sky-500">Noryah</span>!</h1><p>Jan 12,2025 |Thursday, 12:00 PM</p>
        </div>
      </div><div className="flex flex-wrap gap-4 py-4">
          <StatsCards title="Utilisateurs totals" amount="10400" icon={<Users size={20} />} />
          <StatsCards title="Livre Emprunté" amount="1632" icon={<FileStack size={20} />} />
          <StatsCards title="Livre En Stock" amount="5020" icon={<BookCopy size={20} />} />
          <StatsCards title="Retards" amount="3252" icon={<AlarmClock size={20} />} />
        </div>
        <div className=" flex flex-row gap-4 py-4 w-full">
          <div className="w-180">
          <UsersTab />
          </div>
          <div className="w-180">
            <BooksTab />
          </div>
   
        </div>
        </>
    );
}
export default Dashboard;