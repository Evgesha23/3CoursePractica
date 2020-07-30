import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Header extends Component {
    componentDidMount() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
        this.props.dispatch({type: 'SET_LOGGED_IN', loggedIn: loggedInUser});
    }
    render() {
        return (
            <Navbar className="header fontHeadFoot py-2" fixed="top" variant="dark" style={{opacity: "0.99"}}>
                <Link to={""} className="navbar-brand ml-3" style={{marginTop: "-3px"}}>
                    <img src="https://cdn-ru.bitrix24.ru/b9205221/landing/057/057cf1be28eb8d045a98af28ea1539c0/OOO_Rezultat.png"
                         width="22px" height="22px" alt="anres" style={{marginRight: "10px", marginTop: "-3px"}}/>
                    Anres
                </Link>
                <Nav className="mr-auto">
                    {console.log("NavigationBar -> " + this.props.loggedIn)}
                    {
                        (this.props.loggedIn) &&
                    <Link to={"base"} className="nav-link">База</Link>
                    }
                </Nav>
                <Nav>
                    {(this.props.loggedIn) ?
                         <Nav.Link href="register" className="mr-sm-2">
                            Регистрация
                        </Nav.Link>
                        :
                        <Nav.Link href="signIn" className="mr-sm-2">
                            Вход
                        </Nav.Link>
                    }
                </Nav>
            </Navbar>
        )
    }
}
export default connect()(Header);
