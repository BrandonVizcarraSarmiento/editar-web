// components/clientes/banner.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Banner = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const res = await fetch("/api/banner/getBannerImage");
        if (res.ok) {
          const data = await res.json();
          setBannerImage(data.image);
        }
      } catch (error) {
        console.error("Error al obtener la imagen del banner:", error);
        setBannerImage(null);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <svg
        className="absolute inset-0 -z-10 blur-3xl"
        fill="none"
        viewBox="0 0 400 400"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG paths here */}
      </svg>

      {bannerImage && (
        <div className="relative z-5">
          <Image
            src={bannerImage}
            alt="Banner"
            width={700}
            height={700}
            className="mx-auto p-4"
          />
        </div>
      )}

      {/* Mostrar contenido adicional sólo si hay una imagen */}
      {bannerImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-2">
          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none text-primary">
            FishFood
          </h1>
          <span className="text-lg md:text-xl mb-4 font-light text-white">
            Disfruta el sabor del mar en cada bocado
          </span>
          <Button>
            <Link href="/productos">
              Productos
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Banner;
