interface Producto {
    nombre: string;
    precio: number;
}

const ProductoNombrePrecio: React.FC<Producto> = ({ nombre, precio }) => {
    return (
        <div className="inline-flex items-center gap-3 rounded-full border-2 w-fit p-1">
            <p className="px-2 py-1 text-xs">{nombre}</p>
            <p className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full w-fit">S./{precio}</p>
        </div>
    );
}

export default ProductoNombrePrecio;
