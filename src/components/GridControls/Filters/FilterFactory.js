

const FILTER_LIST = ['category', 'function', 'family'];


export default class FilterFactory {


    constructor() {

        this.filters = {}; // List of filters, created once the product feed is parsed

        //Iterator keeps a track of where the user is in the filter selection process, which filters are visible etc
        this.iterator = {

            index: 0,

            isFirst: () => {
                return this.iterator.index === 0;
            },

            isLast: () => {
                return this.iterator.index === FILTER_LIST.length - 1;
            },

            next: () => {

                if (this.iterator.index <= FILTER_LIST.length - 1) {

                    this.iterator.index++;

                }

                return this.iterator.current();
            },

            prev: () => {

                if (this.iterator.index > 0) {

                    this.iterator.index--;

                }

                return this.iterator.current();
            },

            current: () => {
                if (this.iterator.index < FILTER_LIST.length) {

                    const FILTER_NAME = FILTER_LIST[this.iterator.index];

                    if (!this.filters[FILTER_NAME]) {
                        this.addNewFilter(FILTER_NAME, true);

                    }

                    return this.filters[FILTER_NAME];

                }

                return false;
            },

            goTo: (filterName) => {
                this.iterator.index = FILTER_LIST.indexOf(filterName);

                // this.iterator.index++; //Do not remove clicked filter

                //Remove filters that follow
                for (let i = this.iterator.index + 1; i <= (FILTER_LIST.length - 1); i++) {
                    const FILTER_NAME = FILTER_LIST[i];

                    if (this.filters[FILTER_NAME]) {

                        delete this.filters[FILTER_NAME]

                    }

                }

                this.filterProductFeed();


            }


        }


        this.feed = [];
        this.filteredProducts = [];

    }


    /*
    * Initialize Filter Factory with product feed
     */
    init(feed){
        this.feed = feed;
        this.filteredProducts = Array.from(feed);

        //this.updateVisibleFilters()
    }


    /*
    * Adds new filter to this.filters
     */
    addNewFilter = (filterName, isVisible) => {

        this.filters[filterName] = {
            filterName,
            isVisible,
            index: FILTER_LIST[filterName],
            filterOptions: this.getFilterOptions(filterName),
            selectedOption: ''
        }
    }



    /*
     * Iterate through the products and populate filter options
     */
    getFilterOptions = (filterName) => {

        let filterOptions = [];

        this.filteredProducts.forEach((product) => {

            const filterOption = product[filterName] === undefined ? null : product[filterName].split(" > ")[0];

            if (filterOption && filterOptions.indexOf(filterOption.toLowerCase()) === -1) {
                filterOptions.push(filterOption.toLowerCase())
            }

        });

        return filterOptions;
    };



    /*
    * Marks the filter option as selected / unselected
    * and then toggles visibility of the other filters
     */
    toggleFilterOption = (filterName, option) => {

        if (this.filters[filterName].selectedOption === option.toLowerCase()) {
            this.filters[filterName].selectedOption = "";
        } else {
            this.filters[filterName].selectedOption = option.toLowerCase();
        }

        //Toggles visibility of the other filters
        return this.updateVisibleFilters(filterName, option)
    }



    /*
    * Makes relevant filters visible; Irrelevant filters are hidden
     */
    updateVisibleFilters = (clickedFilterName = "", filter = false) => {
        const FILTER = this.filters[clickedFilterName];

        if (!clickedFilterName) { //If no filter has been clicked, show the first filter

            this.iterator.current();
            return this.filterProductFeed();

        } else if (this.shouldSort(FILTER.filterName)) {

            return this.sortProducts(FILTER);

        } else {

            this.iterator.goTo(clickedFilterName);

            if (FILTER.selectedOption) { //If an option is selected
                this.iterator.next();
            }

            return this.filteredProducts;
        }
    };



    /*
    * Returns all visible filters
     */
    getVisibleFilters = () => {


        let result = {};
        let obj = this.filters;

        Object.keys(obj).forEach(function (key) {

            const FILTER = obj[key];

            if (FILTER.isVisible) {
                result[key] = FILTER;
            }
        })


        return Object.keys(obj).length ? result : [];
    }



    /*
    * Returns an Array of all the selected filter options
     */
    getAllSelectedOptions = () => {
        let selectedOptionsList = [];

        const VISIBLE_FILTERS = this.getVisibleFilters();

        FILTER_LIST.forEach(filterName => {

            Object.keys(VISIBLE_FILTERS).forEach(key => {


                const SELECTED_OPTION = this.filters[filterName] !== undefined ? this.filters[filterName].selectedOption : undefined;

                if (key === filterName && SELECTED_OPTION) {
                    selectedOptionsList.push({
                        name: filterName,
                        selectedOption: SELECTED_OPTION
                    });
                }

            })

        });

        return selectedOptionsList;
    };



    /*
    * Filters the products, based on the filter options selected
     */
    filterProductFeed() {

        let selectedOptionsList = this.getAllSelectedOptions();


        if (!selectedOptionsList.length) {
            this.filteredProducts = Array.from(this.feed);
            return this.filteredProducts;
        }

        this.filteredProducts = Array.from(this.feed);

        this.filteredProducts = this.filteredProducts.filter(function (product, index) { //Loop through each product in the product feed
            let result = true;
            selectedOptionsList.some((filter) => { //Loop through the applied filters

                //Check if the product matches atleast one of the the selected filters
                if (result && product[filter.name] !== undefined && product[filter.name].toLowerCase().indexOf(filter.selectedOption.toLowerCase()) !== -1) {

                    //If there is a match, return true and exit the loop
                    return false;
                } else {
                    result = false;
                }

                //If there is no match, return false and continue with the loop
                return false;
            })

            return result;
        });

        return this.filteredProducts;

    };



    /*
    * Sorts the product
     */
    sortProducts(FILTER) {

        let sortedProducts = Array.from(this.filteredProducts);

        this.filteredProducts.forEach((product, index) => {

            if (product[FILTER.filterName] !== undefined && product[FILTER.filterName].toLowerCase() === FILTER.selectedOption.toLowerCase()) {

                sortedProducts.splice(index, 1);
                sortedProducts.unshift(product);
            }
        })

        this.filteredProducts = sortedProducts;

        return this.filteredProducts;

    };



    /*
    * Determines if sorting should happen
     */
    shouldSort(filterName) {
        return FILTER_LIST[FILTER_LIST.length - 1] === filterName && FILTER_LIST.length >= 3;
    }



    /*
    * Generates CSS classes for a given product
     */
    getCSSClasses(product) {
        let classes = '';

        FILTER_LIST.forEach(filterName => {
            if (product[filterName] !== undefined) {
                classes += product[filterName].split(' > ')[0].replace(' ', '-') + ' ';
            }

        })

        return classes.toLowerCase();
    };



    /*
    * Gets the index of a product in the product feed
     */
    getIndexOfProduct(product) {
        return this.feed.indexOf(product) + 1;
    }



    /*
    * Gets the product feed
     */
    getFeed(){
        return this.feed;
    }

    /*
    * Returns filtered products
     */
    getFilteredProducts(){
        return this.filteredProducts;
    }

    /*
    * Returns if products are available
     */
    productsAvailable() {
        return Boolean(this.feed.length);
    }



}
