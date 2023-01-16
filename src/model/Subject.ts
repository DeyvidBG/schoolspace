import { IdType } from "./shared-types"

export class Subject {
  constructor(
    public id: IdType,
    public schoolId: IdType,
    public schoolName: string,
    public name: string,
    public description: string
  ) {}
}
