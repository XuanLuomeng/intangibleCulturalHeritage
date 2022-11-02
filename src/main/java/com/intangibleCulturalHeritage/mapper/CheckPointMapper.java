package com.intangibleCulturalHeritage.mapper;

import org.apache.ibatis.annotations.Param;

/**
 * 闯关mapper
 */
public interface CheckPointMapper {
    /**
     * 根据用户uid获取闯关的数据
     *
     * @param uid
     * @return
     */
    String getCpNumByUid(@Param("cpUid") int uid);

    /**
     * 通过用户id编号修改闯关记录
     *
     * @param cpUid
     * @param cpNum
     */
    void updateCpNumByUid(@Param("cpUid") int cpUid, @Param("cpNum") String cpNum);

    /**
     * 通过用户id编号添加闯关记录
     *
     * @param cpUid
     */
    void insertCpNumByUid(@Param("cpUid") int cpUid);
}
