/*
抖音极速版
功能：限时广告，首页宝箱，宝箱广告，直播宝箱，提现0.3，提交步数

hostname = *.amemv.com,*.snssdk.com

[rewrite_local]
#总音符
/luckycat/aweme/v1/task/page? url script-request-header dyLite.js

#签到（有问题
/luckycat/aweme/v1/task/sign_in/* url script-request-header dy_lite.js

#步数
/luckycat/aweme/v1/task/walk/step_submit? url script-request-header dy_lite.js

#红包进度条，首页宝箱，宝箱广告，直播宝箱
luckycat/aweme/v1/task/done/(read|excitation_ad|treasure_task|excitation_ad_treasure_box|live_treasure)? url script-request-header dy_lite.js
*/


const jsname = '抖音极速版'
const $ = Env(jsname)
const notify = $.isNode() ? require('./sendNotify') : '';

$.idx = "2";//账号扩展字符
let dyhost = ($.getdata('dyhost') || 'api5-normal-c-lf.amemv.com');
let dyjsbaccount;
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invite = 0;//新用户自动邀请，0关闭，1默认开启
const logs = 0;//0为关闭日志，1为开启
var hour = ''
var minute = ''
const readbody = `{
  "in_sp_time": 0,
  "task_key": "read"
}`


const adsheaderArr = [], adskeyArr = []
const boxheaderArr = [], boxkeyArr = []
const boxadsheaderArr = [], boxadskeyArr = []
const infoheaderArr = [], infokeyArr = []
const liveheaderArr = [], livekeyArr = []
const signheaderArr = [], signcookieArr = []
const stepheaderArr = [], stepkeyArr = []
const readheaderArr = [], readkeyArr = []

let adsheader = $.getdata('dylite_ads_header')
let adskey = $.getdata('dylite_adskey')

let boxheader = $.getdata('dylite_box_header')
let boxkey = $.getdata('dylite_box_key')

let boxadsheader = $.getdata('dylite_box_ads_header')
let boxadskey = $.getdata('dylite_box_ads_key')

let infoheader = $.getdata('dylite_info_header')
let infokey = $.getdata('dylite_info_key')

let liveheader = $.getdata('dylite_live_header')
let livekey = $.getdata('dylite_live_key')

let signheader = $.getdata('dylite_sign_header')
let signcookie = $.getdata('dylite_sign_cookie')

let stepheader = $.getdata('dylite_step_header')
let stepkey = $.getdata('dylite_step_key')

let readheader = $.getdata('dylite_read_header')
let readkey = $.getdata('dylite_read_key')


if ($.isNode()) {
    hour = (new Date()).getHours();
    minute = (new Date()).getMinutes();

} else {
    hour = (new Date()).getHours();
    minute = (new Date()).getMinutes();
}

