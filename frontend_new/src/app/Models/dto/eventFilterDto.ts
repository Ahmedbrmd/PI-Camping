export class EventFilterDto {
  constructor(
    public categories: string[] | null = null,
    public minPrice: number = 0.0,
    public maxPrice: number = 100000.0,
    public startDate: any = new Date('2020-01-01'),
    public endDate: any = new Date('2050-12-12'),
    public sort: string = "name,asc",
    public searchTerm : string =""
  ) {}
}
