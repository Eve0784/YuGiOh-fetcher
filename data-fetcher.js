class DataFetcher {
    constructor(num = 20) {
        this.num= num;
        this.offset = 0;
        this.cardYuGUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?offset=" + this.offset + "&num=" + this.num;
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
        this.previous_page = fetcherData.meta.previous_page;
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