import axios from 'axios'
import SupplierService from '../SupplierService'

class SupplierLogService {

    addSupplierLog(SupplierLog){
        return axios.post("http://localhost:8081/api/pos/data/7001",SupplierLog)
    }
}

export default new SupplierLogService();