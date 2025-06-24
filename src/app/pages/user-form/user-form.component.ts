import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/intrfaces/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm!: FormGroup;
  userId!: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.userId = +id;
        this.userService.getUserById(this.userId).subscribe(user => {
          if (user) this.userForm.patchValue(user);
        });
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const user: User = {
      ...this.userForm.value,
      id: this.isEdit ? this.userId : Math.floor(Math.random() * 10000)
    };

    if (this.isEdit) {
      this.userService.updateUser(user).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.userService.addToLocalUsers(user);
        this.router.navigate(['/']);
      });
    }
  }
}
