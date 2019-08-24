import React, { Component } from 'react'

import Badge from './Badge'
import TopEmployeesChart from './TopEmployeesChart'
import SalesByParamsChart from './SalesByParamsChart'
import SalesSinceChart from './SalesSinceChart'
import EmployeesSalesByCountryChart from './EmployeesSalesByCountryChart'

const axios = require('axios')
const moment = require('moment')

class Analytics extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            badges: [
                { val: 0, text: "", url: 'https://static.thenounproject.com/png/61360-200.png' },
                { val: 0, text: "Emails Sent", url: 'data:image/png;base64,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' },
                { val: 0, text: "Outstanding Clients", url: 'data:image/png;base64,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' },
                { val: 0, text: "Hottest Country", url: 'data:image/png;base64,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' }
            ],
            topEmployees: [],
            salesByParams: [],
            params: ["Country", "Email Type", "Employee", "Month (All Time)"],
            input: "",
            chosenParam: "Country",
            startDate: "",
            last30DaysOfSaleArr: [],
            countriesArr: [],
            chosenCountry: "", 
            employeesSalesByCountry: []
        }
    }

    //---------- Start ------------------
    componentDidMount = async () => {
        await this.getClients()
    }

    getClients = async () => {
        let clients = await axios.get('http://localhost:3001/clients')
        await this.setState({ clients: clients.data })
        await this.calculations()
    }

    calculations = async () => {
        await this.numOfNewClientsCalc()
        await this.numOfEmailSentCalc()
        await this.numOfOutstandingClientsCalc()
        await this.findHottestCountry()
        await this.findTopEmployees()
        await this.salesByParamsCharts("Country")
        await this.salesSinceCharts(30)
        if (this.state.chosenCountry=="") {
            await this.employeesSalesByCountryCharts(this.renderCountries()[0])
        } else {
            await this.employeesSalesByCountryCharts(this.state.chosenCountry)

        }
    }

    //------ Supporting algorythm  ----------
    salesByParamCalc = (param) => {
        // subArr - support array with values by parameter. each value appear as the number of the sales
        // mainArr - array of objects, each object contain value (depend on the parameter) and amount of sales
        let subArr = []
        this.state.clients.forEach(c => { if (c.sold) { subArr.push(c[param]) } })
        subArr.sort()
        let mainArr = []
        let count = 1
        for (let i = 1; i < subArr.length; i++) {
            if (subArr[i] == subArr[i - 1]) {
                count++
            } else {
                mainArr.push({ val: subArr[i - 1], sales: count })
                count = 1
            }
        }
        // for last value:
        mainArr.push({ val: subArr[subArr.length - 1], sales: count })

        mainArr.sort((a, b) => {
            return a.val > b.val ? 1 : -1
        })

        if (param=="emailType") mainArr.splice(0,1)

        return (mainArr)
    }

    salesByMonthsCalc = (param) => {
        // subArr - support array with values by parameter. each value appear as the number of the sales
        // mainArr - array of objects, each object contain value (depend on the parameter) and amount of sales
        let subArr = []
        this.state.clients.forEach(c => { if (c.sold) { subArr.push(c.firstContact) } })
        for (let i = 0; i < subArr.length; i++) {
            let date = moment(subArr[i], 'YYYY/MM/DD')
            subArr[i] = date.format('M')
        }
        subArr.sort()
        let mainArr = []
        let count = 1
        for (let i = 1; i < subArr.length; i++) {
            if (subArr[i] == subArr[i - 1]) {
                count++
            } else {
                mainArr.push({ val: subArr[i - 1], sales: count })
                count = 1
            }
        }
        // for last value:
        mainArr.push({ val: subArr[subArr.length - 1], sales: count })

        mainArr.sort((a, b) => {
            return a.val > b.val ? 1 : -1
        })

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        mainArr.forEach(m => m.val = months[parseInt(m.val) - 1])
        for (let i = 0; i < 3; i++) {
            mainArr[12] = mainArr[1]
            mainArr.splice(1, 1)
        }
        return (mainArr)
    }

    //---------- Badges ---------------------
    numOfNewClientsCalc = async () => {
        let firstContactArr = []
        this.state.clients.forEach(c => firstContactArr.push(c.firstContact))
        let count = 0
        let thisMoment = new Date()
        let thisMonth = thisMoment.getMonth() + 1
        let thisYear = thisMoment.getFullYear()
        firstContactArr.forEach(d => {
            let date = moment(d, 'YYYY/MM/DD')
            if (date.format('M') == thisMonth && date.format('YYYY') == thisYear) { count++ }
        })
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        thisMonth = months[thisMonth - 1];
        let badges = this.state.badges
        badges[0].val = count
        badges[0].text = 'New ' + thisMonth + ' Clients'
        await this.setState({ badges })
    }

    numOfEmailSentCalc = async () => {
        let count = 0;
        this.state.clients.forEach(c => { if (c.emailType) count++ })
        let badges = this.state.badges
        badges[1].val = count
        await this.setState({ badges })
    }

    numOfOutstandingClientsCalc = async () => {
        let count = 0
        this.state.clients.forEach(c => { if (!c.sold) count++ })
        let badges = this.state.badges
        badges[2].val = count
        await this.setState({ badges })
    }

    findHottestCountry = async () => {
        let countriesArr = []
        this.state.clients.forEach(c => { if (c.sold) { countriesArr.push(c.country) } })
        countriesArr.sort()
        let hottestCountry = ""
        let currCount = 1
        let maxCount = 1
        for (let i = 1; i < countriesArr.length; i++) {
            if (countriesArr[i] === countriesArr[i - 1]) {
                currCount++
            } else {
                if (currCount > maxCount) {
                    maxCount = currCount
                    hottestCountry = countriesArr[i - 1]
                    currCount = 1
                } else {
                    currCount = 1
                }
            }
        }
        // check if last group of countries is the biggest
        if (currCount > maxCount) {
            hottestCountry = countriesArr[countriesArr.length - 1]
        }
        let badges = this.state.badges
        badges[3].val = hottestCountry
        await this.setState({ badges })
    }

    //---------- Charts ---------------------
    findTopEmployees = async () => {
        let topEmployeesArr = this.salesByParamCalc("owner")

        // sort by slaes
        topEmployeesArr.sort((a, b) => {
            return a.sales > b.sales ? -1 : 1
        })

        // keeping 3 top employees
        topEmployeesArr.splice(3)

        await this.setState({ topEmployees: topEmployeesArr })
    }

    salesByParamsCharts = async (param) => {

        switch (param) {
            case "Country": param = "country"
                break
            case "Email Type": param = "emailType"
                break
            case "Employee": param = "owner"
                break
            case "Month (All Time)": param = "firstContact"
                break
            default: break
        }
        let salesByParams = []
        if (param === "country" || param === "emailType" || param === "owner") {
            salesByParams = this.salesByParamCalc(param)
        }
        if (param === "firstContact") {
            salesByParams = this.salesByMonthsCalc()
        }
        await this.setState({ salesByParams })

    }

    salesSinceCharts = async (param) => {
        let startDate = moment().subtract(param, 'days')
        let subSalesByDaysArr = []
        this.state.clients.forEach(c => {
            if (startDate.isBefore(c.firstContact) && c.sold) subSalesByDaysArr.push(c.firstContact)
        })
        subSalesByDaysArr.sort()

        let salesByDaysArr = []
        let count = 1
        for (let i = 1; i < subSalesByDaysArr.length; i++) {
            if (moment(subSalesByDaysArr[i], 'YYYY/MM/DD').format('D') == moment(subSalesByDaysArr[i - 1], 'YYYY/MM/DD').format('D')) {
                count++
            } else {
                salesByDaysArr.push({ val: subSalesByDaysArr[i - 1], sales: count })
                count = 1
            }
        }
        // for last value:
        salesByDaysArr.push({ val: subSalesByDaysArr[subSalesByDaysArr.length - 1], sales: count })

        salesByDaysArr.sort((a, b) => {
            return a.val > b.val ? 1 : -1
        })

        salesByDaysArr.forEach(s => s.val = moment(s.val, 'YYYY/MM/DD').format('MMM D'))

        let listOfLast30Days = []

        for (let i = param; i > -1; i--) {
            listOfLast30Days.push(moment(moment().subtract(i, 'days'), 'YYY/MM/DD').format('MMM D'))
        }

        let last30DaysOfSaleArr = []

        for (let i = 0; i < listOfLast30Days.length; i++) {
            let count = 0
            for (let j = 0; j < salesByDaysArr.length; j++) {
                if (listOfLast30Days[i] == salesByDaysArr[j].val) {
                    last30DaysOfSaleArr.push(salesByDaysArr[j])
                    count++
                }
            }
            if (count == 0) {
                last30DaysOfSaleArr.push({ val: listOfLast30Days[i], sales: 0 })
            }
        }

        startDate = "Sales Since " + startDate.format('DD/MM/YYYY')
        await this.setState({ startDate, last30DaysOfSaleArr })
    }

    employeesSalesByCountryCharts = async (country) => {
        // subArr - support array with values by parameter. each value appear as the number of the sales
        // mainArr - array of objects, each object contain value (depend on the parameter) and amount of sales
        let subArr = []
        this.state.clients.forEach(c => { if (c.sold && c.country==country) { subArr.push(c.owner) } })
        subArr.sort()
        let mainArr = []
        let count = 1
        for (let i = 1; i < subArr.length; i++) {
            if (subArr[i] == subArr[i - 1]) {
                count++
            } else {
                mainArr.push({ val: subArr[i - 1], sales: count })
                count = 1
            }
        }
        // for last value:
        mainArr.push({ val: subArr[subArr.length - 1], sales: count })

        mainArr.sort((a, b) => {
            return a.val > b.val ? 1 : -1
        })
        this.setState({employeesSalesByCountry: mainArr})
    }

    //---------- Buttons ---------------------
    insertInput = async (event) => {
        let input = event.target.value
        this.setState({ input: input })
    }

    selectParam = async (event) => {
        let chosenParam = event.target.value
        await this.setState({ chosenParam })
        await this.salesByParamsCharts(chosenParam)
    }

    selectCountry = async (event) => {
        let chosenCountry = event.target.value
        await this.setState({ chosenCountry })
        await this.employeesSalesByCountryCharts(chosenCountry)
    }

    renderCountries = () => {
        let countriesArr = []
        this.state.clients.map(c => countriesArr.includes(c.country) ? null : countriesArr.push(c.country))
        countriesArr.sort()
        return (countriesArr)
    }


    // --------- Render --------
    render() {
        const { badges, topEmployees, params, salesByParams, startDate, last30DaysOfSaleArr, employeesSalesByCountry } = this.state
        const colorDesign = this.props.colorDesign
        return (
            <div className="analytics">

                <div className="badges">
                    {badges.map(b => <Badge colorDesign={colorDesign} badge={b} />)}
                </div>


                <div className="charts">

                    <div className="top-employee-chart">
                        <div>Top Employees</div>
                        <TopEmployeesChart data={topEmployees} colorDesign={colorDesign} />
                    </div >

                    <div className="sales-by-param-chart">
                        <span>Sales By: </span>
                        <select className="select-css" onChange={this.selectParam}>
                            {params.map(p => <option value={p}>{p}</option>)}
                        </select>
                        <SalesByParamsChart data={salesByParams} colorDesign={colorDesign}/>
                    </div>

                    <div className="sales-since-chart">
                        <div>{startDate}</div>
                        <SalesSinceChart data={last30DaysOfSaleArr} colorDesign={colorDesign} />
                    </div >

                    <div className="employees-sales-by-country-chart">
                        <div className="employees-sales-by-country-input">
                            <span className="employees-sale-title">Employees Sales in: </span>
                            <select className="select-css" onChange={this.selectCountry}>
                                {this.renderCountries().map(o => <option>{o}</option>)}
                            </select>
                        </div>
                        <EmployeesSalesByCountryChart data={employeesSalesByCountry} colorDesign={colorDesign}/>
                    </div >

                </div >

                <div className="LH1">LH</div>
            </div >
        )
    }
}

export default Analytics