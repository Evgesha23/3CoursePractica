import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Row, Col, Button, Form} from "react-bootstrap";
import "../styles/style.css";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

//import { CheckButton } from "react-validation/build/button";
import AuthService from "../services/AuthService";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ошибка в заполнении поля!
            </div>
        );
    }
};

class Autorization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            afterAuthorization: false,
            login: "",
            password: '',
            loading: false,
            message: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.handleSubmitSec = this.handleSubmitSec.bind(this);
    }

    handleSubmit = () => {
        console.log(this.state.login);
        console.log(this.state.password);

        this.state.login === "admin" || this.state.login === "evgenia23" ?
            (this.state.password === "admin" || this.state.password === "eva" ?
                (this.props.dispatch({type: 'SET_LOGGED_IN', loggedIn: true})) : console.log("Error 2"))
            : console.log("Error 1");

        this.state.login === "admin" || this.state.login === "evgenia23" ?
            (this.state.password === "admin" || this.state.password === "eva" ?
                (localStorage.setItem('loggedIn',true)) : console.log("Error 2"))
            : console.log("Error 1");
        //this.props.state.loggedIn(true);
    };

    handleLogin = e => {
        this.setState({login: e.target.value});
    }

    handlePassword = e =>{
        this.setState({password: e.target.value});
    }

    handleSubmitSec = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.login, this.state.password).then(
                () => {
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const textFields = {
            marginBottom: "30px", fontHeight: 1.5
        }
        const marginTop = {
            marginTop: "100pt"
        }

        return(
            this.props.loggedIn ?

                <div>
                    <div>
                        {console.log("Autorization with Redirect -> " + this.props.loggedIn)}
                    </div>
                    <Redirect to="/"/>
                </div>
                :
            <div>
                <div>
                    {console.log("Autorization without Redirect --> " + this.props.loggedIn)}
                </div>
                  <div as={Col} lg={12} style={marginTop}>
                            <div className="card shadow mx-auto widthForm" border style={{backgroundColor: "#f8f8ff"}}>
                              <div className="card-body text-center p-4">
                                  <h1 className="h3 mb-4 mt-3" style={{color: "#01579b"}}>Вход</h1>
                                  <Form className="simple-form" onSubmit={this.handleSubmit}
                                        ref={c => { this.form = c; }}>
                                      <div className={"form-group"}>
                                          <Form.Control type="text"
                                                      name="login"
                                                      value={this.state.login}
                                                      onChange={this.handleLogin}
                                                      placeholder="логин"
                                                      style={textFields}
                                                      validations={[required]}/>
                                          <Form.Control type="password"
                                                      name="password"
                                                      value={this.state.password}
                                                      onChange={this.handlePassword}
                                                      placeholder="пароль"
                                                      validations={[required]}/>
                                    </div>


                                      <Button className="mt-3"
                                          variant="primary"
                                          onClick={this.handleSubmit}
                                          disabled={this.state.loading}>
                                      {this.state.loading && (
                                          <span className="spinner-border spinner-border-sm"></span>
                                      )}
                                      Войти</Button>

                                      {this.state.message && (
                                          <Form.Group>
                                              <div className="alert alert-danger" role="alert">
                                                  {this.state.message}
                                              </div>
                                          </Form.Group>
                                      )}
                                      {/* <CheckButton
                                          style={{ display: "none" }}
                                          ref={c => { this.checkBtn = c; }} />*/}
                                  </Form>
                              </div>

                              <div className="card-footer py-2" style={{fontSize: "11pt"}}>
                                   <Row>
                                      <p className="col-xl-6 mt-2 pl-5 text-muted">Нет аккаунта?</p>
                                      <Link to={"register"} className="font-weight-bold nav-link" style={{color: "#01579b"}}>Создать новый</Link>
                                  </Row>
                              </div>
                            </div>
                  </div>
          </div>

        );
    }
}


export default connect()(Autorization)


