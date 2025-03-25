export class Person {
  private firstName: string;
  private lastName: string;
  private age: number;
  private email: string;

  constructor(firstName: string, lastName: string, age: number, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
  }

  // Getters
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getAge(): number {
    return this.age;
  }

  public getEmail(): string {
    return this.email;
  }

  // Setters
  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setAge(age: number): void {
    if (age < 0) {
      throw new Error('Age cannot be negative');
    }
    this.age = age;
  }

  public setEmail(email: string): void {
    // Basic email validation
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }
    this.email = email;
  }

  // Utility methods
  public toString(): string {
    return `Person: ${this.getFullName()}, Age: ${this.age}, Email: ${this.email}`;
  }
}