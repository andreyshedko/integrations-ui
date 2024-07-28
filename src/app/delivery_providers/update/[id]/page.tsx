"use client";

import { fetchCountries, updateDeliveryProvider } from "@/app/utils";
import { Country } from "@/models/country";
import { DeliveryProvider } from "@/models/delivery_provider";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

const Update = () => {
  const params = useParams<{ id: string }>();

  const [countries, setRowData] = useState<Country[]>([]);
  useEffect(() => {
    const path = "../../../api/countries";
    fetchCountries(path).then((data) => setRowData(data.countries));
  }, []);

  const [selectedCountries, setSelected] = useState<string>("");

  let [provider, setDeliveryProvider] = useState<DeliveryProvider>();
  useEffect(() => {
    const path = `../api/delivery_providers/${params.id}`;
    updateDeliveryProvider(provider!, path).then((data) =>
      setDeliveryProvider(data.data)
    );
  }, [provider, params.id]);

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

    setDeliveryProvider({ ...provider } as DeliveryProvider);
  };

  const setCountries = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <p className="m-3 font-bold text-2xl">Update Delivery Provider</p>
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
            Update Provider
          </Button>
        </form>
      </div>
    </>
  );
};

export default Update;
