import type { User } from '@/models/auth/User'

export const mockUsers: User[] = [
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
