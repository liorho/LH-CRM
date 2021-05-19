import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Clients from './components/Clients/Clients';
import Actions from './components/Actions/Actions';
import Analytics from './components/Analytics/Analytics';
import Home from './components/Home/Home';
import { clientDetailsToUpperCase } from './utils/utils';
import { API_URL } from './utils/consts';
import MsgPopUp from './PopUps/MsgPopUp';
const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      isColor: false,
      path: window.location.pathname,
      msgPopUp: {
        isPopUp: false,
        msg: 'success',
      },
    };
  }
  // --------- Start ---------
  componentDidMount = async () => await this.getClients();

  // --------- Color Control ---------
  changeDesign = async () => {
    const createLinkElement = (href) => {
      const newCssLink = document.createElement('link');
      newCssLink.setAttribute('rel', 'stylesheet');
      newCssLink.setAttribute('class', 'app-css');
      newCssLink.setAttribute('href', href);
      document.getElementsByTagName('head')[0].prepend(newCssLink);
      const oldCssLink = document.getElementsByClassName('app-css')[1];
      oldCssLink.parentNode.removeChild(oldCssLink);
    };
    createLinkElement(this.state.isColor ? 'App-bw.css' : 'App.css');
    this.setState({ isColor: !this.state.isColor });
  };

  // ---------- CRUD Functions -------
  addClient = async (client) => {
    client = clientDetailsToUpperCase(client);
    await axios.post(`${API_URL}/clients`, client);
    this.getClients();
  };

  getClients = async () => {
    let clients = await axios.get(`${API_URL}/clients`);
    this.setState({ clients: clients.data });
  };

  updateClient = async (client) => {
    client = clientDetailsToUpperCase(client);
    await axios.put(`${API_URL}/clients`, client);
    this.getClients();
  };

  deleteClient = async (_id) => {
    await axios.delete(`${API_URL}/clients/${_id}`);
    this.getClients();
  };

  //--------Error/Success POP-UP -------

  handleMsgPopUp = (isPopUp, msg) => {
    this.setState({ msgPopUp: { isPopUp, msg } });
    setTimeout(() => {
      this.setState({ msgPopUp: { isPopUp: !isPopUp, msg } });
    }, 3000);
  };

  // ----- Navbar Buttons ------
  selectLink = (path) => () => {
    this.setState({ path });
  };

  // --------- Render --------
  render() {
    const { path } = this.state;
    return (
      <Router>
        <div className='app-container'>

          {/* Links */}
          <div className='navbar'>
            <Link to='/'>
              <input type='button' value='Home' className={path === '/' ? 'selected home-btn' : 'nav-btn home-btn'} onClick={this.selectLink('/')} />
            </Link>
            <Link to='/analytics'>
              <input
                type='button'
                value='Analytics'
                className={path === '/analytics' ? 'selected' : 'nav-btn'}
                onClick={this.selectLink('/analytics')}
              />
            </Link>
            <Link to='/actions'>
              <input
                type='button'
                value='Actions'
                className='selected'
                className={path === '/actions' ? 'selected' : 'nav-btn'}
                onClick={this.selectLink('/actions')}
              />
            </Link>
            <Link to='/clients'>
              <input type='button' value='Clients' className={path === '/clients' ? 'selected' : 'nav-btn'} onClick={this.selectLink('/clients')} />
            </Link>
          </div>

          {/* Color Control */}
          <div className='color-btn' onClick={this.changeDesign}>
            {this.state.isColor ? 'B&W' : 'Color'}
          </div>

          {/* Error/Success POP-UP */}
          {this.state.msgPopUp.isPopUp ? <MsgPopUp msg={this.state.msgPopUp.msg} /> : null}

          {/* Routes */}
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/clients'
            render={() => (
              <Clients
                clients={this.state.clients}
                handleMsgPopUp={this.handleMsgPopUp}
                updateClient={this.updateClient}
                deleteClient={this.deleteClient}
              />
            )}
          />
          <Route
            exact
            path='/actions'
            render={() => (
              <Actions
                clients={this.state.clients}
                handleMsgPopUp={this.handleMsgPopUp}
                updateClient={this.updateClient}
                addClient={this.addClient}
              />
            )}
          />
          <Route exact path='/analytics' render={() => <Analytics isColor={this.state.isColor} clients={this.state.clients} />} />
        </div>
      </Router>
    );
  }
}

export default App;
