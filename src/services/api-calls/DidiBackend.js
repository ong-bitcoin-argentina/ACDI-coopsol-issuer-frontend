import axios from "axios";

const ISSUER_BACKEND_URL = process.env.REACT_ISSUER_BACKEND_URL || "https://api.issuer.qa.didi.org.ar"; //template/${id}
console.log(`ISSUER backend:`, ISSUER_BACKEND_URL)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4MWRjMDQ1MTAwMWIzM2Y2YjY5OWQiLCJleHAiOjE2NjU2OTQ4NDQsImlhdCI6MTY1MjczNDg0NH0.DQcEW9RW6EeSOCQvudav8d2i0bNmAAAut496bR48POw";

const config = {
  headers: {
    "token": token
  }
}

const DidiBackend = () => ({
  templates: {
    async find() {
      const response = await axios.get(`${ISSUER_BACKEND_URL}/template/all`, config);
      const apiResponse = response.data;
      const templates = apiResponse?.data;

      return templates
        .filter(t => t.name.includes("Coopsol"))
        .map(t => ({ ...t, name: t.name.split("-")[1].trim() }))
        .sort((a, b) => new Date(a.createdOn) > new Date(b.createdOn) ? 1 : -1);

    },
    async create(data) {
      const response = await axios.post(`${ISSUER_BACKEND_URL}/template`, data, config);
      const apiResponse = response.data;
      if(apiResponse.status === "error"){
        throw new Error(apiResponse?.data?.message);
      }
      return apiResponse;
    },

    async get(id) {
      const response = await axios.get(`${ISSUER_BACKEND_URL}/template/${id}`, config);
      const apiResponse = response.data;
      return apiResponse?.data;
    },

    async update(id, data) {
      const response = await axios.put(`${ISSUER_BACKEND_URL}/template/${id}`, data, config);
      const apiResponse = response.data;
      console.log(apiResponse)
      if(apiResponse.status === "error"){
        throw new Error(apiResponse?.data?.message);
      }
      return apiResponse.data;
    },

    async delete(id) {
      const apiResponse = await axios.delete(`${ISSUER_BACKEND_URL}/template/${id}`, config);
      return apiResponse.data;
    }
  },

  credentials: {
    async create(data) {
      const response = await axios.post(`${ISSUER_BACKEND_URL}/cert`, data, config);
      return response?.data;
    },
    async find(filter) {
      const query = new URLSearchParams(filter).toString();

      const response = await axios.get(`${ISSUER_BACKEND_URL}/cert/find?${query}`, config);
      const apiResponse = response.data;
      const credentials = apiResponse?.data;

      return credentials;
    },

    async all() {
      const response = await axios.get(`${ISSUER_BACKEND_URL}/cert/all`, config);
      const apiResponse = response.data;
      const credentials = apiResponse?.data;

      return credentials;
    },

    async emit(id) {
      console.log(`Emit credential: ${id}`)
      const response = await axios.post(`${ISSUER_BACKEND_URL}/cert/${id}/emmit`, {}, config);
      console.log(response)
      const apiResponse = response.data; ///
      if(apiResponse.status === "error"){
        throw new Error(apiResponse?.data?.message);
      }
      const credential = apiResponse?.data;
      return credential;
    },


    async revoke(id, reason = "OTHER") { //delete or revoke
      const response = await axios.delete(`${ISSUER_BACKEND_URL}/cert/${id}`, {
        ...config,
        data: {
          reason
        }
      });
      const apiResponse = response.data;
      if(apiResponse.status === "error"){
        throw new Error(apiResponse?.data?.message);
      }
      const credentials = apiResponse?.data;

      return credentials;
    },



  }



})



export default DidiBackend;