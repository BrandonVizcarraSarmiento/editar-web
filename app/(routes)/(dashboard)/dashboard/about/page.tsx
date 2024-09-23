"use client";

import React, { useEffect, useState } from "react";

const EditAbout = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    seccion1: null,
    seccion2: null,
  });

  // Cargar la data actual desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/about/get");
        const data = await res.json();
        setAboutData(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar la información");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Actualizar texto de una sección
  const handleTextChange = async (section: string, texto: string, imagen?: string) => {
    try {
      const res = await fetch("/api/about/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          texto,
          imagen, // Enviar imagen al actualizar
        }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar la sección");
      }
    } catch (err) {
      console.error(err);
      setError("Error al actualizar");
    }
  };

  // Subir una imagen
  const handleImageUpload = async (section: string) => {
    const file = files[section];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", section);

    try {
      const res = await fetch("/api/about/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al subir la imagen");
      }

      const response = await res.json();
      return response.filePath; // Retornar la ruta de la imagen subida
    } catch (err) {
      console.error(err);
      setError("Error al subir la imagen");
      return null;
    }
  };

  // Manejar la actualización de texto e imagen al hacer clic en el botón
  const handleUpdate = async (section: string) => {
    const imagePath = await handleImageUpload(section);
    await handleTextChange(section, aboutData[section].texto, imagePath);
    setFiles({ ...files, [section]: null }); // Limpiar el archivo seleccionado
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Editar "Quienes Somos"</h2>
      <textarea
        value={aboutData?.quienesSomos?.texto || ""}
        onChange={(e) =>
          setAboutData({
            ...aboutData,
            quienesSomos: { texto: e.target.value },
          })
        }
      />
      <button onClick={() => handleTextChange("quienesSomos", aboutData.quienesSomos.texto)}>
        Guardar Cambios
      </button>

      <h2>Editar Sección 1</h2>
      <textarea
        value={aboutData?.seccion1?.texto || ""}
        onChange={(e) =>
          setAboutData({
            ...aboutData,
            seccion1: { texto: e.target.value, imagen: aboutData.seccion1.imagen },
          })
        }
      />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) setFiles({ ...files, seccion1: e.target.files[0] });
        }}
      />
      <button onClick={() => handleUpdate("seccion1")}>Actualizar</button>

      <h2>Editar Sección 2</h2>
      <textarea
        value={aboutData?.seccion2?.texto || ""}
        onChange={(e) =>
          setAboutData({
            ...aboutData,
            seccion2: { texto: e.target.value, imagen: aboutData.seccion2.imagen },
          })
        }
      />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) setFiles({ ...files, seccion2: e.target.files[0] });
        }}
      />
      <button onClick={() => handleUpdate("seccion2")}>Actualizar</button>
    </div>
  );
};

export default EditAbout;
