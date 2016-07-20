/**
 * Created by krinjadl on 2016-06-20.
 */
import obigo from '../lib/util';
import AppManager from '../lib/AppManager';
import gLogin from '../lib/gLogin';
import dateValue from '../lib/DateValue';

var retryCount = 0;
var ajaxSuccCount = 0;
var list = {};
var existEventList = {};
var cancelledList = [];
var timer = undefined;
var isStartGetEvent = false;
var isFirstTry = true;
dateValue.init();

function getEvents(calendarIdList,callback){
    var reqSuccCB = callback; //TODO
    var timeMin, timeMax;
    var periodMin = dateValue.date.period.min, periodMax = dateValue.date.period.max;

    timeMin = new Date(periodMin.getFullYear(), periodMin.getMonth(), periodMin.getDate(), 0, 0, 0, 0).toISOString();
    timeMax = new Date(periodMax.getFullYear(), periodMax.getMonth(), periodMax.getDate(), 23, 59, 59, 999).toISOString();

    var rData = {
        key : "AIzaSyCPO7Yedvv8gO36Y8KLf6PRstr8lSqP_v8",
        timeMin : timeMin,
        timeMax : timeMax
    }

    for(var i =0;i<calendarIdList.length;i++){
        (function(i){
            obigo.ajax({
                url: "https://www.googleapis.com/calendar/v3/calendars/"+encodeURIComponent(calendarIdList[i].id)+"/events",
                data: rData,
                type: "GET",
                timeout: 25000,
                //timeout: 100,
                dataType: "json",
                requestHeader : {"Authorization": "OAuth " + gLogin.getAccessOAuthToken()},
                success: function(result) {
                    pushEvent(result.items);
                    // $progress.show({
                    //     text : "Loading Calendar List<br/>"+(ajaxSuccCount+1)+"/"+calendarIdList.length
                    // });
                    ajaxSuccCount ++;
                    if(ajaxSuccCount == calendarIdList.length){
                        isStartGetEvent = false;
                        isFirstTry = false;
                        eventsSave();
                        if(callback) callback({list,existEventList});
                        // loadJS(function(){
                        //     isStartGetEvent = false;
                        //
                        //     isFirstTry = false;
                        //     //success
                        //     events.save();				//save event in local storage
                        //     //set reminder here
                        //     reminder.setRemind();
                        //     reqSuccCB();
                        // });
                    }
                },
                error: function(data, errorStatus) {
                    window.stop();
                    isStartGetEvent = false;

                    ajaxSuccCount = 0;
                    eventsLoad();
                    // reminder.setRemind();
                    // reqSuccCB();


                    if(retryCount >= 3){
                        obigo.message({
                            title : "You have exceeded <br/> 3 attempts. <br/> Please restart the application",
                            button:["OK"],
                            callback:[function(){
                                retryCount = 0;
                                AppManager.stopApplication();
                            }]
                        });
                    }else if(errorStatus){

                        if(errorStatus == "timeerror"){
                            obigo.message({
                                title:"Incorrect date/time. <br/>Please check and try again",
                                button:["OK"],
                                callback : [function(){
                                    if(isFirstTry){
                                        AppManager.stopApplication();
                                        return;
                                    }
                                }]
                            });
                        }else if(errorStatus == "nonetwork"){
                            obigo.message({
                                title : "Wi-Fi network not connected. <br/> Please check and try again",
                                button:["OK"],
                                callback : [function(){
                                    if(isFirstTry){
                                        AppManager.stopApplication();
                                        return;
                                    }
                                }]
                            });
                        }else{
                            obigo.message({
                                title : "Internet connection not available!",
                                button:["Cancel", "Retry"],
                                callback : [function(){
                                    retryCount=0;
                                    if(isFirstTry){
                                        AppManager.stopApplication();
                                        return;
                                    }
                                },
                                    function(){
                                        retryCount++;
                                        getEvents();
                                    }]
                            });
                        }
                    }else{
                        if(data.status == 401){
                            window.stop();
                            obigo.message({
                                title: "Your session has expired. <br/> Please login again",
                                button:["OK"],
                                callback : [function(){

                                    //gLogin.logout();
                                    //gLogin.open();
                                    isStartGetEvent = false;
                                }]
                            });
                            return;
                        }else{
                            obigo.message({
                                title : "Internet connection not available!",
                                button:["Cancel", "Retry"],
                                callback : [function(){
                                    retryCount=0;
                                    if(isFirstTry){
                                        AppManager.stopApplication();
                                        return;
                                    }
                                },
                                    function(){
                                        retryCount++;
                                        getEvents();
                                    }]
                            });
                        }
                    }

                    calendarIdList[i].fail = true;
                    /*
                     ajaxSuccCount ++;
                     if(ajaxSuccCount == calendarIdList.length){
                     //$pager.go("schedule");
                     reqSuccCB();

                     }
                     */
                }
            });
        })(i)
    }
}

