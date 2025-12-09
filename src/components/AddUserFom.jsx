import { useState } from "react"

import { useForm } from 'react-hook-form'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { registerUser } from '@/services/userService'
import { useExpressAuth } from "@/context/ExpressAuthContext";


export default function AddUserModal({ trigger }) {
  const [open, setOpen] = useState(false)
  const { user } = useExpressAuth();

  const form = useForm({
    defaultValues: {
      nom: "",
      email: "",
      password: "",
      role: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      const res = await registerUser({
      nom: data.nom,
      email: data.email,
      password: data.password,
      role: data.role,
      createdBy: user?.id   // <= ICI LE PLUS IMPORTANT
    });


      console.log("Utilisateur créé :", res)

      setOpen(false)
      form.reset()

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} className="border border-gray-100 bg-white text-gray-800 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100">

      {/* 👉 BOUTON EXTERNE ICI */}
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              rules={{ required: "Nom requis" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Kodjo Mensah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email requis",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email invalide",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ex: test@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Mot de passe requis",
                minLength: { value: 6, message: "Minimum 6 caractères" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ROLE */}
            <FormField
              control={form.control}
              name="role"
              rules={{ required: "Rôle requis" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="LIBRARIAN">Librarian</SelectItem>
                      <SelectItem value="MEMBER">Membre</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Créer</Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
