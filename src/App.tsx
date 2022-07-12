import React, { useEffect, useState } from "react";
import "./App.css";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";

import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";

import dummyData from "./data/dummyData.json";

export interface PivotTableDataProps {
    pivotData: Record<string, any>[];
}

const pivotPresets = {
    cols: ["pizza"],
    rows: ["employee"],
    rendererName: "Table", // if not given will take table as default
    aggregatorName: "Sum", // if not given will take count as default
    vals: ["total"],
};

function App() {
    const [tableData, setTableData] = useState<PivotTableDataProps>({
        pivotData: [],
    });
    const [pivotConfig, setPivotConfig] = useState(pivotPresets);

    useEffect(() => {
        if (dummyData) {
            setTableData({
                ...tableData,
                ["pivotData"]: dummyData?.data,
            });
        }
    }, []);

    // create Plotly renderers via dependency injection
    const PlotlyRenderers = createPlotlyRenderers(Plot);

    return (
        <div>
            <PivotTableUI
                className="table"
                data={tableData?.pivotData}
                onChange={(e: any) => {
                    setTableData(e);
                }}
                renderers={{ ...TableRenderers, ...PlotlyRenderers }}
                {...pivotConfig}
                {...tableData}
            />
        </div>
    );
}

export default App;
