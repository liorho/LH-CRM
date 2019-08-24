import React, { Component } from 'react'

import ReactHowler from 'react-howler'

class Home extends Component {
    constructor() {
        super()
    }

    render() {



        return (

            <div className="home-container">
                <ReactHowler
                    // src='https://upload.wikimedia.org/wikipedia/commons/5/5d/Sunday_in_the_city_street_noise1.ogg'
                    src='https://upload.wikimedia.org/wikipedia/commons/e/e7/Cambodia_birds.ogg'
                    playing={true}
                />
                <div className="home"><span className="LH">LH</span></div>
                <div className="sit-back">Sit back. Relax. Let LH's CRM do all the hard work for you.</div>
            </div>
        )
    }
}

export default Home