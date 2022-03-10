// index.js
// 获取应用实例

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
let api = require('../../utils/api');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    openid: "this_is_openid",
    username: "",
    age: "",
    gender: "",
    phone: "",
    wxId: "",
    email: "",
    personalInfo: "",
    showGenderPopup: false,
    debugActiveNames: []
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  validateStr(str) {
    return str === null ? "" : str;
  },

  getMyInfo(loading) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
    const openid = wx.getStorageSync('openid');
    var that = this;
    api.getMyInfo(openid, loading).then(res => {
      const user = res.data.user;
      console.log("load:");
      console.log(user);
      that.setData({
        openid: this.validateStr(user.openid),
        username: this.validateStr(user.username),
        age: this.validateStr(user.age),
        gender: this.validateStr(user.gender),
        phone: this.validateStr(user.phone),
        wxId: this.validateStr(user.wxId),
        email: this.validateStr(user.email),
        personalInfo: this.validateStr(user.personalInfo)
      });
    });
  },

  formSubmit (e) {
    let values = e.detail.value;
    console.log("to be submit:");
    console.log(values);
    api.updateMyInfo({openid: this.data.openid, ...values}).then(() => {
      Toast.success('更新成功');
      this.getMyInfo(false);
    })
  },

  onLoad() {
    this.getMyInfo(true);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  onGenderClick(e) {
    this.setData({
      "showGenderPopup": true
    })
  },
  onGenderConfirm(e) {
    this.setData({
      "gender": e.detail.value,
      "showGenderPopup": false
    })
  },
  onGenderCancel(e) {
    this.setData({
      "showGenderPopup": false
    });
  },
  onDebugInfoChange(e) {
    this.setData({
      "debugActiveNames": e.detail
    })
  }
})
