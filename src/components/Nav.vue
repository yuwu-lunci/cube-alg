<template>
    <div class="nav">
        <div class="home" @click="$router.push('/')">首页</div>
        <div class="show" @click="$router.push('/about')">说明</div>
        <div class="box" @click="showSetting()">工具</div>
        <div class="setting" v-show="isSetting">
            <h3>字母转中文</h3>
            <ul>
                <li v-for="(a,index) in algWord" :key="index"><input type="text" :value="a" :placeholder="a" @blur="changeWord(index,$event.target.value)"></li>
            </ul>
        </div>
        <div class="box">工具</div>
    </div>
</template>

<script>
export default {
    name: 'CubeAlgNav',

    data() {
        return {
            algWord: ["U", "U'", "R", "R'", "F", "F'", "L", "L'", "D", "D'", "B", "B'",
                        "u", "u'", "r", "r'", "f", "f'", "l", "l'", "d", "d'", "b", "b'",
                        "M","M'","S","S'","E","E'",
                        "x","x'","y","y'","z","z'"],
            isSetting:false
        };
    },

    updated(){
        // this.$bus.$emit('algWord', this.algWord)
    },
    mounted() {
        this.algWord = JSON.parse(localStorage.getItem('algWord'))||this.algWord
    },

    methods: {
        showSetting(){
            this.isSetting=!this.isSetting
        },
        changeWord(index, a){
            this.algWord[index]=a
            localStorage.setItem('algWord', JSON.stringify(this.algWord))
        }
    },
};
</script>

<style lang="less" scoped>


    ul,li{
        list-style: none;
        margin: 0;
        padding: 0;  
    }   
    .nav{
        width: 150px;
        // height: 120px;
        position: fixed;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        // background-color: rgb(17, 24, 39);
        background-color: rgb(243, 244, 246);
        // position: absolute;
        top: 50px;
        right: 30px;
        // color: gray;
        border-radius: 5px;
        div{
            width: 100%;
            height: 30px;
            // padding-left: 20px;
            text-align: center;
            cursor: pointer;
            line-height: 30px;
        }
        div:hover{
            background-color:#ccc;
        }
        .setting{
            width: 260px;
            height: 400px;
            background-color: skyblue;
            position: absolute;
            top: 200px;
            right: 10px;
            ul{
                width: 95%;
                margin-left: 2.5%;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
               li{
                width: 60px;
                input{
                    width: 40px;
                }
            } 
            }
            
        }
    }
</style>