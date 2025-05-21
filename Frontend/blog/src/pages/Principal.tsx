import CardBlog from "../components/cardBlog/CardBlog";
import { useEffect, useState } from "react";
import { llamarApi } from "../services/api";
// Definimos la interfaz para el tipo de dato que se van a reccibir
import type { CardInterface } from "../Interfaces/Interfaces";
function Principal() {
  const [blog, setBlog] = useState<CardInterface[]>([]);

  useEffect(() => {
    const apiFetch = async () => {
      const data = await llamarApi();
      setBlog(data);
    };
    apiFetch();
  }, []);
  // Actualiamos los datos de la api
  const actualizarPost = (updatedPost: CardInterface) => {
    setBlog((blogPosts) =>
      blogPosts.map((item) => (item.id === updatedPost.id ? updatedPost : item))
    );
  };
  // Eliminar los datos de la Api
  const eliminarPost = (id: number) => {
    //Llamos a la api para eliminar los datos
    setBlog((blogPost) => blogPost.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="container flex flex-wrap justify-center pt-4  items-center  w-full gap-8 min-h-40 ">
        {blog.map((item) => (
          <CardBlog
            key={item.id}
            post={item}
            onUpdate={actualizarPost}
            onDelete={eliminarPost}
          />
        ))}
      </div>
    </>
  );
}
export default Principal;
