import React, { Component } from 'react'
import SecondaryCategoryLog from '../../../Service/ActivityLog/SecondaryCategoryLog';
import Cat01Service from '../../../Service/Categories/Cat01Service';
import Cat02Service from '../../../Service/Categories/Cat02Service';

const style = {
    textbox : {
        width:400
    }
}

export default class AddSecondCategory extends Component {
    constructor(){
        super();

        this.state = {
            id:"",
            cattwoName:"",
            cattwoDescription:"",
            status:1,
            cat01Id:0,
            update:false,
            Cat01:[],
            messageStatus:false,
            message:""
        }
    }

    componentDidMount(){
        Cat01Service.getAllCat01()
        .then((res) => {
            this.setState({
                Cat01 : res.data
            }) 
        })

        const Cat02Id = this.props.match.params.id;
        if(Cat02Id){
            this.loadCategory02(Cat02Id);
        }

        const path = window.location.pathname;

        if(path == "/updateCat02/" +Cat02Id){
            this.setState({
                update:true,
                message : "Second category updated successfully"
            })
        }else {
            this.setState({
                message : "Second category added successfully"
            })
        }
    }

    loadCategory02 = (Cat02Id) => {
        Cat02Service.getById(Cat02Id)
        .then((res) => {
            let cat02 = res.data;
            this.setState({
                id:cat02.id,
                cattwoName:cat02.name,
                cattwoDescription:cat02.description
            })
        })
    }
    

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    saveCategory02 = (event) => {
        event.preventDefault();
        let Cat02 = {
            id:this.state.id,
            name:this.state.cattwoName,
            description:this.state.cattwoDescription,
            cat01Id:this.state.cat01Id,
            status:this.state.status
        }
        Cat02Service.addCat02(Cat02)
        .then((res => {
            this.addCat02Log();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                this.props.history.push("/manageSecondCategory")
              }, 3000);
        }))
    }

    addCat02Log = (e) => {
        let Cat02Log = {
            description:"Second Category "+this.state.cattwoName+" has been added",
            function:"Adding Second Category",
            userId:1,
            pcName:"pc01"
        }
        SecondaryCategoryLog.AddSecondCat(Cat02Log)
        .then(response => {})
    };


    render(){
        const {Cat01} = this.state
        return(
            <>
            <div align="center">
            <form onSubmit={this.saveCategory02}>
                {this.state.update ? 
                (<h3>Update Category 02 (Secondary Category)</h3>)
                :
                (<h3>Add New Category 02 (Secondary Category)</h3>)}
                <br/>
                <div>
                <label>Select the main category here :</label> &nbsp;
                <select 
                class="btn btn-info dropdown-toggle"
                value={this.state.cat01Id}
                onChange={this.onChangeValue("cat01Id")}
                >
                    <option value="0">Select</option>
                    {Cat01.map((row)=>(
                        <option value={row.id}>{row.name}</option>
                    ))}
                </select>
            </div><br/>
                <label>Name</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.cattwoName}
                onChange={this.onChangeValue("cattwoName")}
                />
                <label>Description</label>
                <textarea
                required
                className="form-control"
                style={style.textbox}
                value={this.state.cattwoDescription}
                onChange={this.onChangeValue("cattwoDescription")}
                /><br/>
                {this.state.update ? 
                (<button type="submit" className="btn btn-info">Update</button>)
                :
                (<button type="submit" className="btn btn-success">Add</button>)}
                 &nbsp;
                <button className="btn btn-danger">Cancel</button><br/><br/>
                {this.state.messageStatus && (
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                )}
            </form>
            </div>
            </>
        );
    }
}