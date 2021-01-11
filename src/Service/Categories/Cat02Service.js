import axios from 'axios'

class Cat02Service {

    addCat02(cat02) {
        return axios.post("http://localhost:8081/api/pos/data/5001",cat02);
    }   

    getAllCat02() {
        return axios.get("http://localhost:8081/api/pos/data?RT=5002");
    }
    getByCat01Id(cat01Id){
        return axios.get("http://localhost:8081/api/pos/data/5004/"+cat01Id);
    }
    getById(id){
        return axios.get("http://localhost:8081/api/pos/data/"+id+"?RT=5003")
    }
}

export default new Cat02Service;