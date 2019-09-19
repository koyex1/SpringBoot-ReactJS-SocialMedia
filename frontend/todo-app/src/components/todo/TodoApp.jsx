import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import NavigationComponent from './NavigationComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
import AccountProfile from '../profilewall/AccountProfile.jsx'
import AuthenticationService from "../todo/AuthenticationService";
import AccountProfileService from "../../api/todo/AccountProfileService";

class TodoApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            renderValue: ''
        }
        this.handleClick.bind();
        this.handleChange.bind();
    }

    handleClick = (e) => {
        e.preventDefault();
        this.refreshInfo();
        this.redirect();
    }


    handleChange = e => {
        this.setState({ value: e.target.value }, function () {
            console.log(this.state.value);
        });
    };

    redirect() {
        window.location.href = "http://localhost:4200/profile/" + this.state.value;
    }

    refreshInfo() {
        console.log("refreshInfo");
        let username = this.state.value;
        AccountProfileService.retrieveInfo(username)
            .then(response => {
                console.error("response", response);
                this.setState({
                    renderValue: response.data[0]
                });
            })

    }


    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent refreshInfo={this.refreshInfo} handleClick={this.handleClick} handleChange={this.handleChange} />
                        {/* <NavigationComponent></NavigationComponent> */}
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <AuthenticatedRoute path="/welcome/" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/profile/:username" component={AccountProfile} />
                            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        {/* <FooterComponent/> */}
                    </>
                </Router>
                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

export default TodoApp