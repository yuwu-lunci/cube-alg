<template>
  <div class="home" ref="pdf">
    <el-select v-model="value" placeholder="请选择" class="selectPage" size="small">
      <el-option v-for="(item,index) in options" :key="item.value" :value="item.value" @click.native="toPage(item)">
      </el-option>
    </el-select>

    <div class="title">
      <input type="text" ref="inpTitle" v-model="value" v-show="!isTitle" @blur="hiddenInp()">
      <p v-show="isTitle" @click="showInp()">{{this.value}}</p>
    </div>

    <CubeList class="cubeList" :algObj="obj" :deleteAlg='deleteAlg' :update="update" />

    <div class="add" @click="add()">
      <i class="el-icon-plus"></i>
    </div>
    <button @click="handleExport()">生成pdf</button>

  </div>
</template>

<script>
// @ is an alias to /src
import {nanoid} from 'nanoid'
import CubeList from '@/components/CubeList.vue'
import { Message } from 'element-ui';
import { downloadPDF } from '../util/pdf'

export default {
  name: 'HomeView',
  components: {
    CubeList
},
data() {
  return {
    obj: [{ id: nanoid(), alg: "RUR'URUUR'" }],
    newObj: [{ id: nanoid(), alg: '' }],
    options: [ 
      {
        value: 'page1',
        id:'alg0128'
      },
      {
      value: '添加新页面',
      id:'0129'
    },
    ],
    value: 'page1',
    isUpdateValue:'',
    currentId:'alg0128',
    isTitle:true
  }
},
mounted(){
  this.updateOff=this.$bus.$on('updateAlg', this.update)
  this.obj = JSON.parse(localStorage.getItem(this.options[0].id))||this.obj;//页面1初始化，第一次进入网页设置第一个图像
  this.options = JSON.parse(localStorage.getItem('options'))||this.options;
  
  localStorage.setItem('alg0128', JSON.stringify(this.obj))
  localStorage.setItem('options', JSON.stringify(this.options))
  this.value = this.options[0].value
},
  beforeDestroy() {
    this.$bus.$off("updateOff");
  },
watch:{
  obj:{
    deep: true,
    handler(value) {
      localStorage.setItem(this.currentId, JSON.stringify(value))
    },
  },
  options:{
    deep: true,
    handler(value) {
      localStorage.setItem('options', JSON.stringify(value))
    },
  }
},
methods: {
  handleExport() {
    downloadPDF(this.$refs.pdf)
  },
  add(){//增加公式
    const algObj={id:nanoid(),alg:''};
    // console.log(algObj);
    this.obj.push(algObj);
  },
  deleteAlg(id){//删除公式
   this.obj= this.obj.filter((val)=>{
      return id!==val.id
    })
  },
  update(id,alg){//更新公式
    this.obj.forEach((objItem)=>{
      if (objItem.id===id) {
        objItem.alg=alg
      }
    })
  },
  toPage(val){
    if (val.id==='0129') {
      let val = 'page' + this.options.length
      this.options.map((item)=>{
        if (item.value === val) {
          val=val+'(2)'
        }
      })
      let time = nanoid()
      this.options.splice(this.options.length-1,0,{//把新页面插入到添加新页面上面
        value: val,
        id: 'alg'+time
      })
      this.newObj = [{ id: nanoid(), alg: '' }]//生成的新页面自带一个完整的魔方
      localStorage.setItem('alg' + time, JSON.stringify(this.newObj))
      localStorage.setItem('options', JSON.stringify(this.options))
      this.value=val//生成新页面后，显示新页面名称
      this.currentId = 'alg' + time//跳转到生成的新页面
      this.obj = JSON.parse(localStorage.getItem('alg' + time))
    }else{
      this.obj = JSON.parse(localStorage.getItem(val.id))
      this.currentId=val.id
    }
  },
  hiddenInp(){
    this.isTitle=!this.isTitle;
    if (this.isUpdateValue!==this.value) {//点击了但没修改值，就不执行以下代码
      let flag=true;
      this.options.map((val, index) => {//判断是否重名
        if (this.value === val.value) {
          Message({
            message: '名字已存在，请重新输入',
            type: 'error'
          });
          this.value=this.isUpdateValue;
          flag=false;
        } 
      })
      if (flag) {//写在外面防止上一段代码影响这段代码，造成监视属性依然修改存储中的options
        this.options.map((val, index) => {//如果修改名字不重名，则修改对应options中value
          if (this.isUpdateValue === val.value) {
            val.value = this.value
          }
        })
      }
     
    }
  },
  showInp(){
    this.isUpdateValue=this.value;
    this.isTitle = !this.isTitle;
    this.$nextTick(function () {
      // console.log(this.$refs);
      this.$refs.inpTitle.focus();
    })
  }
},
}
</script>


<style lang="less" scoped>
    // @media print {
    //   @page {
    //     size: auto;
    //       margin: 300mm;
    //   }
    // }
  .home{
    position: relative;
    width: 600px;
    height: 840px;
    // background-color: skyblue;
    margin:30px auto;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19);
    .selectPage{
      position: absolute;
      left: -110px;
      width: 100px;
    }

        .add {
          margin: 10px auto;
          width: 60px;
          height: 30px;
          line-height: 30px;
          border: 2px dashed #ccc;
          text-align: center;
          font-size: 20px;
          color: #ccc;
          cursor: pointer;
        }
    
        .add:hover {
          color: skyblue;
          border-color: skyblue;
        }
  
        .title{
          height: 50px;
          width: 100%;
          text-align: center;
          line-height: 50px;
          font-size: 20px;
          input{
            font-size: 18px;
            color: red;
          }
        }
  }
</style>
