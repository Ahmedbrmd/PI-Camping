import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from '../../Models/feedback';
import { FeedbackService } from '../../Services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  username!: string;
  feedback: Feedback = new Feedback(0, 3, '', new Date());

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {});
  }
  submitFeedback() {
    this.feedbackService.addFeedback(this.feedback).subscribe(
      (reponse) => {
        console.log('Feedback added successfully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Feedback has been saved',
          showConfirmButton: false,
          timer: 2500,
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Unable to add feedback',
        });
      }
    );
  }

  commentControl: FormControl = new FormControl('');

  min = 0;
  max = 5;
  getRatingLabel(): string {
    // Return the text label based on the rating value
    switch (this.feedback.rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Average';
      case 4:
        return 'Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  }
  navigateToFeedbackList() {
    this.router.navigate(['/feedbacklist']);
  }
}
