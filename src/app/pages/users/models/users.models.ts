export interface UsersList {
  name: string;
  email: string;
}

export interface UsersFilter {
  name: string;
}

export interface NewUserForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: string;
}
