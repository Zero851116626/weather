<template>
    <div class="body">
        <p class="cityname">{{cityname}}</p>
        <p class="status">{{status}}</p>
        <p class="tem">{{tem}} ℃</p>
        <p class="wind"><span>风力：{{windpower}}</span> | <span>风向：{{windDirection}}</span> | <span>空气湿度：{{humidity}}</span>  </p>
        <div class="tomorrow pre">明天：<span>白天:{{Tdaytemp}}℃风向:{{Tdaywind}}风力:{{Tdaypower}}</span>&nbsp&nbsp<span>夜间:{{Tnighttemp}}℃风向:{{Tnightwind}}风力:{{Tnightpower}}</span></div>
        <div class="after pre">后天：<span>白天:{{Adaytemp}}℃风向:{{Adaywind}}风力:{{Adaypower}}</span>&nbsp&nbsp<span>夜间:{{Anighttemp}}℃风向:{{Anightwind}}风力:{{Anightpower}}</span></div>
    </div>
</template>

<script>
  import connect from "../connect/connect"
    export default {
        name: "Bodypart",
        data(){
          return {
            cityname:"",
            status:"",
            tem:"",
            windpower:"",
            windDirection:"",
            humidity:"",
            
            Tdaytemp:"",
            Tdaywind:"",
            Tdaypower:"",
            Tnighttemp:"",
            Tnightwind:"",
            Tnightpower:"",
            
            Adaytemp:"",
            Adaywind:"",
            Adaypower:"",
            Anighttemp:"",
            Anightwind:"",
            Anightpower:"",
            
          }
        },
        mounted() {
          connect.$on("renderbody",(data)=>{
         
              this.cityname = data.cityname;
              this.status = data.status;
              this.tem = data.tem;
              this.windpower = data.windpower;
              this.windDirection = data.windDirection;
              this.humidity = data.humidity;
            
              this.Tdaytemp = data.Tdaytemp;
              this.Tdaywind = data.Tdaywind;
              this.Tdaypower = data.Tdaypower;
              this.Tnighttemp = data.Tnighttemp;
              this.Tnightwind = data.Tnightwind;
              this.Tnightpower = data.Tnightpower;
    
              this.Adaytemp = data.Adaytemp;
              this.Adaywind = data.Adaywind;
              this.Adaypower = data.Adaypower;
              this.Anighttemp = data.Anighttemp;
              this.Anightwind = data.Anightwind;
              this.Anightpower = data.Anightpower;
          })
        },

    }
</script>

<style scoped lang="less">
.body{
  width:100%;
  height:5rem;
  padding-top:0.2rem;
  color:#EEE;
  background-color: #333;
  .cityname{
    width:100%;
    height:0.4rem;
    line-height:0.4rem;
    font-size: 0.4rem;
    text-align: center;
  }
  .status{
    width:100%;
    height:0.33rem;
    line-height:0.33rem;
    margin-top:0.05rem;
    font-size: 0.32rem;
    text-align: center;
  }
  .tem{
    width:100%;
    height:0.8rem;
    line-height:0.8rem;
    font-size: 0.8rem;
    margin-top:0.3rem;
    text-align: center;
  }
  .wind{
    width:100%;
    height:0.32rem;
    line-height:0.32rem;
    font-size: 0.32rem;
    text-align: center;
    margin-top:0.3rem;
  }
  .pre{
    width:7.15rem;
    height:0.8rem;
    border-radius: 0.15rem;
    background-color: #676767;
    margin:0.2rem auto;
    padding-left:0.05rem;
    font-size: 0.22rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span{
      font-size: 0.18rem;
    }
  }
}
</style>
