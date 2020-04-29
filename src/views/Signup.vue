<template>
  <v-container fill-heigth fluid>
    <v-row>
      <v-col align="center">
        <h1 class="font-weight-thin">My eCloset</h1>
      </v-col>
    </v-row>
    <div class="signup">
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
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn class="button" color="#13978F" dark @click="signup">Signup</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <p>
            Si ya estás registrado
            <router-link to="/">pulse aqui</router-link>
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
.signup {
  margin: auto;
  margin-top: 8vh;
  max-width: 80%;
  background-color: rgba(0, 0, 0, 0.1);
}
.button {
  margin: auto;
  margin-top: 10px;
}
</style>
