import axios from 'axios'

class SupplierService {

    addSupplier(Supplier){
        return axios.post("http://localhost:8081/api/pos/data/12001", Supplier)
    }

}

export default new SupplierService();