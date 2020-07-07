import React, {Component} from "react";
import "../styles/style.css";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import {Card, Button, Row, Col, Form, Modal} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faQuestion, faTrash} from "@fortawesome/free-solid-svg-icons";

export default class MainBaseList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            baseList: [],
            counter: 0,
            search: '',
            show:false,
            checkedBoxes: []
        }

        this.toggleRow = this.toggleRow.bind(this);
        this.taskChange = this.taskChange.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    handleModal = () => {
        this.setState({show:!this.state.show})
    }

    taskChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

   /* deleteTask = () => {
        if(window.confirm("Вы уверены, что хотите удалить выбранные записи?")) {
            fetch('http://localhost:8080/deleteTask', {
                method: 'POST',
                body: JSON.stringify({'ids' : this.state.checkedBoxes}),
                headers: {'Content-Type' : 'application/json; charset=UTF-8'}
            }).then(response => {
                if(response.status === 200) {
                    document.getElementById('msg').innerHTML = '<span style="color:green;">Удалено</span>';
                }
            })
        }
    }*/

    componentDidMount = () => {
       /* axios.get("http://localhost:8080/tasks")
            .then(response => console.log(response.data));*/
       this.findAllTasks();
    }

    findAllTasks = () => {
        axios.get("http://localhost:8080/tasks")
            .then(response => response.data)
            .then((data) => {
                this.setState({baseList: data});
            });
    }

    deleteTask = (taskId) => {
        axios.delete('http://localhost:8080/deleteTask/'+taskId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    //alert("Teacher deleted successfully.");
                    this.setState({
                        //teachers: this.state.teachers.filter(teacher => teacher.id !== teacherId)
                        baseList: this.state.baseList.filter(task => task.id !== taskId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    handlePageClick = (data) => {
        this.setState({numberPage: data.selected});
        //this.getAllUsers(data.selected, this.state.filter);
    };

    toggleRow = (firstName) => {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[firstName] = !this.state.selected[firstName];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleCheckBox = (e, item) => {
        if(e.target.checked) {
            let arr = this.state.checkedBoxes;
            arr.push(item.id);

            this.setState = { checkedBoxes: arr};
        } else {
            let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item.id), 1);

            this.setState = {
                checkedBoxes: items
            }

        }
    }

    render() {
        const marginTop = {
            marginTop: "80px",
            maxWidth: "1400px",
            tableLayout: "fixed"
        }

        const customIcon = {
            border: "1.5px solid",
            marginRight: "1rem"
        }

        return(
            <div style={marginTop} className="mx-auto">
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

                            <Button size="sm" variant="outline-danger" style={customIcon} onClick={this.deleteTask}>
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
                                <Button variant="primary" onClick={this.handleModal}>
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
                <div className="my-3">
                    <Card style={{height: "490px"}}>
                    <table id="baseTest" className="table table-bordered table-hover mx-auto mb-0">
                        <thead className="text-center" style={{backgroundColor: "#2C4295", color: "whitesmoke"}}>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Название</th>
                            <th>Ссылка</th>
                            <th>Среда</th>
                            <th>Дата создания</th>
                            <th>Пользователь</th>
                            <th>Дата ред.</th>
                            <th>Редактор</th>
                            <th>Кол-во часов</th>
                            <th>Кол-во ошибок</th>
                            <th>Сложность</th>
                        </tr>
                        </thead>
                        <tbody className="text-center" style={{color: "#4db2ff", font: "12pt roboto"}}>
                        {

                            this.state.baseList.length === 0 ?
                                <tr>
                                    <td colSpan="12">Заявки не найдены</td>
                                </tr> :
                                this.state.baseList.map((task) => (
                                    <tr id="numberTask" key={task.id}>
                                        <td><input type="checkbox" className="checkbox"/></td>
                                        <td>{task.id}</td>
                                        <td><div>{task.taskName}</div></td>
                                        <td><div>{task.taskLink}</div></td>
                                        <td>{task.place}</td>
                                        <td>{new Date().getDay()}</td>
                                        <td></td>
                                        <td>{new Date().getDate()}</td>
                                        <td></td>
                                        <td>{task.hours}</td>
                                        <td>{task.amountErrors}</td>
                                        <td>{task.mark}</td>
                                    </tr>
                                ))
                        }
                        </tbody>

                    </table>
                    </Card>
                </div>
                <div id="hint"></div>

                <div className="col-xl-12">
                    <Row>
                        <Col className="ml-5 pl-5">
                    <ReactPaginate
                        previousLabel={"<-"}
                        nextLabel={"->"}
                        breakLabel={"..."}

                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}

                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                    />
                        </Col>
                    <div>
                        <Button style={{marginRight: "50px"}}>Создать отчет</Button>
                    </div>
                </Row></div>
            </div>
        )
    }
}

/*window.onload = function () {
    var tbl = document.getElementById('baseTest');
    var hint = document.getElementById('hint');

    tbl.onmouseover = (event) => {
        var el = event.target || event.srcElement;
        if (el.tagName.toUpperCase() !== 'DIV') {return;}

        var box = el.getBoundingClientRect();
        hint.style.left = box.left - 1 + 'px';
        hint.style.top = box.top - 1 + 'px';
        hint.innerHTML = el.innerHTML;
        hint.style.display = 'block';
        if (hint.offsetWidth < el.offsetWidth) {hint.style.display = 'none';}
    }

    hint.onmouseout = (event) => {
        hint.style.display ='none';
    }
    tbl.onmouseout = (event) => {
        hint.style.display ='none';
    }
};*/

