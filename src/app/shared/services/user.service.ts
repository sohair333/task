import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../intrfaces/User';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  addToLocalUsers(user: User): void {
    const users = this.getLocalUsers();
    users.push(user);
    localStorage.setItem('localUsers', JSON.stringify(users));
  }

  updateLocalUser(updatedUser: User): void {
    const localUsers = this.getLocalUsers();
    const index = localUsers.findIndex(u => u.id === updatedUser.id);

    if (index !== -1) {
      localUsers[index] = updatedUser;
    } else {
      localUsers.push(updatedUser);
    }

    localStorage.setItem('localUsers', JSON.stringify(localUsers));
  }


  getLocalUsers(): User[] {
    return JSON.parse(localStorage.getItem('localUsers') || '[]');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(apiUsers => [...apiUsers, ...this.getLocalUsers()])
    );
  }

  getUserById(id: number): Observable<User> {
    const localUser = this.getLocalUsers().find(u => u.id === id);
    if (localUser) return of(localUser);
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(() => this.addToLocalUsers(user))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap(() => this.updateLocalUser(user))
    );
  }
}
