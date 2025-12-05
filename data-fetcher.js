class DataFetcher {
    constructor(num = 20) {
        this.num = num;
        this.offset = 0;
        this.cardYuGUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?offset=" + this.offset + "&num=" + this.num;
        this.next_page = null;
        this.previous_page = null;
        this.current_page = 1;
        this.total_pages = 1;
       // this.pages_remaining = 1;
        
    }
    getData() {
        return fetch(this.cardYuGUrl)
            .then(resp => resp.json())
            .then((result) => this.prepareData(result))
            .catch(err => console.log(err));
    }

    prepareData(fetcherData) {
        console.log(fetcherData)
        this.next_page = fetcherData.meta.next_page;
        this.previous_page = fetcherData.meta.previous_page
        this.total_pages = fetcherData.meta.total_pages;
        //this.pages_remaining = fetcherData.meta.pages_remaining;
        this.next_page_offset = fetcherData.meta.next_page_offset;

        //Calcolare la pagina corrente in base alle pagine rimanenti
        // this.current_page = this.total_pages -  this.pages_remaining  + 1;

        // Calcolare la pagina corrente in base al next offset
        this.current_page = this.next_page_offset / this.num;

        // calcolo alternativo della pagina corrente
        // if (this.previous_page) {
        //     this.current_page = (fetcherData.meta.previous_page_offset / this.num) + 2;
        // } else {
        //     this.current_page = 1;
        // }
        return fetcherData.data;
    }

    previousPage() {
        if (this.previous_page) {
            this.cardYuGUrl = this.previous_page;
            return this.getData();
        }
    }
    nextPage() {
        if (this.next_page) {
            this.cardYuGUrl = this.next_page;
            return this.getData();
        }
    }

}