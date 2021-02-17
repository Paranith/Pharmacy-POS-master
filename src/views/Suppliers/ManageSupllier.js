import React, { Component } from 'react'
import SupplierService from '../../Service/SupplierService';
import ReactPaginate from 'react-paginate';
import '../../scss/Pagination.css'

export default class ManageSupplier extends Component{
    constructor(){
        super();

        this.state = {
            Supplier : [],
            offset:0,
            perPage:5,
            orgtableData: [],
            tableData: [],
            currentPage:0,
            pageCount:0
        }
    }

    componentDidMount(){
        this.getAllSupplier();
    }


    getAllSupplier(){
        SupplierService.getAllSuppliers()
        .then(res => {
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
        this.getAllSupplier();
    }

    render(){
        const {tableData} = this.state;
        return(
            <>
            <table class="table table-bordered table" >
                <tr>
                    <th>Shop Name</th>
                    <th>Contact Person</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Email</th>
                </tr>
                {tableData.map((row) => (
                        <tr key={row.id}>
                        <td>{row.shopName}</td>
                        <td>{row.contactperson}</td>
                        <td>{row.contactNumber}</td>
                        <td>{row.address}</td>
                        <td>{row.city}</td>
                        <td>{row.email}</td>
                        {/* <td><a href={"/updateItems/"+row.id}><button  className="btn btn-success">Edit</button></a></td> */}

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
            </>
        );
    }
}