package com.intangibleCulturalHeritage.service.impl;

import com.intangibleCulturalHeritage.mapper.UserMapper;
import com.intangibleCulturalHeritage.pojo.User;
import com.intangibleCulturalHeritage.service.UserService;
import com.intangibleCulturalHeritage.utils.EncryptByMd5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean isExistUser(String userId) {
        User user = userMapper.selectUserByUserId(userId);
        if (user != null) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void insertUser(User user) {
        EncryptByMd5 encrypt = new EncryptByMd5(user.getPassword());
        //Password encryption
        user.setPassword(encrypt.getSimpleHash());
        user.setSalt(encrypt.getSalt());
        userMapper.insertUser(user);
    }

    @Override
    public boolean checkPassword(String userId, String password) {
        User user = userMapper.selectUserByUserId(userId);
        if (user != null) {
            EncryptByMd5 encrypt = new EncryptByMd5(password, user.getSalt());
            if (encrypt.getSimpleHash().equals(user.getPassword())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public String getUserNameByUserId(String userId) {
        String userName = userMapper.selectUserNameByUserId(userId);
        return userName;
    }

    @Override
    public int getUidByUserId(String userId) {
        String uidStr = userMapper.selectUidByUserId(userId);
        int uid = 0;
        if (uidStr != null) {
            uid = Integer.parseInt(uidStr);
        }
        return uid;
    }

    @Override
    public User getUserAllInfoByUserId(String userId) {
        User user = userMapper.selectUserAllInfoByUserId(userId);
        return user;
    }

    @Override
    public boolean checkPasswordAndUpdate(String userId, String oldPassword, String newPassword) {
        User user = userMapper.selectUserByUserId(userId);
        EncryptByMd5 encrypt = new EncryptByMd5(oldPassword, user.getSalt());
        if (encrypt.getSimpleHash().equals(user.getPassword())) {
            /**
             * 重新加密,然后将新密码和新盐修改保存到数据库
             */
            EncryptByMd5 encrypt1 = new EncryptByMd5(newPassword);
            userMapper.updatePasswordAndSaltByUserId(userId, encrypt1.getSimpleHash(), encrypt1.getSalt());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void updateUserInfoByUser(User user) {
        userMapper.updateUserInfo(user);
    }
}
