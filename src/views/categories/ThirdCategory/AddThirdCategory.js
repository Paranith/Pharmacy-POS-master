import React, { Component } from 'react'

const style = {
    textbox : {
        width:300
    }
}

export default class AddThirdCategory extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <>
            <div className="row">
                <label><b>Select the main category here :&nbsp;</b></label> 
                <select class="btn btn-info dropdown-toggle">
                    <option>Cat 01</option>
                    <option>Cat 02</option>
                    <option>Cat 03</option>
                </select> </div>

                <br/><br/>
                <div className="row">  
                <label><b>Select the Secondary category here :</b></label> &nbsp;
                <select class="btn btn-info dropdown-toggle">
                    <option>Cat cvvcvx01</option>
                    <option>Cat 02</option>
                    <option>Cat 03</option>
                </select>
            </div>
            <br/><br/>

            <div>
            <form>
                <h3>Add New Category 03 (Third Category)</h3>
                <label>Name</label>
                <input
                required
                className="form-control"
                style={style.textbox}
                // value={this.state.catoneName}
                // onChange={this.onChangeValue("catoneName")}
                />
                <label>Description</label>
                <textarea
                required
                className="form-control"
                style={style.textbox}
                // value={this.state.catoneDescription}
                // onChange={this.onChangeValue("catoneDescription")}
                /><br/>
                <button type="submit" className="btn btn-success">Add</button> &nbsp;
                <button className="btn btn-danger">Cancel</button>
            </form>
            </div>
            </>
        );
    }
}