/*
* This component and its children, represent a collection of controls for working with the filteredProducts
 */

import React from "react";
import SaveGrid from "./SaveGrid";
import FilterContainer from "./Filters/FilterContainer";


class GridControls extends React.Component {


    render() {

        const FILTER_FACTORY = this.props.container.getFilterFactory();

        return (

            <ul id="product-grid-controls" className={" navbar-nav"}>

                <li className={"grid-control"}>
                    {
                        <FilterContainer
                            container={this.props.container}
                        />
                    }
                </li>


                <li className={"text-center grid-control"} style={{display: FILTER_FACTORY.productsAvailable() ? '' : 'none'}}>
                    {/*SaveGrid is a component for generating a CSV file from the filteredProducts tiles */}
                    <SaveGrid container={this.props.container}/>

                </li>


            </ul>
        )
    }
}

export default GridControls;