package com.intangibleCulturalHeritage.utils;

import lombok.Data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class TimeDiffer {
    String time;
    public TimeDiffer(String oldTime) throws ParseException {
        Date pushdate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String now = simpleDateFormat.format(pushdate);
        long nowtime = simpleDateFormat.parse(now).getTime();
        long time = simpleDateFormat.parse(oldTime).getTime();
        long cha = nowtime - time;
        this.time = String.valueOf(cha/1000/60);
    }
}
