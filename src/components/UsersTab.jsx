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
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-gray-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            Users List
          </h2>
        </div>
        <Button
          variant="outline"
          className="rounded-sm border-slate-200 bg-white text-sm font-medium text-gray-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
        >
          Add New User
        </Button>
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
                emprunts
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-slate-100 text-gray-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200"
              >
                <TableCell className="font-semibold text-gray-900 dark:text-slate-100">
                  {user.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-left gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-slate-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Active user
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-left font-medium text-gray-900 dark:text-slate-100">
                  {user.bookIssued}
                </TableCell>
                <TableCell className="text-left text-gray-600 dark:text-slate-300">
                  {user.retard}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
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