export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    destacado: boolean;
    createdAt: string;  // Añadir createdAt
    updatedAt: string;  // Añadir updatedAt
}