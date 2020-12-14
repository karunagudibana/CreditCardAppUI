import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {
    state = {
        creditCards: []
    };


    handleSubmit = creditCards => {
        this.setState({creditCards: [...this.state.creditCards, creditCards]});
    }

    componentDidMount() {
        fetch("http://localhost:8082/cred/getall")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                creditCards :result
              })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        const { creditCards } = this.state;
        
        return (
            <div className="container">
                <h1>Credit Card System</h1>                
                <Form handleSubmit={this.handleSubmit} />
                <Table
                    creditCards={creditCards}                    
                />               
            </div>
        );
    }
}

export default App;