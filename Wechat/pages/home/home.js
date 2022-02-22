// pages/home/home.js
const http = require('../../utils/http.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: false
    },

    onLogin: function () {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId            
                console.log("login success, code:", res.code);

                http.get("login", {
                    'content-type': 'application/json'
                }, {code: res.code})
                .then(res => {
                    console.log(res);
                    //可以把openid和session保存到本地缓存，方便以后调用
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('session', res.data.session);
                    getApp().globalData.login = true;
                    this.setData({
                        login: getApp().globalData.login,
                        openid: res.data.openid
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            },
            fail: error => {
                console.log('login failed ' + error);
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            login: getApp().globalData.login
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})