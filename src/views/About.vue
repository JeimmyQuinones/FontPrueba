<template>
<div>
     <h2 v-if="statetitle==false" v-text="Getproces()">Procesos</h2>
      <h2 v-if="statetitle==true" >Procesos</h2>
     <div class="form">
            <form action="" class="text-center">
                <input v-model="nombre"  type="text" class="form-control" placeholder="Nombre">
                <select id="addusuario" class="form-select" aria-label="Default select example">
                  <option selected>Seleccione el Usuario</option>
                  <option v-for="(item, index) in Usuarios" :key="index" v-bind:value="item.IdUsuario">{{item.Nombre }}</option>
                </select>
               <select id="addproceso" class="form-select" aria-label="Default select example">
                  <option selected>Seleccione el Proceso padre </option>
                  <option value="-1">Ninguno</option>
                  <option v-for="(item, index) in Procesos" :key="index" v-bind:value="item.IdProceso">{{item.Nombre }}</option>
                </select>
                <!-- Botón para añadir -->
                <input @click="AddUser()" type="button" value="Añadir" class="btn btn-info">
            </form>
        </div>
        <div>
       <table id="tabla" class="table" >
        <thead>
          <tr>
            <th scope="col">Id Proceso</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nombre Usuario</th>
            <th scope="col">Identificaciòn usuario</th>
            <th scope="col">Nombre Proceso padre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in model" :key="index">
            <td >
              <span >
               {{item.IdProceso}}
              </span>
                </td>

            <td >
                <span v-show="idEdit == index">
                    <input  v-model="nombreedit" type="text" class="form-control">
                  </span>
                  <span v-show="idEdit != index">
                  {{item.Nombre}}
                </span>
            </td>
            <td >
                   <span v-show="idEdit == index">
                    <select id="ausuario" class="form-select" aria-label="Default select example">
                  <option selected>Seleccione el Usuario</option>
                  <option v-for="(item, index) in Usuarios" :key="index" v-bind:value="item.IdUsuario">{{item.Nombre }}</option>
                </select>
                   
                  </span>
                  <span v-show="idEdit != index">
                  {{item.NombreUsuario}}
                   </span>
            </td>
            <td >
                   <span v-show="idEdit == index">
                   
                  </span>
                  <span v-show="idEdit != index">
                  {{item.Identificacion}}
                   </span>
            </td>
             <td >
                   <span v-show="idEdit == index">
                 <select id="aproceso" class="form-select" >
                  <option selected>Seleccione el Proceso padre </option>
                  <option value="-1">Ninguno</option>
                  <option v-for="(item, index) in Procesos" :key="index" v-bind:value="item.IdProceso">{{item.Nombre }}</option>
                </select>
                  </span>
                  <span v-show="idEdit != index">
                  {{item.Nombreproyectopadre}}
                   </span>
            </td>
            <td> 
            <button v-show="idEdit == index" type="button" class="btn btn-success" @click="SaveUser(index)">Guardar</button>
            </td>
            <td> 
            <button v-show="idEdit != index" type="button" class="btn btn-warning" @click="edit(index)">Editar</button>
            </td>
            <td>
             <button v-show="idEdit != index" type="button" class="btn btn-danger" @click="DeleteUser(item.IdProceso)">Eliminar</button>
             </td>
          </tr> 
        </tbody>
      </table>
      </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState,mapMutations} from 'vuex';
export default {
  name: 'Home',
  components: {
    HelloWorld,
    
  },
  data(){
    return{
      model:[],
      Usuarios:[],
      Procesos:[],
      nombre:"",
      nombreedit:"",
      idEdit:-1,
      statetitle:false,
      
    }
    
  },
  mounted(){
            
  },
  methods:{
    Getproces(){
        this.$store.dispatch('getProcesos').then( data => {
                      this.model= data.data;
      }); 
      this.$store.dispatch('getAddProcesos').then( data => {
                      this.Usuarios= data.data.usuarios;
                      this.Procesos= data.data.procesos;
      }); 
      this.statetitle=true;
        return "Procesos";
    },
    AddUser(){
      var idusuario = document.getElementById("addusuario").value;
      var iduproceso = document.getElementById("addproceso").value;
      console.log(idusuario);
      var data={
                    "Nombre": this.nombre,
                    "idusuario": idusuario,
                    "idproceso": iduproceso,
                };
       this.$store.dispatch('AddProceso',data).then( data => {
                      console.log(data.data);
                       this.$store.dispatch('getProcesos').then( da => {
                      this.model= da.data;
                       
           });
           });
           this.$store.dispatch('getAddProcesos').then( data => {
                      this.Usuarios= data.data.usuarios;
                      this.Procesos= data.data.procesos;
      }); 
    },
    SaveUser(index){
      var id= this.model[index].IdProceso;
        var idusuario = document.getElementById("ausuario").value;
      var iduproceso = document.getElementById("aproceso").value;
      console.log(idusuario);
      console.log(iduproceso);
      var data={
                    "id":id,
                    "Nombre": this.nombreedit,
                    "idusuario": idusuario,
                    "idproceso": iduproceso,
                };
       this.$store.dispatch('SaveProceso',data).then( data => {
                      console.log(data.data);
                       this.$store.dispatch('getProcesos').then( da => {
                      this.model= da.data;
                      this.idEdit = -1;
                       
           });
           });
      

    },
    DeleteUser(index){
      
                this.$store.dispatch('DeleteProceso',index).then( data => {
                      console.log(data.data);
                      this.$store.dispatch('getProcesos').then( dat=> {
                      this.model= dat.data;
                        }); 
      }); 
    },
    edit(index){
      this.nombreedit= this.model[index].Nombre;
      this.apellidoedit= this.model[index].Apellidos;
      this.emailedit= this.model[index].Email;
      this.numeroIdentificaciónedit= this.model[index].Numeroidentificacion;
      this.idEdit = index;

    }
  },

}
</script>
