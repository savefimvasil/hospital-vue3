export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public hospitalId: number,
  ) {}
}
