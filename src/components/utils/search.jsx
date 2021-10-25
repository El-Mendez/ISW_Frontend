// Requests para Obtener todos los cursos y hobbies en la base de datos
import Axios from 'axios';
import { SEARCH_COURSE, SEARCH_HOBBY } from './rutas';

export async function searchHobbies() {
  const response = [];
  try {
    const res = await Axios.get(SEARCH_HOBBY);
    res.data.map((item) => (
      response.push({ value: item.id, label: item.nombre })
    ));
  } catch (error) {
    console.log(error);
  }
  return response;
}

export async function searchCourses() {
  const response = [];
  try {
    const res = await Axios.get(SEARCH_COURSE);
    res.data.map((item) => (
      item.secciones.map((section) => (
        response.push({
          value: section.seccionId,
          label: `${item.cursoNombre} → sección ${section.seccion}`,
        })
      ))
    ));
  } catch (error) {
    console.log(error);
  }
}
