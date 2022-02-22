package com.longhuan.wechatapp.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.longhuan.wechatapp.entity.Lesson;
import com.longhuan.wechatapp.mapper.LessonMapper;
import org.springframework.stereotype.Service;

@Service
public class LessonServiceImpl extends ServiceImpl<LessonMapper, Lesson> implements LessonService {

}
