// pages/myJoin/myJoin.js
const http = require('../../utils/http.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        lessonItems: []
    },

    onLeaveLesson: function(e) {
        var lessonIdx = e.currentTarget.dataset.lessonidx;
        var that = this;
        console.log(e.currentTarget.dataset)
        http.get("leaveLesson", {
            "Content-Type": "application/www-form-urlencoded"
        }, {
            openid: wx.getStorageSync('openid'),
            lessonId: that.data.lessonItems[lessonIdx].id
        }).then(res => {
            wx.showToast({
              title: '退课成功！'
            })
            this.onLoad();
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.get("queryLessonsForUser", {
            "Content-Type": "application/www-form-urlencoded"
        }, {
            openid: wx.getStorageSync('openid')
        }).then(res => {
            console.log(res.data)
            this.setData({
                lessonItems: res.data.lessons
            })
        })
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