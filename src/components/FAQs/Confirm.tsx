"use client"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { TriangleAlert } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  confirmButtonText: string
  cancelButtonText: string
  onConfirm: () => void
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
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex flex-col items-center gap-4">
          <TriangleAlert className="h-16 w-16 text-red-500 fill-red-500" />
          <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
          <p className="text-gray-600">{message}</p>
        </DrawerHeader>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 bg-transparent px-6 py-2 rounded-md"
            onClick={() => onOpenChange(false)}
          >
            {cancelButtonText}
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
