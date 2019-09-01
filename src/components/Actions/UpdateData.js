import React, { Component } from 'react'

class UpdateData extends Component {
    constructor() {
        super()
        this.state = {
            owner: null,
            emailType: null,
            sold: false
        }
    }

    // ---------- Supporting Function -------
    renderOwners = () => {
        let ownerArr = []
        this.props.clients.map(c => ownerArr.includes(c.owner) ? null : ownerArr.push(c.owner))
        return (ownerArr)
    }

    // ------------ INPUT -------------
    changeInput = async (event) => {
        let key = event.target.list.id
        let value = event.target.value
        await this.setState({ [key]: value })
    }

    // -------- Main Function -------
    updateClient = async (event) => {
        let value = event.target.value
        const { owner, emailType, sold } = this.state
        let { updateClient, id } = this.props
        switch (value) {
            case "Transfer":
                updateClient({ key: "owner", value: owner })
                await this.setState({ owner: null })
                break;
            case "Send":
                updateClient({ key: "emailType", value: emailType })
                await this.setState({ emailType: null })
                break;
            case "Sold":
                if (id) {
                    await this.setState({ sold: sold ? false : true })
                    updateClient({ key: "sold", value: true })
                    setTimeout(async () => { await this.setState({ sold: false }) }, 2000)
                    break;
                } else {
                    updateClient({})
                    break;
                }
            default: break
        }
    }

    // --------- Render --------
    render() {
        const { owner, emailType, sold } = this.state
        const emailTypeArr = ["A", "B", "C", "D"]

        return (
            <table className="update-client">

                <tr className="change-owner">
                    <th>Transfer ownership to: </th>
                    <th>
                        <input list="owner" value={owner} onChange={this.changeInput} />
                        <datalist id="owner" className="select-owner">
                            {this.renderOwners().map(o => <option>{o}</option>)}
                        </datalist>
                    </th>
                    <th>
                        <input type="button" value="Transfer" onClick={this.updateClient} />
                    </th>
                </tr>

                <tr id="change-email-type">
                    <th>Email Type: </th>
                    <th>
                        <input list="emailType" value={emailType} onChange={this.changeInput} />
                        <datalist id="emailType" className="select-emailType">
                            {emailTypeArr.map(e => <option>{e}</option>)}
                        </datalist>
                    </th>
                    <th>
                        <input type="button" value="Send" onClick={this.updateClient} />
                    </th>
                </tr>

                <tr className="change-sold">
                    <th>
                        {sold ? "Sale was declared" : "Click to declare as Sold"}
                    </th>
                    <th>
                        {sold ? null : <input type="button" value="Sold" onClick={this.updateClient} />}
                    </th>
                    <th></th>
                </tr>
            </table>
        )
    }
}


export default UpdateData