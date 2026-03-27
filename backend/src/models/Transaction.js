export class Transaction {
  constructor({ id, user_id, type, amount, category, date }) {
    this.id = id;
    this.userId = user_id;
    this.type = type;
    this.amount = amount;
    this.category = category;
    this.date = date ? new Date(date) : new Date();
  }
}