// pages/myJoin/myJoin.js
import api from '../../utils/api';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        lessonItems: []
    },

    getMyLessons: function(loading) {
        api.queryLessonsForUser(wx.getStorageSync('openid'), loading)
            .then(res => {
                console.log(res.data)
                this.setData({
                    lessonItems: res.data.lessons
                })
            });
    },

    onLeaveLesson: function (e) {
        console.log(e);
        var lessonId = e.currentTarget.dataset.lessonid;
        var that = this;
        api.leaveLesson(wx.getStorageSync('openid'), lessonId)
            .then(res => {
                console.log("退课成功");
                Toast.success('退课成功');
                that.getMyLessons(false);
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        api.queryLessonsForUser(wx.getStorageSync('openid'), true)
            .then(res => {
                console.log(res.data)
                this.setData({
                    lessonItems: res.data.lessons
                })
            });
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