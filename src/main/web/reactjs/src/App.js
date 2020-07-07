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
import LogOut from "./components/LogOut";
import MainBaseEdit from "./components/MainBaseEdit";

function App() {
    return (
        <Router>
            <div className="body" style={{height: "100vh", display: "flex", flexDirection: "column"}}>

                <Header/>

                <div className="content" style={{flex: "1 0 auto", marginBottom: "50px"}}>
                    <Switch>
                        <Route path="/home" exact component={StartPage}/>
                        <Route path="/base" exact component={MainBaseList}/>
                        <Route path="/signIn" exact component={Autorization}/>
                        <Route path="/add-new-task" exact component={MainBaseAdd}/>
                        <Route path="/edit-task" exact component={MainBaseEdit}/>
                        <Route path="/register" exact component={LogOut}/>
                    </Switch>
                </div>

                <Footer/>

            </div>
        </Router>
  );
}

export default App;
