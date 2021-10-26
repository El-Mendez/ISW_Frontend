import Axios from 'axios';

export default async function assignUser(route, elements, token) {
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
