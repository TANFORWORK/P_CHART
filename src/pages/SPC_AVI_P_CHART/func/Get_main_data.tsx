import axios from "axios";
import Swal from "sweetalert2";

const Get_main_filter = async (body: any) => {
  try {
    // Swal loading
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    let bodys = {
      start_date: body.start_date,
      end_date: body.end_date,
      product_name: body.product_name,
      reject_desc: body.reject_desc,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_IP}/smart-spc-avi/spc-avi/table`,
      bodys
    );
    if (response.status === 200) {
      if (response.data.status === "OK") {
        Swal.close();
        return response.data;
      } else {
        Swal.close();
        return response.data;
      }
    }
  } catch (error: any) {
    if (error.response) {
      // ปัญหาเกิดจากการเชื่อมต่อไม่สำเร็จฝั่ง server
      await Swal.fire({
        title: "❌ Delete Failed",
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
                  <li>Check if the job record still exists</li>
                  <li>Verify your permissions</li>
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

export default Get_main_filter;
