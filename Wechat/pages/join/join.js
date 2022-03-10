// pages/join/join.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import api from '../../utils/api';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        phoneNum: "",
        currentLessonIdx: null,
        hiddenmodalput: true, //隐藏Modal
        LessonItems: [],
        courseQuery: ""
    },

    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    onTapLesson: function (e) {
        if (getApp().globalData.login == false) {
            Toast.fail("请登录后报名");
            return;
        }
        Dialog.confirm({
            title: '课程报名',
            message: '确认报名: ' + this.data.LessonItems[e.currentTarget.dataset.lessonidx].name,
        })
            .then(() => {
                // on confirm
                api.joinLesson(
                    wx.getStorageSync('openid'),
                    this.data.LessonItems[e.currentTarget.dataset.lessonidx].id)
                    .then(res => {
                        Toast.success('报名成功');
                    });
            })
            .catch(() => {
                // on cancel
            });

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        api.getLessonAll()
            .then(res => {
                that.setData({
                    LessonItems: res.data.lessons
                })
            });
        console.log(this.data.LessonItems);
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