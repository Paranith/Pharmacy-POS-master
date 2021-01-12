import React, { Component } from 'react'
import BranchService from '../../Service/BranchService';

export default class ManageBranches extends Component {
    constructor(){
        super();

        this.state={
            branches:[],
            search:"",
            // status:false
        }
    }

    componentDidMount(){
        BranchService.getAllBranches()
        .then((res) => {
            this.setState({
                branches:res.data
            })
        })


    }

    onchangeSearch = e => {
        this.setState({ search : e.target.value})
    }

    render(){

        const {search,branches} = this.state;
        const filterbranches = branches.filter( row => {
            return row.branchName.indexOf( search ) !== -1
        })

        return(
            <>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
</svg> &nbsp;
                <input
                type="text"
                value={search}
                onChange={this.onchangeSearch}
                placeholder="Search Branch By Name"
                />
                <i className="cil-magnifying-glass"></i>
                <br/><br/>
            <table class="table table-bordered table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Door No</th>
                    <th>Street Name</th>
                    <th>City</th>
                    <th>Code</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterbranches.map((row) => (
                        <tr key={row.id}>
                            <td>{row.branchName}</td>
                            <td>{row.mobile}</td>
                            <td>{row.addr1}</td>
                            <td>{row.addr2}</td>
                            <td>{row.addr3}</td>
                            <td>{row.code}</td>
                            <td><a href={"/updateBranch/"+row.id}><button  className="btn btn-success">Edit</button></a></td>

                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
            </>
        );
    }
}