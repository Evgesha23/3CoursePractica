import React, {Component} from "react";
import {Card, Form, Col, Button} from"react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faEdit, faSave, faUndo} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

export default class MainBaseEdit extends Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.taskChange = this.taskChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    initialState = {
        taskname: '', tasklink:'', place:'', pinedfile:'', hours: '', amounterrors:'', mark:''
    }

    submitTask = event => {
        alert(this.state.taskname);
        event.preventDefault();
    }

    taskChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    resetTask = () => {
        this.setState(() => this.initialState);
    }

    render() {
        const marginTop = {
            marginTop: "70pt",
            maxWidth: "700px"
        }
        return(
            <div style={marginTop} className="overflow-hidden mx-auto">
                <Card border className="shadow" text="black" style={{backgroundColor: "#f8f8ff",fontSize: "11pt"}}>
                    <Card.Header style={{textAlign: "center", fontSize: "13pt", backgroundColor: "#ffd857"}}>
                        <FontAwesomeIcon icon={faEdit} size="lg" className="mr-2" style={{color: "whitesmoke"}}/>
                        <b style={{color: "white"}}>Редактирование</b>
                    </Card.Header>
                    <Form onSubmit={this.submitTask} id="tasksId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Название заявки</Form.Label>
                                    <Form.Control required
                                                  type="text"
                                                  name="taskname"
                                                  value={this.state.taskname}
                                                  onChange={this.taskChange}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridLink">
                                    <Form.Label>Ссылка</Form.Label>
                                    <Form.Control required
                                                  type="link"
                                                  name="tasklink"
                                                  value={this.state.tasklink}
                                                  onChange={this.taskChange}/>
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
                                    <Form.Control type="text"
                                                  name="hours"
                                                  value={this.state.hours}
                                                  onChange={this.taskChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAmountErrors">
                                    <Form.Label>Ошибки</Form.Label>
                                    <Form.Control required
                                                  type="text"
                                                  name="amounterrors"
                                                  value={this.state.amounterrors}
                                                  onChange={this.taskChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridMark">
                                    <Form.Label>Сложность</Form.Label>
                                    <Form.Control type="text"
                                                  name="mark"
                                                  value={this.state.mark}
                                                  onChange={this.taskChange}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Form.File label="Дополнительно"
                                           controlId="pinedFile"
                                           name="pinedfile"
                                           value={this.state.pinedfile}
                                           onChange={this.taskChange}/>
                            </Form.Group>

                            <Form.Group className="text-right mt-5">
                                <Link to="/base" style={{paddingRight: "290px"}}>
                                    <Button variant="outline-primary">
                                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                                        Отмена</Button>
                                </Link>
                                <Link>
                                    <Button variant="outline-secondary" type="reset" className="mr-3" onClick={this.resetTask}>
                                        <FontAwesomeIcon icon={faUndo} className="mr-2"/>
                                        Очистить</Button>
                                </Link>
                                <Link>
                                    <Button variant="success" type="submit">
                                        <FontAwesomeIcon icon={faSave} className="mr-2"/>
                                        Сохранить</Button>
                                </Link>


                            </Form.Group>
                        </Card.Body>
                    </Form>
                </Card>
            </div>
        )
    }
}
