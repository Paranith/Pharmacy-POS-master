import React, { Component } from 'react'

export default class AddCompany extends Component {
    constructor() {
        super();

        this.state = {
            CompanyName: "",
            DoorNumber: "",
            StreetName: "",
            City: "",
            Telephone: "",
            Mobile: "",
            Email: "",
            Logo: "",
            Website: ""
        }
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
        console.log("name ", name);
    }

    render() {
        return (
            <>
                <form>
                    <h3><u>Manage Company</u></h3> <br />
                    <div class="row">
                        <div class="col-sm">
                            <label>Company name</label> &nbsp;&nbsp;


                            <input
                                required
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.CompanyName}
                                onChange={this.onChangeValue("CompanyName")}
                            />&nbsp;&nbsp;&nbsp;&nbsp;   <br />


                            <label>Telephone Number</label> &nbsp;&nbsp;


                            <input
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.Telephone}
                                onChange={this.onChangeValue("Telephone")}
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

                        <div class="col-sm">

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

                            <label>Website</label> &nbsp;&nbsp;

                            <input
                                className="form-control"
                                type="text"
                                style={{ padding: 5, width: "85%" }}
                                value={this.state.Website}
                                onChange={this.onChangeValue("Website")}
                            /><br />

                            <label>Logo</label> <br />

                            <input
                                style={{ padding: 5, width: "85%" }}
                                className="btn btn-secondary"
                                type="file"
                                value={this.state.Logo}
                                onChange={this.onChangeValue("Logo")}
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