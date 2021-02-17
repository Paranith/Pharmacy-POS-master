import React, { Component } from "react";
import { Switch } from "react-switch";
import MainCategoryLog from "../../../Service/ActivityLog/MainCategoryLog";
import Cat01Service from "../../../Service/Categories/Cat01Service";
import ReactPaginate from 'react-paginate';
import '../../../scss/Pagination.css';
import Modal from 'react-modal'

const style = {
    textbox : {
        width:300
    },
    alert : {

    }
}

export default class ManageMainCat extends Component{
    constructor(){
        super();

        this.state = {
            Cat01:[],
            search:"",
            status:false,
            id:"",
            name:"",
            description:"",
            status1:false,
            offset:0,
            perPage:5,
            orgtableData:[],
            tableData:[],
            currentPage:0,
            pageCount:0,
            // confirm:false,
            // statusMessage:""
        }
    }

    componentDidMount(){
        this.getAllCatergory01();
    }

    getAllCatergory01() {
        Cat01Service.getAllCat01()
        .then((res) => {
            this.setState({
                Cat01:res.data
            })

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
        this.getAllCatergory01();
    }

    onChangeSearch = e => {
        this.setState({
            search: e.target.value
        })
    }    

    onChangeId = e => {
        this.setState({
            id: e.target.value
        })
    }    

    onChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }    

    onChangedescription = e => {
        this.setState({
            description: e.target.value
        })
    }    

    onChangeStatus1 = e => {
        this.setState({
            status1: e.target.value
        })
    }    


    updateStatustoDeactive = (Id) => {
        // e.preventDefault();
        let Cat01 = {
            id:this.state.id,
            name:this.state.name,
            description:this.state.description,
            status: false
        }
        Cat01Service.addCat01(Cat01)
        .then(res => {
            this.addMainCatLogDeactivated();
            
        })
        window.location.reload();
    }

    updateStatustoActive = (Id) => {
        // e.preventDefault();
        let Cat01 = {
            id:this.state.id,
            name:this.state.name,
            description:this.state.description,
            status: true
        }
        Cat01Service.addCat01(Cat01)
        .then(res => {
            this.addMainCatLogActivated();
            
        })
        window.location.reload();
    }

    loadCategory = (Id) => {
        Cat01Service.getCat01ById(Id)
        .then((res) => {
          let cat = res.data;
          this.setState({
              id:cat.id,
            name:cat.name,
            description:cat.description ,
            status1:cat.status,
          })
        })
      }

    addMainCatLogActivated = (e) => {
        let MainCat1 = {
            description:"Category "+this.state.name+" has been Activated",
            function:"Activating Category 01",
            userId:1,
            pcName:"pc01"
        }
        MainCategoryLog.MainCatLog(MainCat1)
        .then(response => {})
    };

    addMainCatLogDeactivated = (e) => {
        let MainCat = {
            description:"Category "+this.state.name+" has been Deactivated",
            function:"Deactivating Category 01",
            userId:1,
            pcName:"pc01"
        }
        MainCategoryLog.MainCatLog(MainCat)
        .then(response => {})
    };

    

    render(){

        const {search,Cat01,tableData,confirm} = this.state;
        const filterCat01 = tableData.filter( row => {
            return row.name.indexOf( search ) !== -1
        })

        return(
            <>
            <h3>Main Categories</h3>
            <div style={{marginLeft:"40%"}}>
            <a href="/addMainCategory"><button class="btn btn-primary">Add New Main Category</button></a></div> <br/> <br/>
            <div>
                <div className="row">
                <br/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 5">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg> &nbsp;&nbsp;
                    <input
                    value={this.state.search}
                    onChange={this.onChangeSearch}
                    className="form-control"
                    style={{width:300}}
                    placeholder="Search category by name"
                    />
                </div><br/>

                <div class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Save changes</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>

            <table class="table table-bordered table" style={style.table}>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {filterCat01.map((row) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>
                                    {row.status == 1 ? 
                                        (<div><button 
                                        onClick={(Id)=>this.loadCategory(row.id)
                                        } 
                                        
                                        className="btn btn-danger">
                                            Deactivate
                                        </button>

                                        <button onClick={(Id)=>this.updateStatustoDeactive(row.id)}>Confirm</button>

                                        {/* {confirm && (
                                            <div 
                                            style={{
                                                height:"25%",
                                                minHeight:150,
                                                width:"40%",
                                                position:"fixed",
                                                borderRadius:"20px",
                                                top:"30%",
                                                left:"40%",
                                                transform:'translate(-50%, -50%)',
                                                backgroundColor:"#FFF",
                                                padding:"50px",
                                                zIndex:1000,
                                                transition:'2s'
                                            }}
                                            >
                                                <h2>Action</h2>
                                                <p>Do you want to {this.state.statusMessage} the category</p>
                                                <div>
                                                    <button onClick={(Id)=>this.updateStatustoDeactive(this.state.id)}>
                                                        confirm
                                                    </button>
                                                    <button onClick={()=>{this.setState({confirm:false})}}>
                                                        close
                                                    </button>
                                                </div>
                                            </div>
                                            )} */}
                                            </div>
                                        )
                                        
                                         : 
                                         (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-success">Activate</button>
                                         <button onClick={(Id)=>this.updateStatustoActive(row.id)}>Confirm</button>
                                         {/* {confirm && (
                                            <div 
                                                style={{
                                                height:"25%",
                                                minHeight:150,
                                                width:"40%",
                                                position:"fixed",
                                                borderRadius:"20px",
                                                top:"30%",
                                                left:"40%",
                                                transform:'translate(-50%, -50%)',
                                                backgroundColor:"#FFF",
                                                padding:"50px",
                                                zIndex:1000,
                                                transition:'2s'
                                            }}
                                            >
                                                <h2>Action</h2>
                                                <p>Do you want to {this.state.statusMessage} the category</p>
                                                <div>
                                                    <button onClick={(Id)=>this.updateStatustoActive(this.state.id)}>
                                                        confirm
                                                    </button>
                                                    <button onClick={()=>{this.setState({confirm:false})}}>
                                                        close
                                                    </button>
                                                </div>
                                            </div>
                                            )} */}
                                            </div>)
                                    }
                                </td>
                                <td><a href={"/updateCat01"+row.id}><button  className="btn btn-success">Edit</button></a></td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
                <div>
                {/* <button onClick={()=>{this.setState({confirm:true})}}>open</button> */}
                
                </div>
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