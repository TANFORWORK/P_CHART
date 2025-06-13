import axios from "axios";
import Swal from "sweetalert2";
const Python_Unlock_lot = async (data_update: any) => {
  const databody = {
    lot: data_update.lot_no,
    process: data_update.process,
    action_by: data_update.action_by || null,
  };
  console.log(databody);
  const url = `http://10.17.66.242:7010/api/fpc/spc-unlock-lot/`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: databody,
  };
  try {
    const response = await axios.request(config);
    console.log("Response:", response);
    if (response.data.status === "OK") {
      Swal.fire({
        title: "✅ Unlock Lot Success!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      //   alert(`${response.data.message}`);
      Swal.fire({
        title: "❌ Unlock Lot Failed",
        html: `
          <div class="text-left space-y-4">
            <div class="bg-error/10 border border-error/20 rounded-lg p-4">
              <p class="text-sm text-base-content/80 mb-3">${response.data.message}</p>
              <p class="text-sm text-base-content/80">Please try again later.</p>
            </div>
          </div>
        `,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default Python_Unlock_lot;
