package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class LikeArticle {
    /**
     * lUid:用户id编号
     * lAidArray:点赞文章aid的字符串
     * aidArray点赞文章aid组
     */
    private int lUid;
    private String lAidArray;
    private String[] aidArray;
}
