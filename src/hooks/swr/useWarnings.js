import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function useWarnings() {
  const { data, ...args } = useSWR("/api/plants/warning", fetcher);

  return {
    warnings: data,
    ...args
  }
}
