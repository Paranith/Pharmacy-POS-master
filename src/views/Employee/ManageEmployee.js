import React, { Component } from 'react'
import EmployeeService from '../../Service/EmployeeService';
import ReactPaginate from 'react-paginate';
import '../../scss/Pagination.css'



export default class ManageEmployee extends Component{
    constructor(){
        super();

        this.state = {
            employees : [],
            search:"",
            offset:0,
            perPage:5,
            orgtableData: [],
            tableData: [],
            currentPage:0,
            pageCount:0
        }
    }


    componentDidMount(){
        this.getAllEmployees();
    }

    getAllEmployees(){
        EmployeeService.getAllEmployees()
        .then((res) => {
            this.setState({
                employees:res.data
            })

            var data = res.data;

            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData : res.data,
                tableData:slice
            })
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    };

    onChangeperpage = (e) => {
        this.setState({
            perPage : e.target.value
        });
        this.getAllEmployees();
    }

    onchangeSearch = e => {
        this.setState({ search : e.target.value})
    }
   

    render(){

        const {search,employees,tableData} = this.state;
        const filteremployees = tableData.filter( row => {
            return row.userName.indexOf( search ) !== -1
        })

        return(
            <>
            <div>
                <label><b>Search Employee with Username :</b></label> &nbsp;
                <input  value={search} onChange={this.onchangeSearch} />
                <table class="table table-bordered table">
                    <tr  >
                        <th>Actions</th>
                        <th>firstname</th>
                        <th>middlename</th>
                        <th>lastname</th>
                        <th>nic</th>
                        <th>email</th>
                        <th>username</th>
                        {/* <th>dob</th> */}
                        {/* <th>gender</th> */}
                        <th>datejoined</th>
                        <th>joinedposition</th>
                        {/* <th>branchid</th> */}
                        {/* <th>companyid</th> */}
                        <th>reports</th>
                        {/* <th>doornumber</th> */}
                        {/* <th>streetname</th> */}
                        {/* <th>city</th> */}
                        {/* <th>landlinenumber</th> */}
                        <th>mobilenumber</th>
                        {/* <th>emergencycontactname</th> */}
                        {/* <th>emcnumber</th> */}
                        {/* <th>relationshipwithemc</th> */}
                    </tr>

                    {filteremployees.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <a href={"/updateEmp/"+row.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></a>
                            </td>
                            <td>{row.firstName}</td>
                            <td>{row.middleName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.nic}</td>
                            <td>{row.email}</td>
                            <td>{row.userName}</td>
                            {/* <td>{row.dateOfBirth}</td> */}
                            {/* <td>{row.gender}</td> */}
                            <td>{row.joinedDate}</td>
                            <td>{row.joinedPosition}</td>
                            {/* <td>{row.branchId}</td> */}
                            {/* <td>{row.companyId}</td> */}
                            <td>{row.report}</td>
                            {/* <td>{row.doorNumber}</td> */}
                            {/* <td>{row.streetName}</td> */}
                            {/* <td>{row.city}</td> */}
                            {/* <td>{row.landlineNumber}</td> */}
                            <td>{row.mobileNumber}</td>
                            {/* <td>{row.nameofImmidiateContact}</td> */}
                            {/* <td>{row.immidiateContactnumber}</td> */}
                            {/* <td>{row.relationshipwithImmidiateContact}</td> */}
                        </tr>
                    ))}
                </table>
                <div className="row">
                <div className="col-sm">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </div> 
                    &nbsp;
                    <div className="col-sm">
                        <span>Rows per page : &nbsp;</span>
                <select value={this.state.perPage} onChange={this.onChangeperpage} class="btn btn-info dropdown-toggle">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                </div>
                </div>
            </div>
            </>
        );
    }
}