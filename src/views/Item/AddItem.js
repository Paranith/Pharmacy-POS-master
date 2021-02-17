import React, { Component } from 'react'
import ItemLogService from '../../Service/ActivityLog/ItemLogService';
import Cat01Service from '../../Service/Categories/Cat01Service';
import Cat02Service from '../../Service/Categories/Cat02Service';
import ItemService from '../../Service/ItemService';
import UnitService from '../../Service/UnitService';

export default class AddItem extends Component {
    constructor(){
        super()

        this.state = {
            id:"",
            cat01Id:"",
            cat02Id:"",
            cat03Id:"",
            barcode:"",
            itemName:"",
            description:"",
            reorderQty:"",
            minQty:"",
            maxQty:"",
            brandName:"",
            unitType:"",
            numberofItems:"",
            manufacturerName:"",
            status:true,
            userId:"",
            date:"",
            storeid:"",
            cat01:[],
            cat02:[],
            Unit:[],
            cat01Id:0,
            cat02Id:0,
            changed:[],
            messageStatus:false,
            message:"",
            Item:[],
            update:false,
            item:[]
        }
    }

    componentDidMount(){
        Cat01Service.getAllCat01()
        .then((res) => {
            this.setState({
                cat01 : res.data
            })
        })

        UnitService.getAllUnit()
        .then((res) => (
            this.setState({
                Unit : res.data
            })
        ))


        const path = window.location.pathname;
        const ItemId = this.props.match.params.id;
        if(path == "/updateItems/" + ItemId){
            this.loadItem(ItemId);
            this.setState({
                update:true,
                message:"Item updated successfully"
            })
        }else{
            this.setState({
                message : "Item added successfully"
            })
        }
   
    }

    loadItem = (ItemId) => {
        ItemService.getItemById(ItemId)
        .then((res) => {
            let item = res.data;
            this.setState({
                item:item,
                id:item.id,
                cat01Id:item.cat01Id,
                cat02Id:item.cat02Id,
                cat03Id:item.cat03Id,
                barcode:item.barcode,
                itemName:item.itemName,
                description:item.description,
                reorderQty:item.reorderQty,
                minQty:item.minQty,
                maxQty:item.maxQty,
                brandName:item.brandName,
                unitType:item.unitType,
                numberofItems:item.numberofItems,
                manufacturerName:item.manufacturerName,
                status:item.status,
                userId:item.userId,
                date:item.date,
                storeid:item.storeid,
            })
        })

    }

    onChangeValue = name => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    onChangeOption = (e) =>{
        this.setState({
            cat01Id : e.target.value
        },
        () => {this.loadCat02withCat01Id(this.state.cat01Id);}
        )}

    loadCat02withCat01Id(cat01Id){
        Cat02Service.getByCat01Id(cat01Id)
        .then((res) => {
            this.setState({
                cat02:res.data
            })
        });
    }

    saveItem = (e) => {
        e.preventDefault();
        let Item = {
            cat01Id:this.state.cat01Id,
            cat02Id:this.state.cat02Id,
            cat03Id:this.state.cat03Id,
            barcode:this.state.barcode,
            itemName:this.state.itemName,
            description:this.state.description,
            reorderQty:this.state.reorderQty,
            minQty:this.state.minQty,
            maxQty:this.state.maxQty,
            brandName:this.state.brandName,
            unitType:this.state.unitType,
            numberofItems:this.state.numberofItems,
            manufacturerName:this.state.manufacturerName,
            status:true,
            userId:this.state.userId,
            date:this.state.date,
            storeid:this.state.storeid
        }
        ItemService.addItem(Item)
        .then(res => {
            this.addItemLog();
            this.setState({
                message:true
            });
            setTimeout(() => {
                this.setState({ message: false });
                this.props.history.push("/manageitems")
              }, 3000);
        })
    }

    addItemLog = (e) => {
        let ItemLog = {
            description : "Item " + this.state.itemName + " has been added",
            function:"Adding Item",
            userId:1,
            pcName:"pc01"
        }
        ItemLogService.ItemLog(ItemLog)
        .then(response => {})
    };

    updateItem = (e) => {
        e.preventDefault();

        if(this.state.item.itemName !== this.state.itemName){
            this.state.changed.push("Item Name")
        }
        if(this.state.item.description !== this.state.description){
            this.state.changed.push("Description")
        }
        if(this.state.item.numberofItems !== this.state.numberofItems){
            this.state.changed.push("Number of items")
        }
        if(this.state.item.storeid !== this.state.storeid){
            this.state.changed.push("Store Id")
        }

        let Item = {
            id:this.state.id,
            cat01Id:this.state.cat01Id,
            cat02Id:this.state.cat02Id,
            cat03Id:this.state.cat03Id,
            barcode:this.state.barcode,
            itemName:this.state.itemName,
            description:this.state.description,
            reorderQty:this.state.reorderQty,
            minQty:this.state.minQty,
            maxQty:this.state.maxQty,
            brandName:this.state.brandName,
            unitType:this.state.unitType,
            numberofItems:this.state.numberofItems,
            manufacturerName:this.state.manufacturerName,
            status:true,
            userId:this.state.userId,
            date:this.state.date,
            storeid:this.state.storeid
        }
        ItemService.addItem(Item)
        .then(res => {
            this.updateItemLog();
            this.setState({
                message:true
            });
            setTimeout(() => {
                this.setState({ message: false });
                this.props.history.push("/manageitems")
              }, 3000);
        })
    }

