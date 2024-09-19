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
          {editedBeneficios.map((_, index) => (
            <TabsTrigger key={index} value={`beneficio-${index}`}>
              Beneficio {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        {editedBeneficios.map((beneficio, index) => (
          <TabsContent key={index} value={`beneficio-${index}`}>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div>
                <label className="block font-semibold mb-2">Pregunta</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={beneficio.pregunta}
                  onChange={(e) => handleChange(index, 'pregunta', e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Respuesta</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                  value={beneficio.respuesta}
                  onChange={(e) => handleChange(index, 'respuesta', e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
            </form>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EditBeneficio;
