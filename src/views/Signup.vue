<template>
  <div id="signup">
    <div id="content">
      <h1 id="titulo" class="font-weight-thin">My eCloset</h1>
      <v-container id="container">
        <v-row class="ml-8">
          <v-form>
            <v-text-field
              label="Nombre de usuario"
              v-model="username"
              prepend-icon="mdi-account-circle"
              :rules="userRules"
            ></v-text-field>

            <v-text-field label="E-mail" v-model="email" :rules="emailRules" prepend-icon="mdi-email"></v-text-field>

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
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn id="buttom" color="#13978F" dark @click="signup">Signup</v-btn>
      </v-card-actions>
      <p>Si ya estás registrado <router-link to="/">pulse aqui</router-link></p>
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
      username: "",
      userRules: [v => !!v || "Username is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      genderInput: "Mujer",
      genders: ["Mujer", "Hombre"]
    };
  },
  methods: {
    signup() {
      const newUser = {
        user_name: this.username,
        user_email: this.email,
        user_password: this.userPassword,
        user_gender: this.genderInput
      };

      Api.signup(newUser)
        .then(response => {
          localStorage.setItem("token", response.token);
          this.$router.push("/home");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
#signup {
  background-image: url("../assets/fondo_auth.png");
  height: 100vh;
}

#content {
  margin: auto;
}

#titulo {
  text-align: center;
}


#buttom {
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
