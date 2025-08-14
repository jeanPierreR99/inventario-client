export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: 'ADMINISTRADOR' | 'OTI' | 'PATRIMONIO';
  sigaStatus?: boolean;
  sinabipStatus?: boolean;
  otiStatus?: boolean;
  create_at?: string;
}
