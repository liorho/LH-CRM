import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

class SalesByParamsChart extends Component {
    constructor() {
        super()
    }

    render() {
        let data = this.props.data

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 15, right: 20, left: 15, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="val" tick={{ fill: 'black', fontSize: "10px" }} interval={0}/>
                    <YAxis tick={{ fill: 'black', fontSize: "20px" }}  />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#555151" />
                </BarChart>
             </ResponsiveContainer>
        )
    }
}

export default SalesByParamsChart