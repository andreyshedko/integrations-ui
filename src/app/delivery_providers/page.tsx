"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DeliveryProvider } from "@/models/delivery_provider";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { Button, Link } from "@nextui-org/react";

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
      <div className="grid grid-cols-2">
        <p className="m-3 font-bold text-2xl">Delivery Providers</p>
        <Button
          href="../delivery_providers/create"
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
          className="m-3"
        >
          Add Provider
        </Button>
      </div>
      <div>
        <div style={gridStyle} className="ag-theme-quartz">
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  );
}
