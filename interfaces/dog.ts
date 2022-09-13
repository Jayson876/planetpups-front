import { User } from './user';

export type Gender = 'Male' | 'Female';

// export interface Test {

// }

export class Dog {
  get(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  _id: string;
  dogImage: string;
  dogImagePath: string;
  age: number;
  shots: number;
  price: number;
  gender: Gender;
  breed_1: string;
  breed_2: string;
  owner: User;
  uploadDate: String;

  constructor(
    id?: string,
    dogImage?: string,
    dogImagePath?: string,
    age?: number,
    shots?: number,
    price?: number,
    gender?: Gender,
    breed_1?: string,
    breed_2?: string,
    owner?: User,
    uploadDate?: String
  ) {
    this._id = id!;
    this.dogImage = dogImage!;
    this.dogImagePath = dogImagePath!;
    this.age = age!;
    this.shots = shots!;
    this.price = price!;
    this.gender = gender!;
    this.breed_1 = breed_1!;
    this.breed_2 = breed_2!;
    this.owner = owner!;
    this.uploadDate = uploadDate!;
  }
}
