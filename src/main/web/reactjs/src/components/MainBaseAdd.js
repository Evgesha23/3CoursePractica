import React, {Component} from "react";
import {Card, Form, Row, Col, Button} from"react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faEdit, faPlusCircle, faSave, faUndo} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from "./MyToast";

export default class MainBaseAdd extends Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;
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
            this.findTaskById(taskId);
            alert(taskId);
        }
    }

    componentDidUpdate() {
        //this.setState({"show":false});
        console.log("actions >>>")
    }

    findTaskById = (taskId) => {
        axios.get('http://localhost:8080/tasks/'+taskId)
            .then(response => {
                console.log("Response: " + response.data + "!");
                if(response.data != null){
                    console.log(response.data);
                    this.setState ({
                        id: response.data.id,
                        taskName: response.data.taskName,
                        taskLink: response.data.taskLink,
                        place: response.data.place,
                        pinedFile: response.data.pinedFile,
                        hours: response.data.hours,
                        amountErrors: response.data.amountErrors,
                        mark: response.data.mark
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

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
    };

    updateTask = event => {
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

        axios.put("http://localhost:8080/putTask", task)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.baseList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

    baseList = () => {
        return this.props.history.push("/base");
    };

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
                    <MyToast show = {this.state.show} message={this.state.method === "put" ? "Запись изменена успешно" : "Запись сохранена успешно"} type = {"success"}/>
                </div>
            <div style={marginTop} className="overflow-hidden mx-auto">
                <Card border className="shadow" text="black" style={{backgroundColor: "#f8f8ff",fontSize: "11pt"}}>
                    <Card.Header style={{textAlign: "center", fontSize: "12pt", color: "#01579b"}}>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusCircle} size="lg" className="mr-2"/>
                        <b style={{color: "#01579b"}}>{this.state.id ? "Редактирование" : "Новая запись"}</b>
                    </Card.Header>
                    <Form onSubmit={this.state.id ? this.updateTask : this.submitTask} onReset={this.resetTask} id="taskId" method="post">
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

                        {/*} <Form.Group controlId="formGridFile">
                                <Form.File label="Дополнительно"
                                           controlId="pinedFile"
                                           name="pinedFile"
                                           value={this.state.pinedFile}
                                           onChange={this.taskChange}/>
                        </Form.Group>*/}

                        <Form.Group className="text-right mt-5" as={Row}>
                            <Button variant="info" type="button" onClick={this.baseList.bind()}  style={{marginRight: "300px", marginLeft: "10px"}}>
                                <FontAwesomeIcon icon={faArrowLeft}/> Отмена
                            </Button>
                            <Button variant="info" type="reset" className="mr-2">
                                <FontAwesomeIcon icon={faUndo} className="mr-2"/> Очистить
                            </Button>
                            <Button variant="success" type="submit" onClick={this.baseList.bind()}  className="mr-2">
                                <FontAwesomeIcon icon={faSave} className="mr-2"/> {this.state.id ? "Обновить" : "Сохранить"}
                            </Button>

                        </Form.Group>
                    </Card.Body>
                    </Form>
                </Card>
            </div>
            </div>
        )
    }
}
