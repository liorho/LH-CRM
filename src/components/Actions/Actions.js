import React, { Component } from 'react';
import UpdateData from './UpdateData';
import NewClient from './NewClient';

class Actions extends Component {
  constructor() {
    super();
    this.state = {
      _id: null,

    };
  }

  //----------- Supporting Functions -------

  setClientId = (_id) => this.setState({_id})

  // ----- POP-UP ----------

  handleMsgPopUp = (isPopUp, msg) => {
    this.setState({ msgPopUp: { isPopUp, msg } });
    setTimeout(() => {
      this.setState({ msgPopUp: { isPopUp: !isPopUp, msg } });
    }, 3000);
  };

  //------- Functions -----------
  updateClient = (data) => this.props.updateClient(data)

  addClient = async (client) => {
    let keys = Object.keys(client);
    let isInputCorrect = true;
    for (let key of keys) {
      if (!client[key]) isInputCorrect = false;
    }
    if (isInputCorrect) {
      let date = new Date();
      await this.props.addClient({
        name: client.firstName + ' ' + client.lastName,
        email: client.email,
        country: client.country,
        owner: client.owner,
        firstContact: date,
        emailType: null,
        sold: false,
      });
      this.handleMsgPopUp(true, 'success');
    } else {
      this.handleMsgPopUp(true, 'error');
    }
  };

  // --------- Render --------
  render() {
    const { clients } = this.props;
    return (
      <div className='actions-container'>
        <div className='update-container'>
          <UpdateData clients={clients} updateClient={this.updateClient} handleMsgPopUp={this.props.handleMsgPopUp}/>
        </div>

        <div className='add-client-container'>
          <NewClient addClient={this.addClient} handleMsgPopUp={this.props.handleMsgPopUp}/>
        </div>

        <div className='LH1'>LH</div>

      </div>
    );
  }
}

export default Actions;
