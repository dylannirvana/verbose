/*
*This component represents the Product displayed within the Product Grid
 */

import React from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle
} from 'reactstrap';
import circaLogo from '../../images/circa-logo.png';


const Product = (props) => {


    const FILTER_FACTORY = props.container.getFilterFactory();


    return (

        //Render the Product as a BootStarp Card
        <div className={"grid-item " + FILTER_FACTORY.getCSSClasses(props.product) } id={"product-"+props.product.sku} data-sku={props.product.sku}>
            <Card>
                <CardTitle>
                    {props.product.name}
                </CardTitle>

                <small className="text-muted neworder">{props.product.sku}</small>

                <CardImg top
                         width="100%"
                         src={props.product.image }
                         alt="Card image cap"/>
                <CardBody>
                    <CardText>
                        {props.product.category}
                    </CardText>
                    <CardText>
                        {props.product.function}
                    </CardText>
                    <CardText>
                        {props.product.relatives}
                    </CardText>
                    <div className="product-info justify-content-between align-items-center">
                        <span className="text-muted name">{props.product.designer}</span>

                    </div>


                </CardBody>
                <CardText className="gridorder-label">
                    Grid Order: {FILTER_FACTORY.getIndexOfProduct(props.product)}
                </CardText>
            </Card>
        </div>


    );

}


export default Product;