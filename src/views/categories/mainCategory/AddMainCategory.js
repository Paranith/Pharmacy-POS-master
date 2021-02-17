import React, { Component } from 'react'
import MainCategoryLog from '../../../Service/ActivityLog/MainCategoryLog';
import Cat01Service from '../../../Service/Categories/Cat01Service';

const style = {
    textbox : {
        width:400
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
            update:false,
            CatOne:[],
            Changed:[],
            messageStatus:false,
            message:""
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
                update : true,
                message : "Main Category updated successfully"
                })
        }else {
            this.setState({
                message : "Main Category added Successfully"
            })
        }
    }

    loadCategory = (Cat01Id) => {
        Cat01Service.getCat01ById(Cat01Id)
        .then((res) => {
          let Cat01 = res.data;
          this.setState({
            CatOne:Cat01,
            id:Cat01.id,
            catoneName:Cat01.name,
            catoneDescription:Cat01.description 
          })
        })
      }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    saveCategory= (event) =>{
        event.preventDefault();
        let Cat01 = {
            // id:this.state.id,
            name:this.state.catoneName,
            description:this.state.catoneDescription,
            status: this.state.status
        }
        Cat01Service.addCat01(Cat01)
        .then(res => {
            this.addMaincatLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/managemaincategory")
              }, 3000);
        })
    }

    UpdateCategory= (event) =>{
        event.preventDefault();

        if(this.state.CatOne.name !== this.state.catoneName){
            this.state.Changed.push("Name")
        }
        if(this.state.CatOne.description !== this.state.catoneDescription){
            this.state.Changed.push("Description")
        } else {
            this.state.Changed.push("nothing")
        }

        let Cat01 = {
            id:this.state.id,
            name:this.state.catoneName,
            description:this.state.catoneDescription,
            status: this.state.status
        }
        Cat01Service.addCat01(Cat01)
        .then(res => {
            this.UpdateMaincatLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/managemaincategory")
              }, 3000);
        })
    }

    addMaincatLog = (e) => {
        let MainCatLog = {
            description:"Main Category "+this.state.catoneName+" has been added",
            function:"Adding Main Category ",
            userId:1,
            pcName:"pc01"
        }
        MainCategoryLog.MainCatLog(MainCatLog)
        .then(response => {
        })
    };

    UpdateMaincatLog = (e) => {
        let MainCatLog = {
            description:"Main Category's "+this.state.Changed+" has been Updated",
            function:"Updating Main Category ",
            userId:1,
            pcName:"pc01"
        }
        MainCategoryLog.MainCatLog(MainCatLog)
        .then(response => {
        })
        window.location.reload();
    };

    render(){
        return(
            <>
            <div align="center">
            <form>
                {this.state.update ? 
                (<h3>Update Category 01(Main Category)</h3>)
                :
                (
                    <h3>Add New Category 01 (Main Category)</h3>
                )}<br/>
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
                (<button type="submit" className="btn btn-info" onClick={this.UpdateCategory}>Update</button>)
                :
                (
                    <button type="submit" className="btn btn-success" onClick={this.saveCategory}>Add</button> 
                )}&nbsp;
                <button className="btn btn-danger">Cancel</button>
                {this.state.messageStatus && (
                    <div className="alert alert-success" role="alert">
                    {this.state.message}
                </div>
                )}
            </form>
            </div><br/><br/>
            
            </>
        );
    }
}