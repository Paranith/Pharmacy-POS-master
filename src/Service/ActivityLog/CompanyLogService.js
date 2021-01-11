import axios from 'axios'

class CompanyLogService {

    AddCompanyLog(AddCompany){
        return axios.post("http://localhost:8081/api/pos/data/7001",AddCompany);
    }
}

export default new CompanyLogService();