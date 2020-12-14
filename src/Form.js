import React, { Component } from 'react';

class Form extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            givenName: '',
            credNum: '',
            cardLimit: '',
            balance: '',
            errorMessage: '',
            errors: {
                givenName: '',
                credNum: '',
                cardLimit: '',
                balance: ''
            }
        };

        this.state = this.initialState;

    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["givenName"]) {
            formIsValid = false;
            errors["givenName"] = "Cannot be empty";
        }

        if (!fields["credNum"]) {
            formIsValid = false;
            errors["credNum"] = "Cannot be empty";
        }

        if (fields["credNum"]) {
            if (!fields["credNum"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["credNum"] = "Only Numbers";
            }
        }

        if (fields["credNum"]) {
            if (!fields["credNum"].length >= 13 && !fields["credNum"].length <= 19) {
                formIsValid = false;
                errors["credNum"] = "Card Number should be between 13 and 19";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onChange = event => {
        const { name, value } = event.target;
        const re = /^[0-9\b]+$/;
        if (!value) {
            this.setState({
                [name]: value
            });
        }
        if (value && re.test(value)) {
            this.setState({
                [name]: value
            });
        }
    }

    onFormSubmit = (event) => {
        this.setState({ errorMessage: ""})
        event.preventDefault();
        if (this.handleValidation()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            };
            fetch('http://localhost:8082/cred/save', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw response;
                })
                .then(data => {
                    console.log(data);
                    this.props.handleSubmit(data);
                    this.setState(this.initialState);
                }).catch(error => {
                    error.json().then(errorMessage => {
                        this.setState({ errorMessage: errorMessage.message })
                    })
                });
        }

    }

    render() {
        const { givenName, credNum, cardLimit, balance ,errorMessage} = this.state;
        const { errors } = this.state;
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="row">
                    <div className="col-sm-4 col-xs-12">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            name="givenName"
                            id="givenName"
                            value={givenName}
                            onChange={this.handleChange} />

                        {errors.givenName && errors.givenName.length > 0 &&
                            <span className='text-danger'>{errors.givenName}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-xs-12">
                        <label for="credNum">Card number</label>
                        <input id="credNum" value={credNum} name="credNum" type="text" onChange={this.onChange} pattern="[0-9]*" />
                        {errors.credNum && errors.credNum.length > 0 &&
                            <span className='text-danger'>{errors.credNum}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-xs-12">
                        <label for="limit">Balance</label>
                        <input
                            type="number"
                            name="balance"
                            id="balance"
                            value={balance}
                            onChange={this.handleChange} />
                        {errors.balance && errors.balance.length > 0 &&
                            <span className='text-danger'>{errors.balance}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-xs-12">
                        <label for="limit">Limit</label>
                        <input
                            type="number"
                            name="cardLimit"
                            id="cardLimit"
                            value={cardLimit}
                            onChange={this.handleChange} />
                        {errors.cardLimit && errors.cardLimit.length > 0 &&
                            <span className='text-danger'>{errors.cardLimit}</span>}
                    </div>
                </div>
                <div className="row error-message-div">
                    <div className="col-sm-4 col-xs-12">                        
                        {errorMessage && errorMessage.length > 0 &&
                            <span className='text-danger'>{errorMessage}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 submit-button-div text-center col-xs-12">
                        <button type="submit">
                            Submit
                </button>
                    </div>
                </div>

            </form>
        );
    }
}

export default Form;
