package com.longhuan.wechatapp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.longhuan.wechatapp.mapper") //扫描的mapper
@SpringBootApplication
public class WechatappApplication {

	public static void main(String[] args) {
		SpringApplication.run(WechatappApplication.class, args);
	}

}
