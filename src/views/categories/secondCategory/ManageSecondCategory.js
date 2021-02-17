import React, { Component } from 'react'
import Cat01Service from '../../../Service/Categories/Cat01Service';
import Cat02Service from "../../../Service/Categories/Cat02Service";
import ReactPaginate from'react-paginate';
import '../../../scss/Pagination.css'


const style = {
    textbox : {
        width:300
    },
    tableData : {
        width:"auto"
    }
}

export default class SecondCategory extends Component {
    constructor(){
        super();

        this.state = {
            Cat01:[],
            Cat02:[],
            Cat02ByCat01Id:[],
            Cat01Id:"",
            search:"",
            name:"",
            description:"",
            status:false,
            id:"",
            status1:false,
            cat01Id:0,
            offset:0,
            perPage:5,
            orgtableData:[],
            tableData:[],
            currentPage:0,
            pageCount:0
        }
    }

    componentDidMount(){
        Cat01Service.getAllCat01()
        .then((res) => {
            this.setState({
                Cat01:res.data
            })
        });

        this.getAllCat02();
    }

    getAllCat02(){
        Cat02Service.getAllCat02()
        .then((res) => {
            this.setState({
                Cat02:res.data
            })
        

            var data = res.data;

            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage);

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
        this.getAllCat02();
        this.loadCat02withCat01Id();
    }

    

    onChangeOption = (e) =>{
        this.setState({
            Cat01Id : e.target.value
        },
        () => {this.loadCat02withCat01Id(this.state.Cat01Id);}
        )}

    onChangeSearch = (e) =>{
        this.setState({
            search : e.target.value
        });
    }

    loadCat02withCat01Id(Cat01Id){
        Cat02Service.getByCat01Id(Cat01Id)
        .then((res) => {
            this.setState({
                Cat02ByCat01Id:res.data
            })

            var data = res.data;

            var slice = data.slice(this.state.offset,this.state.offset + this.state.perPage);

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData : res.data,
                tableData:slice
            })
        });
    }


    updateStatustoDeactive = (Id) => {
        // e.preventDefault();
        let cat02 = {
            id:this.state.id,
            name:this.state.name,
            description:this.state.description,
            cat01Id:this.state.cat01Id,
            status: false
        }
        Cat02Service.addCat02(cat02)
        .then( {
        })
        window.location.reload();
    }

    updateStatustoActive = (Id) => {
        // e.preventDefault();
        let cat02 = {
            id:this.state.id,
            name:this.state.name,
            description:this.state.description,
            cat01Id:this.state.cat01Id,
            status: true
        }
        Cat02Service.addCat02(cat02)
        .then( {
        })
        window.location.reload();
    }

    loadCategory = (Id) => {
        Cat02Service.getById(Id)
        .then((res) => {
          let cat02 = res.data;
          this.setState({
              id:cat02.id,
            name:cat02.name,
            description:cat02.description,
            cat01Id:cat02.cat01Id,
            status1:cat02.status
          })
          console.log(this.state.id);
        })
      }

    render(){
        const {search,Cat02,Cat02ByCat01Id,tableData} = this.state;
        const filterallCat02 = tableData.filter( row => {
            return row.name.indexOf( search ) !== -1
        })
        const filterByCat01Id = tableData.filter(row => {
            return row.name.indexOf(search) !== -1
        })
        return(
            <>
            <h3><u>Secondary Category</u></h3>
            <a href="/addsecondcategory"><button className="btn btn-primary" style={{marginLeft:"40%"}}>Add New Secondary Category</button></a>
            <br/><br/>
            <div>
                <label>Select Main Ctegory to view subCategories :</label>&nbsp;
                <select  value={this.state.Cat01Id} onChange={this.onChangeOption} className="btn btn-info">
                    <option value="">Select</option>
                {this.state.Cat01.map(row => (
                    
                    <option className="btn btn-dark" value={row.id}>{row.name}</option>
                    
                ))}
                </select><br/><br/>
            <div className="row">
                &nbsp;&nbsp;&nbsp;&nbsp;<label>Search category by name :</label> &nbsp;
                    <input
                    className="form-control"
                    style={{width:300}}
                    value={search}
                    onChange={this.onChangeSearch}
                    />
                </div><br/>
            <table class="table table-bordered table" style={style.table}>
                <>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr></>
                    <tbody>
                        {this.state.Cat01Id === "" ? (
                            <>
                        {filterallCat02.map(row => (
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
                                <td><a href={"/updateCat02/"+row.id} style={{border:"none"}}><button className="btn btn-success">Edit</button></a></td>
                            </tr>
                        ))}</>
                        ): 
                         (
                            <>
                                 {filterByCat01Id.map(row => (
                            <tr>
                                <td style={style.tableData}>{row.name}</td>
                                <td style={style.tableData}>{row.description}</td>
                                <td>
                                        {row.status == 1 ? 
                                            (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-danger">Deactivate</button>
                                            <button onClick={(Id)=>this.updateStatustoDeactive(row.id)}>Confirm</button></div>)
                                            : 
                                            (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-success">Activate</button>
                                            <button onClick={(Id)=>this.updateStatustoActive(row.id)}>Confirm</button></div>)
                                        }
                                </td>
                                <td>
                                <td><a href={"/updateCat02/"+row.id} style={{border:"none"}}><button className="btn btn-success">Edit</button></a></td>
                                </td>
                            </tr>
                        ))}
                            </>
                        )} 
                        
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