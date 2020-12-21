import React, { Component } from 'react'
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
        console.log("name ", name);
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

        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.addCompany}>
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

                            {/* <label>Website</label> &nbsp;&nbsp;

                            <input
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.Website}
                                onChange={this.onChangeValue("Website")}
                            /><br /> */}

                            <label>Owner NIC</label> <br />

                            <input
                                style={{ padding: 5, width: "85%" }}
                                className="form-control"
                                type="text"
                                value={this.state.ownerNic}
                                onChange={this.onChangeValue("ownerNic")}
                            />

                            <div style={{ padding: 20, marginTop: 20 }}>
                                <button type="submit" className="btn btn-success">Save</button>&nbsp;&nbsp;
                                <button className="btn btn-info">Update</button>&nbsp;&nbsp;
                                <button className="btn btn-danger">Cancel</button>
                            </div>

                        </div>

                    </div>



                </form>

            </>
        );

    }

}