/**
 * Created by krinjadl on 2016-06-20.
 */
import obigo from '../lib/util';
import AppManager from '../lib/AppManager';

var LOGIN_FLAG_CUSTOM    = 0x0001,
    LOGIN_FLAG_FACEBOOK  = 0x0010,
    LOGIN_FLAG_GOOGLE    = 0x0100,
    LOGIN_FLAG_TWITTER   = 0x1000;
var self = this,
    g_timeout = 15000,
    g_loginCount = 0,
    g_timer = null;

var RequestUrl = {
    code: {method: "GET", url: "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email&state=/profile&redirect_uri=http://apps.obigo.com/google/callback.html&response_type=code&approval_prompt=force&access_type=offline"},
    access_token: {method: "POST", url: "https://www.googleapis.com/oauth2/v3/token"},
}

var OAuthParam = {
    // clientId: "949034064011-7os3b956vkm8l6fit0frkhjc0ak523hn.apps.googleusercontent.com",
    // clientSecret: "-Mk-swkPC5rHp0gJNQXSRB_i",
    clientId: "796908240227-gelgercldv3iladgqsu40ko1oun1vt67.apps.googleusercontent.com",
    clientSecret: "s8-qtQC9kq0nF0ivHtxJvJQO",
    accessOauthToken: null,
    refreshToken: null
}

var GRANT_TYPE_AUTHORIZATION_CODE = "authorization_code",
    GRANT_TYPE_REFRESH_TOKEN = "refresh_token";

function httpRequest(optionss){
    var opts = {
        url: null,
        type: "GET",
        data: null,
        async: true,
        timeout: 5000,
        dataType: "text",
        success: null,
        error: null,
        complete: null,
        requestHeader: null
    };

    for (var p in optionss) opts[p] = optionss[p];
    if(!opts.url) return;
    var xmlhttp = new XMLHttpRequest();
    opts.type = opts.type.toUpperCase();
    if(opts.async) {
        xmlhttp.timeout = opts.timeout;
    }
    xmlhttp.onload = function(evt) {
        var xmlObj, jsonObj;
        if (xmlhttp.status === 200 || xmlhttp.status === 0) {
            if(typeof opts.success === "function") {
                if(opts.dataType === "json") {
                    if(this.responseText) {
                        try {
                            jsonObj = JSON.parse(this.responseText);
                        } catch (err) {
                            //xmlhttp.onerror = null;
                            opts.error(this, 'json parsererror', err);
                            return;
                        }
                        opts.success(jsonObj, this.statusText, xmlhttp);
                    } else {
                        opts.error(this, 'empty json', this.statusText);
                    }
                } else if(opts.dataType === "xml") {
                    if(this.responseXML) {
                        opts.success(this.responseXML, this.statusText, this);
                    } else if (this.responseText) {
                        try {
                            xmlObj = obigo.parseXML(this.responseText);
                        } catch (err) {
                            //xmlhttp.onerror = null;
                            opts.error(this, 'xml parsererror', err);
                            return;
                        }
                        opts.success(xmlObj, this.statusText, this);
                    } else {
                        opts.error(this, 'empty xml', this.statusText);
                    }
                } else {
                    opts.success(this.responseText, this.statusText, this);
                }
            }
            //500 internal error , Not found(server)
        } else if (xmlhttp.status !== 0) {
            opts.error(xmlhttp, "error", xmlhttp.statusText);
        }
    };
    xmlhttp.ontimeout = function(evt) {
        if(typeof opts.error == "function") {
            opts.error(xmlhttp, "timeout", "timeout");
        }
    };
    //Not found (local), cross-domain (local, server)
    xmlhttp.onerror = function(evt) {
        if(typeof opts.error == "function") {
            if(typeof evt == "string" && (evt == "timeerror" || evt == "nonetwork")){
                opts.error(xmlhttp, evt, xmlhttp.statusText);
            }else{
                opts.error(xmlhttp, "error", xmlhttp.statusText);
            }
        }
    };
    xmlhttp.onloadend = function(evt) {
        if(typeof opts.complete == "function") {
            opts.complete(xmlhttp, xmlhttp.statusText);
        }
    };

    if(!navigator.onLine){
        xmlhttp.onerror("nonetwork");
        return;
    }

    function encodeFormData(data){
        var pairs = [];
        var regexp = /%20/g;
        for(var name in data) {
            if(data.hasOwnProperty(name)) {
                var val = data[name].toString();
                var pair = encodeURIComponent(name).replace(regexp, "+")+"="+
                    encodeURIComponent(val).replace(regexp, "+");
                pairs.push(pair);
            }
        }
        return pairs.join("&");
    }

    function request(){
        if(opts.type === "GET" && opts.data) {
            opts.data = encodeFormData(opts.data);
            opts.url = opts.url +"?"+ opts.data;
            opts.data = null;
        }
        xmlhttp.open(opts.type, opts.url, opts.async);

        if(opts.type === "POST" && !JSON.stringify(opts.requestHeader).match(/content-type/ig)) {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        }
        if(opts.requestHeader) {
            var headers = opts.requestHeader;
            for(var key in headers) {
                if(headers.hasOwnProperty(key)) {
                    xmlhttp.setRequestHeader(key, headers[key]);
                }
            }
        }
        if(typeof opts.data === "object" && opts.data) opts.data = encodeFormData(opts.data);
        xmlhttp.send(opts.data);
    }

    if (navigator.userAgent.indexOf("Obigo") > 0) {
        if(opts.url.indexOf("https://") > -1 && !timesync){
            timexmlhttp = new XMLHttpRequest();

            timexmlhttp.timeout = opts.timeout;

            timexmlhttp.onload = function(evt) {
                var xmlObj, jsonObj;
                if (timexmlhttp.status === 200 || timexmlhttp.status === 0) {
                    var timeData = null;

                    if(timexmlhttp.responseText) {
                        try {
                            var curtimeDate = new Date(),
                                serverDate = null,
                                hour = 1000 * 60 * 15;

                            serverDate = JSON.parse(timexmlhttp.responseText).time;
                            serverDate = new Date(serverDate);

                            if((Math.abs(curtimeDate.getTime() - serverDate.getTime())) < hour){
                                timesync = true;

                                request();
                            }else{
                                xmlhttp.onerror("timeerror");
                            }
                        } catch (err) {
                            timexmlhttp.onerror();
                        }
                    }
                }else{
                    timexmlhttp.onerror();
                }

            };
            timexmlhttp.ontimeout = function(evt) {
                request();
            };
            timexmlhttp.onerror = function(evt) {
                request();
            };

            timexmlhttp.open("GET", "http://210.216.54.99:3000/", true);

            timexmlhttp.send(opts.data);
        }else{
            return request();
        }
    }else{
        return request();
    }

    return xmlhttp;
};

