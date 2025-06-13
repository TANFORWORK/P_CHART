import axios from "axios";
import Swal from "sweetalert2";

const Get_filter_func = async () => {
  try {
    // Get input from user via SweetAlert
    const { value: formValues } = await Swal.fire({
      title: "Enter Password Unlock Details",
      html: `
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Driver ID:</label>
            <input id="dri_id_up" class="swal2-input" type="text" placeholder="Enter Driver ID">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Password Unlock:</label>
            <input id="pw_unlock" class="swal2-input" type="password" placeholder="Enter Password">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const dri_id_up = (
          document.getElementById("dri_id_up") as HTMLInputElement
        ).value;
        const pw_unlock = (
          document.getElementById("pw_unlock") as HTMLInputElement
        ).value;

        if (!dri_id_up || !pw_unlock) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }

        return {
          dri_id_up: dri_id_up,
          pw_unlock: pw_unlock,
        };
      },
    });

    // If user cancelled or didn't provide values
    if (!formValues) {
      return null;
    }

    // Show loading after getting input
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Use the values from SweetAlert input
    let params = {
      dri_id_up: formValues.dri_id_up,
      pw_unlock: formValues.pw_unlock,
    };

    const response = await axios.get(
      `${
        import.meta.env.VITE_API_IP
      }/smart-spc-avi/out-of-rule-action/Send_to_unlock_pw`,
      { params }
    );

    if (response.status === 200) {
      if (response.data.status === "OK") {
        Swal.close();
        return response.data;
      } else {
        // Swal.close();
        Swal.fire({
          title: "❌ Unlock Failed",
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
        return response.data;
      }
    }
  } catch (error: any) {
    // ... rest of your error handling code remains the same
    if (error.response) {
      await Swal.fire({
        title: "❌ Unlock Failed",
        html: `
            <div class="text-left space-y-4">
              <div class="bg-error/10 border border-error/20 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 bg-error rounded-full"></div>
                  <span class="font-semibold text-error">Server Error</span>
                </div>
                <p class="text-sm text-base-content/80 mb-3">${
                  error.response.data.message
                }</p>
                
                <div class="bg-base-100 rounded p-3 space-y-2">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-base-content/70">Status Code:</span>
                    <span class="badge badge-error badge-sm">${
                      error.response.status
                    }</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-base-content/70">Error Type:</span>
                    <span class="font-mono text-xs bg-base-200 px-2 py-1 rounded">
                      ${error.response.data.status || "Server Error"}
                    </span>
                  </div>
                </div>
              </div>
  
              <div class="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 bg-warning rounded-full"></div>
                  <span class="font-semibold text-warning">What to do next?</span>
                </div>
                <ul class="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                  <li>Check if the credentials are correct</li>
                  <li>Verify your permissions</li>
                  <li>Try again or contact administrator</li>
                </ul>
              </div>
            </div>
          `,
        icon: "error",
        confirmButtonText: "Understood",
        confirmButtonColor: "#ef4444",
        width: "500px",
      });
      return null;
    }

    await Swal.fire({
      title: "🌐 Connection Error",
      html: `
          <div class="text-left space-y-4">
            <div class="bg-error/10 border border-error/20 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-error rounded-full"></div>
                <span class="font-semibold text-error">Network Problem</span>
              </div>
              <p class="text-sm text-base-content/80 mb-3">Unable to connect to the server</p>
              
              <div class="bg-base-100 rounded p-3">
                <div class="text-sm">
                  <span class="text-base-content/70">Error Message:</span>
                  <div class="font-mono text-xs bg-base-200 px-2 py-1 rounded mt-1">
                    ${error.message}
                  </div>
                </div>
              </div>
            </div>
  
            <div class="bg-info/10 border border-info/20 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-info rounded-full"></div>
                <span class="font-semibold text-info">Troubleshooting</span>
              </div>
              <ul class="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                <li>Check your internet connection</li>
                <li>Verify server is running</li>
                <li>Try refreshing the page</li>
                <li>Contact IT support if problem persists</li>
              </ul>
            </div>
          </div>
        `,
      icon: "error",
      confirmButtonText: "Try Again",
      confirmButtonColor: "#ef4444",
      width: "500px",
    });
    return null;
  }
};

export default Get_filter_func;
