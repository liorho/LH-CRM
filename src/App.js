import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Clients from './components/Clients/Clients'
import Actions from './components/Actions/Actions'
import Analytics from './components/Analytics/Analytics'
import Home from './Home/Home'
const axios = require('axios')
const data = require('./data.json')


class App extends Component {
  constructor() {
    super()
    this.state = {
      clients: [],
      selectedButton: null,
    }
  }

  addClient = async (client) => {
    await axios.post('http://localhost:3001/clients', client)

  }

  getClients = async () => {
    let clients = await axios.get('http://localhost:3001/clients')
    this.setState({ clients: clients.data })
  }

  componentDidMount = async () => {
    await this.getClients()
  }

  buttonSelected = selectedButton => ev => {
    this.setState({ selectedButton })
  }


  render() {

    //get initial client-data
    // data.forEach(client => this.addClient(client))

    return (
      <Router>
        <div >
          <div className="navbar">
            <Link to="/clients">
              <input type="button" value="Clients" className={this.state.selectedButton === "Clients" ? 'nav-btn selected' : 'nav-btn'} onClick={this.buttonSelected("Clients")} />
            </Link>
            <Link to="/actions">
              <input type="button" value="Actions" className={this.state.selectedButton === "Actions" ? 'nav-btn selected' : 'nav-btn'} onClick={this.buttonSelected("Actions")} />
            </Link>
            <Link to="/analytics">
              <input type="button" value="Analytics" className={this.state.selectedButton === "Analytics" ? 'nav-btn selected' : 'nav-btn'} onClick={this.buttonSelected("Analytics")} />
            </Link>
            <Link to="/">
              <input type="button" value="Home" className={this.state.selectedButton === "Home" ? 'nav-btn selected home-btn' : 'nav-btn home-btn'} onClick={this.buttonSelected("Home")} />
            </Link>
          </div>


          <Route exact path="/" component={Home} />
          <Route exact path="/clients" render={() => <Clients clients={this.state.clients} />} />
          <Route exact path="/actions" component={Actions} />
          <Route exact path="/analytics" component={Analytics} />

        </div>
      </Router>
    );
  }
}

export default App;
