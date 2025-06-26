import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function usePlantDetails(id) {
  const { data, ...args } = useSWR(`/api/plants/details/${id}`, fetcher);

  return {
    plant: data,
    ...args,
  };
}
