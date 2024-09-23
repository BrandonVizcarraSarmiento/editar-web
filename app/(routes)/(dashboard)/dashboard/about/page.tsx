"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditAbout = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    seccion1: null,
    seccion2: null,
  });
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({
    seccion1: "",
    seccion2: "",
  });

  // Cargar la data actual desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/about/get");
        const data = await res.json();
        setAboutData(data);
        setPreviewImages({
          seccion1: data.seccion1.imagen,
          seccion2: data.seccion2.imagen,
        });
      } catch (err) {
        setError("Error al cargar la información");
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

  // Manejar la previsualización de imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFiles({ ...files, [section]: file });

      // Crear una URL para previsualizar la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [section]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar "Quienes Somos"</h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="quienesSomos">Quienes Somos</TabsTrigger>
          <TabsTrigger value="seccion1">Sección 1</TabsTrigger>
          <TabsTrigger value="seccion2">Sección 2</TabsTrigger>
        </TabsList>
        <TabsContent value="quienesSomos">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUpdate('quienesSomos'); }}>
            <div>
              <label className="block font-semibold mb-2">Texto de Quienes Somos</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={aboutData?.quienesSomos.texto}
                onChange={(e) => setAboutData({ ...aboutData, quienesSomos: { ...aboutData.quienesSomos, texto: e.target.value } })}
              />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="seccion1">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUpdate('seccion1'); }}>
            <div>
              <label className="block font-semibold mb-2">Texto de Sección 1</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={aboutData?.seccion1.texto}
                onChange={(e) => setAboutData({ ...aboutData, seccion1: { ...aboutData.seccion1, texto: e.target.value } })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Imagen de Sección 1</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'seccion1')}
                className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {previewImages.seccion1 && (
                <img src={previewImages.seccion1} alt="Preview" className="mt-2 h-32 w-auto rounded" />
              )}
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="seccion2">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUpdate('seccion2'); }}>
            <div>
              <label className="block font-semibold mb-2">Texto de Sección 2</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={aboutData?.seccion2.texto}
                onChange={(e) => setAboutData({ ...aboutData, seccion2: { ...aboutData.seccion2, texto: e.target.value } })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Imagen de Sección 2</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'seccion2')}
                className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {previewImages.seccion2 && (
                <img src={previewImages.seccion2} alt="Preview" className="mt-2 h-32 w-auto rounded" />
              )}
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditAbout;
