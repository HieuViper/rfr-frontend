import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// swr
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function convertToAbbreviation(amount) {
  // this function convert number to abbreviation
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Invalid input";
  }

  if (amount < 1000000) {
    let thousands = Math.round((amount % 100000) / 1000);
    return thousands + "k";
  } else {
    let trillions = Math.floor(amount / 1000000);
    let thousands = Math.round((amount % 1000000) / 1000);

    if (thousands === 0) {
      return trillions + "tr";
    } else {
      return trillions + "," + thousands + "tr";
    }
  }
}

export function toSlug(str) {
  str = str.toLowerCase();

  // xóa dấu
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  return str;
}

export function getIdFromSlug(slug) {
  const parts = slug.split("-");
  const id = parts.pop();
  return id;
}

export function deleteAttributeInSearchParams(searchParams, attributes) {
  // 2 params : searchParams: searchParams of nextjs, attributes: array
  // this function delete attribute already have

  let searchParamsUrl = "";
  Object.keys(searchParams).forEach(function (key, index) {
    if (attributes.includes(key)) return;
    searchParamsUrl += `${key}=${searchParams[key]}&`;
  });
  searchParamsUrl.endsWith("&") &&
    (searchParamsUrl = searchParamsUrl.slice(0, -1));
  return searchParamsUrl;
}

export function deleteAttributeInUrl(currentUrl, attributes) {
  // 2 params : currentUrl: string, attributes: array
  // delete attribute already have in current url

  const urlObj = new URL(currentUrl);
  const valuesToRemove = attributes;
  valuesToRemove.forEach((value) => {
    urlObj.searchParams.delete(value);
  });
  const newUrl = urlObj.toString();

  return newUrl;
}
