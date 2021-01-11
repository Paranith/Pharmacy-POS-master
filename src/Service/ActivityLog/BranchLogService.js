import axios from 'axios'

class BranchLogService {

    BranchAddedLog(BranchLog){
        return axios.post("http://localhost:8081/api/pos/data/7001",BranchLog);
    }
}

export default new BranchLogService();