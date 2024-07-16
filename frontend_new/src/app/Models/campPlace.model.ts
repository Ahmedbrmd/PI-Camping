export class CampPlace {

    idCampPlace?: any;
    name: string;
    category: string;
    tel: number;
    email: string;
    address: string;
    state: string;
    image: string;
    description: string;
    longitude: number;
    latitude: number;

    constructor(name: string, category: string, tel: number, email: string, address: string, state: string, image: string, description: string,
        longitude: number, latitude: number, idCampPlace?: number) {

        this.idCampPlace = idCampPlace;
        this.name = name;
        this.address = address;
        this.category = category;
        this.tel = tel;
        this.email = email;
        this.state = state;
        this.image = image;
        this.description = description;
        this.longitude = longitude;
        this.latitude = latitude;


    }
}