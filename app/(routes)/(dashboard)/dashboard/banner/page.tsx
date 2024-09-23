// dashboard/banner/page.tsx
"use client";

import { useState } from "react";

const EditBanner = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleConfirmImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", selectedFile.type); // Aquí enviamos el tipo de archivo

      try {
        const res = await fetch("/api/banner/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const { filePath } = await res.json();

          // Actualiza el archivo JSON (esto depende de cómo esté configurado tu proyecto)
          await fetch("/api/banner/updateBannerImage", {
            method: "POST",
            body: JSON.stringify({ image: filePath }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          alert("Imagen actualizada con éxito");
          setImagePreview(null);
          setSelectedFile(null);
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
      <h1 className="text-2xl font-bold mb-4 dark:text-blue-500">Edita el Banner</h1>
      <label className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <span className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-blue-600 transition duration-300">
          Seleccionar Archivo
        </span>
      </label>

      {imagePreview && (
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-lg font-semibold mb-2 dark:text-blue-500">Vista previa de la imagen seleccionada:</h2>
          <img
            src={imagePreview}
            alt="Vista previa del banner"
            className="w-72 h-auto mb-4 rounded-lg shadow-md"
          />
          <button
            onClick={handleConfirmImage}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBanner;
