import React, { Component } from 'react'

class Badge extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {badge} = this.props
        return (
            <div className="badge">
                <img className="badge-img" src={badge.url} />
                <div className="badge-val">{badge.val}</div>
                <div className="badge-text">{badge.text}</div>
            </div>
        )
    }
}

export default Badge