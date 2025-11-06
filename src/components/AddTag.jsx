import { useState } from "react";
import styles from "./styles/AddTag.module.css";
import { motion } from "motion/react";
import { FaCheck, FaX, FaPlus } from "react-icons/fa6";

export default function AddTag({ tags, addedTags, setAddedTags }) {
  const [oldTags, setOldTags] = useState(tags);
  const [newTagVisibility, setNewTagVisibility] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [pickedColor, setPickedColor] = useState("#22468a");

  function handleTagNameChange(e) {
    setNewTag(e.target.value);
  }

  function addNewTag() {
    const newTagItem = {
      id: Math.random().toString(15).slice(2),
      name: newTag,
      color: pickedColor,
    };
    setAddedTags((prevState) => [...prevState, newTagItem]);
    setNewTag("");
    setNewTagVisibility(false);
  }

  function addTag(id) {
    const addedTag = oldTags.find((tag) => tag.id === id);
    setAddedTags((prevState) => [...prevState, addedTag]);
    setOldTags(oldTags.filter((tag) => tag.id !== id));
    setNewTag("");
    setNewTagVisibility(false);
  }

  function deleteTag(id) {
    const restoredTag = addedTags.find((tag) => tag.id === id);
    setOldTags((prevState) => [...prevState, restoredTag]);
    setAddedTags(addedTags.filter((tag) => tag.id !== id));
  }

  return (
    <div className={styles.tagsContainer}>
      {addedTags.length > 0 && (
        <div className={styles.addedTagsContainer}>
          {addedTags.map((tag) => (
            <div key={tag.id} className={styles.addedTag} style={{ backgroundColor: tag.color }}>
              {tag.name}
              <button type="button" className={styles.addedTagCloseBtn} onClick={() => deleteTag(tag.id)}>
                <FaX size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!newTagVisibility && (
        <motion.button
          className={styles.addTagBtn}
          type="button"
          onClick={() => setNewTagVisibility(true)}
          initial={{ width: "100%" }}
          animate={{ width: 25 }}
        >
          <div className={styles.icon}>
            <FaPlus size={18} />
          </div>
        </motion.button>
      )}

      {newTagVisibility && (
        <motion.div
          initial={{ width: 25, backgroundColor: "var(--green-light)" }}
          animate={{ width: "100%", backgroundColor: "var(--white)" }}
          className={styles.addTagInputContainer}
        >
          <input
            type="text"
            placeholder="Etiqueta..."
            className={styles.addTagInput}
            value={newTag}
            onChange={handleTagNameChange}
          />

          {newTag.length === 0 && (
            <button type="button" onClick={() => setNewTagVisibility(false)} className={styles.tagInputBtn}>
              <FaX size={13} />
            </button>
          )}

          {newTag.length > 0 && (
            <button type="button" onClick={addNewTag} className={styles.tagInputBtn}>
              <FaCheck size={13} />
            </button>
          )}

          {newTag.length > 0 && (
            <input
              type="color"
              value={pickedColor}
              onChange={(e) => setPickedColor(e.target.value)}
              className={styles.colorPicker}
            />
          )}

          {newTag.length > 0 && (
            <div className={styles.tagsSelector}>
              {oldTags
                .filter((tag) => tag.name.toLowerCase().includes(newTag.toLowerCase()))
                .slice(0, 5)
                .map((tag) => (
                  <button key={tag.id} className={styles.tagsSelectorItem} type="button" onClick={() => addTag(tag.id)}>
                    {tag.name}
                  </button>
                ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
