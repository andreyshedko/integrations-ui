"use client";

import { DeliveryProvider } from "@/models/delivery_provider";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface Country {
  id: number;
  alpha2: string;
  alpha3: string;
  name: string;
}

export default function AddDeliveryProvider() {
  const [countries, setRowData] = useState<Country[]>([]);

  useEffect(() => {
    fetch("../api/countries")
      .then((response) => response.json())
      .then((data) => setRowData(data.countries));
  }, []);

  let [provider, setProvider] = useState<DeliveryProvider>();

  const [selectedCountries, setSelected] = useState<string>("");

  useEffect(() => {
    fetch("../api/delivery_providers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    })
      .then((response) => response.json())
      .then((data) => setProvider(data));
  }, [provider]);

  const saveProvider = (e: FormData) => {
    provider = {
      provider_name: e.get("provider_name"),
      country_operate: selectedCountries.split(","),
      api_address: e.get("api_address"),
      api_key: e.get("api_key"),
      api_password: e.get("api_password"),
      support_email: e.get("support_email"),
      comments: e.get("comments"),
    };

    setProvider({ ...provider } as DeliveryProvider);
  };

  const setCountries = (e) => {
    setSelected(e.target.value);
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
              onChange={setCountries}
            >
              {countries.map((country) => (
                <SelectItem key={country.alpha2}>{country.name}</SelectItem>
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

          <Button
            color="primary"
            variant="bordered"
            type="submit"
            className="mt-3"
          >
            Save Provider
          </Button>
        </form>
      </div>
    </>
  );
}
