<template>
    <div class="cubeList">
        <CubeItem v-for="(algItem,index) in algObj" :algObj="algObj" :key="algItem.id" :index="index" :algItem="algItem"
            :deleteAlg="deleteAlg" :update="update">

        </CubeItem>

    </div>
</template>

<script>
import CubeItem from './CubeItem.vue';
export default {
    name: "CubeAlgCubeList",
    props: ['algObj', 'deleteAlg','update'],
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
       
    },
    components: { CubeItem }
};
</script>

<style lang="less" scoped>


</style>