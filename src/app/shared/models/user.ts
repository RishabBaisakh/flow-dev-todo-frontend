export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface UserDto {
  id: string;
  name: string;
  avatar: string;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
}

export interface UpdateUserDto {
  name: string;
  avatar: string;
}
