import axios from "axios";

//axios.defaults.baseURL = "http://localhost:5001/api"

export default axios.create({
    baseURL: "https://localhost:5001/api"
});

// export function fetchPatientDetails(dispatch){
//     const config = {
//         method: 'get',
//         url: "https://localhost:5001/api/Patient"
//     }

//     axios.request(config)
//     .then((response) => {
//         dispatch({type: "FETCH_PATIENT_FULFILLED", payload: response.data})
//     })
//     .catch((err) =>{
//         dispatch({type:"FETCH_PATIENT_REJECTED", payload:err})
//     });
// }


