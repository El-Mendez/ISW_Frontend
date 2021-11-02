import Axios from 'axios';

export async function assignCourses(route, elements, token) {
  try {
    await Axios.post(route,
      {
        seccionesId: elements,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  } catch (error) {
    console.log(error);
  }
}

export async function assignHobbies(route, elements, token) {
  try {
    await Axios.post(route,
      {
        hobbiesId: elements,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  } catch (error) {
    console.log(error);
  }
}