    updateItemLog = (e) => {
        let ItemLog = {
            description : "Item " + this.state.changed + " has been updated",
            function:"Updating Item",
            userId:1,
            pcName:"pc01"
        }
        ItemLogService.ItemLog(ItemLog)
        .then(response => {})
    };

    render(){
        return(
            <>
            {this.state.update ? 
            (
                <h3><u>Update item</u></h3>
            )
            :
            (
                <h3><u>Add Item</u></h3>
            )}
            <form>
            <div className="row">
            <div className="col-sm">
            

                <label>Item Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.itemName}
                    onChange={this.onChangeValue("itemName")}
                /> <br/>

                <label>Description</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.description}
                    onChange={this.onChangeValue("description")}
                /> <br/>

                <label>Barcode</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.barcode}
                    onChange={this.onChangeValue("barcode")}
                /> <br/>

                <label>Reorder Quantity</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.reorderQty}
                    onChange={this.onChangeValue("reorderQty")}
                /> <br/>

                <label>Minimum Quantity</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.minQty}
                    onChange={this.onChangeValue("minQty")}
                /> <br/>

                <label>Maximum Quantity</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.maxQty}
                    onChange={this.onChangeValue("maxQty")}
                /> <br/>

                <label>Brand Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.brandName}
                    onChange={this.onChangeValue("brandName")}
                /> <br/>

                

                <label>Number of Items/ Current Stock</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.numberofItems}
                    onChange={this.onChangeValue("numberofItems")}
                /> <br/>

                
            </div>
            <div className="col-sm">

                

                <label>Manufacturer Name</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.manufacturerName}
                    onChange={this.onChangeValue("manufacturerName")}
                /> <br/>

                <label>User Id</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.userId}
                    onChange={this.onChangeValue("userId")}
                /> <br/>

                <label>Date</label>
                <input
                    className="form-control"
                    type="date"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.date}
                    onChange={this.onChangeValue("date")}
                /> <br/>

                <label>Store Id</label>
                <input
                    className="form-control"
                    type="text"
                    style={{ padding: 5, width: "85%" }}
                    value={this.state.storeid}
                    onChange={this.onChangeValue("storeid")}
                /> <br/>

                <label>Category 01  :&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <select 
                class="btn btn-info dropdown-toggle"
                value={this.state.cat01Id}
                onChange={this.onChangeOption}
                style={{width:150}}
                >
                    <option value="0">Select</option>
                    {this.state.cat01.map((row)=>(
                        <option value={row.id}>{row.name}</option>
                    ))}
                </select><br/><br/>

                {this.state.cat01Id == 0 ? (
                    <div>
                        
                    </div>
                )
            :
            (<div>
                <label>Category 02  :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select 
                class="btn btn-info dropdown-toggle"
                value={this.state.cat02Id}
                onChange={this.onChangeValue("cat02Id")}
                style={{width:150}}
                >
                    <option value="0">Select</option>
                    {this.state.cat02.map((row)=>(
                        <option value={row.id}>{row.name}</option>
                    ))}
                </select><br/> <br/></div>)}

                {this.state.cat02Id == 0 ? (
                    <div>
                        
                    </div>
                )
            :
            (<div>
                <label>Category 03  :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select 
                class="btn btn-info dropdown-toggle"
                style={{width:150}}
                >
                    <option value="0">Select</option>
                </select><br/> <br/></div>)}


                <label>Unit type &nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select 
                class="btn btn-info dropdown-toggle"
                style={{width:150}}
                value={this.state.unitType}
                onChange={this.onChangeValue("unitType")}
                >
                    <option value="0">Select</option>
                    {this.state.Unit.map((row)=>(
                        <option value={row.unitId}>{row.unitType}</option>
                    ))}
                </select><br/> <br/>
                </div>
                </div>
                </form>

                <div>
                    {this.state.update ? 
                    (
                        <button className="btn btn-success" onClick={this.updateItem}>Update</button> 
                    )
                    :
                    (
                        <button className="btn btn-success" onClick={this.saveItem}>Add</button> 
                    )}&nbsp;
                    <a href="/manageitems"><button className="btn btn-danger">Cancel</button></a>
                </div><br/>
                {this.state.messageStatus && (
                <div class="alert alert-success" role="alert">
                    Item has been added successfully!.
                </div>)}
                
            
            </>
        );
    }
}