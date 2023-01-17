export interface Usuario {
    id: number,
    name: string,
    email: string,
    password: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CrearUsuarioDTO extends Omit<Usuario, 'id'> {}
