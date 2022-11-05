package com.intangibleCulturalHeritage.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.intangibleCulturalHeritage.mapper.ArticleMapper;
import com.intangibleCulturalHeritage.pojo.Article;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.service.ArticleService;
import com.intangibleCulturalHeritage.service.LikeArticleService;
import com.intangibleCulturalHeritage.utils.TimeDiffer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.List;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private LikeArticleService likeArticleService;

    @Override
    public Page getArticlePageInfo(int pageNum, int uid) throws ParseException {
        com.github.pagehelper.Page<Object> pageUtil = PageHelper.startPage(pageNum, 5);
        List<Article> allArticle = articleMapper.getAllArticle();
        PageInfo<Article> pageInfo = new PageInfo<>(allArticle, 8);
        Page<Article> page = new Page<>();
        page.setTotalCount((int) pageInfo.getTotal());
        page.setTotalPage(pageInfo.getPages());
        page.setCurrentPage(pageNum);
        page.setPageSize(5);
        page.setSize(pageInfo.getSize());
        page.setHasNextPage(pageInfo.isHasNextPage());
        page.setHasPreviousPage(pageInfo.isHasPreviousPage());
        page.setNavigatePages(pageInfo.getNavigatePages());
        page.setNavigatePageNums(pageInfo.getNavigatepageNums());

        /**
         * 设置发布时间差
         */
        for (int i = 0; i < allArticle.size(); i++) {
            String date = allArticle.get(i).getDate();
            TimeDiffer timeDiffer = new TimeDiffer(date);
            allArticle.get(i).setTimeDiffer(timeDiffer.getTime());
        }

        /**
         * 若uid不为空则通过LikeArticleService获取对应文章是否点过赞并设置给Article的isLike，否则所有Article的isLike设置为False
         */
        if (uid != 0) {
            for (int len = 0; len < allArticle.size(); len++) {
                String aid = String.valueOf(allArticle.get(len).getAid());
                allArticle.get(len).setIsLike(likeArticleService.isLike(uid, aid));
            }
        } else {
            for (int len = 0; len < allArticle.size(); len++) {
                allArticle.get(len).setIsLike("0");
            }
        }

        page.setList(allArticle);
        return page;
    }

    @Override
    public Page getUserArticlePageInfo(int pageNum, int uid) throws ParseException {
        com.github.pagehelper.Page<Object> pageUtil = PageHelper.startPage(pageNum, 5);
        List<Article> userArticle = articleMapper.getUserArticle(uid);
        PageInfo<Article> pageInfo = new PageInfo<>(userArticle, 8);
        Page<Article> page = new Page<>();
        page.setTotalCount((int) pageInfo.getTotal());
        page.setTotalPage(pageInfo.getPages());
        page.setCurrentPage(pageNum);
        page.setPageSize(5);
        page.setSize(pageInfo.getSize());
        page.setHasNextPage(pageInfo.isHasNextPage());
        page.setHasPreviousPage(pageInfo.isHasPreviousPage());
        page.setNavigatePages(pageInfo.getNavigatePages());
        page.setNavigatePageNums(pageInfo.getNavigatepageNums());

        /**
         * 设置发布时间差
         */
        for (int i = 0; i < userArticle.size(); i++) {
            String date = userArticle.get(i).getDate();
            TimeDiffer timeDiffer = new TimeDiffer(date);
            userArticle.get(i).setTimeDiffer(timeDiffer.getTime());
        }

        /**
         * 通过LikeArticleService获取对应文章是否点过赞并设置给Article的isLike
         */
        for (int len = 0; len < userArticle.size(); len++) {
            String aid = String.valueOf(userArticle.get(len).getAid());
            userArticle.get(len).setIsLike(likeArticleService.isLike(uid, aid));
        }

        page.setList(userArticle);
        return page;
    }

    @Override
    public void insertArticle(Article article) {
        articleMapper.insertArticle(article);
    }

    @Override
    public void deleteArticleByAid(int aid) {
        articleMapper.deleteArticleByAid(aid);
    }

    @Override
    public void updateArticle(Article article) {
        articleMapper.updateArticle(article);
    }

    @Override
    public Article getUserArticleByAid(int aid) throws ParseException {
        Article article = articleMapper.getUserArticleByAid(aid);
        /**
         * 设置发布时间差
         */
        String date = article.getDate();
        TimeDiffer timeDiffer = new TimeDiffer(date);
        article.setTimeDiffer(timeDiffer.getTime());
        return article;
    }
}