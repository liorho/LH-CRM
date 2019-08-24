import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class SalesSinceChart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data
        let color = this.props.colorDesign ? "#104418f6" : "#555151"
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 15, right: 20, left: 15, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="val" tick={{ fill: 'black', fontSize: "10px" }} />
                    <YAxis tick={{ fill: 'black', fontSize: "10px" }}  />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke={color} activeDot={{ r: 8 }} dot={false}/>
                </LineChart>
             </ResponsiveContainer>
        )
    }
}

export default SalesSinceChart