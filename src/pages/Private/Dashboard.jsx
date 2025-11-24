import React from "react";
import { Button } from "@/components/ui/button"
export const Dashboard = () =>{
    return(
        <div className="flex min-h-svh flex-col items-center justify-center">
        <Button  aria-label="Submit" variant="outline" className="bg-sky-600">Click me</Button>
      </div>
    );
}
export default Dashboard;