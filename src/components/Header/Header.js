/*
* Renders the header, which includes the Logo and Grid Controls
 */
import React from "react";
import {
    Navbar,
    NavbarBrand,
    Container,
    Collapse,
    Button,
    Col,
    Row
} from 'reactstrap';




export default class Header extends React.Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state={
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

        return (
            <div id={"page-header"} className={"navbar navbar-dark bg-dark shadow-sm"}>
                <Collapse id={"header-collapse-panel"} isOpen={this.state.collapse}>
                    <Container>
                        <Row>
                            <Col sm="8" md="7" className={"py-4"}>
                                <h4 className="text-white">About this tool</h4>
                                <p className="text-muted">Add some information about how the Grid Order tool works. We
                                    should be able to explain it in terms that are easy to understand. We encourage you
                                    to use it.
                                </p>
                            </Col>
                            <Col sm="4" md={{offset: 1}} className={"py-4"}>
                                <h4 className="text-white">Questions?</h4>
                                <ul className="list-unstyled">
                                    <li><a href="/" className="text-white">Contact the Developer</a></li>
                                    <li><a href="/" className="text-white">Merchandising</a></li>
                                    <li><a href="/" className="text-white">Suggestions welcome!</a></li>
                                </ul>
                            </Col>

                        </Row>
                    </Container>
                </Collapse>
            <Container >
                <Navbar color="dark" dark>
                    <NavbarBrand className={"navbar-brand d-flex align-items-center"} id={"logo"} href="/">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="20"
                             height="20"
                             viewBox="0 0 24 24" fill="none"
                             stroke="currentColor"
                             strokeWidth={"2"}
                             strokeLinecap={"round"}
                             strokeLinejoin={"round"}
                             className={"mr-2"}>
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <strong>Grid Order App</strong>
                    </NavbarBrand>

                    <Button color="dark"  className={"navbar-toggler"} onClick={this.toggle} >
                        <span className="navbar-toggler-icon"></span>
                    </Button>


                </Navbar>
            </Container>
            </div>
        )

    }
}

