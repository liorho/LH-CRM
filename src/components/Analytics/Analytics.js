import React, { Component } from 'react'

import Badge from './Badge'
import TopEmployeesChart from './TopEmployeesChart'
import SalesByParamsChart from './SalesByParamsChart'
import SalesSinceChart from './SalesSinceChart'
import EmployeesSalesByCountryChart from './EmployeesSalesByCountryChart'
import newClientsIcon from './img/new-clients.png'
import emailIcon from './img/e-mail.png'
import outstandingClientsIcon from './img/outstanding-clients.png'
import hottestCountryIcon from './img/hottest-country.png'

const axios = require('axios')
const moment = require('moment')

class Analytics extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            badges: [
                { val: 0, text: "", url: newClientsIcon },
                { val: 0, text: "Emails Sent", url: emailIcon },
                { val: 0, text: "Outstanding Clients", url: outstandingClientsIcon },
                { val: 0, text: "Hottest Country", url: hottestCountryIcon }
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
            employeesSalesByCountry: [],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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
        if (this.state.chosenCountry === "") {
            await this.employeesSalesByCountryCharts(this.renderCountries()[0])
        } else {
            await this.employeesSalesByCountryCharts(this.state.chosenCountry)

        }
    }

    //------ Supporting algorythm  ----------
    salesByParamCalc = (param) => {
        let subArr = []
        this.state.clients.forEach(c => { if (c.sold) { subArr.push(c[param]) } })
        if (param === "firstContact") {
            for (let i = 0; i < subArr.length; i++) {
                let date = moment(subArr[i], 'YYYY/MM/DD')
                subArr[i] = date.format('M')
            }
        }
        subArr.sort()
        let setArr = new Set(subArr)
        let results = []
        setArr.forEach(s => results.push({ val: s, sales: subArr.filter(sub => sub === s).length }))
        if (param === "emailType") results.splice(results.length - 1, 1)
        if (param === "firstContact") {
            results.forEach(m => m.val = this.state.months[parseInt(m.val) - 1])
            for (let i = 0; i < 3; i++) {
                results[12] = results[1]
                results.splice(1, 1)
            }
        }
        return (results)
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
            if (date.format('M') === thisMonth && date.format('YYYY') === thisYear) { count++ }
        })
        thisMonth = this.state.months[thisMonth - 1];
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
        let salesByCountries = this.salesByParamCalc("country")
        salesByCountries.sort((a, b) => {
            return a.sales > b.sales ? -1 : 1
        })
        let badges = this.state.badges
        badges[3].val = salesByCountries[0].val
        await this.setState({ badges })
    }

    //---------- Charts ---------------------
    findTopEmployees = async () => {
        let topEmployeesArr = this.salesByParamCalc("owner")
        topEmployeesArr.sort((a, b) => {
            return a.sales > b.sales ? -1 : 1
        })
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
        let salesByParams = this.salesByParamCalc(param)
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
            if (moment(subSalesByDaysArr[i], 'YYYY/MM/DD').format('D') === moment(subSalesByDaysArr[i - 1], 'YYYY/MM/DD').format('D')) {
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
                if (listOfLast30Days[i] === salesByDaysArr[j].val) {
                    last30DaysOfSaleArr.push(salesByDaysArr[j])
                    count++
                }
            }
            if (count === 0) {
                last30DaysOfSaleArr.push({ val: listOfLast30Days[i], sales: 0 })
            }
        }

        startDate = "Sales Since " + startDate.format('DD/MM/YYYY')
        await this.setState({ startDate, last30DaysOfSaleArr })
    }

    employeesSalesByCountryCharts = async (country) => {
        let subArr = []
        this.state.clients.forEach(c => { if (c.sold && c.country === country) { subArr.push(c.owner) } })
        subArr.sort()
        let setArr = new Set (subArr)
        let mainArr = []
        setArr.forEach(s => mainArr.push({val: s, sales: subArr.filter(sub => sub===s).length}) )
        this.setState({ employeesSalesByCountry: mainArr })
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
                        <SalesByParamsChart data={salesByParams} colorDesign={colorDesign} />
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
                        <EmployeesSalesByCountryChart data={employeesSalesByCountry} colorDesign={colorDesign} />
                    </div >

                </div >

                <div className="LH1">LH</div>
            </div >
        )
    }
}

export default Analytics