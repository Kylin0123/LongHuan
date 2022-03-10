const http = require('http');

const login = function () {
    // 登录
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId            
                console.log("login success, code:", res.code);
    
                http.post("login", {code: res.code})
                .then(res => {
                    console.log(res);
                    //可以把openid和session保存到本地缓存，方便以后调用
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('session', res.data.session);
                    getApp().globalData.login = true;
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                });
            },
            fail: error => {
                console.log('login failed ' + error);
            }
        })
    })
}

const getMyInfo = function (openid, loading) {
    return http.get("user", {openid: openid}, loading);
}

const updateMyInfo = function (values) {
    return http.post("user", values, false);
}

const getLessonAll = function () {
    return http.get("getLessonAll", {});
}

const joinLesson = function(openid, lessonId) {
    return http.post("joinLesson", {'openid': openid, 'lessonId': lessonId}, false);
}

const leaveLesson = function(openid, lessonId) {
    return http.post("leaveLesson", {'openid': openid, 'lessonId': lessonId}, false);
}

const queryLessonsForUser = function(openid) {
    return http.get("queryLessonsForUser", {'openid': openid}, false);
}

module.exports = {
    login: login,
    getMyInfo: getMyInfo,
    updateMyInfo: updateMyInfo,
    getLessonAll: getLessonAll,
    joinLesson: joinLesson,
    leaveLesson: leaveLesson,
    queryLessonsForUser: queryLessonsForUser
}