package com.intangibleCulturalHeritage.service.impl;

import com.intangibleCulturalHeritage.mapper.LiveMapper;
import com.intangibleCulturalHeritage.service.LiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LiveServiceImpl implements LiveService {
    @Autowired
    private LiveMapper liveMapper;

    @Override
    public String getLiveUrlByTid(int tid) {
        return liveMapper.getLiveUrlByTid(tid);
    }

    @Override
    public boolean getLiveStateByTid(int tid) {
        int liveStateByTid = liveMapper.getLiveStateByTid(tid);
        if (liveStateByTid == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void updateLiveStateByTid(int tid, int state) {
        liveMapper.updateLiveStateByTid(tid, state);
    }
}
