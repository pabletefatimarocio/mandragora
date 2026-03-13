import AddTag from "./AddTag";
import { useEffect, useState } from "react";
import { useTags } from "@/hooks/swr/useTags";
import { redirect } from "next/navigation";
import CheckCloseCircleBtn from "./ui/CheckCloseCircleBtn";
import styles from "./styles/Tags.module.css";
import usePlantDetails from "@/hooks/swr/usePlantDetails";

export default function Tags({ plantTags, plantId }) {
  const [editing, setEditing] = useState(false);
  const [addedTags, setAddedTags] = useState(plantTags);
  const { tags, isLoading, error } = useTags();
  const { mutate } = usePlantDetails(plantId);

  useEffect(() => {
    if (plantTags.length > addedTags.length || plantTags.length < addedTags.length) {
      setEditing(true);
    }
  }, [addedTags]);

  function handleCancel() {
    setAddedTags(plantTags);
    setEditing(false);
  }

  async function handleSubmit() {
    const body = {
      tags: addedTags,
    };

    const res = await fetch(`/api/plants/${plantId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (res.ok) {
      mutate();
      setEditing(false);
    }
  }

  if (isLoading) return <div></div>;

  if (error) redirect("/home");

  return (
    <div className={styles.tagsContainer}>
      <AddTag tags={tags.data} addedTags={addedTags} setAddedTags={setAddedTags} />
      {editing && (
        <div className={styles.btnsContainer}>
          <CheckCloseCircleBtn variant="check" onClick={handleSubmit} disabled={false} />
          <CheckCloseCircleBtn variant="close" onClick={handleCancel} />
        </div>
      )}
    </div>
  );
}
