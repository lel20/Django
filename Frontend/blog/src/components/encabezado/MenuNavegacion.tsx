import { IoIosAddCircleOutline } from "react-icons/io";
interface MostraPagina {
  crearCard: () => void;
}
export const MenuNavegacion = ({ crearCard }: MostraPagina) => {
  return (
    <>
      <nav className="shadow h-12 w-full top-0">
        <div className="container mx-auto px-8 h-full  flex flex-row justify-center items-center">
          <IoIosAddCircleOutline
            className="text-neutral-600"
            onClick={crearCard}
            title="Añadir"
            size={40}
          />
        </div>
      </nav>
    </>
  );
};
