import React, {Component} from "react";
import {Form, Row, Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../styles/style.css";
import {faEdit, faPlus, faQuestion, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TaskMenu extends Component{
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            show:false
        }

        this.taskChange = this.taskChange.bind(this);
    }

    handleModal = () => {
        this.setState({show:!this.state.show})
    }

    taskChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    deleteTask = () => {
        this.setState({show:!this.state.show})
    }

    render() {
        const customIcon = {
            border: "1.5px solid",
            marginRight: "1rem"
        }

        return(
            <div>
            <Form.Group className="mx-auto" style={{maxWidth: "1200px"}} as={Row}>
                <div className="mr-auto">
                <Link to="/add-new-task">
                    <Button size="sm" variant="outline-success" style={customIcon}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                </Link>

                <Link to="/edit-task">
                    <Button size="sm" variant="outline-warning" style={customIcon}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </Link>

                <Button size="sm" variant="outline-danger" style={customIcon} onClick={this.handleModal}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
                </div>

                <div className="mr-3 mt-1">
                    <Button type="info" size="sm" style={{border: "1.5px solid #264A9C", borderRadius: "50%", backgroundColor: "#3562C9"}}>
                        <FontAwesomeIcon icon={faQuestion} color="white"/>
                    </Button>
                </div>

                <Modal show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title>Внимание</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Удалить выделенную запись?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal}>
                            Отмена
                        </Button>
                        <Button variant="primary" onClick={this.deleteTask}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Form inline>
                <Form.Control className="mr-3 pb-2"
                              type="text"
                              name="search"
                              width="100px"
                              value={this.state.search}
                              onChange={this.taskChange}
                              placeholder="Поиск" />
                <Button type="search" variant="success">Найти</Button>
                </Form>
            </Form.Group>
            </div>
        )
    }
}

/*closeButton*/
