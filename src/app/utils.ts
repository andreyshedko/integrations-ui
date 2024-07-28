import { DeliveryProvider } from "@/models/delivery_provider";

export const fetchCountries = async (path: string): Promise<Response> => {
  const response = await fetch(path);
  return await response.json();
};

export const getDeliveryProvider = async (): Promise<Response> => {
  const response = await fetch("../api/delivery_providers");
  return await response.json();
};

export const addDeliveryProvider = async (
  provider: DeliveryProvider
): Promise<Response> => {
  const response = await fetch("../api/delivery_providers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(provider),
  });
  return await response.json();
};

export const updateDeliveryProvider = async (
  provider: DeliveryProvider,
  path: sting
) => {
  const response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(provider),
  });
  return await response.json();
};

export const deleteDeliveryProvider = async (provider: DeliveryProvider) => {
  const response = await fetch(`../api/delivery_providers`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(provider),
  });
  return await response.json();
};
