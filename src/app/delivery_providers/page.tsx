"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DeliveryProvider } from "@/models/delivery_provider";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";

export default function DeliveryProviders() {
  const colDefs: ColDef<DeliveryProvider>[] = [
    { field: "id" },
    { field: "provider_name" },
    { field: "country_operate" },
    { field: "api_address" },
    { field: "api_key" },
    { field: "api_password" },
    { field: "support_email" },
    { field: "comments" },
    { field: "actions" },
  ];
  const defaultColDef: ColDef = {
    flex: 1,
  };
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch("../api/delivery_providers")
      .then((response) => response.json())
      .then((data) => setRowData(data.data));
  }, []);

  const gridStyle = useMemo(() => ({ height: "90vh", width: "100%" }), []);

  return (
    <>
      <h1 className="ml-4 font-bold text-large">Delivery Providers</h1>
      <div style={gridStyle} className="ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
}
