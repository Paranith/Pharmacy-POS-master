import React, { Component } from 'react';
import EmployeeLogService from '../../Service/ActivityLog/EmployeeLogService';
import CompanyService from '../../Service/CompanyService';
import EmployeeService from '../../Service/EmployeeService';
import branchService from '../../Service/BranchService';

export default class AddEmployee extends Component{
    constructor(){
        super();

        this.state = {
            id:"",
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
            update:false,
            Emp:[],
            Changed:[], 
            message:"",
            messageStatus:false,
            company:[],
            branch:[]
        }
    }

    componentDidMount(){
        const EmpId = this.props.match.params.id;

        if(EmpId){
            this.loadEmployee(EmpId)
        }
        const path = window.location.pathname;

        if(path == "/updateEmp/"+EmpId){
            this.setState({
                update:true,
                message : "Employee updated successfully!"
            })
        }else {
            this.setState({
                message : "Employee added successfully"
            })
        }

        CompanyService.getAllCompany()
        .then(res => {
            this.setState({
                company : res.data
            })
        })

        branchService.getAllBranches()
        .then(res => {
            this.setState({
                branch : res.data
            })
        })

    }

    loadEmployee = (EmpId) => {
        EmployeeService.getEmployeeById(EmpId)
        .then((res) => {
            let Employee = res.data;
            this.setState({
            Emp:Employee,
            id:Employee.id,
            firstname:Employee.firstName,
            middlename:Employee.middleName,
            lastname:Employee.lastName,
            nic:Employee.nic,
            username:Employee.userName,
            email:Employee.email,
            gender:Employee.gender,
            dob:Employee.dateOfBirth,
            datejoined:Employee.joinedDate,
            joinedposition:Employee.joinedPosition,
            branchid:Employee.branchId,
            companyid:Employee.companyId,
            Reports:Employee.report,
            doornumber:Employee.doorNumber,
            streetname:Employee.streetName,
            city:Employee.city,
            landlinenumber:Employee.landlineNumber,
            mobilenumber:Employee.mobileNumber,
            emergencyContactname:Employee.nameofImmidiateContact,
            emergencyContactmobilenumber:Employee.immidiateContactnumber,
            relationshiptoecp:Employee.relationshipwithImmidiateContact
            })
        })
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
        console.log("name ", name);
    }

    addEmployee = (event) =>{
        event.preventDefault();

        let employee = {

            firstName : this.state.firstname,
            middleName : this.state.middlename,
            lastName : this.state.lastname,
            nic : this.state.nic,
            email : this.state.email,
            gender : this.state.gender,
            dateOfBirth : this.state.dob,
            userName : this.state.username,
            joinedDate : this.state.datejoined,
            joinedPosition : this.state.joinedposition,
            branchId : this.state.branchid,
            companyId : this.state.companyid,
            report : this.state.Reports,
            doorNumber : this.state.doornumber,
            streetName : this.state.streetname,
            city : this.state.city,
            landlineNumber : this.state.landlinenumber,
            mobileNumber : this.state.mobilenumber,
            nameofImmidiateContact : this.state.emergencyContactname,
            immidiateContactnumber : this.state.emergencyContactmobilenumber,
            relationshipwithImmidiateContact : this.state.relationshiptoecp,

        };

        EmployeeService.addEmployee(employee)
        .then(res=>{
            this.addEmployeeLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/manageemployees")
              }, 3000);
        })
    }

    addEmployeeLog = (e) => {
        let EmployeeLog = {
            description:"Employee "+this.state.lastname+" has been added",
            function:"Adding Employee",
            userId:1,
            pcName:"pc01"
        }
        EmployeeLogService.EmployeeAddedLog(EmployeeLog)
        .then(response => {

        })
    };

    UpdateEmployee = (event) =>{
        event.preventDefault();

        this.state.Emp.lastName !== this.state.lastname && (this.state.Changed.push("Last name"));
        this.state.Emp.nic !== this.state.nic && (this.state.Changed.push("NIC"));
        this.state.Emp.userName !== this.state.username && (this.state.Changed.push("User Name"));
        this.state.Emp.branchId !== this.state.branchid && (this.state.Changed.push("Branch Id"));

        let employee = {
            id:this.state.id,
            firstName : this.state.firstname,
            middleName : this.state.middlename,
            lastName : this.state.lastname,
            nic : this.state.nic,
            email : this.state.email,
            gender : this.state.gender,
            dateOfBirth : this.state.dob,
            userName : this.state.username,
            joinedDate : this.state.datejoined,
            joinedPosition : this.state.joinedposition,
            branchId : this.state.branchid,
            companyId : this.state.companyid,
            report : this.state.Reports,
            doorNumber : this.state.doornumber,
            streetName : this.state.streetname,
            city : this.state.city,
            landlineNumber : this.state.landlinenumber,
            mobileNumber : this.state.mobilenumber,
            nameofImmidiateContact : this.state.emergencyContactname,
            immidiateContactnumber : this.state.emergencyContactmobilenumber,
            relationshipwithImmidiateContact : this.state.relationshiptoecp,

        };

        EmployeeService.addEmployee(employee)
        .then(res => {
            this.updateEmployeeLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/manageemployees")
              }, 3000);
        })
    }

    updateEmployeeLog = (e) => {
        let EmployeeLog = {
            description:"Employee "+this.state.Changed+" has been updated",
            function:"Updating Employee",
            userId:1,
            pcName:"pc01"
        }
        EmployeeLogService.EmployeeAddedLog(EmployeeLog)
        .then(response => {})
    };

    render(){
        return(
            <>
            {this.state.update ? 
            (<h3><u>Update Employee</u></h3>)
            :
            (<h3><u>Add Employee</u></h3>)}
            <form>
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
            <div class="form-check" value={this.state.gender}  onChange={this.onChangeValue("gender")}>
            <input class="form-check-input" type="radio" name="exampleRadios" value="male" />
            <label class="form-check-label" for="exampleRadios1">
                Male
            </label><br/>
            <input class="form-check-input" type="radio" name="exampleRadios" value="female"/>
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
            
            <label>Branch  :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <select 
                class="btn btn-info dropdown-toggle"
                value={this.state.branchid}
                onChange={this.onChangeValue("branchid")}
                style={{width:150}}
                >
                    <option value="0">Select</option>
                    {this.state.branch.map((row)=>(
                        <option value={row.id}>{row.branchName}</option>
                    ))}
                </select><br/><br/>

                <label>Company  :&nbsp;&nbsp; </label>
                <select 
                class="btn btn-info dropdown-toggle"
                value={this.state.companyid}
                onChange={this.onChangeValue("companyid")}
                style={{width:150}}
                >
                    <option value="0">Select</option>
                    {this.state.company.map((row)=>(
                        <option value={row.id}>{row.companyName}</option>
                    ))}
                </select><br/><br/>
            </div>
            </div>
            </form>  
            <div>
                {this.state.update ? 
                (<button className="btn btn-success" onClick={this.UpdateEmployee}>Update Employee</button>)
                :
                (<button className="btn btn-success" onClick={this.addEmployee}>Add Employee</button>)}
                &nbsp;&nbsp;
                <a href="/manageemployees"><button className="btn btn-danger">Cancel</button></a>
            </div><br/><br/>

            {this.state.messageStatus && (
                <div class="alert alert-success" role="alert">
                    {this.state.message}
                </div>
            )}
            </>
        );
    }
}