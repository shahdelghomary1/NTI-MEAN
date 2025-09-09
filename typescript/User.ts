
class User {
  constructor(public name: string, private _email: string) {}
  get email(): string {
    return this._email;
  }
  getDetails(): string {
    return `Name: ${this.name} | Email: ${this._email}`;
  }
  updateEmail(newEmail: string): void {
   
    this._email = newEmail;
  }
}
const u1 = new User("shahd", "shahdelghomary@example.com");
console.log(u1.getDetails()); 

const u2 = new User("Ali", "ali@oldmail.com");
console.log(u2.getDetails());
u2.updateEmail("ali@newmail.com");
console.log("Updated email", u2.getDetails());
