import axios from 'axios'

class EmployeeService {
    addEmployee(Employee){
        return axios.post("http://localhost:8081/api/pos/data/3001",Employee)
    }

    getAllEmployees() {
        return axios.get("http://localhost:8081/api/pos/data?RT=3002");
    }

    getEmployeeById(EmpId) {
        return axios.get("http://localhost:8081/api/pos/data/"+EmpId+"?RT=3003")
    }
}
export default new EmployeeService();