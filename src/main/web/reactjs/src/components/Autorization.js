import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Form, Container, Row, Col, Card} from "react-bootstrap";
import "../styles/style.css";
import {MDBBtn} from "mdbreact";
import {Link} from "react-router-dom";


class Autorization extends Component {

   /* state = {
        isOpen: true
    }*/
    constructor(props) {
        super(props);

        this.state = { isOpen: false}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }


    render() {
        const textFields = {
            marginBottom: "30px", fontHeight: 1.5
        }

        const marginTop = {
            marginTop: "100pt"
        }

      //  const login = this.state.isOpen && <section>{this.props.login}</section>
        return(
          <Container>
                  <Col lg={12} style={marginTop}>
                            <Card className="shadow mx-auto widthForm" border style={{backgroundColor: "#f8f8ff"}}>
                              <Card.Body className="text-center p-4">
                                  <h1 className="h3 mb-4 mt-3" style={{color: "#01579b"}}>Вход</h1>
                                  <Form className="simple-form">
                                    <Form.Group>
                                        <Form.Control type="email" placeholder="e-mail" style={textFields}/>
                                        <Form.Control type="password" placeholder="пароль"/>
                                    </Form.Group>
                                  </Form>
                                  <MDBBtn className="mt-3" color="primary" onClick={this.handleSubmit}>Войти</MDBBtn>
                              </Card.Body>
                              <Card.Footer className="py-2" style={{fontSize: "11pt"}}>
                                  <Row>
                                      <p className="col-xl-6 mt-2 pl-5 text-muted">Нет аккаунта?</p>
                                      <Link to={"register"} className="font-weight-bold nav-link" style={{color: "#01579b"}}>Создать новый</Link>
                                  </Row>
                              </Card.Footer>
                            </Card>
                  </Col>
          </Container>

        );
    }

    handleSubmit() {
        console.log("--submit")

    }

    handleRegister() {
        console.log("--register")
    }

    handle

}

export default (Autorization);
