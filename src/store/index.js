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

       getProcesos({commit, dispatch}){
        return new Promise((resolve, reject) => {
          axios.get('https://localhost:44377/Api/Procesos')
            .then((response)  =>  {
              resolve(response);
            })
            .catch(error => {
              console.log(error)
              reject(error);
            });;
          });
         },
         getAddProcesos({commit, dispatch}){
          return new Promise((resolve, reject) => {
            axios.get('https://localhost:44377/Api/GetAddProceso')
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
        return new Promise((resolve, reject) => {
          axios.post('https://localhost:44377/Api/AddUsuario?Nombre='+data.Nombre+"&Apellido="+ data.Apellidos+
          "&Email="+data.Email+"&Numeroidentificacion="+data.Numeroidentificacion)
            .then((response)  =>  {
              resolve(response);
            })
            .catch(error => {
              console.log(error)
              reject(error);
            });;
          });
         },
         AddProceso({commit, dispatch},data){
          return new Promise((resolve, reject) => {
            axios.post('https://localhost:44377/Api/AddProceso?Nombre='+ data.Nombre+
            "&idusuario="+data.idusuario+"&idproceso="+data.idproceso)
              .then((response)  =>  {
                resolve(response);
              })
              .catch(error => {
                console.log(error)
                reject(error);
              });;
            });
           },
         SaveUsuario({commit, dispatch},data){
          return new Promise((resolve, reject) => {
            axios.post('https://localhost:44377/Api/SaveUsuario?ID='+data.IdUsuario+"&Nombre="+data.Nombre+"&Apellido="+ data.Apellidos+
            "&Email="+data.Email+"&Numeroidentificacion="+data.Numeroidentificacion)
              .then((response)  =>  {
                resolve(response);
              })
              .catch(error => {
                console.log(error)
                reject(error);
              });;
            });
           },
           SaveProceso({commit, dispatch},data){
            return new Promise((resolve, reject) => {
              axios.post('https://localhost:44377/Api/SaveProceso?id='+data.id+"&Nombre="+ data.Nombre+
              "&idusuario="+data.idusuario+"&idproceso="+data.idproceso)
                .then((response)  =>  {
                  resolve(response);
                })
                .catch(error => {
                  console.log(error)
                  reject(error);
                });;
              });
             },
           DeleteUsuario({commit, dispatch},id){
            return new Promise((resolve, reject) => {
              axios.post('https://localhost:44377/Api/DeleteUsuario?id='+id)
                .then((response)  =>  {
                  resolve(response);
                })
                .catch(error => {
                  console.log(error)
                  reject(error);
                });;
              });
             },
             DeleteProceso({commit, dispatch},id){
              return new Promise((resolve, reject) => {
                axios.post('https://localhost:44377/Api/DeleteProceso?id='+id)
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
