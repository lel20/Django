import { TiDeleteOutline } from "react-icons/ti";
//se llama a la funcion de eliminar datos para ejecutar su lógica
import { eliminaDatosApi } from "../../services/api";
interface Props {
  id: number;
  onEliminado: (id: number) => void;
}
//Creamos el componente paara eliminar los datos
//Recibe el id del dato a eliminar y una funcion que se ejecutará despues de eliminar el dato
export const BotonEliminar = ({ id, onEliminado }: Props) => {
  //Se  crea la funcion que se ejecutara al hacer click en el boton eliminar
  const botonOnClick = async () => {
    try {
      await eliminaDatosApi(id);
      onEliminado(id); //Avisamos al padre que se elimino el dato para que lo elimine de su estado
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      alert("error al eliminar los datos");
    }
  };

  return (
    <TiDeleteOutline
      color="red"
      size={50}
      className="cursor-pointer active:scale-110 transition-transform duration-150 absolute right-0 top-0"
      title="Eliminar"
      onClick={botonOnClick}
    />
  );
};
