package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class Comment {
    /**
     * cid:评论的id
     * content:评论内容
     * date:评论的日期
     * aid:评论的文章id
     * uid:评论的用户id
     * userName:评论的用户
     * photo:评论的用户的头像地址
     */
    private int cid;
    private String content;
    private String date;
    private int aid;
    private int uid;
    private String userName;
    private String photoUrl;
}
