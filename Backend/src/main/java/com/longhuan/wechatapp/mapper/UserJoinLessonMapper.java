package com.longhuan.wechatapp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.longhuan.wechatapp.entity.Lesson;
import com.longhuan.wechatapp.entity.UserJoinLesson;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserJoinLessonMapper extends BaseMapper<UserJoinLesson> {
    @Select("SELECT * FROM user_join_lesson u LEFT JOIN lesson l ON u.lesson_id=l.id WHERE u.user_openid=#{openid}")
    List<Lesson> selectLessonsByOpenid(String openid);
}