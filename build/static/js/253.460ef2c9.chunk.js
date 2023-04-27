'use strict'
;(self.webpackChunkphoto_share = self.webpackChunkphoto_share || []).push([
  [253],
  {
    253: function (e, r, t) {
      t.r(r),
        t.d(r, {
          default: function () {
            return b
          }
        })
      var o = t(1413),
        n = t(4165),
        s = t(5861),
        i = t(9439),
        a = t(4871),
        l = t(9365),
        c = t(6746),
        u = t(5017),
        d = t(6015),
        Z = t(7205),
        f = t(4565),
        p = t(2791),
        h = t(9195),
        m = t(4695),
        x = t(4343),
        v = t(306),
        g = t(7033),
        w = t(2436),
        C = t(1452),
        j = t(3329)
      var b = function (e) {
        var r = e.title,
          t = e.tags,
          b = e.isAdmin,
          S = e.collectionId,
          k = (0, p.useState)(!1),
          F = (0, i.Z)(k, 2),
          I = F[0],
          y = F[1],
          W = C.Z.useChangeCollectionInfoMutation(),
          B = (0, i.Z)(W, 1)[0],
          L = (0, h.cI)({
            resolver: (0, m.X)(x.LP),
            mode: 'all',
            defaultValues: { title: r, tags: t }
          }),
          M = L.register,
          N = L.reset,
          G = L.handleSubmit,
          R = L.formState.errors,
          A = R.title,
          D = R.tags,
          K = function () {
            y(!1), N()
          },
          P = !(!A && !D),
          _ = G(
            (function () {
              var e = (0, s.Z)(
                (0, n.Z)().mark(function e(r) {
                  var t, o, s
                  return (0, n.Z)().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (t = r.title),
                            (o = r.tags),
                            (s = o.split(' ')),
                            (e.next = 4),
                            B({ title: t, tags: s, collectionId: S })
                          )
                        case 4:
                          K()
                        case 5:
                        case 'end':
                          return e.stop()
                      }
                  }, e)
                })
              )
              return function (r) {
                return e.apply(this, arguments)
              }
            })()
          ),
          V = (0, v.Z)(g.Z).collectionSettingsInfo,
          X = V.changeInfoForm,
          q = (0, w.Z)({ componentNameKey: 'Collection.CollectionSettings.CollectionInfo' }),
          z = (0, w.Z)({ componentNameKey: 'Collection.CollectionSettings.CollectionInfo.form' }),
          E = null !== A && void 0 !== A && A.message ? z(A.message) : z('titleLabel'),
          H = null !== D && void 0 !== D && D.message ? z(D.message) : z('tagsLabel')
        return b && I
          ? (0, j.jsxs)(a.Z, {
              sx: X.wrapper,
              onSubmit: _,
              children: [
                (0, j.jsx)(l.Z, { error: !!A, sx: X.inputLabel, htmlFor: 'title', children: E }),
                (0, j.jsx)(
                  c.Z,
                  (0, o.Z)(
                    (0, o.Z)({ error: !!A, id: 'title' }, M('title')),
                    {},
                    { sx: X.input, fullWidth: !0 }
                  )
                ),
                (0, j.jsx)(l.Z, { sx: X.inputLabel, htmlFor: 'tags', children: H }),
                (0, j.jsx)(
                  u.Z,
                  (0, o.Z)(
                    (0, o.Z)({ error: !!D, id: 'tags' }, M('tags')),
                    {},
                    { sx: X.input, multiline: !0, minRows: 2, fullWidth: !0 }
                  )
                ),
                (0, j.jsxs)(d.Z, {
                  sx: X.buttonsWrapper,
                  children: [
                    (0, j.jsx)(Z.Z, {
                      disabled: P,
                      sx: X.saveChangesButton,
                      variant: 'contained',
                      type: 'submit',
                      onClick: _,
                      fullWidth: !0,
                      children: z('saveChangesButton')
                    }),
                    (0, j.jsx)(Z.Z, {
                      sx: X.cancelChangesButton,
                      color: 'error',
                      variant: 'text',
                      onClick: K,
                      children: z('cancelChangesButton')
                    })
                  ]
                })
              ]
            })
          : (0, j.jsxs)(d.Z, {
              sx: V.wrapper,
              children: [
                (0, j.jsxs)(d.Z, {
                  sx: V.secondWrapper,
                  children: [
                    (0, j.jsx)(f.Z, { variant: 'h6', textAlign: 'center', children: r }),
                    (0, j.jsx)(f.Z, { color: 'text.secondary', children: t })
                  ]
                }),
                b &&
                  (0, j.jsx)(Z.Z, {
                    onClick: function () {
                      return y(!0)
                    },
                    variant: 'contained',
                    children: q('editButton')
                  })
              ]
            })
      }
    },
    4871: function (e, r, t) {
      t.d(r, {
        Z: function () {
          return v
        }
      })
      var o = t(3366),
        n = t(7462),
        s = t(2791),
        i = t(8182),
        a = t(4419),
        l = t(277),
        c = t(5513),
        u = t(5878),
        d = t(1217)
      function Z(e) {
        return (0, d.Z)('MuiFormGroup', e)
      }
      ;(0, u.Z)('MuiFormGroup', ['root', 'row', 'error'])
      var f = t(529),
        p = t(40),
        h = t(3329),
        m = ['className', 'row'],
        x = (0, l.ZP)('div', {
          name: 'MuiFormGroup',
          slot: 'Root',
          overridesResolver: function (e, r) {
            var t = e.ownerState
            return [r.root, t.row && r.row]
          }
        })(function (e) {
          var r = e.ownerState
          return (0,
          n.Z)({ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }, r.row && { flexDirection: 'row' })
        }),
        v = s.forwardRef(function (e, r) {
          var t = (0, c.Z)({ props: e, name: 'MuiFormGroup' }),
            s = t.className,
            l = t.row,
            u = void 0 !== l && l,
            d = (0, o.Z)(t, m),
            v = (0, f.Z)(),
            g = (0, p.Z)({ props: t, muiFormControl: v, states: ['error'] }),
            w = (0, n.Z)({}, t, { row: u, error: g.error }),
            C = (function (e) {
              var r = e.classes,
                t = { root: ['root', e.row && 'row', e.error && 'error'] }
              return (0, a.Z)(t, Z, r)
            })(w)
          return (0,
          h.jsx)(x, (0, n.Z)({ className: (0, i.Z)(C.root, s), ownerState: w, ref: r }, d))
        })
    }
  }
])
//# sourceMappingURL=253.460ef2c9.chunk.js.map
