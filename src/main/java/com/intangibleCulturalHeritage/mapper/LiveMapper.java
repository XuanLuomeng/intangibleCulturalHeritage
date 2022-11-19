package com.intangibleCulturalHeritage.mapper;

import org.apache.ibatis.annotations.Param;

public interface LiveMapper {
    /**
     * 通过tid获取直播间推流地址
     *
     * @param tid
     * @return
     */
    String getLiveUrlByTid(@Param("tid") int tid);

    /**
     * 通过tid获取直播间的状态
     *
     * @param tid
     * @return
     */
    int getLiveStateByTid(@Param("tid") int tid);

    /**
     * 通过tid修改直播间的状态
     *
     * @param tid
     * @param state
     */
    void updateLiveStateByTid(@Param("tid") int tid, @Param("state") int state);
}