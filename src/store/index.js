import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addAlertIsShow:false,//增加弹窗显示按钮
    timerCount:localStorage.getItem('timerCount') ? localStorage.getItem("timercount"):"",
    userIdentity:localStorage.getItem("userIdentity")?localStorage.getItem("userIdentity"):"",//3 代表业务员，0代表操作员，3代表用户
    token:localStorage.getItem("token")?localStorage.getItem("token"):"",//用户的token
    token1:localStorage.getItem("token1")?localStorage.getItem("token1"):"",//抽奖用户的token
    mobile:localStorage.getItem("mobile")?localStorage.getItem("mobile"):"",//用户的手机号
    prizeId:localStorage.getItem("prizeId")?localStorage.getItem("prizeId"):"",//抽奖的id
    userId:localStorage.getItem("userId")?localStorage.getItem("userId"):"",//抽奖的id
    curname:localStorage.getItem("curname")?localStorage.getItem("curname"):"",//抽奖的id
    count:localStorage.getItem("count")?localStorage.getItem("count"):"",//抽奖的次数
  },
  mutations: {
    setaddAlertIsShow(state,data){
      state.addAlertIsShow = data
    },
    settimerCount(state,data){
      state.timerCount = data
      localStorage.setItem("timerCount",data)
    },
    setuserIdentity(state,data){
      if(data == 3 || data == 5 || data == 6 || data == 99){
        //以上身份表示 当前的用户是业务员
        state.userIdentity = "salesman"
        localStorage.setItem("userIdentity","salesman")
      }else{
        state.userIdentity = "enforcer"
        localStorage.setItem("userIdentity","enforcer")
      }
    },
    setToken(state,data){
      state.token = data
      localStorage.setItem("token",data)
    },
    setToken1(state,data){
      state.token1 = data
      localStorage.setItem("token1",data)
    },
    setMobile(state,data){
      state.mobile = data
      localStorage.setItem("mobile",data)
    },
    setprizeId(state,data){
      //抽奖场次id
      state.prizeId = data
      localStorage.setItem("prizeId",data)
    },
    setuserId(state,data){
      state.userId = data
      localStorage.setItem("userId",data)
    },
    setcurname(state,data){
      //当前业务员的名字
      state.curname = data
      localStorage.setItem("curname",data)
    },
    setCount(state,data){
      state.count = data
      localStorage.setItem("count",data)
    }
  },
  actions: {
  },
  modules: {
  }
})
