export class Product {
    id?: any;
    name: string;
    description: string;
    state: string;
    price: number;
    available: boolean;
    size: number;
    weight: number;
    color: string;
    image: string
    category: any;
    constructor(name: string, description: string, state: string, price: number, available: boolean,
        size: number, image: string, weight: number, color: string, id?: number) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.state = state;
        this.price = price;
        this.available = available;
        this.size = size;
        this.weight = weight;
        this.color = color;
        this.image = image;


    }

}
