import axios from 'axios'

class UnitService {
    addUnit(){
        return axios.post("#");
    }

    getAllUnit(){
        return axios.get("http://localhost:8081/api/pos/data?RT=11002");
    }
}

export default new UnitService();