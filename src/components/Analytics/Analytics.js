import React, { Component } from 'react';

import Badge from './Badge';
import TopEmployeesChart from './TopEmployeesChart';
import SalesByParamsChart from './SalesByParamsChart';
import SalesSinceChart from './SalesSinceChart';
import EmployeesSalesByCountryChart from './EmployeesSalesByCountryChart';

import newClientsIcon from './img/new-clients.png';
import emailIcon from './img/e-mail.png';
import outstandingClientsIcon from './img/outstanding-clients.png';
import hottestCountryIcon from './img/hottest-country.png';

const moment = require('moment');
const equal = require('fast-deep-equal');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SALES_BY_PARAMS = ['Country', 'Email Type', 'Employee', 'Month (All Time)'];

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      badges: [
        { id: 'newClients', val: 0, text: '', icon: newClientsIcon },
        { id: 'emailsSent', val: 0, text: 'Emails Sent', icon: emailIcon },
        { id: 'outstandingClient', val: 0, text: 'Outstanding Clients', icon: outstandingClientsIcon },
        { id: 'hottestCountry', val: '', text: 'Hottest Country', icon: hottestCountryIcon },
      ],
      topEmployees: [],
      salesByParams: [],
      last30DaysOfSaleArr: [],
      employeesSalesByCountry: [],
      startDate: '',
    };
  }

  //---------- Start ------------------
  componentDidMount = () => {
    if (this.props.clients.length) this.calculations();
  };

  componentDidUpdate(prevProps) {
    if (!equal(this.props.clients, prevProps.clients)) {
      this.calculations();
    }
  }

  calculations = () => {
    this.numOfNewClientsCalc();
    this.numOfEmailSentCalc();
    this.numOfOutstandingClientsCalc();
    this.hottestCountryCalc();
    this.findTopEmployees();
    this.salesByParamsCharts('Country');
    this.salesSinceCharts(30);
    this.employeesSalesByCountryCharts(this.renderCountries()[0]);
  };

  //------ Supporting algorythm  ----------

  salesByParamCalc = (params) => {
    const data = {};
    this.props.clients
      .filter((c) => c.sold)
      .forEach((c) => {
        if (params === 'firstContact') {
          data[MONTHS[parseInt(new Date(c[params]).getMonth())]] = data[MONTHS[parseInt(new Date(c[params]).getMonth())]]
            ? data[MONTHS[parseInt(new Date(c[params]).getMonth())]] + 1
            : 1;
        } else {
          if (c[params]) data[c[params]] = data[c[params]] ? data[c[params]] + 1 : 1;
        }
      });
    const dataArr = Object.entries(data)
      .map(([key, value]) => {
        return { val: key, sales: value };
      })
      .sort((a, b) => (params === 'firstContact' ? (MONTHS.indexOf(a.val) > MONTHS.indexOf(b.val) ? 1 : -1) : a.val > b.val ? 1 : -1));

    return dataArr;
  };

  renderCountries = () => [...new Set(this.props.clients.map((c) => c.country))].sort();

  //---------- Badges ---------------------
  numOfNewClientsCalc = () => {
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    let numOfNewClients = this.props.clients.filter(
      (c) => moment(c.firstContact, 'YYYY/MM/DD').format('M') == thisMonth && moment(c.firstContact, 'YYYY/MM/DD').format('YYYY') == thisYear
    ).length;
    const badges = [...this.state.badges];
    const newClientsBadge = badges.find((b) => (b.id = 'newClients'));
    newClientsBadge.val = numOfNewClients;
    newClientsBadge.text = 'New ' + MONTHS[thisMonth - 1] + ' Clients';
    this.setState({ badges });
  };

  numOfEmailSentCalc = () => {
    const numOfEmailSent = this.props.clients.filter((c) => c.emailType).length;
    const badges = [...this.state.badges];
    badges.find((b) => b.id === 'emailsSent').val = numOfEmailSent;
    this.setState({ badges });
  };

  numOfOutstandingClientsCalc = () => {
    const numOfOutstandingClients = this.props.clients.filter((c) => !c.sold).length;
    const badges = [...this.state.badges];
    badges.find((b) => b.id === 'outstandingClient').val = numOfOutstandingClients;
    this.setState({ badges });
  };

  hottestCountryCalc = () => {
    let salesByCountries = this.salesByParamCalc('country');
    salesByCountries.sort((a, b) => {
      return a.sales > b.sales ? -1 : 1;
    });
    const badges = [...this.state.badges];
    badges.find((b) => b.id === 'hottestCountry').val = salesByCountries[0].val;
    this.setState({ badges });
  };

  //---------- Charts ---------------------
  findTopEmployees = () => {
    const topEmployeesArr = this.salesByParamCalc('owner')
      .sort((a, b) => (a.sales > b.sales ? -1 : 1))
      .splice(0, 3);
    this.setState({ topEmployees: topEmployeesArr });
  };

  salesByParamsCharts = (param) => {
    const paramsMap = { Country: 'country', 'Email Type': 'emailType', Employee: 'owner', 'Month (All Time)': 'firstContact' };
    const salesByParams = this.salesByParamCalc(paramsMap[param]);
    this.setState({ salesByParams });
  };

  salesSinceCharts = (days) => {
    const last30DaysOfSale = {};
    let startDate = moment().subtract(days, 'days');
    // create salesPerDay
    this.props.clients.forEach((c) => {
      if (startDate.isBefore(c.firstContact) && c.sold)
        last30DaysOfSale[moment(c.firstContact).format('MMM D')] = last30DaysOfSale[moment(c.firstContact).format('MMM D')]
          ? last30DaysOfSale[moment(c.firstContact).format('MMM D')] + 1
          : 1;
    });
    // populate salesPerDay with days without sales
    for (let i = 1; i <= days; i++){
      if (!last30DaysOfSale[moment(moment().subtract(i, 'days'), 'YYY/MM/DD').format('MMM D')] ) last30DaysOfSale[moment(moment().subtract(i, 'days'), 'YYY/MM/DD').format('MMM D')] = 0
    }
    // converting salesPerDay from object to array
    const last30DaysOfSaleArr = Object.entries(last30DaysOfSale)
      .map(([key, value]) => {
        return { val: key, sales: value };
      })
      .sort((a, b) => {
        return new Date(a.val) > new Date(b.val) ? 1 : -1;
      });

    startDate = 'Sales Since ' + startDate.format('DD/MM/YYYY');
    this.setState({ startDate, last30DaysOfSaleArr });
  };

  employeesSalesByCountryCharts = (country) => {
    const employeesSales = {};
    this.props.clients
      .filter((c) => c.sold && c.country === country)
      .forEach((c) => (employeesSales[c.owner] = employeesSales[c.owner] ? employeesSales[c.owner] + 1 : 1));
    const employeesSalesArr = Object.entries(employeesSales).map(([key, value]) => {
      return { val: key, sales: value };
    });
    this.setState({ employeesSalesByCountry: employeesSalesArr });
  };

  //---------- Buttons ---------------------

  selectSalesByParam = (event) => this.salesByParamsCharts(event.target.value);

  selectEmployeesSalesInCountry = (event) => this.employeesSalesByCountryCharts(event.target.value);

  // --------- Render --------
  render() {
    const { badges, topEmployees, salesByParams, startDate, last30DaysOfSaleArr, employeesSalesByCountry } = this.state;
    const { isColor } = this.props;
    return (
      <div className='analytics'>
        {/* Badges */}
        <div className='badges'>
          {badges.map((b) => (
            <Badge key={b.text} isColor={isColor} badge={b} />
          ))}
        </div>

        {/* Charts */}
        <div className='charts'>
          <div className='top-employee-chart'>
            <div>Top Employees</div>
            <TopEmployeesChart data={topEmployees} isColor={isColor} />
          </div>

          <div className='sales-by-param-chart'>
            <span>Sales By: </span>
            <select className='select-css' onChange={this.selectSalesByParam}>
              {SALES_BY_PARAMS.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <SalesByParamsChart data={salesByParams} isColor={isColor} />
          </div>

          <div className='sales-since-chart'>
            <div>{startDate}</div>
            <SalesSinceChart data={last30DaysOfSaleArr} isColor={isColor} />
          </div>

          <div className='employees-sales-by-country-chart'>
            <div className='employees-sales-by-country-'>
              <span className='employees-sale-title'>Employees Sales in: </span>
              <select className='select-css' onChange={this.selectEmployeesSalesInCountry}>
                {this.renderCountries().map((o, i) => (
                  <option key={i}>{o}</option>
                ))}
              </select>
            </div>
            <EmployeesSalesByCountryChart data={employeesSalesByCountry} isColor={isColor} />
          </div>
        </div>

        <div className='LH1'>LH</div>
      </div>
    );
  }
}

export default Analytics;
