import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";


export default class Header extends Component {
    render() {
        return (
            <Navbar className="header fontHeadFoot py-2" fixed="top" variant="dark" style={{opacity: "0.99"}}>
                <Link to={"home"} className="navbar-brand ml-3" style={{marginTop: "-3px"}}>
                    <img src="https://cdn-ru.bitrix24.ru/b9205221/landing/057/057cf1be28eb8d045a98af28ea1539c0/OOO_Rezultat.png"
                         width="22px" height="22px" alt="anres" style={{marginRight: "10px", marginTop: "-3px"}}/>
                    Anres
                </Link>
                <Nav className="mr-auto">
                    <Link to={"base"} className="nav-link">База</Link>
                </Nav>
                <Nav>
                    <Link to={"signIn"} className="nav-link" style={{marginRight: "10px"}}>Вход</Link>
                    <Link to={"register"} className="nav-link mr-3">Регистрация</Link>
                </Nav>
            </Navbar>
        )
    }
}
