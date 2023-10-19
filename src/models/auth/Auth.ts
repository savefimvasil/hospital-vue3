import { User } from '@/models/auth/User'
import { mockUsers } from '@/mocks/auth/users'

export class Auth {
  private users: User[]

  constructor() {
    this.users = this.loadUsers() || []
  }

  private loadUsers(): User[] | null {
    try {
      return mockUsers.map((userData: User) =>
        new User(
          userData.username,
          userData.password,
          userData.email,
          userData.firstName,
          userData.lastName,
          userData.hospitalId
        )
      )
    } catch (err) {
      console.error('Error reading users file:', err)
      return null
    }
  }

  async login(username: string, password: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.username === username && user.password === password)
      setTimeout(() => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      }, 200);
    });
  }
}
