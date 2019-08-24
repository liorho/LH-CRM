import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Clients from './components/Clients/Clients'
import Actions from './components/Actions/Actions'
import Analytics from './components/Analytics/Analytics'
import Home from './components/Home/Home'

const axios = require('axios')

// Load First Data
// const data = require('./data.json')

class App extends Component {
  constructor() {
    super()
    this.state = {
      clients: [],
      colorDesign: true,
      currentPath: window.location.pathname
    }

    window.onbeforeunload = function(e) {
      this.setState({currentPath: window.location.pathname})
   }

  }
  // --------- Start ---------
  componentDidMount = async () => {
    await this.getClients()
  }

  // --------- Color Control ---------
  changeDesign = async () => {
    await this.setState({ colorDesign: !this.state.colorDesign })
    if (this.state.colorDesign) {
      let newCssLink = document.createElement('link')
      newCssLink.setAttribute("rel", "stylesheet")
      newCssLink.setAttribute("class", "app-css")
      newCssLink.setAttribute("href", "App.css")
      document.getElementsByTagName("head")[0].prepend(newCssLink)
      let oldCssLink = document.getElementsByClassName("app-css")[1]
      oldCssLink.parentNode.removeChild(oldCssLink);

      let newIconLink = document.createElement('link')
      newIconLink.setAttribute("class", "app-icon")
      newIconLink.setAttribute("rel", "icon")
      newIconLink.setAttribute("href", "./img/icon-color.jpg")
      document.getElementsByTagName("head")[0].append(newIconLink)
      let oldIconLink = document.getElementsByClassName("app-icon")[0]
      oldIconLink.parentNode.removeChild(oldIconLink);


    } else {
      let newCssLink = document.createElement("link")
      newCssLink.setAttribute("rel", "stylesheet")
      newCssLink.setAttribute("class", "app-css")
      newCssLink.setAttribute("href", "App-bw.css")
      document.getElementsByTagName("head")[0].prepend(newCssLink)
      let oldCssLink = document.getElementsByClassName("app-css")[1]
      oldCssLink.parentNode.removeChild(oldCssLink)

      let newIconLink = document.createElement("link")
      newIconLink.setAttribute("class", "app-icon")
      newIconLink.setAttribute("rel", "icon")
      newIconLink.setAttribute("href", "./img/icon-bw.jpg")
      document.getElementsByTagName("head")[0].append(newIconLink)
      let oldIconLink = document.getElementsByClassName("app-icon")[0]
      oldIconLink.parentNode.removeChild(oldIconLink);
    }
  }

  // --- Upper Case Function -----
  upperCase = (input) => {
    return input
               .split(" ")
               .map(i => i.charAt(0).toUpperCase() + i.slice(1))
               .join(" ")
  }

  // ---------- Main Functions -------
  addClient = async (client) => {
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

    let pathname = window.location.pathname
    return (
      <Router>
        <div className="app-container" >

          <div className="load-css" style={{ width: "100vh", height: "100vh" }}></div>

          <div className="navbar">
            <Link to="/">
              <input type="button" value="Home"
                className={pathname === "/" ? 'selected home-btn' : 'nav-btn home-btn'}
                onClick={this.buttonSelected("Home")} />
            </Link>
            <Link to="/analytics">
              <input type="button" value="Analytics"
                className={pathname === "/analytics" ? 'selected' : 'nav-btn'}
                onClick={this.buttonSelected("Analytics")} />
            </Link>
            <Link to="/actions">
              <input type="button" value="Actions"
                className={pathname === "/actions" ? 'selected' : 'nav-btn'}
                onClick={this.buttonSelected("Actions")} />
            </Link>
            <Link to="/clients">
              <input type="button" value="Clients"
                className={pathname === "/clients" ? 'selected' : 'nav-btn'}
                onClick={this.buttonSelected("Clients")} />
            </Link>
          </div>

          {this.state.colorDesign ?
            <div className="color-btn" onClick={this.changeDesign}>B&W</div> :
            <div className="color-btn" onClick={this.changeDesign}>Color</div>}


          <Route exact path="/" component={Home} />
          <Route exact path="/clients" render={() => <Clients clients={this.state.clients} updateClientPopUp={this.updateClientPopUp} deleteClient={this.deleteClient} />} />
          <Route exact path="/actions" render={() => <Actions clients={this.clientsActions()} updateClient={this.updateClient} addClient={this.addClient} />} />
          <Route exact path="/analytics" render={() => <Analytics colorDesign={this.state.colorDesign} />} />

        </div>
      </Router>
    );
  }
}


export default App;
