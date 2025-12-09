import React from "react"
import { BooksTab } from "@/components/BooksTab"
import { BookCard } from "@/components/BookCard"

export const Books = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
          Books Management
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Books</h1>
      </div>
      <div className="flex flex-wrap gap-6">
         <BookCard />
         <BookCard />
         <BookCard />
         <BookCard />
          <BookCard />
         <BookCard />
         <BookCard />
         <BookCard />
          <BookCard />
         <BookCard />
         <BookCard />
         <BookCard />
      </div>
      <BooksTab />
    </div>
  )
}
export default Books
