/*
* Entry point for the App
 */

import React, {Component} from 'react';


import Header from './components/Header/Header';
import ProductGrid from './components/ProductGrid/ProductGrid';
import './App.scss';
import FilterFactory from "./components/GridControls/Filters/FilterFactory";
import GridControls from "./components/GridControls";
import {Container, Jumbotron} from 'reactstrap';
import Spinner from './components/Spinner';
import FileUploader from "./components/GridControls/FileUploader/FileUploader";


class App extends Component {

    constructor(props) {
        super(props);
        const component = this;

        this.state = {

            filterFactory: new FilterFactory(),

            spinnerVisibility: 'none',

            packeryRefresh: true, /// whether packery should be refreshed
            packery: false, //Reference to the Packery Instance
            dragableComponents: [] //Array of dragable product components
        };

        //Container allows the child components to manage the state of the GridOrder component
        this.container = {

            //Functions for managing state
            getState: function (state) {
                return state !== undefined ? component.state[state] : component.state
            },

            setState: function (state) {

                component.setState(state);
            },

            initFilterFactory(feed){
                component.state.filterFactory.init(feed);
                component.forceUpdate();

            },


            //Indicates if the product grid has been populated with data
            gridPopulated: function () {
                return Boolean(component.state.feed.length);
            },

            getFilterFactory: function () {

                return component.state.filterFactory;
            },

            showSpinner: () => {
                component.setState({spinnerVisibility: 'block'});
            },

            hideSpinner: () => {
                component.setState({spinnerVisibility: 'none'});
            }


        }

        return this;
    }


    render() {

        return (
            <div id={"page"} >

                <Spinner spinnerVisibility={this.state.spinnerVisibility}/>
                <Header container={this.container}/>

                <Jumbotron  id="app-intro" className={"text-center"}>
                    <Container>
                        <h1 className={"jumbotron-heading"}>Grid Order App</h1>
                        <p className={"lead text-muted"}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Container>
                </Jumbotron>

                {
                    //If there are no products uploaded via CSV, display the FileUploader component
                    !this.state.filterFactory.productsAvailable() &&
                     <FileUploader container={this.container}/>
                }

                {/*Render the controls for controlling the product grid*/}
                <GridControls container={this.container}/>

                <ProductGrid container={this.container}/>
            </div>
        );
    }
}

export default App;