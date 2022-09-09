import { Dog } from './dog';

export class User {
  _id: string;
  firstName: string;
  surname: string;
  email: string;
  cell: string;
  whatsapp: boolean;
  password: string;
  role: string;
  dogs: Dog[];

  constructor(
    id?: string,
    firstName?: string,
    surname?: string,
    email?: string,
    cell?: string,
    whatsapp?: boolean,
    password?: string,
    role?: string,
    dogs?: Dog[]
  ) {
    this._id = id!;
    this.firstName = firstName!;
    this.surname = surname!;
    this.email = email!;
    this.cell = cell!;
    this.whatsapp = whatsapp!;
    this.password = password!;
    this.role = role!;
    this.dogs = dogs!;
  }
}
