import type { CustomSession } from "@/interfaces";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { format, isValid } from "date-fns";

export const is_in_indonesia = (latitude: number, longitude: number) => {
  const indonesiaBoundingBox = {
    north: 5.9,
    south: -10.5,
    west: 95.0,
    east: 141.0,
  };

  return (
    latitude <= indonesiaBoundingBox.north &&
    latitude >= indonesiaBoundingBox.south &&
    longitude >= indonesiaBoundingBox.west &&
    longitude <= indonesiaBoundingBox.east
  );
};

export function generate_random_number(length: number): string {
  const characters = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));

  return result;
}

export async function get_server_side_session() {
  return (await getServerSession(authOptions)) as CustomSession | null;
}

export const domainUrl = (url: string) => `${process.env.DOMAIN}/${url}`;

export function get_day_suffix(day: number) {
  if ([11, 12, 13].includes(day)) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function display_date_range(start: Date, end: Date) {
  const start_date = isValid(start) ? start : new Date();
  const end_date = isValid(end) ? end : new Date();

  return `${format(start_date, "MMMM d")}${get_day_suffix(
    start_date.getDate()
  )} - ${format(end_date, "MMMM d")}${get_day_suffix(
    end_date.getDate()
  )}, ${format(end_date, "yyyy")}`;
}
