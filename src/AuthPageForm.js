import React from "react";
import LoginForm from "./LoginForm";


class AuthPageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <LoginForm onChange={this.handleLoginChange} value={this.state.login} />
            </div>
        );
    }
}

export default AuthPageForm;