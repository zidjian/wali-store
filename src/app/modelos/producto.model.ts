export interface Producto {
    id: number,
    title: string,
    price: number,
    description: string,
    category: Category,
    images: string[],
    IGV?: number
}

export interface Category {
    id: number,
    name: string,
    typeImg: string
}

export interface CrearProductoDTO extends Omit<Producto, 'id' | 'category'> {
    title: string,
    price: number,
    description: string,
    categoryId: number,
    images: string[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateAllProductoDTO extends Partial<CrearProductoDTO> {}
