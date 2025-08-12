"use client";

import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import styles from "./styles/AddPlantForm.module.css";
import { plantInputSchema } from "@/schemas/zod/plants";
import { useRouter } from "next/navigation";

const plantInputInitialState = {
  name: "",
  scientific: "",
  location_place: "",
  location_type: "Interior",
  under_rain: false,
  watering: "0",
  waterings: [],
  fertilization: "0",
  tags: [],
  imageFile: {
    name: "",
    file: null,
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
    setPlantInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
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
    e.preventDefault();
    const zodResponse = plantInputSchema.safeParse(plantInput);
    //SUCCESS
    if (zodResponse.success) {
      const res = await fetch("/api/plants", {
        method: "POST",
        body: JSON.stringify(plantInput),
      });

      if (res.ok) {
        const resJSON = await res.json();
        console.log(resJSON);
        const { id } = resJSON.data;
        router.push(`/details/${id}`);
      }
    } else {
      //ERRORS
      setErrors(errorsInitialState);
      zodResponse.error.issues.forEach((error) => {
        setErrors((prevState) => {
          if (prevState[error.path[0]]) {
            return {
              ...prevState,
              [error.path[0]]: [...prevState[error.path[0]], error.message],
            };
          }
        });
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
            className={plantInput.location_type === "Interior" ? styles.locationActive : undefined}
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
            className={plantInput.location_type === "Exterior" ? styles.locationActive : undefined}
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
        <span>Tu planta recibe agua de lluvia?</span>
        <button
          type="button"
          onClick={() =>
            setPlantInput((prevState) => {
              return { ...prevState, under_rain: true };
            })
          }
          className={plantInput.under_rain ? styles.rainActive : undefined}
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
          className={!plantInput.under_rain ? styles.rainActive : undefined}
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
                  return { ...prevState, watering: `${+prevState.watering - 1}` };
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
              value={plantInput.watering}
              className={styles.wateringInput}
              onChange={handleNumberChange}
            />
            <button
              type="button"
              className={styles.setterRight}
              disabled={plantInput.watering >= 999}
              onClick={() =>
                setPlantInput((prevState) => {
                  return { ...prevState, watering: `${+prevState.watering + 1}` };
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
                  return { ...prevState, fertilization: `${+prevState.fertilization - 1}` };
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
              value={plantInput.fertilization}
              className={styles.wateringInput}
              onChange={handleNumberChange}
            />
            <button
              type="button"
              className={styles.setterRight}
              disabled={plantInput.fertilization >= 999}
              onClick={() =>
                setPlantInput((prevState) => {
                  return { ...prevState, fertilization: `${+prevState.fertilization + 1}` };
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
      <div className={styles.lastFertilization}>
        <span>Última fertilización</span>
        <input
          className={`${styles.formInput} ${styles.dateInput}`}
          type="date"
          name="fertilizations"
          onChange={handleDateChange}
        />
      </div>
      {/* IMAGE_UPLOADER */}
      <div>
        <div className={styles.imageUpload}>
          <label htmlFor="imgUploader">
            <div className={styles.imagePreview}>
              {plantInput.imageFile.file ? <Image src={plantInput.imageFile.file} alt="" fill /> : <span>+</span>}
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
      <button className={styles.addPlantBtn}>Agregar</button>
    </form>
  );
}
