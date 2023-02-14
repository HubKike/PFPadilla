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

// export interface Post {
//     id: number;
//     title: string;
//     author: string;
// }

// export interface Comment {
//     id: number;
//     body: string;
//     postId: number;
// }

// export interface DbJson {
//     user: User[];
//     posts: Post[];
//     comments: Comment[];
//     profile: {
//         name: string;
//     };
// }