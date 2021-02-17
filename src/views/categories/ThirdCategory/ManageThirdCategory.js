import React, { Component } from 'react'
import Cat03Service from '../../../Service/Categories/Cat03Service';
import ReactPaginate from 'react-paginate';
import '../../../scss/Pagination.css'


const style = {
    textbox : {
        width:300
    }
}

export default class ThirdCategory extends Component {
    constructor(){
        super();
        
        this.state = {
            Cat03 : [],
            search:"",
            name:"",
            description:"",
            status:false,
            id:0,
            status1:false,
            cat02Id:0,
            offset:0,
            perPage:5,
            orgtableData:[],
            tableData:[],
            currentPage:0,
            pageCount:0
        }
    }

    componentDidMount(){
        this.getAllCat03();
    }

    getAllCat03(){
        Cat03Service.getAllCat03()
        .then((res)=>{
            this.setState({
                Cat03:res.data
            });
            var data = res.data;

            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage);

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
        this.getAllCat03();
    }

    onChangeSearch = (e) =>{
        this.setState({
            search : e.target.value
        });
    }

    updateStatustoDeactive = (Id) => {
        // e.preventDefault();
        let Cat03 = {
            id:this.state.id,
            name:this.state.name,
            description:this.state.description,
            cat02Id:this.state.cat02Id,
            status: false
        }
        Cat03Service.addCat03(Cat03)
        .then({
        })
        window.location.reload();
    }

    updateStatustoActive = (Id) => {
        // e.preventDefault();
        let Cat03 = {
            id:this.state.id,
            name:this.state.name,
            description:this.state.description,
            cat02Id:this.state.cat02Id,
            status: true
        }
        Cat03Service.addCat03(Cat03)
        .then( {
        })
        window.location.reload();
    }

    loadCategory = (Id) => {
        Cat03Service.getById(Id)
        .then((res) => {
          let cat03 = res.data;
          this.setState({
            id:cat03.id,
            name:cat03.name,
            description:cat03.description,
            cat02Id:cat03.cat02Id,
            status1:cat03.status
          })
          console.log(this.state.id);
        })
      }

    render(){
        const {search,Cat03,tableData} = this.state;

        const filterallCat03 = tableData.filter(row => {
            return row.name.indexOf( search ) !== -1
        })
        return(
            <>
            <h3><u>Third Category</u></h3>
            <a href="/addthirdcategory"><button className="btn btn-primary" style={{marginLeft:"40%"}}>Add New Third Category</button></a>
            <br/><br/>
            <div className="row">
                &nbsp;&nbsp;&nbsp;&nbsp;<label>Search category by name :</label> &nbsp;
                    <input
                    className="form-control"
                    style={{width:300}}
                    value={search}
                    onChange={this.onChangeSearch}
                    />
                </div><br/>
            <div>
            <table class="table table-bordered table" style={style.table}>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {filterallCat03.map(row => (
                            <tr>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>
                                    {row.status == 1 ? 
                                        (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-danger">Deactivate</button>
                                        <button onClick={(Id)=>this.updateStatustoDeactive(row.id)}>Confirm</button></div>)
                                         : 
                                         (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-success">Activate</button>
                                         <button onClick={(Id)=>this.updateStatustoActive(row.id)}>Confirm</button></div>)
                                    }
                                </td>
                                <td><a href={"/updateCat03/"+row.id}><button className="btn btn-success">Edit</button></a></td>

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