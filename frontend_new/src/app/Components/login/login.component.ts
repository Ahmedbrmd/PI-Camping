import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../../Models/user';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationService } from '../../Services/notification.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { HeaderType } from '../../enum/header-type.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { LoginRequest } from '../../Models/dto/login';
import { LoginResponse } from '../../Models/dto/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean | undefined;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  openResetPasswordModal(): void {
    const modalRef = this.modalService.open(ResetPasswordComponent);
    // You can pass data to the modal component using modalRef.componentInstance
    // Example: modalRef.componentInstance.userId = this.userId;
  }

 /*  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/user/management');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  } */

    onLogin(login: LoginRequest): void {
      this.showLoading = true;
      this.subscriptions.push(
        this.authenticationService.login(login).subscribe(
          (response: HttpResponse<LoginResponse>) => {
            const loginResponse = response.body;
            if (loginResponse !== null) {
              const token = loginResponse.token;
              if (token !== null) {
                this.authenticationService.saveToken(token);
              } else {
                // Handle the case when the token is null
                this.sendErrorNotification(NotificationType.ERROR, 'Invalid token received.');
              }
              if (loginResponse !== null) {
                this.authenticationService.addUserToLocalCache(loginResponse);
                this.router.navigateByUrl('/');
              } else {
                // Handle the case when the response body is null
                this.sendErrorNotification(NotificationType.ERROR, 'Invalid user data received.');
              }
            } else {
              // Handle the case when the response body is null
              this.sendErrorNotification(NotificationType.ERROR, 'Invalid response received.');
            }
            this.showLoading = false;
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoading = false;
          }
        )
      );
    }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
