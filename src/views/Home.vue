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
                <input @click="AddUser()" type="button" value="Añadir" class="btn btn-info">
            </form>
        </div>
        <div>
       <table id="tabla" class="table" >
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
                    <input  v-model="apellidoedit" type="text" class="form-control">
                  </span>
                  <span v-show="idEdit != index">
                  {{item.Apellidos}}
                </span>
            </td>
            <td >
                   <span v-show="idEdit == index">
                    <input  v-model="emailedit" type="text" class="form-control">
                  </span>
                  <span v-show="idEdit != index">
                  {{item.Email}}
                   </span>
            </td>
            <td >
                   <span v-show="idEdit == index">
                    <input  v-model="numeroIdentificaciónedit" type="text" class="form-control">
                  </span>
                  <span v-show="idEdit != index">
                  {{item.Numeroidentificacion}}
                   </span>
            </td>
            <td> 
            <button v-show="idEdit == index" type="button" class="btn btn-success" @click="SaveUser(index)">Guardar</button>
            </td>
            <td> 
            <button v-show="idEdit != index" type="button" class="btn btn-warning" @click="edit(index)">Editar</button>
            </td>
            <td>
             <button v-show="idEdit != index" type="button" class="btn btn-danger" @click="DeleteUser(item.IdUsuario)">Eliminar</button>
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
      User:[],
      nombre:"",
      nombreedit:"",
      apellido:"",
      apellidoedit:"",
      email:"",
      emailedit:"",
      numeroIdentificación:"",
      numeroIdentificaciónedit:"",
      idEdit:-1,
      
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
      var error =0;
      if (this.nombre=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (this.apellido=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (this.email=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (parseInt(this.numeroIdentificación)==0)
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (this.numeroIdentificación=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
       var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

            if (!regex.test(this.email)) 
              {
                alert("Correo invalido");
                error++;
              }
              if(error==0)
              {
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
    SaveUser(index){
      var id= this.User[index].IdUsuario;
      var error =0;
      if (this.nombreedit=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (this.apellidoedit=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (this.emailedit=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (parseInt(this.numeroIdentificaciónedit)==0)
      {
        alert("El campo no puede estar vacio");
        error++;
      }
      if (this.numeroIdentificaciónedit=="")
      {
        alert("El campo no puede estar vacio");
        error++;
      }
       var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

            if (!regex.test(this.emailedit)) 
              {
                alert("Correo invalido");
                error++;
              }
      
                if (error==0){
            var data={
                                "IdUsuario": id,
                                "Nombre": this.nombreedit,
                                "Apellidos": this.apellidoedit,
                                "Numeroidentificacion": parseInt(this.numeroIdentificaciónedit),
                                "Email": this.emailedit
                            };
                            console.log(data);
                            this.$store.dispatch('SaveUsuario',data).then( data => {
                                  console.log(data.data);
                                  this.idEdit = -1;
                                  this.$store.dispatch('getUsuarios').then( dat=> {
                                    this.User= [];
                                  this.User= dat.dat;
                                    }); 
                  }); 
                } 
       
      

    },
    DeleteUser(index){
      
                this.$store.dispatch('DeleteUsuario',index).then( data => {
                      console.log(data.data);
                      this.$store.dispatch('getUsuarios').then( dat=> {
                        this.User= [];
                      this.User= dat.dat;
                        }); 
      }); 
    },
    edit(index){
      this.nombreedit= this.User[index].Nombre;
      this.apellidoedit= this.User[index].Apellidos;
      this.emailedit= this.User[index].Email;
      this.numeroIdentificaciónedit= this.User[index].Numeroidentificacion;
      this.idEdit = index;

    }
  },

}
</script>
