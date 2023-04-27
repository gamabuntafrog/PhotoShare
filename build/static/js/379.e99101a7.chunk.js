'use strict'
;(self.webpackChunkphoto_share = self.webpackChunkphoto_share || []).push([
  [379],
  {
    379: function (e, n, t) {
      t.r(n),
        t.d(n, {
          default: function () {
            return x
          }
        })
      var l = t(9439),
        o = t(2791),
        s = t(9281),
        a = t(5017),
        r = t(4565),
        i = t(5592),
        u = t(7033),
        c = t(306),
        d = t(2436),
        h = t(5444),
        f = t(1608),
        g = t(3329),
        p = o.lazy(function () {
          return Promise.all([t.e(87), t.e(309)]).then(t.bind(t, 4309))
        })
      var x = function (e) {
        var n = e.collectionId,
          t = (0, o.useState)(''),
          x = (0, l.Z)(t, 2),
          Z = x[0],
          j = x[1],
          m = (0, s.Nr)(Z, 1e3),
          C = (0, l.Z)(m, 1)[0],
          k = f.Z.useGetUsersForAddInCollectionQuery(
            { username: C, collectionId: n },
            { skip: C.length < 2 }
          ),
          v = k.data,
          b = k.isLoading,
          y = (0, c.Z)(u.Z).addAuthorModal,
          F = v && v.length > 0 && C.length > 2,
          I = (v && 0 === v.length) || (!v && C.length > 2),
          w = (0, d.Z)({ componentNameKey: 'Collection.CollectionSettings.AddUserToCollection' })
        return (0, g.jsxs)(g.Fragment, {
          children: [
            (0, g.jsx)(a.Z, {
              sx: { my: 1 },
              fullWidth: !0,
              placeholder: w('inputPlaceholder'),
              value: Z,
              name: 'users',
              type: 'text',
              onChange: function (e) {
                return j(e.target.value)
              }
            }),
            b && (0, g.jsx)(i.Z, { bgOff: !0, size: '100px' }),
            F &&
              (0, g.jsx)(o.Suspense, {
                fallback: (0, g.jsx)(h.Z, { fixed: !0, withMeta: !0 }),
                children: (0, g.jsx)(p, { authors: v, collectionId: n })
              }),
            I && (0, g.jsx)(r.Z, { variant: 'h5', sx: y.notFound, children: w('notFoundMessage') })
          ]
        })
      }
    }
  }
])
//# sourceMappingURL=379.e99101a7.chunk.js.map
