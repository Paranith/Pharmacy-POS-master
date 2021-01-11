import axios from 'axios'

class EmployeeLogService {

    EmployeeAddedLog(EmployeeLog){
        return axios.post("http://localhost:8081/api/pos/data/7001",EmployeeLog);
    }
}

export default new EmployeeLogService();