import React, { Component } from 'react'
import Moment from 'react-moment';

class Client extends Component {

    detailsPopUp = async () => {
        let client = {...this.props.client}
        await this.props.detailsPopUp(client)
    }

    // --------- Render --------
    render() {
        let client = this.props.client
        return (
            <tr className="clientDetails" onClick={this.detailsPopUp}>
                <th>{client.name.split(' ')[0]}</th>
                <th>{client.name.split(' ')[1]}</th>
                <th>{client.country}</th>
                <th>{client.email}</th>
                <th>{client.owner}</th>
                <th>{client.sold ? "YES" : "NO"}</th>
                <th><Moment format="DD/MM/YYYY">{client.firstContact}</Moment></th>
                <th>{client.emailType ? client.emailType : "-"}</th>
            </tr>
        )
    }
}

export default Client