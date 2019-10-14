//index.js
//获取应用实例
const app = getApp()

Page({
//  定以数据
  data: { 
    userInfo:'',
    iv: '',
    encrypteedData: "",
    code: '',
    hasUserInfo: false,
  },
// 点击事件
  getUserInfo:function(e){
    let that = this;
    that.setData({
      hasUserInfo: true
    })
    that.data.userInfo = e.detail.userInfo
    that.data.encrypteedData = e.detail.encrypteedData;
    that.data.iv = e.detail.iv;
    console.log(e)

    if(e.detail.userInfo){
        wx.login({
          success(res){
            console.log(res)
            if(res.code){
                that.data.code=res.code;
                // 登录接口
                wx.request({
                  url: 'https://api.it120.cc/9LYY/user/wxapp/login',
                  data:{
                    code:res.code
                  },
                  success:(res)=>{
                    console.log(res)
                    if(res.code==10000){
                      // 等于10000表示未注册，调用注册接口
                      that.register(res.code)
                    }
                  }
                })
            }else{
              console.log('登录失败！'+res.errMsg)
            }
          }
        })
    }   
  },
  // 注册接口
  register(code){
    let that=this;
    wx.request({
      url: 'https://api.it120.cc/9LYY/user/wxapp/register/complex',
      data:{
        code:that.data.code,
        iv:that.data.iv,
        encrypteedData: that.data.encrypteedData
      },
      success:function(res){
        console.log(res)
      }
    })
  }
})
