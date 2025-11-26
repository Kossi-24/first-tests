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

const users = [
  {
    id: "10201",
    name: "Alex Ray",
    bookIssued: 12,
    retard: 0,
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "12034",
    name: "Sophia",
    bookIssued: 7,
    retard: 1,
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "22987",
    name: "Jhon",
    bookIssued: 17,
    retard: 4,
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    id: "53272",
    name: "Rose",
    bookIssued: 25,
    retard: 0,
    avatar: "https://i.pravatar.cc/40?img=11",
  },
]

export function UsersTab() {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Users List</h2>
        </div>
        <Button
          variant="outline"
          className="rounded-sm border-slate-200 bg-white text-sm font-medium text-gray-700 hover:border-slate-300 hover:bg-slate-50"
        >
          Add New User
        </Button>
      </div>

      <div className="mt-5 overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className=" text-gray-500">
              <TableHead className="w-32 text-gray-500">User ID</TableHead>
              <TableHead className="text-gray-500">User Name</TableHead>
              <TableHead className="text-gray-500">emprunts</TableHead>
              <TableHead className="text-gray-500">Retards</TableHead>
              <TableHead className="text-right text-gray-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="text-gray-700">
                <TableCell className="font-semibold text-gray-900">
                  {user.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 justify-left">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">Active user</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-900 text-left">
                  {user.bookIssued}
                </TableCell>
                <TableCell className="text-gray-600 text-left">
                  {user.retard}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right text-sm font-medium text-sky-500">
        See All
      </div>
    </div>
  )
}