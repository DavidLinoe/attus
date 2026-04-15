export interface UsersList {
  id:number;
  name: string;
  email: string;
}

export interface UsersFilter {
  name: string;
}

export interface NewUserForm {
  id?:number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: string;
}
