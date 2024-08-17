"use client";

import { addDeliveryProvider, fetchCountries } from "@/app/utils";
import { Country } from "@/models/country";
import { DeliveryProvider } from "@/models/delivery_provider";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  provider_name: string;
  country_operate: string[];
  api_address: string;
  api_key: string;
  api_password: string;
  support_email: string;
  comments: string;
};

export default function AddDeliveryProvider() {
  const [countries, setRowData] = useState<Country[]>([]);
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      provider_name: "",
      country_operate: [""],
      api_address: "",
      api_key: "",
      api_password: "",
      support_email: "",
      comments: "",
    },
  });
  const onSubmit = handleSubmit((data) => {
    data.country_operate = selectedCountries.split(",");
    setDeliveryProvider(data as DeliveryProvider);
  });

  useEffect(() => {
    const path = "../../api/countries";
    fetchCountries(path).then((data) => setRowData(data.countries));
  }, []);

  let [provider, setDeliveryProvider] = useState<DeliveryProvider>();

  const [selectedCountries, setSelected] = useState<string>("");

  useEffect(() => {
    if (!provider) return;
    addDeliveryProvider(provider!);
  }, [provider]);

  const setCountries = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <p className="m-3 font-bold text-2xl">Add Delivery Provider</p>
        <form className="m-6" onSubmit={onSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Controller
              name="provider_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  label="Provider Name"
                  placeholder="Enter provider name"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="provider_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  label="Countries Operate"
                  placeholder="Select countries where provider works"
                  selectionMode="multiple"
                  {...field}
                  onChange={setCountries}
                >
                  {countries.map((country) => (
                    <SelectItem key={country.alpha2}>{country.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="api_address"
              control={control}
              render={({ field }) => (
                <Input type="text" label="API Address" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="api_key"
              control={control}
              render={({ field }) => (
                <Input type="text" label="API Key" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="api_password"
              control={control}
              render={({ field }) => (
                <Input type="text" label="API Password/Secret" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="support_email"
              control={control}
              render={({ field }) => (
                <Input type="email" label="Support Email" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Comments"
                  placeholder="Enter your description"
                  {...field}
                />
              )}
            />
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
