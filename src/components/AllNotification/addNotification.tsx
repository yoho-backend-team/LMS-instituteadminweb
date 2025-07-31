
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import bell from "../../assets/bell.png";
// import toast from "react-hot-toast";

export function AddNotificationDrawer() {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic here
    // toast.success('Notification added!');
    setOpen(false);
  };

  return (
    <>
      <Button
        className="bg-[#00C4CC] hover:bg-[#00b3bb] text-white rounded-md shadow-md"
        onClick={() => setOpen(true)}
      >
        <img src={bell} alt="bell" className="w-6 h-6 mr-2" />
        Add Notification
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="h-full bg-white w-full max-w-md ml-auto rounded-none p-6 shadow-lg border-l">
          <DrawerHeader className="flex items-center justify-between p-0 mb-6 relative">
            <DrawerTitle className="text-lg font-semibold">Add Notification</DrawerTitle>
            <DrawerClose>
              <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 hover:text-black absolute top-0 right-0" />
            </DrawerClose>
          </DrawerHeader>

    
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Branch</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
              <textarea
                placeholder="Enter message..."
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" className="bg-[#e0f6f6] text-[#00C4CC]" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#00C4CC] hover:bg-[#00b3bb] text-white">
                Add Notification
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
