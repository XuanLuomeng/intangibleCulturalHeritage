package com.intangibleCulturalHeritage.mapper;

import com.intangibleCulturalHeritage.pojo.LikeArticle;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 点赞mapper
 */
public interface LikeArticleMapper {
    /**
     * 通过uid获取点赞的文章aid列表（包含模糊查询功能，用于检测是否点赞过某篇文章）
     *
     * @param uid
     * @return
     */
    String getLikeArrayOrIsLikeByUidAndAid(@Param("uid") int uid, @Param("aid") String aid);

    /**
     * 通过修改点赞aid列表来增加点赞的文章
     *
     * @param uid
     * @param likeArray
     */
    void updateLikeArticleByUpdateLikeArray(@Param("uid") int uid, @Param("likeArray") String likeArray);

    /**
     * 通过模糊查询获取相关的用户信息（便于删除文章时，删除点赞列表记录）
     *
     * @param aid
     * @return
     */
    List<LikeArticle> getUidAndListByLike(@Param("aid") String aid);

    /**
     * 添加用户
     * @param uid
     * @param likeArray
     */
    void insertUidAndLikeArray(@Param("uid") int uid, @Param("likeArray") String likeArray);
}
