import { Gender, Identifiable, IdType, Role } from "./shared-types"

export class UserDTO {
  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public birthDate: Date,
    public gender: Gender,
    public role: Role
  ) {}
}

export class User extends UserDTO {
  constructor(
    public id: IdType,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public birthDate: Date,
    public gender: Gender,
    public role: Role
  ) {
    super(
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      birthDate,
      gender,
      role
    )
  }
}
