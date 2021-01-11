import React, { Component } from 'react'
import ThirdCategoryLog from '../../../Service/ActivityLog/ThirdCategoryLog';
import Cat02Service from '../../../Service/Categories/Cat02Service';
import Cat03Service from '../../../Service/Categories/Cat03Service';

const style = {
    textbox : {
        width:300
    }
}

export default class AddThirdCategory extends Component{
    constructor(){
        super();

        this.state = {
            id:"",
            catthreeName:"",
            catthreeDescription:"",
            status:1,
            cat02Id:0,
            Cat02:[],
            update:false
        }
    }

    componentDidMount(){
        Cat02Service.getAllCat02()
        .then((res) => {
            this.setState({
                Cat02 : res.data
            })
        })

        const Cat03Id = this.props.match.params.id;
        if(Cat03Id){
            this.loadCategory03(Cat03Id);
        }

        const path = window.location.pathname;

        if(path == "/updateCat03/" +Cat03Id){
            this.setState({
                update:true
            })
        }

    }

    loadCategory03 = (Cat03Id) => {
        Cat03Service.getById(Cat03Id)
        .then((res) => {
            let cat03 = res.data;
            this.setState({
                id:cat03.id,
                catthreeName:cat03.name,
                catthreeDescription:cat03.description
            })
        })
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    saveCategory03 = (event) => {
        event.preventDefault();
        let Cat03 = {
            id:this.state.id,
            name:this.state.catthreeName,
            description:this.state.catthreeDescription,
            cat02Id:this.state.cat02Id,
            status:this.state.status
        }
        Cat03Service.addCat03(Cat03)
        .then(res => {
            this.addCat03Log();
        })
    }

    addCat03Log = (e) => {
        let Cat03Log = {
            description:"Category Three "+this.state.catthreeName+" has been added",
            function:"Adding Third Category ",
            userId:1,
            pcName:"pc01"
        }
        ThirdCategoryLog.AddedCat03(Cat03Log)
        .then(response => {
        })
    };

    render(){
        return(
            <>
            {/* <div className="row">
                <label><b>Select the main category here :&nbsp;</b></label> 
                <select class="btn btn-info dropdown-toggle">
                    <option>Cat 01</option>
                    <option>Cat 02</option>
                    <option>Cat 03</option>
                </select> </div>

                <br/><br/> */}
                <div align="center">
                {this.state.update ? 
                (
                    <h3>Update Category 03 (Third Category)</h3>
                )
                :
                (
                    <h3>Add New Category 03 (Third Category)</h3>
                )}
                <br/><br/>
                <form onSubmit={this.saveCategory03}>
                <div>  
                <label><b>Select the Secondary category here :</b></label> &nbsp;
                <select 
                class="btn btn-info dropdown-toggle"
                value={this.state.cat02Id}
                onChange={this.onChangeValue("cat02Id")}
                >
                    <option value="0">Select</option>
                    {this.state.Cat02.map((row) =>(
                        <option value={row.id}>{row.name}</option>
                    ))}
                </select>
            </div>
            <br/><br/>

            
            
                
                <label>Name</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.catthreeName}
                onChange={this.onChangeValue("catthreeName")}
                />
                <label>Description</label>
                <textarea
                required
                className="form-control"
                style={style.textbox}
                value={this.state.catthreeDescription}
                onChange={this.onChangeValue("catthreeDescription")}
                /><br/>
                {this.state.update ? 
                (<button type="submit" className="btn btn-success">Update</button>)
                :
                (<button type="submit" className="btn btn-success">Add</button>)
                }
                 &nbsp;
                <button className="btn btn-danger">Cancel</button>
            </form>
            </div>
            </>
        );
    }
}