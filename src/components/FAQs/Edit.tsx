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
import { X } from "lucide-react";
import type { FAQItem } from "../../types/faq";
import { UpdateFaq } from "../../features/Faq/service";
import { toast } from "react-toastify";

interface EditFAQDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faqToEdit: FAQItem | null;
}

export function EditFAQDrawer({
  open,
  onOpenChange,
  faqToEdit,
}: EditFAQDrawerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (faqToEdit) {
      setTitle(faqToEdit.title || "");
      setDescription(faqToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [faqToEdit]);

  const handleSubmit = async () => {
    if (!faqToEdit) return;

    try {
      setLoading(true);
      const updatedData = { title, description };
      await UpdateFaq(faqToEdit.uuid, updatedData);
      toast.success("FAQ updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l h-[90%] mt-10 rounded-xl ">
        <DrawerHeader className="flex items-left justify-between p-0 mb-6 relative">
          <DrawerTitle className="text-lg font-semibold">Edit FAQ</DrawerTitle>
          <DrawerClose>
            <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
          </DrawerClose>
        </DrawerHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 min-h-[100px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="bg-cyan-500 text-white hover:bg-cyan-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
