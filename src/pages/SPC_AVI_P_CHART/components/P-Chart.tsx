import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import { getThemeColors, observeThemeChanges } from "../../../themeUtils";

const P_Chart_Line = ({ data, loading }: { data: any; loading: boolean }) => {
  if (loading) {
    return (
      <div className="w-full">
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-6">
            {/* Chart skeleton */}
            <div className="animate-pulse">
              {/* Legend skeleton */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-base-300 rounded"></div>
                  <div className="w-8 h-4 bg-base-300 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-base-300 rounded"></div>
                  <div className="w-8 h-4 bg-base-300 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-base-300 rounded"></div>
                  <div className="w-8 h-4 bg-base-300 rounded"></div>
                </div>
              </div>

              {/* Chart area skeleton */}
              <div className="relative h-96 bg-base-200 rounded-lg">
                {/* Y-axis */}
                <div className="absolute left-4 top-4 bottom-16 w-8 space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-6 h-3 bg-base-300 rounded"></div>
                  ))}
                </div>

                {/* Chart lines */}
                <div className="absolute left-16 right-8 top-8 bottom-16">
                  <svg className="w-full h-full">
                    {/* Grid lines */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={`${(i + 1) * 20}%`}
                        x2="100%"
                        y2={`${(i + 1) * 20}%`}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-base-300"
                      />
                    ))}

                    {/* Chart line skeleton */}
                    <path
                      d="M0,60 Q25,40 50,80 T100,50"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-base-300"
                    />
                  </svg>
                </div>

                {/* X-axis */}
                <div className="absolute bottom-4 left-16 right-8 flex justify-between">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-8 h-3 bg-base-300 rounded"></div>
                  ))}
                </div>
              </div>

              {/* Axis labels skeleton */}
              <div className="flex justify-center mt-4">
                <div className="w-20 h-4 bg-base-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [figure, setFigure] = useState<any>(null);
  const [themeColors, setThemeColors] = useState<any>({});

  // Get theme colors
  useEffect(() => {
    const updateColors = () => {
      const colors = getThemeColors();
      setThemeColors(colors || {});
    };
    updateColors();
    const observer = observeThemeChanges(updateColors);
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const PI_DATA = data.map((item: any) => item.pi);
      const LCL = data.map((item: any) => item.lcl);
      const UCL = data.map((item: any) => item.ucl);
      const LOT_NO = data.map((item: any) => String(item.lot_no));

      const trace_pi = {
        x: LOT_NO,
        y: PI_DATA,
        type: "scattergl",
        mode: "lines+markers",
        name: "PI",
        marker: {
          color: themeColors.primary || "#3b82f6",
          size: 8,
          line: { color: "#ffffff", width: 2 },
        },
        line: { color: themeColors.primary || "#3b82f6", width: 3 },
      };

      const trace_lcl = {
        x: LOT_NO,
        y: LCL,
        type: "scattergl",
        mode: "lines",
        name: "LCL",
        line: {
          color: themeColors.error || "#ef4444",
          width: 2,
          dash: "dash",
        },
      };

      const trace_ucl = {
        x: LOT_NO,
        y: UCL,
        type: "scattergl",
        mode: "lines",
        name: "UCL",
        line: {
          color: themeColors.error || "#ef4444",
          width: 2,
          dash: "dash",
        },
      };

      const layout = {
        xaxis: {
          type: "category",
          title: {
            text: "Lot Number",
            font: {
              size: 14,
              color: themeColors["base-content"] || "#000",
            },
            standoff: 20,
          },
          gridcolor: themeColors["base-300"] || "#e5e7eb",
          gridwidth: 1,
          showgrid: true,
          tickfont: {
            size: 12,
            color: themeColors["base-content"] || "#000",
          },
          tickangle: -45,
          automargin: true,
        },
        yaxis: {
          title: {
            text: "Proportion (PI)",
            font: {
              size: 14,
              color: themeColors["base-content"] || "#000",
            },
            standoff: 20,
          },
          gridcolor: themeColors["base-300"] || "#e5e7eb",
          gridwidth: 1,
          showgrid: true,
          tickfont: {
            size: 12,
            color: themeColors["base-content"] || "#000",
          },
          zeroline: false,
        },
        paper_bgcolor: themeColors["base-100"] || "#ffffff",
        plot_bgcolor: themeColors["base-100"] || "#ffffff",
        legend: {
          orientation: "h",
          yanchor: "bottom",
          y: 1.02,
          xanchor: "center",
          x: 0.5,
          font: {
            size: 12,
            color: themeColors["base-content"] || "#000",
          },
          bgcolor: themeColors["base-300"] || "#e5e7eb",
          bordercolor: themeColors["base-300"] || "#e5e7eb",
          borderwidth: 1,
        },
        margin: {
          l: 80,
          r: 40,
          t: 60,
          b: 80,
        },
        hovermode: "closest",
        hoverlabel: {
          bgcolor: themeColors["base-200"] || "#f3f4f6",
          bordercolor: themeColors["base-300"] || "#e5e7eb",
          font: {
            color: themeColors["base-content"] || "#000",
            size: 12,
          },
        },
        showlegend: true,
      };

      const config = {
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["pan2d", "lasso2d", "select2d", "autoScale2d"],
        responsive: true,
      };

      const figure = {
        data: [trace_pi, trace_lcl, trace_ucl],
        layout: layout,
        config: config,
      };

      setFigure(figure);
    }
  }, [data, themeColors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-base-100 rounded-lg">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body text-center">
          <h3 className="text-lg font-semibold text-base-content">
            ไม่มีข้อมูล
          </h3>
          <p className="text-base-content/60">
            ไม่พบข้อมูลสำหรับแสดงผล P-Chart
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body p-2">
          {figure && (
            <Plot
              data={figure.data}
              layout={figure.layout}
              config={figure.config}
              style={{ width: "100%", height: "350px" }}
              useResizeHandler={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default P_Chart_Line;
