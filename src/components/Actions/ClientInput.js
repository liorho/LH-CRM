import React, { Component } from 'react'

class ClientInput extends Component {
    constructor() {
        super()
        this.state = {
            input: ""
        }
    }

    insertInput = (event) => {
        let input = event.target.value
        this.setState({ input })
    }

    findClientId = (event) => {
        this.props.findClientId(event.target.value)
        this.insertInput(event)
    }

    // --------- Render --------
    render() {
        let clientsNames = this.props.clientsNames
        return (
            <div className="client-input">
                <span className="client-title">Client: </span>
                <input list="names" value={this.state.input} onChange={this.findClientId} />
                <datalist id="names" >
                    <option value=""></option>
                    {clientsNames.map(n => <option value={n}>{n}</option>)}
                </datalist>              
            </div>
        )
    }
}

export default ClientInput