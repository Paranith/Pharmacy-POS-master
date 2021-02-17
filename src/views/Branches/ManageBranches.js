import React, { Component } from 'react'
import BranchService from '../../Service/BranchService';
import ReactPaginate from 'react-paginate';
import '../../scss/Pagination.css'

export default class ManageBranches extends Component {
    constructor(){
        super();

        this.state={
            branches:[],
            search:"",offset:0,
            perPage:5,
            orgtableData: [],
            tableData: [],
            currentPage:0,
            pageCount:0
            // status:false
        }
    }

    componentDidMount(){
        this.getAllBranches();
    }

    getAllBranches(){
        BranchService.getAllBranches()
        .then((res) => {
            this.setState({
                branches:res.data
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
        this.getAllBranches();
    }

    onchangeSearch = e => {
        this.setState({ search : e.target.value})
    }

    render(){

        const {search,branches,tableData} = this.state;
        const filterbranches = tableData.filter( row => {
            return row.branchName.indexOf( search ) !== -1
        })

        return(
            <>
            <div><br/>
            <h3><u>Manage branches</u></h3><br/>
            <div className="row">
                <input
                type="text"
                value={search}
                onChange={this.onchangeSearch}
                placeholder="Search Branch By Name"
                className="form-control"
                style={{width:300}}
                />&nbsp;&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 5">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg> </div>
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