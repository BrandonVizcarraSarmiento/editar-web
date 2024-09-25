"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditBeneficioTab from "../../components/editBeneficioTab";


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

        <TabsContent value="beneficio-0">
          <EditBeneficioTab
            index={0}
            beneficio={editedBeneficios[0]}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="beneficio-1">
          <EditBeneficioTab
            index={1}
            beneficio={editedBeneficios[1]}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="beneficio-2">
          <EditBeneficioTab
            index={2}
            beneficio={editedBeneficios[2]}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </TabsContent>

        {/* Agrega más TabsContent según la cantidad de beneficios que tengas */}
      </Tabs>
    </div>
  );
};

export default EditBeneficio;
