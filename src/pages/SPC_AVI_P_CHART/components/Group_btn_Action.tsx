import QueryStatsIcon from "@mui/icons-material/QueryStats";

const Group_btn_Action = ({
  handleClearAll,
  featch_top_reject,
  selectDateFrom,
  selectDateTo,
  selectproduct,
  selectreject,
  loading,
  fetchTableData,
}: {
  handleClearAll: () => void;
  featch_top_reject: () => void;
  selectDateFrom: string;
  selectDateTo: string;
  selectproduct: string;
  selectreject: string;
  loading: boolean;
  fetchTableData: () => void;
}) => {
  return (
    <>
      <button
        onClick={handleClearAll}
        disabled={!selectproduct && !selectreject}
        className="btn btn-info btn-md btn-soft"
      >
        Clear
      </button>

      {/* Reject Summary Button */}
      <button
        className="btn btn-md btn-warning btn-soft"
        onClick={featch_top_reject}
        disabled={selectproduct && selectreject ? false : true}
      >
        Top Reject
      </button>

      {/* Plot Chart Button */}
      {selectDateFrom && selectDateTo && selectproduct && selectreject ? (
        <button
          className="btn btn-md btn-success btn-soft"
          onClick={fetchTableData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Plot Chart"} <QueryStatsIcon />
        </button>
      ) : null}
    </>
  );
};

export default Group_btn_Action;
