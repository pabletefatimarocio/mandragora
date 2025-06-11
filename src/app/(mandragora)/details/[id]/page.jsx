import PlantDetails from "@/components/PlantDetails";

export default async function DetailsPage({ params }) {
  const {id} = await params;
  return (
    <div>
      <PlantDetails id={id}/>
    </div>
  );
}