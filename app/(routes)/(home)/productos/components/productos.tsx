
import ProductoNombrePrecio from "./productoNombrePrecio";

interface ProductoProps {
    nombre: string;
    precio: number;
    imagen: string;
}

const Productos: React.FC<ProductoProps> = ({ nombre, precio, imagen }) => {
    return (
        <div className="relative rounded-md border-2 border-transparent hover:border-cyan-400 transition-colors duration-300 cursor-pointer">
            <img
                src={imagen}
                alt={nombre}
                className="p-20 transition-transform duration-400 transform hover:scale-110"
            />
            <div className="absolute bottom-2 left-2">
                <ProductoNombrePrecio nombre={nombre} precio={precio} />
            </div>
        </div>
    );
}

export default Productos;
