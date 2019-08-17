import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class TopEmployeesChart extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { data } = this.props

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout={'vertical'}
                    margin={{
                        top: 15, right: 20, left: 15, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type={'number'} tick={{ fill: 'black', fontSize: "10px" }} >
                    </XAxis>
                    <YAxis type={'category'} dataKey="val" tick={{ fill: 'black', fontSize: "10px" }} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#555151" width={10} />
                </BarChart>
            </ResponsiveContainer> 
        )
    }
}

export default TopEmployeesChart