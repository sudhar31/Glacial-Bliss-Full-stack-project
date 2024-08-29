import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Base URL for user-related APIs
  private currentUser: any = null;
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string, role: string): Observable<string> {
    const body = { username, email, password, role };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, body, { headers, responseType: 'text' }); // Expect plain text response
  }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usernameOrEmail, password });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getAuthToken() {
    return this.authToken;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }
}
