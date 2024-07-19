import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackService } from '../../Services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-update-modal',
  templateUrl: './feedback-update-modal.component.html',
  styleUrls: ['./feedback-update-modal.component.css'],
})
export class FeedbackUpdateModalComponent {
  constructor(
    public dialogRef: MatDialogRef<FeedbackUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feedback: any },
    private feedbackService: FeedbackService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateFeedback(): void {
    this.feedbackService
      .updateFeedback(this.data.feedback.idFeedback, this.data.feedback)
      .subscribe(
        () => {
          Swal.fire('Updated!', 'Feedback has been updated.', 'success');
          this.dialogRef.close(true); // Pass true if update is successful
        },
        (error) => {
          console.log('Error updating feedback:', error);
          Swal.fire('you sure ');
        }
      );
  }
}
