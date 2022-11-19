package com.intangibleCulturalHeritage.service;

public interface LiveService {
    /**
     * 通过tid获取直播间推流地址
     *
     * @param tid
     * @return
     */
    String getLiveUrlByTid(int tid);

    /**
     * 通过tid获取直播间的状态
     *
     * @param tid
     * @return
     */
    boolean getLiveStateByTid(int tid);

    /**
     * 通过tid修改直播间的状态
     *
     * @param tid
     * @param state
     */
    void updateLiveStateByTid(int tid, int state);
}
