import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  // Inject Router Dependency
  constructor(private router: Router) { }
  ngOnInit(): void { }

  onBtnClick() {
    // Navigate to home page
    this.router.navigate(['']);
  }


}
