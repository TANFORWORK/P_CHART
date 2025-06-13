import { GridRenderCellParams } from "@mui/x-data-grid";


export const columns = [
  {
    field: "inspect_date",
    headerName: "Inspect Date",
    minWidth: 130,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "product_name",
    headerName: "Product Name",
    minWidth: 150,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "lot_no",
    headerName: "Lot No :",
    minWidth: 150,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "process",
    headerName: "Process",
    minWidth: 130,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "reject_desc",
    headerName: "Reject Description",
    minWidth: 180,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "total_input",
    headerName: "Total Input",
    minWidth: 150,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "rej_qty",
    headerName: "Rej Qty",
    minWidth: 120,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "pi",
    headerName: "PI",
    minWidth: 80,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "ucl",
    headerName: "UCL",
    minWidth: 80,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "lcl",
    headerName: "LCL",
    minWidth: 80,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "ooc",
    headerName: "OOC",
    headerAlign: "center",
    align: "center",
    width: 100,
    renderCell: (params: GridRenderCellParams<any, boolean>) => {
      return (
        <div
          className={`p-2 w-full rounded ${
            params.value
              ? "bg-[#f1948a] text-[#7b241c]"
              : "bg-[#82e0aa] text-[#0e6655]"
          }`}
        >
          {params.value ? "NG" : "PASS"}
        </div>
      );
    },
  },
];
