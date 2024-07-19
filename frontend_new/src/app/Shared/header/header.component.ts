import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { AuthenticationService } from '../../Services/authentication.service';
import { NotificationService } from '../../Services/notification.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { Role } from '../../enum/role.enum';
import { TokenRefreshRequest } from '../../Models/dto/TokenRefreshRequest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user: User = new User;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    const user = this.authenticationService.getUserFromLocalCache();
    console.log("userrrr: ", user);
    if (user !== null) {
      this.user = user;
    }
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    const user = this.authenticationService.getUserFromLocalCache();
    if (user !== null) {
      return user.role;
    }
    return '';
  }



  public onLogOut(): void {
    const user = this.authenticationService.getUserFromLocalCache();

    if (user && user.refreshToken) {
      const refreshToken = user.refreshToken;
      console.log("refreshToken: ", refreshToken);

      this.authenticationService.logOutFromDB(refreshToken).subscribe(
        response => {
          // Clear local storage
          localStorage.removeItem('user');
          localStorage.removeItem('token');

          // Navigate to login page
          this.router.navigate(['/login']);
        },
        error => {
          // Handle error if any
          console.error("Logout failed: ", error);
        }
      );
    } else {
      // If no user or refresh token, just clear local storage and navigate
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }


  isLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
}
