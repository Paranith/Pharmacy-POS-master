import axios from "axios";

class branchService {
    addBranch(Branch) {
        return axios.post("http://localhost:8081/api/pos/data/2001",Branch);
    }

    getAllBranches() {
        return axios.get("http://localhost:8081/api/pos/data?RT=2002");
    }
}

export default new branchService();