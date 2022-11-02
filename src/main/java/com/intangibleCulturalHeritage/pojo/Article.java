package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Article {
    /**
     * aid:文章id
     * title:标题
     * content:内容
     * date:发布日期
     * timeDiffer:发布时间与目前的分钟时间差
     * userName:作者名
     * photo:用户头像地址
     * isLike:是否喜欢该篇文章（此功能只有在已登录的前提下才有效）
     * uid:作者id
     * commentPage:评论分页
     */
    private int aid;
    private String title;
    private String content;
    private String picture;
    private String date;
    private String timeDiffer;
    private String userName;
    private String photo;
    private String isLike;
    private int uid;
    private List<Comment> comments;
}
