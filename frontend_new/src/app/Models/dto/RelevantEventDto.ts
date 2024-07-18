export class RelevantEvent{
    idEvent: number;
    name:string;
    image : any;
  campPlaceLocation: string;
  constructor(idEvent:number,name:string,campPlaceLocation:string,image : any ){
    this.idEvent=idEvent;
    this.name=name;
    this.campPlaceLocation=campPlaceLocation;
    this.image=image;
  }
}