function pushEvent(events){
    for(var i = 0; i<events.length;i++){
        if(existEventList[events[i].id] != undefined ){
            continue;
        }
        if(events[i].status =="cancelled" ){
            if(events[i].recurringEventId){
                cancelledList.push(events[i]);
            }
            continue;

        }
        var eventItem = {
            isAllDay : false,
            startDate : undefined,
            endDate : undefined,
            created : events[i].created,

            desc : events[i].description,
            summary : events[i].summary,
            location :events[i].location,
            reminder : events[i].reminders,
            id : events[i].id,
            recurrence : events[i].recurrence

        };
        eventItem.startDate = {
            date : events[i].start.date || events[i].start.dateTime,
            timeZone : events[i].start.timeZone,
        };
        eventItem.endDate = {
            date : events[i].end.date || events[i].end.dateTime,
            timeZone : events[i].end.timeZone,
        };
        if(eventItem.startDate.date.length == 10 && eventItem.endDate.date.length == 10){	//all day event
            eventItem.isAllDay = true;
            var startDateVal = new Date(eventItem.startDate.date);
            var endDateVal = new Date(eventItem.endDate.date);
            var endDateStr = endDateVal.format("yyyy-MM-dd");
            var startDateStr = startDateVal.format("yyyy-MM-dd");

            var isFirst = true;
            while(startDateStr < endDateStr){
                if(list[startDateStr] == undefined){
                    list[startDateStr] = [];
                }
                var copy = {
                    isAllDay : eventItem.isAllDay,
                    desc : eventItem.desc,
                    summary : eventItem.summary,
                    location : eventItem.location,
                    id : eventItem.id,
                    created : eventItem.created,
                    startDate : {
                        date : startDateStr,
                        timeZone : eventItem.startDate.timezone

                    },
                    endDate : {
                        date : startDateStr,
                        timeZone : eventItem.endDate.timezone
                    },
                    recurrence : eventItem.recurrence
                };
                if(isFirst){
                    copy.reminder = eventItem.reminder;
                    isFirst = false;
                }
                list[startDateStr].push(copy);
                startDateVal.setDate(startDateVal.getDate()+1);
                startDateStr = startDateVal.format("yyyy-MM-dd");
            }

        }else{		//have a time in one day

            if(eventItem.recurrence){
                var result = rrecurParser.parse(eventItem);
                for(var j =0;j<result.length;j++){
                    var startDateVal = new Date(result[j].startDate.date);
                    var startDateStr = startDateVal.format("yyyy-MM-dd");
                    if(list[startDateStr] == undefined){
                        list[startDateStr] = [];
                    }
                    list[startDateStr].push(result[j]);
                }
            }else{
                var startDateVal = new Date(eventItem.startDate.date);
                var startDateStr = startDateVal.format("yyyy-MM-dd");
                if(list[startDateStr] == undefined){
                    list[startDateStr] = [];
                }
                list[startDateStr].push(eventItem);
            }
        }
        existEventList[events[i].id] = eventItem;
    }
    for(var i =0;i<cancelledList.length;i++){
        var schList = list[cancelledList[i].originalStartTime.dateTime.split("T")[0]];
        if(schList){
            for(var j=0;j<schList.length;j++){
                if(schList[j].id==cancelledList[i].recurringEventId){
                    schList.splice(j, 1);
                }
            }
        }

    }

}
function eventsSave(){

    obigo.storage.set("eventList", list);
    obigo.storage.set("existEvent", existEventList);
}
function eventsClear(){
    list = {};
    existEventList = {};
    obigo.storage.remove("eventList");
    obigo.storage.remove("existEvent");
    obigo.storage.remove("calId");
}
function eventsLoad(){
    list = obigo.storage.get("eventList") || {};
    existEventList = obigo.storage.get("existEvent") || {};
}

