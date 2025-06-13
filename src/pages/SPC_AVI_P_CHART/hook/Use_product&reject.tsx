import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Get_main_filter from "../func/Get_main_filter";
import Get_main_data from "../func/Get_main_data";
import Get_Reject_data from "../func/Get_Reject_data";
import getUniqueObjectArray from "@/pages/utility/getUniqueObjectArray";

type TableRowType = {
  lot_no: string;
  pi: number;
  lcl: number | null;
  ucl: number | null;
};

type ProductFilterType = { product_name: string };
type RejectFilterType = { reject_desc: string };
type RowType = { product_name: string; reject_desc: string };

const Use_feature = () => {
  const [productFilter, setProductFilter] = useState<ProductFilterType[]>([]);
  const [rejectFilter, setRejectFilter] = useState<RejectFilterType[]>([]);
  const [allRows, setAllRows] = useState<RowType[]>([]);

  const [tableData, setTableData] = useState<TableRowType[]>([]);
  const [loading, setLoading] = useState(false); // ✅ เพิ่ม loading state

  const [selectproduct, setselectproduct] = useState<string>("");
  const [selectreject, setselectreject] = useState<string>("");

  const [selectDateFrom, setSelectDateFrom] = useState<string>(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [selectDateTo, setSelectDateTo] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const [top_reject_data, settop_reject_data] = useState<any>([]);
  const [is_open_dialog, setis_open_dialog] = useState<boolean>(false);

  const handle_Close = () => {
    settop_reject_data([]);
    setis_open_dialog(false);
  };

  const fetchMainData = async () => {
    const res = await Get_main_filter(selectDateFrom, selectDateTo);
    console.log(res);
    if (res.status === "OK") {
      const uniqueProducts = getUniqueObjectArray(res.data, "product_name");
      setAllRows(res.data);
      setProductFilter(uniqueProducts);
    } else {
      setAllRows([]);
    }
  };

  useEffect(() => {
    if (selectproduct && allRows.length > 0) {
      const filteredData = allRows.filter(
        (item) => item.product_name === selectproduct
      );
      const uniqueProducts = getUniqueObjectArray(filteredData, "product_name");
      setRejectFilter(uniqueProducts);
    } else {
      const filteredData = allRows.filter((item) => item.product_name);
      const uniqueProducts = getUniqueObjectArray(filteredData, "product_name");
      setRejectFilter(uniqueProducts);
    }
  }, [selectproduct, allRows]);

  const fetchTableData = async () => {
    setLoading(true); // ✅ เริ่ม loading
    const postData = {
      product_name: selectproduct,
      reject_desc: selectreject,
      start_date: selectDateFrom,
      end_date: selectDateTo,
    };
    const response = await Get_main_data(postData);
    if (response.status === "OK") {
      setTableData(response.data);
    } else {
      setTableData([]);
    }
    setLoading(false); // ✅ หยุด loading
  };

  const featch_top_reject = async () => {
    const res = await Get_Reject_data();
    if (res.status === "OK") {
      setis_open_dialog(true);
      settop_reject_data(res.data);
    } else {
      setis_open_dialog(true);
      settop_reject_data([]);
    }
  };

  useEffect(() => {
    if (selectDateFrom && selectDateTo) {
      fetchMainData();
    }
  }, [selectDateFrom, selectDateTo]);

  return {
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
    tableData, // ✅ ส่งออก tableData
    setTableData,
    fetchTableData,
    loading, // ✅ ส่งออก loading state
    featch_top_reject,
    top_reject_data,
    settop_reject_data,
    handle_Close,
    is_open_dialog,
  };
};

export default Use_feature;
