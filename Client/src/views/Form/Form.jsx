import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Form.module.css";
import validateForm from "./validation";

const get_genres = process.env.REACT_APP_GET_GENRESDB;
const post_videogames = process.env.REACT_APP_POST_VIDEOGAMES;

const Form = () => {
  // Creamos un estado local para almacenar la info del form.
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: "",
    genres: [],
  });

  // Creamos un estado local para almacenar los generos y los errores que puedan surgir.
  const [genresList, setGenresList] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Creamos una funcion que maneje los cambios de cada seccion en el form:
  const handleChange = (event) => {
    // Destructuramos las propiedades de target.
    const { name, value } = event.target;

    /*
    Verificamos si el name pertenece a "genres",
    si es asi generamos un array con los generos y
    seteamos su valor.
    */
    if (name === "genres") {
      const selectedGenres = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedGenres,
      }));
    } else {
      // En caso de que sea otro input, setamos su valor.
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // seteamos los posibles errores que surjan.
    setFormErrors(validateForm({ ...formData, [name]: value }));
  };

  // Utilizamos el hook useEffect.
  useEffect(() => {
    // Realizamos una petición GET a la URL almacenada en la variable get_genres.
    axios.get(`${get_genres}`).then((response) => {
      // Cuando se recibe la respuesta de la petición,
      // actualizamos el estado genresList con los datos recibidos.
      setGenresList(response.data);
    });
  }, []); // el arreglo de dependencias está vacío, por lo que este efecto se ejecuta solo al montar el componente.

  // Creamos una funcion la cual se va a ejecutar cuando se envie el form.
  const handleSubmit = async (event) => {
    try {
      // Evitamos el comportamiento por defecto del form.
      event.preventDefault();

      // Hacemos una llamada a la validacion del form:
      const validationErrors = validateForm(formData);

      // Verificamos si hay errores en validationErrors.
      if (Object.keys(validationErrors).length > 0) {
        // Si hay errores de validación, establece los errores en el estado
        setFormErrors(validationErrors);
        return;
      }

      // Creamos un nuevo juego parseando la info del rating
      const newVideogame = {
        ...formData,
        rating: parseFloat(formData.rating),
      };

      // Realizamos una peticion de tipo post al backend para crear el jeugo.
      const { data } = await axios.post(`${post_videogames}`, newVideogame);
      alert(data);
    } catch (error) {
      alert(`Hubo un error!!! ${error.message}`);
    }
  };

  // Función que verifica si todos los campos requeridos están llenos.
  const areAllFieldsFilled = () => {
    // Lista de campos que se requieren llenar.
    const requiredFields = [
      "name",
      "description",
      "platforms",
      "background_image",
      "released",
      "rating",
      "genres",
    ];

    // La función every() verifica si todas las entradas cumplen la condición dada.
    // En este caso, se verifica si todos los campos requeridos tienen contenido en formData.
    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div className={styles.containerPrincipal}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Link to={"/home"}>
          <button className={styles.goBackButton}>Volver</button>
        </Link>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        {formErrors.description && (
          <p className={styles.error}>{formErrors.description}</p>
        )}

        <br />

        <label>
          Plataformas:
          <input
            type="text"
            name="platforms"
            value={formData.platforms}
            onChange={handleChange}
          />
        </label>
        {formErrors.platforms && (
          <p className={styles.error}>{formErrors.platforms}</p>
        )}

        <br />

        <label>
          Imagen de fondo:
          <input
            type="text"
            name="background_image"
            value={formData.background_image}
            onChange={handleChange}
          />
        </label>
        {formErrors.background_image && (
          <p className={styles.error}>{formErrors.background_image}</p>
        )}

        <br />

        <label>
          Fecha de lanzamiento:
          <input
            type="date"
            name="released"
            value={formData.released}
            onChange={handleChange}
          />
        </label>
        {formErrors.released && (
          <p className={styles.error}>{formErrors.released}</p>
        )}

        <br />

        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
        {formErrors.rating && (
          <p className={styles.error}>{formErrors.rating}</p>
        )}

        <br />

        <label>
          Géneros:
          <select
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            multiple
          >
            <option value="">Seleccionar género</option>
            {genresList.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <br />

        <button
          className={`${styles.createBtn} ${
            // Se agrega la clase 'disabled' si no todos los campos requeridos están llenos.
            !areAllFieldsFilled() ? styles.disabled : ""
          }`}
          // El botón se desactiva si no todos los campos requeridos están llenos.
          disabled={!areAllFieldsFilled()}
        >
          Crear Juego
        </button>
      </form>
    </div>
  );
};

export default Form;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./Form.module.css";
// import "./Form.module.css";

// const get_genres = process.env.REACT_APP_GET_GENRESDB;
// const post_videogames = process.env.REACT_APP_POST_VIDEOGAMES;

// const Form = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     platforms: "",
//     background_image: "",
//     released: "",
//     rating: "",
//     genres: [],
//   });

//   const [genresList, setGenresList] = useState([]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === "genres") {
//       const selectedGenres = Array.from(
//         event.target.selectedOptions,
//         (option) => option.value
//       );
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: selectedGenres,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   useEffect(() => {
//     axios.get(`${get_genres}`).then((response) => {
//       setGenresList(response.data);
//     });
//   }, []);

//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();

//       const newVideogame = {
//         ...formData,
//         rating: parseInt(formData.rating),
//       };

//       const { data } = await axios.post(`${post_videogames}`, newVideogame);
//       alert(data);
//     } catch (error) {
//       alert(`Hubo un error!!! ${error.message}`);
//     }
//   };

// return (
//   <div className={styles.containerPrincipal}>
//     <form className={styles.formContainer} onSubmit={handleSubmit}>
//       <Link to={"/home"}>
//         <button className={styles.goBackButton}>Volver</button>
//       </Link>
//       <label>
//         Nombre:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Descripción:
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Plataformas:
//         <input
//           type="text"
//           name="platforms"
//           value={formData.platforms}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Imagen de fondo:
//         <input
//           type="text"
//           name="background_image"
//           value={formData.background_image}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Fecha de lanzamiento:
//         <input
//           type="text"
//           name="released"
//           value={formData.released}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Rating:
//         <input
//           type="text"
//           name="rating"
//           value={formData.rating}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Géneros:
//         <select
//           name="genres"
//           value={formData.genres}
//           onChange={handleChange}
//           multiple
//         >
//           <option value="">Seleccionar género</option>
//           {genresList.map((genre, index) => (
//             <option key={index} value={genre}>
//               {genre}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       <button className={styles.createBtn}>Crear Juego</button>
//     </form>
//   </div>
// );
// };

// export default Form;
