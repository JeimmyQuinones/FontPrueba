import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Usuarios:[],
  },
  mutations: {
  },
  actions: {
    getUsuarios({commit, dispatch}){
      return new Promise((resolve, reject) => {
        axios.get('https://localhost:44377/Api/Usuarios')
          .then((response)  =>  {
            resolve(response);
          })
          .catch(error => {
            console.log(error)
						reject(error);
					});;
        });
       },
       AddUsuarios({commit, dispatch},data){
         const json = JSON.stringify(data);
        return new Promise((resolve, reject) => {
          axios.post('https://localhost:44377/Api/AddUsuario',json)
            .then((response)  =>  {
              resolve(response);
            })
            .catch(error => {
              console.log(error)
              reject(error);
            });;
          });
         },
},
  modules: {
  }
})
