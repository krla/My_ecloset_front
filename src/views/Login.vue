<template>
  <div>
    <h1 class="font-weight-thin" id="title" align="center">My eCloset</h1>
    <v-container fill-heigth fluid class="login">
      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="4" class="bg-transparent">
          <v-form>
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
          </v-form>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="10" sm="6" md="4" class="bg-transparent">
          <v-card-actions>
            <v-btn class="button" color="#13978F" dark @click.prevent="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col align="center" cols="10" sm="6" md="4" class="bg-transparent">
          <p>
            Si no estás registrado
            <router-link to="/signup">pulsa aqui</router-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from "../services/Api";

export default {
  data() {
    return {
      showPassword: false,
      userPassword: "",
      passwordRule: [
        v => !!v || "Password is required",
        v => v.length >= 10 || "Password must be more than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    login() {
      const user = {
        user_email: this.email,
        user_password: this.userPassword
      };
      Api.login(user)
        .then(response => {
          if (response.token) {
            localStorage.setItem("token", response.token);
            this.$router.push("/home");
          } else {
            alert("wrong username or password");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
#title {
  margin-top: 5vh;
}
.login {
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
