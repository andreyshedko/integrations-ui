"use client";
import React, { useEffect, useState } from "react";
import { DeliveryProvider } from "@/models/delivery_provider";
import { Button, Link, useDisclosure } from "@nextui-org/react";
import { deleteDeliveryProvider, getDeliveryProviders } from "../utils";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeliveryProvidersGrid from "@/components/DeliveryProvidersGrid";

export default function DeliveryProviders() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [provider, setProvider] = useState<DeliveryProvider>();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteProvider = (): void => {
    setConfirmDelete(true);
  };

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getDeliveryProviders().then((data) => setRowData(data.data));
  }, []);

  useEffect(() => {
    if (!provider) return;
    deleteDeliveryProvider(provider!)
      .then((data) => {
        if (data.data === 0) {
          getDeliveryProviders().then((data) => setRowData(data.data));
          toast("Provider deleted");
          setConfirmDelete(false);
        }
      })
      .catch(() => toast("Delete Error"));
  }, [confirmDelete, provider]);

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        provider={provider!}
        deleteProvider={deleteProvider}
      />
      <div className="grid grid-cols-2">
        <p className="m-3 font-bold text-2xl">Delivery Providers</p>
        <Button
          href="../delivery_providers/create"
          as={Link}
          color="primary"
          variant="ghost"
          showAnchorIcon
          className="m-3"
        >
          Add Provider
        </Button>
      </div>
      <div>
        <DeliveryProvidersGrid
          rowData={rowData}
          setProvider={setProvider}
          onOpen={onOpen}
        />
      </div>
      <ToastContainer />
    </>
  );
}
