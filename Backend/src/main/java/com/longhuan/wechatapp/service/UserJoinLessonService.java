package com.longhuan.wechatapp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.longhuan.wechatapp.entity.Lesson;
import com.longhuan.wechatapp.entity.User;
import com.longhuan.wechatapp.entity.UserJoinLesson;
import com.longhuan.wechatapp.mapper.UserJoinLessonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserJoinLessonService extends IService<UserJoinLesson> {
    List<Lesson> getLessonsForUser(User user);
}
