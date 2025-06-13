import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Get_filter from "../func/Get_filter";
import Get_table from "../func/Get_table";
const useFilter = () => {
  // fromdate - todate
  const [fromDate, setFromDate] = useState<string>(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [productName, setProductName] = useState("");
  const [rejectDesc, setRejectDesc] = useState("");

  const [option_main, setOptionMain] = useState([]);
  const [options_product, setoptions_product] = useState([]);
  const [options_reject, setoptions_reject] = useState([]);

  const [data_record, setdata_record] = useState([]);
  const [is_loading, setIsLoading] = useState(false);

  useEffect(() => {
    Get_table_Record(fromDate, toDate, productName, rejectDesc);
  }, [fromDate, toDate, productName, rejectDesc]);
  useEffect(() => {
    if (fromDate && toDate) {
      setProductName("");
      setRejectDesc("");
      setdata_record([]);
      const dateRange = {
        fromDate: fromDate,
        toDate: toDate,
      };
      console.log(dateRange);
      const fetchData = async () => {
        const data = await Get_filter(dateRange.fromDate, dateRange.toDate);
        if (data) {
          setOptionMain(data.data);
        } else {
          setOptionMain([]);
        }
      };
      fetchData();
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    const unique_Product: any = [
      ...new Set(option_main.map((f: any) => f.product_name)),
    ];
    console.log(unique_Product);
    setoptions_product(unique_Product);
  }, [option_main]);

  useEffect(() => {
    if (productName) {
      const filtered_by_product = option_main.filter(
        (f: any) => f.product_name === productName
      );
      const unique_reject: any = [
        ...new Set(filtered_by_product.map((f: any) => f.reject_desc)),
      ];
      setoptions_reject(unique_reject);
    } else {
      const unique_reject: any = [
        ...new Set(option_main.map((f: any) => f.reject_desc)),
      ];
      setoptions_reject(unique_reject);
    }
    if (rejectDesc) {
      setdata_record([]);
    }
  }, [productName, option_main]);

  const Get_table_Record = async (
    from_date: string,
    to_date: string,
    product_name: string,
    reject_Desc: string
  ) => {
    setIsLoading(true);
    const data = await Get_table(from_date, to_date, product_name, reject_Desc);
    if (data) {
      setdata_record(data.data);
      setIsLoading(false);
      return true;
    } else {
      setdata_record([]);
      setIsLoading(false);
      return false;
    }
  };

  return {
    fromDate,
    setFromDate,
    toDate,
    setToDate,

    productName,
    setProductName,
    rejectDesc,
    setRejectDesc,

    options_product,
    setoptions_product,
    options_reject,
    setoptions_reject,

    Get_table_Record,
    data_record,
    is_loading,
  };
};

export default useFilter;
