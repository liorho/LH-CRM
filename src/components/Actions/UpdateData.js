import React, { Component } from 'react';

class UpdateData extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      owner: '',
      emailType: '',
      sold: false,
    };
  }

  // ---------- Supporting Function -------
  getOwners = () => [...new Set(this.props.clients.map((c) => c.owner))];
  getClientsNames = () => this.props.clients.map((c) => c.name);

  // ------------ INPUT -------------
  handleChange = async (event) => {
    const { list, value } = event.target;
    if (list.id === 'name') {
      const client = this.props.clients.find((c) => c.name === value);
      if (client) this.setState({ sold: client.sold });
    }
    await this.setState({ [list.id]: value });
  };

  // -------- Main Function -------

  updateClient = async (event) => {
    const key = event.target.name;
    if (this.state.name && this.state[key] !== '') {
      let client = this.props.clients.find((c) => c.name === this.state.name);
      this.props.updateClient({ ...client, [key]: key === 'sold' ? true : this.state[key] });
      this.props.handleMsgPopUp(true, 'success');
      if (key === 'sold') this.setState({ sold: true });
    } else {
      this.props.handleMsgPopUp(true, 'error');
    }
  };

  // --------- Render --------
  render() {
    const { name, owner, emailType, sold } = this.state;
    const emailTypeArr = ['A', 'B', 'C', 'D'];

    return (
      <>
        <div className='update-title'>UPDATE</div>

        <table className='update-client'>
          <tbody>
            <tr className='client-input'>
              <th>Client: </th>
              <th>
                <input list='name' value={name} onChange={this.handleChange} />
                <datalist id='name'>
                  <option value=''></option>
                  {this.getClientsNames().map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
                </datalist>
              </th>
              <th></th>
            </tr>

            <tr className='change-owner'>
              <th>Transfer ownership to: </th>
              <th>
                <input list='owner' value={owner} onChange={this.handleChange} />
                <datalist id='owner' className='select-owner'>
                  {this.getOwners().map((owner, i) => (
                    <option key={i}>{owner}</option>
                  ))}
                </datalist>
              </th>
              <th>
                <input type='button' value='Transfer' name='owner' onClick={this.updateClient} />
              </th>
            </tr>

            <tr className='change-email-type'>
              <th>Email Type: </th>
              <th>
                <input list='emailType' value={emailType} onChange={this.handleChange} />
                <datalist id='emailType' className='select-emailType'>
                  {emailTypeArr.map((emailType, i) => (
                    <option key={i}>{emailType}</option>
                  ))}
                </datalist>
              </th>
              <th>
                <input type='button' value='Send' name='emailType' onClick={this.updateClient} />
              </th>
            </tr>

            <tr className='change-sold'>
              <th>{sold ? 'Sale was declared' : 'Click to declare as Sold'}</th>
              <th>{sold ? null : <input type='button' value='Sold' name='sold' onClick={this.updateClient} />}</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default UpdateData;
