package com.intangibleCulturalHeritage.service;

import com.intangibleCulturalHeritage.pojo.IntangibleRecords;

import java.util.List;

public interface IntangibleRecordsService {
    /**
     * 获取所有省份的非遗数量记录
     * @return
     */
    List<IntangibleRecords> getAllRecords();
}
