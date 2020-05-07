<template>
  <div>
    <v-alert v-if="user" type="success">Usuario modificado correctamente</v-alert>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="10" align="center">
          <v-avatar color="blue" size="200">
            <img :src="picture" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
          <input type="file" accept="image/*" @change="onFileSelected" />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col align="center">
          <v-btn color="#B0BEC5" dark @click="update()">Guardar imagen</v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="4">
          <v-form>
            <v-card>
              <v-row align="center" justify="center">
                <v-col cols="10">
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

                  <v-row align="center" justify="center">
                    <v-col align="center">
                      <v-btn color="#B0BEC5" dark @click="update()">Guardar</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="mt-5">
              <v-row align="center" justify="center">
                <v-col cols="10">
                  <v-text-field
                    label="Password actual"
                    v-model="userPasswordActual"
                    :type="showPasswordActual ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :rules="passwordRule"
                    :append-icon="showPasswordActual ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPasswordActual = !showPasswordActual"
                  ></v-text-field>

                  <v-text-field
                    label="Nuevo password"
                    v-model="userPasswordNuevo"
                    :type="showPasswordNuevo ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :rules="passwordRule"
                    :append-icon="showPasswordNuevo ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPasswordNuevo = !showPasswordNuevo"
                  ></v-text-field>

                  <v-text-field
                    label="Confirma tu nuevo password"
                    v-model="userPasswordConfirm"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :rules="passwordRule"
                    :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPasswordConfirm = !showPasswordConfirm"
                  ></v-text-field>
                  <v-row align="center" justify="center">
                    <v-col align="center">
                      <v-btn color="#B0BEC5" dark @click="updatePassword()">Guardar Contraseña</v-btn>
                      <v-alert v-if="password" type="success">Contraseña modificada correctamente</v-alert>
                      <v-alert v-if="differentPassword" type="error">Contraseñas distintas</v-alert>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
          <v-row class="mt-5" justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-card-actions>
                  <v-btn dark color="#E57373" v-on="on">Eliminar cuenta</v-btn>
                </v-card-actions>
              </template>
              <v-card>
                <v-card-title class="headline">¿Estás seguro?</v-card-title>
                <v-card-text>Eliminarás tu cuenta, y con ella todas tus prendas y looks!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#78909C" text @click="dialog = false">Cancelar</v-btn>
                  <v-btn color="#78909C" text @click="deleteAccount()">Eliminar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
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
      userPasswordActual: '',
      userPasswordNuevo: '',
      userPasswordConfirm: '',
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
      selectedFile: null,
      dialog: false,
      userId: '',
      user: false,
      password: false,
      differentPassword: false
    }
  },
  created () {
    Api.getOneUser().then(user => {
      this.username = user.name
      this.email = user.email
      this.picture = user.img_url
      this.userId = user._id
    })
  },
  methods: {
    onFileSelected (photo) {
      this.selectedFile = photo.target.files[0]
    },
    uploadImage () {
      return new Promise(resolve => {
        var storageRef = firebase.storage().ref()
        var metadata = {
          contentType: 'image/jpeg'
        }
        var uploadTask = storageRef
          .child('images/' + this.selectedFile.name)
          .put(this.selectedFile, metadata)
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          error => console.log(error),
          async function () {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
            resolve(downloadURL)
          }
        )
      })
    },
    async update () {
      const imgURL = await this.uploadImage()
      this.picture = imgURL
      const user = {
        name: this.username,
        email: this.email,
        img_url: this.picture
      }
      Api.saveUser(user).then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token)
          this.user = true
        }
      })
    },
    updatePassword () {
      if (this.userPasswordNuevo === this.userPasswordConfirm) {
        const objectPassword = {
          old: this.userPasswordActual,
          new: this.userPasswordNuevo
        }
        Api.updatePassword(objectPassword).then(response => {
          this.password = true
        })
      } else {
        this.differentPassword = true
        this.userPasswordNuevo = ''
        this.userPasswordConfirm = ''
      }
    },
    deleteAccount () {
      Api.deleteUser().then(() => {
        localStorage.clear()
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
