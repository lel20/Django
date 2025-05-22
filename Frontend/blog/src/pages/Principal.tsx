import CardBlog from "../components/cardBlog/CardBlog";
import { useEffect, useState } from "react";
import { llamarApi } from "../services/api";
// Definimos la interfaz para el tipo de dato que se van a reccibir
import type { CardInterface } from "../Interfaces/Interfaces";
interface Props {
  blog: CardInterface[];
  onUpdate: (updatedPost: CardInterface) => void;
  onDelete: (id: number) => void;
}

function Principal({ blog, onUpdate, onDelete }: Props) {
  return (
    <>
      <div className="container flex flex-wrap justify-center pt-4  items-center  w-full gap-8 min-h-40 ">
        {blog
          .slice()
          .reverse()
          .map((item) => (
            <CardBlog
              key={item.id}
              post={item}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
      </div>
    </>
  );
}
export default Principal;