module.exports = {
    setRefreshTokenCode : function(token){
        OAuthParam.refreshToken = token;
    },
    getAccessOAuthToken : function(){
        return obigo.storage.get('obigo-google-access-token');
    },
    getRefreshOAuthToken : function(){
        return obigo.storage.get('obigo-google-refresh-token');
    },
    exchangeRefreshToken : function(grantType,callback){
        function request(){
            var d = {
                client_id: OAuthParam.clientId,
                client_secret: OAuthParam.clientSecret
            };
            //grantType = GRANT_TYPE_REFRESH_TOKEN;

            if(grantType == GRANT_TYPE_AUTHORIZATION_CODE){
                d.code = OAuthParam.refreshToken;
                d.redirect_uri = "http://apps.obigo.com/google/callback.html"
                d.approval_prompt = "force";
            }else{
                d.refresh_token = OAuthParam.refreshToken;
            }
            d.grant_type = grantType;
            httpRequest({
                //url: RequestUrl.access_token.url+"&client_id=" + OAuthParam.clientId + "&client_secret=" + OAuthParam.clientSecret + ((grantType==GRANT_TYPE_AUTHORIZATION_CODE)?"&code=":"&refresh_token=") + OAuthParam.refreshToken + "&grant_type="+grantType,
                url: RequestUrl.access_token.url,
                type: "POST",
                async: true,
                data: d,
                timeout: g_timeout,
                dataType: "json",
                success:function(data, textStatus, xhr){
                    // self.close();
                    // g_loading.hide();
                    // g_loginCount = 0;
                    OAuthParam.accessOauthToken = data.access_token;
                    obigo.storage.set('obigo-google-access-token', OAuthParam.accessOauthToken);
                    if(data.refresh_token){
                        OAuthParam.refreshToken = data.refresh_token;
                        obigo.storage.set('obigo-google-refresh-token', OAuthParam.refreshToken);
                    }

                    if(callback){
                        //callback(LOGIN_FLAG_GOOGLE, undefined);
                        callback(true);
                    }
                },
                error : function(xhr, textStatus, errorThrown){
                    //g_loading.hide();

                    if(textStatus == "nonetwork"){
                        obigo.message({
                            title: "Wi-Fi network not connected. <br/> Please check and try again",
                            button:["OK"],
                            callback:[function(){
                                // if(self.networkFailCallback){
                                //     self.networkFailCallback(xhr);
                                // }
                            }]
                        });
                    }else if(textStatus == "timeerror"){
                        obigo.message({
                            title : "Incorrect date/time. <br/>Please check and try again",
                            button:["OK"],
                            callback:[function(){
                                // if(self.networkFailCallback){
                                //     self.networkFailCallback(xhr);
                                // }
                            }]
                        });
                    }else{
                        g_loginCount++;
                        if(g_loginCount < 4){
                            obigo.message({
                                title: "Internet connection not available!",
                                button: ["Cancel","Retry"],
                                callback: [function(){
                                    // if(self.networkFailCallback){
                                    //     self.networkFailCallback(xhr);
                                    // }
                                }, request]
                            });
                        }else{
                            obigo.message({
                                title: "You have exceeded <br/> 3 attempts. <br/> Please restart the application",
                                button: ["OK"],
                                callback : [function(){
                                    AppManager.stopApplication();
                                }]
                            });
                        }
                    }
                }
            });
        }

        request();
    }
}