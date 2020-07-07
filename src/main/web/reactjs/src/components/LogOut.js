import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Button, Form, Col, Card, Container, Row} from "react-bootstrap";
import "../styles/style.css";
import {Link} from "react-router-dom";

export default class LogOut extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            login: '',
            passwordHash: '',
            name: '',
            isActive: false,
            typeMessage: "",
            textMessage: "",
            show: false
        }
    }

    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    userChangeChecked = event => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };


    render() {
        return (
            <Container className="page mx-auto" style={{marginTop: "80pt"}}>
                <Card className="shadow widthForm mx-auto" border style={{backgroundColor: "#f8f8ff"}}>
                        <Card.Body style={{fontSize: "11pt"}}>
                            <h1 className="h3 mb-4 mt-3" style={{color: "#01579b", textAlign: "center"}}>Регистрация</h1>
                            <Form.Row>
                                <Form.Group className="mt-3" as={Col} controlId="formGridEmail">
                                    <Form.Control required
                                                  type="text"
                                                  name="login"
                                                  value={this.state.login}
                                                  onChange={this.userChange}
                                                  className={"mb-2 text-primary"}
                                                  placeholder="e-mail"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFullName">
                                    <Form.Control required
                                                  type="text"
                                                  name="name"
                                                  value={this.state.name}
                                                  onChange={this.userChange}
                                                  className={"mb-2 text-primary"}
                                                  placeholder="имя"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                {/*passwordHash*/}
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Control required
                                                  type="password"
                                                  name="passwordHash"
                                                  value={this.state.passwordHash}
                                                  onChange={this.userChange}
                                                  className={"text-primary"}
                                                  placeholder="пароль"/>
                                </Form.Group>
                            </Form.Row>

                            {/*этот блок пока не используется*/}
                            {this.state.id ?
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridBlocked">
                                        <Form.Label>Заблокирован</Form.Label>
                                        <Form.Control type="checkbox"
                                                      name="isActive"
                                                      checked={this.state.isActive}
                                                      value={this.state.isActive}
                                                      onChange={this.userChangeChecked}
                                                      className={"bg-light text-primary mx-auto"}
                                                      placeholder="Введите "/>
                                    </Form.Group>
                                </Form.Row>
                                : null
                            }
                            <div className="my-3 text-center">
                            <Link to="/signIn">
                                <Button className="mr-4" variant="outline-primary" type="reset">
                                Отмена
                                </Button>
                            </Link>{' '}
                            <Button variant="primary" type="submit">
                                {this.state.id ? "Обновить" : "Сохранить"}
                            </Button>
                            </div>
                        </Card.Body>

                    <Card.Footer className="py-2" style={{fontSize: "11pt"}}>
                        <Row>
                            <p className="col-xl-7 mt-2 pl-5 text-muted">Уже есть аккаунт?</p>
                            <Link to={"signIn"} className=" font-weight-bold nav-link" style={{color: "#01579b"}}>Войти</Link>
                        </Row>
                    </Card.Footer>
                </Card>
            </Container>
        )
    }

}
