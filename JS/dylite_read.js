//重写添加成功后刷视频,等红包进度圈满后就会提示获取header成功,多获取几个header,最好获取五十个以上,多多益善
//获取多个header成功后再定时循环执行脚本任务,间隔时间最好在30s以上,每天稳定在10000音符左右
//且刷且珍惜,刷的别太嚣张,说不定过几天就封了
//如果需要在服务器上用nodejs运行则需要用boxjs把缓dyheadlist导出放到相同路径文件下下dyjs.json文件里
//TG群:https://t.me/joinchat/wH4Ks3mT6mxiMDg1

// [mitm] 
// hostname = *.snssdk.com,*.amemv.com

//==========================Quantumultx=========================
// [task_local]
// */30 * * * * * https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, tag=抖音极速版刷音符, enabled=true

// [rewrite_local]
// luckycat/aweme/v1/task/done/read? url script-request-header https://gitee.com/passerby-b/javascript/raw/master/dyjs.js

// =========================Loon=============================
// [Script]
// http-request luckycat/aweme/v1/task/done/read script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, requires-body=true, timeout=10, tag=抖音极速
// cron "*/30 * * * * *" script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js,tag=抖音极速版刷音符

var isShowCionDetail = false;//显示收益详情

eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('1i $=1j("1k");!(K()=>{9(1l $y!="1m"){a.b("\\r\\n抖音极速获取6脚本开始!\\r\\n");4 6=$y.6;4 m=$.g("z");$.h($y.t,"u");9(!!6){9(!!m){4 3=7.p(m);3.L(6)}k{4 3=[];3.L(6)}$.M("获取6成功","个数:"+3.o,"");$.h(7.j(3),"z");a.b(""+7.j(3))}$.A()}k{a.b("\\r\\n*************【"+$.q+"】抖音极速刷视频脚本开始!************\\r\\n");4 m=$.g("z");4 f=$.g("f");9(!!m&&m!=\'[]\'){4 s=0;4 3=7.p(m);9(!!f){4 B=1n;1o(4 i=0;i<3.o;i++){9(7.j(3[i])==f){B=1p;9(3.o-1==i){$.h(7.j(3[0]),"f")}k{$.h(7.j(3[i+1]),"f");s=i+1}1q}}9(!B){$.h(7.j(3[0]),"f")}}k{$.h(7.j(3[0]),"f")}a.b("\\r\\n【"+$.q+"】开始刷第"+s+"个6,共"+3.o+"个6\\r\\n");4 l={t:$.g("u"),6:7.p($.g("f")),v:\'{\\n  "N" : 0,\\n  "1r" : "g"\\n}\'};O l.6[\'C-1s\'];D $.E.P(l).F(K G=>{4 d=G.v;9(d.Q("成功")>-1){4 R=7.p(d);a.b("\\r\\n【"+$.q+"】获得"+R.w[\'1t\']+"个音符!\\r\\n")}k 9(d.Q("1u")>-1){9(s==3.o-1){$.h(7.j(3[0]),"f")}k{$.h(7.j(3[s+1]),"f")}a.b("\\r\\n【"+$.q+"】删除此条1v,还剩"+3.o+"个\\r\\n")}k{a.b("\\r\\n【"+$.q+"】"+d+"\\n")}});9(!$.g(\'S\')){l.t=\'T://1w-U-c-1x.V.H/W/I/Y/Z/A/1y?\'+$.g("u").10(\'?\')[1];O l.6[\'11-1z\'];l.v=\'{\\n  "N" : 0,\\n  "1A" : "1B"\\n}\';D $.E.P(l).F(G=>{$.h(\'1\',\'S\')})}9(1C){4 15={\'x-16-17\':l.6[\'x-16-17\'],\'1D\':\'1E-U-1F-1G-18.V.H\',\'1H-19-1a\':\'5.12.1\',\'1I\':\'1J-1K\',\'X-1b-1L\':\'1M\',\'X-1N\':\'1O/1P=\',\'1Q-1R\':\'1S 13.2.0 1T:1U (1V; 1W 14.1; 1X) 1Y\',\'11-1Z\':\'1c/1d; 20=21-8\',\'C-22\':\'23-24\',\'C\':\'1c/1d\',\'19-1a\':\'2\',\'X-1b-25\':\'26\'};4 1e={t:\'T://I-18.27.H/W/I/Y/Z/28?\'+$.g("u").10(\'?\')[1],6:15};D $.E.29(1e).F(1f=>{4 d=7.p(1f.v);a.b("\\r\\n总音符:"+d.w.J.2a+"个!");a.b("\\r\\n现金收益:"+1g(d.w.J.2b)/1h+"元!");a.b("\\r\\n累计收益"+1g(d.w.J.2c)/1h+"元!\\r\\n")})}}k{$.M("请先刷视频获取6","多多益善","")}}})().2d((e)=>{a.b(\'\',`❌失败!原因:${e}!`,\'\')}).2e(()=>{$.A()})', 62, 139, '|||list|var||headers|JSON||if|console|log||||thishead|read|write||stringify|else|myRequest|headlist||length|parse|name||index|url|dyurl|body|data||request|dyheadlist|done|isHas|Accept|await|http|then|response|com|aweme|income_data|async|push|notify|in_sp_time|delete|post|indexOf|dataobj|invite|https|normal|amemv|luckycat||v1|task|split|Content||||headers2|Tt|Token|hl|sdk|version|SS|application|json|myRequest2|response2|Number|100|const|API|dyjs|typeof|undefined|false|for|true|break|task_key|Encoding|score_amount|10009|header|api5|lf|post_invite_code|Length|invite_code|8254851731|isShowCionDetail|Host|api3|lite|act|passport|Connection|keep|alive|STUB|FB9613E49BC1669D908E1516EBF9F7B5|Tyhon|AyAC7z3|L9Ez3jPVGvh04SbbC9Rt6iT1ZvcxWRw|User|Agent|AwemeLite|rv|132004|iPhone|iOS|zh_CN|Cronet|Type|encoding|utf|Language|en|us|DP|2329|snssdk|page|get|amount1|amount2|amount2_total|catch|finally'.split('|'), 0, {}));

