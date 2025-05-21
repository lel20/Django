import { useState } from "react";
import type { CardInterface } from "../../Interfaces/Interfaces";
import { useUpdatePost } from "../../hooks/updateCardBlog";
import { BotonEliminar } from "../buttons/BotonEliminar";
interface Props {
  post: CardInterface;
  onUpdate: (updatedPost: CardInterface) => void;
  onDelete: (id: number) => void;
}

const CardBlog: React.FC<Props> = ({ post, onUpdate, onDelete }) => {
  const [editandoTitulo, setEditandoTitulo] = useState(false);
  const [editandoContenido, setEditandoContenido] = useState(false);

  const [titulo, setTitulo] = useState(post.titulo);
  const [contenido, setContenido] = useState(post.contenido);

  const { actualizarPost, actualizando } = useUpdatePost(
    post.id,
    titulo,
    contenido,
    onUpdate,
    () => {
      setEditandoTitulo(false);
      setEditandoContenido(false);
    },
    () => {
      setTitulo(post.titulo);
      setContenido(post.contenido);
    }
  );

  return (
    <div className=" min-w-80 w-[90%] h-[20rem] flex flex-col justify-center items-center  md:w-[25rem]  relative  border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 mb-4">
      <BotonEliminar id={post.id} onEliminado={onDelete} />
      {editandoTitulo ? (
        <input
          autoFocus
          className="w-full h-20 px-4 text-2xl font-bold mb-2 border-none  outline-none"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onBlur={() => setEditandoTitulo(false)}
        />
      ) : (
        <h5
          onDoubleClick={() => setEditandoTitulo(true)}
          className="w-full flex items-center  px-4 h-20 mt-20 text-2xl font-bold cursor-pointer"
          title="Doble clic para editar"
        >
          {titulo}
        </h5>
      )}

      {editandoContenido ? (
        <textarea
          autoFocus
          className="w-full mb-3 h-auto min-h-[10rem] overflow-hidden  border-none outline-none resize-none bg-transparent"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          onBlur={() => setEditandoContenido(false)}
        />
      ) : (
        <p
          onDoubleClick={() => setEditandoContenido(true)}
          className="w-full cursor-pointer min-h-[10rem] px-8"
          title="Doble clic para editar"
        >
          {contenido}
        </p>
      )}

      <button
        onClick={actualizarPost}
        disabled={actualizando}
        className="mr-2 px-3 py-2 w-40   bottom-1 h-8 text-white bg-blue-700 rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {actualizando ? "Actualizando..." : "Actualizar"}
      </button>
    </div>
  );
};
export default CardBlog;
