import React from "react";
import { createRoot } from "react-dom/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

// Helper to remove localStorage items
const removeSecureItem = (key: string) => {
  localStorage.removeItem(key);
};

export const showSessionExpiredModal = () => {
  // Prevent duplicate modals
  if (document.getElementById("session-expired-modal")) return;

  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("id", "session-expired-modal");
  document.body.appendChild(modalContainer);

  const root = createRoot(modalContainer);

  const handleLogout = () => {

    // Clear only after user clicks
    removeSecureItem("token");
    removeSecureItem("userData");
    removeSecureItem("permissions");
    removeSecureItem("auth");
    removeSecureItem("branches");
    removeSecureItem("institute");

    // Unmount and clean up
    root.unmount();
    document.body.removeChild(modalContainer);

    // Then navigate
    window.location.href = "/login";
  };

  root.render(<SessionExpiredModal onConfirm={handleLogout} />);
};

type Props = {
  onConfirm: () => void;
};

const SessionExpiredModal: React.FC<Props> = ({ onConfirm }) => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[400px] text-center ml-48 mt-20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">
            Session Expired
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1">
            Your session has expired. Please log in again to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Button
            onClick={onConfirm}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
