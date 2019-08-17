import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class SalesSinceChart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data
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
                    <Line type="monotone" dataKey="sales" stroke="#555151" activeDot={{ r: 8 }} dot={false}/>
                </LineChart>
             </ResponsiveContainer>
        )
    }
}

export default SalesSinceChart