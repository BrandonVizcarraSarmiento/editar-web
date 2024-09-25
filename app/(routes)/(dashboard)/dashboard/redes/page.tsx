"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditRedSocial from "../../components/editRedSocialTab";

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
                    <EditRedSocial
                        platform="whatsapp"
                        url={data.whatsapp}
                        handleChange={(value) => setData({ ...data, whatsapp: value })}
                        handleSubmit={() => handleSubmit('whatsapp')}
                    />
                </TabsContent>

                <TabsContent value="instagram">
                    <EditRedSocial
                        platform="instagram"
                        url={data.instagram}
                        handleChange={(value) => setData({ ...data, instagram: value })}
                        handleSubmit={() => handleSubmit('instagram')}
                    />
                </TabsContent>

                <TabsContent value="facebook">
                    <EditRedSocial
                        platform="facebook"
                        url={data.facebook}
                        handleChange={(value) => setData({ ...data, facebook: value })}
                        handleSubmit={() => handleSubmit('facebook')}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default EditRedes;
