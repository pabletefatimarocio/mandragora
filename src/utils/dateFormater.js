export default function dateFormater(date) {
  return new Date(date)
    .toLocaleString("es-es", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, "-");
}
