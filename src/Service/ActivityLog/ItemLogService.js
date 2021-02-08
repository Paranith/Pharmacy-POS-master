import axios from 'axios'

class ItemLogService {

    ItemLog(ItemLog){
        return axios.post("http://localhost:8081/api/pos/data/7001",ItemLog)
    }
}

export default new ItemLogService();