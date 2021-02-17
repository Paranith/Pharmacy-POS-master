import React, { Component } from 'react'
import ItemService from '../../Service/ItemService'
import ReactPaginate from 'react-paginate';
import '../../scss/Pagination.css'


const style = {
    textbox : {
        width:300
    }
}

export default class ManageItems extends Component { 
    constructor(){
        super()

        this.state = {
            Items : [],
            offset:0,
            perPage:5,
            orgtableData: [],
            tableData: [],
            currentPage:0,
            pageCount:0
        }
    }

    componentDidMount(){
        this.getAllItems();
    }

    getAllItems(){
        ItemService.getAllItems()
        .then(res =>{
            this.setState({
                Items : res.data
            });
            var data = res.data;

            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData : res.data,
                tableData:slice
            })
        });
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
        this.getAllItems();
    }

    render(){
        const {Items,tableData} = this.state;
        return(
            <>
                <table class="table table-bordered table" style={style.table}>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Current Stock</th>
                        <th>Actions</th>
                    </tr>
                    {tableData.map((row) => (
                        <tr key={row.id}>
                        <td>{row.itemName}</td>
                        <td>{row.description}</td>
                        <td>{row.numberofItems}</td>
                        <td><a href={"/updateItems/"+row.id}><button  className="btn btn-success">Edit</button></a></td>

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
        )
    }
}