import axios from 'axios'

class Cat03Service {

    addCat03(cat03) {
        return axios.post("http://localhost:8081/api/pos/data/6001",cat03);
    }   

    getAllCat03() {
        return axios.get("http://localhost:8081/api/pos/data?RT=6002");
    }
    getById(id){
        return axios.get("http://localhost:8081/api/pos/data/"+id+"?RT=6003")
    }
    // getByCat01Id(cat01Id){
    //     return axios.get("http://localhost:8081/api/pos/data/5003/"+cat01Id);
    // }
    

}

export default new Cat03Service();