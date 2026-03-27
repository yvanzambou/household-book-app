export class User {
  constructor({ id, email, password_hash }) {
    this.id = id;
    this.email = email;
    this.passwordHash = password_hash;
  }
}