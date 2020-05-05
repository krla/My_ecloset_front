<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="10" align="center">
          <v-avatar color="blue" size="200">
            <img
              :src="picture"
            >
          </v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input type="file" @change="onFileSelected">
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form>
             <v-text-field
              label="Nombre de usuario"
              v-model="username"
              prepend-icon="mdi-account-circle"
              :rules="userRules"
            ></v-text-field>

            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-email"
            ></v-text-field>

            <v-text-field
              label="Password actual"
              v-model="userPassword"
              :type="showPasswordActual ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :rules="passwordRule"
              :append-icon="showPasswordActual ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPasswordActual = !showPasswordActual"
            ></v-text-field>

             <v-text-field
              label="Nuevo password"
              v-model="userPassword"
              :type="showPasswordNuevo ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :rules="passwordRule"
              :append-icon="showPasswordNuevo ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPasswordNuevo = !showPasswordNuevo"
            ></v-text-field>

             <v-text-field
              label="Confirma tu nuevo password"
              v-model="userPassword"
              :type="showPasswordConfirm ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :rules="passwordRule"
              :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPasswordConfirm = !showPasswordConfirm"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn color="grey" @click="update()">
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from '../services/Api'
import firebase from 'firebase'
export default {
  name: 'Profile',
  data () {
    return {
      showPasswordActual: false,
      showPasswordNuevo: false,
      showPasswordConfirm: false,
      userPassword: '',
      passwordRule: [
        v => !!v || 'Password is required',
        v => v.length >= 10 || 'Password must be more than 10 characters'
      ],
      username: '',
      userRules: [v => !!v || 'Username is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      picture: '',
      selectedFile: null
    }
  },
  created () {
    Api.getOneUser().then(user => {
      this.username = user.name
      this.email = user.email
      this.picture = user.img_url
    })
  },
  methods: {
    onFileSelected (photo) {
      this.selectedFile = photo.target.files[0]
      this.onUpload()
    },
    onUpload () {
      const storageRef = firebase.storage().ref(`imagenes/${this.selectedFile.name}`)
      const task = storageRef.put(this.selectedFile)
      task.on('state_changed', () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      })
    },
    update () {
      const user = {
        name: this.username,
        email: this.email,
        img_url: this.picture
      }
      Api.saveUser(user).then(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
