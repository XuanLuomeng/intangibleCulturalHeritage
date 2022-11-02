package com.intangibleCulturalHeritage.service;

import com.intangibleCulturalHeritage.pojo.User;

public interface UserService {
    /**
     * 检查用户是否存在
     *
     * @param userId
     * @return
     */
    boolean isExistUser(String userId);

    /**
     * 插入用户(包括密码加密)
     *
     * @param user
     */
    void insertUser(User user);

    /**
     * 检查userid和密码
     *
     * @param userId
     * @param password
     */
    boolean checkPassword(String userId, String password);

    /**
     * 通过用户账号获取用户名
     *
     * @param userId
     * @return
     */
    String getUserNameByUserId(String userId);

    /**
     * 通过账号获取用户uid
     *
     * @param userId
     * @return
     */
    int getUidByUserId(String userId);

    /**
     * 通过userId获取用户所有信息（不包含uid,密码和盐）
     *
     * @param userId
     * @return
     */
    User getUserAllInfoByUserId(String userId);

    /**
     * 检测旧密码是否正确,若正确，则修改密码为新密码
     *
     * @param userId
     * @param oldPassword
     * @param newPassword
     * @return
     */
    boolean checkPasswordAndUpdate(String userId, String oldPassword, String newPassword);

    /**
     * 通过user信息修改用户信息
     *
     * @param user
     */
    void updateUserInfoByUser(User user);
}
