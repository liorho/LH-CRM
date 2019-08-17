import React, { Component } from 'react'
import Client from './Client'
import DetailsPopUp from './DetailsPopUp'
import SuccessPopUp from '../General/SuccessPopUp';
import ErrorPopUp from '../General/ErrorPopUp'

class Clients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            category: "Categories",
            currentPage: 1,
            clientsPerPage: 13,
            detailsPopUp: {},
            errorPopUp: false,
            successPopUp: false
        }
    }

    //--------Error/Sucess POP-UP -------
    handlePopUp = (type, val) => {
        this.setState({ [type]: val });
        setTimeout(() => { this.setState({ [type]: !val }) }, 3000)
    }

    //------- Pagination ---------
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

    currentClients = () => {
        const { currentPage, clientsPerPage } = this.state
        const indexOfLastClient = currentPage * clientsPerPage
        const indexOfFirstClient = indexOfLastClient - clientsPerPage

        const currentClients = this.filterClients().slice(indexOfFirstClient, indexOfLastClient)

        return currentClients
    }

    //------- Buttons ------------
    insertInput = (event) => {
        let input = event.target.value
        this.setState({ input: input, currentPage: 1 })
    }

    //------ Functions --------
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

    // ----------- Update/Delete Client Pop-Up -------
    detailsPopUp = async (data) => {
        await this.setState({
            detailsPopUp: { clientDetails: data, popUpStatus: true }
        })
    }

    updateClientPopUp = async (data) => {
        if (data.country !== "" && data.name !== "" && data.email !== "") {
            await this.props.updateClientPopUp(data)
            let detailsPopUp = this.state.detailsPopUp
            detailsPopUp.popUpStatus = false
            this.setState(detailsPopUp)
            this.handlePopUp("successPopUp", true)
        } else {
            this.handlePopUp("errorPopUp", true)
        }
    }

    deleteClient = async (id) => {
        await this.props.deleteClient(id)
        let detailsPopUp = this.state.detailsPopUp
        detailsPopUp.popUpStatus = false
        await this.setState(detailsPopUp)
    }

    cancelUpdate = async () => {
        let detailsPopUp = this.state.detailsPopUp
        detailsPopUp.popUpStatus = false
        await this.setState(detailsPopUp)
    }

    // --------- Render --------
    render() {
        let pageNumbers = this.createPageNumbers()
        let { detailsPopUp, errorPopUp, successPopUp} = this.state


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
                    {this.currentClients().map(c => <Client client={c} detailsPopUp={this.detailsPopUp} />)}
                </table>


                <div class="page-numbers">
                    {pageNumbers.map(number => <div className="page-number" id={number} onClick={this.moveToPage} > {number}</div>)}
                </div>

                {/* POP-UP HANDLING */}
                {detailsPopUp.popUpStatus ? <DetailsPopUp detailsPopUp={detailsPopUp.clientDetails} updateClientPopUp={this.updateClientPopUp} deleteClient={this.deleteClient} cancelUpdate={this.cancelUpdate} /> : null}

                {errorPopUp ? < ErrorPopUp /> : null}

                {successPopUp ? <SuccessPopUp /> : null}
            </div>
        )
    }
}

export default Clients