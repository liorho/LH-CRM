import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Client from './Client'

class Clients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            category: "Categories",
            currentPage: 1,
            clientsPerPage: 13
        }
    }

    //Pagination
    moveToPage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    createPageNumbers = () => {
        const clients = this.filterClients()
        const clientsPerPage = this.state.clientsPerPage
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(clients.length / clientsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers
    }

    insertInput = (event) => {
        let input = event.target.value
        this.setState({ input: input, currentPage: 1 })
    }

    selectCategory = (event) => {
        let category = event.target.value
        this.setState({ category })
    }

    filterClients = () => {
        let category = this.state.category
        let clients = this.props.clients
        let input = this.state.input.toLowerCase()
        switch (category) {
            case "Name": return clients.filter(c => c.name.toLowerCase().includes(input))
            case "Country": return clients.filter(c => c.country.toLowerCase().includes(input))
            case "Owner": return clients.filter(c => c.owner.toLowerCase().includes(input))
            case "Email": return input === "" ? clients.filter(c => c.emailType === null) : clients.filter(c => c.emailType ? c.emailType.toLowerCase().includes(input) : null)
            case "Sold": return clients.filter(c => c.sold ? ("yes").includes(input) : ("no").includes(input))
            default: return clients
        }
    }

    currentClients = () => {
        const { currentPage, clientsPerPage } = this.state
        const indexOfLastClient = currentPage * clientsPerPage
        const indexOfFirstClient = indexOfLastClient - clientsPerPage

        const currentClients = this.filterClients().slice(indexOfFirstClient, indexOfLastClient)

        return currentClients
    }


    render() {
        let pageNumbers = this.createPageNumbers()

        return (
            <div className="clients-component">
                
                <div className="search-clients">
                    <input type="text" value={this.state.input} onChange={this.insertInput} />
                    <select className="select-css" onChange={this.selectCategory}>
                        <option value="Categories" style={{ fontWeight: 'bold' }}>Categories</option>
                        <option value="Name">Name</option>
                        <option value="Country">Country</option>
                        <option value="Owner">Owner</option>
                        <option value="Sold">Sold</option>
                        <option value="Email">Email-Type</option>
                    </select>
                </div>

                <table>
                    <tr className="table-header">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Country</th>
                        <th>Email</th>
                        <th>Owner</th>
                        <th>Sold</th>
                        <th>First-Contact</th>
                        <th>Email-Type</th>
                    </tr>
                    {this.currentClients().map(c => <Client client={c} />)}
                </table>

                <div class="page-numbers">
                    {pageNumbers.map(number => <div className="page-number" id={number} onClick={this.moveToPage} > {number}</div>)}
                </div>
            </div>
        )
    }
}

export default Clients