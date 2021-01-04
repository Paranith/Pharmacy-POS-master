import React, { Component } from 'react'
import Cat01Service from '../../../Service/Categories/Cat01Service';
import Cat02Service from "../../../Service/Categories/Cat02Service";


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
            Cat01Id:0,
            search:"",
            name:"",
            description:"",
            status:false
        }
    }

    componentDidMount(){
        Cat01Service.getAllCat01()
        .then((res) => {
            this.setState({
                Cat01:res.data
            })
        });

        Cat02Service.getAllCat02()
        .then((res) => {
            this.setState({
                Cat02:res.data
            })
        })
    }
    componentDidUpdate(){
        this.loadCat02withCat01Id(this.state.Cat01Id);
    }

    loadCat02withCat01Id(Cat01Id){
        Cat02Service.getByCat01Id(Cat01Id)
        .then((res) => {
            this.setState({
                Cat02ByCat01Id:res.data
            })
        });
    }

    onChangeOption = (e) =>{
        this.setState({
            Cat01Id : e.target.value
        });
    }
    onChangeSearch = (e) =>{
        this.setState({
            search : e.target.value
        });
    }

    render(){
        const {search,Cat02,Cat02ByCat01Id} = this.state;
        const filterallCat02 = Cat02.filter( row => {
            return row.name.indexOf( search ) !== -1
        })
        const filterByCat01Id = Cat02ByCat01Id.filter(row => {
            return row.name.indexOf(search) !== -1
        })
        return(
            <>
            <h3>Secondary Category</h3>
            <a href="/addsecondcategory"><button className="btn btn-primary" style={{marginLeft:"40%"}}>Add New Secondary Category</button></a>
            <br/><br/>
            <div>
                <label>Select Main Ctegory to view subCategories :</label>&nbsp;
                <select  value={this.state.Cat01Id} onChange={this.onChangeOption} className="btn btn-info">
                    <option value="0">Select</option>
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
                        {this.state.Cat01Id == "0" ? (
                            <>
                        {filterallCat02.map(row => (
                            <tr>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>
                                    {/* {row.status == 1 ? 
                                        (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-danger">Deactivate</button>
                                        <button onClick={(Id)=>this.updateStatustoDeactive(row.id)}>Confirm</button></div>)
                                         : 
                                         (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-success">Activate</button>
                                         <button onClick={(Id)=>this.updateStatustoActive(row.id)}>Confirm</button></div>)
                                    } */}
                                </td>
                                <td><a href={"/updateCat02/"+row.id}><button className="btn btn-success">Edit</button></a></td>
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
                                        {/* {row.status == 1 ? 
                                            (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-danger">Deactivate</button>
                                            <button onClick={(Id)=>this.updateStatustoDeactive(row.id)}>Confirm</button></div>)
                                            : 
                                            (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-success">Activate</button>
                                            <button onClick={(Id)=>this.updateStatustoActive(row.id)}>Confirm</button></div>)
                                        } */}
                                </td>
                            </tr>
                        ))}
                            </>
                        )} 
                        
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}