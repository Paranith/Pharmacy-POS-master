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
            update:false,
            BranchDet:[],
            Changed:[],
            messageStatus:false,
            message:""
        }
    }

    componentDidMount(){
        const BranchId = this.props.match.params.id;
        if(BranchId){
            this.loadBranch(BranchId)
        }
        const path = window.location.pathname;

        // if(path == "/updateBranch/"+BranchId){
        //     this.setState({
        //         update:true
        //     })
        // }

        if(path == "/updateBranch/"+BranchId){
            this.setState({
                update : true,
                message : "Branch Updated Successfully"
            })
        }else{
            this.setState({
                message : "Branch added successfully"
            })
        }
    }

    loadBranch = (BranchId) => {
        BranchService.getBranchById(BranchId)
        .then((res) => {
            let Branch = res.data;
            this.setState({
                BranchDet:Branch,
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
        .then(res => {
            this.addBranchLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/managebranches")
              }, 3000);
        })
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

    UpdateBranch = (event) => {
        event.preventDefault();

        if(this.state.BranchDet.name !== this.state.name){
            this.state.Changed.push("Name")
        }
        if(this.state.BranchDet.mobile !== this.state.mobile){
            this.state.Changed.push("Mobile Number")
        }
        if(this.state.BranchDet.addr1 !== this.state.doornumber){
            this.state.Changed.push("Door Number")
        }
        if(this.state.BranchDet.addr2 !== this.state.streetname){
            this.state.Changed.push("Street Name")
        }
        if(this.state.BranchDet.addr3 !== this.state.city){
            this.state.Changed.push("city")
        }
        if(this.state.BranchDet.code !== this.state.code){
            this.state.Changed.push("Code")
        }
        if(this.state.BranchDet.companyId !== this.state.companyId){
            this.state.Changed.push("Company Id")
        }

        let branch = {
            id : this.state.id,
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
            this.updateBranchLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/managebranches")
              }, 3000);
        }))
    }

    updateBranchLog = (e) => {
        let BranchLog = {
            description:"Branch "+this.state.Changed+" has been updated",
            function:"Updating Branch",
            userId:1,
            pcName:"pc01"
        }
        BranchLogService.BranchAddedLog(BranchLog)
        .then(response => {})
    };

    

    render() {
        return (
            <>
            <form>
            {this.state.update ? 
            (<h3><u>Update Branch</u></h3>)
            :
            (<h3><u>Add New Branch</u></h3>)}
            <div className="row">
            <div className="col-sm">
                <label>Name</label>
                <input
                    className="form-control"
                    type="text"
                    required
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.name}
                    onChange={this.onChangeValue("name")}
                /> <br/>

                <label>Mobile Number</label>
                <input
                    required
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.mobile}
                    onChange={this.onChangeValue("mobile")}
                /><br/>

                <label>Code</label>
                <input
                    required
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
            
            </form>
            <div style={{ padding: 20, marginTop: 20 }}>
                {this.state.update ?
                (<button type="submit" className="btn btn-success" onClick={this.UpdateBranch}>Update</button>):
                    (<button type="submit" className="btn btn-success" onClick={this.AddBranch}>Add</button>)}&nbsp;&nbsp;
                    <a href="/managebranches"><button className="btn btn-danger">Cancel</button></a>
            </div>
            <br/><br/>
            {this.state.messageStatus && (
                <div class="alert alert-success" role="alert">
                    {this.state.message}
                </div>
            )}
            <br/><br/>
            <ManageBranches/>
            </>
        );
    }
}