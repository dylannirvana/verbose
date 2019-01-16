import React, {Component} from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import Enzyme from 'enzyme';
import {createSerializer} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';


//Test Data, which contains 17 products
const DATA = JSON.parse('[{"sku":"81134","name":"Studio Swing Arm Floor Lamp","category":"Floor > Task","function":"Functional","relatives":"VC CLASSIC","designer":"Studio VC","image":"https://www.circalighting.com/media/catalog/product/8/1/81134hab_5.png","gridorder":"1215.0000","neworder":"","__parsed_extra":[""]},{"sku":"82034","name":"Studio Swing Arm Wall Light","category":"Wall > Task","function":"Functional","relatives":"VC CLASSIC","designer":"Studio VC","image":"https://www.circalighting.com/media/catalog/product/8/2/82034hab_1.png","gridorder":"4742.0000","neworder":"","__parsed_extra":[""]},{"sku":"91025","name":"Studio Adjustable Floor Lamp","category":"Floor > Task","function":"Functional","relatives":"VC CLASSIC","designer":"Studio VC","image":"https://www.circalighting.com/media/catalog/product/9/1/91025hab_5.png","gridorder":"1211.0000","neworder":"","__parsed_extra":[""]},{"sku":"92000D","name":"Classic Swing Arm Wall Lamp","category":"Wall > Task","function":"Functional","relatives":"VC CLASSIC","designer":"Studio VC","image":"https://www.circalighting.com/media/catalog/product/9/2/92000dhabl_1.png","gridorder":"4536.0000","neworder":"","__parsed_extra":[""]},{"sku":"92025","name":"Studio Swing Arm Wall Light","category":"Wall > Task","function":"Functional","relatives":"VC CLASSIC","designer":"Studio VC","image":"https://www.circalighting.com/media/catalog/product/9/2/92025hab_1.png","gridorder":"4738.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2000","name":"Dean Single Arm Sconce","category":"Wall > Decorative","function":"Decorative","relatives":"Dean","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2000pnnp_5.png","gridorder":"4159.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2001","name":"Dean Library Sconce","category":"Wall > Decorative","function":"Decorative","relatives":"Dean","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2001pnnp_8.png","gridorder":"4161.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2002","name":"Abbot Single Arm Sconce","category":"Wall > Decorative","family": "test-family", "function":"Decorative","relatives":"Abbot","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2002pnnp_8.png","gridorder":"4144.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2003","name":"Abbot Library Sconce","category":"Wall > Decorative","function":"Decorative","relatives":"Abbot","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2003gmnp_5.png","gridorder":"4146.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2004","name":"Bing Single Arm Sconce","category":"Wall > Decorative","function":"Decorative","relatives":"Bing","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2004pnnp_5.png","gridorder":"4137.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2010","name":"Ginger Single Arm Sconce","category":"Wall > Decorative","function":"Decorative","relatives":"Ginger","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2010pnnp_5.png","gridorder":"4139.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2012","name":"Gene Swing Arm","category":"Wall > Task","function":"Functional","relatives":"Gene","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2012nbs_1.png","gridorder":"4525.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2013","name":"Gene Library Sconce","category":"Wall > Decorative", "family": "test-family", "function":"Decorative","relatives":"Gene","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2013nbnp_5.png","gridorder":"4150.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2700","name":"Dean 9\\" Picture Light","category":"Wall > Picture","function":"Picture","relatives":"Dean2","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2700nb_1.png","gridorder":"5324.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2701","name":"Dean 12\\" Picture Light","category":"Wall > Picture","function":"Picture","relatives":"Dean2","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2701nb_1.png","gridorder":"5328.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2702","name":"Dean 18\\" Picture Light","category":"Wall > Picture","function":"Picture","relatives":"Dean2","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2702nb_1.png","gridorder":"5332.0000","neworder":"","__parsed_extra":[""]},{"sku":"AH2703","name":"Dean 24\\" Picture Light","category":"Wall > Picture","function":"Picture","relatives":"Dean2","designer":"Alexa Hampton","image":"https://www.circalighting.com/media/catalog/product/a/h/ah2703nb_1.png","gridorder":"5336.0000","neworder":"","__parsed_extra":[""]}]');

//Configure Enzyme to work with React
Enzyme.configure({ adapter: new Adapter() })

