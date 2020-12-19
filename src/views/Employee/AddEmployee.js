import React, { Component } from 'react'

export default class AddEmployee extends Component{
    constructor(){
        super();

        this.state = {
            firstname:"",
            middlename:"",
            lastname:"",
            nic:"",
            username:"",
            email:"",
            gender:"",
            dob:"",
            datejoined:"",
            joinedposition:"",
            branchid:"",
            companyid:"",
            Reports:"",
            doornumber:"",
            streetname:"",
            city:"",
            landlinenumber:"",
            mobilenumber:"",
            emergencyContactname:"",
            emergencyContactmobilenumber:"",
            relationshiptoecp:"",


        }
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
        console.log("name ", name);
    }

    render(){
        return(
            <>
            <h3>Add Employee</h3>
            <div className="row">
            <div className="col-sm">
            <label>First Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.firstname}
                    onChange={this.onChangeValue("firstname")}
                /> <br/>

            <label>Middle Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.middlename}
                    onChange={this.onChangeValue("middlename")}
                /> <br/>

            <label>Last Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.lastname}
                    onChange={this.onChangeValue("lastname")}
                /> <br/>

            <label>NIC Number</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.nic}
                    onChange={this.onChangeValue("nic")}
                /> <br/>

            <label>Email</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.email}
                    onChange={this.onChangeValue("email")}
                /> <br/>

            <label>Username</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.username}
                    onChange={this.onChangeValue("username")}
                /> <br/>

            <label>Date of Birth</label>
                <input
                    className="form-control"
                    type="date"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.dob}
                    onChange={this.onChangeValue("dob")}
                /> <br/>
            <label>Gender :</label>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios"  value={this.state.gender}  onChange={this.onChangeValue("gender")}/>
            <label class="form-check-label" for="exampleRadios1">
                Male
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" value={this.state.gender} onChange={this.onChangeValue("gender")}/>
            <label class="form-check-label" for="exampleRadios2">
                Female
            </label>
            </div> <br/>


            <label>Date Joined</label>
                <input
                    className="form-control"
                    type="date"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.datejoined}
                    onChange={this.onChangeValue("datejoined")}
                /> <br/>

            

            

            <label>Joined Position</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.joinedposition}
                    onChange={this.onChangeValue("joinedposition")}
                /> <br/>

            </div>

            <div className="col-sm">

            <label>Branch Id</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.branchid}
                    onChange={this.onChangeValue("branchid")}
                /> <br/>

            <label>Company Id</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.companyid}
                    onChange={this.onChangeValue("companyid")}
                /> <br/>

            <label>Reports</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.Reports}
                    onChange={this.onChangeValue("Reports")}
                /> <br/>

            <div>
            <label>Address</label>
                <input
                    placeholder="Door Number"
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.doornumber}
                    onChange={this.onChangeValue("doornumber")}
                /> <br/>

                <input
                    placeholder="Street Name"
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.streetname}
                    onChange={this.onChangeValue("streetname")}
                /> <br/>

                <input
                    placeholder="City"
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.city}
                    onChange={this.onChangeValue("city")}
                /> <br/>
                </div>

            <label>Landline Number</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.landlinenumber}
                    onChange={this.onChangeValue("landlinenumber")}
                /> <br/>

            <label>Mobile Number</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.mobilenumber}
                    onChange={this.onChangeValue("mobilenumber")}
                /> <br/>

            <label>Immidiate Contact Person Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.emergencyContactname}
                    onChange={this.onChangeValue("emergencyContactname")}
                /> <br/>

            <label>Immidiate Contact Person Mobile Number</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.emergencyContactmobilenumber}
                    onChange={this.onChangeValue("emergencyContactmobilenumber")}
                /> <br/>

            <label>Relationship with Immidiate Contact Person</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.relationshiptoecp}
                    onChange={this.onChangeValue("relationshiptoecp")}
                /> <br/>
            </div>
            </div>
            <div>
                <button type="submit" className="btn btn-success">Add Employee</button>&nbsp;&nbsp;
                <button className="btn btn-danger">Cancel</button>
            </div>
                
            </>
        );
    }
}