<template>
  <div class="bg-simple">
    <v-row>
      <v-col align="center">
        <h1 class="display-1 font-weight-thin" >My eCloset</h1>
      </v-col>
    </v-row>
    <v-container fill-heigth fluid class="signup">
      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="4" class="bg-transparent">
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
              label="Password"
              v-model="userPassword"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :rules="passwordRule"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-radio-group v-model="genderInput">
              <v-radio v-for="gender in genders" :key="gender" :label="gender" :value="gender"></v-radio>
            </v-radio-group>
          </v-form>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="4" class="bg-transparent">
          <v-card-actions>
            <v-btn class="button" color="#B0BEC5" dark @click="signup">Signup</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col align="center" cols="10" sm="6" md="4" class="bg-transparent">
          <p>
            Si ya estás registrado
            <router-link to="/">pulsa aqui</router-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from '../services/Api'

export default {
  data () {
    return {
      showPassword: false,
      userPassword: '',
      passwordRule: [
        v => !!v || 'Contraseña es requerida',
        v => v.length >= 6 || 'Contraseña debe tener al menos 6 caracteres'
      ],
      username: '',
      userRules: [v => !!v || 'Nombre de usuario es requerido'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido'
      ],
      genderInput: 'Mujer',
      genders: ['Mujer', 'Hombre']
    }
  },
  methods: {
    signup () {
      const newUser = {
        user_name: this.username,
        user_email: this.email,
        user_password: this.userPassword,
        user_gender: this.genderInput
      }

      Api.signup(newUser)
        .then(response => {
          localStorage.setItem('token', response.token)
          this.$router.push('/home')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-simple {
  background-image: url("../assets/fondo_auth.png");
  height: 100vh;
  width: 100vw;
  background-size: cover;
}
.signup {
  margin-top: 6vh;
}
.bg-transparent {
  background-color: rgba(255, 255, 255, 0.9);
}
.button {
  margin: auto;
  margin-top: 10px;
}
</style>
