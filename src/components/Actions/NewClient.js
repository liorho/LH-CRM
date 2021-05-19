import React, { Component } from 'react';

class NewClient extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      country: '',
      owner: '',
      email: '',
    };
  }

  insertInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  addClient = () => {
    let isInputValid = true;
    for (let key of Object.keys(this.state)) {
      if (!this.state[key]) isInputValid = false;
    }
    if (isInputValid) {
      this.props.addClient(this.state);
      this.props.handleMsgPopUp(true, 'success');
    } else {
      this.props.handleMsgPopUp(true, 'error');
    }
  };

  // --------- Render --------
  render() {
    return (
      <div>
        <div className='update-title'>ADD CLIENT</div>

        <table className='new-client'>
          <tbody>
            <tr>
              <th>First Name: </th>
              <th>
                <input type='text' id='firstName' name='firstName' value={this.state.firstName} onChange={this.insertInput} />
              </th>
            </tr>
            <tr className='last-name'>
              <th>Last Name: </th>
              <th>
                <input type='text' id='lastName' name='lastName' value={this.state.lastName} onChange={this.insertInput} />
              </th>
            </tr>
            <tr>
              <th>Country: </th>
              <th>
                <input type='text' id='country' name='country' value={this.state.country} onChange={this.insertInput} />
              </th>
            </tr>
            <tr className='owner'>
              <th>Owner: </th>
              <th>
                <input type='text' id='owner' name='owner' value={this.state.owner} onChange={this.insertInput} />
              </th>
            </tr>
            <tr>
              <th>Email: </th>
              <th>
                <input type='text' id='email' name='email' value={this.state.email} onChange={this.insertInput} />
              </th>
            </tr>
          </tbody>
        </table>
        <input className='add-client-btn' type='button' value='Add' onClick={this.addClient} />
      </div>
    );
  }
}

export default NewClient;
