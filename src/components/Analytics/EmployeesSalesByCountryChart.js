import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

class EmployeesSalesByCountryChart extends Component {

    render() {
        const data = this.props.data

        let renderLabel = (entry) => {
            return (entry.val + ": " + entry.sales)
        }

        let color = ["#555151", "#524f4f", "#464444", "#3d3c3c", "#2b2a2a", "#272626", "#222121", "#181717"]

        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        labelLine={true}
                        label={renderLabel}
                        tick={{ fill: 'black', fontSize: "2px" }}
                        dataKey="sales"
                        nameKey="val"
                    >
                        {
                            data.map((entry, index) => <Cell fill={color[index % color.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default EmployeesSalesByCountryChart
