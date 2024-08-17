"use client";

import {
  fetchCountries,
  getDeliveryProvider,
  updateDeliveryProvider,
} from "@/app/utils";
import { Country } from "@/models/country";
import { DeliveryProvider } from "@/models/delivery_provider";
import {
  Button,
  Input,
  listbox,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  id: number;
  provider_name: string;
  country_operate: string[];
  api_address: string;
  api_key: string;
  api_password: string;
  support_email: string;
  comments: string;
};

const Update = () => {
  const params = useParams<{ id: string }>();
  let [provider, setDeliveryProvider] = useState<DeliveryProvider>();

  useEffect(() => {
    getDeliveryProvider(+params.id).then((data) => {
      setDeliveryProvider(data.data);
      setSelected(data.data?.country_operate);
    });
  }, [params.id]);

  const ref = useRef(false);

  const { control, getValues } = useForm<FormData>({
    values: provider as FormData,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const provider = getValues();
    provider.country_operate = selectedCountries;
    event.preventDefault();
    updateDeliveryProvider(
      { ...provider },
      "../../../api/delivery_providers"
    ).then(() => {
      toast("Provider Updated");
    });
  };

  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    const path = "../../../api/countries";
    fetchCountries(path).then((data) => setCountries(data.countries));
  }, []);

  const [selectedCountries, setSelected] = useState<string[]>([]);

  const setSelectedCountries = (countries: string): void => {
    setSelected(countries.split(",").filter(v => v.length > 0));
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <p className="m-3 font-bold text-2xl">Update Delivery Provider</p>
        <form className="m-6" onSubmit={onSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Controller
              name="id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input type="number" label="ID" readOnly={true} {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
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
            {Array.isArray(selectedCountries)}
            <Controller
              name="country_operate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  label="Countries Operate"
                  placeholder="Select countries where provider works"
                  selectionMode="multiple"
                  {...field}
                  onChange={(e) => setSelectedCountries(e.target.value)}
                  selectedKeys={selectedCountries}
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
              rules={{ required: true }}
              render={({ field }) => (
                <Input type="text" label="API Address" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="api_key"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input type="text" label="API Key" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="api_password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input type="text" label="API Password/Secret" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="support_email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input type="email" label="Support Email" {...field} />
              )}
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-3">
            <Controller
              name="comments"
              control={control}
              rules={{ required: true }}
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
            Update Provider
          </Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Update;
