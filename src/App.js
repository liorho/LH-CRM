import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'

import Clients from './components/Clients/Clients'
import Actions from './components/Actions/Actions'
import Analytics from './components/Analytics/Analytics'
import Home from './components/Home/Home'

const axios = require('axios')

// Load First Data
const data = require('./data.json')

class App extends Component {
  constructor() {
    super()
    this.state = {
      clients: [],
      selectedButton: null,
    }
  }
  // --------- Start ---------
  componentDidMount = async () => {
    await this.getClients()
  }

  // --- Upper Case Function -----
  upperCase = (input) => {
    let inputArr = input.split(" ")
    inputArr = inputArr.map(i => i.charAt(0).toUpperCase() + i.slice(1))
    input = inputArr.join(" ")
    return input
  }

    // ---------- Main Functions -------
  addClient = async (client) => {
    console.log(client)
    client.country = this.upperCase(client.country)
    client.name = this.upperCase(client.name)
    client.owner = this.upperCase(client.owner)
    await axios.post('http://localhost:3001/clients', client)
    this.getClients()
  }

  getClients = async () => {
    let clients = await axios.get('http://localhost:3001/clients')
    this.setState({ clients: clients.data })
  }

  updateClient = async (data) => {
    data.value = data.key === "owner" || data.key === "emailType" ? this.upperCase(data.value) : data.value
    console.log(data)
    await axios.put('http://localhost:3001/clients', data)
    this.getClients()
  }

  updateClientPopUp = async (data) => {
    data.country = this.upperCase(data.country)
    data.name = this.upperCase(data.name)
    await axios.put(`http://localhost:3001/clientsPopUp`, data)
    this.getClients()
  }

  deleteClient = async (id) => {
    await axios.delete(`http://localhost:3001/clients/${id}`)
    this.getClients()
  }
  // -------------------------------------
  // Arrange data for Actions component
  clientsActions = () => {
    let clients = this.state.clients
    let clientsActionsArr = []
    clients.forEach(c => clientsActionsArr.push({ id: c._id, name: c.name, owner: c.owner }))
    return clientsActionsArr
  }

  // ----- Button ------
  buttonSelected = selectedButton => (e) => {
    this.setState({ selectedButton })
  }

  // --------- Render --------
  render() {
    //initialize client-data for the first run:
    // data.forEach(client => this.addClient(client))

    return (
      <Router>
        <div className="app-container" >
          <div className="navbar">
            <Link to="/">
              <input type="button" value="Home" className={this.state.selectedButton === "Home" ? 'nav-btn selected home-btn' : 'nav-btn home-btn'} onClick={this.buttonSelected("Home")} />
            </Link>
            <Link to="/analytics">
              <input type="button" value="Analytics" className={this.state.selectedButton === "Analytics" ? 'selected' : 'nav-btn'} onClick={this.buttonSelected("Analytics")} />
            </Link>
            <Link to="/actions">
              <input type="button" value="Actions" className={this.state.selectedButton === "Actions" ? 'selected' : 'nav-btn'} onClick={this.buttonSelected("Actions")} />
            </Link>
            <Link to="/clients">
              <input type="button" value="Clients" className={this.state.selectedButton === "Clients" ? 'selected' : 'nav-btn'} onClick={this.buttonSelected("Clients")} />
            </Link>
          </div>

          <Route exact path="/" component={Home} />
          <Route exact path="/clients" render={() => <Clients clients={this.state.clients} updateClientPopUp={this.updateClientPopUp} deleteClient={this.deleteClient} />} />
          <Route exact path="/actions" render={() => <Actions clients={this.clientsActions()} updateClient={this.updateClient} addClient={this.addClient} />} />
          <Route exact path="/analytics" component={Analytics} />

        </div>
      </Router>
    );
  }
}

export default App;
