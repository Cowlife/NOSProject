
export interface Trainer{
  id: string,
  firstName: string,
  email: string,
  password: string,
  rank:string,
}

export enum RoleName{
  admin = 'admin',
  user = 'user'
}
