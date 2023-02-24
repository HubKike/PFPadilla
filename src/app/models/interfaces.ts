export interface User {
    name: string;
    password: string;
    email: string;
    gender: string;
    role: string;
    isactive: boolean;
    id: number;
}

export interface Role {
    code: string,
    name: string
}

export interface Curso {
    id: number;
    category: string;
    level: string;
    price: string;
    description: string;
}

export interface Alumno {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    isactive: boolean;
}