package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.Article;
import com.intangibleCulturalHeritage.pojo.Comment;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.service.ArticleService;
import com.intangibleCulturalHeritage.service.CommentService;
import com.intangibleCulturalHeritage.service.LikeArticleService;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @Autowired
    private LikeArticleService likeArticleService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    /**
     * 通过aid删除文章,以及删除点赞列表中有该aid的数据
     */
    @ResponseBody
    @RequestMapping("/addArticleViewCount")
    public void DeleteArticle(String aid) {
        if (aid != null) {
            if (aid != "") {
                articleService.deleteArticleByAid(Integer.parseInt(aid));
                likeArticleService.updateLikeArrays(aid);
            }
        }
    }

    /**
     * 分页获取文章(初始化)
     */
    @ResponseBody
    @RequestMapping("/Article")
    public void GetArticle(String currentPageStr, HttpSession session, HttpServletResponse response) throws IOException {
        Object userId = session.getAttribute("userId");
        int uid = 0;
        if (userId != null) {
            uid = userService.getUidByUserId((String) userId);
        }

        /**
         * 处理参数(防止空指针异常)
         */
        int currentPage = 0;
        if (currentPageStr != null && currentPageStr.length() > 0) {
            currentPage = Integer.parseInt(currentPageStr);
        } else {
            currentPage = 1;
        }

        /**
         * 查询文章Page对象
         */
        Page<Article> page = new Page<>();
        try {
            page = articleService.getArticlePageInfo(currentPage, uid);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        /**
         * 查询评论
         */
        List<Comment> comments = new ArrayList<>();
        for (int i = 0; i < page.getSize(); i++) {
            int aid = page.getList().get(i).getAid();
            comments = commentService.getComments(aid);
            page.getList().get(i).setComments(comments);
        }

        /**
         * 将page序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(page);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 获取用户文章
     */
    @RequestMapping("/UserArticle")
    public void GetUserArticle(String currentPageStr, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取请求参数
         */
        Object userId = session.getAttribute("userId");
        int uid = userService.getUidByUserId((String) userId);

        /**
         * 处理参数(防止空指针异常)
         */
        int currentPage = 0;
        if (currentPageStr != null && currentPageStr.length() > 0) {
            currentPage = Integer.parseInt(currentPageStr);
        } else {
            currentPage = 1;
        }

        /**
         * 查询Page对象
         */
        Page<Article> page = null;
        try {
            page = articleService.getUserArticlePageInfo(currentPage, uid);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        /**
         * 将page序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(page);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 发布文章
     */
    @RequestMapping("/InsertArticle")
    public void InsertArticle(String title, String content, HttpSession session) {
        /**
         * 获取参数，并获取当前时间
         */
        Date pushdate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        /**
         * 获取当前用户uid信息,并用该uid去上传文章
         */
        Object user = session.getAttribute("userId");
        String userId = (String) user;
        int uid = userService.getUidByUserId(userId);

        /**
         * 设置文章相关信息
         */
        Article articlePush = new Article();
        articlePush.setUid(uid);
        articlePush.setTitle(title);
        articlePush.setContent(content);
        articlePush.setDate(simpleDateFormat.format(pushdate));

        /**
         * 保存至数据库
         */
        articleService.insertArticle(articlePush);
    }

    /**
     * 修改文章内容
     */
    @RequestMapping("/UpdateArticle")
    public void UpdateArticle(String aid, String title, String content) {
        /**
         * 获取修改内容
         */
        Article article = new Article();
        article.setAid(Integer.parseInt(aid));
        article.setTitle(title);
        article.setContent(content);

        /**
         * 执行修改操作
         */
        articleService.updateArticle(article);
    }
}
