<template>
    <div id="container">
    
    </div>
</template>

<script>
    //引入图表
    import echarts from "echarts";
    import connect from "../connect/connect"
    export default {
        name: "echart",
        data(){
          return{
          }
        },
        mounted() {
          let arr = [];
          connect.$on("getTemp",(data)=>{
            for(let key in data){
              arr.push(Number.parseInt(data[key]));
            }
      
            let myChart = echarts.init(document.getElementById('container'));
            let option = {
              textStyle:{
                color:"#FFF",
              },
              xAxis: {
                type: 'category',
                data: ['今天', '明天', '后天']
              },
              yAxis: {
                type: 'value',
              },
              series: [{
                data: arr,
                type: 'line',
                color: "red",
              }]
            };
            myChart.setOption(option);
          });
        },
    }
</script>

<style scoped lang="less">
  #container{
    width:100%;
    height:6.5rem;
    padding:0 0.5rem;
  }
</style>
