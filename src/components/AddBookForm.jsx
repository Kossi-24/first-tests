"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createBook } from "@/services/bookService";

export default function AddBookModal({ categories, onBookAdded }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    publishedYear: "",
    isbn: "",
    categoryId: "",
    imageUrl: "",
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      publishedYear: "",
      isbn: "",
      categoryId: "",
      imageUrl: "",
    });
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setPreview(base64);
      setForm((prev) => ({ ...prev, imageUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.publishedYear || !form.isbn) {
      alert("Title, Published Year and ISBN are required.");
      return;
    }

    try {
      const payload = {
        ...form,
        publishedYear: Number(form.publishedYear),
        categoryId: form.categoryId ? Number(form.categoryId) : null,
      };

      await createBook(payload);

      resetForm();
      setOpen(false);
      onBookAdded?.();
    } catch (err) {
      console.error(err);
      alert("Error adding book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">+ Add Book</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Published Year"
            value={form.publishedYear}
            onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
          />

          <Input
            placeholder="ISBN"
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          />

          <select
            className="border p-2 rounded-md"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">Select category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* IMAGE UPLOAD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Book Image</label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-md border"
                alt="Preview"
              />
            )}
          </div>

          <Button onClick={handleSubmit} className="bg-emerald-800 text-white">
            Save Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
