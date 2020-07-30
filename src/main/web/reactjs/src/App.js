import React from 'react';
import './App.css';
import "../src/styles/style.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StartPage from "./components/StartPage";
import Autorization from "./components/Autorization";
import MainBaseAdd from "./components/MainBaseAdd";
import MainBaseList from "./components/MainBaseList";
import SignUp from "./components/SignUp";

import {connect, Provider} from "react-redux";
import bindActionCreators from "redux/src/bindActionCreators";
import store from "./services/store/store";

function App(props) {
    return (
        <Provider store={store} >
            <div>
                {console.log("Answer -> " + props.loggedIn)}
            </div>
            <Router>
                <div className="body" style={{height: "100vh", display: "flex", flexDirection: "column"}}>

                    <Header loggedIn={props.loggedIn}/>

                    <div className="content" style={{flex: "1 0 auto", marginBottom: "50px"}}>
                        <Switch>
                            <Route path="/" exact component={StartPage}/>
                            <Route path="/base" exact component={MainBaseList}/>
                            <Route path="/add-new-task" exact component={MainBaseAdd}/>
                            <Route path="/edit-task/:id" exact component={MainBaseAdd}/>
                            <Route path="/signIn" exact component={() => <Autorization loggedIn={props.loggedIn}/>}/>
                            <Route path="/register" exact component={() => <SignUp loggedIn={props.loggedIn}/>}/>
                        </Switch>
                    </div>

                    <Footer/>

                </div>
            </Router>
        </Provider>
  );
}

const putDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const putStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
    }
};
export default connect(putStateToProps, putDispatchToProps)(App);
