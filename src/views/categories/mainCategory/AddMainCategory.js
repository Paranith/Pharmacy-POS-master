import React, { Component } from 'react'
import Cat01Service from '../../../Service/Categories/Cat01Service';

const style = {
    textbox : {
        width:300
    }
}

export default class AddCategory01 extends Component{
    constructor(){
        super();

        this.state = {
            id:"",
            catoneName:"",
            catoneDescription:"",
            status:1,
            message:"",
            update:false
        }
    }

    componentDidMount(){
        const Cat01Id = this.props.match.params.id;
    if(Cat01Id){
      this.loadCategory(Cat01Id);
    }
        const path = window.location.pathname;
        // console.log(path);

        if (path == "/updateCat01"+Cat01Id){
            this.setState({
                 update:true })
        }
    }

    loadCategory = (Cat01Id) => {
        Cat01Service.getCat01ById(Cat01Id)
        .then((res) => {
          let cat = res.data;
          this.setState({
            id:cat.id,
            catoneName:cat.name,
            catoneDescription:cat.description 
          })
        })
      }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
        console.log("name ", name);
    }

    saveCategory= (event) =>{
        event.preventDefault();
        let Cat01 = {
            id:this.state.id,
            name:this.state.catoneName,
            description:this.state.catoneDescription,
            status: this.state.status
        }
        Cat01Service.addCat01(Cat01)
        .then( {
            message:"Category Added Successfully"
        })
    }

    render(){
        return(
            <>
            <div>
            <form onSubmit={this.saveCategory}>
                {this.state.update ? 
                (<h3>Update Category 01(Main Category)</h3>)
                :
                (
                    <h3>Add New Category 01 (Main Category)</h3>
                )}
                <label>Name</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.catoneName}
                onChange={this.onChangeValue("catoneName")}
                />
                <label>Description</label>
                <textarea
                required
                className="form-control"
                style={style.textbox}
                value={this.state.catoneDescription}
                onChange={this.onChangeValue("catoneDescription")}
                /><br/>
                {this.state.update ? 
                (<button type="submit" className="btn btn-info">Update</button>)
                :
                (
                    <button type="submit" className="btn btn-success">Add</button> 
                )}&nbsp;
                <button className="btn btn-danger">Cancel</button>
                {this.state.message && (
                    <div>
                    {this.state.message}
                </div>
                )}
            </form>
            </div><br/><br/>
            
            </>
        );
    }
}