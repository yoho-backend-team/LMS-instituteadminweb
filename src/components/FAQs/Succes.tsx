"use client"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { CheckCircle } from "lucide-react"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onOk: () => void
}

export function SuccessDialog({ open, onOpenChange, title, onOk }: SuccessDialogProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full max-w-md ml-auto p-6 bg-white rounded-none shadow-lg border-l">
        <DrawerHeader className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-500">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center mt-6">
          <Button className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md" onClick={onOk}>
            Ok
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
