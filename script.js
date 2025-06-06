!function() {
    var e, t, n, i, r, a, o = window.location, l = window.document, e = l.currentScript;
    function u(u, g) {
        var k, E = "pageview" === u;
        if (E && c && (h(),
        r = b(),
        a = y()),
        /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname) || "file:" === o.protocol)
            return L(u, g, "localhost");
        if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible)
            return L(u, g);
        try {
            if ("true" === window.localStorage.plausible_ignore)
                return L(u, g, "localStorage flag")
        } catch (e) {}
        var x = {};
        x.n = u,
        x.v = 12,
        x.u = o.href,
        x.d = n,
        x.r = l.referrer || null,
        g && g.meta && (x.m = JSON.stringify(g.meta)),
        g && g.props && (x.p = g.props),
        g && !1 === g.interactive && (x.i = !1),
        g && g.revenue && (x.$ = g.revenue);
        var N = e.getAttributeNames().filter(function(e) {
            return "event-" === e.substring(0, 6)
        })
          , k = x.p || {};
        N.forEach(function(t) {
            var n = t.replace("event-", "")
              , i = e.getAttribute(t);
            k[n] = k[n] || i
        }),
        x.p = k,
        x.h = 1,
        E && (i = !1,
        p = x.u,
        v = x.p,
        f = -1,
        w = 0,
        d = Date.now(),
        c || (l.addEventListener("visibilitychange", m),
        window.addEventListener("blur", m),
        window.addEventListener("focus", m),
        c = !0)),
        s(t, x, g)
    }
    function s(e, t, n) {
        window.fetch && fetch(e, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            keepalive: !0,
            body: JSON.stringify(t)
        }).then(function(e) {
            n && n.callback && n.callback({
                status: e.status
            })
        }).catch(function() {})
    }
    var c = !1
      , p = o.href
      , v = {}
      , f = -1
      , d = 0
      , w = 0;
    function h() {
        var e = g();
        if (!i && (f < a || e >= 3e3)) {
            f = a;
            var o = {
                n: "engagement",
                sd: Math.round(a / r * 100),
                d: n,
                u: p,
                p: v,
                e: e,
                v: 12
            };
            d = 0,
            w = 0,
            o.h = 1,
            s(t, o)
        }
    }
    function m() {
        "visible" === l.visibilityState && l.hasFocus() && 0 === d ? d = Date.now() : "hidden" !== l.visibilityState && l.hasFocus() || (w = g(),
        d = 0,
        h())
    }
    function g() {
        return d ? w + (Date.now() - d) : w
    }
    function b() {
        var e = l.body || {}
          , t = l.documentElement || {};
        return Math.max(e.scrollHeight || 0, e.offsetHeight || 0, e.clientHeight || 0, t.scrollHeight || 0, t.offsetHeight || 0, t.clientHeight || 0)
    }
    function y() {
        var e = l.body || {}
          , t = l.documentElement || {}
          , n = window.innerHeight || t.clientHeight || 0
          , i = window.scrollY || t.scrollTop || e.scrollTop || 0;
        return r <= n ? r : i + n
    }
    function L(e, t, n) {
        n && console.warn("Ignoring Event: " + n),
        t && t.callback && t.callback(),
        "pageview" === e && (i = !0)
    }
    !function i(s) {
        function c(e) {
            d = o.pathname,
            u("pageview")
        }
        function p(e) {
            return e && e.tagName && "a" === e.tagName.toLowerCase()
        }
        function v(e) {
            if ("auxclick" !== e.type || 1 === e.button) {
                var t = function(e) {
                    for (; e && (void 0 === e.tagName || !p(e) || !e.href); )
                        e = e.parentNode;
                    return e
                }(e.target)
                  , n = t && t.href && t.href.split("?")[0];
                if (!function e(t, n) {
                    return !!t && !(n > 3) && (!!E(t) || e(t.parentNode, n + 1))
                }(t, 0)) {
                    if (t && t.href && t.host && t.host !== o.host)
                        return f(e, t, {
                            name: "Outbound Link: Click",
                            props: {
                                url: t.href
                            }
                        });
                    if (function(e) {
                        if (!e)
                            return !1;
                        var t = e.split(".").pop();
                        return h.some(function(e) {
                            return e === t
                        })
                    }(n))
                        return f(e, t, {
                            name: "File Download",
                            props: {
                                url: n
                            }
                        })
                }
            }
        }
        function f(e, t, n) {
            var i = !1;
            function r() {
                i || (i = !0,
                window.location = t.href)
            }
            if (function(e, t) {
                if (e.defaultPrevented)
                    return !1;
                var n = !t.target || t.target.match(/^_(self|parent|top)$/i)
                  , i = !(e.ctrlKey || e.metaKey || e.shiftKey) && "click" === e.type;
                return n && i
            }(e, t)) {
                var a = {
                    props: n.props,
                    callback: r
                };
                a.revenue = n.revenue,
                plausible(n.name, a),
                setTimeout(r, 5e3),
                e.preventDefault()
            } else {
                var a = {
                    props: n.props
                };
                a.revenue = n.revenue,
                plausible(n.name, a)
            }
        }
        n = e.getAttribute("data-domain"),
        t = e.getAttribute("data-api") || new URL(e.src).origin + "/api/event",
        r = b(),
        a = y(),
        window.addEventListener("load", function() {
            r = b();
            var e = 0
              , t = setInterval(function() {
                r = b(),
                15 == ++e && clearInterval(t)
            }, 200)
        }),
        l.addEventListener("scroll", function() {
            r = b();
            var e = y();
            e > a && (a = e)
        }),
        window.addEventListener("hashchange", function() {
            c(!0)
        }),
        "hidden" === l.visibilityState || "prerender" === l.visibilityState ? l.addEventListener("visibilitychange", function() {
            d || "visible" !== l.visibilityState || c()
        }) : c(),
        window.addEventListener("pageshow", function(e) {
            e.persisted && c()
        }),
        l.addEventListener("click", v),
        l.addEventListener("auxclick", v);
        var d, w = ["pdf", "xlsx", "docx", "txt", "rtf", "csv", "exe", "key", "pps", "ppt", "pptx", "7z", "pkg", "rar", "gz", "zip", "avi", "mov", "mp4", "mpeg", "wmv", "midi", "mp3", "wav", "wma", "dmg"], h = w, m = e.getAttribute("file-types"), g = e.getAttribute("add-file-types");
        function L(e) {
            var t = E(e) ? e : e && e.parentNode
              , n = {
                name: null,
                props: {}
            };
            n.revenue = {};
            var i = t && t.classList;
            if (!i)
                return n;
            for (var r = 0; r < i.length; r++) {
                var a = i.item(r)
                  , o = a.match(/plausible-event-(.+)(=|--)(.+)/);
                if (o) {
                    var l = o[1]
                      , u = o[3].replace(/\+/g, " ");
                    "name" == l.toLowerCase() ? n.name = u : n.props[l] = u
                }
                var s = a.match(/plausible-revenue-(.+)(=|--)(.+)/);
                if (s) {
                    var l = s[1]
                      , u = s[3];
                    n.revenue[l] = u
                }
            }
            return n
        }
        function k(e) {
            if ("auxclick" !== e.type || 1 === e.button) {
                for (var t, n, i, r = e.target, a = 0; a <= 3 && r; a++) {
                    if ((t = r) && t.tagName && "form" === t.tagName.toLowerCase())
                        return;
                    p(r) && (n = r),
                    E(r) && (i = r),
                    r = r.parentNode
                }
                if (i) {
                    var o = L(i);
                    if (n)
                        o.props.url = n.href,
                        f(e, n, o);
                    else {
                        var l = {};
                        l.props = o.props,
                        l.revenue = o.revenue,
                        plausible(o.name, l)
                    }
                }
            }
        }
        function E(e) {
            var t = e && e.classList;
            if (t) {
                for (var n = 0; n < t.length; n++)
                    if (t.item(n).match(/plausible-event-name(=|--)(.+)/))
                        return !0
            }
            return !1
        }
        m && (h = m.split(",")),
        g && (h = g.split(",").concat(w)),
        l.addEventListener("submit", function(e) {
            var t = e.target
              , n = L(t);
            if (n.name) {
                e.preventDefault();
                var i = !1;
                setTimeout(a, 5e3);
                var r = {
                    props: n.props,
                    callback: a
                };
                r.revenue = n.revenue,
                plausible(n.name, r)
            }
            function a() {
                i || (i = !0,
                t.submit())
            }
        }),
        l.addEventListener("click", k),
        l.addEventListener("auxclick", k);
        for (var x = window.plausible && window.plausible.q || [], N = 0; N < x.length; N++)
            u.apply(this, x[N]);
        window.plausible = u,
        window.plausible.init = i,
        window.plausible.l = !0
    }()
}();