import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../intrfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  addToLocalUsers(user: User): void {
    const stored = localStorage.getItem('localUsers');
    const localUsers = stored ? JSON.parse(stored) : [];
    localUsers.push(user);
    localStorage.setItem('localUsers', JSON.stringify(localUsers));
  }


  getLocalUsers(): User[] {
    return JSON.parse(localStorage.getItem('localUsers') || '[]');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
  }

}
