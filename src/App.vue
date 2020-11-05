<template>
  <div id="app">
    <postList :postList="post_list"></postList>
    <postAdd></postAdd>
    <button @click="resetDataBase">reset data base</button>
  </div>
</template>

<script>
import postList from '@/components/postList.vue';
import postAdd from '@/components/postAdd.vue';
import axios from 'axios'

export default {
  name: 'App',
  components: {
    postList,
    postAdd,
  },
  data() {
    return {
      post_list: [],
    }
  },
  methods: {
    getPosts() {
      axios.get('http://localhost:3000/api/posts')
          .then(response => (this.post_list = response.data.posts))
          .catch(error => (console.log(error)));
    },
    resetDataBase() {
      axios.get('http://localhost:3000/api/reset')
          .then(response => (console.log(response)))
          .catch(error => (console.log(error)));
      this.post_list = [];
    },
  },
  created () {
    this.getPosts();
  },

  beforeUpdate() {
    this.getPosts();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.main-title {
  font-size: 70px;
  text-decoration: underline;
}
</style>
