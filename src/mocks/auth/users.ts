import type { UserData } from '@/models/auth/User'

export const mockUsers: UserData[] = [
  {
    username: "user",
    password: "password",
    email: "email@email.email",
    firstName: "firstname",
    lastName: "lastname",
    hospitalId: 1
  },
  {
    username: "user2",
    password: "password",
    email: "email2@email.email",
    firstName: "firstname2",
    lastName: "lastname2",
    hospitalId: 2
  }
]