//CK运行
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
    GetCookie();
    $.done()
}
if ($.isNode()) {

    //ads
    if (process.env.DY_ADS_HEADER && process.env.DY_ADS_HEADER.indexOf('#') > -1) {
        adsheader = process.env.DY_ADS_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_ADS_HEADER && process.env.DY_ADS_HEADER.indexOf('\n') > -1) {
        adsheader = process.env.DY_ADS_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        adsheader = process.env.DY_ADS_HEADER.split()
    }

    if (process.env.DY_ADS_KEY && process.env.DY_ADS_KEY.indexOf('#') > -1) {
        adskey = process.env.DY_ADS_KEY.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_ADS_KEY && process.env.DY_ADS_KEY.indexOf('\n') > -1) {
        adskey = process.env.DY_ADS_KEY.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        adskey = process.env.DY_ADS_KEY.split()
    }

    //box
    if (process.env.DY_BOX_HEADER && process.env.DY_BOX_HEADER.indexOf('#') > -1) {
        boxheader = process.env.DY_BOX_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_BOX_HEADER && process.env.DY_BOX_HEADER.indexOf('\n') > -1) {
        boxheader = process.env.DY_BOX_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        boxheader = process.env.DY_BOX_HEADER.split()
    }


    if (process.env.DY_BOX_KEY && process.env.DY_BOX_KEY.indexOf('#') > -1) {
        boxkey = process.env.DY_BOX_KEY.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_BOX_KEY && process.env.DY_BOX_KEY.indexOf('\n') > -1) {
        boxkey = process.env.DY_BOX_KEY.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        boxkey = process.env.DY_BOX_KEY.split()
    }

    //boxads
    if (process.env.DY_BOX_ADS_HEADER && process.env.DY_BOX_ADS_HEADER.indexOf('#') > -1) {
        boxadsheader = process.env.DY_BOX_ADS_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_BOX_ADS_HEADER && process.env.DY_BOX_ADS_HEADER.indexOf('\n') > -1) {
        boxadsheader = process.env.DY_BOX_ADS_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        boxadsheader = process.env.DY_BOX_ADS_HEADER.split()
    }

    if (process.env.DY_BOX_ADS_KEY && process.env.DY_BOX_ADS_KEY.indexOf('#') > -1) {
        boxadskey = process.env.DY_BOX_ADS_KEY.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_BOX_ADS_KEY && process.env.DY_BOX_ADS_KEY.indexOf('\n') > -1) {
        boxadskey = process.env.DY_BOX_ADS_KEY.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        boxadskey = process.env.DY_BOX_ADS_KEY.split()
    }

    //info
    if (process.env.DY_INFO_HEADER && process.env.DY_INFO_HEADER.indexOf('#') > -1) {
        infoheader = process.env.DY_INFO_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_INFO_HEADER && process.env.DY_INFO_HEADER.indexOf('\n') > -1) {
        infoheader = process.env.DY_INFO_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        infoheader = process.env.DY_INFO_HEADER.split()
    }

    if (process.env.DY_INFO_KEY && process.env.DY_INFO_KEY.indexOf('#') > -1) {
        infokey = process.env.DY_INFO_KEY.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_INFO_KEY && process.env.DY_INFO_KEY.indexOf('\n') > -1) {
        infokey = process.env.DY_INFO_KEY.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        infokey = process.env.DY_INFO_KEY.split()
    }

    //live
    if (process.env.DY_LIVE_HEADER && process.env.DY_LIVE_HEADER.indexOf('#') > -1) {
        liveheader = process.env.DY_LIVE_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_LIVE_HEADER && process.env.DY_LIVE_HEADER.indexOf('\n') > -1) {
        liveheader = process.env.DY_LIVE_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        liveheader = process.env.DY_LIVE_HEADER.split()
    }

    if (process.env.DY_LIVE_KEY && process.env.DY_LIVE_KEY.indexOf('#') > -1) {
        livekey = process.env.DY_LIVE_KEY.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_LIVE_KEY && process.env.DY_LIVE_KEY.indexOf('\n') > -1) {
        livekey = process.env.DY_LIVE_KEY.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        livekey = process.env.DY_LIVE_KEY.split()
    }

//sign
    if (process.env.DY_SIGN_HEADER && process.env.DY_SIGN_HEADER.indexOf('#') > -1) {
        signheader = process.env.DY_SIGN_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_SIGN_HEADER && process.env.DY_SIGN_HEADER.indexOf('\n') > -1) {
        signheader = process.env.DY_SIGN_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        signheader = process.env.DY_SIGN_HEADER.split()
    }

    if (process.env.DY_SIGN_COOKIE && process.env.DY_SIGN_COOKIE.indexOf('#') > -1) {
        signcookie = process.env.DY_SIGN_COOKIE.split('#');
    } else if (process.env.DY_SIGN_COOKIE && process.env.DY_SIGN_COOKIE.split('\n').length > 0) {
        signcookie = process.env.DY_SIGN_COOKIE.split('\n');
    } else {
        signcookie = process.env.DY_SIGN_COOKIE.split()
    }

//step
    if (process.env.DY_STEP_HEADER && process.env.DY_STEP_HEADER.indexOf('#') > -1) {
        stepheader = process.env.DY_STEP_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_STEP_HEADER && process.env.DY_STEP_HEADER.indexOf('\n') > -1) {
        stepheader = process.env.DY_STEP_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        stepheader = process.env.DY_STEP_HEADER.split()
    }

    if (process.env.DY_STEP_KEY && process.env.DY_STEP_KEY.indexOf('#') > -1) {
        stepkey = process.env.DY_STEP_KEY.split('#');
    } else if (process.env.DY_STEP_KEY && process.env.DY_STEP_KEY.split('\n').length > 0) {
        stepkey = process.env.DY_STEP_KEY.split('\n');
    } else {
        stepkey = process.env.DY_STEP_KEY.split()
    }

//read
    if (process.env.DY_READ_HEADER && process.env.DY_READ_HEADER.indexOf('#') > -1) {
        readheader = process.env.DY_READ_HEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DY_READ_HEADER && process.env.DY_READ_HEADER.indexOf('\n') > -1) {
        readheader = process.env.DY_READ_HEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        readheader = process.env.DY_READ_HEADER.split()
    }

    if (process.env.DY_READ_KEY && process.env.DY_READ_KEY.indexOf('#') > -1) {
        readkey = process.env.DY_READ_KEY.split('#');
    } else if (process.env.DY_READ_KEY && process.env.DY_READ_KEY.split('\n').length > 0) {
        readkey = process.env.DY_READ_KEY.split('\n');
    } else {
        readkey = process.env.DY_READ_KEY.split()
    }

    //ads
    Object.keys(adsheader).forEach((item) => {
        if (adsheader[item]) {
            adsheaderArr.push(adsheader[item])
        }
    });
    Object.keys(adskey).forEach((item) => {
        if (adskey[item]) {
            adskeyArr.push(adskey[item])
        }
    });
    //box
    Object.keys(boxheader).forEach((item) => {
        if (boxheader[item]) {
            boxheaderArr.push(boxheader[item])
        }
    });
    Object.keys(boxkey).forEach((item) => {
        if (boxkey[item]) {
            boxkeyArr.push(boxkey[item])
        }
    });
    //boxads
    Object.keys(boxadsheader).forEach((item) => {
        if (boxadsheader[item]) {
            boxadsheaderArr.push(boxadsheader[item])
        }
    });
    Object.keys(boxadskey).forEach((item) => {
        if (boxadskey[item]) {
            boxadskeyArr.push(boxadskey[item])
        }
    });
    //info
    Object.keys(infoheader).forEach((item) => {
        if (infoheader[item]) {
            infoheaderArr.push(infoheader[item])
        }
    });
    Object.keys(infokey).forEach((item) => {
        if (infokey[item]) {
            infokeyArr.push(infokey[item])
        }
    });
    //live
    Object.keys(liveheader).forEach((item) => {
        if (liveheader[item]) {
            liveheaderArr.push(liveheader[item])
        }
    });
    Object.keys(livekey).forEach((item) => {
        if (livekey[item]) {
            livekeyArr.push(livekey[item])
        }
    });
//sign
    Object.keys(signheader).forEach((item) => {
        if (signheader[item]) {
            signheaderArr.push(signheader[item])
        }
    });
    Object.keys(signcookie).forEach((item) => {
        if (signcookie[item]) {
            signcookieArr.push(signcookie[item])
        }
    });
//step
    Object.keys(stepheader).forEach((item) => {
        if (stepheader[item]) {
            stepheaderArr.push(stepheader[item])
        }
    });
    Object.keys(stepkey).forEach((item) => {
        if (stepkey[item]) {
            stepkeyArr.push(stepkey[item])
        }
    });
//read
    Object.keys(readheader).forEach((item) => {
        if (readheader[item]) {
            readheaderArr.push(readheader[item])
        }
    });
    Object.keys(readkey).forEach((item) => {
        if (readkey[item]) {
            readkeyArr.push(readkey[item])
        }
    });
    console.log(`============ 脚本执行-北京时间(UTC)：${new Date().toLocaleString()}  =============\n`)

} else {
    adsheaderArr.push($.getdata('dylite_ads_header'))
    adskeyArr.push($.getdata('dylite_adskey'))

    boxheaderArr.push($.getdata('dylite_box_header'))
    boxkeyArr.push($.getdata('dylite_box_key'))

    boxadsheaderArr.push($.getdata('dylite_box_ads_header'))
    boxadskeyArr.push($.getdata('dylite_box_ads_key'))

    infoheaderArr.push($.getdata('dylite_info_header'))
    infokeyArr.push($.getdata('dylite_info_key'))

    liveheaderArr.push($.getdata('dylite_live_header'))
    livekeyArr.push($.getdata('dylite_live_key'))

    signheaderArr.push($.getdata('dylite_sign_header'))
    signcookieArr.push($.getdata('dylite_sign_cookie'))

    stepheaderArr.push($.getdata('dylite_step_header'))
    stepkeyArr.push($.getdata('dylite_step_key'))

    readheaderArr.push($.getdata('dylite_read_header'))
    readkeyArr.push($.getdata('dylite_read_key'))

    let dyjsbcount = ($.getval('dyjsbcount') || '1');

    for (let i = 2; i <= dyjsbcount; i++) {

        adsheaderArr.push($.getdata(`dylite_ads_header${i}`))
        adskeyArr.push($.getdata(`dylite_adskey${i}`))

        boxheaderArr.push($.getdata(`dylite_box_header${i}`))
        boxkeyArr.push($.getdata(`dylite_box_key${i}`))

        boxadsheaderArr.push($.getdata(`dylite_box_ads_header${i}`))
        boxadskeyArr.push($.getdata(`dylite_box_ads_key${i}`))

        infoheaderArr.push($.getdata(`dylite_info_header${i}`))
        infokeyArr.push($.getdata(`dylite_info_key${i}`))

        liveheaderArr.push($.getdata(`dylite_live_header${i}`))
        livekeyArr.push($.getdata(`dylite_live_key${i}`))

        signheaderArr.push($.getdata(`dylite_sign_header${i}`))
        signcookieArr.push($.getdata(`dylite_sign_cookie${i}`))

        stepheaderArr.push($.getdata(`dylite_step_header${i}`))
        stepkeyArr.push($.getdata(`dylite_step_key${i}`))

        readheaderArr.push($.getdata(`dylite_read_header${i}`))
        readkeyArr.push($.getdata(`dylite_read_key${i}`))

    }
}
!(async () => {
    if (!signheaderArr[0]) {
        $.msg($.name, '【提示】请先获取抖音极速版一cookie')
        return;
    }
    console.log(`------------- 共${signheaderArr.length}个账号----------------\n`)
    for (let i = 0; i < signheaderArr.length; i++) {
        if (signheaderArr[i]) {
            message = ''
            adsheader = adsheaderArr[i];
            adskey = adskeyArr[i];

            boxheader = boxheaderArr[i];
            boxkey = boxkeyArr[i];

            boxadsheader = boxadsheaderArr[i];
            boxadskey = boxadskeyArr[i];

            infoheader = infoheaderArr[i];
            infokey = infokeyArr[i];

            liveheader = liveheaderArr[i];
            livekey = livekeyArr[i];

            signheader = signheaderArr[i];
            signcookie = signcookieArr[i];

            stepheader = stepheaderArr[i];
            stepkey = stepkeyArr[i];

            readheader = readheaderArr[i];
            readkey = readkeyArr[i];
            dyjsbaccount = $.getval(`dyjsbaccount${i}`)
            $.index = i + 1;
            console.log(`\n开始【抖音极速版${$.index}】`)
            //await invite()
            await control()
            await showmsg()
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GetCookie() {
//限时广告
    if ($request && $request.url.indexOf("aweme" && "excitation_ad") >= 0) {
        const adsheader = $request.url.split(`?`)[1]
        if (adsheader) $.setdata(adsheader, `dylite_ads_header ${$.idx}`)
        $.log(`[${jsname}] 获取ads请求: 成功, dylite_ads_header: ${adsheader}`)
        $.msg(`获取dylite_ads_header ${$.idx}: 成功🎉`, ``)
        const adskey = JSON.stringify($request.headers)
        if (adskey) $.setdata(adskey, `dylite_ads_key ${$.idx}`)
        $.log(`[${jsname}] 获取ads请求: 成功, dylite_ads_key: ${adskey}`)
        $.msg(`获取dylite_ads_key ${$.idx}: 成功🎉`, ``)
    }

//首页宝箱
    if ($request && $request.url.indexOf("aweme" && "treasure_task") >= 0) {
        const boxheader = $request.url.split(`?`)[1]
        if (boxheader) $.setdata(boxheader, `dylite_box_header ${$.idx}`)
        $.log(`[${jsname}] 获取box请求: 成功, dylite_box_header: ${boxheader}`)
        $.msg(`获取dylite_box_header ${$.idx}: 成功🎉`, ``)
        const boxkey = JSON.stringify($request.headers)
        if (boxkey) $.setdata(boxkey, `dylite_box_key ${$.idx}`)
        $.log(`[${jsname}] 获取box请求: 成功, dylite_box_key: ${boxkey}`)
        $.msg(`获取dylite_box_key ${$.idx}: 成功🎉`, ``)
    }

//宝箱广告
    if ($request && $request.url.indexOf("aweme" && "_treasure_box") >= 0) {
        const boxadsheader = $request.url.split(`?`)[1]
        if (boxadsheader) $.setdata(boxadsheader, `dylite_box_ads_header${$.idx}`)
        $.log(`[${jsname}] 获取boxads请求: 成功, dylite_box_ads_header: ${boxadsheader}`)
        $.msg(`获取dylite_box_ads_header${$.idx}: 成功🎉`, ``)
        const boxadskey = JSON.stringify($request.headers)
        if (boxadskey) $.setdata(boxadskey, `dylite_box_ads_key${$.idx}`)
        $.log(`[${jsname}] 获取boxads请求: 成功, dylite_box_ads_key: ${boxadskey}`)
        $.msg(`获取dylite_box_ads_key${$.idx}: 成功🎉`, ``)
    }
//直播宝箱
    if ($request && $request.url.indexOf("aweme" && "live_treasure") >= 0) {
        const liveheader = $request.url.split(`?`)[1]
        if (liveheader) $.setdata(liveheader, `dylite_live_header${$.idx}`)
        $.log(`[${jsname}] 获取live请求: 成功, dylite_live_header: ${liveheader}`)
        $.msg(`获取dylite_live_header${$.idx}: 成功🎉`, ``)
        const livekey = JSON.stringify($request.headers)
        if (livekey) $.setdata(livekey, `dylite_live_key${$.idx}`)
        $.log(`[${jsname}] 获取live请求: 成功, dylite_live_key: ${livekey}`)
        $.msg(`获取dylite_live_key${$.idx}: 成功🎉`, ``)
    }
    //显示总音符
    if ($request && $request.url.indexOf("page") >= 0) {
        const infoheader = $request.url.split(`?`)[1]
        if (infoheader) $.setdata(infoheader, `dylite_info_header${$.idx}`)
        $.log(`[${jsname}] 获取info请求: 成功,dylite_info_header: ${infoheader}`)
        $.msg(`获取dylite_info_header${$.idx}: 成功🎉`, ``)
        const infokey = JSON.stringify($request.headers)
        if (infokey) $.setdata(infokey, `dylite_info_key${$.idx}`)
        $.log(`[${jsname}] 获取info请求: 成功,dylite_info_key: ${infokey}`)
        $.msg(`获取dylite_info_key${$.idx}: 成功🎉`, ``)
    }
    //签到
    if ($request && $request.url.indexOf("sign_in") >= 0) {
        const signheader = $request.url.split(`?`)[1]
        if (signheader) $.setdata(signheader, `dylite_sign_header${$.idx}`)
        $.log(`[${jsname}] 获取sign请求: 成功,dylite_sign_header: ${signheader}`)
        $.msg(`获取dylite_sign_header${$.idx}: 成功🎉`, ``)
        const signcookie = $request.headers['Cookie']
        if (signcookie) $.setdata(signcookie, `dylite_sign_cookie${$.idx}`)
        $.log(`[${jsname}] 获取sign请求: 成功,dylite_sign_cookie: ${signcookie}`)
        $.msg(`获取dylite_sign_cookie${$.idx}: 成功🎉`, ``)
    }
    //走路
    if ($request && $request.url.indexOf("step_submit") >= 0) {
        const stepheader = $request.url.split(`?`)[1]
        if (stepheader) $.setdata(stepheader, `dylite_step_header${$.idx}`)
        $.log(`[${jsname}] 获取step请求: 成功,dylite_step_header: ${stepheader}`)
        $.msg(`获取dylite_step_header${$.idx}: 成功🎉`, ``)
        const stepkey = JSON.stringify($request.headers)
        if (stepkey) $.setdata(stepkey, `dylite_step_key${$.idx}`)
        $.log(`[${jsname}] 获取step请求: 成功,dylite_step_key: ${stepkey}`)
        $.msg(`获取dylite_step_key${$.idx}: 成功🎉`, ``)
    }
    //刷视频
    if ($request && $request.url.indexOf("done/read") >= 0) {
        const readheader = $request.url.split(`?`)[1]
        if (readheader) $.setdata(readheader, `dylite_read_header${$.idx}`)
        $.log(`[${jsname}] 获取read请求: 成功,dylite_read_header: ${readheader}`)
        $.msg(`获取dylite_read_header${$.idx}: 成功🎉`, ``)
        const readkey = JSON.stringify($request.headers)
        if (readkey) $.setdata(readkey, `dylite_read_key${$.idx}`)
        $.log(`[${jsname}] 获取read请求: 成功,dylite_read_key: ${readkey}`)
        $.msg(`获取dylite_read_key${$.idx}: 成功🎉`, ``)
    }
}

async function control() {


    await $.wait(1000);
    await query_info();
    await $.wait(2000);
    await watch_ads();
    await $.wait(1000);
    await open_box();
    await $.wait(2000);
    await watch_box_ads();

    if (hour <= 2) {
        await $.wait(2000);
        await open_live_box()

    }
    if (hour == 12 && minute <= 10) {
        await $.wait(1000);
        await withdraw();
        await $.wait(1000);
        //await sign_in()
        //await $.wait(1000);
        await step_submit();
        await $.wait(1000);
        await step_reward();
        await $.wait(1000);
    }

}


//观看限时广告
function watch_ads() {
    return new Promise((resolve, reject) => {
        let ads_url = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad?${adsheader}`,
            headers: JSON.parse(adskey)

        }

        $.post(ads_url, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣观看限时广告\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "获得音符🎵:" + result.data.amount + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}

//打开首页宝箱
function open_box() {
    return new Promise((resolve, reject) => {
        let box_url = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/treasure_task?${boxheader}`,
            headers: JSON.parse(boxkey),
            body: `{\n  \"in_sp_time\" : 0\n}`

        }

        $.post(box_url, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣打开首页宝箱\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "获得音符🎵:" + result.data.amount + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}

//观看宝箱广告
function watch_box_ads() {
    return new Promise((resolve, reject) => {
        let box_ads_url = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad_treasure_box?${boxadsheader}`,
            headers: JSON.parse(boxadskey)
        }

        $.post(box_ads_url, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣观看宝箱广告\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "获得音符🎵:" + result.data.amount + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}


//打开直播宝箱
function open_live_box() {
    return new Promise((resolve, reject) => {
        let live_box_url = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/live_treasure?${liveheader}`,
            headers: JSON.parse(livekey)

        }

        $.get(live_box_url, async (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣打开直播宝箱\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "获得音符🎵:" + result.data.amount + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}

//查询所得音符
function query_info() {
    return new Promise((resolve, reject) => {
        let info_url = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/page?${infoheader}`,
            headers: JSON.parse(infokey)

        }

        $.get(info_url, async (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '\n📣查询今日音符\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "查询音符🎵:" + result.data.income_data.amount1 + '\n'
            } else {
                message += '⚠️查询失败\n'
            }
            resolve()
        })
    })
}

//签到
function sign_in() {
    return new Promise((resolve, reject) => {
        let sign_inurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/sign_in?${signheader}`,
            headers: {
                Cookie: signcookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.4.2; zh_CN) Cronet'
            }
        }
        $.post(sign_inurl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣签到\n'
            if (result.err_no == 10006) {
                message += '🎉' + result.err_tips + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}

//提交步数
function step_submit() {
    const steps = Math.round(Math.random() * (12000 - 10001) + 10001);
    const time = Math.round(new Date().getTime() / 1000).toString();
    return new Promise((resolve, reject) => {
        let step_submiturl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/step_submit?${stepheader}`,
            headers: JSON.parse(stepkey),
            body: `{
  "step" : ${steps},
  "submit_time" :${time},
  "in_sp_time" : 0
}`
        }

        $.post(step_submiturl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣提交走路步数\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "今日步数:" + result.data.today_step + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}

//获取走路金币
function step_reward() {
    return new Promise((resolve, reject) => {
        let step_rewardurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/receive_step_reward?${stepheader}`,
            headers: JSON.parse(stepkey),
            body: `{"in_sp_time":0}`
        }
        $.post(step_rewardurl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣获取奖励\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + "获得:" + result.data.reward_amount + '\n'
            } else {
                message += '⚠️' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}

//看视频
function watch_video() {
    return new Promise((resolve, reject) => {
        let watch_videourl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/read?${readheader}`,
            headers: JSON.parse(readkey),
            body: `{
  "in_sp_time" : 0,
  "task_key" : "read"
}`
        }
        $.post(watch_videourl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣看视频\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + '获得:' + result.data.score_amount + "\n"
            } else if (result.err_no == 10006) {
                message += '⚠️已经读过了\n'
            } else {
                message += '⚠️' + result.err_tips + '\n' + '请重新获取readkey\n'
                let other = '⚠️' + result.err_tips + '请重新获取readkey\n'
                $.msg(jsname, '', other)
            }
            resolve()
        })
    })
}
//提现 支付宝 0.3
function withdraw() {
    return new Promise((resolve, reject) => {
        let withdrawurl ={
            url: `https://${dyhost}/luckycat/aweme/v1/wallet/take_cash?task_key=jiao_take_cash&${signheader}`,
            headers: JSON.parse(readkey),
            body: `{
  "account" : "${dyjsbaccount}",
  "is_auto" : false,
  "take_cash_type" : 3,
  "tab_type" : "alipay",
  "in_sp_time" : 0,
  "cash_amount" : -30,
  "name" : ""
}`
        }

        $.post(withdrawurl,(error, response, data) =>{
            const result = JSON.parse(data)
            if(logs) $.log(data)
            message += '📣开始提现金额\n'
            if(result.err_no == 0){
                //console.log('🎉' + result.err_tips+'提现0.3元\n')
                message += '🎉' + result.err_tips+'提现0.3元\n'
            }else{
                console.log('⚠️' +result.err_tips)
            }
            resolve()
        })
    })
}
function invitation() {
    return new Promise((resolve, reject) => {
        let invitatonurl = {
            url: `https://aweme-lq.snssdk.com/luckycat/aweme/v1/task/done/post_invite_code?${signheader}`,
            headers: JSON.parse(readkey),
            body: JSON.stringify({"in_sp_time": 0, "invite_code": "8025524531"})
        }

        $.post(invitatonurl, (error, response, data) => {
            const result = JSON.parse(data)
            resolve()
        })
    })
}

async function showmsg() {
    if (tz == 1) {
        if ($.isNode()) {
            $.log(message)
            if ((hour == 12 && minute <= 10) || (hour == 23 && minute >= 54)) {
                await notify.sendNotify($.name, message)
            }
        } else {
            $.log(message)
            if ((hour == 12 && minute <= 10) || (hour == 23 && minute >= 54)) {
                $.msg(jsname, '', message)
            }
        }
    } else {
        $.log(message)
    }
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}