import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UpdateData from './UpdateData'
import ClientInput from './ClientInput'
import NewClient from './NewClient'
import Axios from 'axios';
import Popup from "reactjs-popup";



class Actions extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            errorPopUp: false,
            successPopUp: false
        }
    }

    // Create Array of Clients names
    clientsNames = () => {
        let clients = this.props.clients
        let clientsNames = []
        clients.forEach(c => clientsNames.push(c.name))
        return clientsNames
    }

    // setting chosen Client id by his name
    findClientId = async (name) => {
        let clients = this.props.clients
        let chosenClient = clients.find(c => c.name === name)
        let id = chosenClient ? chosenClient.id : null
        await this.setState({ id })
    }

    handlePopUp = (type, val) => {
        this.setState({ [type]: val });
            setTimeout(() => { this.setState({ [type]: !val }) }, 3000)
    }

    // Updating client details
    updateClient = async (value) => {
        let id = this.state.id
        let data = { id: id, key: value.key, value: value.value }
        if (id && value.value) {
            this.props.updateClient(data)
            this.handlePopUp("successPopUp", true)
        } else {
            this.handlePopUp("errorPopUp", true)
        }
    }

    // Add new Client
    addClient = (client) => {
        let keys = Object.keys(client)
        console.log(keys)
        let checkInput = 0
        for (let key of keys) {
            checkInput = client[key] || key === "sold" || key === "emailType" ? checkInput : checkInput + 1
            console.log(client[key])
        }
        if (checkInput === 0) {
            this.props.addClient(client)
            this.handlePopUp("successPopUp", true)
        } else {
            this.handlePopUp("errorPopUp", true)
        }
    }

    render() {
        const { clients } = this.props
        const { errorPopUp, successPopUp, id } = this.state
        return (
            <div className="actions-container">
                <div className="update-container">
                    <div className="update-title">UPDATE</div>
                    <table>
                        <ClientInput clientsNames={this.clientsNames()} findClientId={this.findClientId} />
                        <UpdateData clients={clients} updateClient={this.updateClient} id={id}/>
                    </table>
                </div>

                <div className="add-client-container">
                    <div className="update-title">ADD CLIENT</div>
                    <NewClient addClient={this.addClient} />
                </div>

                {errorPopUp ?
                    <div className="error-pop-up">
                        <div>SOME DETAILS ARE MISSING</div>
                    </div>
                    : null}

                {successPopUp ?
                    <div className="success-pop-up">
                        <div>UPDATE SUCCESSFUL</div>
                    </div>
                    : null}

            </div>
        )
    }
}

export default Actions