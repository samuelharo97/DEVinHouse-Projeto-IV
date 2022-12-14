export class CreateUserDto {
  email: string;

  fullName: string;

  password: string;

  confirm_password: string;

  photoUrl?: string;

  phone: string;

  userAddress: {
    zipCode: string;

    street: string;

    number: number;

    neighborhood: string;

    city: string;

    state: string;

    complement?: string;
  };
}
