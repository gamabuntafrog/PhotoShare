'use strict'
;(self.webpackChunkphoto_share = self.webpackChunkphoto_share || []).push([
  [930],
  {
    930: function (e, r, n) {
      n.r(r),
        n.d(r, {
          default: function () {
            return k
          }
        })
      var t,
        o = n(1413),
        a = n(9439),
        i = n(9195),
        s = n(3153),
        l = n(653),
        d = n(803),
        c = n(4565),
        u = n(4871),
        p = n(9365),
        m = n(6746),
        Z = n(8254),
        v = n(3811),
        f = n(7205),
        x = n(4695),
        h = n(4343),
        b = n(9569),
        w = n(3710),
        g = n(2791),
        j = n(306),
        y = n(4942),
        P = function (e) {
          return {
            container: { py: 3, bgcolor: 'background.default', width: '100%' },
            title: (0, y.Z)(
              { textAlign: 'center', fontWeight: 'bold' },
              e.breakpoints.down('tablet'),
              { fontSize: 50 }
            ),
            form: (0, y.Z)(
              {
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '500px',
                mx: 'auto',
                padding: 3,
                mt: 2,
                borderRadius: 1
              },
              e.breakpoints.down('mobile'),
              { padding: 1 }
            ),
            label: { whiteSpace: 'unset' },
            input: { mt: 1, mb: 2 },
            signInLink: {
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '16px',
              textDecoration: 'underline'
            }
          }
        },
        S = n(4196),
        L = n(2436),
        z = n(5468),
        M = n(3329)
      !(function (e) {
        ;(e[(e.username = 0)] = 'username'),
          (e[(e.email = 1)] = 'email'),
          (e[(e.password = 2)] = 'password'),
          (e[(e.repeatPassword = 3)] = 'repeatPassword')
      })(t || (t = {}))
      var k = function () {
        var e = (0, i.cI)({ resolver: (0, x.X)(h.FB), mode: 'all' }),
          r = e.register,
          n = (e.setValue, e.handleSubmit),
          y = e.formState.errors,
          k = y.username,
          F = y.email,
          E = y.password,
          R = y.repeatPassword,
          C = (0, s.T)(),
          I = n(function (e) {
            var r = e.email,
              n = e.password,
              t = e.username
            C((0, l.z2)({ email: r, password: n, username: t }))
          }),
          N = !!k || !!F || !!E || !!R,
          A = (0, g.useState)(!1),
          D = (0, a.Z)(A, 2),
          T = D[0],
          G = D[1],
          B = (0, j.Z)(P),
          V = (0, L.Z)({ componentNameKey: 'Register' }),
          W = null !== F && void 0 !== F && F.message ? V(F.message) : V('emailLabel'),
          O = null !== k && void 0 !== k && k.message ? V(k.message) : V('usernameLabel'),
          _ = null !== E && void 0 !== E && E.message ? V(E.message) : V('passwordLabel'),
          H = null !== R && void 0 !== R && R.message ? V(R.message) : V('repeatPasswordLabel'),
          K = V(N ? 'loginButtonDisabled' : 'loginButton')
        return (0, M.jsxs)(M.Fragment, {
          children: [
            (0, M.jsx)(z.Z, { keyOfTitle: 'register' }),
            (0, M.jsxs)(d.Z, {
              sx: B.container,
              children: [
                (0, M.jsx)(c.Z, { sx: B.title, variant: 'h1', children: V('title') }),
                (0, M.jsxs)(u.Z, {
                  onSubmit: I,
                  sx: B.form,
                  children: [
                    (0, M.jsx)(p.Z, {
                      sx: B.label,
                      error: !!k,
                      htmlFor: ''.concat(t.username),
                      children: O
                    }),
                    (0, M.jsx)(
                      m.Z,
                      (0, o.Z)(
                        { id: ''.concat(t.username), sx: B.input, error: !!k, type: 'name' },
                        r('username')
                      )
                    ),
                    (0, M.jsx)(p.Z, {
                      sx: B.label,
                      error: !!F,
                      htmlFor: ''.concat(t.email),
                      children: W
                    }),
                    (0, M.jsx)(
                      m.Z,
                      (0, o.Z)(
                        { id: ''.concat(t.email), sx: B.input, error: !!F, type: 'email' },
                        r('email')
                      )
                    ),
                    (0, M.jsx)(p.Z, {
                      sx: B.label,
                      error: !!E,
                      htmlFor: ''.concat(t.password),
                      children: _
                    }),
                    (0, M.jsx)(
                      m.Z,
                      (0, o.Z)(
                        (0, o.Z)(
                          {
                            id: ''.concat(t.password),
                            sx: B.input,
                            error: !!E,
                            type: T ? 'text' : 'password'
                          },
                          r('password')
                        ),
                        {},
                        {
                          endAdornment: (0, M.jsx)(Z.Z, {
                            position: 'end',
                            children: (0, M.jsx)(v.Z, {
                              'aria-label': 'toggle password visibility',
                              onClick: function () {
                                return G(function (e) {
                                  return !e
                                })
                              },
                              onMouseDown: function (e) {
                                e.preventDefault()
                              },
                              edge: 'end',
                              sx: { mr: '-4px' },
                              children: T ? (0, M.jsx)(b.Z, {}) : (0, M.jsx)(w.Z, {})
                            })
                          })
                        }
                      )
                    ),
                    (0, M.jsx)(p.Z, {
                      sx: B.label,
                      error: !!R,
                      htmlFor: ''.concat(t.repeatPassword),
                      children: H
                    }),
                    (0, M.jsx)(
                      m.Z,
                      (0, o.Z)(
                        {
                          id: ''.concat(t.repeatPassword),
                          sx: B.input,
                          error: !!R,
                          type: 'password'
                        },
                        r('repeatPassword')
                      )
                    ),
                    (0, M.jsx)(f.Z, {
                      type: 'submit',
                      variant: 'contained',
                      onClick: I,
                      disabled: N,
                      children: K
                    }),
                    (0, M.jsx)(S.bP, {
                      style: B.signInLink,
                      to: '/',
                      children: V('hasUserAccount')
                    })
                  ]
                })
              ]
            })
          ]
        })
      }
    },
    3710: function (e, r, n) {
      var t = n(1245),
        o = n(3329)
      r.Z = (0, t.Z)(
        (0, o.jsx)('path', {
          d: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
        }),
        'Visibility'
      )
    },
    9569: function (e, r, n) {
      var t = n(1245),
        o = n(3329)
      r.Z = (0, t.Z)(
        (0, o.jsx)('path', {
          d: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z'
        }),
        'VisibilityOff'
      )
    },
    4871: function (e, r, n) {
      n.d(r, {
        Z: function () {
          return h
        }
      })
      var t = n(3366),
        o = n(7462),
        a = n(2791),
        i = n(8182),
        s = n(4419),
        l = n(277),
        d = n(5513),
        c = n(5878),
        u = n(1217)
      function p(e) {
        return (0, u.Z)('MuiFormGroup', e)
      }
      ;(0, c.Z)('MuiFormGroup', ['root', 'row', 'error'])
      var m = n(529),
        Z = n(40),
        v = n(3329),
        f = ['className', 'row'],
        x = (0, l.ZP)('div', {
          name: 'MuiFormGroup',
          slot: 'Root',
          overridesResolver: function (e, r) {
            var n = e.ownerState
            return [r.root, n.row && r.row]
          }
        })(function (e) {
          var r = e.ownerState
          return (0,
          o.Z)({ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }, r.row && { flexDirection: 'row' })
        }),
        h = a.forwardRef(function (e, r) {
          var n = (0, d.Z)({ props: e, name: 'MuiFormGroup' }),
            a = n.className,
            l = n.row,
            c = void 0 !== l && l,
            u = (0, t.Z)(n, f),
            h = (0, m.Z)(),
            b = (0, Z.Z)({ props: n, muiFormControl: h, states: ['error'] }),
            w = (0, o.Z)({}, n, { row: c, error: b.error }),
            g = (function (e) {
              var r = e.classes,
                n = { root: ['root', e.row && 'row', e.error && 'error'] }
              return (0, s.Z)(n, p, r)
            })(w)
          return (0,
          v.jsx)(x, (0, o.Z)({ className: (0, i.Z)(g.root, a), ownerState: w, ref: r }, u))
        })
    },
    8254: function (e, r, n) {
      n.d(r, {
        Z: function () {
          return y
        }
      })
      var t = n(4942),
        o = n(3366),
        a = n(7462),
        i = n(2791),
        s = n(8182),
        l = n(4419),
        d = n(9853),
        c = n(4565),
        u = n(1211),
        p = n(529),
        m = n(277),
        Z = n(5878),
        v = n(1217)
      function f(e) {
        return (0, v.Z)('MuiInputAdornment', e)
      }
      var x,
        h = (0, Z.Z)('MuiInputAdornment', [
          'root',
          'filled',
          'standard',
          'outlined',
          'positionStart',
          'positionEnd',
          'disablePointerEvents',
          'hiddenLabel',
          'sizeSmall'
        ]),
        b = n(5513),
        w = n(3329),
        g = [
          'children',
          'className',
          'component',
          'disablePointerEvents',
          'disableTypography',
          'position',
          'variant'
        ],
        j = (0, m.ZP)('div', {
          name: 'MuiInputAdornment',
          slot: 'Root',
          overridesResolver: function (e, r) {
            var n = e.ownerState
            return [
              r.root,
              r['position'.concat((0, d.Z)(n.position))],
              !0 === n.disablePointerEvents && r.disablePointerEvents,
              r[n.variant]
            ]
          }
        })(function (e) {
          var r = e.theme,
            n = e.ownerState
          return (0,
          a.Z)({ display: 'flex', height: '0.01em', maxHeight: '2em', alignItems: 'center', whiteSpace: 'nowrap', color: (r.vars || r).palette.action.active }, 'filled' === n.variant && (0, t.Z)({}, '&.'.concat(h.positionStart, '&:not(.').concat(h.hiddenLabel, ')'), { marginTop: 16 }), 'start' === n.position && { marginRight: 8 }, 'end' === n.position && { marginLeft: 8 }, !0 === n.disablePointerEvents && { pointerEvents: 'none' })
        }),
        y = i.forwardRef(function (e, r) {
          var n = (0, b.Z)({ props: e, name: 'MuiInputAdornment' }),
            t = n.children,
            m = n.className,
            Z = n.component,
            v = void 0 === Z ? 'div' : Z,
            h = n.disablePointerEvents,
            y = void 0 !== h && h,
            P = n.disableTypography,
            S = void 0 !== P && P,
            L = n.position,
            z = n.variant,
            M = (0, o.Z)(n, g),
            k = (0, p.Z)() || {},
            F = z
          z && k.variant, k && !F && (F = k.variant)
          var E = (0, a.Z)({}, n, {
              hiddenLabel: k.hiddenLabel,
              size: k.size,
              disablePointerEvents: y,
              position: L,
              variant: F
            }),
            R = (function (e) {
              var r = e.classes,
                n = e.disablePointerEvents,
                t = e.hiddenLabel,
                o = e.position,
                a = e.size,
                i = e.variant,
                s = {
                  root: [
                    'root',
                    n && 'disablePointerEvents',
                    o && 'position'.concat((0, d.Z)(o)),
                    i,
                    t && 'hiddenLabel',
                    a && 'size'.concat((0, d.Z)(a))
                  ]
                }
              return (0, l.Z)(s, f, r)
            })(E)
          return (0,
          w.jsx)(u.Z.Provider, { value: null, children: (0, w.jsx)(j, (0, a.Z)({ as: v, ownerState: E, className: (0, s.Z)(R.root, m), ref: r }, M, { children: 'string' !== typeof t || S ? (0, w.jsxs)(i.Fragment, { children: ['start' === L ? x || (x = (0, w.jsx)('span', { className: 'notranslate', children: '\u200b' })) : null, t] }) : (0, w.jsx)(c.Z, { color: 'text.secondary', children: t }) })) })
        })
    }
  }
])
//# sourceMappingURL=930.998e6bc1.chunk.js.map
