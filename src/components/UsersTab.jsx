import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { useEffect } from "react"
import api from "@/services/api"
import {adminGetUsers, adminDeleteUser} from "@/services/userService"
import {useState} from 'react'
import { Badge } from "./ui/badge"
import { BadgeCheckIcon } from "lucide-react"
import AddUserModal from "@/components/AddUserFom"

export function UsersTab() {
  const [userData, setUserData] = useState([])

   useEffect(() => {
    adminGetUsers()
      .then(res => setUserData(res))
      .catch(err => console.error(err))
  }, [])

  const handleDelete = (id) =>{
    const confirm = window.confirm("voulez vous supprimer cet utilisateur")
    if(confirm){
      adminDeleteUser(id)
         .then(() => {
        setUserData(prev => prev.filter(u => u.id !== id));
      })
      .catch(err=> console.log(err));
    };
  }
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-gray-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            Users List
          </h2>
        </div>
       <AddUserModal
          trigger={
            <Button
              variant="outline"
              className="rounded-sm border-slate-200 bg-white text-sm font-medium text-gray-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              + Add New User
            </Button>
          }/>

      </div>

      <div className="mt-5 overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="bg-slate-50 text-gray-500 dark:bg-slate-800/60 dark:text-slate-300">
              <TableHead className="w-32 text-gray-500 dark:text-slate-300">
                User ID
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                User Name
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                ROLE
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                Retards
              </TableHead>
              <TableHead className="text-right text-gray-500 dark:text-slate-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-slate-100 text-gray-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200"
              >
                <TableCell className="font-semibold text-gray-900 dark:text-slate-100">
                  {user.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center justify-left gap-3">
                    
                      <p className="font-medium text-gray-900 dark:text-slate-100">
                        {user.nom}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                      </p>
                   
                  </div>
                </TableCell>
                <TableCell className="text-left font-medium text-gray-900 dark:text-slate-100">
               
                    <Badge
                          className={`
                            px-2 py-1 text-xs font-semibold rounded-md flex items-center gap-1
                            ${
                              user.role === "ADMIN"
                                ? "bg-violet-700 text-white"
                                : user.role === "LIBRARIAN"
                                ? "bg-yellow-500 text-white"
                                : user.role === "MEMBER"
                                ? "bg-emerald-700 text-white"
                                : "bg-yellow-500 text-black"
                            }
                          `}
                        >
                          {(user.role === "ADMIN" || user.role === "LIBRARIAN") && (
                            <BadgeCheckIcon className="w-3 h-3" />
                          )}

                          {user.role}
                      </Badge>



                </TableCell>
                <TableCell className="text-left text-gray-600 dark:text-slate-300">
                </TableCell>
                <TableCell className="text-right ">
              <div className="flex flex-row gap-4">
                    <Button className="bg-sky-900 px-3 hover:bg-sky-950">Update</Button>
                   <Button onClick={e =>handleDelete(user.id)} className="bg-red-500 hover:bg-red-600 px-4">Delete</Button>
              </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right text-sm font-medium text-sky-500 dark:text-sky-400">
        See All
      </div>
    </div>
  )
}