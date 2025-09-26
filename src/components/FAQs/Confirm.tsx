"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { TriangleAlert } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader className="flex flex-col items-center gap-4 text-center">
          <TriangleAlert className="h-16 w-16 text-red-500 fill-red-500" />
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 px-6 py-2 rounded-md"
            onClick={() => onOpenChange(false)}
          >
            {cancelButtonText}
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
