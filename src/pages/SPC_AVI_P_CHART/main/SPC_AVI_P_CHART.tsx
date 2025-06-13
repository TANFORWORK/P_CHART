import React from "react";

import Use_feature from "../hook/Use_product&reject";

import Table_MUIX from "../components/Table";
import Datepicker from "../components/Date_picker";
import DynamicAutocomplete from "../components/DynamicAutocomplete";
import Dialog_record from "../components/dialog_record";
import Group_btn_Action from "../components/Group_btn_Action";
import P_Chart_Line from "../components/P-Chart";
import { columns } from "../components/Columns";

import dayjs from "dayjs";

const SPC_AVI_P_CHART: React.FC = () => {
  const {
    productFilter,
    rejectFilter,
    selectproduct,
    setselectproduct,
    selectreject,
    setselectreject,
    selectDateFrom,
    setSelectDateFrom,
    selectDateTo,
    setSelectDateTo,
    fetchTableData,
    tableData,
    loading,
    featch_top_reject,
    top_reject_data,
    handle_Close,
    is_open_dialog,

    setTableData,
  } = Use_feature();

  // ✅ ฟังก์ชันสำหรับ Clear ข้อมูล
  const handleClearAll = () => {
    setselectproduct("");
    setselectreject("");
    setSelectDateFrom(dayjs().subtract(7, "day").format("YYYY-MM-DD"));
    setSelectDateTo(dayjs().format("YYYY-MM-DD"));
    setTableData([]);
  };

  return (
    <div className="container mx-auto mt-4 space-y-4">
      {/* Filter Controls */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Date From */}
          <div>
            <Datepicker
              value={selectDateFrom}
              onChange={setSelectDateFrom}
              label="Date From"
            />
          </div>

          {/* Date To */}
          <div>
            <Datepicker
              value={selectDateTo}
              onChange={setSelectDateTo}
              label="Date To"
            />
          </div>

          {/* Product Select */}
          <div>
            <DynamicAutocomplete
              options={productFilter}
              value={selectproduct}
              onChange={setselectproduct}
              disabled={false}
              label="Product Name"
              optionKey="product_name"
              placeholder="Select a product"
            />
          </div>

          {/* Reject Select */}
          <div>
            <DynamicAutocomplete
              options={rejectFilter}
              value={selectreject}
              onChange={setselectreject}
              disabled={false}
              label="Reject Description"
              optionKey="reject_desc"
              placeholder="Select a reject type"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-end">
            <Group_btn_Action
              handleClearAll={handleClearAll}
              featch_top_reject={featch_top_reject}
              selectDateFrom={selectDateFrom}
              selectDateTo={selectDateTo}
              selectproduct={selectproduct}
              selectreject={selectreject}
              loading={loading}
              fetchTableData={fetchTableData}
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="">
        <P_Chart_Line data={tableData} loading={loading} />
      </div>

      {/* Table Section */}
      <div className="">
        <Table_MUIX
          datas={tableData}
          columns={columns}
          not_show_Count={false}
          loading={loading}
          height={400}
        />
      </div>

      {/* Dialog */}
      <Dialog_record
        Title="Top Reject Summary"
        is_open={is_open_dialog}
        handleClose={handle_Close}
      >
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table_MUIX
              datas={top_reject_data}
              columns={[
                {
                  field: "item",
                  headerName: "Reject Description",
                  width: 200,
                  minWidth: 150,
                  flex: 2,
                },
                {
                  field: "rej_qty",
                  headerName: "Reject Qty",
                  width: 120,
                  minWidth: 100,
                  flex: 1,
                  type: "number",
                  headerAlign: "center",
                  align: "center",
                },
                {
                  field: "total_input",
                  headerName: "Total Input",
                  width: 120,
                  minWidth: 100,
                  flex: 1,
                  type: "number",
                  headerAlign: "center",
                  align: "center",
                },
                {
                  field: "reject_avg",
                  headerName: "Reject Avg",
                  width: 120,
                  minWidth: 100,
                  flex: 1,
                  type: "number",
                  headerAlign: "center",
                  align: "center",
                },
              ]}
              not_show_Count={false}
              loading={false}
              height={400}
            />
          </div>
        </div>
      </Dialog_record>
    </div>
  );
};

export default SPC_AVI_P_CHART;
