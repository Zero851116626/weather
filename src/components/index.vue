<template>
  <div class="wrap">
    <Header></Header>
    <Bodypart></Bodypart>
    <Echarts></Echarts>
  </div>
</template>

<script>
  import Header from "./header/top";
  import Bodypart from "./body/body";
  import Echarts from "./echart/echart"
  export default {
    name: 'index',
    data(){
      return {
      }
    },
    components:{
      Header,Bodypart,Echarts
    },
  }
</script>

<style scoped lang="less">
  .wrap{
    width:7.5rem;
    height: 100vh;
    background-color: #333;
  }
</style>
