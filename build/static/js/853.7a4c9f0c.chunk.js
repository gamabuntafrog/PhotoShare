"use strict";(self.webpackChunkphoto_share=self.webpackChunkphoto_share||[]).push([[853],{7033:function(t,e,r){var o=r(4942);e.Z=function(t){var e,r,n;return{backdrop:{display:"flex",alignItems:"center",justifyContent:"center"},modalWrapper:(e={bgcolor:"background.paper",flexShrink:0,width:"50vw",maxHeight:"100vh",overflow:"auto",px:0,color:"text.primary",borderRadius:2,position:"relative",display:"flex",flexDirection:"column",justifyContent:"flex-start"},(0,o.Z)(e,t.breakpoints.down("laptop"),{width:"70vw"}),(0,o.Z)(e,t.breakpoints.down("tablet"),{width:"100vw",borderRadius:0,minHeight:"100vh"}),e),modalContainer:{px:2,mb:3},closeIconWrapper:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:3,pl:2,pr:1,pb:1,borderBottom:"1px solid rgba(255, 255, 255, 0.2)"},closeIcon:{ml:"auto"},errorContainer:{margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",height:"90vh",maxHeight:"90vh"},title:{color:t.palette.text.secondary},collectionWrapper:{py:2,position:"relative"},collectionPostsList:{width:"95%",py:2,mx:"auto"},addAuthorModal:{backdrop:{display:"flex",alignItems:"center",justifyContent:"center"},modalWrapper:(0,o.Z)({bgcolor:"background.paper",width:"50vw",maxHeight:"100vh",overflow:"auto",padding:2,pt:8,color:"text.primary",borderRadius:2,position:"relative"},t.breakpoints.down("tablet"),{width:"80vw"}),loaderWrapper:(0,o.Z)({bgcolor:"background.paper",width:"50vw",overflow:"hidden",padding:2,color:"text.primary",borderRadius:2,position:"relative"},t.breakpoints.down("tablet"),{width:"80vw"}),title:{padding:1,textAlign:"center",color:"primary.main",wordBreak:"break-word"},closeIcon:{position:"absolute",right:20,top:20},notFound:{textAlign:"center",padding:2},userItem:(0,o.Z)({},t.breakpoints.down("tablet"),{padding:1}),avatarWrapper:{cursor:"pointer",minWidth:"auto"},avatar:(0,o.Z)({width:60,height:60},t.breakpoints.down("tablet"),{width:40,height:40}),usernameWrapper:(r={ml:2,mr:1},(0,o.Z)(r,t.breakpoints.down("tablet"),{mx:1}),(0,o.Z)(r,"cursor","pointer"),r)},deleteAuthorModal:{backdrop:{display:"flex",alignItems:"center",justifyContent:"center"},modalWrapper:(0,o.Z)({bgcolor:"background.paper",width:"50vw",maxHeight:"100vh",overflow:"auto",padding:2,pt:8,color:"text.primary",borderRadius:2,position:"relative"},t.breakpoints.down("tablet"),{width:"80vw"}),closeIcon:{position:"absolute",right:20,top:20},title:{padding:1,textAlign:"center",wordBreak:"break-word"},avatar:{width:60,height:60},authorUsernameWrapper:{ml:2,mr:1},errorTitle:{padding:1,textAlign:"center",wordBreak:"break-word"}},authorUsernameWrapper:{ml:2,mr:1},avatar:{width:60,height:60},authorInfo:{closeIcon:{position:"absolute",right:20,top:20},title:{padding:1,textAlign:"center",wordBreak:"break-word"},listItem:(0,o.Z)({},t.breakpoints.down("tablet"),{px:0}),avatar:{width:60,height:60},authorUsernameWrapper:{ml:2,mr:1,cursor:"pointer"},errorTitle:{padding:1,textAlign:"center",wordBreak:"break-word"}},openButton:{position:"absolute",right:20,top:20},collectionInfo:{wrapper:{mb:2,mt:6},title:(n={textAlign:"center",wordBreak:"break-word"},(0,o.Z)(n,t.breakpoints.down("tablet"),{fontSize:50}),(0,o.Z)(n,"padding",2),n),tags:{textAlign:"center"},secondWrapper:{display:"flex",flexDirection:"column",alignItems:"center"},authorLinkWrapper:{display:"flex",alignItems:"center",cursor:"pointer"},authorContainerWrapper:{display:"flex",alignItems:"start",flexDirection:"column"},userRole:{ml:1,color:"primary.main"},avatar:{width:"80px",height:"80px"},addNewPostButton:{mt:3}},accordionWrapper:{borderRadius:"16px !important",mb:1,"&:before":{display:"none"}},accordionTitle:{width:"90%",flexShrink:0},togglePrivateContainer:{mt:3,mb:3,px:1,display:"flex",justifyContent:"space-between",alignItems:"center"},dangerButtonsWrapper:{display:"flex",px:1,mt:3},collectionSettingsInfo:{changeInfoForm:{wrapper:{mb:2,px:1},inputLabel:{mb:1},input:{mb:1},buttonsWrapper:(0,o.Z)({display:"flex",mt:1},t.breakpoints.down("tablet"),{flexDirection:"column"}),saveChangesButton:(0,o.Z)({mr:2},t.breakpoints.down("tablet"),{mx:0}),cancelChangesButton:(0,o.Z)({width:"25%"},t.breakpoints.down("tablet"),{width:"75%",mx:"auto",mt:1})},wrapper:(0,o.Z)({mb:2,px:1,display:"flex",justifyContent:"space-between"},t.breakpoints.down("tablet"),{flexDirection:"column"}),secondWrapper:(0,o.Z)({mr:2},t.breakpoints.down("tablet"),{mr:0,mb:1})}}}},4853:function(t,e,r){r.r(e),r.d(e,{default:function(){return j}});var o=r(9439),n=r(803),i=r(4565),a=r(6015),l=r(7205),s=r(7964),p=r(7689),d=r(4142),c=r(2797),u=r(3084),h=r(2791),b=r(5802),m=r(7898),x=r(5444),g=r(306),w=r(7033),f=r(2436),k=r(5468),v=r(3329),y=h.lazy((function(){return r.e(647).then(r.bind(r,9647))})),Z=h.lazy((function(){return Promise.all([r.e(319),r.e(991)]).then(r.bind(r,2991))}));var j=function(){var t=(0,p.UO)().id,e=void 0===t?"":t,r=b.WU.useGetOneWithPostsAndAuthorQuery({id:e}),j=r.data,C=r.isLoading,W=r.error,I=(0,m.Z)({initPosts:null===j||void 0===j?void 0:j.collection.posts}),A=(0,o.Z)(I,2),B=A[0],S=A[1],P=(0,d.Z)(),O=(0,c.Z)(P.breakpoints.down("laptop")),R=(0,c.Z)(P.breakpoints.down("tablet")),U=(0,h.useState)(!1),M=(0,o.Z)(U,2),D=M[0],H=M[1],L=(0,g.Z)(w.Z),T=(0,f.Z)({componentNameKey:"Collection"});if(C)return(0,v.jsx)(x.Z,{withMeta:!0});if(W||!j)return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k.Z,{keyOfOther:"error"}),(0,v.jsx)(n.Z,{sx:L.errorContainer,children:(0,v.jsx)(i.Z,{variant:"h1",sx:{textAlign:"center"},children:T("errorMessage")})})]});var F=j.collection,_=j.currentUserStatus,z=F._id,N=F.title,G=F.tags,K=F.authors,Q=F.isPrivate,q=_.isAuthor,E=_.isAdmin,J=G.join(" "),V=Q?"privateCollection":"publicCollection",X=O?R?2:3:5;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k.Z,{keyOfTitle:V}),(0,v.jsxs)(a.Z,{children:[(q||E)&&(0,v.jsx)(h.Suspense,{fallback:(0,v.jsx)(x.Z,{fixed:!0,withMeta:!0}),children:(0,v.jsx)(Z,{data:j,closeSettingsModal:function(){return H(!1)},isSettingsOpen:D})}),(0,v.jsxs)(a.Z,{sx:L.collectionWrapper,children:[(q||E)&&(0,v.jsx)(l.Z,{sx:L.openButton,variant:"contained",onClick:function(){return H(!0)},children:T("openSettingsButton")}),(0,v.jsx)(y,{title:N,formattedTags:J,authors:K,isCurrentUserAuthorOfCollection:q,collectionId:z})]}),(0,v.jsx)(s.Z,{variant:"masonry",sx:L.collectionPostsList,gap:12,cols:X,children:B.map((function(t){return(0,v.jsx)(u.Z,{postsActions:S,post:t},t._id)}))})]})]})}}}]);
//# sourceMappingURL=853.7a4c9f0c.chunk.js.map