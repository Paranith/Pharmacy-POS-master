import React, { Component } from 'react'
import ItemService from '../../Service/ItemService'

const style = {
    textbox : {
        width:300
    }
}

export default class ManageItems extends Component { 
    constructor(){
        super()

        this.state = {
            Items : []
        }
    }

    componentDidMount(){
        ItemService.getAllItems()
        .then(res =>{
            this.setState({
                Items : res.data
            })
        });
    }

    render(){
        const {Items} = this.state;
        return(
            <>
                <table class="table table-bordered table" style={style.table}>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Current Stock</th>
                        <th>Actions</th>
                    </tr>
                    {Items.map((row) => (
                        <tr key={row.id}>
                        <td>{row.itemName}</td>
                        <td>{row.description}</td>
                        <td>{row.numberofItems}</td>
                        <td><a href={"/updateItems/"+row.id}><button  className="btn btn-success">Edit</button></a></td>

                        </tr>
                    ))}
                </table>
            </>
        )
    }
}