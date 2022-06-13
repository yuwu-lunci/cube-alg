<template>
    <div class="container">
        <div class="box">
            <div class="content">
                <!-- 魔方的顶面 Up-->
                <div class="upAside face">
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                </div>
                <!-- 魔方的底面 Down-->
                <div class="downAside face">
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                </div>
                <!-- 魔方的右面 right-->
                <div class="rightAside face">
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                </div>
                <!-- 魔方的左面 left-->
                <div class="leftAside face">
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                </div>
                <!-- 魔方的前面 front-->
                <div class="frontAside face">
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                </div>
                <!-- 魔方的后面 back-->
                <div class="backAside face">
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                    <div class="miniaside"></div>
                </div>
            </div>
        </div>

        <!-- 转动方向 -->
        <div class="inp">
            <input type="text" ref="inp" v-show="isInput" v-model="algItem.alg" placeholder="R R' u u' M M' x x' "
                @blur="show(algItem,$event)" />
            <p v-show="!isInput" @click="onFocus(true)">{{ showAlg||'点击输入公式' }}</p>
            <!-- <button class="show" @click="show(algItem.alg)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mofang1"></use>
                </svg>
            </button>
            <button class="refresh" >
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon"></use>
                </svg>
            </button> -->
            <button @click="delAlg(algItem.id)" class="delete">
                <i class="el-icon-delete-solid"></i>
            </button>
        </div>
        <!-- <el-divider></el-divider> -->
    </div>

</template>

