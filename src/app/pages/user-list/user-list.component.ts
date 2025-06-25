import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/intrfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
 users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];

  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(private userService: UserService, private router: Router) {}

   ngOnInit(): void {
    this.loadUsers();

    // Reload list on route navigation (for edit or add)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUsers();
      });
  }

  loadUsers(): void {
  this.userService.getUsers().subscribe(apiUsers => {
    const localUsers = this.userService.getLocalUsers();

    // Merge local users with API users: if same ID exists, override
    const merged = apiUsers.map(apiUser => {
      const localOverride = localUsers.find(lu => lu.id === apiUser.id);
      return localOverride ? localOverride : apiUser;
    });

    // Add new users (not present in API)
    const newUsers = localUsers.filter(lu => !apiUsers.find(au => au.id === lu.id));

    this.users = [...merged, ...newUsers];
    this.filteredUsers = [...this.users];
    this.updatePagination();
  });
}


  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
