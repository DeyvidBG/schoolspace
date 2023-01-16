import { Identifiable, IdType } from "./shared-types"

export class SchoolDTO {
  constructor(
    public name: string,
    public address: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public country: string,
    public principal: string,
    public phoneNumber: string,
    public website: string
  ) {}
}

export class School {
  constructor(
    public id: IdType,
    public name: string,
    public welcomeText: string,
    public principalId: IdType,
    public principalName: string,
    public principalEmail: string,
    public vicePrincipalId: IdType,
    public vicePrincipalName: string,
    public vicePrincipalEmail: string,
    public country: string,
    public city: string,
    public zipCode: string,
    public streetAddress: string,
    public website: string,
    public isVerified: 0 | 1
  ) {}
}