<script>
import Solution from '../../public/js/solution'
import cube from '../../public/js/cube'
import { Message } from 'element-ui';
export default {
    name: 'CubeAlgCube',
    props: ['algItem', 'deleteAlg', 'index', 'algObj','update'],
    data() {
        return {
            color:["yellow", "white", "green", "blue", "red", "orange"],
            aside :[
                "upAside",
                "downAside",
                "rightAside",
                "leftAside",
                "frontAside",
                "backAside",
            ],
            colorData:[],
            isInput:true,
            changeWord:this.algItem.alg,
            algWordCopy: ["U", "U'", "R", "R'", "F", "F'", "L", "L'", "D", "D'", "B", "B'",
                "u", "u'", "r", "r'", "f", "f'", "l", "l'", "d", "d'", "b", "b'",
                "M", "M'", "S", "S'", "E", "E'",
                "x", "x'", "y", "y'", "z", "z'"],
            showAlg:'',
            algWord2:[]
        };
    },
    updated(){
        // console.log(1);
        // this.showWord(this.algWord2)
    },
    mounted() {
        this.pushColor()//把魔方每个面的颜色存入colorData
        // this.$bus.$on('algWord',this.showWord)
        this.algWord2 = JSON.parse(localStorage.getItem('algWord')) || this.algWordCopy
        // this.showWord(this.algWord2)
        this.show(this.algItem, false)//初始化魔方，会执行this.showWord(this.algWord2)
    },
    computed:{
    },
    methods: {
        showWord(value) {
            let algArr = this.algItem.alg.replace(/[, ]/g, "").split("");//去除空格
            let newArr=[]
            while (algArr.length >= 1) {//把字符串修改为指定数组RUR'URUUR'=>["R","U","R'",'U',"R","U","U","R'"]
                if (algArr[1] === "'") {
                    newArr.push(algArr[0]+"'");
                    algArr.splice(0, 2);
                    // console.log(algArr);
                } else if (algArr[1] === "2") {
                    for (let i = 0; i < 2; i++) {
                        newArr.push(algArr[0]);
                    }
                    algArr.splice(0, 2);
                } else {
                    newArr.push(algArr[0]);
                    algArr.shift();
                }
            }
            this.showAlg=''//input失去焦点后清空showalg
            newArr.map((val,index)=>{
               let i= this.algWordCopy.indexOf(val)
                val=value[i]//替换原来公式中的字母
                this.showAlg=this.showAlg+val//拼接
            })
        },
        onFocus(e){
            this.isInput = !this.isInput;
                if (e) {
                    this.$nextTick(function () {
                        console.log(this.$refs);
                        this.$refs.inp.focus();
                    })
                }
        },
        delAlg(id) {
            this.deleteAlg(id);
            console.log(id);
        },
        show(algItem,e){
            this.showWord(this.algWord2)//对p标签中公式进行操作
            if (e) {//挂载时调用的 show(algItem,false)是没有e.target.value的，不需要更新公式
                this.$bus.$emit('updateAlg', algItem.id, e.target.value) 
            }
            this.onFocus(e)
            //判断输入公式是否规范
            let reg = "UDRLFBMSEudrlfbxyz'2";
            let algArr = algItem.alg.replace(/[, ]/g, "").split("");
            // console.log(algArr);
            let searchFlag = true;
            algArr.map((value) => {
                //如果有reg字符以外的其他字符，searchFlag会变为false
                if (reg.search(value) == -1) {
                    searchFlag = false;
                }
            });

            if (searchFlag) {
                //输公式符合规则，则会执行公式
                this.algReserve(algArr);
            }else {
                Message({
                    message: '输入公式不符合规范',
                    type: 'error'
                });
                this.algReserve([])
            }
        },
        algReserve(algArr) {
            let newArr = [];
            if (!algArr[0]) {//当输入为空时，将魔方重置
                newArr = ['reset']
            }
            //将魔方公式逆序中，R改为R'，R'改为R,R2改为R,R
            while (algArr.length >= 1) {
                if (algArr[1] === "'") {
                    newArr.push(algArr[0]);
                    algArr.splice(0, 2);
                    // console.log(algArr);
                    // break;
                } else if (algArr[1] === "2") {
                    for (let i = 0; i < 2; i++) {
                        newArr.push(algArr[0]);
                    }
                    algArr.splice(0, 2);
                } else {
                    newArr.push(algArr[0] + "'");
                    algArr.shift();
                }
            }
           
            //将整个数组翻转，实现魔方公式翻转
            newArr.reverse();
            newArr.unshift('reset');//在公式前面加上重置的字符串，转动时将魔方重置，让相同的公式只能转动一次
            // console.log(newArr);
            newArr.map((value, index, arr) => {
                switch (value) {
                    case "reset":
                        // {//当输入为空时，将魔方重置，先将colorData颜色改为初始值
                        this.resetColor();
                        //然后重新渲染
                        this.showColor(this.colorData)
                        break;
                        //单层转动UDRLFB
                    case "U":
                        this.up();
                        break;
                    case "U'":
                        this.upReserve();
                        break;
                    case "D":
                        this.down();
                        break;
                    case "D'":
                        this.downReserve();
                        break;
                    case "R":
                        this.right();
                        break;
                    case "R'":
                        this.rightReserve();
                        break;
                    case "L":
                        this.left();
                        break;
                    case "L'":
                        this.leftReserve();
                        break;
                    case "F":
                        this.front();
                        break;
                    case "F'":
                        this.frontReserve();
                        break;
                    case "B":
                        this.back();
                        break;
                    case "B'":
                    //双层转动udrlbf
                    case "u":
                        this.up();
                        this.edgeReserve();
                        break;
                    case "u'":
                        this.upReserve();
                        this.edge();
                        break;
                    case "d":
                        this.down();
                        this.edge();
                        break;
                    case "d'":
                        this.downReserve();
                        this.edgeReserve();
                        break;
                    case "r":
                        this.right();
                        this.middleReserve();
                        break;
                    case "r'":
                        this.rightReserve();
                        this.middle();
                        break;
                    case "l":
                        this.left();
                        this.middle();
                        break;
                    case "l'":
                        this.leftReserve();
                        this.middleReserve();
                        break;
                    case "f":
                        this.front();
                        this.slice();
                        break;
                    case "f'":
                        this.frontReserve();
                        this.sliceReserve();
                        break;
                    case "B":
                        this.back();
                        this.sliceReserve();
                        break;
                    case "B'":
                        this.backReserve();
                        this.slice();
                        break;
                    //中层MSE
                    case "M":
                        this.middle();
                        break;
                    case "M'":
                        this.middleReserve();
                        break;
                    case "E":
                        this.edge();
                        break;
                    case "E'":
                        this.edgeReserve();
                        break;
                    case "S":
                        this.slice();
                        break;
                    case "S'":
                        this.sliceReserve();
                        break;
                    //整体转动xyz
                    case "x":
                        this.right();
                        this.middleReserve();
                        this.leftReserve();
                        break;
                    case "x'":
                        this.rightReserve();
                        this.middle();
                        this.left();
                        break;
                    case "y":
                        this.up();
                        this.edgeReserve();
                        this.downReserve();
                        break;
                    case "y'":
                        this.upReserve();
                        this.edge();
                        this.down();
                        break;
                    case "z":
                        this.front();
                        this.slice();
                        this.backReserve();
                        break;
                    case "z'":
                        this.frontReserve();
                        this.sliceReserve();
                        this.back();
                        break;
                }
            });
  
},

        //设置右边层顺时针转动 即R
       right() {
            //顶层转动会影响四个面颜色变化
            let upColor = ["white", "orange", "yellow", "red"];
            let colorNum = [
                [8, 7, 6],
                [0, 3, 6],
                [6, 7, 8],
                [6, 3, 0],
            ];
            let moveAside = "rightAside";
            let clockwise = "36785210";
            this.changeColor(upColor, colorNum, moveAside, clockwise);
            this.showColor(this.colorData);
        },
        up() {
            let upColor = ["green", "orange", "blue", "red"];
            let colorNum = [
                [2, 1, 0], //
                [2, 1, 0],
                [0, 1, 2],
                [0, 1, 2],
            ];
            let moveAside = "upAside";
            let clockwise = "36785210";
            this.changeColor(upColor, colorNum, moveAside, clockwise);
            this.showColor(this.colorData);
        },
        //设置顶层逆时针转动，即U'，
        upReserve() {
            let upColor = ["red", "blue", "orange", "green"];
            let colorNum = [
                [0, 1, 2],
                [0, 1, 2],
                [2, 1, 0],
                [2, 1, 0],
            ];
            let moveAside = "upAside";
            let clockwise = "01258763";
            this.changeColor(upColor, colorNum, moveAside, clockwise);
            this.showColor(this.colorData);
        },
        //设置右边层逆时针转动 即R'
        rightReserve() {
            let upColor = ["red", "yellow", "orange", "white"];
            let colorNum = [
                [6, 3, 0],
                [6, 7, 8],
                [0, 3, 6],
                [8, 7, 6],
            ];
            let moveAside = "rightAside";
            let clockwise = "01258763";
            this.changeColor(upColor, colorNum, moveAside, clockwise);
            this.showColor(this.colorData);
        },

        changeColor(upColor, colorNum, moveAside, clockwise) {
            //转动后，改变四个面的上层颜色
            //将第一个面的颜色存起来，
            let storageColor = [];
            for (let i = 0; i < colorNum[0].length; i++) {
                // console.log(colorData[color.indexOf(upColor[0])][colorNum[0][i]]);
                storageColor.push(this.colorData[this.color.indexOf(upColor[0])][colorNum[0][i]]);
            }
            // console.log(storageColor);
            //改变四个面顶上三个方块的颜色，
            for (var i = 0; i < upColor.length; i++) {
                for (var j = 0; j < colorNum[i].length; j++) {
                    if (i < 3) {
                        //如把橙面2，1，0位置的颜色赋值给绿面的2，1，0.
                        this.colorData[this.color.indexOf(upColor[i])][colorNum[i][j]] =
                            this.colorData[this.color.indexOf(upColor[i + 1])][colorNum[i + 1][j]];
                    } else {
                        this.colorData[this.color.indexOf(upColor[3])][colorNum[3][j]] =
                            storageColor[j];
                    }
                }
            }
            if (moveAside) {
                let arr = clockwise.split("");
                // console.log(moveAside);
                //存储第一个棱块颜色
                let num = this.aside.indexOf(moveAside);

                //魔方中棱块的颜色是不会移动到角块的，所以只执行一次是不行的，循环两次就可以把棱块颜色赋值给上一个棱块颜色
                for (var i = 0; i < 2; i++) {
                    var tmp = this.colorData[num][arr[0]]; //保存第一个数据
                    for (var j = 0; j < arr.length; j++) {
                        if (j >= arr.length - 1) {
                            this.colorData[num][arr[j]] = tmp;
                        } else {
                            this.colorData[num][arr[j]] = this.colorData[num][arr[j + 1]];
                        }
                    }
                }
            }
            // console.log(colorData[0]);
        },
        resetColor(){//重置colorData的颜色
            this.color.map((value, index, arr) => {
                for (let j = 0; j < 9; j++) {
                    this.colorData[index][j] = value;
                }
            })
            // console.log(this.colorData);
        },
        pushColor() {//把魔方每个面的颜色存入colorData
            this.color.map((val, index, arr) => {
                let asideColor = [];
                for (let i = 0; i < 9; i++) {
                    asideColor.push(val);
                }
                this.colorData.push(asideColor);
            });
        },
        showColor(colorData) {//渲染魔方
            let content=document.querySelectorAll('.content')[this.index];
            // console.log(content, this.index);
            this.aside.map((val, index, arr) => {
                let side = content.querySelectorAll("." + val + " div");
                for (let i = 0; i < 9; i++) {
                    side[i].style.backgroundColor = colorData[index][i];
                }
            });
        }
    },
};
</script>

