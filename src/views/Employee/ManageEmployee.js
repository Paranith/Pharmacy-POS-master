import React, { Component } from 'react'


function createData(firstname,middlename,lastname,nic,email,username,dob,gender,datejoined,joinedposition,branchid,companyid,reports,doornumber,streetname,city,landlinenumber,mobilenumber,emergencycontactname,emcnumber,relationshipwithemc){
    return{firstname,middlename,lastname,nic,email,username,dob,gender,datejoined,joinedposition,branchid,companyid,reports,doornumber,streetname,city,landlinenumber,mobilenumber,emergencycontactname,emcnumber,relationshipwithemc};
}

const rows = [
    createData('abcd','abc','abcdef','838838849v','dfhdj@gmial.com','admin','22/05/1999','male','16/11/2020','cashier','7895d552d54d','788555d5ds22e','sjfijfd','22/52a','galle road','Bambalapity','011455485','077552256','emergency','0775525560','father'),
    createData('abcd','abc','abcdef','838838849v','dfhdj@gmial.com','admin','22/05/1999','male','16/11/2020','cashier','7895d552d54d','788555d5ds22e','sjfijfd','22/52a','galle road','Bambalapity','011455485','077552256','emergency','0775525560','father'),
    createData('abcd','abc','abcdef','838838849v','dfhdj@gmial.com','admin','22/05/1999','male','16/11/2020','cashier','7895d552d54d','788555d5ds22e','sjfijfd','22/52a','galle road','Bambalapity','011455485','077552256','emergency','0775525560','father')

]

export default class ManageEmployee extends Component{
    constructor(){
        super();
    }


   

    render(){
        return(
            <>
            <div>
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
                        <th  style={{border:"2px solid"}}>branchid</th>
                        <th  style={{border:"2px solid"}}>companyid</th>
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

                    {rows.map((row) => (
                        <tr>
                            <td style={{border:"2px solid"}}>
                            <a href="#">
          <span class="glyphicon glyphicon-pencil"></span>
        </a>
                            </td>
                            <td style={{border:"2px solid"}}>{row.firstname}</td>
                            <td style={{border:"2px solid"}}>{row.middlename}</td>
                            <td style={{border:"2px solid"}}>{row.lastname}</td>
                            <td style={{border:"2px solid"}}>{row.nic}</td>
                            <td style={{border:"2px solid"}}>{row.email}</td>
                            <td style={{border:"2px solid"}}>{row.username}</td>
                            <td style={{border:"2px solid"}}>{row.dob}</td>
                            <td style={{border:"2px solid"}}>{row.gender}</td>
                            <td style={{border:"2px solid"}}>{row.datejoined}</td>
                            <td style={{border:"2px solid"}}>{row.joinedposition}</td>
                            <td style={{border:"2px solid"}}>{row.branchid}</td>
                            <td style={{border:"2px solid"}}>{row.companyid}</td>
                            <td style={{border:"2px solid"}}>{row.reports}</td>
                            <td style={{border:"2px solid"}}>{row.doornumber}</td>
                            <td style={{border:"2px solid"}}>{row.streetname}</td>
                            <td style={{border:"2px solid"}}>{row.city}</td>
                            <td style={{border:"2px solid"}}>{row.landlinenumber}</td>
                            <td style={{border:"2px solid"}}>{row.mobilenumber}</td>
                            <td style={{border:"2px solid"}}>{row.emergencycontactname}</td>
                            <td style={{border:"2px solid"}}>{row.emcnumber}</td>
                            <td style={{border:"2px solid"}}>{row.relationshipwithemc}</td>
                        </tr>
                    ))}
                </table>

            </div>
            </>
        );
    }
}