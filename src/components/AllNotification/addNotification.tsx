import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import bell from "../../assets/bell.png";
import { COLORS, FONTS } from "../../constants/uiConstants";
import { getBranchService } from "../../features/batchManagement/services";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAllNotificationsService } from "../../features/AllNotifications/Services";

export function AddNotificationDrawer({
  fetchAllNotifications,
}: {
  fetchAllNotifications: () => void;
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const [branches, setBranches] = useState<any[]>([]);
  const [branch, setBranch] = useState<string>("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchAllBranches = async () => {
    try {
      const response = await getBranchService({});
      if (response) {
        setBranches(response?.data);
      } else {
        console.log("No branch found");
      }
    } catch (error) {
      console.log("Error fetching branch data:", error);
    }
  };

  useEffect(() => {
    fetchAllBranches();
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!branch || !title || !body) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      institute: "973195c0-66ed-47c2-b098-d8989d3e4529",
      branch,
      title,
      body,
    };

    try {
      const response = await createAllNotificationsService(payload);
      if (response) {
        toast.success("Notification form data saved .");
        setOpen(false);
        fetchAllNotifications();
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification");
    }

    setBranch("");
    setTitle("");
    setBody("");
  };

  return (
    <>
      <Button
        className="bg-[#00C4CC] hover:bg-[#00b3bb] text-white rounded-md shadow-md"
        onClick={() => setOpen(true)}
      >
        <img src={bell} alt="bell" className="w-6 h-6" />
        <p style={{ ...FONTS.heading_08_bold, color: COLORS.white }}>
          
          Add Notification
        </p>
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="h-full bg-white w-full max-w-md ml-auto  p-6 shadow-lg border-l rounded-xl">
          <DrawerHeader className="flex items-center justify-between p-0 mb-6 relative">
            <DrawerTitle
              style={{ ...FONTS.heading_06_bold, color: COLORS.gray_dark_02 }}
            >
              Add Notification
            </DrawerTitle>
            <DrawerClose>
              <X className="w-5 h-5 bg-gray-500 text-white rounded-full p-0.5 absolute top-0 right-0" />
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
              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Select Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
                required
              >
                <option
                  value=""
                  style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
                >
                  Select
                </option>
                {branches?.map((b: any) => (
                  <option key={b?._id} value={b?._id}>
                    {b?.branch_identity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
              >
                Body
              </label>
              <textarea
                placeholder="Enter message..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                className="bg-[#e0f6f6] text-[#00C4CC]"
                style={{ ...FONTS.heading_08_bold }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#00C4CC] hover:bg-[#00b3bb] text-white"
                style={{ ...FONTS.heading_08_bold, color: COLORS.white }}
                type="submit"
              >
                Add Notification
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
