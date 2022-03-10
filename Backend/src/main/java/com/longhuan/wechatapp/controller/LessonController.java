package com.longhuan.wechatapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.longhuan.wechatapp.entity.User;
import com.longhuan.wechatapp.entity.UserJoinLesson;
import com.longhuan.wechatapp.result.WechatResult;
import com.longhuan.wechatapp.entity.Lesson;
import com.longhuan.wechatapp.service.LessonService;
import com.longhuan.wechatapp.service.UserJoinLessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Wrapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @Autowired
    UserJoinLessonService userJoinLessonService;

    @RequestMapping(path = "/getLessonAll", method = RequestMethod.GET)
    public WechatResult getLessonAll() {
        List<Lesson> lessons = lessonService.list();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("lessons", lessons);
        return new WechatResult(jsonObject);
    }

    @RequestMapping(path = "/joinLesson", method = RequestMethod.POST)
    public WechatResult joinLesson(@RequestParam String openid, @RequestParam int lessonId) {
        UserJoinLesson userJoinLesson = new UserJoinLesson();
        userJoinLesson.setUserOpenid(openid);
        userJoinLesson.setLessonId(lessonId);
        try {
            userJoinLessonService.save(userJoinLesson);
        } catch (Exception e) {
            Throwable cause = e.getCause();
            if (cause instanceof SQLIntegrityConstraintViolationException) {
                String sqlState = ((SQLIntegrityConstraintViolationException) cause).getSQLState();
                return new WechatResult(0, "已报名该课程");
            }
            return new WechatResult(0, e.getMessage());
        }
        return new WechatResult(1, "报名成功！");
    }

    @RequestMapping(path = "/queryLessonsForUser", method = RequestMethod.GET)
    public WechatResult queryLessonsForUser(@RequestParam String openid) {
        User user = new User();
        user.setOpenid(openid);
        List<Lesson> lessons = userJoinLessonService.getLessonsForUser(user);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("lessons", lessons);
        WechatResult result = new WechatResult(jsonObject, "数据查询成功！");
        return result;
    }

    @RequestMapping(path = "/leaveLesson", method = RequestMethod.POST)
    public WechatResult leaveLesson(@RequestParam String openid, @RequestParam int lessonId) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_openid", openid);
        params.put("lesson_id", lessonId);
        userJoinLessonService.removeByMap(params);
        return new WechatResult(1, "退课成功！");
    }

}