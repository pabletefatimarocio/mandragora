"use client";

import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiPottedPlantFill } from "react-icons/pi";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import styles from "./styles/EditDetailsInfo.module.css";
import { plantEditInfoSchema } from "@/schemas/zod/plants";
import usePlantDetails from "@/hooks/swr/usePlantDetails";

const errorsInitialState = {
  name: [],
  scientific: [],
  location_place: [],
  watering: [],
  waterings: [],
  fertilization: [],
  fertilizations: [],
  root: [],
};

export default function EditDetailsInfo({ id, plant, setIsEditing }) {
  const [newInfo, setNewInfo] = useState({
    name: plant.name,
    scientific: plant.scientific,
    location_place: plant.location_place,
    location_type: plant.location_type,
    under_rain: plant.under_rain,
    watering: plant.watering,
    waterings: plant.waterings,
    fertilization: plant.fertilization,
    fertilizations: plant.fertilizations,
  });
  const [requireFertilization, setRequireFertilization] = useState(
    plant.fertilization > 0 && plant.fertilizations.length > 0
  );
  const [errors, setErrors] = useState(errorsInitialState);
  const [isEdited, setIsEdited] = useState(false);
  const { mutate } = usePlantDetails(id);

  function transformToDateInput(datesArray) {
    if (!datesArray.length) return "";

    const lastDate = new Date(datesArray[datesArray.length - 1]);

    lastDate.setMinutes(lastDate.getMinutes() - lastDate.getTimezoneOffset());

    return lastDate.toISOString().split("T")[0];
  }

  //HANDLE CHANGE
  function handleChange(e) {
    setIsEdited(true);
    setNewInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //HANDLE NUMBERS CHANGE
  function handleNumberChange(e) {
    setIsEdited(true);
    const number = +e.target.value;

    if (number) {
      setNewInfo((prevState) => ({
        ...prevState,
        [e.target.name]: number,
      }));
    }
  }

  //HANDLE DATE CHANGE
  function handleDateChange(e) {
    setIsEdited(true);
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newISODate = new Date(year, month - 1, day).toISOString();
    setNewInfo((prevState) => ({
      ...prevState,
      [e.target.name]: [...prevState[e.target.name].slice(0, -1), newISODate],
    }));
  }

  //HANDLE RAIN
  function handleRain(bool) {
    setIsEdited(true);
    setNewInfo((prevState) => ({ ...prevState, under_rain: bool }));
  }

  //HANDLE SUBMIT
  async function handleSubmit(e) {
    let hasEarlyErrors = false;
    e.preventDefault();
    setErrors(errorsInitialState);

    if (requireFertilization) {
      if (newInfo.fertilization === 0) {
        hasEarlyErrors = true;
        setErrors((prevState) => ({
          ...prevState,
          fertilization: [...prevState.fertilization, "Debes establecer una frecuencia de fertilización."],
        }));
      }
    }

    if (isEdited) {
      const zodResponse = plantEditInfoSchema.safeParse(newInfo);

      if (zodResponse.success && !hasEarlyErrors) {
        const res = await fetch(`/api/plants/${id}`, {
          method: "PATCH",
          body: JSON.stringify(newInfo),
        });

        if (res.ok) {
          mutate();

          // TODO: MOVE THIS
          setIsEditing(false);
        } else {
          setErrors((prevState) => ({
            ...prevState,
            root: ["Ha ocurrido algo inesperado, por favor refresca la pantalla e inténtalo de nuevo"],
          }));
        }
      } else {
        zodResponse.error?.issues.forEach((issue) => {
          setErrors((prevState) => ({
            ...prevState,
            [issue.path[0]]: [...prevState[issue.path[0]], issue.message],
          }));
        });
      }
    } else {
      setIsEditing(false);
    }
  }

  // RENDER
  return (
    <form className={styles.editingInfo} onSubmit={handleSubmit}>
      <button className={styles.confirmEditingInfoBtn} type="submit">
        <AiOutlineCheckCircle />
      </button>
      <div className={styles.editingName}>
        <input type="text" name="name" value={newInfo.name} onChange={handleChange} className={styles.nameInput} />

        {errors.name.length > 0 && (
          <ul className={styles.errors}>
            {errors.name.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="scientific"
          value={newInfo.scientific}
          onChange={handleChange}
          className={styles.scientificInput}
        />

        {errors.scientific.length > 0 && (
          <ul className={styles.errors}>
            {errors.scientific.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.editingAttributes}>
        <div className={styles.editingAttribute}>
          <div className={styles.iconDrop}>
            <BsDropletFill />
          </div>
          <div className={styles.editingText}>
            <p>
              Riego cada{" "}
              <input
                type="text"
                inputMode="numeric"
                name="watering"
                value={`${newInfo.watering}`}
                onChange={handleNumberChange}
                className={styles.attributeInput}
                maxLength={3}
              />{" "}
              días
            </p>
            {errors.watering.length > 0 && (
              <ul className={styles.errors}>
                {errors.watering.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}

            <p>
              Ultimo riego:{" "}
              <input
                type="date"
                name="waterings"
                value={transformToDateInput(newInfo.waterings)}
                onChange={handleDateChange}
              />
            </p>
            {errors.waterings.length > 0 && (
              <ul className={styles.errors}>
                {errors.waterings.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.askingContainer}>
          <span>¿Tu planta recibe fertilización?</span>
          <div className={styles.askingBtns}>
            <button
              type="button"
              onClick={() => {
                setIsEdited(true);
                setRequireFertilization(true);
              }}
              className={requireFertilization ? styles.activeBtn : undefined}
            >
              Si
            </button>
            <button
              type="button"
              onClick={() => {
                setRequireFertilization(false);
                setNewInfo((prevState) => ({
                  ...prevState,
                  fertilization: plant.fertilization,
                  fertilizations: plant.fertilizations,
                }));
              }}
              className={!requireFertilization ? styles.activeBtn : undefined}
            >
              No
            </button>
          </div>
        </div>

        {requireFertilization && (
          <div className={styles.editingAttribute}>
            <div className={styles.iconBag}>
              <GiPowderBag />
            </div>
            <div className={styles.editingText}>
              <p>
                Fertilizante cada{" "}
                <input
                  type="text"
                  inputMode="numeric"
                  name="fertilization"
                  value={`${newInfo.fertilization}`}
                  onChange={handleNumberChange}
                  className={styles.attributeInput}
                  maxLength={3}
                />{" "}
                días
              </p>
              {errors.fertilization.length > 0 && (
                <ul className={styles.errors}>
                  {errors.fertilization.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              )}

              <p>
                Ultima fertilización:{" "}
                <input
                  type="date"
                  name="fertilizations"
                  value={transformToDateInput(newInfo.fertilizations)}
                  onChange={handleDateChange}
                />
              </p>
              {errors.fertilizations.length > 0 && (
                <ul className={styles.errors}>
                  {errors.fertilizations.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className={styles.editingAttribute}>
          <div className={styles.iconPlant}>
            <PiPottedPlantFill />
          </div>
          <div className={styles.editingText}>
            <div className={styles.locationType}>
              <button
                type="button"
                onClick={() => {
                  setIsEdited(true);
                  setNewInfo((prevState) => ({ ...prevState, location_type: "Interior" }));
                }}
                className={newInfo.location_type === "Interior" ? styles.activeBtn : undefined}
              >
                Interior
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEdited(true);
                  setNewInfo((prevState) => ({ ...prevState, location_type: "Exterior" }));
                }}
                className={newInfo.location_type === "Exterior" ? styles.activeBtn : undefined}
              >
                Exterior
              </button>
            </div>

            <input
              type="text"
              name="location_place"
              value={newInfo.location_place}
              onChange={handleChange}
              className={styles.locationPlaceInput}
            />
            {errors.location_place.length > 0 && (
              <ul className={styles.errors}>
                {errors.location_place.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.askingContainer}>
          <span>¿Tu planta recibe agua de lluvia?</span>
          <div className={styles.askingBtns}>
            <button
              type="button"
              onClick={() => handleRain(true)}
              className={newInfo.under_rain ? styles.activeBtn : undefined}
            >
              Si
            </button>
            <button
              type="button"
              onClick={() => handleRain(false)}
              className={!newInfo.under_rain ? styles.activeBtn : undefined}
            >
              No
            </button>
          </div>
        </div>

        {errors.root.length > 0 && (
          <ul className={styles.errors}>
            {errors.root.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
