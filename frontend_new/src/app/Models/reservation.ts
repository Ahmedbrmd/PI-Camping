
export class Reservation{

    notes: string;
    idReservation: any;
    date: Date;
    username : string;
    idEvent:any;
  
    constructor(notes: string,idReservation: any,
      date: Date,
      username : string,
      idEvent:any){
      this.notes = notes;
      this.date= date;
      this.username= username;
      this.idEvent= idEvent
    }
  }
  