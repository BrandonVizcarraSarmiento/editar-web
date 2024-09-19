// components/clientes/editTestimonio.tsx
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
  const [selectedTestimonio, setSelectedTestimonio] = useState<Testimonio | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/testimonios/get");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setTestimonios(data);
        if (data.length > 0) {
          setSelectedTestimonio(data[0]);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido al cargar los testimonios");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (selectedTestimonio) {
      try {
        const res = await fetch("/api/testimonios/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedTestimonio),
        });

        if (res.ok) {
          alert("Testimonio actualizado correctamente");
        } else {
          throw new Error("Error al actualizar el testimonio");
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Error desconocido al actualizar el testimonio");
        console.error("Submit error:", error);
      }
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch("/api/testimonios/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const result = await res.json();
          if (selectedTestimonio) {
            setSelectedTestimonio({ ...selectedTestimonio, avatar: result.filePath });
          }
        } else {
          throw new Error("Error al subir la imagen");
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Error desconocido al subir la imagen");
        console.error("Upload error:", error);
      }
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Testimonios</h2>
      <Tabs className="space-y-4">
        <TabsList className="flex space-x-2 overflow-x-auto whitespace-nowrap">
          {testimonios.map((testimonio) => (
            <TabsTrigger
              key={testimonio.id}
              value={`testimonio-${testimonio.id}`}
              className="text-cyan-600"
              onClick={() => setSelectedTestimonio(testimonio)}
            >
              {testimonio.nombre}
            </TabsTrigger>
          ))}
        </TabsList>
        {selectedTestimonio && (
          <TabsContent value={`testimonio-${selectedTestimonio.id}`} className="bg-white p-4 rounded-md shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nombre:</label>
              <input
                type="text"
                value={selectedTestimonio.nombre}
                onChange={(e) =>
                  setSelectedTestimonio({ ...selectedTestimonio, nombre: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Testimonio:</label>
              <textarea
                value={selectedTestimonio.testimonio}
                onChange={(e) =>
                  setSelectedTestimonio({ ...selectedTestimonio, testimonio: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 resize-none"
                rows={4}
                style={{ resize: "none" }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Avatar:</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {selectedTestimonio.avatar && (
                <img
                  src={selectedTestimonio.avatar}
                  alt={selectedTestimonio.nombre}
                  className="w-32 h-32 object-cover mt-2 rounded-md border border-gray-300"
                />
              )}
            </div>
            <Button onClick={handleSubmit} className="w-full">Actualizar Testimonio</Button>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default EditTestimonio;
