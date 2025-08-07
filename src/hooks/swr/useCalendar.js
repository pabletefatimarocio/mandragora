import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function useCalendar(date) {
  const { data, ...args } = useSWR(`/api/calendar/${date}`, fetcher);

  return {
    calendar: data,
    ...args,
  };
}