//Add snapshot serializer to JEST
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

//Create Renderer
const renderer = new ShallowRenderer();
renderer.render( <App  />)

//Get the App instance
const APP_INSTANCE = renderer._instance;




const FILTER_FACTORY = APP_INSTANCE.container.getFilterFactory(); //Filter Factory

FILTER_FACTORY.init(DATA);



const EXPECTED_PRODUCT_COUNT = {category: 15, function: 7, family: 7}; //Expected product count for each filter





/*
* Toggles filter option
 */
function toggleFilterOption(filterName, selectedOption, deselect = false){

    const FILTERED_PRODUCTS = FILTER_FACTORY.toggleFilterOption(filterName,selectedOption);

    if(!deselect){
        //EXPECT: Category attribute of each product to contain the keyword - Wall
        FILTERED_PRODUCTS.forEach((product) => {
            if( product[filterName] !== undefined){
                expect(product[filterName].toLowerCase()).toContain(selectedOption);
            }

        })
    }
    return FILTERED_PRODUCTS;
}




describe('Initial check',()=>{


    it(`Filter Factory populated with ${DATA.length} products`, () => {
        expect(FILTER_FACTORY.getFeed()).toHaveLength(DATA.length);
    });


})





describe('Verifying Filtering Logic',() => {
    for(let i =0; i < 3; i++){

        const SELECT = i%2 == 0 ? true : false;


        it(`${SELECT ? 'SELECTING' : 'DESELECTING'} Category -> Wall; Expected ${i%2 == 0 ? EXPECTED_PRODUCT_COUNT.category : DATA.length} products`  ,()=>{

            const FILTERED_PRODUCTS = toggleFilterOption('category','wall', !SELECT);

            //EXPECT: Correct product count is returned returned
            expect(FILTERED_PRODUCTS).toHaveLength(SELECT ? EXPECTED_PRODUCT_COUNT.category : DATA.length);



        })
    }

    for(let i =0; i < 3; i++){

        const SELECT = i%2 == 0 ? true : false;



        it(`${SELECT ? 'SELECTING' : 'DESELECTING'} Function -> Decorative; Expected ${i%2 == 0 ? EXPECTED_PRODUCT_COUNT.function : EXPECTED_PRODUCT_COUNT.category} products`  ,()=>{


            const FILTERED_PRODUCTS = toggleFilterOption('function','decorative', !SELECT);

            //EXPECT: Correct product count is returned returned
            expect(FILTERED_PRODUCTS).toHaveLength(SELECT ? EXPECTED_PRODUCT_COUNT.function : EXPECTED_PRODUCT_COUNT.category);


        })


    }
})





describe('Verifying Sorting Logic -> Sorting 2 products from the data set, with family == "test-family"',()=>{


    //Test Data has two products with family == "test-family"
    it('Verifying the two "test-family" products are not the first two products of the grid'  ,()=>{

        //Select the sort option
        const FILTERED_PRODUCTS = toggleFilterOption('family','test-family');

        //FILTER_FACTORY should be ready to sort
        const SHOULD_SORT = FILTER_FACTORY.shouldSort('family')
        expect(SHOULD_SORT).toEqual(true);


        //Before sort, first two products should not be having Family attribute's value "test-family"
        !expect(FILTERED_PRODUCTS[0].family).toEqual('test-family');
        !expect(FILTERED_PRODUCTS[1].family).toEqual('test-family');



    })

    it('After sorting, verifying the products with family == "test-family" are the first two products of the grid',()=>{
        //Do the sorting
        const SORTED_PRODUCTS = FILTER_FACTORY.sortProducts({filterName: "family", selectedOption:"test-family"});

        //Product count should be the same before and after the sorting
        expect(SORTED_PRODUCTS).toHaveLength(7);

        //After sort, first two products should  be having Family attribute's value "test-family"
        expect(SORTED_PRODUCTS[0].family).toEqual('test-family');
        expect(SORTED_PRODUCTS[1].family).toEqual('test-family');


    })


})





//Save the new order grid to a snapshot
describe('Saving New Grid Order to snapshot',() => {
    it('Snapshot created',()=>{
        expect(FILTER_FACTORY.getFilteredProducts()).toMatchSnapshot();
    })
})