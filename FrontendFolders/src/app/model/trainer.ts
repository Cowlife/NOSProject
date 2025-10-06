import {UUID} from 'node:crypto';

export interface Trainer{
  id: UUID,
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string,
}

export enum RoleName{
  admin = 'admin',
  user = 'user'
}
