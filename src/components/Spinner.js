import React from 'react';

import loaderIcon from '../images/loader.gif';


// Render the necessary HTML for user to upload CSV file
export default class Spinner extends React.Component {





    render() {

        return (
            <img src={loaderIcon} id="loader-icon" style={{display: this.props.spinnerVisibility}} alt="Loading"/>
        )
    }
}



