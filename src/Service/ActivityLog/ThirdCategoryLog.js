import axios from 'axios'

class ThirdCategoryLog {

    AddedCat03(Cat03Log){
        return axios.post("http://localhost:8081/api/pos/data/7001",Cat03Log)
    }
}

export default new ThirdCategoryLog();