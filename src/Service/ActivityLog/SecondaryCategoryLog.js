import axios from 'axios'

class SecondaryCategoryLog {

    AddSecondCat(Cat02Log){
        return axios.post("http://localhost:8081/api/pos/data/7001",Cat02Log)
    }

}

export default new SecondaryCategoryLog();