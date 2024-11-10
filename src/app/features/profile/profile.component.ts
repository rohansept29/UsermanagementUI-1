import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editForm: FormGroup;

  showProfileInfo = true;
  showEditForm = false;
  profileUpdated = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.profileForm = this.fb.group({
      username: [''],
      email: ['']
    });

    this.editForm = this.fb.group({
      newUsername: [''],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getProfile().subscribe(
      (userData) => {
        this.profileForm.patchValue({
          username: userData.username,
          email: userData.email
        });
        this.editForm.patchValue({
          newUsername: userData.username // Pre-fill new username with current username
        });
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  onUpdate() {
    debugger;
    if (this.editForm.valid || !this.passwordsDoNotMatch()) {
      const updateData = {
        username: this.editForm.get('newUsername')?.value,
        oldPassword: this.editForm.get('currentPassword')?.value == "" ? null : this.editForm.get('currentPassword')?.value, 
        newPassword: this.editForm.get('newPassword')?.value == "" ? null : this.editForm.get('newPassword')?.value
      };

      this.authService.updateProfile(updateData).subscribe(
        (userData) => {
        // Update profile data
        this.loadUserData();
        // Switch back to profile view
        this.showEditForm = false;
        this.showProfileInfo = true;
        },
        (error) => {
          console.error('Error updating profile:', error);
        },
      )
    }
  }

  canUpdateProfile(): boolean {
    const newUsernameValid = this.editForm.get('newUsername')?.valid;
    const currentPassword = this.editForm.get('currentPassword')?.value;
    const newPassword = this.editForm.get('newPassword')?.value;
    const confirmPassword = this.editForm.get('confirmPassword')?.value;

    const passwordFieldsEmpty = !currentPassword && !newPassword && !confirmPassword;
    const passwordFieldsValid = !this.passwordsDoNotMatch() &&
                                (currentPassword && newPassword && confirmPassword);

    return newUsernameValid && (passwordFieldsEmpty || passwordFieldsValid);
  }

  // Method to check if passwords match
  passwordsDoNotMatch(): boolean {
    const newPassword = this.editForm.get('newPassword')?.value;
    const confirmPassword = this.editForm.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword;
  }

  logout() {
    // Navigate to the login page
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
