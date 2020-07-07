import React, {Component} from "react";
import {Card, Form, Col, Button} from"react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faPlusCircle, faSave, faUndo} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import axios from 'axios'
import MyToast from "./MyToast";

export default class MainBaseAdd extends Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.taskChange = this.taskChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    initialState = {
        id: '',
        taskName: '',
        taskLink:'',
        place:'',
        pinedFile:'',
        hours: '',
        amountErrors:'',
        mark:''
    }

    componentDidMount() {
        const taskId = +this.props.match.params.id;
        if(taskId){
            //this.findTaskById(taskId);
            alert(taskId);
        }
    }

    submitTask = event => {
        event.preventDefault();

        const task = {
            id: this.state.id,
            taskName: this.state.taskName,
            taskLink: this.state.taskLink,
            place: this.state.place,
            hours: this.state.hours,
            amountErrors: this.state.amountErrors,
            mark: this.state.mark,
            pinedFile: this.state.pinedFile
        };

        axios.post("http://localhost:8080/createTask", task)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    }

    resetTask = () => {
        this.setState(() => this.initialState);
    }

    taskChange = event => {
        this.setState({
           [event.target.name]:event.target.value
        });
    }

    render() {
        const marginTop = {
            marginTop: "70pt",
            maxWidth: "700px"
        }
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast children={{show:this.state.show, message:"Запись сохранена"}}/>
                </div>
            <div style={marginTop} className="overflow-hidden mx-auto">
                <Card border className="shadow" text="black" style={{backgroundColor: "#f8f8ff",fontSize: "11pt"}}>
                    <Card.Header style={{textAlign: "center", fontSize: "13pt", backgroundColor: "#a8e4a0"}}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg" className="mr-2" style={{color: "whitesmoke"}}/>
                        <b style={{color: "white"}}>Новая запись</b>
                    </Card.Header>
                    <Form onSubmit={this.submitTask} onReset={this.resetTask} id="taskId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Название заявки</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="taskName"
                                              value={this.state.taskName}
                                              onChange={this.taskChange}
                                              placeholder="Введите название"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridLink">
                                <Form.Label>Ссылка</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="link" name="taskLink"
                                              value={this.state.taskLink}
                                              onChange={this.taskChange}
                                              placeholder="Ссылка на заявку" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridWhere">
                                <Form.Label>Место тестирования</Form.Label>
                                <Form.Control required
                                              as="select" name="place"
                                              value={this.state.place}
                                              onChange={this.taskChange}>
                                    <option>ADTS</option>
                                    <option>Сайт</option>
                                    <option>web-сервис</option>
                                    <option>WMTS/ТСД</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridHoursTest">
                                <Form.Label>Часы тестирования</Form.Label>
                                <Form.Control autoComplete="off"
                                              type="text" name="hours"
                                              value={this.state.hours} onChange={this.taskChange}
                                              placeholder="Кол-во часов"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAmountErrors">
                                <Form.Label>Ошибки</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="amountErrors"
                                              value={this.state.amountErrors}
                                              onChange={this.taskChange}
                                              placeholder="Кол-во ошибок"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMark">
                                <Form.Label>Сложность</Form.Label>
                                <Form.Control type="text" name="mark"
                                              value={this.state.mark}
                                              onChange={this.taskChange}
                                              placeholder="Оценка"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                                <Form.File label="Дополнительно"
                                           controlId="pinedFile"
                                           name="pinedFile"
                                           value={this.state.pinedFile}
                                           onChange={this.taskChange}/>
                        </Form.Group>

                        <Form.Group className="text-right mt-5">
                            <Link to="/base" style={{paddingRight: "310px"}}>
                                <Button variant="outline-primary">
                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                                        Отмена</Button>
                            </Link>
                                <Button variant="outline-secondary" type="reset" className="mr-3">
                                    <FontAwesomeIcon icon={faUndo} className="mr-2"/>
                                    Очистить</Button>
                            <Link to="/base">
                                <Button variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} className="mr-2"/>
                                    Создать</Button>
                            </Link>


                        </Form.Group>
                    </Card.Body>
                    </Form>
                </Card>
            </div>
            </div>
        )
    }
}
