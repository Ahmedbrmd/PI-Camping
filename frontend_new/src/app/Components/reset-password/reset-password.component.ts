import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthenticationService } from '../../Services/authentication.service';
import { NotificationService } from '../../Services/notification.service';
import { UserService } from '../../Services/user.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { Subscription } from 'rxjs';
import { User } from '../../Models/user';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public refreshing: boolean | undefined;
  user: User | null = new User;
  private subscriptions: Subscription[] = [];

  constructor(public activeModal: NgbActiveModal,private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {}

    ngOnInit(): void {}

    public onResetPassword(emailForm: NgForm): void {
      this.refreshing = true;
      const emailAddress = emailForm.value['reset-password-email'];
      this.subscriptions.push(
        this.authenticationService.resetPassword(emailAddress).subscribe(
          response => {
            this.sendNotification(NotificationType.SUCCESS, `Reset Password successful for ${response.firstName} ! Please check your email for password to log in.`);
            this.refreshing = false;
          },
          error => {
            this.sendNotification(NotificationType.WARNING, error.message);
            this.refreshing = false;
          },
          () => emailForm.reset()
        )
      );
    }

    private sendNotification(notificationType: NotificationType, message: string): void {
      if (message) {
        this.notificationService.notify(notificationType, message);
      } else {
        this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
      }
    }

    dismissModal(): void {
      this.activeModal.dismiss();
    }

}
