import React, { Component } from 'react'

class NewClient extends Component {
    constructor() {
        super()
        this.state = {
            firstName: null,
            lastName: null,
            country: null,
            owner: null,
            email: null,
        }
    }


    insertInput = (event) => {
        let input = event.target.value
        let key = event.target.id
        this.setState({ [key]: input })
    }

    addClient = () => {
        let date = new Date()
        this.props.addClient({
            name: this.state.firstName + " " + this.state.lastName,
            email: this.state.email,
            firstContact: date,
            emailType: null,
            sold: false,
            owner: this.state.owner,
            country: this.state.country
        })
    }

    // --------- Render --------
    render() {
        return (
            <div>
                <table className="new-client">
                    <tr>
                        <th>First name: </th>
                        <th><input type="text" id="firstName" value={this.state.firstName} onChange={this.insertInput} /></th>
                    </tr>
                    <tr className="last-name">
                        <th>Last name: </th>
                        <th><input type="text" id="lastName" value={this.state.lastName} onChange={this.insertInput} /></th>
                    </tr>
                    <tr>
                        <th>Country: </th>
                        <th><input type="text" id="country" value={this.state.country} onChange={this.insertInput} /></th>
                    </tr>
                    <tr className="owner">
                        <th>Owner: </th>
                        <th><input type="text" id="owner" value={this.state.owner} onChange={this.insertInput} /></th>
                    </tr>
                    <tr>
                        <th>Email: </th>
                        <th><input type="text" id="email" value={this.state.email} onChange={this.insertInput} /></th>
                    </tr>
                </table>
                <input className="add-client-btn" type="button" value="Add" onClick={this.addClient} />
            </div>
        )
    }
}

export default NewClient