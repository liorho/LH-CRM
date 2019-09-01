import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class TopEmployeesChart extends Component {
    
    render() {

        const { data } = this.props
        let color = this.props.colorDesign ? "#104418f6" : "#555151"
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
                    <XAxis type={'number'} tick={{ fill: 'black', fontSize: "10px" }} />
                    <YAxis type={'category'} dataKey="val" tick={{ fill: 'black', fontSize: "10px" }} />
                    <Tooltip />
                    <Bar dataKey="sales" fill={color} width={10} />
                </BarChart>
            </ResponsiveContainer> 
        )
    }
}

export default TopEmployeesChart