"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DeliveryProvider } from "@/models/delivery_provider";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DeliveryProviders() {
  const router = useRouter();
  const navigateToRoute = (id: number, path: string) => {
    router.push(`../delivery_providers/${path}/${id}`)
  };

  const EditButtonComponent = (props: CustomCellRendererProps) => {
    return (
      <Button size="sm" onClick={() => navigateToRoute(props.data.id, 'update')}>
        Edit
      </Button>
    );
  };

  const DeleteButtonComponent = (props: CustomCellRendererProps) => {
    return (
      <Button size="sm" onClick={() => navigateToRoute(props.data.id, 'edit')}>
        Delete
      </Button>
    );
  };

  const colDefs: ColDef<DeliveryProvider & { edit: void; delete: void }>[] = [
    { field: "id" },
    { field: "provider_name" },
    { field: "country_operate" },
    { field: "api_address" },
    { field: "api_key" },
    { field: "api_password" },
    { field: "support_email" },
    { field: "comments" },
    { field: "edit", cellRenderer: EditButtonComponent, headerName: "" },
    { field: "delete", cellRenderer: DeleteButtonComponent, headerName: "" },
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
