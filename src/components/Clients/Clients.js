import React, { Component } from 'react'
import Client from './Client'
import DetailsPopUp from './DetailsPopUp'
import SuccessPopUp from '../PopUps/SuccessPopUp';
import ErrorPopUp from '../PopUps/ErrorPopUp'

class Clients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            category: "Name",
            currentPage: 1,
            clientsPerPage: 13,
            detailsPopUp: {},
            errorPopUp: false,
            successPopUp: false
        }
    }

    //--------Error/Sucess POP-UP -------
    handlePopUp = (type, val) => {
        this.setState({ [type]: val });
        setTimeout(() => { this.setState({ [type]: !val }) }, 3000)
    }

    //------- Pagination ---------
    moveToPage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    createPageNumbers = () => {
        const clients = this.filterClients()
        const clientsPerPage = this.state.clientsPerPage
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(clients.length / clientsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers
    }

    currentClients = () => {
        const { currentPage, clientsPerPage } = this.state
        const indexOfLastClient = currentPage * clientsPerPage
        const indexOfFirstClient = indexOfLastClient - clientsPerPage

        const currentClients = this.filterClients().slice(indexOfFirstClient, indexOfLastClient)

        return currentClients
    }

    previousPage = async () => {
        let pageNumber = this.createPageNumbers()
        if (this.state.currentPage !== 1) {
            let currentPage = this.state.currentPage
            currentPage--
            await this.setState({currentPage})
        }
    }

    nextPage = async () => {
        let pageNumber = this.createPageNumbers()
        if (this.state.currentPage !== pageNumber.length) {
            let currentPage = this.state.currentPage
            currentPage++
            await this.setState({currentPage})
        }
    }

    //------- Buttons ------------
    insertInput = (event) => {
        let input = event.target.value
        this.setState({ input: input, currentPage: 1 })
    }

    //------ Functions --------
    selectCategory = (event) => {
        let category = event.target.value
        this.setState({ category })
    }

    filterClients = () => {
        let category = this.state.category
        let clients = this.props.clients
        let input = this.state.input.toLowerCase()
        switch (category) {
            case "Name": return clients.filter(c => c.name.toLowerCase().includes(input))
            case "Country": return clients.filter(c => c.country.toLowerCase().includes(input))
            case "Owner": return clients.filter(c => c.owner.toLowerCase().includes(input))
            case "Email Type": return input === "" ? clients.filter(c => c.emailType === null) : clients.filter(c => c.emailType ? c.emailType.toLowerCase().includes(input) : null)
            case "Email": return clients.filter(c => c.email.toLowerCase().includes(input))
            case "Sold": return clients.filter(c => c.sold ? ("yes").includes(input) : ("no").includes(input))
            default: return clients
        }
    }

    // ----------- Update/Delete Client Pop-Up -------
    detailsPopUp = async (data) => {
        await this.setState({
            detailsPopUp: { clientDetails: data, popUpStatus: true }
        })
    }

    updateClientPopUp = async (data) => {
        if (data.country !== "" && data.name !== "" && data.email !== "") {
            await this.props.updateClientPopUp(data)
            let detailsPopUp = this.state.detailsPopUp
            detailsPopUp.popUpStatus = false
            await this.setState(detailsPopUp)
            this.handlePopUp("successPopUp", true)
        } else {
            this.handlePopUp("errorPopUp", true)
        }
    }

    deleteClient = async (id) => {
        await this.props.deleteClient(id)
        let detailsPopUp = this.state.detailsPopUp
        detailsPopUp.popUpStatus = false
        await this.setState(detailsPopUp)
        this.handlePopUp("successPopUp", true)
    }

    cancelUpdate = async () => {
        let detailsPopUp = this.state.detailsPopUp
        detailsPopUp.popUpStatus = false
        await this.setState(detailsPopUp)
    }

    // --------- Render --------
    render() {
        let pageNumbers = this.createPageNumbers()
        let { detailsPopUp, errorPopUp, successPopUp} = this.state
        let categories = ["Name", "Country","Email", "Owner", "Sold", "Email Type"]
        let titles = ["First Name", "Last Name", "Country", "Email", "Owner", "Sold", "Contact Date", "Email-Type"]
        return (
            <div className="clients-component">

                <div className="search-clients">
                    <input type="text" value={this.state.input} onChange={this.insertInput} />
                    <select className="select-css" onChange={this.selectCategory}>
                        {categories.map(c => <option value={c}>{c}</option>)}
                    </select>
                </div>

                <table>
                    <tr className="table-header">
                        {titles.map(t => <th className="table-header-th">{t}</th>)}
                    </tr>
                    {this.currentClients().map(c => <Client client={c} detailsPopUp={this.detailsPopUp} />)}
                </table>

                <div className="LH1">LH</div>


                {/* Pagination */}
                    <div className="page-numbers">
                        <img onClick={this.previousPage} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDz3RTC3y_USgip_Zs4iESvqTxyfAUpOdop2yzbRJpnZmmL4HGOQ"/>
                        <span>{this.state.currentPage}</span><span>/</span><span>{pageNumbers.length}</span>
                        <img onClick={this.nextPage} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEAAADECAMAAACoYGR8AAAAjVBMVEX///8AAADy8vL7+/vu7u6RkZGoqKjOzs7q6uqBgYHe3t74+PjIyMi2trbx8fHn5+fCwsLU1NRpaWmLi4tbW1s3NzeampqmpqaysrIgICB7e3tkZGTS0tJNTU0zMzOgoKAYGBhycnILCwspKSlRUVE+Pj5HR0dXV1ckJCQ1NTUaGhqFhYU9PT2Xl5d8fHzj7u3sAAAKGElEQVR4nOVd62KyMAwVxRuogDrvl+F1m7r3f7zv8xLWAC1tQdBw/jknNkdoc5I0rVQKgd3eT+tOMd/9EnBWxhWNosdRHAbGHf2iB1IYNg8GjI1X9FAKgvGHddFjKQZnhoKhXfRoikDbYNEsejgFoIEYMOpFjyd/WJgBY9krekR5wzTCcIseUt44RCg4FT2knOFHGDD2raIHlSsmUQYMo1v0qPLEAnzCFUvBrFb0uPJDD4y2kGvwYRU9sPywfdjcqLjoSSiPXISpsF2ptJYsBf2yOMngFR6uLwYsBdOSPAlNMPj+asNyUA65WAumwtvL3pClYFgteHS5AKbCyeP1iKXgswxycfYwNvCGvR+WgxLIxTW4AMFf7D5LwZK8kwxeocH8DYUNNtTlYgssZWOlFnKS24UNLh9ArBDpoZrPUrCnnVOZx//SWDWSloswFe5Cf299sBT4hOUieIXTiPuD5OKKrpPsgI3Rh70schE8oJhn3URxxDlVuQhSYBD3Zp2l4ItodhGmwmHsux30JIxyHls+CJ72+LftI0vBkaJcrPKnwjuwXOzkOrh8AGERrtuzQIETgnKxn2habc5ScDBzHFwuuDwsWwr+Z4wmRGpyEab7jeifrClLAbHsYuAVih1fn6VgRUou2hANSLi5u+hJICUXwStMmuUdFDjxcxlbPgDXN94rZIHk4hcduQhT4SpZ+hCVi0E5kcT01kJysU8lcAI+n9Q6j7KLP0TkImSN5RzezifLAY3sIniFkhXWvR1LAYnsIqz0Qq+QBZKLFIpRg7SJ9M/pfbEUZCQXex3X9QrK0oEp8pLHRnIxk2LUwOf8mA/Wk6Zj57nQgFeoMq3houT0chHH4+5UDGeDsWs55vO5gBUu2StkgLOLqeWiH2UA8Lk6DGcjt+M9LzIBN+CP0qdsNOi02UU+ASw2+/5l3F2YWT8igrSJEFnKRTkG/u6LQ/+33uhYTjb18FWY2lXjoA5yklMVoyoyEODnYzlvj92mlc4vgZC4uoeXWTGqLgMMpkt/1HC9qs4PAXbM1T+alVzMgAGWivZlsrAc+fsCzDhrDN3Exai6NyNcwPK664G/ROJDn4r9rn9q/H9EEoW/Bx/RcslQdnGqKRfh8wGDtuVO1rPjCsVo9bE9/q4brsVdROD/Flqjb6Lv0pOLEQYC9KxFZ3zqD/fZcLHd+adR17Na+L6AciLN3CguRtXKLvIZCFA1neZkNOjvURJLn4rD0a9POou7CwBeoXb8c81e+0dDLkowwKDquZORv9xmM10Yq+HAB17Uh/6Ah+7R2GoEIdQYCGBaTXfd7h/PGXFhGPpOTcpiVE0GALVqy+k0Lqf5R9QmNaQJd6QqRk3JAIvWotuo9w9ferdFqgh4mmLUDBkI0PKa3dFsvvtWmTpTpoJ89lp7FSf5GQwA7F7Lcsf19nAVNjd7BvTl4jMZYOE0u43BfD/l3hapq2R0i1HzYgBQc/4/InV/vtxiAg4ZXBvJxa3sk5A3AwFss2V11/XZ7hYiyGa7qZZcLIwBBrXMvhwXow6laH0FBrKEulykxkAo+H1J/gA5BipVRblIj4FQdnGTtMxSZEBt7yJJBpSKUWkyoJJdpMpAxUJOpyC7SJaBkFz85ublCDMgKRcpM1Bx2CZ4PP1NmoFK5cRSEC8XiTMgIRepM5Dc6oY8A+FWNxG5WAIGKh3kJIezi2VgoFJFexdDxailYCCUXcTZmZIwEMousnKxLAyEsouHv0qw0jDAlYslYqBifcetCWVioFKbsRQ8YumlYuC/XGSydo9ii5IxYLOB5LuLXC4G8Falu4tcKgZwx/grGqViwIorY1iUiIF1jP3XwFFZGOgtYwkwNmVhoBtv/7UBRikYwE3/EMalYABvUkSYl2ItqHPtv7mF5BlwOFOgAV2eqDPQ4NoPcWPaDPTmfAKgVzRpBlx+ifMyyKRSZiAqAwIwFVZ0GfD41cwrNm1CloF4GXADLmAlyoC54xMQKqmhyYDLtz/SvoQiA3h3PkY0f06QAY+/Bsa1tqPHQIIMiIAaA86eaz/nbBBiDCTLgAhIMYDLyjG4e68KZuC+7ag9zqQ1uUAG7PiNTgpiILL1LIM2tLN4468Q7WzPkYHb9sMGb/th2pY/3jbuqjd8Czfb5MBAy2q6o9+kLagpu+2N+FduizdcPY8BU20bsvq2efa7+KGwxOcrWwZSbEVP02eOmw0wjHlO+4wyaEeg31hKTQZEkIqBLFtSaM+Eix/uNc8yzb7UGaiazuLaluSQTVsSgC4BqjJAn4Gqteg0Bn5WrWnC0GhKdYXFlwFTya4WSQxk3J6IC4nNoTEQyQDZvdyxDNhm696iiv+IZQ2dNiSmjgzgMnB1zG3H60zq/vzAzzQ+DRpduVz+RKTSkAY+8zs88/tDPB8andkEMkDJv8zPSCEkezb/QZARVzwKLUcrER7tYKFjwliRgAv/ygkyoGgGvoeD8aQTtASuwoOnNhHiVhMYyh1d8jD71out63pRDy3o36/kkk74X5UsAyJI3U2Lj9VxdlpH+/GxgMN6VPqy4Y0CGJPkj0cgcCo1sT221xNBT0YWMJ/P5Afc5PtmUjIggt6Ze0EVfO13/cHEbTpq0xBEi+R/uwF/DLr6unc6G9qOwNfOb1/+3+gKvVlZ2HAd2fVLIAO+UvXy9xUNn+5mo2vz0bQtrIO+MZL/P+YPyU8XbRbcWozZ5+X8NJZpQCsN3nm38TCP/MGlPecppoF9gJ9rn+5JU/dGF0J40GcYAhlwTH/8QlQDfh78y7jr9Z56nAHElmR+Qc1sgCyqdyfrc7UcztZux8qmL3sSFDrXe/w1ME3PchZWt2M5OR+hCA/fNnFmEWUD8hjpsyB7gkUrSxnwUoC5PSFCJsoGvPdh0LbU8Q1Zy4BXgtRE2OSvgXoy4JUAIld0jMuJaz+F03/BOn6qwOLLtqleu//XQmKE7Hky4EUA1nBEnUJh7JsiOMAj3u/uPlUGvARgIvyIfdfn3wA0znas/NkY59YKZMCZzkm3UPkUU+QgyAYQOvfbBJsivyldGYABB/F8hpW4IBvAK4x9T3AiZFXCMiAE2AmIJ0KBDEh7juGroQbJKta5qdGWARjBMbfMRGjxU3hbCjIAIyZVINgfJ38mx/sA8pXBRCgojFU9oeg9AKkCiHQLQmHHnAO4OQHMe/y8Pp8A1fKSN0EQIbtlojz+GvhBbA0MADf99PoidWHsO4I51rDFz4hTON2eB1j51zr74yigBkZ2yiMDMIIIWXlkQAgCBfyAXq35+8BPsH+reXbx+0AQBbqCogzAMIX205QBGJ6IgCFNGYAh0MFUZUAIPtf+98+Iy4GbD6ErA0LgbeAiLANCiI8HSu+PI4DYgFDawtj3QrRAdE8kIy4NZ91FvfOyKIx9OzA1MvRlQCz+GJgRjoSIsAACSiADOLgnCedlkAE8uIfVrvA18B/+LIZhmIT5KQAAAABJRU5ErkJggg=="/>
                        </div>


                {/* POP-UP HANDLING */}
                {detailsPopUp.popUpStatus ? <DetailsPopUp detailsPopUp={detailsPopUp.clientDetails} updateClientPopUp={this.updateClientPopUp} deleteClient={this.deleteClient} cancelUpdate={this.cancelUpdate} /> : null}

                {errorPopUp ? < ErrorPopUp /> : null}

                {successPopUp ? <SuccessPopUp /> : null}
            </div>
        )
    }
}

export default Clients