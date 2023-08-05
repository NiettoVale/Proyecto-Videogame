import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import Detail from "./components/detail/Detail";
import VideogameDB from "./views/videogameDB/VideogameDB";
import Searchgames from "./views/searchgames/Searchgames";

function App() {
  const [videogames, setVideogames] = useState([]);

  const obtenerVideojuegos = useCallback(async () => {
    try {
      const { data } = await axios(
        "https://api.rawg.io/api/games?key=aeb12d6781774ed69cb910c7ad69b389&dates=2019-09-01,2023-05-30&platforms=18,1,7"
      );
      setVideogames(data.results);
    } catch (error) {
      console.error("Error al obtener los videojuegos:", error);
    }
  }, []);

  useEffect(() => {
    obtenerVideojuegos();
  }, [obtenerVideojuegos]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home videogames={videogames} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createVideogames" element={<VideogameDB />} />
        <Route path="/searchgames" element={<Searchgames />} />
      </Routes>
    </div>
  );
}

export default App;
