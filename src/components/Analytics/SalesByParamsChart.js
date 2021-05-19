import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
class SalesByParamsChart extends Component {

    render() {
        const data = this.props.data
        const color = this.props.isColor ? "#104418f6" : "#555151"

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
                    <Bar dataKey="sales" fill={color} />
                </BarChart>
             </ResponsiveContainer>
        )
    }
}

export default SalesByParamsChart