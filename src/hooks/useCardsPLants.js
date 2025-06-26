import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function useCardsPlants() {
  const { data, ...args } = useSWR("/api/plants", fetcher);

  return {
    cardsPlants: data,
    ...args,
  };
}
