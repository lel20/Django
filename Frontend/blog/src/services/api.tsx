//Url global de la API
export const apiUrl = import.meta.env.VITE_API_URL;
interface CrearDatos {
  titulo: string;
  contenido: string;
}
//funcion para obtener los datos de la API

//Consumir la API
//------------------------------------------------------------------------------------------------
export const llamarApi = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error el la respuetsa de la API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al llamar a la Api:", error);
  }
};

//----------------------------------ELIMINAR--------------------------------------------------------------
//Se crea la Lógica para eliminar los ados de la Api
//Es una funcion que recibe un id y lo elimina de la API
export const eliminaDatosApi = async (id: number) => {
  try {
    //Se hace una peticion DELETE a la API
    const response = await fetch(`${apiUrl}${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al elimanar los datos");
    }
    return true;
  } catch (error) {
    console.error("Error al eliminar los datos de la API", error);
  }
};

export const crearDatosApi = async (formularioData: CrearDatos) => {
  try {
    const data = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formularioData),
    });
    if (!data) {
      throw new Error("Error al guarda los datos");
    }
    const res = await data.json();
    alert("datos creados");
    return res;
  } catch (error) {
    console.error("Error al guardar", error);
  }
};
