import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div className="home-container">
                <div className="home"><span className="LH">LH </span><span className="CRM">   CRM</span></div>
            </div>
        )
    }
}

export default Home