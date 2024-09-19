"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SectionData = {
  texto: string;
  imagen: string;
};

type MisionVisionData = {
  mision: SectionData;
  vision: SectionData;
  valores: SectionData;
};

const EditMisionVision = () => {
  const [data, setData] = useState<MisionVisionData>({
    mision: { texto: "", imagen: "" },
    vision: { texto: "", imagen: "" },
    valores: { texto: "", imagen: "" },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/misionvision/get");
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handleSubmit = async (section: keyof MisionVisionData) => {
    const res = await fetch("/api/misionvision/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        section,
        texto: data[section].texto,
        imagen: data[section].imagen,
      }),
    });
    if (res.ok) {
      alert("Datos guardados correctamente");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: keyof MisionVisionData) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("type", section); // Añadir el tipo aquí
      const res = await fetch("/api/misionvision/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setData((prev) => ({
          ...prev,
          [section]: { ...prev[section], imagen: result.filePath },
        }));
      } else {
        alert("Error al subir la imagen");
      }
    }
  };  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Misión, Visión y Valores</h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="mision">Misión</TabsTrigger>
          <TabsTrigger value="vision">Visión</TabsTrigger>
          <TabsTrigger value="valores">Valores</TabsTrigger>
        </TabsList>
        <TabsContent value="mision">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('mision'); }}>
            <div>
              <label className="block font-semibold mb-2">Texto de Misión</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={data.mision.texto}
                onChange={(e) => setData({ ...data, mision: { ...data.mision, texto: e.target.value } })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Imagen de Misión</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'mision')} />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>
        <TabsContent value="vision">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('vision'); }}>
            <div>
              <label className="block font-semibold mb-2">Texto de Visión</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={data.vision.texto}
                onChange={(e) => setData({ ...data, vision: { ...data.vision, texto: e.target.value } })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Imagen de Visión</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'vision')} />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>
        <TabsContent value="valores">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('valores'); }}>
            <div>
              <label className="block font-semibold mb-2">Texto de Valores</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={data.valores.texto}
                onChange={(e) => setData({ ...data, valores: { ...data.valores, texto: e.target.value } })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Imagen de Valores</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'valores')} />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditMisionVision;
