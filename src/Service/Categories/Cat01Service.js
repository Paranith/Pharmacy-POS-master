import axios from 'axios'

class Cat01{
    addCat01(cat01) {
        return axios.post("http://localhost:8081/api/pos/data/4001",cat01);
    }
    getAllCat01() {
        return axios.get("http://localhost:8081/api/pos/data?RT=4002");
    }
    getCat01ById(id){
        return axios.get("http://localhost:8081/api/pos/data/"+id+"?RT=4003")
    }
}

export default new Cat01;