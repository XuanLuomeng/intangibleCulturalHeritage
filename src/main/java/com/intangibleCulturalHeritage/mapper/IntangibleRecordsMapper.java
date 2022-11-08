package com.intangibleCulturalHeritage.mapper;

import com.intangibleCulturalHeritage.pojo.IntangibleRecords;

import java.util.List;

/**
 * 非遗记录
 */
public interface IntangibleRecordsMapper {
    /**
     * 获取非遗记录
     * @return
     */
    List<IntangibleRecords> getIntangibleRecords();
}
