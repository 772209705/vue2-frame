<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <h1>Holle, {{ user.username }}!</h1>
      <button @click="logout">退出</button>
  </div>
  <router-view></router-view>
  </div>
  
</template>


<script>


export default {
  name: 'App',
  data(){
    return {
      isLoggedIn: false
    }
  },
  components: {
    
  },
  methods: {
    // ...mapMutations(["logout"]),
  },
  mounted() {
  if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  }, 
}
</script>

<style>

</style>
