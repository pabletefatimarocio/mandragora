import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function useWarnings() {
  const { data, isLoading, error, mutate } = useSWR("/api/plants/warning", fetcher);

  return {
    warnings: data,
    isLoading,
    error,
    mutate
  }
}
