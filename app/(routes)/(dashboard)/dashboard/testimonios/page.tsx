"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditSectionTestimonio from "../../components/editTestimonioTab";

type Testimonio = {
  id: number;
  nombre: string;
  testimonio: string;
  avatar: string;
};

const EditTestimonio = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [editedTestimonios, setEditedTestimonios] = useState<Testimonio[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/testimonios");
      const data = await res.json();
      setTestimonios(data);
      setEditedTestimonios(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (index: number) => {
    const { id, nombre, testimonio, avatar } = editedTestimonios[index];
    const res = await fetch("/api/testimonios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, nombre, testimonio, avatar }),
    });

    if (res.ok) {
      alert("Testimonio guardado correctamente");
    } else {
      alert("Error al guardar el testimonio");
    }
  };

  const handleChange = (index: number, field: keyof Testimonio, value: string) => {
    setEditedTestimonios(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleImageUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch("/api/testimonios", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        handleChange(index, 'avatar', result.filePath);
      } else {
        alert("Error al subir la imagen");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Testimonios</h2>
      <Tabs>
        <TabsList>
          {editedTestimonios.map((_, index) => (
            <TabsTrigger key={index} value={`testimonio-${index}`}>Testimonio {index + 1}</TabsTrigger>
          ))}
        </TabsList>

        {editedTestimonios.map((testimonio, index) => (
          <TabsContent key={index} value={`testimonio-${index}`}>
            <EditSectionTestimonio
              sectionName={`Testimonio ${index + 1}`}
              sectionData={testimonio}
              previewImage={testimonio?.avatar}
              handleTextChange={(field, value) => handleChange(index, field as keyof Testimonio, value)}
              handleFileUpload={(e) => handleImageUpload(index, e)}
              handleSubmit={() => handleSubmit(index)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EditTestimonio;
