package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class User {
    /**
     * id:用户编号
     * userId:用户账号
     * password:密码
     * salt:盐
     * userName:用户名
     * sex:性别
     * birthday:生日
     * telephone:电话号码
     * email:邮箱
     * photo:头像
     */
    private int id;
    private String userId;
    private String password;
    private String salt;
    private String userName;
    private String sex;
    private String birthday;
    private String telephone;
    private String email;
    private String photo;

    public User() {
    }

    public User(String userId, String password, String salt, String userName, String sex, String telephone, String birthday, String email, String photo) {
        this.userId = userId;
        this.password = password;
        this.salt = salt;
        this.userName = userName;
        this.sex = sex;
        this.telephone = telephone;
        this.birthday = birthday;
        this.email = email;
        this.photo = photo;
    }

}
