import React from 'react'
import { AuthContext } from '@/context/ExpressAuthContext'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar, { SidebarItem } from '@/components/Sidebar'
import { LayoutDashboard, Book, User, Package, BarChart, Bell, Mail, Settings, LifeBuoy } from 'lucide-react'
import { useContext } from 'react'
import { ModeToggle } from '@/components/mode-toggle'
export default function Private() {
    // Récupération de l'utilisateur courant depuis le contexte de express
    const { user, loading } = useContext(AuthContext)

    console.log("PRIVATE", user, loading)

    // Protection de la route - redirection si non connecté
    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex h-screen">
            <Sidebar>
                <SidebarItem 
                    icon={<LayoutDashboard size={20} />} 
                    text="Dashboard" 
                    path="/private/dashboard" 
                />
                <SidebarItem 
                    icon={<Book size={20} />} 
                    text="Books" 
                    path="/private/books" 
                />
                <SidebarItem 
                    icon={<User size={20} />} 
                    text="Users" 
                    path="/private/users" 
                />
                <SidebarItem 
                    icon={<Package size={20} />} 
                    text="Orders" 
                    path="/private/orders" 
                />
                <SidebarItem 
                    icon={<BarChart size={20} />} 
                    text="Analytics" 
                    path="/private/analytics" 
                />
                <SidebarItem 
                    icon={<Bell size={20} />} 
                    text="Notifications" 
                    path="/private/notifications" 
                    alert 
                />
                <SidebarItem 
                    icon={<Mail size={20} />} 
                    text="Messages" 
                    path="/private/messages" 
                />
                <hr className="my-3" />
                <SidebarItem 
                    icon={<Settings size={20} />} 
                    text="Settings" 
                    path="/private/settings" 
                />
                <SidebarItem 
                    icon={<LifeBuoy size={20} />} 
                    text="Help" 
                    path="/private/help" 
                />
                <SidebarItem
                    icon={
                        <div className="flex h-5 w-5 items-center justify-center">
                            <ModeToggle />
                        </div>
                    }
                    text="Theme"
                />
            </Sidebar>
            
            <main className="flex-1 p-8 overflow-auto bg-gray-50 dark:bg-slate-900">
                <Outlet />
            </main>
        </div>
    )
}
