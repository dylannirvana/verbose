/*
* This component generates a new CSV file, based on the new order of the filteredProducts tiles
 */

import React from 'react';
import {Button} from 'reactstrap';
import Papa from "papaparse";


export default class SaveGrid extends React.Component {
    constructor(props) {
        super(props);

        this.saveNewGrid = this.saveNewGrid.bind(this);
    }


    //Generates a new CSV file, based on new order of the filteredProducts tiles
    saveNewGrid() {

        const newGridHTML = this.props.container.getState('packery').getItemElements();
        let newGridJSON = [];

        newGridHTML.forEach(function (product, index) {
            newGridJSON.push({basecode: product.getAttribute('data-sku'), neworder: (index + 1)})

        })

        const csv = Papa.unparse(newGridJSON),
            csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'}),
            csvURL = navigator.msSaveBlob ? navigator.msSaveBlob(csvData, 'download.csv') : window.URL.createObjectURL(csvData);

        //Create <a> tag, that would trigger the SAVE Dialog box, for saving the CSV
        var downloadLink = document.createElement('a');
        downloadLink.href = csvURL;
        downloadLink.setAttribute('download', 'download.csv');
        document.body.appendChild(downloadLink); // Required for FF
        downloadLink.click();


    }

    render() {

        return (
            <Button color="primary" className={"nav-btn"} onClick={this.saveNewGrid}>
                Save
            </Button>

        )
    }
}



