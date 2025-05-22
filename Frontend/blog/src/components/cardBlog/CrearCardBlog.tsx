import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { crearDatosApi } from "../../services/api";
import type { CardInterface } from "../../Interfaces/Interfaces";
interface MostrarCrear {
  onClose: () => void;
  onCreate: (newPost: CardInterface) => void;
  onCerrarDespues: () => void;
}

interface CrearDatatos {
  titulo: string;
  contenido: string;
}
export const CrearCardBlog = ({
  onClose,
  onCreate,
  onCerrarDespues,
}: MostrarCrear) => {
  const [formData, setFormData] = useState<CrearDatatos>({
    titulo: "",
    contenido: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const crearOnclick = async () => {
    const nuevo = await crearDatosApi(formData);
    if (nuevo) {
      onCreate(nuevo);
      onCerrarDespues();
    }
  };
  return (
    <div className="fixed bg-[#ffffff] flex flex-col  w-[90%] h-2/4 top-14 gap-y-10 md:w-2/4 p-8 z-40">
      <TiDeleteOutline
        onClick={onClose}
        className="absolute top-0 right-0"
        size={50}
        color="red"
      />
      <div className="flex gapy-2 h-20 flex-col">
        <label htmlFor="titulo"> Titulo</label>
        <input
          placeholder="Tíulo"
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          id="titulo"
        />
      </div>
      <div className=" flex flex-col h-40">
        <label htmlFor="contenido">Contenido</label>
        <textarea
          onChange={handleChange}
          className="h-full gapy-2"
          placeholder="Contenido"
          name="contenido"
          id="contenido"
        ></textarea>
      </div>
      <button
        onClick={crearOnclick}
        className="bg-green-600 h-14 mx-auto text-white w-40 rounded-md"
      >
        Crea
      </button>
    </div>
  );
};
