package com.intangibleCulturalHeritage.service;

public interface LikeArticleService {
    /**
     * 用户是否点赞过该文章
     *
     * @param uid
     * @param aid
     * @return
     */
    String isLike(int uid, String aid);

    /**
     * 获取点赞aid列表
     *
     * @param uid
     * @return
     */
    String getLikeArray(int uid);

    /**
     * 修改点赞aid列表
     *
     * @param uid
     * @param likeArray
     */
    void updateLikeArray(int uid, String likeArray);

    /**
     * 删除点赞列表中的aid信息
     *
     * @param aid
     */
    void updateLikeArrays(String aid);

    /**
     * 添加用户信息
     *
     * @param uid
     * @param likeArray
     */
    void insertLikeArray(int uid, String likeArray);
}
