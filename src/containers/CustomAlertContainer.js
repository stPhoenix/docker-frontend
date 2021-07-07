
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert} from "react-bootstrap";
import {del} from "../slices/alerts";

class CustomAlertContainer extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    };

    onClose(e) {
        this.props.del();
    };

    render() {
        if (this.props.alert){
               const {variant, text} = this.props.alert;
      return (
        <Alert key={this.props.key} variant={variant} onClose={this.onClose} dismissible>
            {text}
        </Alert>
      )
        }
        return null
    };
}

const matchStateToProps = (state) => ({alert : state.alerts.alerts[0]})
const mapDispatchToProps = {
    del,
}

export default connect(matchStateToProps, mapDispatchToProps)(CustomAlertContainer);