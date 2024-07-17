import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FeedbackService } from '../../Services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent {
  displayedColumns: string[] = ['Id', 'rating', 'createAt', 'comment', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  feedbacks: any;
  selectedOptions: { [id: number]: boolean } = {};

  constructor(
    private router: Router,
    private feedbackservice: FeedbackService
  ) {}
  ngOnInit(): void {
    this.getFeedbaks();
  }

  getFeedbaks() {
    this.feedbackservice.getAll().subscribe(
      (response) => {
        console.log(response);

        this.feedbacks = response;
      },
      (error) => {
        console.log('error' + error.message);
      }
    );
  }

  onReset() {
    this.getFeedbaks();
  }

  navigateToDetails(element: any) {
    // Assuming you have a details route defined in your routing configuration
    this.router.navigate(['/ProductDetails/' + element.position]); // Replace 'details' with your actual details route path
  }

  deleteFeedback(feedback: any) {
    console.log('delete method');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedbackservice.deleteFeedback(feedback.idFeedback).subscribe(
          (reponse) => {
            Swal.fire(
              'Deleted!',
              feedback.idFeedback + 'has been deleted.',
              'success'
            );
            this.getFeedbaks();
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Unable to delete the product',
            });
          }
        );
      }
    });
  }
  navigateToFeedbackList() {
    this.router.navigate(['/feedback']);
  }
}
