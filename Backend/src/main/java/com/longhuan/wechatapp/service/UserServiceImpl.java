package com.longhuan.wechatapp.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.longhuan.wechatapp.entity.User;
import com.longhuan.wechatapp.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
