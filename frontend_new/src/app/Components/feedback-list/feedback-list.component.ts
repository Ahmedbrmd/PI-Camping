import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FeedbackService } from '../../Services/feedback.service';
import Swal from 'sweetalert2';
import { FeedbackUpdateModalComponent } from '../feedback-update-modal/feedback-update-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent implements OnInit {
  displayedColumns: string[] = ['rating', 'createAt', 'comment', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  feedbacks: any;

  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFeedbaks();
  }

  getFeedbaks() {
    this.feedbackService.getAll().subscribe(
      (response) => {
        this.feedbacks = response;
      },
      (error) => {
        console.log('error' + error.message);
      }
    );
  }

  deleteFeedback(feedback: any) {
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
        this.feedbackService.deleteFeedback(feedback.idFeedback).subscribe(
          (response) => {
            Swal.fire(
              'Deleted!',
              feedback.idFeedback + ' has been deleted.',
              'success'
            );
            this.getFeedbaks();
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Unable to delete the feedback',
            });
          }
        );
      }
    });
  }

  openUpdateModal(feedback: any): void {
    const dialogRef = this.dialog.open(FeedbackUpdateModalComponent, {
      width: '600px',
      data: { feedback },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getFeedbaks(); // Refresh the list if update was successful
      }
    });
  }

  navigateToFeedbackList() {
    this.router.navigate(['/feedback']);
  }
}
