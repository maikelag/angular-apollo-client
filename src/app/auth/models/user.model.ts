import { Role } from './role.model';

export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    lastName: string;
    age: number;
    roles: Role[];
}
