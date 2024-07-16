export class CampPlaceFilterDto {

    constructor(

        public categories: string[] | null = null, public states: string[] | null = null,

        public sort: string = "name,asc",

        public searchTerm: string = ""

    ) { }

}