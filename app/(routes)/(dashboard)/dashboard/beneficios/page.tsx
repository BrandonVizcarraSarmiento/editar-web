"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Beneficio = {
  pregunta: string;
  respuesta: string;
};

type BeneficiosData = Beneficio[];

const EditBeneficio = () => {
  const [beneficios, setBeneficios] = useState<BeneficiosData>([]);
  const [editedBeneficios, setEditedBeneficios] = useState<BeneficiosData>([]);

  useEffect(() => {
    const fetchBeneficios = async () => {
      const res = await fetch("/api/beneficios/get");
      const data = await res.json();
      setBeneficios(data);
      setEditedBeneficios(data);
    };

    fetchBeneficios();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/beneficios/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beneficios: editedBeneficios }),
    });
    if (res.ok) {
      alert("Datos guardados correctamente");
    }
  };

  const handleChange = (index: number, field: keyof Beneficio, value: string) => {
    setEditedBeneficios(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Beneficios</h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="beneficio-0">Beneficio 1</TabsTrigger>
          <TabsTrigger value="beneficio-1">Beneficio 2</TabsTrigger>
          <TabsTrigger value="beneficio-2">Beneficio 3</TabsTrigger>
          {/* Agrega más según la cantidad de beneficios que tengas */}
        </TabsList>

        <TabsContent value="beneficio-0" className="p-4 rounded-md shadow-md dark:bg-slate-800">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div>
              <label className="block font-semibold mb-2">Pregunta</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedBeneficios[0]?.pregunta || ""}
                onChange={(e) => handleChange(0, 'pregunta', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Respuesta</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={editedBeneficios[0]?.respuesta || ""}
                onChange={(e) => handleChange(0, 'respuesta', e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="beneficio-1" className="p-4 rounded-md shadow-md dark:bg-slate-800">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div>
              <label className="block font-semibold mb-2">Pregunta</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedBeneficios[1]?.pregunta || ""}
                onChange={(e) => handleChange(1, 'pregunta', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Respuesta</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={editedBeneficios[1]?.respuesta || ""}
                onChange={(e) => handleChange(1, 'respuesta', e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="beneficio-2" className="p-4 rounded-md shadow-md dark:bg-slate-800">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div>
              <label className="block font-semibold mb-2">Pregunta</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedBeneficios[2]?.pregunta || ""}
                onChange={(e) => handleChange(2, 'pregunta', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Respuesta</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={editedBeneficios[2]?.respuesta || ""}
                onChange={(e) => handleChange(2, 'respuesta', e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditBeneficio;
