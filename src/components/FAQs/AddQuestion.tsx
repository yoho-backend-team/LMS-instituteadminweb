import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../../components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { X } from "lucide-react";
import { CreateFaq } from "../../features/Faq/service"; // Adjust path as needed

export function AddFAQDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory1] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset form
      setTitle("");
      setDescription("");
      setCategory1("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      category_id:"6825d76c8245c52fee70cc27", // category1 is used for category_id
      accessby: ["Teaching Staff"], // hardcoded access
    };

    try {
      setLoading(true);
      const result = await CreateFaq(payload);
      console.log(" Created FAQ:", result);
      onOpenChange(false);
    } catch (err) {
      console.error(" Failed to create FAQ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex items-left justify-between p-0 mb-6 relative">
          <DrawerTitle className="text-lg font-semibold">Add FAQ</DrawerTitle>
          <DrawerClose>
            <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
          </DrawerClose>
        </DrawerHeader>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="faq-title">Title</Label>
            <Input id="faq-title" className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="faq-description">Description</Label>
            <Textarea
              id="faq-description"
              className="mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="faq-category1">Category</Label>
            <Select value={category1} onValueChange={setCategory1}>
              <SelectTrigger id="faq-category1" className="mt-1 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
