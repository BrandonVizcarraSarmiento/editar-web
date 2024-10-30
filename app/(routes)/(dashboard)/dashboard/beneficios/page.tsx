"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditBeneficioTab from "../../components/editBeneficioTab";

type Beneficio = {
  pregunta: string;
  respuesta: string;
};

type BeneficiosData = Beneficio[];

const EditBeneficio = () => {
  const [editedBeneficios, setEditedBeneficios] = useState<BeneficiosData>([]);

  useEffect(() => {
    const fetchBeneficios = async () => {
      const res = await fetch("/api/beneficios");
      if (!res.ok) {
        alert("Error al cargar los beneficios");
        return;
      }
      const data = await res.json();
      setEditedBeneficios(data); // Solo usas este estado
    };

    fetchBeneficios();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/beneficios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beneficios: editedBeneficios }),
    });
    if (res.ok) {
      alert("Datos guardados correctamente");
    } else {
      alert("Error al guardar los datos");
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
            <EditBeneficioTab
              index={index}
              beneficio={beneficio}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EditBeneficio;