module.exports = {
    getCalendarList : function(callback){
        obigo.ajax({
            url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
            data: {key: "AIzaSyCPO7Yedvv8gO36Y8KLf6PRstr8lSqP_v8"},
            type: "GET",
            timeout: 25000,
            dataType: "json",
            requestHeader : {"Authorization": "OAuth " + gLogin.getAccessOAuthToken()},
            success: function(result) {
                if(result.error){
                    if(result.error.code == 401){
                        window.stop();
                        obigo.message({
                            title: "Your login session has expired. <br/> Please login again",
                            button:["OK"],
                            callback : [function(){
                                // gLogin.logout();
                                // gLogin.open();
                                // isStartGetEvent = false;
                            }]
                        });
                        return;
                    }
                }
                var calendarIdList = [];
                for(var i = 0;i<result.items.length;i++){
                    calendarIdList.push({
                        id : result.items[i].id,
                        desc :result.items[i].description
                    });
                }
                // $progress.hide();

                getEvents(calendarIdList,callback);
            },
            error: function(data, errorState) {
                // $progress.hide();
                // $elem.e.noSch.hide();
                if(retryCount == 3){
                    retryCount = 0;
                    obigo.message({
                        title:"You have exceeded <br/>3 attempts. <br/> Please restart the application",
                        button:["OK"],
                        callback:[function(){
                            AppManager.stopApplication();
                        }]
                    });
                }else{
                    if(data.status == 401){
                        window.stop();
                        obigo.message({
                            title: "Your login session has expired. <br/> Please login again",
                            button:["OK"],
                            callback : [function(){
                                // gLogin.logout();
                                // gLogin.open();
                                isStartGetEvent = false;
                            }]
                        });
                        return;
                    }else if(errorState == "timeout"){
                        obigo.message({
                            title : "Internet connection not available!",
                            button:["Cancel", "Retry"],
                            callback : [function(){
                                /*
                                 $elem.e.schScrArea.hide();
                                 $list.l.scheduleList.o.innerHTML = "";
                                 $elem.e.noSch.show();
                                 $elem.e.noSch.setText("Your network is unstable");
                                 */
                                retryCount=0;
                            },
                                function(){
                                    retryCount++;
                                    getCalendarList()
                                }]
                        });
                    }else if(errorState == "timeerror"){
                        obigo.message({
                            title : "Incorrect date/time. <br/>Please check and try again",
                            button:["OK"],
                            callback : [function(){
                                if(isFirstTry){
                                    AppManager.stopApplication();

                                    return;
                                }
                            }]
                        });
                    }else if(errorState == "nonetwork"){
                        obigo.message({
                            title : "Wi-Fi network not connected. <br/> Please check and try again",
                            button:["OK"],
                            callback : [function(){
                                if(isFirstTry){
                                    AppManager.stopApplication();

                                    return;
                                }
                            }]
                        });
                    }else{
                        obigo.message({
                            title : "Internet connection not available!",
                            button:["Cancel", "Retry"],
                            callback : [function(){
                                retryCount=0;
                                if(isFirstTry){
                                    AppManager.stopApplication();
                                    return;
                                }
                            },
                                function(){
                                    retryCount++;
                                    getEvents();
                                }]
                        });
                    }
                }
            }
        });
    }
}