import axios from "axios";
import Swal from "sweetalert2";

const Update_Record = async (data: any) => {
  try {
    // Show password input dialog first
    const result = await Swal.fire({
      title: "🔐 Authentication Required",
      text: "Please enter your password to save the record",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm & Save",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        try {
          if (!password) {
            return Swal.showValidationMessage("Password is required!");
          }
          if (password.length < 1) {
            return Swal.showValidationMessage("Password cannot be empty!");
          }
          return password;
        } catch (error) {
          Swal.showValidationMessage(`Validation failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    // If user cancelled or didn't provide password
    if (!result.isConfirmed || !result.value) {
      await Swal.fire({
        title: "❌ Operation Cancelled",
        text: "Record update was cancelled by user",
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#6b7280",
      });
      return null;
    }

    let body = {
      id: data.id,
      root_cause: data.root_cause,
      action: data.action,
      action_by: data.action_by,
      approve_by: data.approve_by,
      qa_approve_by: data.qa_approve_by,
      comment: data.comment,
      pw_save: result.value, // Add password to request body
      update_date: data.update_date,
    };

    // return body;
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_IP
      }/smart-spc-avi/out-of-rule-action/update-action`,
      body
    );
    if (response.status === 200) {
      if (response.data.status === "OK") {
        await Swal.fire({
          title: response.data.status,
          text: response.data.message,
          icon: "success",
        });
        return response.data;
      } else {
        await Swal.fire({
          title: response.data.status,
          text: response.data.message,
          icon: "warning",
        });
        return response.data;
      }
    }
  } catch (error: any) {
    if (error.response) {
      // ปัญหาเกิดจากการเชื่อมต่อไม่สำเร็จฝั่ง server
      await Swal.fire({
        title: "❌ Update Failed",
        html: `
                <div class="text-left space-y-4">
                  <!-- Error Status -->
                  <div class="bg-error/10 border border-error/20 rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-2 h-2 bg-error rounded-full"></div>
                      <span class="font-semibold text-error">Server Error</span>
                    </div>
                    <p class="text-sm text-base-content/80 mb-3">${
                      error.response.data.message
                    }</p>
                    
                    <!-- Error Details -->
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
      
                  <!-- Action Required -->
                  <div class="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-2 h-2 bg-warning rounded-full"></div>
                      <span class="font-semibold text-warning">What to do next?</span>
                    </div>
                    <ul class="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                      <li>Check if the record still exists</li>
                      <li>Verify your permissions and password</li>
                      <li>Try again or contact administrator</li>
                    </ul>
                  </div>
                </div>
              `,
        icon: "error",
        confirmButtonText: "Understood",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "swal2-popup",
          confirmButton: "swal2-confirm",
        },
        width: "500px",
      });
      return null;
    }

    // ปัญหาเกิดจากการเชื่อมต่อไม่สำเร็จ ฝั่ง client or network
    await Swal.fire({
      title: "🌐 Connection Error",
      html: `
              <div class="text-left space-y-4">
                <!-- Connection Issue -->
                <div class="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 bg-error rounded-full"></div>
                    <span class="font-semibold text-error">Network Problem</span>
                  </div>
                  <p class="text-sm text-base-content/80 mb-3">Unable to connect to the server</p>
                  
                  <!-- Error Details -->
                  <div class="bg-base-100 rounded p-3">
                    <div class="text-sm">
                      <span class="text-base-content/70">Error Message:</span>
                      <div class="font-mono text-xs bg-base-200 px-2 py-1 rounded mt-1">
                        ${error.message}
                      </div>
                    </div>
                  </div>
                </div>
      
                <!-- Troubleshooting -->
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
      customClass: {
        popup: "swal2-popup",
        confirmButton: "swal2-confirm",
      },
      width: "500px",
    });
    return null;
  }
};

export default Update_Record;
