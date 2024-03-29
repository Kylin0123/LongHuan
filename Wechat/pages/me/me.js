// pages/me/me.js
let api = require('../../utils/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: false
    },

    onLogin: function() {
        api.login().then((res) => {
            this.setData({
                login: getApp().globalData.login,
                openid: res.data.openid
            })
        });
    },

    onLogout: function () {
        getApp().globalData.login = false;
        wx.reLaunch({
            url: '/pages/home/home'
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
        this.setData({
            login: getApp().globalData.login
        })
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