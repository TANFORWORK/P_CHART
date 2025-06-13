import useFilter from "../hooks/Use_Filter";
import Use_Dialog_data from "../hooks/Use_Dialog_data";

import DatePicker from "../Components/Date_picker";
import AutocompleteSelector from "../Components/AutocompleteSelector";
import Table_MUIX from "../Components/table_DataGrid";
import Dialog_record from "../Components/dialog_record";

const Out_of_Rule_Action = () => {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,

    productName,
    setProductName,
    rejectDesc,
    setRejectDesc,

    options_product,
    options_reject,

    data_record,
    is_loading,
  } = useFilter();

  const {
    data_update,
    handle_check_by_id,
    open,
    handleClose,
    handle_change_dynamic,
    handle_update_record,
    send_unlok_lot,
  } = Use_Dialog_data();

  return (
    <div className="grid grid-cols-1 gap-2 mt-4 ml-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <DatePicker value={fromDate} onChange={setFromDate} label="Date From" />
        <DatePicker value={toDate} onChange={setToDate} label="Date To" />
        <AutocompleteSelector
          label="Product"
          placeholder="Select a Product"
          value={productName}
          onChange={setProductName}
          options={options_product}
        />

        <AutocompleteSelector
          label="Reject Description"
          placeholder="Select a Reject"
          value={rejectDesc}
          onChange={setRejectDesc}
          options={options_reject}
        />
      </div>
      <div>
        <Table_MUIX
          datas={data_record}
          columns={[
            {
              field: "inspect_date",
              headerName: "Inspect Date",
              headerAlign: "center",
              align: "center",
              width: 120,
            },
            {
              field: "product_name",
              headerName: "Product Name",
              headerAlign: "center",
              width: 150,
            },
            {
              field: "lot_no",
              headerName: "Lot No",
              headerAlign: "center",
              align: "center",
              minwidth: 130,
            },
            {
              field: "reject_desc",
              headerName: "Reject Desc",
              headerAlign: "center",
              width: 300,
            },
            {
              field: "total_input",
              headerName: "Total Input",
              headerAlign: "center",
              align: "center",
              minwidth: 100,
            },
            {
              field: "ooc",
              headerName: "OOC",
              headerAlign: "center",
              align: "center",
              minwidth: 80,
              renderCell(params: any) {
                return (
                  <p
                    className={`${
                      params.value
                        ? "bg-[#f1948a] text-[#7b241c]"
                        : "bg-[#82e0aa] text-[#419c7b]"
                    } py-1 px-4 w-fit font-bold rounded`}
                  >
                    {params.value ? "NG" : "PASS"}
                  </p>
                );
              },
            },
            {
              field: "pi",
              headerName: "Pi",
              headerAlign: "center",
              minwidth: 100,
            },
            {
              field: "ucl",
              headerName: "UCLp",
              headerAlign: "center",
              minwidth: 100,
            },
            {
              field: "lcl",
              headerName: "LCLp",
              headerAlign: "center",
              minwidth: 100,
            },
            {
              field: "id",
              headerName: "ACTION",
              minWidth: 120,
              headerAlign: "center",
              align: "center",
              renderCell(params: any) {
                return (
                  <button
                    className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      handle_check_by_id(params.row.id);
                    }}
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1.5em"
                      width="1.5em"
                      className="text-success hover:text-green-600 transition-colors duration-200"
                    >
                      <path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z" />
                    </svg>
                  </button>
                );
              },
            },

            {
              field: "root_cause",
              headerName: "Root Cause",
              headerAlign: "center",
              width: 400,
            },
            {
              field: "action",
              headerName: "Action",
              headerAlign: "center",
              width: 400,
            },
            {
              field: "action_by",
              headerName: "Action By",
              headerAlign: "center",
              align: "center",
              width: 180,
            },
            {
              field: "action_date",
              headerName: "Action Date",
              headerAlign: "center",
              align: "center",
              minwidth: 180,
            },
            {
              field: "approve_by",
              headerName: "Approve By",
              headerAlign: "center",
              align: "center",
              width: 180,
            },
            {
              field: "approve_date",
              headerName: "Approve Date",
              headerAlign: "center",
              align: "center",
              width: 180,
            },
            {
              field: "qa_approve_by",
              headerName: "QA Approve By",
              headerAlign: "center",
              align: "center",
              width: 180,
            },
            {
              field: "qa_approve_date",
              headerName: "QA Approve Date",
              headerAlign: "center",
              align: "center",
              width: 180,
            },
          ]}
          not_show_Count={false}
          loading={is_loading}
        />
      </div>
      <div>
        {data_update && (
          <Dialog_record
            Title={"RECORD UPDATE"}
            is_open={open}
            handleClose={handleClose}
            action_content={
              <>
                <div className="flex gap-2 pt-4">
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={data_update.qa_approve_date === null}
                    onClick={send_unlok_lot}
                  >
                    UNLOCK LOT
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handle_update_record}
                    disabled={
                      data_update.qa_approve_date !== null &&
                      data_update.action_date !== null &&
                      data_update.approve_date !== null
                    }
                  >
                    Save
                  </button>
                </div>
              </>
            }
          >
            <div className="p-3 max-w-9xl mx-auto">
              {/* Header Section */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-base">
                  Lot No: {data_update.lot_no || "N/A"}
                </h3>
                <h3 className="text-sm text-gray-500 font-bold">
                  ID: {data_update.id || "N/A"}
                </h3>
              </div>

              {/* Product Info */}
              <div className="bg-base-200 rounded-lg p-3 mb-3">
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>Product Name:</strong>{" "}
                    {data_update.product_name || "N/A"}
                  </div>
                  <div>
                    <strong>Reject Description:</strong>{" "}
                    {data_update.reject_desc || "N/A"}
                  </div>
                </div>
              </div>

              {/* Divider with Icon */}
              <div className="divider my-3">
                <div className="rounded-full bg-info/20 text-info p-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.2em"
                    width="1.2em"
                  >
                    <path d="M4 19h6v2H4a2 2 0 01-2-2V5a2 2 0 012-2h12l4 4v2.12l-2 2V7.83L15.17 5H4v14m10-9V6H5v4h9m6.42 2.3a.533.533 0 00-.38-.17c-.14 0-.28.06-.39.17l-1 1 2.05 2.05 1-1c.22-.21.22-.56 0-.77l-1.28-1.28M12 19.94V22h2.06l6.06-6.07-2.05-2.05L12 19.94M14 15c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3h.13L14 15.13V15" />
                  </svg>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                {/* Root Cause and Action */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Root Cause */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Root Cause
                    </label>
                    <textarea
                      className="textarea textarea-bordered textarea-sm w-full h-16 resize-none text-sm"
                      placeholder="Describe the root cause..."
                      value={data_update.root_cause || ""}
                      name="root_cause"
                      onChange={(e) => handle_change_dynamic(e)}
                    />
                  </div>
                  {/* Action */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Action
                    </label>
                    <textarea
                      className="textarea textarea-bordered textarea-sm w-full h-16 resize-none text-sm"
                      placeholder="Describe the action taken..."
                      value={data_update.action || ""}
                      name="action"
                      onChange={(e) => handle_change_dynamic(e)}
                    />
                  </div>
                </div>

                {/* Approval Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Action By */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Action By
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-full text-sm"
                      placeholder="Enter action by"
                      value={data_update.action_by || ""}
                      name="action_by"
                      onChange={(e) => handle_change_dynamic(e)}
                    />
                  </div>
                  {/* approve_by */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Approve By
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-full text-sm"
                      placeholder="Enter approve by"
                      value={data_update.approve_by || ""}
                      name="approve_by"
                      onChange={(e) => handle_change_dynamic(e)}
                    />
                  </div>
                  {/* QA Approve By */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      QA Approve By
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-full text-sm"
                      placeholder="Enter QA approve by"
                      value={data_update.qa_approve_by || ""}
                      name="qa_approve_by"
                      onChange={(e) => handle_change_dynamic(e)}
                    />
                  </div>
                  {/* Send to Unlock */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Action
                    </label>
                    <button
                      className={`btn btn-warning btn-sm w-full text-xs ${
                        !data_update.qa_approve_by ? "btn-disabled" : ""
                      }`}
                      onClick={send_unlok_lot}
                      disabled={!data_update.qa_approve_by}
                    >
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                      Send to Unlock
                    </button>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Comment
                  </label>
                  <textarea
                    className="textarea textarea-bordered textarea-sm w-full h-12 resize-none text-sm"
                    placeholder="Add any additional comments..."
                    value={data_update.comment || ""}
                    name="comment"
                    onChange={(e) => handle_change_dynamic(e)}
                  />
                </div>
              </div>
            </div>
          </Dialog_record>
        )}
      </div>
    </div>
  );
};

export default Out_of_Rule_Action;
