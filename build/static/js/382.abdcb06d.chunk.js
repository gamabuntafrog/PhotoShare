"use strict";(self.webpackChunkphoto_share=self.webpackChunkphoto_share||[]).push([[382],{7758:function(e,t,n){n.d(t,{Z:function(){return S}});var r=n(1413),o=n(4165),a=n(5861),s=n(9439),i=n(9195),c=n(4695),l=n(6817),u=n(803),d=n(3811),p=n(4565),f=n(9365),x=n(6746),h=n(7205),m=(n(2791),n(7689)),Z=n(4343),v=n(5802),b=n(9823),y=n(306),g=function(e){return{backdrop:{display:"flex",alignItems:"center",justifyContent:"center"},wrapper:{bgcolor:"background.default",mx:2,py:2,px:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"50vh",borderRadius:4},title:{color:e.palette.text.standard,textAlign:"center",mx:"auto",my:2,wordBreak:"break-word"},form:{display:"flex",flexDirection:"column",width:"90%"},label:{my:1},submitButton:{alignSelf:"end",mt:2}}},j=n(2436),k=n(5468),w=n(5592),C=n(3329),I=function(e){return"function"===typeof e};var S=function(e){var t=e.closeModal,n=e.isModalOpen,S=e.onCreate,M=e.refetch,B=e.postId,L=v.WU.useCreateCollectionMutation(),P=(0,s.Z)(L,2),O=P[0],T=P[1].isLoading,R=(0,i.cI)({resolver:(0,c.X)(Z.LP),mode:"all"}),W=R.register,N=R.reset,U=R.handleSubmit,z=R.formState.errors,F=z.title,A=z.tags,D=(0,m.s0)(),E=U((function(e){var t=e.title,n=e.tags.split(" ");_({title:t,tags:n})})),_=function(){var e=(0,a.Z)((0,o.Z)().mark((function e(n){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O({body:n}).unwrap();case 3:r=e.sent,N(),t(),I(S)&&S(n.title,r.data.collection._id,B),I(M)&&(M(),D("/post/create/".concat(r.data.collection._id))),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),H=(0,y.Z)(g),V=(0,j.Z)({componentNameKey:"CreateCollectionModal"}),K=null!==F&&void 0!==F&&F.message?V(F.message):V("titleLabel"),X=null!==A&&void 0!==A&&A.message?V(A.message):V("tagsLabel");return(0,C.jsxs)(C.Fragment,{children:[n&&(0,C.jsx)(k.Z,{keyOfTitle:"createCollectionModal"}),(0,C.jsx)(l.Z,{open:n,onClose:t,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",sx:H.backdrop,children:(0,C.jsx)(u.Z,{sx:H.wrapper,maxWidth:"tablet",children:T?(0,C.jsx)(w.Z,{withMeta:!0}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(d.Z,{color:"error",sx:{alignSelf:"end"},onClick:t,children:(0,C.jsx)(b.Z,{})}),(0,C.jsx)(p.Z,{variant:"h3",sx:H.title,children:V("title")}),(0,C.jsxs)("form",{style:H.form,onSubmit:E,children:[(0,C.jsx)(f.Z,{htmlFor:"title",error:!!F,sx:H.label,children:K}),(0,C.jsx)(x.Z,(0,r.Z)({fullWidth:!0,id:"title"},W("title"))),(0,C.jsx)(f.Z,{htmlFor:"tags",error:!!A,sx:H.label,children:X}),(0,C.jsx)(x.Z,(0,r.Z)({fullWidth:!0,id:"tags"},W("tags"))),(0,C.jsx)(h.Z,{type:"submit",variant:"outlined",sx:H.submitButton,children:V("submitButton")})]})]})})})]})}},5592:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(6015),o=n(6580),a=(n(2791),n(5468)),s=n(3329);function i(e){var t=e.size,n=e.bgOff,i=e.withMeta;return(0,s.jsxs)(s.Fragment,{children:[i&&(0,s.jsx)(a.Z,{keyOfOther:"loading"}),(0,s.jsx)(r.Z,{sx:{bgcolor:n?"none":"background.default",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",mt:7,position:"relative",width:t||"20vw",height:t||"20vh",mx:"auto"},children:(0,s.jsx)(r.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"100%",height:"100%"},children:(0,s.jsx)(o.Z,{size:t||"20vw"})})})]})}},8882:function(e,t,n){n.d(t,{Z:function(){return m}});var r=n(5051),o=n(6015),a=n(3811),s=n(2352),i=n(5348),c=n(4346),l=n(7205),u=n(694),d=n(91),p=(n(2791),n(306)),f=function(e){return{wrapper:{ml:"auto"},openMenuButton:{ml:"auto",color:e.palette.text.light},menuList:{backgroundColor:"rgba(0, 0, 0, 0.2)","& .MuiPaper-root":{bgcolor:"background.paper",maxHeight:"300px"},"& .MuiMenu-list":{bgcolor:"background.paper",py:0}},menuItem:{"&:hover .saveActionButton":{display:"flex"},bgcolor:"background.paper",position:"relative"},menuItemButton:{position:"absolute",right:8,display:"none"},staticButtonsWrapper:{bgcolor:"background.paper",px:1,py:1,position:"sticky",bottom:"-1px","&:hover":{bgcolor:"background.paper"}}}},x=n(2436),h=n(3329);var m=function(e){var t=e.collections,n=e.toggleSave,m=e.postId,Z=e.isSaved,v=e.openModal,b=(0,r.Z)(),y=b.anchorEl,g=b.isAnchorEl,j=b.handleClick,k=b.handleClose,w=(0,x.Z)({componentNameKey:"PostSavesInfo"}),C=(0,p.Z)(f);return(0,h.jsxs)(o.Z,{sx:C.wrapper,children:[(0,h.jsx)(a.Z,{id:"basic-button","aria-controls":g?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":g?"true":void 0,onClick:j,sx:C.openMenuButton,children:Z?(0,h.jsx)(u.Z,{}):(0,h.jsx)(d.Z,{})}),(0,h.jsxs)(s.Z,{id:"basic-menu",anchorEl:y,open:g,onClose:k,MenuListProps:{"aria-labelledby":"basic-button"},sx:C.menuList,children:[t.map((function(e){var t=e.title,r=e.isSaved,o=e.collectionId,a=w(r?"deletePostButton":"savePostButton");return(0,h.jsxs)(i.Z,{sx:C.menuItem,onClick:function(){return function(e,t,r){k(),n(e,t,r)}(m,o,r)},children:[(0,h.jsx)(c.Z,{sx:{mr:1},children:t}),(0,h.jsx)(l.Z,{className:"saveActionButton",color:r?"error":"success",sx:C.menuItemButton,variant:"contained",children:a})]},o)})),(0,h.jsx)(o.Z,{sx:C.staticButtonsWrapper,children:(0,h.jsx)(l.Z,{variant:"contained",onClick:function(){k(),v()},children:w("createNewCollectionButton")})})]})]})}},9382:function(e,t,n){n.r(t),n.d(t,{default:function(){return U}});var r=n(1413),o=n(9439),a=n(4142),s=n(6015),i=n(3978),c=n(4565),l=n(7205),u=n(803),d=n(3811),p=n(1087),f=n(7689),x=n(7488),h=n(3153),m=n(7237),Z=n(2791),v=n(5802),b=n(8882),y=n(7758),g=n(3433),j=n(4165),k=n(5861),w=function(e){var t=e.initPost,n=v.s4.useUnlikeOneByIdMutation(),a=(0,o.Z)(n,1)[0],s=v.s4.useLikeOneByIdMutation(),i=(0,o.Z)(s,1)[0],c=v.WU.useDeletePostFromCollectionMutation(),l=(0,o.Z)(c,1)[0],u=v.WU.useSavePostInCollectionMutation(),d=(0,o.Z)(u,1)[0],p=v.s4.useDeletePostMutation(),x=(0,o.Z)(p,1)[0],h=(0,f.s0)(),m=(0,Z.useState)(t),b=(0,o.Z)(m,2),y=b[0],w=b[1];(0,Z.useEffect)((function(){t&&w(t)}),[t]);var C=function(){var e=(0,k.Z)((0,j.Z)().mark((function e(t,n){var o;return(0,j.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,y){e.next=3;break}return e.abrupt("return");case 3:if(!n){e.next=8;break}return e.next=6,a({id:t}).unwrap();case 6:e.next=10;break;case 8:return e.next=10,i({id:t}).unwrap();case 10:o=y.likesCount,o=n?--o:++o,w((0,r.Z)((0,r.Z)({},y),{},{isLiked:!y.isLiked,likesCount:o})),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t,n){return e.apply(this,arguments)}}(),I=function(){var e=(0,k.Z)((0,j.Z)().mark((function e(t,n,o){return(0,j.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,y){e.next=3;break}return e.abrupt("return");case 3:if(!o){e.next=8;break}return e.next=6,l({postId:t,collectionId:n}).unwrap();case 6:e.next=10;break;case 8:return e.next=10,d({postId:t,collectionId:n}).unwrap();case 10:w((function(e){if(!e)return e;var t=y.savesInfo.map((function(e){return e.collectionId===n?{isSaved:!o,collectionId:e.collectionId,title:e.title}:e})),a=t.some((function(e){return!!e.isSaved}));return(0,r.Z)((0,r.Z)({},y),{},{savesInfo:t,isSomewhereSaved:a})})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n,r){return e.apply(this,arguments)}}(),S=function(){var e=(0,k.Z)((0,j.Z)().mark((function e(t,n,o){return(0,j.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,d({postId:o,collectionId:n}).unwrap();case 5:w((function(e){if(!e)return e;var o=[].concat((0,g.Z)(y.savesInfo),[{title:t,collectionId:n,isSaved:!1}]).map((function(e){return e.collectionId===n?{isSaved:!e.isSaved,collectionId:e.collectionId,title:e.title}:e})),a=o.some((function(e){return!!e.isSaved}));return(0,r.Z)((0,r.Z)({},y),{},{savesInfo:o,isSomewhereSaved:a})})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,n,r){return e.apply(this,arguments)}}(),M=function(){var e=(0,k.Z)((0,j.Z)().mark((function e(t){return(0,j.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x({id:t}).then((function(){return h("/")}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return[y,{toggleLike:C,toggleSave:I,updateSavesInfo:S,deletePost:M}]},C=n(2550),I=n(5444),S=n(306),M=n(4942),B=n(277),L=function(e){var t=e.breakpoints,n=e.palette,r=t.down,o=(t.up,t.values),a=n.primary;return{postContainer:(0,M.Z)({pt:4,pb:2,px:2,maxWidth:o.laptop},r("laptop"),{pt:2}),postWrapper:(0,M.Z)({display:"flex",flexDirection:"row",mx:"auto",mb:2,borderRadius:"8px"},r("laptop"),{flexDirection:"column"}),postImage:(0,M.Z)({width:"50%",borderRadius:"8px",backgroundColor:a.main},t.down("laptop"),{width:"100%"}),postInfo:(0,M.Z)({px:3,mt:1,width:"50%"},r("laptop"),{px:0,width:"100%"}),postButtons:{display:"flex",alignItems:"center",alignSelf:"flex-start",width:"100%"},authorInfo:{container:(0,M.Z)({display:"flex"},e.breakpoints.down("tablet"),{flexDirection:"column",alignItems:"flex-start"}),wrapper:{display:"flex",alignItems:"center",justifyContent:"start"},subscribeButton:(0,M.Z)({ml:2,borderRadius:4},e.breakpoints.down("tablet"),{ml:0,mt:1,borderRadius:2}),avatar:{width:"40px",height:"40px"},userInfoWrapper:{ml:1,lineHeight:"0px"}}}},P=(0,B.ZP)("img")((function(e){var t=e.theme;return(0,M.Z)({width:"50%",borderRadius:"8px",backgroundColor:t.palette.primary.main},t.breakpoints.down("laptop"),{width:"100%"})})),O=n(7247),T=n(2436),R=n(5468),W=n(3329);function N(e){var t=e.authorId,n=e.avatarURL,r=e.username,o=e.subscribersCount,u=e.isUserAuthorOfPost,d=(0,C.Z)(t),f=d.toggleSubscribe,x=d.isSubscribed,h=(0,T.Z)({componentNameKey:"Post"}),m=h(x?"unsubscribeButton":"subscribeButton"),Z=((0,a.Z)(),(0,S.Z)(L).authorInfo);return(0,W.jsxs)(s.Z,{sx:Z.container,children:[(0,W.jsxs)(p.OL,{style:Z.wrapper,to:"/users/".concat(t),children:[(0,W.jsx)(i.Z,{sx:Z.avatar,src:n}),(0,W.jsxs)(s.Z,{sx:Z.userInfoWrapper,children:[(0,W.jsx)(c.Z,{variant:"h6",children:r}),(0,W.jsx)(c.Z,{variant:"caption",children:h("subscribersCount",{subscribersCount:o})})]})]}),!u&&(0,W.jsx)(l.Z,{sx:Z.subscribeButton,variant:"contained",onClick:function(){return f(t,x)},children:m})]})}var U=function(){var e=(0,f.UO)().id,t=void 0===e?"":e,n=(0,h.C)((function(e){return e.userReducer.user}))._id,a=v.s4.useGetOneByIdQuery({id:t}),i=a.data,l=a.isLoading,p=(0,Z.useState)(!1),g=(0,o.Z)(p,2),j=g[0],k=g[1],C=w({initPost:i}),M=(0,o.Z)(C,2),B=M[0],U=M[1],z=U.toggleLike,F=U.toggleSave,A=U.updateSavesInfo,D=U.deletePost,E=(0,T.Z)({componentNameKey:"Post"}),_=(0,S.Z)(L);if(!B&&l)return(0,W.jsx)(I.Z,{withMeta:!0});if(!B||!B.author)return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(R.Z,{keyOfOther:"error"}),(0,W.jsx)(u.Z,{sx:(0,r.Z)({height:"92vh"},_.postContainer),children:(0,W.jsx)(c.Z,{variant:"h1",textAlign:"center",children:E("doesNotExists")})})]});var H=B._id,V=B.author,K=B.title,X=B.body,Y=B.tags,G=B.likesCount,Q=B.image,q=B.isLiked,J=B.isSomewhereSaved,$=B.savesInfo,ee=V.username,te=V._id,ne=V.avatar,re=void 0===ne?"":ne,oe=V.subscribersCount,ae=Y.join(" "),se=te===n;return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(R.Z,{keyOfTitle:"post",options:{username:ee}}),(0,W.jsxs)(u.Z,{sx:_.postContainer,children:[(0,W.jsx)(y.Z,{postId:H,onCreate:A,closeModal:function(){return k(!1)},isModalOpen:j}),(0,W.jsxs)(s.Z,{sx:_.postWrapper,children:[(0,W.jsx)(P,{src:Q}),(0,W.jsxs)(s.Z,{sx:_.postInfo,children:[(0,W.jsxs)(s.Z,{sx:_.postButtons,children:[(0,W.jsx)(d.Z,{onClick:function(){return z(H,q)},children:q?(0,W.jsx)(m.Z,{color:"secondary"}):(0,W.jsx)(x.Z,{})}),(0,W.jsx)(c.Z,{sx:{ml:.5},children:G}),(0,W.jsx)(b.Z,{collections:$,toggleSave:F,postId:H,isSaved:J,openModal:function(){return k(!0)}}),se&&(0,W.jsx)(d.Z,{color:"error",onClick:function(){return D(H)},children:(0,W.jsx)(O.Z,{})})]}),(0,W.jsx)(c.Z,{variant:"h3",children:K}),(0,W.jsx)(N,{authorId:te,avatarURL:re,username:ee,subscribersCount:oe,isUserAuthorOfPost:se}),(0,W.jsxs)(s.Z,{sx:{my:1},children:[(0,W.jsx)(c.Z,{variant:"body1",children:X}),(0,W.jsx)(c.Z,{variant:"body2",children:ae})]})]})]},H)]})]})}},5051:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(9439),o=n(2791);function a(){var e=(0,o.useState)(null),t=(0,r.Z)(e,2),n=t[0],a=t[1];return{anchorEl:n,setAnchorEl:a,isAnchorEl:Boolean(n),handleClick:function(e){a(e.currentTarget)},handleClose:function(){a(null)}}}},2550:function(e,t,n){var r=n(4165),o=n(5861),a=n(9439),s=n(3153),i=n(5802),c=n(653);t.Z=function(e){var t=(0,s.C)((function(e){return e.userReducer.user.subscribes})).some((function(t){return t===e})),n=(0,s.T)(),l=i.Yy.useSubscribeToUserMutation(),u=(0,a.Z)(l,1)[0],d=i.Yy.useUnsubscribeFromUserMutation(),p=(0,a.Z)(d,1)[0],f=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(t,o){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{o?p({id:t}).unwrap():u({id:t}).unwrap(),n(o?(0,c.Xd)(t):(0,c.oL)(t))}catch(r){console.log(r)}case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return{toggleSubscribe:f,isSubscribed:t}}},694:function(e,t,n){var r=n(4836);t.Z=void 0;var o=r(n(5649)),a=n(3329),s=(0,o.default)((0,a.jsx)("path",{d:"m19 21-7-3-7 3V5c0-1.1.9-2 2-2h7c-.63.84-1 1.87-1 3 0 2.76 2.24 5 5 5 .34 0 .68-.03 1-.1V21zM17.83 9 15 6.17l1.41-1.41 1.41 1.41 3.54-3.54 1.41 1.41L17.83 9z"}),"BookmarkAdded");t.Z=s},91:function(e,t,n){var r=n(4836);t.Z=void 0;var o=r(n(5649)),a=n(3329),s=(0,o.default)((0,a.jsx)("path",{d:"M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z"}),"BookmarkBorder");t.Z=s},7247:function(e,t,n){var r=n(4836);t.Z=void 0;var o=r(n(5649)),a=n(3329),s=(0,o.default)((0,a.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=s},7237:function(e,t,n){var r=n(4836);t.Z=void 0;var o=r(n(5649)),a=n(3329),s=(0,o.default)((0,a.jsx)("path",{d:"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite");t.Z=s},7488:function(e,t,n){var r=n(4836);t.Z=void 0;var o=r(n(5649)),a=n(3329),s=(0,o.default)((0,a.jsx)("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}),"FavoriteBorder");t.Z=s},4346:function(e,t,n){var r=n(4942),o=n(3366),a=n(7462),s=n(2791),i=n(8182),c=n(4419),l=n(4565),u=n(8826),d=n(5513),p=n(277),f=n(9282),x=n(3329),h=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],m=(0,p.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[(0,r.Z)({},"& .".concat(f.Z.primary),t.primary),(0,r.Z)({},"& .".concat(f.Z.secondary),t.secondary),t.root,n.inset&&t.inset,n.primary&&n.secondary&&t.multiline,n.dense&&t.dense]}})((function(e){var t=e.ownerState;return(0,a.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},t.primary&&t.secondary&&{marginTop:6,marginBottom:6},t.inset&&{paddingLeft:56})})),Z=s.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiListItemText"}),r=n.children,p=n.className,Z=n.disableTypography,v=void 0!==Z&&Z,b=n.inset,y=void 0!==b&&b,g=n.primary,j=n.primaryTypographyProps,k=n.secondary,w=n.secondaryTypographyProps,C=(0,o.Z)(n,h),I=s.useContext(u.Z).dense,S=null!=g?g:r,M=k,B=(0,a.Z)({},n,{disableTypography:v,inset:y,primary:!!S,secondary:!!M,dense:I}),L=function(e){var t=e.classes,n=e.inset,r=e.primary,o=e.secondary,a={root:["root",n&&"inset",e.dense&&"dense",r&&o&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,c.Z)(a,f.L,t)}(B);return null==S||S.type===l.Z||v||(S=(0,x.jsx)(l.Z,(0,a.Z)({variant:I?"body2":"body1",className:L.primary,component:null!=j&&j.variant?void 0:"span",display:"block"},j,{children:S}))),null==M||M.type===l.Z||v||(M=(0,x.jsx)(l.Z,(0,a.Z)({variant:"body2",className:L.secondary,color:"text.secondary",display:"block"},w,{children:M}))),(0,x.jsxs)(m,(0,a.Z)({className:(0,i.Z)(L.root,p),ownerState:B,ref:t},C,{children:[S,M]}))}));t.Z=Z}}]);
//# sourceMappingURL=382.abdcb06d.chunk.js.map