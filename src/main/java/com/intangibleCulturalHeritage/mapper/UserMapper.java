package com.intangibleCulturalHeritage.mapper;

import com.intangibleCulturalHeritage.pojo.User;
import org.apache.ibatis.annotations.Param;

/**
 * 用户mapper
 */
public interface UserMapper {
    /**
     * 通过用户账号查询用户
     *
     * @param userId
     * @return
     */
    User selectUserByUserId(@Param("userId") String userId);

    /**
     * 添加用户
     */
    void insertUser(User user);

    /**
     * 通过用户账号获取用户名
     *
     * @param userId
     * @return
     */
    String selectUserNameByUserId(@Param("userId") String userId);

    /**
     * 通过用户账号获取uid
     *
     * @param userId
     * @return
     */
    String selectUidByUserId(@Param("userId") String userId);

    /**
     * 通过用户userId获取所有信息（不包含密码和盐）
     *
     * @param userId
     * @return
     */
    User selectUserAllInfoByUserId(@Param("userId") String userId);

    /**
     * 通过userid修改password和salt
     *
     * @param userId
     * @param password
     * @param salt
     */
    void updatePasswordAndSaltByUserId(@Param("userId") String userId, @Param("password") String password, @Param("salt") String salt);

    /**
     * 修改用户个人信息
     *
     * @param user
     */
    void updateUserInfo(User user);
}
