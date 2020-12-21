import axios from 'axios'

class companyService {
    addCompany(Company) {
        return axios.post("http://localhost:8081/api/pos/data/1001",Company);
    }
}

export default new companyService();