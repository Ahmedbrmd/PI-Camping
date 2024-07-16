export class ProductFilterDto {
    constructor(
        public categories: string[] | null = null,
        public minPrice: number = 0.0,
        public maxPrice: number = 100000.0,
        public sort: string = "name,asc",
        public searchTerm: string = ""
    ) { }
}
