"use strict";
(self.webpackChunkburgers = self.webpackChunkburgers || []).push([
  [179],
  {
    497: () => {
      function oe(e) {
        return "function" == typeof e;
      }
      function $o(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Uo = $o(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Nr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class _t {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (oe(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Uo ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Jc(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Uo ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Uo(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Jc(t);
            else {
              if (t instanceof _t) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Nr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Nr(n, t), t instanceof _t && t._removeParent(this);
        }
      }
      _t.EMPTY = (() => {
        const e = new _t();
        return (e.closed = !0), e;
      })();
      const Kc = _t.EMPTY;
      function Qc(e) {
        return (
          e instanceof _t ||
          (e && "closed" in e && oe(e.remove) && oe(e.add) && oe(e.unsubscribe))
        );
      }
      function Jc(e) {
        oe(e) ? e() : e.unsubscribe();
      }
      const yn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Go = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Go;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Go;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function ed(e) {
        Go.setTimeout(() => {
          const { onUnhandledError: t } = yn;
          if (!t) throw e;
          t(e);
        });
      }
      function td() {}
      const p0 = ta("C", void 0, void 0);
      function ta(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Dn = null;
      function zo(e) {
        if (yn.useDeprecatedSynchronousErrorHandling) {
          const t = !Dn;
          if ((t && (Dn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Dn;
            if (((Dn = null), n)) throw r;
          }
        } else e();
      }
      class na extends _t {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Qc(t) && t.add(this))
              : (this.destination = C0);
        }
        static create(t, n, r) {
          return new xr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? oa(
                (function m0(e) {
                  return ta("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? oa(
                (function g0(e) {
                  return ta("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? oa(p0, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const D0 = Function.prototype.bind;
      function ra(e, t) {
        return D0.call(e, t);
      }
      class v0 {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Wo(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Wo(r);
            }
          else Wo(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Wo(n);
            }
        }
      }
      class xr extends na {
        constructor(t, n, r) {
          let o;
          if ((super(), oe(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && yn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ra(t.next, i),
                  error: t.error && ra(t.error, i),
                  complete: t.complete && ra(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new v0(o);
        }
      }
      function Wo(e) {
        yn.useDeprecatedSynchronousErrorHandling
          ? (function y0(e) {
              yn.useDeprecatedSynchronousErrorHandling &&
                Dn &&
                ((Dn.errorThrown = !0), (Dn.error = e));
            })(e)
          : ed(e);
      }
      function oa(e, t) {
        const { onStoppedNotification: n } = yn;
        n && Go.setTimeout(() => n(e, t));
      }
      const C0 = {
          closed: !0,
          next: td,
          error: function _0(e) {
            throw e;
          },
          complete: td,
        },
        ia =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function sa(e) {
        return e;
      }
      let Te = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function w0(e) {
              return (
                (e && e instanceof na) ||
                ((function E0(e) {
                  return e && oe(e.next) && oe(e.error) && oe(e.complete);
                })(e) &&
                  Qc(e))
              );
            })(n)
              ? n
              : new xr(n, r, o);
            return (
              zo(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = rd(r))((o, i) => {
              const s = new xr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ia]() {
            return this;
          }
          pipe(...n) {
            return (function nd(e) {
              return 0 === e.length
                ? sa
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = rd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function rd(e) {
        var t;
        return null !== (t = e ?? yn.Promise) && void 0 !== t ? t : Promise;
      }
      const b0 = $o(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let qo = (() => {
        class e extends Te {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new od(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new b0();
          }
          next(n) {
            zo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            zo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            zo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Kc
              : ((this.currentObservers = null),
                i.push(n),
                new _t(() => {
                  (this.currentObservers = null), Nr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Te();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new od(t, n)), e;
      })();
      class od extends qo {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Kc;
        }
      }
      class M0 extends qo {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Vt(e) {
        return (t) => {
          if (
            (function I0(e) {
              return oe(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ht(e, t, n, r, o) {
        return new S0(e, t, n, r, o);
      }
      class S0 extends na {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function vn(e, t) {
        return Vt((n, r) => {
          let o = 0;
          n.subscribe(
            Ht(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function en(e) {
        return this instanceof en ? ((this.v = e), this) : new en(e);
      }
      function ud(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function ca(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const ld = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function cd(e) {
        return oe(e?.then);
      }
      function dd(e) {
        return oe(e[ia]);
      }
      function fd(e) {
        return Symbol.asyncIterator && oe(e?.[Symbol.asyncIterator]);
      }
      function hd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const pd = (function Y0() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function gd(e) {
        return oe(e?.[pd]);
      }
      function md(e) {
        return (function ad(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof en
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield en(n.read());
              if (o) return yield en(void 0);
              yield yield en(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function yd(e) {
        return oe(e?.getReader);
      }
      function Ct(e) {
        if (e instanceof Te) return e;
        if (null != e) {
          if (dd(e))
            return (function X0(e) {
              return new Te((t) => {
                const n = e[ia]();
                if (oe(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (ld(e))
            return (function K0(e) {
              return new Te((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (cd(e))
            return (function Q0(e) {
              return new Te((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, ed);
              });
            })(e);
          if (fd(e)) return Dd(e);
          if (gd(e))
            return (function J0(e) {
              return new Te((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (yd(e))
            return (function e_(e) {
              return Dd(md(e));
            })(e);
        }
        throw hd(e);
      }
      function Dd(e) {
        return new Te((t) => {
          (function t_(e, t) {
            var n, r, o, i;
            return (function id(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = ud(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function tn(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Zo(e, t, n = 1 / 0) {
        return oe(t)
          ? Zo((r, o) => vn((i, s) => t(r, i, o, s))(Ct(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Vt((r, o) =>
              (function n_(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    Ct(n(g, c++)).subscribe(
                      Ht(
                        t,
                        (v) => {
                          o?.(v), i ? h(v) : t.next(v);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const v = u.shift();
                                s ? tn(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ht(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const vd = new Te((e) => e.complete());
      function da(e) {
        return e[e.length - 1];
      }
      function _d(e) {
        return (function i_(e) {
          return e && oe(e.schedule);
        })(da(e))
          ? e.pop()
          : void 0;
      }
      function Cd(e, t = 0) {
        return Vt((n, r) => {
          n.subscribe(
            Ht(
              r,
              (o) => tn(r, e, () => r.next(o), t),
              () => tn(r, e, () => r.complete(), t),
              (o) => tn(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Ed(e, t = 0) {
        return Vt((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function wd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Te((n) => {
          tn(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            tn(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Yo(e, t) {
        return t
          ? (function h_(e, t) {
              if (null != e) {
                if (dd(e))
                  return (function u_(e, t) {
                    return Ct(e).pipe(Ed(t), Cd(t));
                  })(e, t);
                if (ld(e))
                  return (function c_(e, t) {
                    return new Te((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (cd(e))
                  return (function l_(e, t) {
                    return Ct(e).pipe(Ed(t), Cd(t));
                  })(e, t);
                if (fd(e)) return wd(e, t);
                if (gd(e))
                  return (function d_(e, t) {
                    return new Te((n) => {
                      let r;
                      return (
                        tn(n, t, () => {
                          (r = e[pd]()),
                            tn(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => oe(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (yd(e))
                  return (function f_(e, t) {
                    return wd(md(e), t);
                  })(e, t);
              }
              throw hd(e);
            })(e, t)
          : Ct(e);
      }
      function fa(...e) {
        return Yo(e, _d(e));
      }
      function bd(e = {}) {
        const {
          connector: t = () => new qo(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (c = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Vt((g, y) => {
            l++, !d && !c && f();
            const v = (u = u ?? t());
            y.add(() => {
              l--, 0 === l && !d && !c && (a = ha(p, o));
            }),
              v.subscribe(y),
              !s &&
                l > 0 &&
                ((s = new xr({
                  next: (m) => v.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = ha(h, n, m)), v.error(m);
                  },
                  complete: () => {
                    (c = !0), f(), (a = ha(h, r)), v.complete();
                  },
                })),
                Ct(g).subscribe(s));
          })(i);
        };
      }
      function ha(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new xr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return Ct(t(...n)).subscribe(r);
      }
      function Md(e, t) {
        return Vt((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ht(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                Ct(e(u, c)).subscribe(
                  (o = Ht(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function m_(e, t) {
        return e === t;
      }
      function K(e) {
        for (let t in e) if (e[t] === K) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Xo(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function ve(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ve).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function pa(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const y_ = K({ __forward_ref__: K });
      function ee(e) {
        return (
          (e.__forward_ref__ = ee),
          (e.toString = function () {
            return ve(this());
          }),
          e
        );
      }
      function x(e) {
        return ga(e) ? e() : e;
      }
      function ga(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(y_) &&
          e.__forward_ref__ === ee
        );
      }
      function ma(e) {
        return e && !!e.ɵproviders;
      }
      const Id = "https://g.co/ng/security#xss";
      class C extends Error {
        constructor(t, n) {
          super(
            (function Ko(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function O(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Qo(e, t) {
        throw new C(-201, !1);
      }
      function st(e, t) {
        null == e &&
          (function q(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function z(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Et(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Jo(e) {
        return Sd(e, ei) || Sd(e, Td);
      }
      function Sd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Ad(e) {
        return e && (e.hasOwnProperty(ya) || e.hasOwnProperty(b_))
          ? e[ya]
          : null;
      }
      const ei = K({ ɵprov: K }),
        ya = K({ ɵinj: K }),
        Td = K({ ngInjectableDef: K }),
        b_ = K({ ngInjectorDef: K });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let Da;
      function Ue(e) {
        const t = Da;
        return (Da = e), t;
      }
      function xd(e, t, n) {
        const r = Jo(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void Qo(ve(e));
      }
      const J = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Fr = {},
        va = "__NG_DI_FLAG__",
        ti = "ngTempTokenPath",
        I_ = /\n/gm,
        Fd = "__source";
      let Hn;
      function nn(e) {
        const t = Hn;
        return (Hn = e), t;
      }
      function T_(e, t = N.Default) {
        if (void 0 === Hn) throw new C(-203, !1);
        return null === Hn
          ? xd(e, void 0, t)
          : Hn.get(e, t & N.Optional ? null : void 0, t);
      }
      function V(e, t = N.Default) {
        return (
          (function Nd() {
            return Da;
          })() || T_
        )(x(e), t);
      }
      function Z(e, t = N.Default) {
        return V(e, ni(t));
      }
      function ni(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function _a(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = x(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = N_(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(V(o, i));
          } else t.push(V(r));
        }
        return t;
      }
      function Or(e, t) {
        return (e[va] = t), (e.prototype[va] = t), e;
      }
      function N_(e) {
        return e[va];
      }
      function Bt(e) {
        return { toString: e }.toString();
      }
      var wt = (() => (
          ((wt = wt || {})[(wt.OnPush = 0)] = "OnPush"),
          (wt[(wt.Default = 1)] = "Default"),
          wt
        ))(),
        Je = (() => {
          return (
            ((e = Je || (Je = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Je
          );
          var e;
        })();
      const bt = {},
        W = [],
        ri = K({ ɵcmp: K }),
        Ca = K({ ɵdir: K }),
        Ea = K({ ɵpipe: K }),
        Pd = K({ ɵmod: K }),
        jt = K({ ɵfac: K }),
        Pr = K({ __NG_ELEMENT_ID__: K }),
        Rd = K({ __NG_ENV_ID__: K });
      function kd(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function wa(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            Vd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Ld(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Vd(e) {
        return 64 === e.charCodeAt(0);
      }
      function Rr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Hd(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Hd(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const Bd = "ng-template";
      function O_(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== kd(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function jd(e) {
        return 4 === e.type && e.value !== Bd;
      }
      function P_(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Bd);
      }
      function R_(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function V_(e) {
            for (let t = 0; t < e.length; t++) if (Ld(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !P_(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (dt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!O_(e.attrs, l, n)) {
                    if (dt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = k_(8 & r ? "class" : u, o, jd(e), n);
                if (-1 === d) {
                  if (dt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== kd(h, l, 0)) || (2 & r && l !== f)) {
                    if (dt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !dt(r) && !dt(u)) return !1;
            if (s && dt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return dt(r) || s;
      }
      function dt(e) {
        return 0 == (1 & e);
      }
      function k_(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function H_(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function $d(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (R_(e, t[r], n)) return !0;
        return !1;
      }
      function Ud(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function j_(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !dt(s) && ((t += Ud(i, o)), (o = "")),
              (r = s),
              (i = i || !dt(r));
          n++;
        }
        return "" !== o && (t += Ud(i, o)), t;
      }
      function Gd(e) {
        return Bt(() => {
          const t = Wd(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === wt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || Je.Emulated,
              styles: e.styles || W,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          qd(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = oi(r, !1)),
            (n.pipeDefs = oi(r, !0)),
            (n.id = (function Y_(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function z_(e) {
        return Y(e) || Ne(e);
      }
      function W_(e) {
        return null !== e;
      }
      function $t(e) {
        return Bt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || W,
          declarations: e.declarations || W,
          imports: e.imports || W,
          exports: e.exports || W,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function zd(e, t) {
        if (null == e) return bt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function P(e) {
        return Bt(() => {
          const t = Wd(e);
          return qd(t), t;
        });
      }
      function Y(e) {
        return e[ri] || null;
      }
      function Ne(e) {
        return e[Ca] || null;
      }
      function ze(e) {
        return e[Ea] || null;
      }
      function Wd(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || bt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || W,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: zd(e.inputs, t),
          outputs: zd(e.outputs),
        };
      }
      function qd(e) {
        e.features?.forEach((t) => t(e));
      }
      function oi(e, t) {
        if (!e) return null;
        const n = t ? ze : z_;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(W_);
      }
      const _e = 0,
        w = 1,
        R = 2,
        ae = 3,
        ft = 4,
        Lr = 5,
        xe = 6,
        Bn = 7,
        de = 8,
        jn = 9,
        Cn = 10,
        k = 11,
        Vr = 12,
        Zd = 13,
        $n = 14,
        fe = 15,
        Hr = 16,
        Un = 17,
        Mt = 18,
        Br = 19,
        Yd = 20,
        rn = 21,
        Ut = 22,
        ii = 23,
        si = 24,
        j = 25,
        ba = 1,
        Xd = 2,
        It = 7,
        Gn = 9,
        Fe = 11;
      function tt(e) {
        return Array.isArray(e) && "object" == typeof e[ba];
      }
      function We(e) {
        return Array.isArray(e) && !0 === e[ba];
      }
      function Ma(e) {
        return 0 != (4 & e.flags);
      }
      function En(e) {
        return e.componentOffset > -1;
      }
      function ui(e) {
        return 1 == (1 & e.flags);
      }
      function ht(e) {
        return !!e.template;
      }
      function Ia(e) {
        return 0 != (512 & e[R]);
      }
      function wn(e, t) {
        return e.hasOwnProperty(jt) ? e[jt] : null;
      }
      let tC =
          J.WeakRef ??
          class eC {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        rC = 0,
        St = null,
        li = !1;
      function Ie(e) {
        const t = St;
        return (St = e), t;
      }
      class tf {
        constructor() {
          (this.id = rC++),
            (this.ref = (function nC(e) {
              return new tC(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, n] of this.producers) {
            const r = n.producerNode.deref();
            if (null != r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(t), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = li;
          li = !0;
          try {
            for (const [n, r] of this.consumers) {
              const o = r.consumerNode.deref();
              null != o && o.trackingVersion === r.atTrackingVersion
                ? o.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), o?.producers.delete(this.id));
            }
          } finally {
            li = t;
          }
        }
        producerAccessed() {
          if (li) throw new Error("");
          if (null === St) return;
          let t = St.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: St.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: St.trackingVersion,
              }),
              St.producers.set(this.id, t),
              this.consumers.set(St.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = St.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== St?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      let nf = null;
      const sf = () => {};
      class aC extends tf {
        constructor(t, n, r) {
          super(),
            (this.watch = t),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = sf),
            (this.registerOnCleanup = (o) => {
              this.cleanupFn = o;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = Ie(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = sf),
              this.watch(this.registerOnCleanup);
          } finally {
            Ie(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class uC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Gt() {
        return af;
      }
      function af(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = cC), lC;
      }
      function lC() {
        const e = lf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === bt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function cC(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            lf(e) ||
            (function dC(e, t) {
              return (e[uf] = t);
            })(e, { previous: bt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new uC(u && u.currentValue, t, a === bt)), (e[r] = t);
      }
      Gt.ngInherit = !0;
      const uf = "__ngSimpleChanges__";
      function lf(e) {
        return e[uf] || null;
      }
      const At = function (e, t, n) {},
        cf = "svg";
      function re(e) {
        for (; Array.isArray(e); ) e = e[_e];
        return e;
      }
      function fi(e, t) {
        return re(t[e]);
      }
      function qe(e, t) {
        return re(t[e.index]);
      }
      function ff(e, t) {
        return e.data[t];
      }
      function nt(e, t) {
        const n = t[e];
        return tt(n) ? n : n[_e];
      }
      function on(e, t) {
        return null == t ? null : e[t];
      }
      function hf(e) {
        e[Un] = 0;
      }
      function DC(e) {
        1024 & e[R] || ((e[R] |= 1024), gf(e, 1));
      }
      function pf(e) {
        1024 & e[R] && ((e[R] &= -1025), gf(e, -1));
      }
      function gf(e, t) {
        let n = e[ae];
        if (null === n) return;
        n[Lr] += t;
        let r = n;
        for (
          n = n[ae];
          null !== n && ((1 === t && 1 === r[Lr]) || (-1 === t && 0 === r[Lr]));

        )
          (n[Lr] += t), (r = n), (n = n[ae]);
      }
      const T = {
        lFrame: If(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Df() {
        return T.bindingsEnabled;
      }
      function D() {
        return T.lFrame.lView;
      }
      function G() {
        return T.lFrame.tView;
      }
      function qn(e) {
        return (T.lFrame.contextLView = e), e[de];
      }
      function Zn(e) {
        return (T.lFrame.contextLView = null), e;
      }
      function Ae() {
        let e = vf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function vf() {
        return T.lFrame.currentTNode;
      }
      function Tt(e, t) {
        const n = T.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Fa() {
        return T.lFrame.isParent;
      }
      function Yn() {
        return T.lFrame.bindingIndex++;
      }
      function Wt(e) {
        const t = T.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function NC(e, t) {
        const n = T.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Pa(t);
      }
      function Pa(e) {
        T.lFrame.currentDirectiveIndex = e;
      }
      function ka(e) {
        T.lFrame.currentQueryIndex = e;
      }
      function FC(e) {
        const t = e[w];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[xe] : null;
      }
      function bf(e, t, n) {
        if (n & N.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & N.Host ||
              ((o = FC(i)), null === o || ((i = i[$n]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (T.lFrame = Mf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function La(e) {
        const t = Mf(),
          n = e[w];
        (T.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Mf() {
        const e = T.lFrame,
          t = null === e ? null : e.child;
        return null === t ? If(e) : t;
      }
      function If(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Sf() {
        const e = T.lFrame;
        return (
          (T.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Af = Sf;
      function Va() {
        const e = Sf();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function He() {
        return T.lFrame.selectedIndex;
      }
      function bn(e) {
        T.lFrame.selectedIndex = e;
      }
      function ue() {
        const e = T.lFrame;
        return ff(e.tView, e.selectedIndex);
      }
      let xf = !0;
      function hi() {
        return xf;
      }
      function sn(e) {
        xf = e;
      }
      function pi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            l &&
              ((e.viewHooks ??= []).push(n, l),
              (e.viewCheckHooks ??= []).push(n, l)),
            null != c && (e.destroyHooks ??= []).push(n, c);
        }
      }
      function gi(e, t, n) {
        Ff(e, t, 3, n);
      }
      function mi(e, t, n, r) {
        (3 & e[R]) === n && Ff(e, t, n, r);
      }
      function Ha(e, t) {
        let n = e[R];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[R] = n));
      }
      function Ff(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[Un] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[Un] += 65536),
              (a < i || -1 == i) &&
                (HC(e, n, t, u), (e[Un] = (4294901760 & e[Un]) + u + 2)),
              u++;
      }
      function Of(e, t) {
        At(4, e, t);
        const n = Ie(null);
        try {
          t.call(e);
        } finally {
          Ie(n), At(5, e, t);
        }
      }
      function HC(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[R] >> 13 < e[Un] >> 16 &&
            (3 & e[R]) === t &&
            ((e[R] += 8192), Of(a, i))
          : Of(a, i);
      }
      const Xn = -1;
      class Ur {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Pf(e) {
        return e !== Xn;
      }
      function yi(e) {
        return 32767 & e;
      }
      function Di(e, t) {
        let n = (function UC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[$n]), n--;
        return r;
      }
      let ja = !0;
      function vi(e) {
        const t = ja;
        return (ja = e), t;
      }
      const Rf = 255,
        kf = 5;
      let GC = 0;
      const Nt = {};
      function _i(e, t) {
        const n = Lf(e, t);
        if (-1 !== n) return n;
        const r = t[w];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          $a(r.data, e),
          $a(t, null),
          $a(r.blueprint, null));
        const o = Ua(e, t),
          i = e.injectorIndex;
        if (Pf(o)) {
          const s = yi(o),
            a = Di(o, t),
            u = a[w].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function $a(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Lf(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ua(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Gf(o)), null === r)) return Xn;
          if ((n++, (o = o[$n]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Xn;
      }
      function Ga(e, t, n) {
        !(function zC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Pr) && (r = n[Pr]),
            null == r && (r = n[Pr] = GC++);
          const o = r & Rf;
          t.data[e + (o >> kf)] |= 1 << o;
        })(e, t, n);
      }
      function Vf(e, t, n) {
        if (n & N.Optional || void 0 !== e) return e;
        Qo();
      }
      function Hf(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          !(n & (N.Self | N.Host)))
        ) {
          const o = e[jn],
            i = Ue(void 0);
          try {
            return o ? o.get(t, r, n & N.Optional) : xd(t, r, n & N.Optional);
          } finally {
            Ue(i);
          }
        }
        return Vf(r, 0, n);
      }
      function Bf(e, t, n, r = N.Default, o) {
        if (null !== e) {
          if (2048 & t[R] && !(r & N.Self)) {
            const s = (function XC(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[R] && !(512 & s[R]);

              ) {
                const a = jf(i, s, n, r | N.Self, Nt);
                if (a !== Nt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[Yd];
                  if (l) {
                    const c = l.get(n, Nt, r);
                    if (c !== Nt) return c;
                  }
                  (u = Gf(s)), (s = s[$n]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Nt);
            if (s !== Nt) return s;
          }
          const i = jf(e, t, n, r, Nt);
          if (i !== Nt) return i;
        }
        return Hf(t, n, r, o);
      }
      function jf(e, t, n, r, o) {
        const i = (function ZC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Pr) ? e[Pr] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Rf : YC) : t;
        })(n);
        if ("function" == typeof i) {
          if (!bf(t, e, r)) return r & N.Host ? Vf(o, 0, r) : Hf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & N.Optional) return s;
            Qo();
          } finally {
            Af();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Lf(e, t),
            u = Xn,
            l = r & N.Host ? t[fe][xe] : null;
          for (
            (-1 === a || r & N.SkipSelf) &&
            ((u = -1 === a ? Ua(e, t) : t[a + 8]),
            u !== Xn && Uf(r, !1)
              ? ((s = t[w]), (a = yi(u)), (t = Di(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[w];
            if ($f(i, a, c.data)) {
              const d = qC(a, t, n, s, r, l);
              if (d !== Nt) return d;
            }
            (u = t[a + 8]),
              u !== Xn && Uf(r, t[w].data[a + 8] === l) && $f(i, a, t)
                ? ((s = c), (a = yi(u)), (t = Di(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function qC(e, t, n, r, o, i) {
        const s = t[w],
          a = s.data[e + 8],
          c = (function Ci(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && ht(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? En(a) && ja : r != s && 0 != (3 & a.type),
            o & N.Host && i === a
          );
        return null !== c ? Mn(t, s, c, a) : Nt;
      }
      function Mn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function BC(e) {
            return e instanceof Ur;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function D_(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function X(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : O(e);
              })(i[n])
            );
          const a = vi(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? Ue(s.injectImpl) : null;
          bf(e, r, N.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function VC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = af(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && Ue(u), vi(a), (s.resolving = !1), Af();
          }
        }
        return o;
      }
      function $f(e, t, n) {
        return !!(n[t + (e >> kf)] & (1 << e));
      }
      function Uf(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class Kn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Bf(this._tNode, this._lView, t, ni(r), n);
        }
      }
      function YC() {
        return new Kn(Ae(), D());
      }
      function za(e) {
        return ga(e)
          ? () => {
              const t = za(x(e));
              return t && t();
            }
          : wn(e);
      }
      function Gf(e) {
        const t = e[w],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[xe] : null;
      }
      const Jn = "__parameters__";
      function tr(e, t, n) {
        return Bt(() => {
          const r = (function qa(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Jn)
                ? u[Jn]
                : Object.defineProperty(u, Jn, { value: [] })[Jn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function Wr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Wr(n, t) : t(n)));
      }
      function Wf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Ei(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function rt(e, t, n) {
        let r = nr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function tE(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Za(e, t) {
        const n = nr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function nr(e, t) {
        return (function qf(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Xa = Or(tr("Optional"), 8),
        Ka = Or(tr("SkipSelf"), 4);
      function Ai(e) {
        return 128 == (128 & e.flags);
      }
      var Ze = (() => (
        ((Ze = Ze || {})[(Ze.Important = 1)] = "Important"),
        (Ze[(Ze.DashCase = 2)] = "DashCase"),
        Ze
      ))();
      const tu = new Map();
      let ME = 0;
      const ru = "__ngContext__";
      function Pe(e, t) {
        tt(t)
          ? ((e[ru] = t[Br]),
            (function SE(e) {
              tu.set(e[Br], e);
            })(t))
          : (e[ru] = t);
      }
      let ou;
      function iu(e, t) {
        return ou(e, t);
      }
      function Xr(e) {
        const t = e[ae];
        return We(t) ? t[ae] : t;
      }
      function hh(e) {
        return gh(e[Vr]);
      }
      function ph(e) {
        return gh(e[ft]);
      }
      function gh(e) {
        for (; null !== e && !We(e); ) e = e[ft];
        return e;
      }
      function ir(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          We(r) ? (i = r) : tt(r) && ((s = !0), (r = r[_e]));
          const a = re(r);
          0 === e && null !== n
            ? null == o
              ? _h(t, n, a)
              : In(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? In(t, n, a, o || null, !0)
            : 2 === e
            ? (function Pi(e, t, n) {
                const r = Fi(e, t);
                r &&
                  (function WE(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function YE(e, t, n, r, o) {
                const i = n[It];
                i !== re(n) && ir(t, e, r, i, o);
                for (let a = Fe; a < n.length; a++) {
                  const u = n[a];
                  Qr(u[w], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function xi(e, t, n) {
        return e.createElement(t, n);
      }
      function yh(e, t) {
        const n = e[Gn],
          r = n.indexOf(t);
        pf(t), n.splice(r, 1);
      }
      function au(e, t) {
        if (e.length <= Fe) return;
        const n = Fe + t,
          r = e[n];
        if (r) {
          const o = r[Hr];
          null !== o && o !== e && yh(o, r), t > 0 && (e[n - 1][ft] = r[ft]);
          const i = Ei(e, Fe + t);
          !(function VE(e, t) {
            Qr(e, t, t[k], 2, null, null), (t[_e] = null), (t[xe] = null);
          })(r[w], r);
          const s = i[Mt];
          null !== s && s.detachView(i[w]),
            (r[ae] = null),
            (r[ft] = null),
            (r[R] &= -129);
        }
        return r;
      }
      function Dh(e, t) {
        if (!(256 & t[R])) {
          const n = t[k];
          t[ii]?.destroy(),
            t[si]?.destroy(),
            n.destroyNode && Qr(e, t, n, 3, null, null),
            (function jE(e) {
              let t = e[Vr];
              if (!t) return uu(e[w], e);
              for (; t; ) {
                let n = null;
                if (tt(t)) n = t[Vr];
                else {
                  const r = t[Fe];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[ft] && t !== e; )
                    tt(t) && uu(t[w], t), (t = t[ae]);
                  null === t && (t = e), tt(t) && uu(t[w], t), (n = t && t[ft]);
                }
                t = n;
              }
            })(t);
        }
      }
      function uu(e, t) {
        if (!(256 & t[R])) {
          (t[R] &= -129),
            (t[R] |= 256),
            (function zE(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Ur)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        At(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          At(5, a, u);
                        }
                      }
                    else {
                      At(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        At(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function GE(e, t) {
              const n = e.cleanup,
                r = t[Bn];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[Bn] = null);
              const o = t[rn];
              if (null !== o) {
                t[rn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[w].type && t[k].destroy();
          const n = t[Hr];
          if (null !== n && We(t[ae])) {
            n !== t[ae] && yh(n, t);
            const r = t[Mt];
            null !== r && r.detachView(e);
          }
          !(function AE(e) {
            tu.delete(e[Br]);
          })(t);
        }
      }
      function lu(e, t, n) {
        return (function vh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[_e];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Je.None || i === Je.Emulated) return null;
            }
            return qe(r, n);
          }
        })(e, t.parent, n);
      }
      function In(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function _h(e, t, n) {
        e.appendChild(t, n);
      }
      function Ch(e, t, n, r, o) {
        null !== r ? In(e, t, n, r, o) : _h(e, t, n);
      }
      function Fi(e, t) {
        return e.parentNode(t);
      }
      let cu,
        pu,
        bh = function wh(e, t, n) {
          return 40 & e.type ? qe(e, n) : null;
        };
      function Oi(e, t, n, r) {
        const o = lu(e, r, t),
          i = t[k],
          a = (function Eh(e, t, n) {
            return bh(e, t, n);
          })(r.parent || t[xe], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Ch(i, o, n[u], a, !1);
          else Ch(i, o, n, a, !1);
        void 0 !== cu && cu(i, r, t, n, o);
      }
      function Kr(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return qe(t, e);
          if (4 & n) return du(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Kr(e, r);
            {
              const o = e[t.index];
              return We(o) ? du(-1, o) : re(o);
            }
          }
          if (32 & n) return iu(t, e)() || re(e[t.index]);
          {
            const r = Ih(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Kr(Xr(e[fe]), r)
              : Kr(e, t.next);
          }
        }
        return null;
      }
      function Ih(e, t) {
        return null !== t ? e[fe][xe].projection[t.projection] : null;
      }
      function du(e, t) {
        const n = Fe + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[w].firstChild;
          if (null !== o) return Kr(r, o);
        }
        return t[It];
      }
      function fu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Pe(re(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) fu(e, t, n.child, r, o, i, !1), ir(t, e, o, a, i);
            else if (32 & u) {
              const l = iu(n, r);
              let c;
              for (; (c = l()); ) ir(t, e, o, c, i);
              ir(t, e, o, a, i);
            } else 16 & u ? Ah(e, t, r, n, o, i) : ir(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Qr(e, t, n, r, o, i) {
        fu(n, r, e.firstChild, t, o, i, !1);
      }
      function Ah(e, t, n, r, o, i) {
        const s = n[fe],
          u = s[xe].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) ir(t, e, o, u[l], i);
        else {
          let l = u;
          const c = s[ae];
          Ai(r) && (l.flags |= 128), fu(e, t, l, c, o, i, !0);
        }
      }
      function Th(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Nh(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && wa(e, t, r),
          null !== o && Th(e, t, o),
          null !== i &&
            (function KE(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class Ph {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Id})`;
        }
      }
      function an(e) {
        return e instanceof Ph ? e.changingThisBreaksApplicationSecurity : e;
      }
      const dw = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var ge = (() => (
        ((ge = ge || {})[(ge.NONE = 0)] = "NONE"),
        (ge[(ge.HTML = 1)] = "HTML"),
        (ge[(ge.STYLE = 2)] = "STYLE"),
        (ge[(ge.SCRIPT = 3)] = "SCRIPT"),
        (ge[(ge.URL = 4)] = "URL"),
        (ge[(ge.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ge
      ))();
      function _u(e) {
        const t = (function no() {
          const e = D();
          return e && e[Cn].sanitizer;
        })();
        return t
          ? t.sanitize(ge.URL, e) || ""
          : (function eo(e, t) {
              const n = (function aw(e) {
                return (e instanceof Ph && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${Id})`);
              }
              return n === t;
            })(e, "URL")
          ? an(e)
          : (function mu(e) {
              return (e = String(e)).match(dw) ? e : "unsafe:" + e;
            })(O(e));
      }
      class M {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = z({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Vi = new M("ENVIRONMENT_INITIALIZER"),
        $h = new M("INJECTOR", -1),
        Uh = new M("INJECTOR_DEF_TYPES");
      class Gh {
        get(t, n = Fr) {
          if (n === Fr) {
            const r = new Error(`NullInjectorError: No provider for ${ve(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function Mw(...e) {
        return { ɵproviders: zh(0, e), ɵfromNgModule: !0 };
      }
      function zh(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Wr(t, (i) => {
            const s = i;
            Eu(s, n, [], r) && ((o ||= []), o.push(s));
          }),
          void 0 !== o && Wh(o, n),
          n
        );
      }
      function Wh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          wu(o, (i) => {
            t.push(i);
          });
        }
      }
      function Eu(e, t, n, r) {
        if (!(e = x(e))) return !1;
        let o = null,
          i = Ad(e);
        const s = !i && Y(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Ad(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Eu(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Wr(i.imports, (c) => {
                  Eu(c, t, n, r) && ((l ||= []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && Wh(l, t);
            }
            if (!a) {
              const l = wn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: W },
                { provide: Uh, useValue: o, multi: !0 },
                { provide: Vi, useValue: () => V(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              wu(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function wu(e, t) {
        for (let n of e)
          ma(n) && (n = n.ɵproviders), Array.isArray(n) ? wu(n, t) : t(n);
      }
      const Iw = K({ provide: String, useValue: K });
      function bu(e) {
        return null !== e && "object" == typeof e && Iw in e;
      }
      function Sn(e) {
        return "function" == typeof e;
      }
      const Mu = new M("Set Injector scope."),
        Hi = {},
        Aw = {};
      let Iu;
      function Bi() {
        return void 0 === Iu && (Iu = new Gh()), Iu;
      }
      class An {}
      class Su extends An {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Tu(t, (s) => this.processProvider(s)),
            this.records.set($h, ar(void 0, this)),
            o.has("environment") && this.records.set(An, ar(void 0, this));
          const i = this.records.get(Mu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Uh.multi, W, N.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = nn(this),
            r = Ue(void 0);
          try {
            return t();
          } finally {
            nn(n), Ue(r);
          }
        }
        get(t, n = Fr, r = N.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Rd)))
            return t[Rd](this);
          r = ni(r);
          const o = nn(this),
            i = Ue(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function Ow(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof M)
                    );
                  })(t) && Jo(t);
                (a = u && this.injectableDefInScope(u) ? ar(Au(t), Hi) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? Bi() : this.parent).get(
              t,
              (n = r & N.Optional && n === Fr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ti] = s[ti] || []).unshift(ve(t)), o)) throw s;
              return (function x_(e, t, n, r) {
                const o = e[ti];
                throw (
                  (t[Fd] && o.unshift(t[Fd]),
                  (e.message = (function F_(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = ve(t);
                    if (Array.isArray(t)) o = t.map(ve).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ve(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      I_,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[ti] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ue(i), nn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = nn(this),
            n = Ue(void 0);
          try {
            const r = this.get(Vi.multi, W, N.Self);
            for (const o of r) o();
          } finally {
            nn(t), Ue(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ve(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = Sn((t = x(t))) ? t : x(t && t.provide);
          const r = (function Nw(e) {
            return bu(e) ? ar(void 0, e.useValue) : ar(Yh(e), Hi);
          })(t);
          if (Sn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = ar(void 0, Hi, !0)),
              (o.factory = () => _a(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Hi && ((n.value = Aw), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function Fw(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = x(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function Au(e) {
        const t = Jo(e),
          n = null !== t ? t.factory : wn(e);
        if (null !== n) return n;
        if (e instanceof M) throw new C(204, !1);
        if (e instanceof Function)
          return (function Tw(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function qr(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function w_(e) {
              return (e && (e[ei] || e[Td])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function Yh(e, t, n) {
        let r;
        if (Sn(e)) {
          const o = x(e);
          return wn(o) || Au(o);
        }
        if (bu(e)) r = () => x(e.useValue);
        else if (
          (function Zh(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(..._a(e.deps || []));
        else if (
          (function qh(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => V(x(e.useExisting));
        else {
          const o = x(e && (e.useClass || e.provide));
          if (
            !(function xw(e) {
              return !!e.deps;
            })(e)
          )
            return wn(o) || Au(o);
          r = () => new o(..._a(e.deps));
        }
        return r;
      }
      function ar(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Tu(e, t) {
        for (const n of e)
          Array.isArray(n) ? Tu(n, t) : n && ma(n) ? Tu(n.ɵproviders, t) : t(n);
      }
      const ji = new M("AppId", { providedIn: "root", factory: () => Pw }),
        Pw = "ng",
        Xh = new M("Platform Initializer"),
        Tn = new M("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Kh = new M("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function Jr() {
              if (void 0 !== pu) return pu;
              if (typeof document < "u") return document;
              throw new C(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Jh = (e, t) => null;
      function ep(e, t) {
        return Jh(e, t);
      }
      class Uw {}
      class rp {}
      class zw {
        resolveComponentFactory(t) {
          throw (function Gw(e) {
            const t = Error(`No component factory found for ${ve(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Wi = (() => {
        class e {}
        return (e.NULL = new zw()), e;
      })();
      function Ww() {
        return ur(Ae(), D());
      }
      function ur(e, t) {
        return new pt(qe(e, t));
      }
      let pt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Ww), e;
      })();
      class ip {}
      let Nn = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
          }
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function Zw() {
                const e = D(),
                  n = nt(Ae().index, e);
                return (tt(n) ? n : e)[k];
              })()),
            e
          );
        })(),
        Yw = (() => {
          class e {}
          return (
            (e.ɵprov = z({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class qi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Xw = new qi("16.1.5"),
        Bu = {};
      function so(e) {
        for (; e; ) {
          e[R] |= 64;
          const t = Xr(e);
          if (Ia(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function ju(e) {
        return e.ngOriginalError;
      }
      class xn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && ju(t);
          for (; n && ju(n); ) n = ju(n);
          return n || null;
        }
      }
      const up = new M("", { providedIn: "root", factory: () => !1 });
      class hp extends tf {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          so(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, n, r) {
          const o = Ie(this);
          this.trackingVersion++;
          try {
            t(n, r);
          } finally {
            Ie(o);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let Yi = null;
      function pp() {
        return (Yi ??= new hp()), Yi;
      }
      function gp(e, t) {
        return e[t] ?? pp();
      }
      function mp(e, t) {
        const n = pp();
        n.hasReadASignal && ((e[t] = Yi), (n.lView = e), (Yi = new hp()));
      }
      const L = {};
      function ot(e) {
        yp(G(), D(), He() + e, !1);
      }
      function yp(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[R])) {
            const i = e.preOrderCheckHooks;
            null !== i && gi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && mi(t, i, 0, n);
          }
        bn(n);
      }
      function Cp(e, t = null, n = null, r) {
        const o = Ep(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Ep(e, t = null, n = null, r, o = new Set()) {
        const i = [n || W, Mw(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ve(e))),
          new Su(i, t || Bi(), r || null, o)
        );
      }
      let un = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Cp({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Cp({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Fr),
          (e.NULL = new Gh()),
          (e.ɵprov = z({ token: e, providedIn: "any", factory: () => V($h) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function _(e, t = N.Default) {
        const n = D();
        return null === n ? V(e, t) : Bf(Ae(), n, x(e), t);
      }
      function Xi(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[_e] = o),
          (d[R] = 140 | r),
          (null !== l || (e && 2048 & e[R])) && (d[R] |= 2048),
          hf(d),
          (d[ae] = d[$n] = e),
          (d[de] = n),
          (d[Cn] = s || (e && e[Cn])),
          (d[k] = a || (e && e[k])),
          (d[jn] = u || (e && e[jn]) || null),
          (d[xe] = i),
          (d[Br] = (function IE() {
            return ME++;
          })()),
          (d[Ut] = c),
          (d[Yd] = l),
          (d[fe] = 2 == t.type ? e[fe] : d),
          d
        );
      }
      function cr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function $u(e, t, n, r, o) {
            const i = vf(),
              s = Fa(),
              u = (e.data[t] = (function Db(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function Wn() {
                    return null !== T.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function TC() {
              return T.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function $r() {
            const e = T.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Tt(i, !0), i;
      }
      function ao(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function wp(e, t, n, r, o) {
        const i = gp(t, ii),
          s = He(),
          a = 2 & r;
        try {
          if (
            (bn(-1), a && t.length > j && yp(e, t, j, !1), At(a ? 2 : 0, o), a)
          )
            i.runInContext(n, r, o);
          else {
            const l = Ie(null);
            try {
              n(r, o);
            } finally {
              Ie(l);
            }
          }
        } finally {
          a && null === t[ii] && mp(t, ii), bn(s), At(a ? 3 : 1, o);
        }
      }
      function Uu(e, t, n) {
        if (Ma(t)) {
          const r = Ie(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            Ie(r);
          }
        }
      }
      function Gu(e, t, n) {
        Df() &&
          ((function Mb(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            En(n) &&
              (function Fb(e, t, n) {
                const r = qe(t, e),
                  o = bp(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = Ki(
                  e,
                  Xi(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[Cn].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || _i(n, t),
              Pe(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Mn(t, e, a, n);
              Pe(l, t),
                null !== s && Ob(0, a - o, l, u, 0, s),
                ht(u) && (nt(n.index, t)[de] = Mn(t, e, a, n));
            }
          })(e, t, n, qe(n, t)),
          64 == (64 & n.flags) && Tp(e, t, n));
      }
      function zu(e, t, n = qe) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function bp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Wu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Wu(e, t, n, r, o, i, s, a, u, l, c) {
        const d = j + r,
          f = d + o,
          h = (function fb(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : L);
            return n;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[w] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let Mp = (e) => null;
      function Ip(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Sp(n, t, o, i)
              : r.hasOwnProperty(o) && Sp(n, t, r[o], i);
          }
        return n;
      }
      function Sp(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function it(e, t, n, r, o, i, s, a) {
        const u = qe(t, n);
        let c,
          l = t.inputs;
        !a && null != l && (c = l[r])
          ? (Ku(e, n, c, r, o),
            En(t) &&
              (function Cb(e, t) {
                const n = nt(t, e);
                16 & n[R] || (n[R] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function _b(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(u, r, o));
      }
      function qu(e, t, n, r) {
        if (Df()) {
          const o = null === r ? null : { "": -1 },
            i = (function Sb(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if ($d(t, s.selectors, !1))
                    if ((r || (r = []), ht(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Zu(e, t, a.length);
                      } else r.unshift(s), Zu(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Ap(e, t, n, s, o, a),
            o &&
              (function Ab(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = Rr(n.mergedAttrs, n.attrs);
      }
      function Ap(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) Ga(_i(n, t), e, r[l].type);
        !(function Nb(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = ao(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = Rr(n.mergedAttrs, c.hostAttrs)),
            xb(e, n, t, u, c),
            Tb(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function vb(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Ip(d.inputs, c, u, f ? f.inputs : null)),
              (l = Ip(d.outputs, c, l, p));
            const g = null === u || null === s || jd(t) ? null : Pb(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function Tp(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function xC() {
            return T.lFrame.currentDirectiveIndex;
          })();
        try {
          bn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Pa(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                Ib(u, l);
          }
        } finally {
          bn(-1), Pa(s);
        }
      }
      function Ib(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Zu(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function Tb(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          ht(t) && (n[""] = e);
        }
      }
      function xb(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = wn(o.type)),
          s = new Ur(i, ht(o), _);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function wb(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function bb(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, ao(e, n, o.hostVars, L), o);
      }
      function Ob(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Np(r, n, s[a++], s[a++], s[a++]);
      }
      function Np(e, t, n, r, o) {
        const i = Ie(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          Ie(i);
        }
      }
      function Pb(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function xp(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function Fp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              ka(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ki(e, t) {
        return e[Vr] ? (e[Zd][ft] = t) : (e[Vr] = t), (e[Zd] = t), t;
      }
      function Xu(e, t, n) {
        ka(0);
        const r = Ie(null);
        try {
          t(e, n);
        } finally {
          Ie(r);
        }
      }
      function kp(e, t) {
        const n = e[jn],
          r = n ? n.get(xn, null) : null;
        r && r.handleError(t);
      }
      function Ku(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          Np(e.data[s], t[s], r, a, o);
        }
      }
      function Yt(e, t, n) {
        const r = fi(t, e);
        !(function mh(e, t, n) {
          e.setValue(t, n);
        })(e[k], r, n);
      }
      function Rb(e, t) {
        const n = nt(t, e),
          r = n[w];
        !(function kb(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[_e];
        null !== o && null === n[Ut] && (n[Ut] = ep(o, n[jn])), Qu(r, n, n[de]);
      }
      function Qu(e, t, n) {
        La(t);
        try {
          const r = e.viewQuery;
          null !== r && Xu(1, r, n);
          const o = e.template;
          null !== o && wp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Fp(e, t),
            e.staticViewQueries && Xu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Lb(e, t) {
              for (let n = 0; n < t.length; n++) Rb(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[R] &= -5), Va();
        }
      }
      let Lp = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, o) {
            const i = typeof Zone > "u" ? null : Zone.current,
              s = new aC(
                n,
                (l) => {
                  this.all.has(l) && this.queue.set(l, i);
                },
                o
              );
            let a;
            this.all.add(s), s.notify();
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(u)), { destroy: u };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          (e.ɵprov = z({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          e
        );
      })();
      function Qi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = pa(o, a))
              : 2 == i && (r = pa(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function uo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(re(i)), We(i))) {
            for (let a = Fe; a < i.length; a++) {
              const u = i[a],
                l = u[w].firstChild;
              null !== l && uo(u[w], u, l, r);
            }
            i[It] !== i[_e] && r.push(i[It]);
          }
          const s = n.type;
          if (8 & s) uo(e, t, n.child, r);
          else if (32 & s) {
            const a = iu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Ih(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Xr(t[fe]);
              uo(u[w], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Ji(e, t, n, r = !0) {
        const o = t[Cn].rendererFactory;
        o.begin && o.begin();
        try {
          Vp(e, t, e.template, n);
        } catch (s) {
          throw (r && kp(t, s), s);
        } finally {
          o.end && o.end(), t[Cn].effectManager?.flush();
        }
      }
      function Vp(e, t, n, r) {
        const o = t[R];
        if (256 != (256 & o)) {
          t[Cn].effectManager?.flush(), La(t);
          try {
            hf(t),
              (function Cf(e) {
                return (T.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && wp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && gi(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && mi(t, l, 0, null), Ha(t, 0);
            }
            if (
              ((function $b(e) {
                for (let t = hh(e); null !== t; t = ph(t)) {
                  if (!t[Xd]) continue;
                  const n = t[Gn];
                  for (let r = 0; r < n.length; r++) {
                    DC(n[r]);
                  }
                }
              })(t),
              Hp(t, 2),
              null !== e.contentQueries && Fp(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && gi(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && mi(t, l, 1), Ha(t, 1);
            }
            !(function db(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = gp(t, si);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) bn(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o];
                    NC(a, s), r.runInContext(u, 2, t[s]);
                  }
                }
              } finally {
                null === t[si] && mp(t, si), bn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && jp(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && Xu(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && gi(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && mi(t, l, 2), Ha(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[R] &= -73),
              pf(t);
          } finally {
            Va();
          }
        }
      }
      function Hp(e, t) {
        for (let n = hh(e); null !== n; n = ph(n))
          for (let r = Fe; r < n.length; r++) Bp(n[r], t);
      }
      function Ub(e, t, n) {
        Bp(nt(t, e), n);
      }
      function Bp(e, t) {
        if (
          !(function mC(e) {
            return 128 == (128 & e[R]);
          })(e)
        )
          return;
        const n = e[w];
        if ((80 & e[R] && 0 === t) || 1024 & e[R] || 2 === t)
          Vp(n, e, n.template, e[de]);
        else if (e[Lr] > 0) {
          Hp(e, 1);
          const o = e[w].components;
          null !== o && jp(e, o, 1);
        }
      }
      function jp(e, t, n) {
        for (let r = 0; r < t.length; r++) Ub(e, t[r], n);
      }
      class lo {
        get rootNodes() {
          const t = this._lView,
            n = t[w];
          return uo(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[de];
        }
        set context(t) {
          this._lView[de] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[R]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ae];
            if (We(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (au(t, r), Ei(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Dh(this._lView[w], this._lView);
        }
        onDestroy(t) {
          !(function mf(e, t) {
            if (256 == (256 & e[R])) throw new C(911, !1);
            null === e[rn] && (e[rn] = []), e[rn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          so(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[R] &= -129;
        }
        reattach() {
          this._lView[R] |= 128;
        }
        detectChanges() {
          Ji(this._lView[w], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function BE(e, t) {
              Qr(e, t, t[k], 2, null, null);
            })(this._lView[w], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class Gb extends lo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Ji(t[w], t, t[de], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class $p extends Wi {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Y(t);
          return new co(n, this.ngModule);
        }
      }
      function Up(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class Wb {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = ni(r);
          const o = this.injector.get(t, Bu, r);
          return o !== Bu || n === Bu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class co extends rp {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = Up(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return Up(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function $_(e) {
              return e.map(j_).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof An ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new Wb(t, i) : t,
            a = s.get(ip, null);
          if (null === a) throw new C(407, !1);
          const c = {
              rendererFactory: a,
              sanitizer: s.get(Yw, null),
              effectManager: s.get(Lp, null),
            },
            d = a.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || "div",
            h = r
              ? (function hb(e, t, n, r) {
                  const i = r.get(up, !1) || n === Je.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function pb(e) {
                      Mp(e);
                    })(s),
                    s
                  );
                })(d, r, this.componentDef.encapsulation, s)
              : xi(
                  d,
                  f,
                  (function zb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? cf : "math" === t ? "math" : null;
                  })(f)
                ),
            y = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528,
            v = Wu(0, null, null, 1, 0, null, null, null, null, null, null),
            m = Xi(null, v, null, y, null, null, c, d, s, null, null);
          let b, S;
          La(m);
          try {
            const F = this.componentDef;
            let Me,
              ea = null;
            F.findHostDirectiveDefs
              ? ((Me = []),
                (ea = new Map()),
                F.findHostDirectiveDefs(F, Me, ea),
                Me.push(F))
              : (Me = [F]);
            const KF = (function Zb(e, t) {
                const n = e[w],
                  r = j;
                return (e[r] = t), cr(n, r, 2, "#host", null);
              })(m, h),
              QF = (function Yb(e, t, n, r, o, i, s) {
                const a = o[w];
                !(function Xb(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Rr(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Qi(t, t.mergedAttrs, !0), null !== n && Nh(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = ep(t, o[jn]));
                const l = i.rendererFactory.createRenderer(t, n);
                let c = 16;
                n.signals ? (c = 4096) : n.onPush && (c = 64);
                const d = Xi(
                  o,
                  bp(n),
                  null,
                  c,
                  o[e.index],
                  e,
                  i,
                  l,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && Zu(a, e, r.length - 1),
                  Ki(o, d),
                  (o[e.index] = d)
                );
              })(KF, h, F, Me, m, c, d);
            (S = ff(v, j)),
              h &&
                (function Qb(e, t, n, r) {
                  if (r) wa(e, n, ["ng-version", Xw.full]);
                  else {
                    const { attrs: o, classes: i } = (function U_(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!dt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && wa(e, n, o),
                      i && i.length > 0 && Th(e, n, i.join(" "));
                  }
                })(d, F, h, r),
              void 0 !== n &&
                (function Jb(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(S, this.ngContentSelectors, n),
              (b = (function Kb(e, t, n, r, o, i) {
                const s = Ae(),
                  a = o[w],
                  u = qe(s, o);
                Ap(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Pe(Mn(o, a, s.directiveStart + c, s), o);
                Tp(a, o, s), u && Pe(u, o);
                const l = Mn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[de] = o[de] = l), null !== i))
                  for (const c of i) c(l, t);
                return Uu(a, s, e), l;
              })(QF, F, Me, ea, m, [eM])),
              Qu(v, m, null);
          } finally {
            Va();
          }
          return new qb(this.componentType, b, ur(S, m), m, S);
        }
      }
      class qb extends Uw {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Gb(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            Ku(i[w], i, o, t, n),
              this.previousInputValues.set(t, n),
              so(nt(this._tNode.index, i));
          }
        }
        get injector() {
          return new Kn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function eM() {
        const e = Ae();
        pi(D()[w], e);
      }
      function Q(e) {
        let t = (function Gp(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (ht(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = es(e.inputs)),
                (s.inputTransforms = es(e.inputTransforms)),
                (s.declaredInputs = es(e.declaredInputs)),
                (s.outputs = es(e.outputs));
              const a = o.hostBindings;
              a && oM(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && nM(e, u),
                l && rM(e, l),
                Xo(e.inputs, o.inputs),
                Xo(e.declaredInputs, o.declaredInputs),
                Xo(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Xo(s.inputTransforms, o.inputTransforms)),
                ht(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === Q && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function tM(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Rr(o.hostAttrs, (n = Rr(n, o.hostAttrs))));
          }
        })(r);
      }
      function es(e) {
        return e === bt ? {} : e === W ? [] : e;
      }
      function nM(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function rM(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function oM(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function ts(e) {
        return (
          !!(function Ju(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Re(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function fr(e, t, n, r) {
        return Re(e, Yn(), n) ? t + O(n) + r : L;
      }
      function hr(e, t, n, r, o, i) {
        const a = (function Fn(e, t, n, r) {
          const o = Re(e, t, n);
          return Re(e, t + 1, r) || o;
        })(
          e,
          (function zt() {
            return T.lFrame.bindingIndex;
          })(),
          n,
          o
        );
        return Wt(2), a ? t + O(n) + r + O(o) + i : L;
      }
      let ag = function ug(e, t, n, r) {
        return sn(!0), t[k].createComment("");
      };
      function _r(e) {
        return (function zn(e, t) {
          return e[t];
        })(
          (function AC() {
            return T.lFrame.contextLView;
          })(),
          j + e
        );
      }
      function mo(e, t, n) {
        const r = D();
        return Re(r, Yn(), t) && it(G(), ue(), r, e, t, r[k], n, !1), mo;
      }
      function il(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Ku(e, n, t.inputs[s], s, r);
      }
      function H(e, t, n, r) {
        const o = D(),
          i = G(),
          s = j + e,
          a = o[k],
          u = i.firstCreatePass
            ? (function PM(e, t, n, r, o, i) {
                const s = t.consts,
                  u = cr(t, e, 2, r, on(s, o));
                return (
                  qu(t, n, u, on(s, i)),
                  null !== u.attrs && Qi(u, u.attrs, !1),
                  null !== u.mergedAttrs && Qi(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = lg(i, o, u, a, t, e);
        o[s] = l;
        const c = ui(u);
        return (
          Tt(u, !0),
          Nh(a, l, u),
          32 != (32 & u.flags) && hi() && Oi(i, o, l, u),
          0 ===
            (function _C() {
              return T.lFrame.elementDepthCount;
            })() && Pe(l, o),
          (function CC() {
            T.lFrame.elementDepthCount++;
          })(),
          c && (Gu(i, o, u), Uu(i, u, o)),
          null !== r && zu(o, u),
          H
        );
      }
      function $() {
        let e = Ae();
        Fa()
          ? (function Oa() {
              T.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Tt(e, !1));
        const t = e;
        (function wC(e) {
          return T.skipHydrationRootTNode === e;
        })(t) &&
          (function SC() {
            T.skipHydrationRootTNode = null;
          })(),
          (function EC() {
            T.lFrame.elementDepthCount--;
          })();
        const n = G();
        return (
          n.firstCreatePass && (pi(n, e), Ma(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function jC(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            il(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function $C(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            il(n, t, D(), t.stylesWithoutHost, !1),
          $
        );
      }
      function Xe(e, t, n, r) {
        return H(e, t, n, r), $(), Xe;
      }
      let lg = (e, t, n, r, o, i) => (
        sn(!0),
        xi(
          r,
          o,
          (function Nf() {
            return T.lFrame.currentNamespace;
          })()
        )
      );
      function ul() {
        return D();
      }
      function ss(e) {
        return !!e && "function" == typeof e.then;
      }
      function fg(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Se(e, t, n, r) {
        const o = D(),
          i = G(),
          s = Ae();
        return (
          (function pg(e, t, n, r, o, i, s) {
            const a = ui(r),
              l =
                e.firstCreatePass &&
                (function Pp(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              c = t[de],
              d = (function Op(e) {
                return e[Bn] || (e[Bn] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = qe(r, t),
                y = s ? s(g) : g,
                v = d.length,
                m = s ? (S) => s(re(S[r.index])) : r.index;
              let b = null;
              if (
                (!s &&
                  a &&
                  (b = (function BM(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[Bn],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== b)
              )
                ((b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = i),
                  (b.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = mg(r, t, c, i, !1);
                const S = n.listen(y, o, i);
                d.push(i, S), l && l.push(o, m, v, v + 1);
              }
            } else i = mg(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const F = t[p[y]][p[y + 1]].subscribe(i),
                    Me = d.length;
                  d.push(i, F), l && l.push(o, r.index, Me, -(Me + 1));
                }
            }
          })(i, o, o[k], s, e, t, r),
          Se
        );
      }
      function gg(e, t, n, r) {
        try {
          return At(6, t, n), !1 !== n(r);
        } catch (o) {
          return kp(e, o), !1;
        } finally {
          At(7, t, n);
        }
      }
      function mg(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          so(e.componentOffset > -1 ? nt(e.index, t) : t);
          let u = gg(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = gg(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function ll(e = 1) {
        return (function OC(e) {
          return (T.lFrame.contextLView = (function PC(e, t) {
            for (; e > 0; ) (t = t[$n]), e--;
            return t;
          })(e, T.lFrame.contextLView))[de];
        })(e);
      }
      function cl(e, t, n) {
        return dl(e, "", t, "", n), cl;
      }
      function dl(e, t, n, r, o) {
        const i = D(),
          s = fr(i, t, n, r);
        return s !== L && it(G(), ue(), i, e, s, i[k], o, !1), dl;
      }
      function as(e, t) {
        return (e << 17) | (t << 2);
      }
      function ln(e) {
        return (e >> 17) & 32767;
      }
      function fl(e) {
        return 2 | e;
      }
      function On(e) {
        return (131068 & e) >> 2;
      }
      function hl(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function pl(e) {
        return 1 | e;
      }
      function Mg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? ln(i) : On(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          YM(e[a], t) && ((u = !0), (e[a + 1] = r ? pl(c) : fl(c))),
            (a = r ? ln(c) : On(c));
        }
        u && (e[n + 1] = r ? fl(i) : pl(i));
      }
      function YM(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && nr(e, t) >= 0)
        );
      }
      const Ee = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Ig(e) {
        return e.substring(Ee.key, Ee.keyEnd);
      }
      function Sg(e, t) {
        const n = Ee.textEnd;
        return n === t
          ? -1
          : ((t = Ee.keyEnd =
              (function JM(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (Ee.key = t), n)),
            Cr(e, t, n));
      }
      function Cr(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function us(e, t) {
        return (
          (function gt(e, t, n, r) {
            const o = D(),
              i = G(),
              s = Wt(2);
            i.firstUpdatePass && Pg(i, e, s, r),
              t !== L &&
                Re(o, s, t) &&
                kg(
                  i,
                  i.data[He()],
                  o,
                  o[k],
                  e,
                  (o[s + 1] = (function cI(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ve(an(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          us
        );
      }
      function ls(e) {
        !(function mt(e, t, n, r) {
          const o = G(),
            i = Wt(2);
          o.firstUpdatePass && Pg(o, null, i, r);
          const s = D();
          if (n !== L && Re(s, i, n)) {
            const a = o.data[He()];
            if (Vg(a, r) && !Og(o, i)) {
              let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== u && (n = pa(u, n || "")), il(o, a, s, n, r);
            } else
              !(function lI(e, t, n, r, o, i, s, a) {
                o === L && (o = W);
                let u = 0,
                  l = 0,
                  c = 0 < o.length ? o[0] : null,
                  d = 0 < i.length ? i[0] : null;
                for (; null !== c || null !== d; ) {
                  const f = u < o.length ? o[u + 1] : void 0,
                    h = l < i.length ? i[l + 1] : void 0;
                  let g,
                    p = null;
                  c === d
                    ? ((u += 2), (l += 2), f !== h && ((p = d), (g = h)))
                    : null === d || (null !== c && c < d)
                    ? ((u += 2), (p = c))
                    : ((l += 2), (p = d), (g = h)),
                    null !== p && kg(e, t, n, r, p, g, s, a),
                    (c = u < o.length ? o[u] : null),
                    (d = l < i.length ? i[l] : null);
                }
              })(
                o,
                a,
                s,
                s[k],
                s[i + 1],
                (s[i + 1] = (function aI(e, t, n) {
                  if (null == n || "" === n) return W;
                  const r = [],
                    o = an(n);
                  if (Array.isArray(o))
                    for (let i = 0; i < o.length; i++) e(r, o[i], !0);
                  else if ("object" == typeof o)
                    for (const i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
                  else "string" == typeof o && t(r, o);
                  return r;
                })(e, t, n)),
                r,
                i
              );
          }
        })(uI, Pt, e, !0);
      }
      function Pt(e, t) {
        for (
          let n = (function KM(e) {
            return (
              (function Tg(e) {
                (Ee.key = 0),
                  (Ee.keyEnd = 0),
                  (Ee.value = 0),
                  (Ee.valueEnd = 0),
                  (Ee.textEnd = e.length);
              })(e),
              Sg(e, Cr(e, 0, Ee.textEnd))
            );
          })(t);
          n >= 0;
          n = Sg(t, n)
        )
          rt(e, Ig(t), !0);
      }
      function Og(e, t) {
        return t >= e.expandoStartIndex;
      }
      function Pg(e, t, n, r) {
        const o = e.data;
        if (null === o[n + 1]) {
          const i = o[He()],
            s = Og(e, n);
          Vg(i, r) && null === t && !s && (t = !1),
            (t = (function rI(e, t, n, r) {
              const o = (function Ra(e) {
                const t = T.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let i = r ? t.residualClasses : t.residualStyles;
              if (null === o)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = yo((n = gl(null, e, t, n, r)), t.attrs, r)),
                  (i = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== o)
                  if (((n = gl(o, e, t, n, r)), null === i)) {
                    let u = (function oI(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== On(r)) return e[ln(r)];
                    })(e, t, r);
                    void 0 !== u &&
                      Array.isArray(u) &&
                      ((u = gl(null, e, t, u[1], r)),
                      (u = yo(u, t.attrs, r)),
                      (function iI(e, t, n, r) {
                        e[ln(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, u));
                  } else
                    i = (function sI(e, t, n) {
                      let r;
                      const o = t.directiveEnd;
                      for (let i = 1 + t.directiveStylingLast; i < o; i++)
                        r = yo(r, e[i].hostAttrs, n);
                      return yo(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== i &&
                  (r ? (t.residualClasses = i) : (t.residualStyles = i)),
                n
              );
            })(o, i, t, r)),
            (function qM(e, t, n, r, o, i) {
              let s = i ? t.classBindings : t.styleBindings,
                a = ln(s),
                u = On(s);
              e[r] = n;
              let c,
                l = !1;
              if (
                (Array.isArray(n)
                  ? ((c = n[1]), (null === c || nr(n, c) > 0) && (l = !0))
                  : (c = n),
                o)
              )
                if (0 !== u) {
                  const f = ln(e[a + 1]);
                  (e[r + 1] = as(f, a)),
                    0 !== f && (e[f + 1] = hl(e[f + 1], r)),
                    (e[a + 1] = (function zM(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = as(a, 0)),
                    0 !== a && (e[a + 1] = hl(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = as(u, 0)),
                  0 === a ? (a = r) : (e[u + 1] = hl(e[u + 1], r)),
                  (u = r);
              l && (e[r + 1] = fl(e[r + 1])),
                Mg(e, c, r, !0),
                Mg(e, c, r, !1),
                (function ZM(e, t, n, r, o) {
                  const i = o ? e.residualClasses : e.residualStyles;
                  null != i &&
                    "string" == typeof t &&
                    nr(i, t) >= 0 &&
                    (n[r + 1] = pl(n[r + 1]));
                })(t, c, e, r, i),
                (s = as(a, u)),
                i ? (t.classBindings = s) : (t.styleBindings = s);
            })(o, i, t, n, s, r);
        }
      }
      function gl(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = yo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function yo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                rt(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function uI(e, t, n) {
        const r = String(t);
        "" !== r && !r.includes(" ") && rt(e, r, n);
      }
      function kg(e, t, n, r, o, i, s, a) {
        if (!(3 & t.type)) return;
        const u = e.data,
          l = u[a + 1],
          c = (function WM(e) {
            return 1 == (1 & e);
          })(l)
            ? Lg(u, t, n, o, On(l), s)
            : void 0;
        cs(c) ||
          (cs(i) ||
            ((function GM(e) {
              return 2 == (2 & e);
            })(l) &&
              (i = Lg(u, null, n, o, a, s))),
          (function XE(e, t, n, r, o) {
            if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let i = -1 === r.indexOf("-") ? void 0 : Ze.DashCase;
              null == o
                ? e.removeStyle(n, r, i)
                : ("string" == typeof o &&
                    o.endsWith("!important") &&
                    ((o = o.slice(0, -10)), (i |= Ze.Important)),
                  e.setStyle(n, r, o, i));
            }
          })(r, s, fi(He(), n), o, i));
      }
      function Lg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === L && (f = d ? W : void 0);
          let h = d ? Za(f, r) : c === r ? f : void 0;
          if ((l && !cs(h) && (h = Za(u, r)), cs(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? ln(p) : On(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Za(u, r));
        }
        return a;
      }
      function cs(e) {
        return void 0 !== e;
      }
      function Vg(e, t) {
        return 0 != (e.flags & (t ? 8 : 16));
      }
      function te(e, t = "") {
        const n = D(),
          r = G(),
          o = e + j,
          i = r.firstCreatePass ? cr(r, o, 1, t, null) : r.data[o],
          s = Hg(r, n, i, t, e);
        (n[o] = s), hi() && Oi(r, n, s, i), Tt(i, !1);
      }
      let Hg = (e, t, n, r, o) => (
        sn(!0),
        (function Ni(e, t) {
          return e.createText(t);
        })(t[k], r)
      );
      function ds(e) {
        return Do("", e, ""), ds;
      }
      function Do(e, t, n) {
        const r = D(),
          o = fr(r, e, t, n);
        return o !== L && Yt(r, He(), o), Do;
      }
      function ml(e, t, n, r, o) {
        const i = D(),
          s = hr(i, e, t, n, r, o);
        return s !== L && Yt(i, He(), s), ml;
      }
      const wr = "en-US";
      let sm = wr;
      function vl(e, t, n, r, o) {
        if (((e = x(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) vl(e[i], t, n, r, o);
        else {
          const i = G(),
            s = D();
          let a = Sn(e) ? e : x(e.provide),
            u = Yh(e);
          const l = Ae(),
            c = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20;
          if (Sn(e) || !e.multi) {
            const h = new Ur(u, o, _),
              p = Cl(a, t, o ? c : c + f, d);
            -1 === p
              ? (Ga(_i(l, s), i, a),
                _l(i, e, t.length),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Cl(a, t, c + f, d),
              p = Cl(a, t, c, c + f),
              y = p >= 0 && n[p];
            if ((o && !y) || (!o && !(h >= 0 && n[h]))) {
              Ga(_i(l, s), i, a);
              const v = (function NS(e, t, n, r, o) {
                const i = new Ur(e, n, _);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  xm(i, o, r && !n),
                  i
                );
              })(o ? TS : AS, n.length, o, r, u);
              !o && y && (n[p].providerFactory = v),
                _l(i, e, t.length, 0),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(v),
                s.push(v);
            } else _l(i, e, h > -1 ? h : p, xm(n[o ? p : h], u, !o && r));
            !o && r && y && n[p].componentProviders++;
          }
        }
      }
      function _l(e, t, n, r) {
        const o = Sn(t),
          i = (function Sw(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? x(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(n);
              -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
          }
        }
      }
      function xm(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Cl(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function AS(e, t, n, r) {
        return El(this.multi, []);
      }
      function TS(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Mn(n, n[w], this.providerFactory.index, r);
          (i = a.slice(0, s)), El(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), El(o, i);
        return i;
      }
      function El(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ie(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function SS(e, t, n) {
              const r = G();
              if (r.firstCreatePass) {
                const o = ht(e);
                vl(n, r.data, r.blueprint, o, !0),
                  vl(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class br {}
      class xS {}
      class wl extends br {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new $p(this));
          const o = (function et(e, t) {
            const n = e[Pd] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${ve(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function Zt(e) {
            return e instanceof Function ? e() : e;
          })(o.bootstrap)),
            (this._r3Injector = Ep(
              t,
              n,
              [
                { provide: br, useValue: this },
                { provide: Wi, useValue: this.componentFactoryResolver },
                ...r,
              ],
              ve(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class bl extends xS {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new wl(this.moduleType, t, []);
        }
      }
      function ms(e, t, n, r) {
        return (function Hm(e, t, n, r, o, i) {
          const s = t + n;
          return Re(e, s, o)
            ? (function Ft(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function bo(e, t) {
                const n = e[t];
                return n === L ? void 0 : n;
              })(e, s + 1);
        })(
          D(),
          (function Ve() {
            const e = T.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r
        );
      }
      function Il(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ke = class aA extends qo {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Il(i)), o && (o = Il(o)), s && (s = Il(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof _t && t.add(a), a;
        }
      };
      let Kt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = dA), e;
      })();
      const lA = Kt,
        cA = class extends lA {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n, null);
          }
          createEmbeddedViewImpl(t, n, r) {
            const s = this._declarationTContainer.tView,
              a = Xi(
                this._declarationLView,
                s,
                t,
                4096 & this._declarationLView[R] ? 4096 : 16,
                null,
                s.declTNode,
                null,
                null,
                null,
                n || null,
                r || null
              );
            a[Hr] = this._declarationLView[this._declarationTContainer.index];
            const l = this._declarationLView[Mt];
            return (
              null !== l && (a[Mt] = l.createEmbeddedView(s)),
              Qu(s, a, t),
              new lo(a)
            );
          }
        };
      function dA() {
        return (function ys(e, t) {
          return 4 & e.type ? new cA(t, e, ur(e, t)) : null;
        })(Ae(), D());
      }
      let Rt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = DA), e;
      })();
      function DA() {
        return (function Ym(e, t) {
          let n;
          const r = t[e.index];
          return (
            We(r)
              ? (n = r)
              : ((n = xp(r, t, null, e)), (t[e.index] = n), Ki(t, n)),
            Xm(n, t, e, r),
            new qm(n, e, t)
          );
        })(Ae(), D());
      }
      const vA = Rt,
        qm = class extends vA {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return ur(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Kn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ua(this._hostTNode, this._hostLView);
            if (Pf(t)) {
              const n = Di(t, this._hostLView),
                r = yi(t);
              return new Kn(n[w].data[r + 8], n);
            }
            return new Kn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Zm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Fe;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function zr(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new co(Y(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const y = (s ? l : this.parentInjector).get(An, null);
              y && (i = y);
            }
            Y(u.componentType ?? {});
            const h = u.create(l, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView,
              i = o[w];
            if (
              (function yC(e) {
                return We(e[ae]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const l = o[ae],
                  c = new qm(l, l[xe], l[ae]);
                c.detach(c.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            if (
              ((function $E(e, t, n, r) {
                const o = Fe + r,
                  i = n.length;
                r > 0 && (n[o - 1][ft] = t),
                  r < i - Fe
                    ? ((t[ft] = n[o]), Wf(n, Fe + r, t))
                    : (n.push(t), (t[ft] = null)),
                  (t[ae] = n);
                const s = t[Hr];
                null !== s &&
                  n !== s &&
                  (function UE(e, t) {
                    const n = e[Gn];
                    t[fe] !== t[ae][ae][fe] && (e[Xd] = !0),
                      null === n ? (e[Gn] = [t]) : n.push(t);
                  })(s, t);
                const a = t[Mt];
                null !== a && a.insertView(e), (t[R] |= 128);
              })(i, o, a, s),
              !r)
            ) {
              const u = du(s, a),
                l = o[k],
                c = Fi(l, a[It]);
              null !== c &&
                (function HE(e, t, n, r, o, i) {
                  (r[_e] = o), (r[xe] = t), Qr(e, r, n, 1, o, i);
                })(i, a[xe], l, o, c, u);
            }
            return t.attachToViewContainerRef(), Wf(Tl(a), s, t), t;
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Zm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = au(this._lContainer, n);
            r && (Ei(Tl(this._lContainer), n), Dh(r[w], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = au(this._lContainer, n);
            return r && null != Ei(Tl(this._lContainer), n) ? new lo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Zm(e) {
        return e[8];
      }
      function Tl(e) {
        return e[8] || (e[8] = []);
      }
      let Xm = function Km(e, t, n, r) {
        if (e[It]) return;
        let o;
        (o =
          8 & n.type
            ? re(r)
            : (function _A(e, t) {
                const n = e[k],
                  r = n.createComment(""),
                  o = qe(t, e);
                return (
                  In(
                    n,
                    Fi(n, o),
                    r,
                    (function qE(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[It] = o);
      };
      const eT = new M("Application Initializer");
      let Hl = (() => {
        class e {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((n, r) => {
                (this.resolve = n), (this.reject = r);
              })),
              (this.appInits = Z(eT, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [];
            for (const o of this.appInits) {
              const i = o();
              if (ss(i)) n.push(i);
              else if (fg(i)) {
                const s = new Promise((a, u) => {
                  i.subscribe({ complete: a, error: u });
                });
                n.push(s);
              }
            }
            const r = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Qt = new M("LocaleId", {
        providedIn: "root",
        factory: () =>
          Z(Qt, N.Optional | N.SkipSelf) ||
          (function nT() {
            return (typeof $localize < "u" && $localize.locale) || wr;
          })(),
      });
      let Bl = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new M0(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Ey(...e) {}
      class we {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ke(!1)),
            (this.onMicrotaskEmpty = new ke(!1)),
            (this.onStable = new ke(!1)),
            (this.onError = new ke(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function aT() {
              const e = "function" == typeof J.requestAnimationFrame;
              let t = J[e ? "requestAnimationFrame" : "setTimeout"],
                n = J[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function cT(e) {
              const t = () => {
                !(function lT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(J, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                $l(e),
                                (e.isCheckStableRunning = !0),
                                jl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    $l(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return wy(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      by(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return wy(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), by(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          $l(e),
                          jl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!we.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (we.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, uT, Ey, Ey);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const uT = {};
      function jl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function $l(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function wy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function by(e) {
        e._nesting--, jl(e);
      }
      class dT {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ke()),
            (this.onMicrotaskEmpty = new ke()),
            (this.onStable = new ke()),
            (this.onError = new ke());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const My = new M("", { providedIn: "root", factory: Iy });
      function Iy() {
        const e = Z(we);
        let t = !0;
        return (function p_(...e) {
          const t = _d(e),
            n = (function a_(e, t) {
              return "number" == typeof da(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length
            ? 1 === r.length
              ? Ct(r[0])
              : (function r_(e = 1 / 0) {
                  return Zo(sa, e);
                })(n)(Yo(r, t))
            : vd;
        })(
          new Te((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new Te((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                we.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              we.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(bd())
        );
      }
      const Sy = new M(""),
        vs = new M("");
      let zl,
        Ul = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                zl ||
                  ((function fT(e) {
                    zl = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      we.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(we), V(Gl), V(vs));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Gl = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return zl?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        cn = null;
      const Ay = new M("AllowMultipleToken"),
        Wl = new M("PlatformDestroyListeners"),
        Ty = new M("appBootstrapListener");
      function Fy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new M(r);
        return (i = []) => {
          let s = ql();
          if (!s || s.injector.get(Ay, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function gT(e) {
                  if (cn && !cn.get(Ay, !1)) throw new C(400, !1);
                  (function Ny() {
                    !(function iC(e) {
                      nf = e;
                    })(() => {
                      throw new C(600, !1);
                    });
                  })(),
                    (cn = e);
                  const t = e.get(Py);
                  (function xy(e) {
                    e.get(Xh, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function Oy(e = [], t) {
                    return un.create({
                      name: t,
                      providers: [
                        { provide: Mu, useValue: "platform" },
                        { provide: Wl, useValue: new Set([() => (cn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function yT(e) {
            const t = ql();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function ql() {
        return cn?.get(Py) ?? null;
      }
      let Py = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function DT(e = "zone.js", t) {
              return "noop" === e ? new dT() : "zone.js" === e ? new we(t) : e;
            })(
              r?.ngZone,
              (function Ry(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function OS(e, t, n) {
                  return new wl(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function By(e) {
                    return [
                      { provide: we, useFactory: e },
                      {
                        provide: Vi,
                        multi: !0,
                        useFactory: () => {
                          const t = Z(_T, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: Hy, useFactory: vT },
                      { provide: My, useFactory: Iy },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(xn, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u);
                    },
                  });
                  i.onDestroy(() => {
                    _s(this._modules, i), a.unsubscribe();
                  });
                }),
                (function ky(e, t, n) {
                  try {
                    const r = n();
                    return ss(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(Hl);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function am(e) {
                          st(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (sm = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(Qt, wr) || wr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Ly({}, r);
            return (function hT(e, t, n) {
              const r = new bl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(So);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Wl, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(un));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Ly(e, t) {
        return Array.isArray(t) ? t.reduce(Ly, e) : { ...e, ...t };
      }
      let So = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = Z(Hy)),
              (this.zoneIsStable = Z(My)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = Z(Bl).hasPendingTasks.pipe(
                Md((n) => (n ? fa(!1) : this.zoneIsStable)),
                (function g_(e, t = sa) {
                  return (
                    (e = e ?? m_),
                    Vt((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        Ht(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                bd()
              )),
              (this._injector = Z(An));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof rp;
            if (!this._injector.get(Hl).done)
              throw (
                (!o &&
                  (function kr(e) {
                    const t = Y(e) || Ne(e) || ze(e);
                    return null !== t && t.standalone;
                  })(n),
                new C(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(Wi).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function pT(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(br),
              l = s.create(un.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(Sy, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  _s(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            _s(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Ty, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => _s(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function _s(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const Hy = new M("", {
        providedIn: "root",
        factory: () => Z(xn).handleError.bind(void 0),
      });
      function vT() {
        const e = Z(we),
          t = Z(xn);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let _T = (() => {
        class e {
          constructor() {
            (this.zone = Z(we)), (this.applicationRef = Z(So));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class zy {
        constructor() {}
        supports(t) {
          return ts(t);
        }
        create(t) {
          return new TT(t);
        }
      }
      const AT = (e, t) => t;
      class TT {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || AT);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < qy(r, o, i)) ? n : r,
              a = qy(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !ts(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function fM(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new NT(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Wy()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Wy()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class NT {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class xT {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Wy {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new xT()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function qy(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function Yy() {
        return new ws([new zy()]);
      }
      let ws = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Yy()),
              deps: [[e, new Ka(), new Xa()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = z({ token: e, providedIn: "root", factory: Yy })), e;
      })();
      const kT = Fy(null, "core", []);
      let LT = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(So));
            }),
            (e.ɵmod = $t({ type: e })),
            (e.ɵinj = Et({})),
            e
          );
        })(),
        tc = null;
      function To() {
        return tc;
      }
      class ZT {}
      const dn = new M("DocumentToken");
      function dD(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class RN {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let pD = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new RN(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), gD(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              gD(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Rt), _(Kt), _(ws));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function gD(e, t) {
        e.context.$implicit = t.item;
      }
      let u1 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = $t({ type: e })),
          (e.ɵinj = Et({})),
          e
        );
      })();
      function _D(e) {
        return "server" === e;
      }
      class ED {}
      class R1 extends ZT {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Dc extends R1 {
        static makeCurrent() {
          !(function qT(e) {
            tc || (tc = e);
          })(new Dc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function k1() {
            return (
              (Oo = Oo || document.querySelector("base")),
              Oo ? Oo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function L1(e) {
                (ks = ks || document.createElement("a")),
                  ks.setAttribute("href", e);
                const t = ks.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Oo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return dD(document.cookie, t);
        }
      }
      let ks,
        Oo = null,
        H1 = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const vc = new M("EventManagerPlugins");
      let SD = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new C(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(vc), V(we));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class AD {
        constructor(t) {
          this._doc = t;
        }
      }
      const _c = "ng-app-id";
      let TD = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = _D(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${_c}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(_c), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(_c, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r);
            n.appendChild(o);
            const i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(dn), V(ji), V(Kh, 8), V(Tn));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Cc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ec = /%COMP%/g,
        U1 = new M("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function xD(e, t) {
        return t.map((n) => n.replace(Ec, e));
      }
      let FD = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, l = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = _D(a)),
              (this.defaultRenderer = new wc(n, s, u, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === Je.ShadowDom &&
              (r = { ...r, encapsulation: Je.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof PD
                ? o.applyToHost(n)
                : o instanceof bc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                l = this.sharedStylesHost,
                c = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case Je.Emulated:
                  i = new PD(u, l, r, this.appId, c, s, a, d);
                  break;
                case Je.ShadowDom:
                  return new q1(u, l, n, r, s, a, this.nonce, d);
                default:
                  i = new bc(u, l, r, c, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              V(SD),
              V(TD),
              V(ji),
              V(U1),
              V(dn),
              V(Tn),
              V(we),
              V(Kh)
            );
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class wc {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(Cc[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (OD(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (OD(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new C(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Cc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Cc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Ze.DashCase | Ze.Important)
            ? t.style.setProperty(n, r, o & Ze.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Ze.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = To().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function OD(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class q1 extends wc {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = xD(o.id, o.styles);
          for (const c of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class bc extends wc {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? xD(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class PD extends bc {
        constructor(t, n, r, o, i, s, a, u) {
          const l = o + "-" + r.id;
          super(t, n, r, i, s, a, u, l),
            (this.contentAttr = (function G1(e) {
              return "_ngcontent-%COMP%".replace(Ec, e);
            })(l)),
            (this.hostAttr = (function z1(e) {
              return "_nghost-%COMP%".replace(Ec, e);
            })(l));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let Z1 = (() => {
        class e extends AD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(dn));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const RD = ["alt", "control", "meta", "shift"],
        Y1 = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        X1 = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let K1 = (() => {
        class e extends AD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => To().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              RD.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = Y1[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                RD.forEach((s) => {
                  s !== o && (0, X1[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(dn));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const tx = Fy(kT, "browser", [
          { provide: Tn, useValue: "browser" },
          {
            provide: Xh,
            useValue: function Q1() {
              Dc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: dn,
            useFactory: function ex() {
              return (
                (function tw(e) {
                  pu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        nx = new M(""),
        VD = [
          {
            provide: vs,
            useClass: class V1 {
              addToWindow(t) {
                (J.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new C(5103, !1);
                  return i;
                }),
                  (J.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (J.getAllAngularRootElements = () => t.getAllRootElements()),
                  J.frameworkStabilizers || (J.frameworkStabilizers = []),
                  J.frameworkStabilizers.push((r) => {
                    const o = J.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? To().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Sy, useClass: Ul, deps: [we, Gl, vs] },
          { provide: Ul, useClass: Ul, deps: [we, Gl, vs] },
        ],
        HD = [
          { provide: Mu, useValue: "root" },
          {
            provide: xn,
            useFactory: function J1() {
              return new xn();
            },
            deps: [],
          },
          { provide: vc, useClass: Z1, multi: !0, deps: [dn, we, Tn] },
          { provide: vc, useClass: K1, multi: !0, deps: [dn] },
          FD,
          TD,
          SD,
          { provide: ip, useExisting: FD },
          { provide: ED, useClass: H1, deps: [] },
          [],
        ];
      let rx = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [{ provide: ji, useValue: n.appId }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(nx, 12));
          }),
          (e.ɵmod = $t({ type: e })),
          (e.ɵinj = Et({ providers: [...HD, ...VD], imports: [u1, LT] })),
          e
        );
      })();
      typeof window < "u" && window;
      const { isArray: cx } = Array,
        { getPrototypeOf: dx, prototype: fx, keys: hx } = Object;
      const { isArray: mx } = Array;
      function vx(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function _x(...e) {
        const t = (function s_(e) {
            return oe(da(e)) ? e.pop() : void 0;
          })(e),
          { args: n, keys: r } = (function px(e) {
            if (1 === e.length) {
              const t = e[0];
              if (cx(t)) return { args: t, keys: null };
              if (
                (function gx(e) {
                  return e && "object" == typeof e && dx(e) === fx;
                })(t)
              ) {
                const n = hx(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e),
          o = new Te((i) => {
            const { length: s } = n;
            if (!s) return void i.complete();
            const a = new Array(s);
            let u = s,
              l = s;
            for (let c = 0; c < s; c++) {
              let d = !1;
              Ct(n[c]).subscribe(
                Ht(
                  i,
                  (f) => {
                    d || ((d = !0), l--), (a[c] = f);
                  },
                  () => u--,
                  void 0,
                  () => {
                    (!u || !d) && (l || i.next(r ? vx(r, a) : a), i.complete());
                  }
                )
              );
            }
          });
        return t
          ? o.pipe(
              (function Dx(e) {
                return vn((t) =>
                  (function yx(e, t) {
                    return mx(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(t)
            )
          : o;
      }
      let UD = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Nn), _(pt));
            }),
            (e.ɵdir = P({ type: e })),
            e
          );
        })(),
        kn = (() => {
          class e extends UD {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (
                  t ||
                  (t = (function Oe(e) {
                    return Bt(() => {
                      const t = e.prototype.constructor,
                        n = t[jt] || za(t),
                        r = Object.prototype;
                      let o = Object.getPrototypeOf(e.prototype).constructor;
                      for (; o && o !== r; ) {
                        const i = o[jt] || za(o);
                        if (i && i !== n) return i;
                        o = Object.getPrototypeOf(o);
                      }
                      return (i) => new i();
                    });
                  })(e))
                )(r || e);
              };
            })()),
            (e.ɵdir = P({ type: e, features: [Q] })),
            e
          );
        })();
      const kt = new M("NgValueAccessor"),
        Ex = { provide: kt, useExisting: ee(() => Ls), multi: !0 },
        bx = new M("CompositionEventMode");
      let Ls = (() => {
        class e extends UD {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function wx() {
                  const e = To() ? To().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Nn), _(pt), _(bx, 8));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Se("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [ie([Ex]), Q],
          })),
          e
        );
      })();
      function hn(e) {
        return (
          null == e ||
          (("string" == typeof e || Array.isArray(e)) && 0 === e.length)
        );
      }
      function zD(e) {
        return null != e && "number" == typeof e.length;
      }
      const Le = new M("NgValidators"),
        pn = new M("NgAsyncValidators"),
        Mx =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Ic {
        static min(t) {
          return (function WD(e) {
            return (t) => {
              if (hn(t.value) || hn(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n < e
                ? { min: { min: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static max(t) {
          return (function qD(e) {
            return (t) => {
              if (hn(t.value) || hn(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n > e
                ? { max: { max: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static required(t) {
          return (function ZD(e) {
            return hn(e.value) ? { required: !0 } : null;
          })(t);
        }
        static requiredTrue(t) {
          return (function YD(e) {
            return !0 === e.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function XD(e) {
            return hn(e.value) || Mx.test(e.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function KD(e) {
            return (t) =>
              hn(t.value) || !zD(t.value)
                ? null
                : t.value.length < e
                ? {
                    minlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function QD(e) {
            return (t) =>
              zD(t.value) && t.value.length > e
                ? {
                    maxlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function JD(e) {
            if (!e) return Vs;
            let t, n;
            return (
              "string" == typeof e
                ? ((n = ""),
                  "^" !== e.charAt(0) && (n += "^"),
                  (n += e),
                  "$" !== e.charAt(e.length - 1) && (n += "$"),
                  (t = new RegExp(n)))
                : ((n = e.toString()), (t = e)),
              (r) => {
                if (hn(r.value)) return null;
                const o = r.value;
                return t.test(o)
                  ? null
                  : { pattern: { requiredPattern: n, actualValue: o } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return iv(t);
        }
        static composeAsync(t) {
          return sv(t);
        }
      }
      function Vs(e) {
        return null;
      }
      function ev(e) {
        return null != e;
      }
      function tv(e) {
        return ss(e) ? Yo(e) : e;
      }
      function nv(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function rv(e, t) {
        return t.map((n) => n(e));
      }
      function ov(e) {
        return e.map((t) =>
          (function Ix(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function iv(e) {
        if (!e) return null;
        const t = e.filter(ev);
        return 0 == t.length
          ? null
          : function (n) {
              return nv(rv(n, t));
            };
      }
      function Sc(e) {
        return null != e ? iv(ov(e)) : null;
      }
      function sv(e) {
        if (!e) return null;
        const t = e.filter(ev);
        return 0 == t.length
          ? null
          : function (n) {
              return _x(rv(n, t).map(tv)).pipe(vn(nv));
            };
      }
      function Ac(e) {
        return null != e ? sv(ov(e)) : null;
      }
      function av(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function uv(e) {
        return e._rawValidators;
      }
      function lv(e) {
        return e._rawAsyncValidators;
      }
      function Tc(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Hs(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function cv(e, t) {
        const n = Tc(t);
        return (
          Tc(e).forEach((o) => {
            Hs(n, o) || n.push(o);
          }),
          n
        );
      }
      function dv(e, t) {
        return Tc(t).filter((n) => !Hs(e, n));
      }
      class fv {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Sc(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Ac(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class $e extends fv {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class gn extends fv {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class hv {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let pv = (() => {
          class e extends hv {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(gn, 2));
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  us("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [Q],
            })),
            e
          );
        })(),
        gv = (() => {
          class e extends hv {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_($e, 10));
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  us("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [Q],
            })),
            e
          );
        })();
      const Po = "VALID",
        js = "INVALID",
        Sr = "PENDING",
        Ro = "DISABLED";
      function Fc(e) {
        return ($s(e) ? e.validators : e) || null;
      }
      function Oc(e, t) {
        return ($s(t) ? t.asyncValidators : e) || null;
      }
      function $s(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      function yv(e, t, n) {
        const r = e.controls;
        if (!(t ? Object.keys(r) : r).length) throw new C(1e3, "");
        if (!r[n]) throw new C(1001, "");
      }
      function Dv(e, t, n) {
        e._forEachChild((r, o) => {
          if (void 0 === n[o]) throw new C(1002, "");
        });
      }
      class Us {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Po;
        }
        get invalid() {
          return this.status === js;
        }
        get pending() {
          return this.status == Sr;
        }
        get disabled() {
          return this.status === Ro;
        }
        get enabled() {
          return this.status !== Ro;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(cv(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(cv(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(dv(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(dv(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Hs(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Hs(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Sr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Ro),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Po),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Po || this.status === Sr) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Ro : Po;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Sr), (this._hasOwnPendingAsyncValidator = !0);
            const n = tv(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new ke()), (this.statusChanges = new ke());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Ro
            : this.errors
            ? js
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Sr)
            ? Sr
            : this._anyControlsHaveStatus(js)
            ? js
            : Po;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          $s(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function Nx(e) {
              return Array.isArray(e) ? Sc(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function xx(e) {
              return Array.isArray(e) ? Ac(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class ko extends Us {
        constructor(t, n, r) {
          super(Fc(n), Oc(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          Dv(this, 0, t),
            Object.keys(t).forEach((r) => {
              yv(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      class vv extends ko {}
      const Ar = new M("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Gs,
        }),
        Gs = "always";
      function Lo(e, t, n = Gs) {
        Pc(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function Ox(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && _v(e, t);
            });
          })(e, t),
          (function Rx(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function Px(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && _v(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function Fx(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function Ws(e, t, n = !0) {
        const r = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(r),
          t.valueAccessor.registerOnTouched(r)),
          Zs(e, t),
          e &&
            (t._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}));
      }
      function qs(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function Pc(e, t) {
        const n = uv(e);
        null !== t.validator
          ? e.setValidators(av(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = lv(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(av(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        qs(t._rawValidators, o), qs(t._rawAsyncValidators, o);
      }
      function Zs(e, t) {
        let n = !1;
        if (null !== e) {
          if (null !== t.validator) {
            const o = uv(e);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== t.validator);
              i.length !== o.length && ((n = !0), e.setValidators(i));
            }
          }
          if (null !== t.asyncValidator) {
            const o = lv(e);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== t.asyncValidator);
              i.length !== o.length && ((n = !0), e.setAsyncValidators(i));
            }
          }
        }
        const r = () => {};
        return qs(t._rawValidators, r), qs(t._rawAsyncValidators, r), n;
      }
      function _v(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function wv(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function bv(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const Ho = class extends Us {
        constructor(t = null, n, r) {
          super(Fc(n), Oc(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            $s(n) &&
              (n.nonNullable || n.initialValueIsDefault) &&
              (this.defaultValue = bv(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          wv(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          wv(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          bv(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      let Tv = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        xv = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = $t({ type: e })),
            (e.ɵinj = Et({})),
            e
          );
        })();
      const Hc = new M("NgModelWithFormControlWarning"),
        Yx = { provide: $e, useExisting: ee(() => Ys) };
      let Ys = (() => {
        class e extends $e {
          constructor(n, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new ke()),
              this._setValidators(n),
              this._setAsyncValidators(r);
          }
          ngOnChanges(n) {
            this._checkFormPresent(),
              n.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (Zs(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(n) {
            const r = this.form.get(n.path);
            return (
              Lo(r, n, this.callSetDisabledState),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(n),
              r
            );
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            Ws(n.control || null, n, !1),
              (function Hx(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
              })(this.directives, n);
          }
          addFormGroup(n) {
            this._setUpFormContainer(n);
          }
          removeFormGroup(n) {
            this._cleanUpFormContainer(n);
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          addFormArray(n) {
            this._setUpFormContainer(n);
          }
          removeFormArray(n) {
            this._cleanUpFormContainer(n);
          }
          getFormArray(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            this.form.get(n.path).setValue(r);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function Ev(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n = void 0) {
            this.form.reset(n), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((n) => {
              const r = n.control,
                o = this.form.get(n.path);
              r !== o &&
                (Ws(r || null, n),
                ((e) => e instanceof Ho)(o) &&
                  (Lo(o, n, this.callSetDisabledState), (n.control = o)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(n) {
            const r = this.form.get(n.path);
            (function Cv(e, t) {
              Pc(e, t);
            })(r, n),
              r.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(n) {
            if (this.form) {
              const r = this.form.get(n.path);
              r &&
                (function kx(e, t) {
                  return Zs(e, t);
                })(r, n) &&
                r.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Pc(this.form, this), this._oldForm && Zs(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Le, 10), _(pn, 10), _(Ar, 8));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (n, r) {
              1 & n &&
                Se("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [ie([Yx]), Q, Gt],
          })),
          e
        );
      })();
      const Qx = { provide: gn, useExisting: ee(() => $c) };
      let $c = (() => {
          class e extends gn {
            set isDisabled(n) {}
            constructor(n, r, o, i, s) {
              super(),
                (this._ngModelWarningConfig = s),
                (this._added = !1),
                (this.name = null),
                (this.update = new ke()),
                (this._ngModelWarningSent = !1),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function Lc(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Ls
                        ? (n = i)
                        : (function Vx(e) {
                            return Object.getPrototypeOf(e.constructor) === kn;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              this._added || this._setUpControl(),
                (function kc(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            get path() {
              return (function zs(e, t) {
                return [...t.path, e];
              })(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                (this._added = !0);
            }
          }
          return (
            (e._ngModelWarningSentOnce = !1),
            (e.ɵfac = function (n) {
              return new (n || e)(
                _($e, 13),
                _(Le, 10),
                _(pn, 10),
                _(kt, 10),
                _(Hc, 8)
              );
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [["", "formControlName", ""]],
              inputs: {
                name: ["formControlName", "name"],
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
              },
              outputs: { update: "ngModelChange" },
              features: [ie([Qx]), Q, Gt],
            })),
            e
          );
        })(),
        hF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = $t({ type: e })),
            (e.ɵinj = Et({ imports: [xv] })),
            e
          );
        })();
      class qv extends Us {
        constructor(t, n, r) {
          super(Fc(n), Oc(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[this._adjustIndex(t)];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          let r = this._adjustIndex(t);
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          let o = this._adjustIndex(t);
          o < 0 && (o = 0),
            this.controls[o] &&
              this.controls[o]._registerOnCollectionChange(() => {}),
            this.controls.splice(o, 1),
            n && (this.controls.splice(o, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          Dv(this, 0, t),
            t.forEach((r, o) => {
              yv(this, !1, o),
                this.at(o).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, o) => {
              this.at(o) &&
                this.at(o).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => t.getRawValue());
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _adjustIndex(t) {
          return t < 0 ? t + this.length : t;
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(t) {
          return this.at(t) ?? null;
        }
      }
      function Zv(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        );
      }
      let pF = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1;
            }
            get nonNullable() {
              const n = new e();
              return (n.useNonNullable = !0), n;
            }
            group(n, r = null) {
              const o = this._reduceControls(n);
              let i = {};
              return (
                Zv(r)
                  ? (i = r)
                  : null !== r &&
                    ((i.validators = r.validator),
                    (i.asyncValidators = r.asyncValidator)),
                new ko(o, i)
              );
            }
            record(n, r = null) {
              const o = this._reduceControls(n);
              return new vv(o, r);
            }
            control(n, r, o) {
              let i = {};
              return this.useNonNullable
                ? (Zv(r)
                    ? (i = r)
                    : ((i.validators = r), (i.asyncValidators = o)),
                  new Ho(n, { ...i, nonNullable: !0 }))
                : new Ho(n, r, o);
            }
            array(n, r, o) {
              const i = n.map((s) => this._createControl(s));
              return new qv(i, r, o);
            }
            _reduceControls(n) {
              const r = {};
              return (
                Object.keys(n).forEach((o) => {
                  r[o] = this._createControl(n[o]);
                }),
                r
              );
            }
            _createControl(n) {
              return n instanceof Ho || n instanceof Us
                ? n
                : Array.isArray(n)
                ? this.control(
                    n[0],
                    n.length > 1 ? n[1] : null,
                    n.length > 2 ? n[2] : null
                  )
                : this.control(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        gF = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: Hc,
                    useValue: n.warnOnNgModelWithFormControl ?? "always",
                  },
                  { provide: Ar, useValue: n.callSetDisabledState ?? Gs },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = $t({ type: e })),
            (e.ɵinj = Et({ imports: [hF] })),
            e
          );
        })();
      function Yv(e) {
        return Vt((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      class Xs {}
      class Ks {}
      class Lt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((n) => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                          const o = n.slice(0, r),
                            i = o.toLowerCase(),
                            s = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(o, i),
                            this.headers.has(i)
                              ? this.headers.get(i).push(s)
                              : this.headers.set(i, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Lt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Lt();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Lt
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
            o = t.toLowerCase();
          this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class DF {
        encodeKey(t) {
          return Xv(t);
        }
        encodeValue(t) {
          return Xv(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const _F = /%(\d[a-f0-9])/gi,
        CF = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Xv(e) {
        return encodeURIComponent(e).replace(_F, (t, n) => CF[n] ?? t);
      }
      function Qs(e) {
        return `${e}`;
      }
      class mn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new DF()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function vF(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        u = n.get(s) || [];
                      u.push(a), n.set(s, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(Qs) : [Qs(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new mn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Qs(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(Qs(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class EF {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function Kv(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function Qv(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function Jv(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Bo {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function wF(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Lt()),
            this.context || (this.context = new EF()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new mn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Kv(this.body) ||
              Qv(this.body) ||
              Jv(this.body) ||
              (function bF(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof mn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Jv(this.body)
            ? null
            : Qv(this.body)
            ? this.body.type || null
            : Kv(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof mn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let u = t.headers || this.headers,
            l = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (u = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                u
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                l
              )),
            new Bo(n, r, i, {
              params: l,
              headers: u,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var De = (() => (
        ((De = De || {})[(De.Sent = 0)] = "Sent"),
        (De[(De.UploadProgress = 1)] = "UploadProgress"),
        (De[(De.ResponseHeader = 2)] = "ResponseHeader"),
        (De[(De.DownloadProgress = 3)] = "DownloadProgress"),
        (De[(De.Response = 4)] = "Response"),
        (De[(De.User = 5)] = "User"),
        De
      ))();
      class Wc {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Lt()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class qc extends Wc {
        constructor(t = {}) {
          super(t), (this.type = De.ResponseHeader);
        }
        clone(t = {}) {
          return new qc({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Tr extends Wc {
        constructor(t = {}) {
          super(t),
            (this.type = De.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Tr({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class e0 extends Wc {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Zc(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let t0 = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof Bo) i = n;
            else {
              let u, l;
              (u = o.headers instanceof Lt ? o.headers : new Lt(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof mn
                      ? o.params
                      : new mn({ fromObject: o.params })),
                (i = new Bo(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = fa(i).pipe(
              (function mF(e, t) {
                return oe(t) ? Zo(e, t, 1) : Zo(e, 1);
              })((u) => this.handler.handle(u))
            );
            if (n instanceof Bo || "events" === o.observe) return s;
            const a = s.pipe(
              (function yF(e, t) {
                return Vt((n, r) => {
                  let o = 0;
                  n.subscribe(Ht(r, (i) => e.call(t, i, o++) && r.next(i)));
                });
              })((u) => u instanceof Tr)
            );
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      vn((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      vn((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      vn((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(vn((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new mn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Zc(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Zc(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Zc(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Xs));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function o0(e, t) {
        return t(e);
      }
      function IF(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const AF = new M(""),
        jo = new M(""),
        s0 = new M("");
      function TF() {
        let e = null;
        return (t, n) => {
          null === e &&
            (e = (Z(AF, { optional: !0 }) ?? []).reduceRight(IF, o0));
          const r = Z(Bl),
            o = r.add();
          return e(t, n).pipe(Yv(() => r.remove(o)));
        };
      }
      let a0 = (() => {
        class e extends Xs {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null),
              (this.pendingTasks = Z(Bl));
          }
          handle(n) {
            if (null === this.chain) {
              const o = Array.from(
                new Set([
                  ...this.injector.get(jo),
                  ...this.injector.get(s0, []),
                ])
              );
              this.chain = o.reduceRight(
                (i, s) =>
                  (function SF(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(i, s, this.injector),
                o0
              );
            }
            const r = this.pendingTasks.add();
            return this.chain(n, (o) => this.backend.handle(o)).pipe(
              Yv(() => this.pendingTasks.remove(r))
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Ks), V(An));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const OF = /^\)\]\}',?\n/;
      let l0 = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method) throw new C(-2800, !1);
            const r = this.xhrFactory;
            return (r.ɵloadImpl ? Yo(r.ɵloadImpl()) : fa(null)).pipe(
              Md(
                () =>
                  new Te((i) => {
                    const s = r.build();
                    if (
                      (s.open(n.method, n.urlWithParams),
                      n.withCredentials && (s.withCredentials = !0),
                      n.headers.forEach((g, y) =>
                        s.setRequestHeader(g, y.join(","))
                      ),
                      n.headers.has("Accept") ||
                        s.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !n.headers.has("Content-Type"))
                    ) {
                      const g = n.detectContentTypeHeader();
                      null !== g && s.setRequestHeader("Content-Type", g);
                    }
                    if (n.responseType) {
                      const g = n.responseType.toLowerCase();
                      s.responseType = "json" !== g ? g : "text";
                    }
                    const a = n.serializeBody();
                    let u = null;
                    const l = () => {
                        if (null !== u) return u;
                        const g = s.statusText || "OK",
                          y = new Lt(s.getAllResponseHeaders()),
                          v =
                            (function PF(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(s) || n.url;
                        return (
                          (u = new qc({
                            headers: y,
                            status: s.status,
                            statusText: g,
                            url: v,
                          })),
                          u
                        );
                      },
                      c = () => {
                        let {
                            headers: g,
                            status: y,
                            statusText: v,
                            url: m,
                          } = l(),
                          b = null;
                        204 !== y &&
                          (b =
                            typeof s.response > "u"
                              ? s.responseText
                              : s.response),
                          0 === y && (y = b ? 200 : 0);
                        let S = y >= 200 && y < 300;
                        if ("json" === n.responseType && "string" == typeof b) {
                          const F = b;
                          b = b.replace(OF, "");
                          try {
                            b = "" !== b ? JSON.parse(b) : null;
                          } catch (Me) {
                            (b = F),
                              S && ((S = !1), (b = { error: Me, text: b }));
                          }
                        }
                        S
                          ? (i.next(
                              new Tr({
                                body: b,
                                headers: g,
                                status: y,
                                statusText: v,
                                url: m || void 0,
                              })
                            ),
                            i.complete())
                          : i.error(
                              new e0({
                                error: b,
                                headers: g,
                                status: y,
                                statusText: v,
                                url: m || void 0,
                              })
                            );
                      },
                      d = (g) => {
                        const { url: y } = l(),
                          v = new e0({
                            error: g,
                            status: s.status || 0,
                            statusText: s.statusText || "Unknown Error",
                            url: y || void 0,
                          });
                        i.error(v);
                      };
                    let f = !1;
                    const h = (g) => {
                        f || (i.next(l()), (f = !0));
                        let y = { type: De.DownloadProgress, loaded: g.loaded };
                        g.lengthComputable && (y.total = g.total),
                          "text" === n.responseType &&
                            s.responseText &&
                            (y.partialText = s.responseText),
                          i.next(y);
                      },
                      p = (g) => {
                        let y = { type: De.UploadProgress, loaded: g.loaded };
                        g.lengthComputable && (y.total = g.total), i.next(y);
                      };
                    return (
                      s.addEventListener("load", c),
                      s.addEventListener("error", d),
                      s.addEventListener("timeout", d),
                      s.addEventListener("abort", d),
                      n.reportProgress &&
                        (s.addEventListener("progress", h),
                        null !== a &&
                          s.upload &&
                          s.upload.addEventListener("progress", p)),
                      s.send(a),
                      i.next({ type: De.Sent }),
                      () => {
                        s.removeEventListener("error", d),
                          s.removeEventListener("abort", d),
                          s.removeEventListener("load", c),
                          s.removeEventListener("timeout", d),
                          n.reportProgress &&
                            (s.removeEventListener("progress", h),
                            null !== a &&
                              s.upload &&
                              s.upload.removeEventListener("progress", p)),
                          s.readyState !== s.DONE && s.abort();
                      }
                    );
                  })
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(ED));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Yc = new M("XSRF_ENABLED"),
        c0 = new M("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        d0 = new M("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class f0 {}
      let LF = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = dD(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(dn), V(Tn), V(c0));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function VF(e, t) {
        const n = e.url.toLowerCase();
        if (
          !Z(Yc) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = Z(f0).getToken(),
          o = Z(d0);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var se = (() => (
        ((se = se || {})[(se.Interceptors = 0)] = "Interceptors"),
        (se[(se.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (se[(se.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (se[(se.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (se[(se.JsonpSupport = 4)] = "JsonpSupport"),
        (se[(se.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        (se[(se.Fetch = 6)] = "Fetch"),
        se
      ))();
      function Vn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function HF(...e) {
        const t = [
          t0,
          l0,
          a0,
          { provide: Xs, useExisting: a0 },
          { provide: Ks, useExisting: l0 },
          { provide: jo, useValue: VF, multi: !0 },
          { provide: Yc, useValue: !0 },
          { provide: f0, useClass: LF },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function Cu(e) {
          return { ɵproviders: e };
        })(t);
      }
      const h0 = new M("LEGACY_INTERCEPTOR_FN");
      let jF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = $t({ type: e })),
            (e.ɵinj = Et({
              providers: [
                HF(
                  Vn(se.LegacyInterceptors, [
                    { provide: h0, useFactory: TF },
                    { provide: jo, useExisting: h0, multi: !0 },
                  ])
                ),
              ],
            })),
            e
          );
        })(),
        qF = (() => {
          class e {
            constructor(n) {
              this.http = n;
            }
            sendOrder(n) {
              return this.http.post("https://testologia.site/burgers-order", n);
            }
            getData() {
              return this.http.get(
                "https://testologia.site/burgers-data?extra=black"
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(t0));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function ZF(e, t) {
        if (1 & e) {
          const n = ul();
          H(0, "div", 47)(1, "div", 48),
            Xe(2, "img", 49),
            $(),
            H(3, "div", 50),
            te(4),
            $(),
            H(5, "div", 51),
            te(6),
            $(),
            H(7, "div", 52)(8, "div", 53)(9, "div", 54),
            te(10),
            $(),
            H(11, "div", 55),
            te(12),
            $()(),
            H(13, "div", 56)(14, "button", 57),
            Se("click", function () {
              const i = qn(n).$implicit,
                s = ll(),
                a = _r(63);
              return Zn(s.scrollTo(a, i));
            }),
            H(15, "span"),
            te(16, "\u0437\u0430\u043a\u0430\u0437\u0430\u0442\u044c"),
            $(),
            H(17, "span"),
            (function Tf() {
              T.lFrame.currentNamespace = cf;
            })(),
            H(18, "svg", 58),
            Xe(19, "path", 59),
            $()()()()()();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = ll();
          ot(2),
            cl("src", n.image, _u),
            ot(2),
            ds(n.title),
            ot(2),
            Do("", n.text, " "),
            ot(4),
            ml("", n.price, " ", r.currency, ""),
            ot(2),
            Do("", n.grams, " \u0433\u0440");
        }
      }
      const Xc = function (e) {
        return { error: e };
      };
      let YF = (() => {
          class e {
            constructor(n, r) {
              (this.fb = n),
                (this.appService = r),
                (this.currency = "$"),
                (this.form = this.fb.group({
                  order: [" ", Ic.required],
                  name: [" ", Ic.required],
                  phone: [" ", Ic.required],
                }));
            }
            ngOnInit() {
              this.appService
                .getData()
                .subscribe((n) => (this.productsData = n));
            }
            scrollTo(n, r) {
              n.scrollIntoView({ behavior: "smooth" }),
                r &&
                  this.form.patchValue({
                    order: r.title + " (" + r.price + " " + this.currency + ")",
                  });
            }
            confirmOrder() {
              this.form.valid &&
                this.appService.sendOrder(this.form.value).subscribe({
                  next: (n) => {
                    alert(n.message), this.form.reset();
                  },
                  error: (n) => {
                    alert(n.error.message);
                  },
                });
            }
            changeCurrency() {
              let n = "$",
                r = 1;
              "$" === this.currency
                ? ((n = "\u20bd"), (r = 80))
                : "\u20bd" === this.currency
                ? ((n = "BYN"), (r = 3))
                : "BYN" === this.currency
                ? ((n = "\u20ac"), (r = 0.9))
                : "\u20ac" === this.currency && ((n = "\xa5"), (r = 6.9)),
                (this.currency = n),
                this.productsData.forEach((o) => {
                  o.price = (o.basePrice * r).toFixed(1);
                });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(pF), _(qF));
            }),
            (e.ɵcmp = Gd({
              type: e,
              selectors: [["app-root"]],
              decls: 86,
              vars: 16,
              consts: [
                [1, "main"],
                [1, "header"],
                [1, "container"],
                [1, "logo"],
                [
                  "src",
                  "../assets/images/Logo.png",
                  "alt",
                  "\u041b\u043e\u0433\u043e",
                ],
                [1, "menu"],
                [1, "menu-list"],
                [1, "menu-item"],
                [3, "click"],
                [
                  "title",
                  "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0432\u0430\u043b\u044e\u0442\u0443",
                  "id",
                  "change-currency",
                  1,
                  "currency",
                  3,
                  "click",
                ],
                [1, "main-content"],
                [1, "main-info"],
                [1, "main-small-info"],
                [1, "main-title"],
                [1, "main-text"],
                [1, "main-action"],
                ["id", "main-action-button", 1, "button", 3, "click"],
                [
                  "src",
                  "../assets/images/main_burger.png",
                  "alt",
                  "Big burger",
                  1,
                  "main-image",
                ],
                ["id", "why", 1, "why"],
                ["why", ""],
                [1, "why-title", "common-title"],
                [1, "why-items"],
                [1, "why-item"],
                [
                  "src",
                  "../assets/images/burger.png",
                  "alt",
                  "burger",
                  1,
                  "why-item-image",
                ],
                [1, "why-item-title"],
                [1, "why-item-text"],
                [
                  "src",
                  "../assets/images/meat.png",
                  "alt",
                  "meat",
                  1,
                  "why-item-image",
                ],
                [
                  "src",
                  "../assets/images/food truck.png",
                  "alt",
                  "food-truck",
                  1,
                  "why-item-image",
                ],
                ["id", "products", 1, "products"],
                ["products", ""],
                [1, "products-title", "common-title"],
                [1, "products-items"],
                ["class", "products-item", 4, "ngFor", "ngForOf"],
                ["id", "order", 1, "order"],
                ["order", ""],
                [1, "order-title", "common-title"],
                [
                  "src",
                  "../assets/images/order_image.png",
                  "alt",
                  "Burger in the box",
                  1,
                  "order-image",
                ],
                [1, "order-form"],
                [1, "order-form-text"],
                [1, "order-form-inputs", 3, "formGroup"],
                [1, "order-form-input"],
                [
                  "type",
                  "text",
                  "id",
                  "burger",
                  "placeholder",
                  "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u043e\u0432\u0430\u0440 \u0432 \u0441\u043f\u0438\u0441\u043a\u0435",
                  "formControlName",
                  "order",
                  "readonly",
                  "",
                ],
                [
                  "type",
                  "text",
                  "id",
                  "name",
                  "placeholder",
                  "\u0412\u0430\u0448\u0435 \u0438\u043c\u044f",
                  "formControlName",
                  "name",
                ],
                [
                  "type",
                  "tel",
                  "id",
                  "phone",
                  "placeholder",
                  "\u0412\u0430\u0448 \u0442\u0435\u043b\u0435\u0444\u043e\u043d",
                  "formControlName",
                  "phone",
                ],
                [
                  "type",
                  "submit",
                  "id",
                  "order-action",
                  1,
                  "button",
                  3,
                  "disabled",
                  "click",
                ],
                [1, "footer"],
                [1, "rights"],
                [1, "products-item"],
                [1, "products-item-image"],
                ["alt", "burger", 3, "src"],
                [1, "products-item-title"],
                [1, "products-item-text"],
                [1, "products-item-extra"],
                [1, "products-items-info"],
                [1, "products-item-price"],
                [1, "products-item-weight"],
                [1, "products-item-action"],
                [1, "button", "product-button", 3, "click"],
                [
                  "width",
                  "24",
                  "height",
                  "25",
                  "viewBox",
                  "0 0 24 25",
                  "fill",
                  "none",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                ],
                [
                  "d",
                  "M17 18.5C17.5304 18.5 18.0391 18.7107 18.4142 19.0858C18.7893 19.4609 19 19.9696 19 20.5C19 21.0304 18.7893 21.5391 18.4142 21.9142C18.0391 22.2893 17.5304 22.5 17 22.5C16.4696 22.5 15.9609 22.2893 15.5858 21.9142C15.2107 21.5391 15 21.0304 15 20.5C15 19.39 15.89 18.5 17 18.5ZM1 2.5H4.27L5.21 4.5H20C20.2652 4.5 20.5196 4.60536 20.7071 4.79289C20.8946 4.98043 21 5.23478 21 5.5C21 5.67 20.95 5.84 20.88 6L17.3 12.47C16.96 13.08 16.3 13.5 15.55 13.5H8.1L7.2 15.13L7.17 15.25C7.17 15.3163 7.19634 15.3799 7.24322 15.4268C7.29011 15.4737 7.3537 15.5 7.42 15.5H19V17.5H7C6.46957 17.5 5.96086 17.2893 5.58579 16.9142C5.21071 16.5391 5 16.0304 5 15.5C5 15.15 5.09 14.82 5.24 14.54L6.6 12.09L3 4.5H1V2.5ZM7 18.5C7.53043 18.5 8.03914 18.7107 8.41421 19.0858C8.78929 19.4609 9 19.9696 9 20.5C9 21.0304 8.78929 21.5391 8.41421 21.9142C8.03914 22.2893 7.53043 22.5 7 22.5C6.46957 22.5 5.96086 22.2893 5.58579 21.9142C5.21071 21.5391 5 21.0304 5 20.5C5 19.39 5.89 18.5 7 18.5ZM16 11.5L18.78 6.5H6.14L8.5 11.5H16Z",
                  "fill",
                  "#191411",
                ],
              ],
              template: function (n, r) {
                if (1 & n) {
                  const o = ul();
                  H(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3),
                    Xe(4, "img", 4),
                    $(),
                    H(5, "nav", 5)(6, "ul", 6)(7, "li", 7)(8, "a", 8),
                    Se("click", function () {
                      qn(o);
                      const s = _r(32);
                      return Zn(r.scrollTo(s));
                    }),
                    te(
                      9,
                      "\u041f\u043e\u0447\u0435\u043c\u0443 \u0443 \u043d\u0430\u0441"
                    ),
                    $()(),
                    H(10, "li", 7)(11, "a", 8),
                    Se("click", function () {
                      qn(o);
                      const s = _r(56);
                      return Zn(r.scrollTo(s));
                    }),
                    te(
                      12,
                      "\u041c\u0435\u043d\u044e \u0431\u0443\u0440\u0433\u0435\u0440\u043e\u0432"
                    ),
                    $()(),
                    H(13, "li", 7)(14, "a", 8),
                    Se("click", function () {
                      qn(o);
                      const s = _r(63);
                      return Zn(r.scrollTo(s));
                    }),
                    te(
                      15,
                      "\u041e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430"
                    ),
                    $()()()(),
                    H(16, "div", 9),
                    Se("click", function () {
                      return r.changeCurrency();
                    }),
                    te(17),
                    $()()(),
                    H(18, "section", 10)(19, "div", 2)(20, "div", 11)(
                      21,
                      "span",
                      12
                    ),
                    te(
                      22,
                      "\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u043d\u044e"
                    ),
                    $(),
                    H(23, "h1", 13),
                    te(
                      24,
                      "\u0431\u0443\u0440\u0433\u0435\u0440 \u0447\u0435\u0434\u0434\u0435\u0440"
                    ),
                    $(),
                    H(25, "p", 14),
                    te(
                      26,
                      "\u041c\u044b \u043e\u0431\u043d\u043e\u0432\u0438\u043b\u0438 \u043d\u0430\u0448\u0435 \u043c\u0435\u043d\u044e, \u0441\u043f\u0435\u0448\u0438\u0442\u0435 \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0441\u0435\u0437\u043e\u043d\u043d\u044b\u0435 \u043d\u043e\u0432\u0438\u043d\u043a\u0438 \u0438 \u043d\u0430\u0441\u043b\u0430\u0434\u0438\u0442\u044c\u0441\u044f \u043e\u0442\u043b\u0438\u0447\u043d\u044b\u043c \u0432\u043a\u0443\u0441\u043e\u043c \u043d\u0430\u0448\u0438\u0445 \u0431\u0443\u0440\u0433\u0435\u0440\u043e\u0432. \u0413\u043e\u0442\u043e\u0432\u0438\u043c \u0434\u043b\u044f \u0432\u0430\u0441 \u043b\u0443\u0447\u0448\u0438\u0435 \u0431\u0443\u0440\u0433\u0435\u0440\u044b \u0432 \u0433\u043e\u0440\u043e\u0434\u0435 \u0438\u0437 \u043e\u0442\u0431\u043e\u0440\u043d\u043e\u0439 \u043c\u0440\u0430\u043c\u043e\u0440\u043d\u043e\u0439 \u0433\u043e\u0432\u044f\u0434\u0438\u043d\u044b. "
                    ),
                    $(),
                    H(27, "div", 15)(28, "button", 16),
                    Se("click", function () {
                      qn(o);
                      const s = _r(56);
                      return Zn(r.scrollTo(s));
                    }),
                    te(
                      29,
                      "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043c\u0435\u043d\u044e"
                    ),
                    $()()(),
                    Xe(30, "img", 17),
                    $()()(),
                    H(31, "section", 18, 19)(33, "div", 2)(34, "div", 20),
                    te(
                      35,
                      "\u043f\u043e\u0447\u0435\u043c\u0443 \u043d\u0430\u0441 \u0432\u044b\u0431\u0438\u0440\u0430\u044e\u0442?"
                    ),
                    $(),
                    H(36, "div", 21)(37, "div", 22),
                    Xe(38, "img", 23),
                    H(39, "div", 24),
                    te(
                      40,
                      "\u0410\u0432\u0442\u043e\u0440\u0441\u043a\u0438\u0435 \u0440\u0435\u0446\u0435\u043f\u0442\u044b"
                    ),
                    $(),
                    H(41, "div", 25),
                    te(
                      42,
                      "\u041d\u0430\u0448\u0438 \u0431\u0443\u0440\u0433\u0435\u0440\u044b \u043e\u0431\u043b\u0430\u0434\u0430\u044e\u0442 \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u043c \u0441\u043e\u0447\u0435\u0442\u0430\u043d\u0438\u0435\u043c \u0432\u043a\u0443\u0441\u043e\u0432 \u0438\xa0\u043d\u0435\xa0\u043f\u043e\u0445\u043e\u0436\u0438 \u043d\u0438\xa0\u043d\u0430\xa0\u043a\u0430\u043a\u0438\u0435 \u0434\u0440\u0443\u0433\u0438\u0435. \u041c\u044b\xa0\u0442\u0449\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u043e\u0442\u0431\u0438\u0440\u0430\u0435\u043c \u043b\u0443\u0447\u0448\u0438\u0435 \u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u044b \u0438\xa0\u0441\u043e\u0447\u0435\u0442\u0430\u043d\u0438\u044f \u0432\u043a\u0443\u0441\u043e\u0432 \u0434\u043b\u044f \u043d\u0430\u0448\u0435\u0433\u043e \u043c\u0435\u043d\u044e. "
                    ),
                    $()(),
                    H(43, "div", 22),
                    Xe(44, "img", 26),
                    H(45, "div", 24),
                    te(
                      46,
                      "\u041c\u0440\u0430\u043c\u043e\u0440\u043d\u0430\u044f \u0433\u043e\u0432\u044f\u0434\u0438\u043d\u0430"
                    ),
                    $(),
                    H(47, "div", 25),
                    te(
                      48,
                      "\u0414\u043b\u044f \u043d\u0430\u0448\u0438\u0445 \u0431\u0443\u0440\u0433\u0435\u0440\u043e\u0432 \u043c\u044b\xa0\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u043e\u0442\u0431\u043e\u0440\u043d\u0443\u044e 100% \u043c\u0440\u0430\u043c\u043e\u0440\u043d\u0443\u044e \u0433\u043e\u0432\u044f\u0434\u0438\u043d\u0443, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0437\u0430\u043a\u0443\u043f\u0430\u0435\u043c \u0438\u0441\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0443\xa0\u0444\u0435\u0440\u043c\u0435\u0440\u043e\u0432. \u041c\u044b\xa0\u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0432\xa0\u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043d\u0430\u0448\u0435\u0433\u043e \u043c\u044f\u0441\u0430. "
                    ),
                    $()(),
                    H(49, "div", 22),
                    Xe(50, "img", 27),
                    H(51, "div", 24),
                    te(
                      52,
                      "\u0411\u044b\u0441\u0442\u0440\u0430\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"
                    ),
                    $(),
                    H(53, "div", 25),
                    te(
                      54,
                      "\u041c\u044b\xa0\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u043c \u0432\xa0\u043f\u0440\u0435\u0434\u0435\u043b\u0430\u0445 \u041c\u041a\u0410\u0414 \u0437\u0430\xa030\xa0\u043c\u0438\u043d\u0443\u0442, \u0430\xa0\u0435\u0441\u043b\u0438 \u043d\u0435\xa0\u0443\u0441\u043f\u0435\u0435\u043c\xa0\u2014 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e. \u041c\u044b\xa0\u0442\u0449\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0443\u043f\u0430\u043a\u043e\u0432\u044b\u0432\u0430\u0435\u043c \u043d\u0430\u0448\u0438 \u0431\u0443\u0440\u0433\u0435\u0440\u044b, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\xa0\u0434\u043e\u0440\u043e\u0433\u0435 \u043e\u043d\u0438 \u043d\u0435\xa0\u043e\u0441\u0442\u044b\u043b\u0438. "
                    ),
                    $()()()()(),
                    H(55, "section", 28, 29)(57, "div", 2)(58, "div", 30),
                    te(
                      59,
                      "\u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0432\u043e\u0439 \u0431\u0443\u0440\u0433\u0435\u0440"
                    ),
                    $(),
                    H(60, "div", 31),
                    (function sg(e, t, n, r, o, i, s, a) {
                      const u = D(),
                        l = G(),
                        c = e + j,
                        d = l.firstCreatePass
                          ? (function NM(e, t, n, r, o, i, s, a, u) {
                              const l = t.consts,
                                c = cr(t, e, 4, s || null, on(l, a));
                              qu(t, n, c, on(l, u)), pi(t, c);
                              const d = (c.tView = Wu(
                                2,
                                c,
                                r,
                                o,
                                i,
                                t.directiveRegistry,
                                t.pipeRegistry,
                                null,
                                t.schemas,
                                l,
                                null
                              ));
                              return (
                                null !== t.queries &&
                                  (t.queries.template(t, c),
                                  (d.queries = t.queries.embeddedTView(c))),
                                c
                              );
                            })(c, l, u, t, n, r, o, i, s)
                          : l.data[c];
                      Tt(d, !1);
                      const f = ag(l, u, d, e);
                      hi() && Oi(l, u, f, d),
                        Pe(f, u),
                        Ki(u, (u[c] = xp(f, u, f, d))),
                        ui(d) && Gu(l, u, d),
                        null != s && zu(u, d, a);
                    })(61, ZF, 20, 6, "div", 32),
                    $()()(),
                    H(62, "section", 33, 34)(64, "div", 2)(65, "div", 35),
                    te(
                      66,
                      "\u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430"
                    ),
                    $(),
                    Xe(67, "img", 36),
                    H(68, "div", 37)(69, "div", 38),
                    te(
                      70,
                      "\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0438 \u043d\u0430\u0448 \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044f\u0436\u0435\u0442\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u0434\u043b\u044f \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u0430 "
                    ),
                    $(),
                    H(71, "form", 39)(72, "div", 40),
                    Xe(73, "input", 41),
                    $(),
                    H(74, "div", 40),
                    Xe(75, "input", 42),
                    $(),
                    H(76, "div", 40),
                    Xe(77, "input", 43),
                    $(),
                    H(78, "button", 44),
                    Se("click", function () {
                      return r.confirmOrder();
                    }),
                    te(
                      79,
                      "\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437"
                    ),
                    $()()()()(),
                    H(80, "footer", 45)(81, "div", 2)(82, "div", 3),
                    Xe(83, "img", 4),
                    $(),
                    H(84, "div", 46),
                    te(
                      85,
                      "\u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b"
                    ),
                    $()()();
                }
                if (2 & n) {
                  let o, i, s;
                  ot(17),
                    ds(r.currency),
                    ot(44),
                    mo("ngForOf", r.productsData),
                    ot(10),
                    mo("formGroup", r.form),
                    ot(1),
                    ls(
                      ms(
                        10,
                        Xc,
                        (null == (o = r.form.get("order"))
                          ? null
                          : o.invalid) &&
                          ((null == (o = r.form.get("order"))
                            ? null
                            : o.dirty) ||
                            (null == (o = r.form.get("order"))
                              ? null
                              : o.touched))
                      )
                    ),
                    ot(2),
                    ls(
                      ms(
                        12,
                        Xc,
                        (null == (i = r.form.get("name")) ? null : i.invalid) &&
                          ((null == (i = r.form.get("name"))
                            ? null
                            : i.dirty) ||
                            (null == (i = r.form.get("name"))
                              ? null
                              : i.touched))
                      )
                    ),
                    ot(2),
                    ls(
                      ms(
                        14,
                        Xc,
                        (null == (s = r.form.get("phone"))
                          ? null
                          : s.invalid) &&
                          ((null == (s = r.form.get("phone"))
                            ? null
                            : s.dirty) ||
                            (null == (s = r.form.get("phone"))
                              ? null
                              : s.touched))
                      )
                    ),
                    ot(2),
                    mo("disabled", !r.form.valid);
                }
              },
              dependencies: [pD, Tv, Ls, pv, gv, Ys, $c],
              styles: [
                ".main[_ngcontent-%COMP%]{overflow:hidden;background-image:url(../assets/images/main_bg.36be48cda06748a1.png);background-position:center top;background-repeat:no-repeat;background-size:cover}.header[_ngcontent-%COMP%]{padding:40px 0}.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{vertical-align:bottom}.menu[_ngcontent-%COMP%]{margin-left:191px}.menu-list[_ngcontent-%COMP%]{list-style:none;display:flex}.menu-item[_ngcontent-%COMP%]{margin-right:88px}.menu-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:18px;color:#fff;text-decoration:none;cursor:pointer}.menu-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{border-bottom:2px solid white}.currency[_ngcontent-%COMP%]{width:45px;height:45px;margin-left:auto;border:1px solid #ffff;border-radius:5px;padding:6px;box-sizing:border-box;text-align:center;cursor:pointer;line-height:32px;-webkit-user-select:none;user-select:none}.main-content[_ngcontent-%COMP%]{padding-top:103px;padding-bottom:199px}.main-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{position:relative}.main-info[_ngcontent-%COMP%]{max-width:608px}.main-small-info[_ngcontent-%COMP%]{border-radius:100px;background-color:#d3320f;padding:12px 16px;display:inline-block;font-size:18px}.main-title[_ngcontent-%COMP%]{font-family:Merriweather,sans-serif;font-size:120px;line-height:130%;letter-spacing:4px;text-transform:uppercase;margin-bottom:56px}.main-text[_ngcontent-%COMP%]{font-size:24px;line-height:29px;margin-bottom:56px}.main-image[_ngcontent-%COMP%]{position:absolute;top:-123px;left:calc(100% - 991px)}.why[_ngcontent-%COMP%]{background-image:url(whybg.70b3245035cdacf5.png);background-position:top center;background-size:cover;padding-bottom:180px}.why-items[_ngcontent-%COMP%]{margin-top:60px;display:grid;grid-gap:100px;grid-template-columns:repeat(3,312px);justify-content:center}.why-item[_ngcontent-%COMP%]{text-align:center}.why-item-title[_ngcontent-%COMP%]{font-size:24px;font-style:normal;line-height:normal;padding:24px 0}.why-item-text[_ngcontent-%COMP%]{font-size:16px;line-height:140%}.products[_ngcontent-%COMP%]{background-image:url(../assets/images/burgers_bg.887e5c52cefb8d00.png);background-position:top center;background-size:1400px;background-repeat:no-repeat;padding-bottom:180px}.products-items[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,384px);gap:24px;margin-top:60px}.products-item[_ngcontent-%COMP%]{padding:30px;border-radius:16px;border:1px solid #353535;background:#211A16}.products-item-image[_ngcontent-%COMP%]{height:250px}.products-item-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}.products-item-title[_ngcontent-%COMP%]{font-size:24px;line-height:29px;padding:24px 0}.products-item-text[_ngcontent-%COMP%]{font-size:16px;line-height:140%;margin-bottom:24px}.products-item-extra[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.products-item-price[_ngcontent-%COMP%]{font-size:32px;line-height:39px;margin-bottom:8px}.products-item-weight[_ngcontent-%COMP%]{color:#757575;font-size:16px;line-height:18px}.button.product-button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:182px;height:62px}.button.product-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{margin-right:10px}.order[_ngcontent-%COMP%]{background-image:url(../assets/images/order_bg.05da265a514e2567.png);background-position:top center;background-repeat:no-repeat;padding-bottom:180px;overflow:hidden}.order[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{position:relative}.order-image[_ngcontent-%COMP%]{position:absolute;top:0;right:calc(100% - 764px);z-index:-1}.order-form[_ngcontent-%COMP%]{max-width:426px;box-sizing:border-box;margin-top:60px;margin-left:674px;padding:60px 40px;border-radius:16px;border:1px solid #353535;background:#211A16}.order-form-text[_ngcontent-%COMP%]{text-align:center;font-size:24px;line-height:29px}.order-form-inputs[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:40px}.order-form-input[_ngcontent-%COMP%]{background:linear-gradient(95.61deg,#DA8023 0%,#E2B438 100%);width:344px;height:62px;border-radius:8px;margin-bottom:20px;display:flex;align-items:center;justify-content:center}.order-form-input.error[_ngcontent-%COMP%]{background:red}.order-form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:20px 10px;background:#211A16;border-radius:8px;border:1px solid transparent;width:342px;height:60px;box-sizing:border-box;outline:none;color:#fff}.order-form-inputs[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{width:344px;height:60px}.footer[_ngcontent-%COMP%]{padding:60px 0}.footer[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.rights[_ngcontent-%COMP%]{font-size:16px;line-height:20px}",
              ],
            })),
            e
          );
        })(),
        XF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = $t({ type: e, bootstrap: [YF] })),
            (e.ɵinj = Et({ imports: [rx, gF, jF] })),
            e
          );
        })();
      tx()
        .bootstrapModule(XF)
        .catch((e) => console.error(e));
    },
  },
  (oe) => {
    oe((oe.s = 497));
  },
]);
