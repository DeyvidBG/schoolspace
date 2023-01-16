export interface Identifiable<K> {
  id: K
}

export type IdType = number | undefined

export enum Gender {
  Man = 1,
  Woman,
}

export enum Role {
  User = 1,
  Student,
  Parent,
  Teacher,
  Principal,
  Admin,
}

export interface Field {
  fieldName: string
  placeholder: string
  type: string
  options?: { id: number; value: string }[]
  value?: string | number | Date
  disabled?: boolean
}
