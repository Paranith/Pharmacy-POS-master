import React, { Component } from 'react'

const style = {
    textbox : {
        width:300
    }
}

export default class ThirdCategory extends Component {
    constructor(){
        super();
    }

    render(){
        return(
            <>
            <h3>Third Category</h3>
            <a href="/#/addthirdcategory"><button className="btn btn-primary" style={{marginLeft:"40%"}}>Add New Third Category</button></a>
            <br/><br/>
            <div className="row">
                &nbsp;&nbsp;&nbsp;&nbsp;<label>Search category by name :</label> &nbsp;
                    <input
                    className="form-control"
                    style={{width:300}}
                    />
                </div><br/>
            <div>
            <table class="table table-bordered table" style={style.table}>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        {/* <th>Actions</th> */}
                    </tr>
                    <tbody>
                        <tr>
                            <td>cat 1</td>
                            <td>abcd</td>
                            <td>
                                <button className="btn btn-success">Activate</button>&nbsp;
                                <button disabled className="btn btn-danger">Deactivate</button>
                            </td>
                            {/* <td><a href="#">View/Add Subcategories
                            </a></td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}