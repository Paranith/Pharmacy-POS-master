import axios from 'axios'

class ItemService {

    addItem(Item){
        return axios.post("http://localhost:8081/api/pos/data/8001",Item);
    }

    getAllItems(){
        return axios.get("http://localhost:8081/api/pos/data?RT=8002")
    }

    getItemById(ItemId){
        return axios.get("http://localhost:8081/api/pos/data/"+ItemId+"?RT=8003")
    }
}

export default new ItemService();