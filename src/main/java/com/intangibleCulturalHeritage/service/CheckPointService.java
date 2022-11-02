package com.intangibleCulturalHeritage.service;

public interface CheckPointService {
    /**
     * 通过uid添加闯关信息
     *
     * @param uid
     */
    void insertCheckPointInfoByUid(int uid);

    /**
     * 获取闯关相关信息
     *
     * @param uid
     * @return
     */
    String getCheckPointInfoByUid(int uid);

    /**
     * 通过uid修改闯关内容
     *
     * @param uid
     * @param cpNum
     */
    void updateCheckPointInfoByUid(int uid, String cpNum);
}
