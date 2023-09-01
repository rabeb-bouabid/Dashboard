import { IntUser } from 'src/users/entities/interfaces/user.interface';
export interface Iadmin extends IntUser {
  email: string;
  password: string;
}
