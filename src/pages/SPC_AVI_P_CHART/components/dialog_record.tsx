import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X, Paperclip } from "lucide-react";

interface Dialog_record_props {
  children: React.ReactNode;
  Title?: string;
  is_open: boolean;
  handleClose: () => void;
}

const Dialog_record = ({
  children,
  Title,
  is_open,
  handleClose,
}: Dialog_record_props) => {
  return (
    <>
      <Dialog
        open={is_open}
        fullWidth
        maxWidth="xl"
        // fullScreen
      >
        <DialogTitle>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Paperclip />
              <span>{Title}</span>
            </div>
            <button onClick={handleClose} className="btn btn-secondary btn-sm">
              <X />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default Dialog_record;
