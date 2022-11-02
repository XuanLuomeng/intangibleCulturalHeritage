package com.intangibleCulturalHeritage.mapper;

import com.intangibleCulturalHeritage.pojo.WikiPedia;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 百科mapper
 */
public interface WikiPediaMapper {
    /**
     * 获取所有百科(包括模糊查询)
     *
     * @return
     */
    List<WikiPedia> getAllWikiPedia(@Param("str") String str);

    /**
     * 百科发布
     *
     * @param wikiPedia
     */
    void insertWikiPedia(WikiPedia wikiPedia);

    /**
     * 通过wid删除百科
     *
     * @param wid
     */
    void deleteWikiPediaByWid(@Param("wid") int wid);

    /**
     * 百科修改
     *
     * @param wikiPedia
     */
    void updateWikiPedia(WikiPedia wikiPedia);
}
