export class Feedback {
  idFeedback: number;
  rating: number;
  comment: string;
  createAt: Date;

  constructor(
    idFeedback: number,
    rating: number,
    comment: string,
    createAt: Date
  ) {
    this.idFeedback = idFeedback;
    this.comment = comment;
    this.rating = rating;
    this.createAt = createAt;
  }
}
