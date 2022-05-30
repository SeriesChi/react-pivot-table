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
    rendererName: "Table",
    aggregatorName: "Sum",
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

    const PlotlyRenderers = createPlotlyRenderers(Plot);
    return (
        <div>
            <PivotTableUI
                className="table"
                data={tableData?.pivotData}
                onChange={(e: any) => {
                    setTableData(e);
                }}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...pivotConfig}
                {...tableData}
            />
        </div>
    );
}

export default App;
