package com.intangibleCulturalHeritage.service;

import com.intangibleCulturalHeritage.pojo.Article;
import com.intangibleCulturalHeritage.pojo.Page;

import java.text.ParseException;

public interface ArticleService {
    /**
     * 通过文章页码获取分页信息(包括搜索功能，若uid不为空，则附加查询获取该用户是否点赞该文章)
     *
     * @param pageNum
     * @return
     */
    Page getArticlePageInfo(int pageNum, int uid) throws ParseException;

    /**
     * 通过文章页码获取用户分页信息(包括搜索功能，若uid不为空，则附加查询获取该用户是否点赞该文章)
     *
     * @param pageNum
     * @param uid
     * @return
     */
    Page getUserArticlePageInfo(int pageNum, int uid) throws ParseException;

    /**
     * 发布文章
     *
     * @param article
     */
    void insertArticle(Article article);

    /**
     * 通过文章aid删除文章
     *
     * @param aid
     */
    void deleteArticleByAid(int aid);

    /**
     * 修改文章标题，内容
     *
     * @param article
     */
    void updateArticle(Article article);

    /**
     * 通过aid获取用户点赞或者评论过的文章相关内容(包括分享获取文章)
     *
     * @param aid
     * @return
     */
    Article getUserArticleByAid(int aid) throws ParseException;
}
