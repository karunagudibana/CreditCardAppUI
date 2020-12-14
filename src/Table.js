import React from 'react';

const TableHeader = () => { 
    return (
        <thead className="thead-light">
            <tr>
                <th>Name</th>
                <th>Credit card number</th>
                <th>Balance</th>
                <th>Limit</th>
            </tr>
        </thead>
    );
}

const TableBody = props => { 
    const rows = props.creditCards.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.givenName}</td>
                <td>{row.credNum}</td>
                <td> € {row.balance}</td>
                <td>{row.cardLimit}</td>                
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { creditCards } = props;
        return (
            <table className="table text-center">
                <TableHeader />
                <TableBody creditCards={creditCards}/>
            </table>
        );
}

export default Table;