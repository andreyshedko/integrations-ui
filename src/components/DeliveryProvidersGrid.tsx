"use client";
import { DeliveryProvider } from "@/models/delivery_provider";
import { ColDef } from "@ag-grid-community/core";
import { Button } from "@nextui-org/react";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { useMemo } from "react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { useRouter } from "next/navigation";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface IDeliveryProvidersGrid {
  setProvider: any;
  onOpen: () => void;
  rowData: any;
}

const DeliveryProvidersGrid = (props: IDeliveryProvidersGrid) => {
  const { setProvider, onOpen, rowData } = props;
  const gridStyle = useMemo(() => ({ height: "90vh", width: "100%" }), []);

  const router = useRouter();

  const navigateToRoute = (id: number, path: string) => {
    router.push(`../delivery_providers/${path}/${id}`);
  };

  const EditButtonComponent = (props: CustomCellRendererProps) => {
    return (
      <Button
        size="sm"
        onClick={() => {
          navigateToRoute(props.data.id, "update");
        }}
      >
        <EditIcon /> Edit
      </Button>
    );
  };

  const DeleteButtonComponent = (props: CustomCellRendererProps) => {
    return (
      <Button size="sm" onClick={() => {
        onOpen();
        setProvider(props.data);
      }}>
        <DeleteIcon /> Delete
      </Button>
    );
  }

  const colDefs: ColDef<DeliveryProvider & { edit: void; delete: void }>[] = [
    { field: "id" },
    { field: "provider_name", headerName: "Provider Name" },
    { field: "country_operate", headerName: "Countries" },
    { field: "api_address" },
    { field: "api_key" },
    { field: "api_password" },
    { field: "support_email", headerName: "Support Email" },
    { field: "comments" },
    { field: "edit", cellRenderer: EditButtonComponent, headerName: "" },
    { field: "delete", cellRenderer: DeleteButtonComponent, headerName: "" },
  ];
  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <>
      <div style={gridStyle} className="ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={15}
          paginationPageSizeSelector={[5, 10, 15, 20]}
          rowSelection="multiple"
        />
      </div>
    </>
  );
};

export default DeliveryProvidersGrid;
