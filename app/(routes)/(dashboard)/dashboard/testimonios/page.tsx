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
      const res = await fetch("/api/testimonios/get");
      const data = await res.json();
      setTestimonios(data);
      setEditedTestimonios(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (index: number) => {
    const { id, nombre, testimonio, avatar } = editedTestimonios[index];
    const res = await fetch("/api/testimonios/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, nombre, testimonio, avatar }),
    });
    if (res.ok) {
      alert("Testimonio guardado correctamente");
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

      const res = await fetch("/api/testimonios/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        handleChange(index, 'avatar', result.filePath);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Testimonios</h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="testimonio-0">Testimonio 1</TabsTrigger>
          <TabsTrigger value="testimonio-1">Testimonio 2</TabsTrigger>
        </TabsList>

        <TabsContent value="testimonio-0">
          <EditSectionTestimonio
            sectionName="Testimonio 1"
            sectionData={editedTestimonios[0]}
            previewImage={editedTestimonios[0]?.avatar}
            handleTextChange={(field, value) => handleChange(0, field as keyof Testimonio, value)}
            handleFileUpload={(e) => handleImageUpload(0, e)}
            handleSubmit={() => handleSubmit(0)}
          />
        </TabsContent>

        <TabsContent value="testimonio-1">
          <EditSectionTestimonio
            sectionName="Testimonio 2"
            sectionData={editedTestimonios[1]}
            previewImage={editedTestimonios[1]?.avatar}
            handleTextChange={(field, value) => handleChange(1, field as keyof Testimonio, value)}
            handleFileUpload={(e) => handleImageUpload(1, e)}
            handleSubmit={() => handleSubmit(1)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditTestimonio;
