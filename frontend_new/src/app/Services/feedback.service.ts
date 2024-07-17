import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../Models/feedback';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  apiurl = 'http://localhost:8084/camping/';

  constructor(private httpClient: HttpClient) {}

  addFeedback(feedback: Feedback) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');

    return this.httpClient.post(this.apiurl + 'feedback', feedback);
  }
  getAll() {
    return this.httpClient.get<Feedback[]>(this.apiurl + 'feedback');
  }

  deleteFeedback(id: any) {
    return this.httpClient.delete<string[]>(this.apiurl + 'feedback/' + id);
  }
}
