<template>
<div>
     <h2 v-text="getusers()">Usuarios</h2>
     <div class="form">
            <form action="" class="text-center">
                <input v-model="nombre"  type="text" class="form-control" placeholder="Nombre">
                <input v-model="apellido"  type="text" name="Apellido" placeholder="Apellido" class="form-control">
                <input v-model="email"  type="email" name="Email" placeholder="Email" class="form-control">
                <input v-model="numeroIdentificación"  type="number" name="NumeroIdentificación" placeholder="Numero Identificación" class="form-control">

                <!-- Botón para añadir -->
                <input @click="AddUser()" type="button" value="Añadir" class="btn btn-success">
            </form>
        </div>
        <div>
       <table class="table" >
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Numero Identificación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in User" :key="index">
            <td v-text="item.Nombre"></td>
            <td v-text="item.Apellidos"></td>
            <td v-text="item.Email"></td>
            <td v-text="item.Numeroidentificacion"></td>
            <td> <button type="button" class="btn btn-primary">edit</button></td>
            <td> <button type="button" class="btn btn-primary">Eliminar</button></td>
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
      User:[],
      nombre:"",
      apellido:"",
      email:"",
      numeroIdentificación:"",
    }
    
  },
  mounted(){
            
  },
  methods:{
    getusers(){
        this.$store.dispatch('getUsuarios').then( data => {
                      this.User= data.data;
      }); 
        return "usuarios";
    },
    AddUser(){
       var data={
                    "IdUsuario": -1,
                    "Nombre": this.nombre,
                    "Apellidos": this.apellido,
                    "Numeroidentificacion": parseInt(this.numeroIdentificación),
                    "Email": this.email
                };
                console.log(data);
                this.$store.dispatch('AddUsuarios',data).then( data => {
                      
                      console.log(data.data);
      }); 
    }
  },

}
</script>
