package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.Article;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.service.ArticleService;
import com.intangibleCulturalHeritage.service.LikeArticleService;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class LikeArticleController {
    @Autowired
    private LikeArticleService likeArticleService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;

    /**
     * 点赞文章
     *
     * @param aid
     * @param session
     */
    @ResponseBody
    @RequestMapping("/likeArticle")
    public void LikeArticle(String aid, HttpSession session) {
        /**
         * 获取参数
         */
        Object userId = session.getAttribute("userId");
        int uid = userService.getUidByUserId((String) userId);

        /**
         * 通过uid获取用户原有的点赞aid列表，然后用字符串拼接方法将前端点赞的aid拼接到原点赞列表并保存到数据库中
         */
        String likeArray = likeArticleService.getLikeArray(uid);
        likeArray += aid + ",";
        likeArticleService.updateLikeArray(uid, likeArray);
    }

    /**
     * 获取个人点赞过的文章page信息
     */
    @RequestMapping("/userLikeArticle")
    public void UserLikeArticle(String currentPageStr, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取相关内容，判断分页页码，是否模糊查询……
         */
        String userId = (String) session.getAttribute("userId");

        int uid = userService.getUidByUserId(userId);

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
         * 通过字符串分割获取点赞过的文章aid
         */
        Page<Article> page = new Page<>();
        String likeArray = likeArticleService.getLikeArray(uid);
        if (likeArray != null) {
            String[] likeList = likeArray.split(",");

            /**
             * 获取部分分页内容
             */
            page.setTotalCount(likeList.length);
            page.setPageSize(5);
            page.setTotalPage((likeList.length) % 5 == 0 ? (likeList.length) / 5 : (likeList.length) / 5 + 1);
            page.setSize(currentPage == page.getTotalPage() ? (likeList.length) % 5 : 5);
            int limitStart = (currentPage - 1) * 5;
            int limitEnd = limitStart + 5;
            /**
             * 防止文章不足5篇时数组越界
             */
            System.out.println(likeList.length + "," + limitStart);
            if (currentPage == page.getTotalPage()) {
                limitEnd = limitStart + likeList.length % 5;
            }
            List<Article> articles = new ArrayList<>();

            /**
             * 获取相对页数的点赞过的文章
             */
            for (int i = limitStart; i < limitEnd; i++) {
                /**
                 * 防止""空值查询
                 */
                if (!likeList[i].equals("")) {
                    Article article = null;
                    try {
                        article = articleService.getUserLikeOrCommentedArticleByAid(Integer.parseInt(likeList[i]));
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    articles.add(article);
                }
            }
            page.setList(articles);
        } else {
            page.setTotalCount(0);
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
}
