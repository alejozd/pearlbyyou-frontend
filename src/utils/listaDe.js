// Normaliza respuestas de la API que pueden venir como array o paginadas
// ({ totalItems, productos: [...] }). Evita que una lista quede vacia sin avisar.
export function listaDe(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];

  for (const clave of ["productos", "admins", "usuarios", "items", "results", "data"]) {
    if (Array.isArray(data[clave])) return data[clave];
  }

  const primerArray = Object.values(data).find(Array.isArray);
  return primerArray || [];
}
