package com.intangibleCulturalHeritage.service.impl;

import com.intangibleCulturalHeritage.mapper.IntangibleRecordsMapper;
import com.intangibleCulturalHeritage.pojo.IntangibleRecords;
import com.intangibleCulturalHeritage.service.IntangibleRecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IntangibleRecordsServiceImpl implements IntangibleRecordsService {
    @Autowired
    private IntangibleRecordsMapper intangibleRecordsMapper;

    @Override
    public List<IntangibleRecords> getAllRecords() {
        List<IntangibleRecords> intangibleRecords = intangibleRecordsMapper.getIntangibleRecords();
        return intangibleRecords;
    }
}
