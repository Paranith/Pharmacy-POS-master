import React, { Component } from 'react'
import ManageBranches from './ManageBranches'

export default class AddBranch extends Component {
    constructor() {
        super();

        this.state = {
            name:"",
            code:"",
            doornumber:"",
            streetname:"",
            city:""
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
            <div className="row">
            <div className="col-sm">
                <label>Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.name}
                    onChange={this.onChangeValue("name")}
                /> <br/>

                <label>Code</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.code}
                    onChange={this.onChangeValue("code")}
                />

               

            </div>


            <div className="col-sm">
                <label>Address</label>
                <input
                    required
                    className="form-control"
                    placeholder="Door Number"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.doornumber}
                    onChange={this.onChangeValue("doornumber")}
                />  <br />


                <input
                    required
                    className="form-control"
                    placeholder="Street Name"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.streetname}
                    onChange={this.onChangeValue("streetname")}
                /> <br />


                <input
                    required
                    className="form-control"
                    placeholder="City"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.city}
                    onChange={this.onChangeValue("city")}
                /><br />
            </div>
            </div>
            <div style={{ padding: 20, marginTop: 20 }}>
                    <button type="submit" className="btn btn-success">Add</button>&nbsp;&nbsp;
                    <button className="btn btn-danger">Cancel</button>
            </div>
            <br/><br/>
            <ManageBranches/>
            </>
        );
    }
}