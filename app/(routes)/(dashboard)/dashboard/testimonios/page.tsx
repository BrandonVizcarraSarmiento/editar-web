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
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido al cargar los testimonios");
        }
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
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Error desconocido al actualizar el testimonio");
        }
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
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Error desconocido al subir la imagen");
        }
        console.error("Upload error:", error);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Testimonios</h2>
      <Tabs>
        <TabsList>
          {testimonios.map((testimonio) => (
            <TabsTrigger
              key={testimonio.id}
              value={`testimonio-${testimonio.id}`}
              onClick={() => setSelectedTestimonio(testimonio)}
            >
              {testimonio.nombre}
            </TabsTrigger>
          ))}
        </TabsList>
        {selectedTestimonio && (
          <TabsContent value={`testimonio-${selectedTestimonio.id}`}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={selectedTestimonio.nombre}
                onChange={(e) =>
                  setSelectedTestimonio({ ...selectedTestimonio, nombre: e.target.value })
                }
              />
            </div>
            <div>
              <label>Testimonio:</label>
              <textarea
                value={selectedTestimonio.testimonio}
                onChange={(e) =>
                  setSelectedTestimonio({ ...selectedTestimonio, testimonio: e.target.value })
                }
              />
            </div>
            <div>
              <label>Avatar:</label>
              <input type="file" onChange={handleImageUpload} />
              {selectedTestimonio.avatar && (
                <img
                  src={selectedTestimonio.avatar}
                  alt={selectedTestimonio.nombre}
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div>
            <Button onClick={handleSubmit}>Actualizar Testimonio</Button>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default EditTestimonio;
