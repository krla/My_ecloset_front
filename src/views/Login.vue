<template>
  <div id="login">
    <div id="content">
      <h1 id="titulo" class="font-weight-thin">My eCloset</h1>
      <v-container>
        <v-row class="ml-8">
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
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn id="button" color="#13978F" dark @click="login">Login</v-btn>
      </v-card-actions>
       <p>Si no estás registrado <router-link to="/signup">pulse aqui</router-link></p>
    </div>
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
          localStorage.setItem("token", response.token);
          this.$router.push("/home");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang='scss' scoped>
#login {
  background-image: url("../assets/fondo_auth.png");
  height: 100vh;
}

#content {
  margin: auto;
}

#titulo {
  text-align: center;
}

#button {
  margin: auto;
  margin-top: 10px;
}
p {
  text-align: center;
  margin-top: 10px;
}
#container {
  margin-left: 15px;

}
</style>