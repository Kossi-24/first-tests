import React from "react"
import { BooksTab } from "@/components/BooksTab"

export const Books = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
          Catalogue
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Books</h1>
      </div>
      <BooksTab />
    </div>
  )
}
export default Books