/*********************************** API *************************************/
function ENV() {
    const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t,
        i = "function" == typeof require && "undefined" != typeof $jsbox;
    return {
        isQX: e,
        isLoon: t,
        isSurge: s,
        isNode: "function" == typeof require && !i,
        isJSBox: i,
        isRequest: "undefined" != typeof $request,
        isScriptable: "undefined" != typeof importModule
    }
}

function HTTP(e = {baseURL: ""}) {
    const {isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o} = ENV(),
        r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
    const u = {};
    return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) {
        l = "string" == typeof l ? {url: l} : l;
        const h = e.baseURL;
        h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url);
        const a = (l = {...e, ...l}).timeout, c = {
            onRequest: () => {
            }, onResponse: e => e, onTimeout: () => {
            }, ...l.events
        };
        let f, d;
        if (c.onRequest(u, l), t) f = $task.fetch({method: u, ...l}); else if (s || i || o) f = new Promise((e, t) => {
            (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => {
                s ? t(s) : e({statusCode: i.status || i.statusCode, headers: i.headers, body: n})
            })
        }); else if (n) {
            const e = new Request(l.url);
            e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => {
                e.loadString().then(s => {
                    t({statusCode: e.response.statusCode, headers: e.response.headers, body: s})
                }).catch(e => s(e))
            })
        }
        const p = a ? new Promise((e, t) => {
            d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a)
        }) : null;
        return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e))
    })(l, u))), u
}

function API(e = "untitled", t = !1) {
    const {isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u} = ENV();
    return new class {
        constructor(e, t) {
            this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => {
                if (o) {
                    return {fs: require("fs")}
                }
                return null
            })(), this.initCache();
            Promise.prototype.delay = function (e) {
                return this.then(function (t) {
                    return ((e, t) => new Promise(function (s) {
                        setTimeout(s.bind(null, t), e)
                    }))(e, t)
                })
            }
        }

        initCache() {
            if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) {
                let e = "root.json";
                this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), {flag: "wx"}, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), {flag: "wx"}, e => console.log(e)), this.cache = {})
            }
        }

        persistCache() {
            const e = JSON.stringify(this.cache, null, 2);
            s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, {flag: "w"}, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), {flag: "w"}, e => console.log(e)))
        }

        write(e, t) {
            if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) {
                if (t = t.substr(1), n || i) return $persistentStore.write(e, t);
                if (s) return $prefs.setValueForKey(e, t);
                o && (this.root[t] = e)
            } else this.cache[t] = e;
            this.persistCache()
        }

        read(e) {
            return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0)
        }

        delete(e) {
            if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) {
                if (e = e.substr(1), n || i) return $persistentStore.write(null, e);
                if (s) return $prefs.removeValueForKey(e);
                o && delete this.root[e]
            } else delete this.cache[e];
            this.persistCache()
        }

        notify(e, t = "", l = "", h = {}) {
            const a = h["open-url"], c = h["media-url"];
            if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, {url: a}), i) {
                let s = {};
                a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s)
            }
            if (o || u) {
                const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : "");
                if (r) {
                    require("push").schedule({title: e, body: (t ? t + "\n" : "") + s})
                } else console.log(`${e}\n${t}\n${s}\n\n`)
            }
        }

        log(e) {
            this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`)
        }

        info(e) {
            console.log(`[${this.name}] INFO: ${this.stringify(e)}`)
        }

        error(e) {
            console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)
        }

        wait(e) {
            return new Promise(t => setTimeout(t, e))
        }

        done(e = {}) {
            console.log('done!');
            s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body)
        }

        stringify(e) {
            if ("string" == typeof e || e instanceof String) return e;
            try {
                return JSON.stringify(e, null, 2)
            } catch (e) {
                return "[object Object]"
            }
        }
    }(e, t)
}

/*****************************************************************************/

