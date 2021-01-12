import React, { Component } from 'react'
import BranchLogService from '../../Service/ActivityLog/BranchLogService';
import BranchService from '../../Service/BranchService';
import ManageBranches from './ManageBranches'

export default class AddBranch extends Component {
    constructor() {
        super();

        this.state = {
            id:"",
            name:"",
            code:"",
            doornumber:"",
            streetname:"",
            city:"",
            companyId:"1001",
            mobile:"",
            update:false
        }
    }

    componentDidMount(){
        const BranchId = this.props.match.params.id;
        if(BranchId){
            this.loadBranch(BranchId)
        }
        const path = window.location.pathname;

        if(path == "/updateBranch/"+BranchId){
            this.setState({
                update:true
            })
        }
    }

    loadBranch = (BranchId) => {
        BranchService.getBranchById(BranchId)
        .then((res) => {
            let Branch = res.data;
            this.setState({
                id:Branch.id,
                name:Branch.branchName,
                code:Branch.code,
                doornumber:Branch.addr1,
                streetname:Branch.addr2,
                city:Branch.addr3,
                companyId:Branch.companyId,
                mobile:Branch.mobile
            })
        })
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
        console.log("name ", name);
    }

    AddBranch = (event) => {
        event.preventDefault();
        let branch = {
            branchName : this.state.name,
            mobile : this.state.mobile,
            addr1 : this.state.doornumber,
            addr2 : this.state.streetname,
            addr3 : this.state.city,
            code : this.state.code,
            companyId : this.state.companyId,
        }
        BranchService.addBranch(branch)
        .then((res => {
            this.addBranchLog();
        }))
    }

    addBranchLog = (e) => {
        let BranchLog = {
            description:"Branch "+this.state.name+" has been added",
            function:"Adding Branch",
            userId:1,
            pcName:"pc01"
        }
        BranchLogService.BranchAddedLog(BranchLog)
        .then(response => {})
    };

    render() {
        return (
            <>
            <form
            onSubmit={this.AddBranch}
            >
            {this.state.update ? 
            (<h3>Update Branch</h3>)
            :
            (<h3>Add New Branch</h3>)}
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

                <label>Mobile Number</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.mobile}
                    onChange={this.onChangeValue("mobile")}
                /><br/>

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
                {this.state.update ?
                (<button type="submit" className="btn btn-success">Update</button>):
                    (<button type="submit" className="btn btn-success">Add</button>)}&nbsp;&nbsp;
                    <button className="btn btn-danger">Cancel</button>
            </div>
            <br/><br/>
            </form>
            <ManageBranches/>
            </>
        );
    }
}