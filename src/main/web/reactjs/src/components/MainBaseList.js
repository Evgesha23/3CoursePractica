import React, {Component} from "react";
import "../styles/style.css";
import {Link} from "react-router-dom";
import {Card, Button, Row, Col, Form, ButtonGroup, InputGroup} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";
import FormControl from "react-bootstrap/FormControl";

export default class MainBaseList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            baseList: [],
            counter: 0,
            search: '',
            show:false,
            currentPage: 1,
            tasksPerPage: 9
        }

        this.headers = [
            { key: 'id', label: '#'},
            { key: 'taskName', label: 'Название'},
            { key: 'taskLink', label: 'Ссылка' },
            { key: 'place', label: 'Среда' },
            { key: 'createDate', label: 'Создан' },
            { key: 'user', label: 'Пользователь' },
            { key: 'hours', label: 'Кол-во часов' },
            { key: 'amountErrors', label: 'Кол-во ошибок' },
            { key: 'mark', label: 'Сложность' },
            { key: 'action', label: 'Действие'}
        ];

        this.taskChange = this.taskChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this); // delete one task
    }

    handleModal = () => {
        this.setState({show:!this.state.show})
    }

    taskChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

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
        if(window.confirm('Вы уверены, что хотите удалить запись?')) {
            axios.delete('http://localhost:8080/deleteTask/' + taskId)
                .then(response => {
                    if (response.data != null) {
                        this.setState({"show": true});
                        setTimeout(() => this.setState({"show": false}), 3000);
                        this.setState({
                            baseList: this.state.baseList.filter(task => task.id !== taskId)
                        });
                    } else {
                        this.setState({"show": false});
                    }
                });
        }
    };

    assembleTasks = () => {
        let tasks =this.state.baseList.map((task) => {
            return (

                {
                    amount: ++this.state.counter,
                    id: task.id,
                    taskName: task.taskName,
                    taskLink: task.taskLink,
                    place: task.place,
                    pinedFile: task.pinedFile,
                    hours: task.hours,
                    amountErrors: task.amountErrors,
                    mark: task.mark,
                    // date: teacher.date.replace(/(\d+).(\d+).(\d+).*/,'$3-$2-$1'),
                    // date: (new Date(Date.parse((teacher.date)))).toDateString('i'),
                    action: <ButtonGroup>
                        <Link to={"edit-task/"+task.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteTask.bind(this, task.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )

        });

        return tasks;

    };

    changePage = event => {
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    };
    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    };
    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.baseList.length / this.state.tasksPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };
    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.baseList.length / this.state.tasksPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.baseList.length / this.state.tasksPerPage)
            })
        }
    };

    render() {

        const {baseList, currentPage, tasksPerPage} = this.state;
        const lastIndex = currentPage * tasksPerPage;
        const firstIndex = lastIndex - tasksPerPage;
        const currentTasks = baseList.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(baseList.length / tasksPerPage); // округление в большую сторону

        const marginTop = {
            marginTop: "80px",
            maxWidth: "1400px",
            tableLayout: "fixed"
        }

        const customIcon = {
            border: "1.5px solid"
        }

        const pageNumCss = {
            maxWidth: "45px",
            border: "1px solid #17a2bb",
            color: "#17a2bb",
            textAlign: "center",
            backgroundColor: "#e9edf5"
        }

        return(
            <div style={marginTop} className="mx-auto">
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Запись удалена успешно."} type = {"danger"}/>
                </div>
                <div>
                    <Form.Group className="mx-auto" style={{maxWidth: "1200px"}} as={Row}>
                        <div className="mr-auto">
                            <Link to="/add-new-task">
                                <Button size="sm" variant="outline-success" style={customIcon}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                            </Link>
                        </div>

                        {/* <div className="mr-3 mt-1">
                            <Button type="info" size="sm" style={{border: "1.5px solid #264A9C", borderRadius: "50%", backgroundColor: "#3562C9"}}>
                                <FontAwesomeIcon icon={faQuestion} color="white"/>
                            </Button>
                        </div>*/}

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
                    <Card style={{height: "548px"}}>
                    <table id="baseTest" className="table table-bordered table-hover mx-auto mb-0">
                        <thead className="text-center" style={{backgroundColor: "#2C4295", color: "whitesmoke"}}>
                        <tr>
                            {
                                this.headers.map(function(h) {
                                    return (
                                        <th key={h.key}>{h.label}</th>
                                    )
                                })
                            }
                        </tr>
                        </thead>
                        <tbody className="text-center" style={{color: "#4db2ff", font: "12pt roboto"}}>
                        {

                            this.state.baseList.length === 0 ?
                                <tr>
                                    <td colSpan="12">Заявки не найдены</td>
                                </tr> :
                                currentTasks.map(function(item, index) {
                                    return (
                                        <tr key={index}>
                                            <td>{++this.state.counter}</td>
                                            <td><div>{item.taskName}</div></td>
                                            <td><div>{item.taskLink}</div></td>
                                            <td>{item.place}</td>
                                            <td>{new Date().getDay()}</td>
                                            <td></td>
                                            <td>{item.hours}</td>
                                            <td>{item.amountErrors}</td>
                                            <td>{item.mark}</td>
                                            <td><ButtonGroup style={{maxWidth: "80px", height: "30px"}}>
                                                <Link to={"edit-task/"+item.id} className="btn btn-sm btn-outline-warning"><FontAwesomeIcon icon={faEdit} /></Link>
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteTask.bind(this, item.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                            </td>
                                        </tr>
                                    )}.bind(this))
                        }
                        </tbody>

                    </table>
                    </Card>
                </div>
                <div id="hint"></div>

                <div className="col-xl-12">
                    <Row>
                        <Col style={{"float": "left"}}>
                            Страница {currentPage} из {totalPages}
                        </Col>
                        <Col style={{"float":"center"}}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button type="button" variant={"outline-info"}
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>{"<<"}</Button>
                                    <Button type="button" variant={"outline-info"}
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>{"<"}</Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} name={"currentPage"} value={currentPage} onChange={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type="button" variant={"outline-info"}
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>{">"}</Button>
                                    <Button type="button" variant={"outline-info"}
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>{">>"}</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        {/*   <Col className="ml-5 pl-5">
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
                        </Col>*/}
                    <div>
                        <Button style={{marginRight: "50px"}}>Создать отчет</Button>
                    </div>
                </Row>
                </div>
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

