import AddTag from "./AddTag";
import { useEffect, useState } from "react";
import { useTags } from "@/hooks/swr/useTags";
import { redirect } from "next/navigation";
import CheckCloseCircleBtn from "./ui/CheckCloseCircleBtn";
import styles from "./styles/Tags.module.css";

export default function Tags({ plantTags }) {
  const [editing, setEditing] = useState(false);
  const [addedTags, setAddedTags] = useState(plantTags);
  const { tags, isLoading, error } = useTags();

  useEffect(() => {
    if (plantTags.length > addedTags.length || plantTags.length < addedTags.length) {
      setEditing(true);
    }
  }, [addedTags]);

  function handleCancel() {
    setAddedTags(plantTags);
    setEditing(false);
  }

  if (isLoading) return <div></div>;

  if (error) redirect("/home");

  return (
    <div className={styles.tagsContainer}>
      <AddTag tags={tags.data} addedTags={addedTags} setAddedTags={setAddedTags} />
      {editing && (
        <div className={styles.btnsContainer}>
          <CheckCloseCircleBtn variant="check" onClick={() => {}} disabled={false} />
          <CheckCloseCircleBtn variant="close" onClick={handleCancel} />
        </div>
      )}
    </div>
  );
}
