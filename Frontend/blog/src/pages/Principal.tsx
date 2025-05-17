import CardBlog from "../components/CardBlog";
import "./PagesCss/Principal.css";
import { useEffect, useState } from "react";
// Definimos la interfaz para el tipo de dato que se van a reccibir
import type { CardInterface } from "../Interfaces/Interfaces";
function Principal() {
  const [blog, setBlog] = useState<CardInterface[]>([]);
  const apiUrl = "http://127.0.0.1:8000/";
  // llamrApi es una funcion asincrona que se encarga de llamar a la Api y obtener los datos
  const llamarApi = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await response.json();
      // console.log(data);
      setBlog(data);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };
  //se encarga de llamar a la funcion llamarApi despues de que se
  //renderice el componente por primera vez
  useEffect(() => {
    llamarApi();
  }, []);
  //actualizar los datos de la api. recibe un objeto de tipo CardInterface
  const actualizarPost = (updatedPost: CardInterface) => {
    setBlog((blogPosts) =>
      blogPosts.map((item) => (item.id === updatedPost.id ? updatedPost : item))
    );
  };
  return (
    <>
      <div className="principal gap-4">
        {blog.map((item) => (
          <CardBlog key={item.id} post={item} onUpdate={actualizarPost} />
        ))}
      </div>
    </>
  );
}
export default Principal;
