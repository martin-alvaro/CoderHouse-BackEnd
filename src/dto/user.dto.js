export class UserDTO {
  constructor(email, password, first_name, last_name, isGithub, age, role) {
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.isGithub = isGithub;
    this.age = age; 
    this.role = role
  }
}
