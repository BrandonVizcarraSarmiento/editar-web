import Image from "next/image";

interface ImgProductoProps {
    imagen: string;
}

const ImgProducto: React.FC<ImgProductoProps> = ({ imagen }) => {
    return (
        <div className="flex justify-center items-center">
            <img src={imagen} width={300} height={300} alt="Imagen del producto" />
        </div>
    );
};

export default ImgProducto;
