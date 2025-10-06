"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { CheckCircle } from "lucide-react"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onOk: () => void
}

export function SuccessDialog({ open, onOpenChange, title, onOk }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-6 mt-40 ml-80 bg-white rounded-lg shadow-lg text-center">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-500">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md"
            onClick={onOk}
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
