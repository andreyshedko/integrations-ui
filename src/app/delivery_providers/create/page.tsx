"use client";

import { DeliveryProvider } from "@/models/delivery_provider";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function AddDeliveryProvider() {
  const [countries, setRowData] = useState([]);

  useEffect(() => {
    fetch("../api/countries")
      .then((response) => response.json())
      .then((data) => setRowData(data.countries));
  }, []);

  let [provider, setProvider] = useState<DeliveryProvider>();

    useEffect(() => {
      fetch("../api/delivery_providers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => console.log(response))
        .then((data) => console.log());
    }, [provider]);

  const saveProvider = (e: FormData) => {
    provider = {
        provider_name: e.get('provider_name'),
        country_operates: e.get('country_operates'),
        api_address: e.get('api_address')
    }

    setProvider(provider)
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <p className="m-3 font-bold text-2xl">Add Delivery Provider</p>
        <form className="m-6" action={saveProvider}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Provider Name"
              placeholder="Enter provider name"
              name="provider_name"
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Select
              label="Countries Operate"
              placeholder="Select countries where provider works"
              selectionMode="multiple"
              name="countries_operate"
            >
              {countries.map((country) => (
                <SelectItem key={country.id}>{country.name}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Input type="text" label="API Address" name="api_address" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Input type="text" label="API Key" name="api_key" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Input
              type="text"
              label="API Password/Secret"
              name="api_password"
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Input type="email" label="Support Email" name="support_email" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Textarea label="Comments" placeholder="Enter your description" />
          </div>

          <Button color="primary" variant="bordered" type="submit" className="mt-3">
            Save Provider
          </Button>
        </form>
      </div>
    </>
  );
}
