package com.intangibleCulturalHeritage.mapper;

import com.intangibleCulturalHeritage.pojo.WikiPedia;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 百科mapper
 */
public interface WikiPediaMapper {
    /**
     * 获取百科
     *
     * @return
     */
    WikiPedia getWikiPediaByTitle(@Param("str") String str);

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
