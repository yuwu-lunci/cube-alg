<template>
  <div id="app">
    <!-- <HomeView/> -->
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue';
import Nav from './components/Nav.vue';
export default {
    name: "CubeAlgApp",
    data() {
        return {};
    },
    mounted() {
      // this.$router.push('/')
    },
    methods: {},
    components: { HomeView, Nav }
};
</script>

<style lang="less" scoped>

</style>
