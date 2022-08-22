<template>
    <v-app id="inspire">
    <v-app id="inspire">
      <v-main class="#34495E lighten-4">
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="#34495E"
                  dark
                  flat
                >
                  <!--<v-img
                  max-width="90"
                  max-height="55"
                  src="img/logo.png"
                  alt="Vuetify"
                  />-->
                  <v-col>
                    <v-toolbar-title class="white--text font-weight-black">
                      E-commerce
                    </v-toolbar-title>
                  </v-col>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Usuario"
                      name="Email"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="credentials.email"
                    ></v-text-field>
  
                    <v-text-field
                      label="Contraseña"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="credentials.password"
                      v-on:keyup.enter="loginauto"
                    ></v-text-field>
                    <div style="color: red; text-align: center">{{message}}</div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="font-weight-bold" color="#34495E" text @click="login"> 
                    <v-icon>mdi-arrow-right-bold mdi-24px</v-icon> Ingresar</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            credentials: {
                email: '', 
                password: ''
            }
        }
    }, 

    computed: {
        ...mapState('login', ['message'])
    },

    methods: {
      login() {
        this.$store.dispatch('login/login', this.credentials)
        .then(() => {
          this.$router.push("/home")
        }).catch(() => {
          this.$store.commit('login/SET_MESSAGE','Autenticación no autorizada!')
        })
      },

      loginauto(){
        this.login()
      }      
    }
}
</script>