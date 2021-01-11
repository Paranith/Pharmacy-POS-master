import axios from 'axios'

class MainCategoryLog {

    MainCatLog(MainCat){
        return axios.post("http://localhost:8081/api/pos/data/7001",MainCat)
    }
}

export default new MainCategoryLog();