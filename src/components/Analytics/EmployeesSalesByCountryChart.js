import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

class EmployeesSalesByCountryChart extends Component {

    render() {
        const data = this.props.data

        let renderLabel = (entry) => {
            return (entry.val + ": " + entry.sales)
        }

        let color = this.props.colorDesign ? 
                    ["#104418f6", "#0e2512f6", "#1b331ff6;", "#37663ff6;", "#086418f6", "#078f1ef6", "#09721af6"] :
                    ["#555151", "#464444", "#3d3c3c", "#2b2a2a","#524f4f", "#272626", "#222121", "#181717"]
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
