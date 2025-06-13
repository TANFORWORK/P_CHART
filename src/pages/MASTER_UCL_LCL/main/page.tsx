import Get_Master_data from "../funcs/Get_Master_data";
import { useEffect, useState } from "react";
import Table_MUIX from "../components/Table";
import dayjs from "dayjs";

const Master_UCL_LCL: React.FC = () => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    const data = await Get_Master_data();
    console.log(data.data);
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <Table_MUIX
        datas={data}
        columns={[
          { field: "id", headerName: "ID", width: 90, hide: true },
          { field: "for_month", headerName: "For Month", width: 120 },
          { field: "inspec_month", headerName: "Inspect Month", width: 130 },
          { field: "product", headerName: "Product", width: 150 },
          {
            field: "reject_desc",
            headerName: "Reject Description",
            width: 180,
          },
          { field: "ucl", headerName: "UCL", width: 100, type: "number" },
          { field: "lcl", headerName: "LCL", width: 100, type: "number" },
          {
            field: "update_date",
            headerName: "Update Date",
            width: 180,
            renderCell: (params: any) => {
              return params.value
                ? dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
                : "";
            },
          },
          {
            field: "create_date",
            headerName: "Create Date",
            width: 180,
            renderCell: (params: any) => {
              return params.value
                ? dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
                : "";
            },
          },
        ]}
        not_show_Count={false}
        loading={false}
        height={500}
      />
    </div>
  );
};

export default Master_UCL_LCL;
