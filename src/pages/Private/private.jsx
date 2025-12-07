import React from 'react'
import { AuthContext } from '@/context/ExpressAuthContext'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar, { SidebarItem } from '@/components/Sidebar'
import { sidebarItems } from '@/components/configSideBarItems'
import { useContext } from 'react'
import { ModeToggle } from '@/components/mode-toggle'

export default function Private() {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to="/" />

    const role = user.role || "MEMBER"
    const items = sidebarItems[role] || sidebarItems.MEMBER

    return (
        <div className="flex h-screen">
            <Sidebar>
                {items.map((item, index) =>
                    item.divider ? (
                        <hr key={index} className="my-3" />
                    ) : (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            path={item.path}
                            alert={item.alert}
                        />
                    )
                )}

                {/* Thème */}
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
