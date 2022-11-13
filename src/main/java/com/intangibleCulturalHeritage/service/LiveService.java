package com.intangibleCulturalHeritage.service;

public interface LiveService {
    /**
     * 通过tid获取直播间推流地址
     * @param tid
     * @return
     */
    String getLiveUrlByTid(int tid);
}
