<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="10" align="center">
          <v-avatar color="blue" size="200">
            <img :src="picture" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="4">
          <input type="file" @change="onFileSelected" />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col align="center">
          <v-btn color="grey" @click="update()">Guardar imagen</v-btn>
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
                      <v-btn color="grey" @click="update()">Guardar</v-btn>
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
                      <v-btn color="grey" @click="updatePassword()">Guardar Contraseña</v-btn>
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
                  <v-btn dark color="red" v-on="on">Eliminar cuenta
                  </v-btn>
                </v-card-actions>
              </template>
              <v-card>
                <v-card-title class="headline">¿Estás seguro?</v-card-title>
                <v-card-text>Eliminarás tu cuenta, y con ella todas tus prendas y looks!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                  <v-btn color="green darken-1" text @click="deleteAccount()">Eliminar</v-btn>
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
      userId: ''
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
      this.onUpload()
    },
    onUpload () {
      const storageRef = firebase
        .storage()
        .ref(`imagenes/${this.selectedFile.name}`)
      const task = storageRef.put(this.selectedFile)
      task.on('state_changed', () => {
        task.snapshot.ref.getDownloadURL().then(url => {
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
      Api.saveUser(user).then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token)
          alert('Usuario modificado correctamente')
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
          alert('Contraseña modificada correctamente')
        })
      } else {
        alert('Contraseñas distintas')
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
