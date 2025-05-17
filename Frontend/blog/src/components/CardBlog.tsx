import type { CardInterface } from "../Interfaces/Interfaces";
import { useState } from "react";
interface Props {
  post: CardInterface;
  onUpdate: (updatedPost: CardInterface) => void;
}
const CardBlog: React.FC<Props> = ({ post, onUpdate }) => {
  const [editandoTitulo, setEditandoTitulo] = useState(false);
  const [editandoContenido, setEditandoContenido] = useState(false);
  const [titulo, setTitulo] = useState(post.titulo);
  const [contenido, setContenido] = useState(post.contenido);
  const [actualizando, setActualizando] = useState(false);
  const actualizarPost = async () => {
    setActualizando(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/${post.id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, contenido }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      const data = await res.json();
      onUpdate(data);
      setEditandoTitulo(false);
      setEditandoContenido(false);
    } catch (error) {
      alert("Error al actualizar");
      // Opcional: revertir cambios locales si quieres
      setTitulo(post.titulo);
      setContenido(post.contenido);
    } finally {
      setActualizando(false);
    }
  };

  return (
    <div className="w-[30rem] h-[20rem]  p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
      {editandoTitulo ? (
        <input
          autoFocus
          className="w-full text-2xl font-bold mb-2 border-none bg-transparent outline-none text-white"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onBlur={() => setEditandoTitulo(false)}
        />
      ) : (
        <h5
          onDoubleClick={() => setEditandoTitulo(true)}
          className="mb-2 text-2xl font-bold cursor-pointer"
          title="Doble clic para editar"
        >
          {titulo}
        </h5>
      )}

      {editandoContenido ? (
        <textarea
          autoFocus
          className="w-full mb-3 h-auto min-h-[100px] overflow-hidden text-gray-700 dark:text-gray-300 border-none outline-none resize-none bg-transparent"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          onBlur={() => setEditandoContenido(false)}
        />
      ) : (
        <p
          onDoubleClick={() => setEditandoContenido(true)}
          className="mb-3 cursor-pointer"
          title="Doble clic para editar"
        >
          {contenido}
        </p>
      )}

      <button
        onClick={actualizarPost}
        disabled={actualizando}
        className="mr-2 px-3 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {actualizando ? "Actualizando..." : "Actualizar"}
      </button>
    </div>
  );
};
export default CardBlog;
