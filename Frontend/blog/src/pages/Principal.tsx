import CardBlog from "../components/CardBlog";
import "./PagesCss/Principal.css";
import { useEffect, useState } from "react";
// Definimos la interfaz para el tipo de dato que se van a reccibir
import type { CardInterface } from "../Interfaces/Interfaces";
function Principal() {
  //definimos el estado inicial como una array de objetos vacio que es del tipo CardInterfacce
  const [post, getPost] = useState<CardInterface[]>([]);
  //Definimos la URL de la API
  const apiUrl = "http://127.0.0.1:8000/";
  //Definimos la funcion que llama a la API
  const llamarApi = async () => {
    //Controlamos el error con un try catch
    try {
      //Hacemo la peticion a la API
      const response = await fetch(apiUrl);
      //Si la respuesta no es correcta lazamos un error
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      //Convertoimos la respuesta a Json y guardamos el resultado en la variable data
      const data = await response.json();
      // console.log(data);
      //Guardamo el resultado en el estado post
      getPost(data);
      // si la respuesta no es correcta lazamos un error
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  //useEffect es un hook que se ejecuta cuando el componente se renderiza por primera vez
  useEffect(() => {
    //llamamos a la funcion llamarApi. el segundo ameto es un array vacion que
    //indica que el efecto no tine dependencias y solo se ejecuta una sola vez
    llamarApi();
  }, []);

  return (
    <>
      {/* mapeamos el array post por cada elemento y lo pasamos como props al componente CardBlog */}

      <div className="principal">
        {post.map((item) => (
          <CardBlog
            key={item.id}
            titulo={item.titulo}
            contenido={item.contenido}
          />
        ))}
      </div>
    </>
  );
}
export default Principal;
