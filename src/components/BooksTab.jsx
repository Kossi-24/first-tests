import React from "react"
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

const books = [
  {
    id: "#B-10",
    title: "Ancestor Trouble",
    author: "Maud Newton",
    available: "30",
    highlight: true,
  },
  {
    id: "#B-35",
    title: "Life Is Everywhere",
    author: "Lucy Ives",
    available: "23",
  },
  {
    id: "#G-51",
    title: "Stroller",
    author: "Amanda Parrish",
    available: "90",
  },
  {
    id: "#R-77",
    title: "The Secret Syllabus",
    author: "Terence C. Burnhum",
    available: "06",
  },
]

export function BooksTab() {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-gray-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Books List</h2>
        </div>
        <Button
          variant="outline"
          className="rounded-sm border-slate-200 px-6 text-sm font-semibold text-gray-700 shadow-none hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Add New Book
        </Button>
      </div>

      <div className="mt-6">
        <div className="overflow-hidden">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="text-xs uppercase tracking-[0.15em] text-slate-400 dark:text-slate-300">
                <TableHead className="py-4 pl-6 text-slate-500 dark:text-slate-300">
                  Book ID
                </TableHead>
                <TableHead className="py-4 text-slate-500 dark:text-slate-300">Title</TableHead>
                <TableHead className="py-4 text-slate-500 dark:text-slate-300">Author</TableHead>
                <TableHead className="py-4 text-slate-500 dark:text-slate-300">
                  Available
                </TableHead>
                <TableHead className="py-4 pr-6 text-right text-slate-500 dark:text-slate-300">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id} className="border-b border-slate-100 text-gray-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200">
                  <TableCell className="pl-6 font-semibold text-gray-900 dark:text-slate-100">
                    {book.id}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-slate-100">{book.title}</TableCell>
                  <TableCell className="text-gray-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      {book.highlight ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      ) : null}
                      <span>{book.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900 dark:text-slate-100">
                    {book.available}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-100"
                      aria-label={`Actions pour ${book.title}`}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end text-sm font-semibold text-sky-500 dark:text-sky-400">
        See All
      </div>
    </div>
  )
}

export default BooksTab
