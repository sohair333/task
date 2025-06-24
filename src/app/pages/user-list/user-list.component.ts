import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/intrfaces/User';
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
    const localUsers = this.userService.getLocalUsers();
    this.users = [...data, ...localUsers];
    this.filteredUsers = [...this.users]; 
    console.log(this.filteredUsers,"filter");
    
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
