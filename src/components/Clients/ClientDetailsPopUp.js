import React, { Component } from 'react';

class ClientDetailsPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.client.name,
      country: this.props.client.country,
      email: this.props.client.email
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateClient = () => {
    let isInputValid = true
    for (let key of Object.keys(this.state)) {
      if (!this.state[key]) isInputValid = false
    }
    if (isInputValid) {
      this.props.updateClient({...this.props.client, ...this.state})
      this.props.handleMsgPopUp(true, 'success')
      setTimeout(() => {
        this.props.closeClientDetailsPopUp()
      }, 2500);
    } else {
      this.props.handleMsgPopUp(true, 'error')

    }
  }

  deleteClient = async () => {
    await this.props.deleteClient(this.props.client._id);
    setTimeout(() => {
      this.props.closeClientDetailsPopUp()
    }, 2500);
    this.props.handleMsgPopUp(true, 'success');
  }

  // --------- Render --------
  render() {
    let { name, country, email } = this.state;

    return (
      <div className='details-pop-up-container'>
        <div className='details-pop-up'>
          <div>
            <div>
              <span>Name: </span>
              <span>
                <input type='text' name='name' value={name} onChange={this.handleChange} />
              </span>
            </div>
            <div>
              <span>Country: </span>
              <span>
                <input type='text' name='country' value={country} onChange={this.handleChange} />
              </span>
            </div>
            <div>
              <span>Email: </span>
              <span>
                <input type='text' name='email' value={email} onChange={this.handleChange} />
              </span>
            </div>
          </div>
          <div className='update-pop-up-btn'>
            <input
              className='update-client-popup-btn'
              type='button'
              value='Update Client'
              onClick={this.updateClient}
            />
            <input
              className='delete-client-popup-btn'
              type='button'
              value='Delete Client'
              onClick={this.deleteClient}
            />
            <input className='cancel-client-popup-btn' type='button' value='Close' onClick={() => this.props.closeClientDetailsPopUp()} />
          </div>
        </div>
      </div>
    );
  }
}

export default ClientDetailsPopUp;
