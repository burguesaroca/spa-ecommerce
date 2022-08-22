<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer 
        v-model="drawer" 
        app
        :clipped="$vuetify.breakpoint.lgAndUp"
      >
        <v-list dense>
          <v-list-item link to="/home" color="#34495E">
            <v-list-item-action>
              <v-icon>mdi-microsoft mdi-24px</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Principal</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            :prepend-icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            append-icon=""
            color="#34495E"
          >       
          <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title> Consultas </v-list-item-title>
              </v-list-item-content>
          </template>

          <v-list-item link to="/orders" color="#34495E">
            <v-list-item-action>
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ordenes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          </v-list-group> 

          <v-list-item link @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar 
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="#34495E"
        dark
        dense
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
        <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
        >
          <span class="hidden-sm-and-down font-weight-bold">E-commerce</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-account-check mdi-24px</v-icon>
        </v-btn>
        <span class="white--text subtitle-2 hidden-sm-and-down"> {{ user.name }}</span>        
      </v-app-bar>

      <v-main class="#34495E lighten-5">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <v-footer
        color="#FFF"
        app
        dark
        dense
      >  
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      drawer: null,
      model: false,
    };
  },

  computed: {
    ...mapState("login", ["token", "user"]),
  },

  methods: {
    logout() {
      localStorage.removeItem("spa_token");
      this.$router.push("/login");
    },
  },
};
</script>