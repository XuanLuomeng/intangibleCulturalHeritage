package com.intangibleCulturalHeritage.mapper;

import org.apache.ibatis.annotations.Param;

public interface LiveMapper {
    /**
     * 通过tid获取直播间推流地址
     * @param tid
     * @return
     */
    String getLiveUrlByTid(@Param("tid")int tid);
}