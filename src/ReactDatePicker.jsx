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
        this.onClickOutsideHandler = this.onClickOutside.bind(this);
    }

    render() {
        if (this.props.date.status === "unavailable" || this.props.date.status === "loading") {
            return null;
        }

        const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
            <button className="fal fa-chevron-down ps_close-button" onClick={onClick} ref={ref}>
                {value}
            </button>
        ));

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
                      customInput: React.createElement(ExampleCustomInput),
                      onClickOutside: this.onClickOutsideHandler(),
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

    onClickOutside() {
        //this.setState({ isOpen: !this.state.isOpen });
    }
}
