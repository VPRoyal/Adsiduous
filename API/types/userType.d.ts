import type { Types } from "mongoose"

export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  avatar?: string
  role: "user" | "admin"
  isActive: boolean
  lastLogin?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  toJSON(): Object
}
