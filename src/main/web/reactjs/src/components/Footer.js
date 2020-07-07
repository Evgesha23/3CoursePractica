import React, {Component} from "react";
import {Container, Col, Row} from "react-bootstrap";
import "../styles/style.css";
import iconMTS from "../images/mts.png";
import iconLife from "../images/life.png";
import facebook from "../images/facebook.png";
import vk from "../images/vk.png";
import telegram from "../images/telegram.png";
import mail from "../images/mail.png";

export default class Footer extends Component {
    handleClickFacebook = () => {
        window.open("https://www.facebook.com/evgenia.kleshnyak")
    }
    handleClickVk = () => {
        window.open("https://vk.com/kl_evgesha")
    }
    handleClickTelegram = () => {
        window.open("https://t.me/kl_evgesha")
    }
    handleClickMail = () => {
        window.open("mailto:kleshnyak.eva@mail.ru")
    }
    handleClickMailPdu = () => {
        window.open("mailto:17it3.kleshniak.y@pdu.by")
    }

    render() {

        const styleIcon = {
            height: "22px",
            borderRadius: "5px",
            marginRight: "7px",
            marginTop: "3px", opacity: "0.8"
        }

        let fullYear = new Date().getFullYear();

        return (
            <footer className="fontHeadFoot" style={{height: "120px"}}>
                <Container className="ml-4" style={{maxWidth: "1400px"}}>
                    <Row>
                        <Col lg={4} className="my-3" style={{opacity: "0.5"}}>
                            <h4 className="lead font-weight-lighter" style={{fontSize: "14pt"}}>Руководитель: Антонов Роман Леонидович</h4>
                            <p onClick={this.handleClickMailPdu} className="lead font-weight-lighter mt-3" style={{fontSize: "12pt"}}>17it3.kleshniak.y@pdu.by</p>
                        </Col>

                        <Col lg={4} className="mt-5 mx-5 text-center" style={{opacity: "0.5"}}>
                            <h3 className="lead font-weight-normal pt-4 mt-2" style={{fontSize: "14pt"}}>Corpitech, {fullYear} - {fullYear + 1}</h3>
                        </Col>

                        <Col className="mt-2">
                            <Row>
                                <h4 className="lead font-weight-normal ml-5 pl-5" style={{fontSize: "14pt", opacity: "0.5"}}>
                                    Контактные данные: </h4>
                            </Row>
                            <Row className="lead font-weight-lighter" style={{fontSize: "12pt"}}>
                                <div className="col-12 col-xl-9">
                                    <Container>
                                    <Row style={{marginLeft: "0.1px"}}>
                                    <img alt="mts" src={iconMTS} style={styleIcon}/>
                                        <p style={{opacity: "0.5"}}>+375(29)825-80-03</p></Row>
                                    <Row>
                                    <img alt="life" src={iconLife} style={styleIcon} className=""/>
                                        <p style={{opacity: "0.5"}}>+375(25)543-77-91</p></Row>
                                    </Container>
                                </div>
                                <div className="col-xl">
                                    <Row className="mt-1">
                                        <img alt="facebook" src={facebook} title="evgenia.kleshnyak" className="styleIconSocialNetwork" onClick={this.handleClickFacebook}/>
                                        <img alt="vk" src={vk} title="kl_evgesha" className="styleIconSocialNetwork" onClick={this.handleClickVk}/>
                                        <img alt="telegram" src={telegram} title="@kl_evgesha" className="styleIconSocialNetwork" onClick={this.handleClickTelegram}/>
                                        <img alt="mail" src={mail} title="kleshnyak.eva@mail.ru" className="styleIconSocialNetwork" onClick={this.handleClickMail}/>
                                    </Row>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    }

}
