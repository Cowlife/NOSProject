
export interface Trainer{
  id: string,
  name: string,
  email: string,
  password: string,
}

export enum RoleName{
  admin = 'admin',
  user = 'user'
}
