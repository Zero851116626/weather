<template>
    <div class="top">
      <div class="time">{{time}}</div>
      <div class="city">
        <van-tag @click="chooseCity" color="#333" text-color="#FFF">{{content}}</van-tag>
        <van-popup v-model="show" position="bottom" :overlay="false">
          <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" columns-num="2"/>
        </van-popup>
      </div>
      
    </div>
</template>

<script>
  //引入地区配置文件
  import arealist from "../../../node_modules/vant/packages/area/demo/area";
  //引入通信模块，与body和echart传输数据
  import connect from "../connect/connect"
  export default {
    name: "top",
    data() {
      return {
        show: false,
        time: "",
        content:"选择城市",
        areaList:arealist,
        path:{},
      }
    },
    methods:{
      //选择城市按钮
      chooseCity(){
        this.show = true;
      },
      //确认城市选择按钮
      confirm(e){
        //返回一个数组，存放2个位置（省市）
        //那我把右上角改成这2数据拼接
        let pro = e[0].name,
            city = e[1].name;
        let name = pro + "/" + city;
        this.content = name;
        //获得城市编码
        let adcode = e[1].code;
        //作为请求
        //将当前城市编码存入vuex中
        this.$store.state.judge = adcode;
        //执行选择城市后的其他组件内容的更新
        //要时刻牢记，vue是用数据驱动视图，一切的宗旨不是为了组件更新，而是数据更新
        this.whichcity();
        //关闭选项栏
        this.show = false
      },
      cancel(){
        this.show = false;
      },
      whichcity(){
        //如果为空，就获取默认，目的api会自动定位
        if(this.$store.state.judge === ""){
          //获取默认的ip
          this.axios.get("https://restapi.amap.com/v3/ip?output=JSON&key=11e9c2a30d26b50471e7e1487dcd8a86")
            .then((data) => {
              //获得城市编码
              this.$store.state.judge = data.data.adcode;
              //获取城市的天气信息
              this.getinfo(this.$store.state.judge)
            })
        }else{
          //如果存有城市编码，就获取目标城市的编码
          this.getinfo(this.$store.state.judge)
        }
      },
      getinfo(data){
        //获得编码
        let adcode = data;
        //获得当天天气的api
        let url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=11e9c2a30d26b50471e7e1487dcd8a86`
        this.axios.get(url)
          .then((data)=>{
            //这些数据需要渲染到body组件页面上，用一个灵活变更的全局path，保存并发送
            let value = data.data.lives[0];
            this.path.cityname = "" + value.province + "  " + value.city;
            this.path.status = value.weather;
            this.path.tem = value.temperature;
            this.path.windpower = value.windpower;
            this.path.windDirection = value.winddirection;
            this.humidity = value.humidity;
          })
        //获取预报天气
        let url2 = `https://restapi.amap.com/v3/weather/weatherInfo?extensions=all&city=${adcode}&key=11e9c2a30d26b50471e7e1487dcd8a86`
        this.axios.get(url2)
          .then((data)=>{
            let arr = data.data.forecasts[0].casts;
        
            this.path.Tdaytemp = arr[0].daytemp;
            this.path.Tdaywind = arr[0].daywind;
            this.path.Tdaypower = arr[0].daypower;
            this.path.Tnighttemp = arr[0].nighttemp;
            this.path.Tnightwind = arr[0].nightwind;
            this.path.Tnightpower = arr[0].nightpower;
        
            this.path.Adaytemp = arr[1].daytemp;
            this.path.Adaywind = arr[1].daywind;
            this.path.Adaypower = arr[1].daypower;
            this.path.Anighttemp = arr[1].nighttemp;
            this.path.Anightwind = arr[1].nightwind;
            this.path.Anightpower = arr[1].nightpower;
            
            //向body发送数据
            connect.$emit("renderbody",this.path);
            //向图表发送数据
            connect.$emit("getTemp",{
              today:arr[0].daytemp,
              tomorrow:arr[1].daytemp,
              third:arr[2].daytemp,
            })
          })
      },
    },
    beforeMount() {
      //不点击就执行一次默认
      this.whichcity();
    },
    mounted() {
      function calTime(){
        let date = new Date().toLocaleString();
        let end = date.slice(10, date.length);
        this.time = end;
      }
      let a = calTime.bind(this);
      a();
      //自动把时间显示出来
      setInterval(a, 1000)
    }
  }
</script>

<style scoped lang="less">
  .top{
    width:100%;
    height:0.7rem;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .time{
      width:1.9rem;
      height:100%;
      font-size: 0.16rem;
      color:#EEE;
      line-height:0.7rem;
      text-align: center;
      background-color: #333;
    }
    .city{
      height:100%;
      background-color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
