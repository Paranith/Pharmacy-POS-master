import axios from 'axios'

class SupplierService {

    addSupplier(Supplier){
        return axios.post("http://localhost:8081/api/pos/data/12001", Supplier)
    }

    getAllSuppliers(){
        return axios.get("http://localhost:8081/api/pos/data?RT=12002")
    }
}

export default new SupplierService();