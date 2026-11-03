export class User {
  constructor({ id, name, email, password_hash }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = password_hash;
  }
}