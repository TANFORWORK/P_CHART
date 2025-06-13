import { useState } from "react";
import Get_reord_by_id from "../func/Get_reord_by_id";
import Update_Record from "../func/Update_Record";
import Check_Password_unlock from "../func/Check_Password_unlock";
import Python_Unlock_lot from "../func/Python_Unlock_lot";
const Use_Dialog_data = () => {
  const [data_update, setDataUpdate] = useState<any>({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handle_check_by_id = async (id: string) => {
    const data = await Get_reord_by_id(id);
    if (data) {
      setDataUpdate(data.data);
      setOpen(true);
    } else {
      setDataUpdate([]);
      setOpen(false);
    }
  };

  const handle_change_dynamic = (e: any) => {
    setDataUpdate({
      ...data_update,
      [e.target.name]: e.target.value,
    });
  };

  const re_check_after_save = async () => {
    const data = await Get_reord_by_id(data_update.id);
    if (data) {
      setDataUpdate(data.data);
      setOpen(true);
    } else {
      setDataUpdate([]);
    }
  };

  const handle_update_record = async () => {
    handleClose();
    const res = await Update_Record(data_update);
    if (res) {
      if (res.message === "Invalid save password") {
        setOpen(true);
      } else {
        await re_check_after_save();
      }
    } else {
      setOpen(true);
    }
  };

  const send_unlok_lot = async () => {
    handleClose();

    const data = await Check_Password_unlock();
    if (!data) {
      await re_check_after_save();
      setOpen(true);
      return;
    } else {
      if (data.status === "ERROR") {
        await re_check_after_save();
        setOpen(true);
        return;
      }
    }
    const res = await Python_Unlock_lot(data_update);
    console.log(res);
    await re_check_after_save();
    setOpen(true);
  };

  return {
    data_update,
    setDataUpdate,
    handle_check_by_id,

    open,
    handleClose,
    handle_change_dynamic,
    setOpen,
    re_check_after_save,
    handle_update_record,
    send_unlok_lot,
  };
};
export default Use_Dialog_data;
