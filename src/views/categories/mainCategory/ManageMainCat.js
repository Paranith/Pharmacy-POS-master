import React, { Component } from "react";
import { Switch } from "react-switch";
import Cat01Service from "../../../Service/Categories/Cat01Service";

const style = {
    textbox : {
        width:300
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
            status1:false
        }
    }

    componentDidMount(){
        Cat01Service.getAllCat01()
        .then((res) => {
            this.setState({
                Cat01:res.data
            })
        })
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
        .then( {
            // message:"Category Added Successfully"
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
        .then( {
            // message:"Category Added Successfully"
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
            status1:cat.status
          })
          console.log(this.state.id);
        })
      }

    render(){

        const {search,Cat01} = this.state;
        const filterCat01 = Cat01.filter( row => {
            return row.name.indexOf( search ) !== -1
        })

        return(
            <>
            <h3>Main Categories</h3>
            <div style={{marginLeft:"40%"}}>
            <a href="/addMainCategory"><button class="btn btn-primary">Add New Main Category</button></a></div> <br/> <br/>
            <div>
                <div className="row">
                &nbsp;&nbsp;&nbsp;&nbsp;<label>Search category by name :</label> &nbsp;
                    <input
                    value={this.state.search}
                    onChange={this.onChangeSearch}
                    className="form-control"
                    style={{width:300}}
                    />
                </div><br/>

            <table class="table table-bordered table" style={style.table}>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        {/* <th>Change Status</th> */}
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {filterCat01.map((row) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                {/* <td>{row.status}</td> */}
                                <td>
                                    {row.status == 1 ? 
                                        (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-danger">Deactivate</button>
                                        <button onClick={(Id)=>this.updateStatustoDeactive(row.id)}>Confirm</button></div>)
                                         : 
                                         (<div><button onClick={(Id)=>this.loadCategory(row.id)} className="btn btn-success">Activate</button>
                                         <button onClick={(Id)=>this.updateStatustoActive(row.id)}>Confirm</button></div>)
                                    }
                                </td>
                                <td><a href={"/updateCat01"+row.id}><button  className="btn btn-success">Edit</button></a></td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}