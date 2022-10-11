class Data {

    constructor(data) {
        this.httpUrl = "http://127.0.0.1:8008";
        // Url and the prefix
        // For fetching data
        this.url = data.url;
        this.report = data.report;
        this.prefix = data.prefix;
        this.other = data.other;
        this.filters = {};
        this.stats = null;


        // Default sort

        this.sort = {
            field : 'id',
            direction : 'desc',
        };

        // Size
        this.filters.size = 10;

        // Search

        this.filters.search = "";

        // Loading state

        this.loading = false;




        // Start Default Pages number

        this.page  = 1;

        // Default Content

        this.content = {
            current_page: 1,
            data: [],
            total: 0,
            to : 0
        };


    }

    buildReportUrl()
    {
        // Start url
        let url = `${this.httpUrl}${this.report}?page=${this.page}`;

        for (const property in this.filters)
        {
            if (this.filters[property] !== undefined)
            {
                url += `&${property}=${this.filters[property]}`;
            }

        }

        // Adding Sort , Search , Page number  to the url
        return url + `&sort=${this.sort.field},${this.sort.direction}`;
    }

    // Building the url for sending on the ajax requests

    build()
    {
        // Start url
        let url = `${this.httpUrl}${this.url}?page=${this.page}`;

        for (const property in this.filters)
        {
            if (this.filters[property] !== undefined)
            {
                url += `&${property}=${this.filters[property]}`;
            }

        }

        // Adding Sort , Search , Page number  to the url
        return url + `&sort=${this.sort.field},${this.sort.direction}`;
    }

    fetch(){
        this.load(false);
    }

    append(){
        this.load(true);
    }

    // Send Ajax Requests to the server and the assign values
    load(append){
        // Open the loader
        this.openLoader();

        // Assign the page number based on request
        this.page = append ? this.page + 1 : 1;

        window.axios.get(this.build()).then((response) => {

            if (this.other)
            {
                this.stats = response.data.body[this.other];
            }

            // Append Content

            if (append){

                // Push items to content

                response.data.body[this.prefix].data.forEach((value) => {
                    this.content.data.push(value);
                });

                // Update all content data remaining

                this.content.to = response.data.body[this.prefix].to;
                this.content.total = response.data.body[this.prefix].total;

                return;
            }

            // Replace all content data
            this.content = response.data.body[this.prefix];

        }).catch((error) => {

        }).finally(() =>{
            this.closeLoader();
        });


    }
    // Sets the loader to loading state
    openLoader(){
        this.loading = true;
    }

    // Sets the loader to closed state
    closeLoader(){
        this.loading =  false;
    }
}

export default Data;
