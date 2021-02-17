import React, { Component } from 'react'
import CompanyLogService from '../../Service/ActivityLog/CompanyLogService';
import CompanyService from '../../Service/CompanyService';

export default class AddCompany extends Component {
    constructor() {
        super();

        this.state = {
            CompanyName: "",
            DoorNumber: "",
            StreetName: "",
            City: "",
            ownerName: "",
            Mobile: "",
            Email: "",
            ownerNic: "",
            // Website: ""
        }
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    addCompany = (event) => {
        event.preventDefault();
        let company = {
            companyName: this.state.CompanyName,
            ownerName: this.state.ownerName,
            ownerNic: this.state.ownerNic,
            email: this.state.Email,
            mob: this.state.Mobile,
            addr1: this.state.DoorNumber,
            addr2: this.state.StreetName,
            addr3: this.state.City,
        };
        CompanyService.addCompany(company)
        .then(res => {
            this.addCompanyLog();
            
        })
    }
    addCompanyLog = (e) => {
        let AddCompany = {
            description:"Company "+this.state.CompanyName+" has been added",
            function:"Adding Company",
            userId:1,
            pcName:"pc01"
        }
        CompanyLogService.AddCompanyLog(AddCompany)
        .then(response => {})
    };

    

    render() {
        return (
            <>
                <form>
                    <h3><u>Manage Company</u></h3> <br />
                    <div className="row">
                        <div className="col-sm">
                            <label>Company name</label> &nbsp;&nbsp;


                            <input
                                required
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.CompanyName}
                                onChange={this.onChangeValue("CompanyName")}
                            />&nbsp;&nbsp;&nbsp;&nbsp;   <br />


                            <label>Owner Name</label> &nbsp;&nbsp;


                            <input
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.ownerName}
                                onChange={this.onChangeValue("ownerName")}
                            /><br />




                            <label>Address</label>


                            <input
                                required
                                className="form-control"
                                placeholder="Door Number"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.DoorNumber}
                                onChange={this.onChangeValue("DoorNumber")}
                            />&nbsp;&nbsp; &nbsp;&nbsp; <br />

                            <input
                                required
                                className="form-control"
                                placeholder="Street Name"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.StreetName}
                                onChange={this.onChangeValue("StreetName")}
                            /> <br />

                            <input
                                required
                                className="form-control"
                                placeholder="City"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.City}
                                onChange={this.onChangeValue("City")}
                            /><br />
                        </div>

                        <div className="col-sm">

                            <label>Mobile Number</label> &nbsp;&nbsp;


                            <input
                                required
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.Mobile}
                                onChange={this.onChangeValue("Mobile")}
                            /><br />



                            <label>Email</label> &nbsp;&nbsp;


                            <input
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.Email}
                                onChange={this.onChangeValue("Email")}
                            /><br />


                            <label>Owner NIC</label> <br />

                            <input
                                style={{ padding: 5, width: "85%" }}
                                className="form-control"
                                type="text"
                                value={this.state.ownerNic}
                                onChange={this.onChangeValue("ownerNic")}
                            />
                        </div>
                    </div>
                </form>
                <div style={{ padding: 20, marginTop: 20 }}>
                                <button type="submit" className="btn btn-success" onClick={this.addCompany}>Save</button>&nbsp;&nbsp;
                                <button className="btn btn-info">Update</button>&nbsp;&nbsp;
                                <a href="/"><button className="btn btn-danger">Cancel</button></a>
                </div>
            </>
        );

    }

}