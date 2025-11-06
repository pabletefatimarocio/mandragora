import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export function useTags() {
  const { data, ...args } = useSWR("/api/plants/tags", (url) => fetcher(url));

  return {
    ...args,
    tags: data,
  };
}
