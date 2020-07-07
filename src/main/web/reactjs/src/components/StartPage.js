import React, {Component} from "react";
import {Container, Row, Col, Jumbotron, Figure, Button} from "react-bootstrap";
import logo from "../images/PngItem.png";

export default class StartPage extends Component{
    handleClick_1 = () => {
        window.open("http://tfs.etsp.ru:8080/tfs/TruckService/ADTS/_dashboards")
    }
    handleClick_2 = () => {
        window.open("https://its.etsp.ru/dashboard.ivp/list")
    }
    render() {
        const style = {
            backgroundImage: "linear-gradient(#2C4295, #0083CA)",
            color: "white",
            fontSize: "24pt",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "400px",
            height: "200px"
        }
        return(
            <div className="main-page mx-auto">
                <div style={{marginTop: "80px"}}>
                    <Container style={{maxWidth: "1100px"}}>
                        <Jumbotron className="shadow" style={{backgroundColor: "white", borderRadius: "10px", height: "360px"}}>
                            <Row>
                                <Col lg={5} className="mx-5">
                                    <h1 className="font-weight-light text-center" style={{fontSize: "35pt"}}>Добро пожаловать на сервис Anres</h1>
                                    <h4 className="font-weight-light mt-5" style={{fontSize: "17pt"}}>Система учета результатов тестирования</h4>
                                </Col>
                                <Col>
                                    <img alt="logo" src={logo} height="250px"/>
                                </Col>
                            </Row>
                        </Jumbotron>

                        <Container className="pt-5 mx-auto">
                            <Row className="my-lg-5">
                                <Col className="p-md-4">
                                    <h2 className="font-weight-normal mb-4" style={{fontSize: "28pt", textShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)"}}>Кто может пользоваться Anres</h2>
                                    <p className="lead font-weight-lighter" style={{fontSize: "18pt"}}>тестировщики компании "Corpitech"</p>
                                    <p className="lead font-weight-lighter" style={{fontSize: "18pt"}}>тестировщики компании-заказчика</p>
                                </Col>
                                    <Col className="p-md-4">
                                        <h2 className="font-weight-normal mb-4" style={{fontSize: "28pt", textShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)"}}>Для чего нужен сервис</h2>
                                        <p className="lead font-weight-lighter" style={{fontSize: "18pt"}}>ведение учета протестированных заявок</p>
                                        <p className="lead font-weight-lighter" style={{fontSize: "18pt"}}>составление отчетов</p>
                                    </Col>
                            </Row>
                            <Row>
                            <p className="lead ml-5" style={{fontSize: "14pt"}}>*Сервис использовать в личных целях</p>
                            <Figure>
                                <Figure.Image width={1000} height={2} style={{marginLeft: "30px", marginTop: "-10px"}}/>
                            </Figure>
                            </Row>
                        </Container>

                        <Container className="mx-auto">
                            <Row className="my-4">
                                <h1 className="mx-4 lead font-weight-bold" style={{fontSize: "24pt"}}>ДОПОЛНИТЕЛЬНЫЕ</h1>
                                <h1 className="lead font-weight-bold" style={{fontSize: "24pt", color: "#3EA4A0"}}>СЕРВИСЫ</h1>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="container py-4" style={style}>
                                        <h2>IntraService</h2>
                                            <Button className="mt-4 px-5 py-1" size={"lg"} variant={"light"}
                                                style={{color: "#3EA4A0", fontWeight: "600"}}
                                                    onClick={this.handleClick_1}>
                                            Перейти</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="container py-4" style={style}>
                                        <h2 as={Row}>Team Foundation</h2>
                                        <h2 as={Row}>Server</h2>
                                        <Button className="mt-3 px-5 py-1" size={"lg"} variant={"light"}
                                                style={{color: "#3EA4A0", fontWeight: "600"}}
                                                onClick={this.handleClick_2}
                                        >Перейти</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </div>
        )
    }
}
