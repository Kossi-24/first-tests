"use client"

import { MoreHorizontalIcon, MoreVertical, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { auth } from "@/services/firebase-config"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export function DropdownMenuDialog() {

  const logout = async() => {
    try{
      await signOut(auth)
      navigate("/")
    } catch{
      console.log("Erreur de déconnexion:")
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label="Open menu"
          size="icon-sm"
          className="dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
        >
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 border border-gray-100 bg-white text-gray-800 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100"
        align="end"
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuGroup>
       
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                asChild
                className="focus:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
              >
                <button type="button" className="w-full text-left">
                  New File...
                </button>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>
                  Provide a name for your new file. Click create when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className="pb-3">
                <Field>
                  <FieldLabel htmlFor="filename">File Name</FieldLabel>
                  <Input id="filename" name="filename" placeholder="document.txt" />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                asChild
                className="focus:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
              >
                <button type="button" className="w-full text-left">
                  Share...
                </button>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share File</DialogTitle>
                <DialogDescription>
                  Anyone with the link will be able to view this file.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className="py-3">
                <Field>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="shadcn@vercel.com"
                    autoComplete="off"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Check out this file"
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            className="gap-2 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
            variant="outline"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" /> Deconnecter
        </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
