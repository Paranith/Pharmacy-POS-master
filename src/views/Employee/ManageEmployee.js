import React, { Component } from 'react'
import EmployeeService from '../../Service/EmployeeService';



export default class ManageEmployee extends Component{
    constructor(){
        super();

        this.state = {
            employees : [],
            search:""
        }
    }


    componentDidMount(){
        EmployeeService.getAllEmployees()
        .then((res) => {
            this.setState({
                employees:res.data
            })
        })
    }

    onchangeSearch = e => {
        this.setState({ search : e.target.value})
    }
   

    render(){

        const {search,employees} = this.state;
        const filteremployees = employees.filter( row => {
            return row.userName.indexOf( search ) !== -1
        })

        return(
            <>
            <div>
                <label><b>Search Employee with Username :</b></label> &nbsp;
                <input  value={search} onChange={this.onchangeSearch} />
                <table style={{width:"100vw"}}>
                    <tr style={{border:"2px solid"}}>
                        <th>Actions</th>
                        <th  style={{border:"2px solid"}}>firstname</th>
                        <th  style={{border:"2px solid"}}>middlename</th>
                        <th  style={{border:"2px solid"}}>lastname</th>
                        <th  style={{border:"2px solid"}}>nic</th>
                        <th  style={{border:"2px solid"}}>email</th>
                        <th  style={{border:"2px solid"}}>username</th>
                        <th  style={{border:"2px solid"}}>dob</th>
                        <th  style={{border:"2px solid"}}>gender</th>
                        <th  style={{border:"2px solid"}}>datejoined</th>
                        <th  style={{border:"2px solid"}}>joinedposition</th>
                        {/* <th  style={{border:"2px solid"}}>branchid</th> */}
                        {/* <th  style={{border:"2px solid"}}>companyid</th> */}
                        <th  style={{border:"2px solid"}}>reports</th>
                        <th  style={{border:"2px solid"}}>doornumber</th>
                        <th  style={{border:"2px solid"}}>streetname</th>
                        <th  style={{border:"2px solid"}}>city</th>
                        <th  style={{border:"2px solid"}}>landlinenumber</th>
                        <th  style={{border:"2px solid"}}>mobilenumber</th>
                        <th  style={{border:"2px solid"}}>emergencycontactname</th>
                        <th  style={{border:"2px solid"}}>emcnumber</th>
                        <th  style={{border:"2px solid"}}>relationshipwithemc</th>
                    </tr>

                    {filteremployees.map((row) => (
                        <tr>
                            <td style={{border:"2px solid"}}>
                            <a href="#">
          <span class="glyphicon glyphicon-pencil"></span>
        </a>
                            </td>
                            <td style={{border:"2px solid"}}>{row.firstName}</td>
                            <td style={{border:"2px solid"}}>{row.middleName}</td>
                            <td style={{border:"2px solid"}}>{row.lastName}</td>
                            <td style={{border:"2px solid"}}>{row.nic}</td>
                            <td style={{border:"2px solid"}}>{row.email}</td>
                            <td style={{border:"2px solid"}}>{row.userName}</td>
                            <td style={{border:"2px solid"}}>{row.dateOfBirth}</td>
                            <td style={{border:"2px solid"}}>{row.gender}</td>
                            <td style={{border:"2px solid"}}>{row.joinedDate}</td>
                            <td style={{border:"2px solid"}}>{row.joinedPosition}</td>
                            {/* <td style={{border:"2px solid"}}>{row.branchId}</td> */}
                            {/* <td style={{border:"2px solid"}}>{row.companyId}</td> */}
                            <td style={{border:"2px solid"}}>{row.report}</td>
                            <td style={{border:"2px solid"}}>{row.doorNumber}</td>
                            <td style={{border:"2px solid"}}>{row.streetName}</td>
                            <td style={{border:"2px solid"}}>{row.city}</td>
                            <td style={{border:"2px solid"}}>{row.landlineNumber}</td>
                            <td style={{border:"2px solid"}}>{row.mobileNumber}</td>
                            <td style={{border:"2px solid"}}>{row.nameofImmidiateContact}</td>
                            <td style={{border:"2px solid"}}>{row.immidiateContactnumber}</td>
                            <td style={{border:"2px solid"}}>{row.relationshipwithImmidiateContact}</td>
                        </tr>
                    ))}
                </table>

            </div>
            </>
        );
    }
}