import React, { Component, createElement, forwardRef } from "react";
import "./ui/ReactDatePicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class ReactDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.onChangeHandler = this.onChange.bind(this);
        this.onClickHandler = this.onClick.bind(this);
    }

    render() {
        if (this.props.date.status === "unavailable" || this.props.date.status === "loading") {
            return null;
        }

        return React.createElement(
            "div",
            { style: { position: "relative" } },
            React.createElement(
                "button",
                { id: "calendarButton", onClick: this.onClickHandler, class: "fal fa-chevron-down ps_close-button" },
                ""
            ),
            this.state.isOpen
                ? React.createElement(DatePicker, {
                      selected: this.props.date.value,
                      onChange: date => this.onChangeHandler(date),
                      onSelect: date => this.onChangeHandler(date),
                      inline: true
                  })
                : ""
        );
    }

    onChange(value) {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.date.setValue(value);
    }

    onClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }
}
