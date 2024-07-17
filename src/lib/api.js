import useSWR, { mutate } from "swr";
import { fetcher } from "./utils";

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function postData(url) {
  const result = async (data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    mutate(url);
    return response.json();
  };

  return result;
}

export function putData(url) {
  const result = async (data) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    mutate(url);
    return response.json();
  };

  return result;
}

// swr
export function useGet(url, shouldFetch = true) {
  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
