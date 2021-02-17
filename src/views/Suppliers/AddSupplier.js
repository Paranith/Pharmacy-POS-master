import React, { Component } from 'react'
import SupplierLogService from '../../Service/ActivityLog/SupplierLogService'
import SupplierService from '../../Service/SupplierService'


const style = {
    textbox : {
        width:"85%"
    }
}

export default class AddSupplier extends Component{
    constructor(){
        super()
        
        this.state = {
            shopName:"",
            contactPerson:"",
            contactNumber:"",
            address:"",
            city:"",
            email:"",
            messageStatus:false,
            message:""
        }
    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    
    saveSupplier = (e) => {
        e.preventDefault();
        let Supplier = {
            shopName:this.state.shopName,
            contactperson:this.state.contactPerson,
            contactNumber:this.state.contactNumber,
            address:this.state.address,
            city:this.state.city,
            email:this.state.email,
        }
        SupplierService.addSupplier(Supplier)
        .then(res => {
            this.addSupplierLog();
            this.setState({
                messageStatus:true
            });
            setTimeout(() => {
                this.setState({ messageStatus: false });
                window.location.reload();
              }, 3000);
        })
    }

    addSupplierLog = (e) => {
        let SupplierLog = {
            description:"Supplier "+this.state.shopName+" has been added",
            function:"Adding Supplier ",
            userId:1,
            pcName:"pc01"
        }
        SupplierLogService.addSupplierLog(SupplierLog)
        .then(response => {
        })
    };


    render(){
        return(
            <>
            {this.state.messageStatus && (
                    <div className="alert alert-success" role="alert" style={{position:"fixed",marginLeft:"10%"}}>
                        <strong>Supplier has been added</strong>
                    </div>
                )}
            <form>
            <h3>Add supplier</h3>
            <div className="row">
                <div className="col-sm">
            <label>Shop name</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.shopName}
                onChange={this.onChangeValue("shopName")}
                />

            <label>Contact person</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.contactPerson}
                onChange={this.onChangeValue("contactPerson")}
                />

            <label>Contact number</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.contactNumber}
                onChange={this.onChangeValue("contactNumber")}
                />
                </div>
                <div className="col-sm">
            <label>Address</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.address}
                onChange={this.onChangeValue("address")}
                />

            <label>City</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.city}
                onChange={this.onChangeValue("city")}
                />
            
            <label>Email</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                value={this.state.email}
                onChange={this.onChangeValue("email")}
                />
                </div>
                </div> <br/><br/>
                <div>
                    <button type="submit" className="btn btn-success" onClick={this.saveSupplier}>Add</button> &nbsp;&nbsp;
                    <button className="btn btn-danger">Cancel</button>
                </div><br/><br/>
                
                </form>
            </>

            
        );
    }
}