package com.intangibleCulturalHeritage.service.impl;

import com.intangibleCulturalHeritage.mapper.CheckPointMapper;
import com.intangibleCulturalHeritage.service.CheckPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CheckPointServiceImpl implements CheckPointService {
    @Autowired
    private CheckPointMapper checkPointMapper;

    @Override
    public void insertCheckPointInfoByUid(int uid) {
        checkPointMapper.insertCpNumByUid(uid);
    }

    @Override
    public String getCheckPointInfoByUid(int uid) {
        String cpNum = checkPointMapper.getCpNumByUid(uid);
        return cpNum;
    }

    @Override
    public void updateCheckPointInfoByUid(int uid, String cpNum) {
        checkPointMapper.updateCpNumByUid(uid, cpNum);
    }
}
