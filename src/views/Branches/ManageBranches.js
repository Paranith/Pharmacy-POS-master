import React, { Component } from 'react'
import BranchService from '../../Service/BranchService';

export default class ManageBranches extends Component {
    constructor(){
        super();

        this.state={
            branches:[],
            search:""
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
                <input
                type="text"
                value={search}
                onChange={this.onchangeSearch}
                placeholder="Search Branch By Name"
                /><br/><br/>
            <table class="table table-sm">
                <thead>
                    <tr>
                    {/* <th scope="col">No</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Door No</th>
                    <th scope="col">Street Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Code</th>
                    </tr>
                </thead>
                <tbody>
                    {filterbranches.map((row) => (
                        <tr>
                            <td>{row.branchName}</td>
                            <td>{row.mobile}</td>
                            <td>{row.addr1}</td>
                            <td>{row.addr2}</td>
                            <td>{row.addr3}</td>
                            <td>{row.code}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
            </>
        );
    }
}