<style lang="less" scoped>




        .container {
            width: 95%;
            height: 110px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 0 2.5%;
            border-bottom: 1px solid #ccc;
            .box {
                position: relative;
                margin: 0;
                    padding: 0;
                // 设置元素被查看位置的视图：
                perspective: 300px;
            }
            .content {
                
                width: 60px;
                height: 60px;
                transform-style: preserve-3d;
    
                .face {
                    box-sizing: border-box;
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    text-align: center;
                    line-height: 60px;
    
                    .miniaside {
                        width: 18px;
                        height: 18px;
                        // border-radius: 1px;
                        float: left;
                        border: 1px solid black;
                    }
                }
            }
        }
    
        // 控制旋转的按钮
        .inp {
            width: 350px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        
            input {
                width: 220px;
                height: 20px
            }
    
            button {
               
                // margin-top: 5px;
                display: none;
                margin-right: 5px;
                font-size: 20px;
                i{
                    color:#4169E1
                }
            }
            button:hover i{
                color: #DC143C;
            }
        }
        .inp:hover button {
             display: block;
            }
    
        /* 让魔方立体 */
        .content {
            // -ms-transform: rotate(7deg);
            //     /* IE 9 */
            //     -moz-transform: rotate(7deg);
            //     /* Firefox */
            //     -webkit-transform: rotate(7deg);
            //     /* Safari 和 Chrome */
            //     -o-transform: rotate(7deg);
                /* Opera */
            -moz-transform: rotateX(-25deg) rotateY(45deg) rotateZ(0deg);
            -webkit-transform: rotateX(-25deg) rotateY(45deg) rotateZ(0deg);
        }
    
        /* 调整顶面upaside的位置 */
        .upAside {
            -moz-transform: rotateX(90deg) translateZ(30px);
            -webkit-transform: rotateX(90deg) translateZ(30px);
        }
    
        /* 调整顶面downaside的位置 */
        .downAside {
            -moz-transform: rotateX(90deg) translateZ(-30px);
            -webkit-transform: rotateX(90deg) translateZ(-30px);
        }
    
        /* 调整右面rightaside的位置 */
        .rightAside {
            -moz-transform: rotateX(0deg) translateZ(30px) translateY(0px);
            -webkit-transform: rotateX(0deg) translateZ(30px) translateY(0px);
        }
    
        /* 调整左面leftaside的位置 */
        .leftAside {
            -moz-transform: rotateX(0deg) translateZ(-30px) translateY(0px);
            -webkit-transform: rotateX(0deg) translateZ(-30px) translateY(0px);
        }
    
        /* 调整前面frontaside的位置 */
        .frontAside {
            -moz-transform: rotateY(90deg) translateZ(-30px) translateY(0px);
            -webkit-transform: rotateY(90deg) translateZ(-30px) translateY(0px);
        }
    
        /* 调整顶面backaside的位置 */
        .backAside {
            -moz-transform: rotateY(90deg) translateZ(30px) translateY(0px);
            -webkit-transform: rotateY(90deg) translateZ(30px) translateY(0px);
        }
</style>