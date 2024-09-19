"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RedesData = {
    whatsapp: string;
    instagram: string;
    facebook: string;
};

const EditRedes = () => {
    const [data, setData] = useState<RedesData>({
        whatsapp: "",
        instagram: "",
        facebook: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/redes/get");
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result: RedesData = await res.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (platform: keyof RedesData) => {
        try {
            const res = await fetch("/api/redes/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    platform,
                    url: data[platform],
                }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const result = await res.json();
            alert(result.message);
        } catch (error) {
            console.error("Failed to update data:", error);
            alert("Failed to update link.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Editar Redes Sociales</h2>
            <Tabs>
                <TabsList>
                    <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                </TabsList>

                <TabsContent value="whatsapp">
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('whatsapp'); }}>
                        <div>
                            <label className="block font-semibold mb-2">Enlace de WhatsApp</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={data.whatsapp}
                                onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                            />
                        </div>
                        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
                    </form>
                </TabsContent>

                <TabsContent value="instagram">
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('instagram'); }}>
                        <div>
                            <label className="block font-semibold mb-2">Enlace de Instagram</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={data.instagram}
                                onChange={(e) => setData({ ...data, instagram: e.target.value })}
                            />
                        </div>
                        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
                    </form>
                </TabsContent>

                <TabsContent value="facebook">
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit('facebook'); }}>
                        <div>
                            <label className="block font-semibold mb-2">Enlace de Facebook</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={data.facebook}
                                onChange={(e) => setData({ ...data, facebook: e.target.value })}
                            />
                        </div>
                        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default EditRedes;
