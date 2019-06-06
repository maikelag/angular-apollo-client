import { Permission } from './permission.model';

export class Role {
  id: number;
  role: string;
  permissions: Permission[];
}
