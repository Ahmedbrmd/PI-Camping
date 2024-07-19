export class LoginResponse {
    public id: number;
    public username: string;
    public email: string;
    public roles: string[];
    public token: string;
    public refreshToken: string;
    public type: string;

    constructor(id: number,username: string,email: string,roles: string[],token: string,refreshToken: string,type: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.token = token;
    this.refreshToken = refreshToken;
    this.type = type;
    }
  }

