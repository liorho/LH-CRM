import React, { Component } from 'react'

class DetailsPopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsPopUp: this.props.detailsPopUp
        }

    }

    insertInput = async (event) => {
        let input = event.target.value
        let value = event.target.id
        let detailsPopUp = this.state.detailsPopUp
        detailsPopUp[value] = input
        await this.setState({ detailsPopUp })
    }

    updateClientPopUp = async () => {
        this.props.updateClientPopUp(this.state.detailsPopUp)
    }

    deleteClient = async () => {
        this.props.deleteClient(this.state.detailsPopUp._id)
    }

    cancelUpdate = async () => {
        this.props.cancelUpdate()
    }

    // --------- Render --------
    render() {

        let detailsPopUp = this.state.detailsPopUp

        return (
            <div className="details-pop-up-container">
                <div className="details-pop-up">
                    <div>
                        <div>
                            <span>Name: </span>
                            <span><input type="text" id="name" value={detailsPopUp.name} onChange={this.insertInput} /></span>
                        </div>
                        <div>
                            <span>Country: </span>
                            <span><input type="text" id="country" value={detailsPopUp.country} onChange={this.insertInput} /></span>
                        </div>
                        <div>
                            <span>Email: </span>
                            <span><input type="text" id="email" value={detailsPopUp.email} onChange={this.insertInput} /></span>
                        </div>
                    </div>
                    <div className="update-pop-up-btn">
                        <input className="update-client-popup-btn" type="button" value="Update" onClick={this.updateClientPopUp} />
                        <input className="delete-client-popup-btn" type="button" value="Delete Client" onClick={this.deleteClient} />
                        <input className="cancel-client-popup-btn" type="button" value="Cancel" onClick={this.cancelUpdate} />
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsPopUp