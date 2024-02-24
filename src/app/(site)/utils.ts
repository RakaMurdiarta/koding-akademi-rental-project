import { deleteCookie } from "cookies-next";

export function formatToRupiahIntl(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateString(isoDateString: string): string {
  const date = new Date(isoDateString);
  // Fixed locale and options inside the function
  const locale = "id-ID";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}

export const logout = () => {
  deleteCookie("jwt");
  deleteCookie("isAdmin");
  window.location.reload();
};
