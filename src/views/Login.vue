<template>
  <v-container fill-heigth fluid>
    <v-row>
      <v-col align="center">
        <h1 class="font-weight-thin">My eCloset</h1>
      </v-col>
    </v-row>
    <div class="login">
      <v-row>
        <v-col>
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

      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn class="button" color="#13978F" dark @click.prevent="login">Login</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <p>
            Si no estás registrado
            <router-link to="/signup">pulse aqui</router-link>
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
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

<style lang='scss' scoped>
.login {
  margin: auto;
  margin-top: 12vh;
  max-width: 80%;
  background-color: rgba(0, 0, 0, 0.1);
}
.button {
  margin: auto;
  margin-top: 10px;
}
</style>