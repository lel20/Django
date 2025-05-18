import { apiUrl } from "../services/api";
import { useState } from "react";
import type { CardInterface } from "../Interfaces/Interfaces";
export const useUpdatePost = (
  id: number,
  titulo: string,
  contenido: string,
  onUpdate: (post: CardInterface) => void,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const [actualizando, setActualizando] = useState(false);
  const actualizarPost = async () => {
    setActualizando(true);
    try {
      const res = await fetch(`${apiUrl}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, contenido }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      const data = await res.json();
      onUpdate(data);
      onSuccess?.();
    } catch (error) {
      alert("Error al actualizar");
      onError?.();
    } finally {
      setActualizando(false);
    }
  };

  return { actualizarPost, actualizando };
};
