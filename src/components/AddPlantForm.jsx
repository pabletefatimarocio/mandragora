"use client";

import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import styles from "./styles/AddPlantForm.module.css";
import { plantInputSchema } from "@/schemas/zod/plants";
import { useRouter } from "next/navigation";
import { useTags } from "@/hooks/swr/useTags";
import AddTag from "./AddTag";

const plantInputInitialState = {
  name: "",
  scientific: "",
  location_place: "",
  location_type: "Interior",
  under_rain: false,
  watering: 0,
  waterings: [],
  fertilization: 0,
  fertilizations: [],
  tags: [],
  imageFile: {
    name: "",
    file: "",
  },
};

const errorsInitialState = {
  name: [],
  scientific: [],
  location_place: [],
  watering: [],
  waterings: [],
  fertilization: [],
  fertilizations: [],
  imageFile: [],
};

export default function AddPlantForm() {
  const [plantInput, setPlantInput] = useState(plantInputInitialState);
  const [errors, setErrors] = useState(errorsInitialState);
  const [isFertilized, setIsFertilized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedTags, setAddedTags] = useState([]);
  const { tags } = useTags();
  const router = useRouter();

  //HANDLE_INPUT
  function handleChange(e) {
    setPlantInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  //HANDLE_DATE
  function handleDateChange(e) {
    setPlantInput((prevState) => {
      if (e.target.value) {
        const [year, month, day] = e.target.value.split("-").map(Number);
        const date = new Date(year, month - 1, day).toISOString();
        return {
          ...prevState,
          [e.target.name]: [date],
        };
      } else {
        return {
          ...prevState,
          [e.target.name]: [],
        };
      }
    });
  }

  //HANDLE_NUMBERS
  function handleNumberChange(e) {
    const number = +e.target.value;

    if (number) {
      setPlantInput((prevState) => {
        return {
          ...prevState,
          [e.target.name]: number,
        };
      });
    }
  }

  //UPLOAD_IMAGE
  async function handleUploadedFile(e) {
    const file = e.target.files[0];

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setPlantInput((prevState) => {
        return {
          ...prevState,
          imageFile: {
            name: file.name,
            file: base64String,
          },
        };
      });
    };

    reader.readAsDataURL(compressedFile);
  }

  //HANDLE_SUBMIT
  async function handleSubmit(e) {
    let hasEarlyErrors = false;
    e.preventDefault();
    setErrors(errorsInitialState);

    if (isFertilized) {
      if (plantInput.fertilization === 0) {
        hasEarlyErrors = true;
        setErrors((prevState) => {
          return {
            ...prevState,
            fertilization: ["Debes establecer una frecuencia de fertilización."],
          };
        });
      }
    }

    const zodResponse = plantInputSchema.safeParse({ ...plantInput, tags: addedTags });
    //SUCCESS
    if (zodResponse.success && !hasEarlyErrors) {
      setErrors(errorsInitialState);
      setLoading(true);
      const res = await fetch("/api/plants", {
        method: "POST",
        body: JSON.stringify(zodResponse.data),
      });

      if (res.ok) {
        const resJSON = await res.json();
        const { id } = resJSON.data;
        router.push(`/details/${id}`);
      } else {
        if (res.status === 400) {
          setLoading(false);
          setErrors((prevState) => {
            return {
              ...prevState,
              name: ["Este nombre ya ha sido asignado a otra planta."],
            };
          });
        }
      }
    } else {
      //ERRORS
      zodResponse.error?.issues.forEach((error) => {
        setErrors((prevState) => ({
          ...prevState,
          [error.path[0]]: [...prevState[error.path[0]], error.message],
        }));
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* NAME */}
      <div>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={plantInput.name}
          onChange={handleChange}
          className={styles.formInput}
        />
        <ul className={styles.errors}>
          {errors.name.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
      {/* SCIENTIFIC_NAME */}
      <div>
        <input
          type="text"
          placeholder="Nombre científico"
          name="scientific"
          value={plantInput.scientific}
          onChange={handleChange}
          className={styles.formInput}
        />
        <ul className={styles.errors}>
          {errors.scientific.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
      {/* LOCATION */}
      <div>
        <div className={styles.location}>
          <input
            type="text"
            placeholder="Ubicación"
            name="location_place"
            value={plantInput.location_place}
            onChange={handleChange}
            className={styles.formInput}
          />
          <button
            type="button"
            onClick={() =>
              setPlantInput((prevState) => {
                return { ...prevState, location_type: "Interior" };
              })
            }
            className={plantInput.location_type === "Interior" ? styles.activeBtn : undefined}
          >
            Interior
          </button>
          <button
            type="button"
            onClick={() =>
              setPlantInput((prevState) => {
                return { ...prevState, location_type: "Exterior" };
              })
            }
            className={plantInput.location_type === "Exterior" ? styles.activeBtn : undefined}
          >
            Exterior
          </button>
        </div>
        <ul className={styles.errors}>
          {errors.location_place.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
      {/* RAIN */}
      <div className={styles.rain}>
        <span>¿Tu planta recibe agua de lluvia?</span>
        <button
          type="button"
          onClick={() =>
            setPlantInput((prevState) => {
              return { ...prevState, under_rain: true };
            })
          }
          className={plantInput.under_rain ? styles.activeBtn : undefined}
        >
          Si
        </button>
        <button
          type="button"
          onClick={() =>
            setPlantInput((prevState) => {
              return { ...prevState, under_rain: false };
            })
          }
          className={!plantInput.under_rain ? styles.activeBtn : undefined}
        >
          No
        </button>
      </div>
      {/* WATERING */}
      <div>
        <div className={styles.watering}>
          <span>Riego cada</span>
          <div className={styles.setters}>
            <button
              type="button"
              disabled={plantInput.watering <= 0}
              className={styles.setterLeft}
              onClick={() =>
                setPlantInput((prevState) => {
                  return { ...prevState, watering: prevState.watering - 1 };
                })
              }
            >
              -
            </button>
            <input
              type="text"
              maxLength={3}
              inputMode="numeric"
              name="watering"
              value={`${plantInput.watering}`}
              className={styles.wateringInput}
              onChange={handleNumberChange}
            />
            <button
              type="button"
              className={styles.setterRight}
              disabled={plantInput.watering >= 999}
              onClick={() =>
                setPlantInput((prevState) => {
                  return { ...prevState, watering: prevState.watering + 1 };
                })
              }
            >
              +
            </button>
          </div>
          <span>días</span>
        </div>
        <ul className={styles.errors}>
          {errors.watering.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
      {/* LAST_WATERING */}
      <div>
        <div className={styles.lastWatering}>
          <span>Último riego</span>
          <input
            className={`${styles.formInput} ${styles.dateInput}`}
            type="date"
            name="waterings"
            onChange={handleDateChange}
          />
        </div>
        <ul className={styles.errors}>
          {errors.waterings.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
      {/* FERTILIZATION_CHECK */}
      <div className={styles.rain}>
        <span>¿Tu planta recibe fertilización?</span>
        <button
          type="button"
          onClick={() => setIsFertilized(true)}
          className={isFertilized ? styles.activeBtn : undefined}
        >
          Si
        </button>
        <button
          type="button"
          onClick={() => {
            setPlantInput((prevState) => {
              return {
                ...prevState,
                fertilization: plantInputInitialState.fertilization,
                fertilizations: plantInputInitialState.fertilizations,
              };
            });
            setIsFertilized(false);
          }}
          className={!isFertilized ? styles.activeBtn : undefined}
        >
          No
        </button>
      </div>
      {isFertilized && (
        <>
          {/* FERTILIZATION */}
          <div>
            <div className={styles.fertilization}>
              <span>Fertilización cada</span>
              <div className={styles.setters}>
                <button
                  type="button"
                  disabled={plantInput.fertilization <= 0}
                  className={styles.setterLeft}
                  onClick={() =>
                    setPlantInput((prevState) => {
                      return { ...prevState, fertilization: prevState.fertilization - 1 };
                    })
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  maxLength={3}
                  inputMode="numeric"
                  name="fertilization"
                  value={`${plantInput.fertilization}`}
                  className={styles.wateringInput}
                  onChange={handleNumberChange}
                />
                <button
                  type="button"
                  className={styles.setterRight}
                  disabled={plantInput.fertilization >= 999}
                  onClick={() =>
                    setPlantInput((prevState) => {
                      return { ...prevState, fertilization: prevState.fertilization + 1 };
                    })
                  }
                >
                  +
                </button>
              </div>
              <span>días</span>
            </div>
            <ul className={styles.errors}>
              {errors.fertilization.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
          {/* LAST_FERTILIZATION */}
          <div>
            <div className={styles.lastFertilization}>
              <span>Última fertilización</span>
              <input
                className={`${styles.formInput} ${styles.dateInput}`}
                type="date"
                name="fertilizations"
                onChange={handleDateChange}
              />
            </div>
            <ul className={styles.errors}>
              {errors.fertilizations.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* TAGS */}
      <div className={styles.tagsField}>
        <span>Etiquetas</span>
        {tags && <AddTag tags={tags.data} addedTags={addedTags} setAddedTags={setAddedTags} />}
      </div>

      {/* IMAGE_UPLOADER */}
      <div>
        <div className={styles.imageUpload}>
          <label htmlFor="imgUploader">
            <div className={styles.imagePreview}>
              {plantInput.imageFile.file !== "" ? (
                <Image src={plantInput.imageFile.file} alt="" fill />
              ) : (
                <span>+</span>
              )}
            </div>
          </label>
          <span>Agregar foto</span>
        </div>
        <input type="file" id="imgUploader" className={styles.hiddenFileUploader} onChange={handleUploadedFile} />
        <ul className={styles.errors}>
          {errors.imageFile.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
      <button className={styles.addPlantBtn} disabled={loading}>
        {loading ? "Cargando..." : "Agregar"}
      </button>
    </form>
  );
}
