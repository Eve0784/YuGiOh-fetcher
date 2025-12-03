class DataFetcher {
    constructor(num = 20) {
        this.num = num;
        this.offset = 0;
        this.cardYuGUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?offset=" + this.offset + "&num=" + this.num;
        this.next_page = null;
        this.previous_page = null;
        this.current_page = 1;
        this.total_pages = 1;
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

        this.current_page = fetcherData.meta.current_page;
        this.total_pages = fetcherData.meta.total_pages;

        // Calculate current page based on previous_page_offset
        // let prevOffset = fetcherData.meta.previous_page_offset ?? -this.num;
        // this.current_page = Math.floor((prevOffset + this.num) / this.num) + 1;

        // Alternative calculation
        if (this.previous_page) {
            this.current_page = (fetcherData.meta.previous_page_offset / this.num) + 2;
        } else {
            this.current_page = 1;
        }


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