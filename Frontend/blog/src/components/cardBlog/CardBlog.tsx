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
    <div className="w-[30rem] h-[20rem] relative p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 mb-4">
      <BotonEliminar id={post.id} onEliminado={onDelete} />
      {editandoTitulo ? (
        <input
          autoFocus
          className="w-full text-2xl font-bold mb-2 border-none bg-transparent outline-none"
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
