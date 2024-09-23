"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <TabsContent value="testimonio-0" className="p-4 rounded-md shadow-md dark:bg-slate-800">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(0); }}>
            <div>
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedTestimonios[0]?.nombre || ""}
                onChange={(e) => handleChange(0, 'nombre', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Testimonio</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={editedTestimonios[0]?.testimonio || ""}
                onChange={(e) => handleChange(0, 'testimonio', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Avatar</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(0, e)}
                className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {editedTestimonios[0]?.avatar && (
                <img
                  src={editedTestimonios[0]?.avatar}
                  alt={editedTestimonios[0]?.nombre}
                  className="w-32 h-32 object-cover mt-2 rounded-md border border-gray-300"
                />
              )}
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="testimonio-1" className="p-4 rounded-md shadow-md dark:bg-slate-800">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(1); }}>
            <div>
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedTestimonios[1]?.nombre || ""}
                onChange={(e) => handleChange(1, 'nombre', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Testimonio</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={4}
                value={editedTestimonios[1]?.testimonio || ""}
                onChange={(e) => handleChange(1, 'testimonio', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Avatar</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(1, e)}
                className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {editedTestimonios[1]?.avatar && (
                <img
                  src={editedTestimonios[1]?.avatar}
                  alt={editedTestimonios[1]?.nombre}
                  className="w-32 h-32 object-cover mt-2 rounded-md border border-gray-300"
                />
              )}
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditTestimonio;
