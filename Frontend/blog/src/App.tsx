import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuNavegacion } from "./components/encabezado/MenuNavegacion";
import Principal from "./pages/Principal";
import { useState, useEffect } from "react";
import { CrearCardBlog } from "./components/cardBlog/CrearCardBlog";
import { llamarApi } from "./services/api";
import type { CardInterface } from "./Interfaces/Interfaces";

function App() {
  const [crearCard, setCrearCard] = useState(false);
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
  const actualizarCrear = (nuevoPost: CardInterface) => {
    setBlog((prev) => [...prev, nuevoPost]);
  };
  return (
    <Router>
      <MenuNavegacion crearCard={() => setCrearCard(true)} />
      <div className="w-full h-screen flex justify-center flex-col items-center">
        {crearCard && (
          <CrearCardBlog
            onClose={() => setCrearCard(false)}
            onCreate={actualizarCrear}
            onCerrarDespues={() => setCrearCard(false)}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Principal
                blog={blog}
                onUpdate={actualizarPost}
                onDelete={eliminarPost}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
