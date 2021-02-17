import axios from 'axios'

class companyService {
    addCompany(Company) {
        return axios.post("http://localhost:8081/api/pos/data/1001",Company);
    }

    getAllCompany(){
        return axios.get("http://localhost:8081/api/pos/data?RT=1002");
    }
}

export default new companyService();