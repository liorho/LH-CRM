import React, { Component } from 'react'
import UpdateData from './UpdateData'
import ClientInput from './ClientInput'
import NewClient from './NewClient'
import ErrorPopUp from '../PopUps/ErrorPopUp'
import SuccessPopUp from '../PopUps/SuccessPopUp'

class Actions extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            errorPopUp: false,
            successPopUp: false
        }
    }

    //----------- Supporting Functions -------
    // Create Array of Clients names for drop-down menu
    clientsNames = () => {
        let clients = this.props.clients
        let clientsNames = []
        clients.forEach(c => clientsNames.push(c.name))
        return clientsNames
    }

    // find Client id by his name
    findClientId = async (name) => {
        let clients = this.props.clients
        let chosenClient = clients.find(c => c.name === name)
        let id = chosenClient ? chosenClient.id : null
        await this.setState({ id })
    }

    // ----- POP-UP ----------
    handlePopUp = async (type, val) => {
        this.setState({ [type]: val });
        setTimeout( async () => {await this.setState({ [type]: !val }) }, 3000)
    }

    //------- Functions -----------
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

    addClient = async (client) => {
        let keys = Object.keys(client)
        let checkInput = 0
        for (let key of keys) {
            checkInput = client[key] || key === "sold" || key === "emailType" ? checkInput : checkInput + 1
        }
        if (checkInput === 0) {
            await this.props.addClient(client)
            await this.handlePopUp("successPopUp", true)
        } else {
            await this.handlePopUp("errorPopUp", true)
        }
    }

    // --------- Render --------
    render() {
        const { clients } = this.props
        const { errorPopUp, successPopUp, id } = this.state
        return (
            <div className="actions-container">
                <div className="update-container">
                    <div className="update-title">UPDATE</div>
                    <table>
                        <ClientInput clientsNames={this.clientsNames()} findClientId={this.findClientId} />
                        <UpdateData clients={clients} updateClient={this.updateClient} id={id} />
                    </table>
                </div>

                <div className="add-client-container">
                    <div className="update-title">ADD CLIENT</div>
                    <NewClient addClient={this.addClient} />
                </div>

                <div className="LH1">LH</div>

                {errorPopUp ? < ErrorPopUp /> : null}

                {successPopUp ? <SuccessPopUp /> : null}

            </div>
        )
    }
}

export default Actions