/*! scrawl-canvas 2017-06-26 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"factories"))var scrawl=function(a){"use strict";return a.makeEllipse=function(b){var c,d,e,f,g,h,i,j,k,l,m=a.Position.prototype.numberConvert,n=a.xtGet;return b=a.safeObject(b),b.closed=!0,c=a.Entity.prototype.getEntityCell(b),d=n(b.startX,0),e=n(b.startY,0),f=n(b.radiusX,0),g=n(b.radiusY,0),d=d.substring?m(d,c.actualWidth):d,e=e.substring?m(e,c.actualHeight):e,f=f.substring?m(f,c.actualWidth):f,g=g.substring?m(g,c.actualHeight):g,h="m",i=d,j=e,k=d,l=e-g,h+=i-k+","+(j-l),i=k,j=l,k=d+.55*f,l=e-g,h+="c"+(i-k)+","+(j-l),k=d+f,l=e-.55*g,h+=" "+(i-k)+","+(j-l),k=d+f,l=e,h+=" "+(i-k)+","+(j-l),i=k,j=l,k=d+f,l=e+.55*g,h+="c"+(i-k)+","+(j-l),k=d+.55*f,l=e+g,h+=" "+(i-k)+","+(j-l),k=d,l=e+g,h+=" "+(i-k)+","+(j-l),i=k,j=l,k=d-.55*f,l=e+g,h+="c"+(i-k)+","+(j-l),k=d-f,l=e+.55*g,h+=" "+(i-k)+","+(j-l),k=d-f,l=e,h+=" "+(i-k)+","+(j-l),i=k,j=l,k=d-f,l=e-.55*g,h+="c"+(i-k)+","+(j-l),k=d-.55*f,l=e-g,h+=" "+(i-k)+","+(j-l),k=d,l=e-g,h+=" "+(i-k)+","+(j-l),h+="z",b.isLine=!1,b.data=h,b.shape?a.makeShape(b):a.makePath(b)},a.makeRectangle=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w=a.Position.prototype.numberConvert,x=a.xtGet;return b=a.safeObject(b),b.closed=!0,c=a.Entity.prototype.getEntityCell(b),d=x(b.startX,0),e=x(b.startY,0),f=x(b.width,0),g=x(b.height,0),d=d.substring?w(d,c.actualWidth):d,e=e.substring?w(e,c.actualHeight):e,f=f.substring?w(f,c.actualWidth):f,g=g.substring?w(g,c.actualHeight):g,j=x(b.radiusTopLeftX,b.radiusTopLeft,b.radiusTopX,b.radiusLeftX,b.radiusTop,b.radiusLeft,b.radiusX,b.radius,0),k=x(b.radiusTopLeftY,b.radiusTopLeft,b.radiusTopY,b.radiusLeftY,b.radiusTop,b.radiusLeft,b.radiusY,b.radius,0),l=x(b.radiusTopRightX,b.radiusTopRight,b.radiusTopX,b.radiusRightX,b.radiusTop,b.radiusRight,b.radiusX,b.radius,0),m=x(b.radiusTopRightY,b.radiusTopRight,b.radiusTopY,b.radiusRightY,b.radiusTop,b.radiusRight,b.radiusY,b.radius,0),n=x(b.radiusBottomRightX,b.radiusBottomRight,b.radiusBottomX,b.radiusRightX,b.radiusBottom,b.radiusRight,b.radiusX,b.radius,0),o=x(b.radiusBottomRightY,b.radiusBottomRight,b.radiusBottomY,b.radiusRightY,b.radiusBottom,b.radiusRight,b.radiusY,b.radius,0),p=x(b.radiusBottomLeftX,b.radiusBottomLeft,b.radiusBottomX,b.radiusLeftX,b.radiusBottom,b.radiusLeft,b.radiusX,b.radius,0),q=x(b.radiusBottomLeftY,b.radiusBottomLeft,b.radiusBottomY,b.radiusLeftY,b.radiusBottom,b.radiusLeft,b.radiusY,b.radius,0),h=f/2,i=g/2,r="m",s=d,t=e,u=d-h+n,v=e-i,r+=s-u+","+(t-v),s=u,t=v,u=d+h-p,v=e-i,r+="l"+(s-u)+","+(t-v),s=u,t=v,u=d+h-p+.55*p,v=e-i,r+="c"+(s-u)+","+(t-v),u=d+h,v=e-i+q-.55*q,r+=" "+(s-u)+","+(t-v),u=d+h,v=e-i+q,r+=" "+(s-u)+","+(t-v),s=u,t=v,u=d+h,v=e+i-k,r+="l"+(s-u)+","+(t-v),s=u,t=v,u=d+h,v=e+i-k+.55*k,r+="c"+(s-u)+","+(t-v),u=d+h-j+.55*j,v=e+i,r+=" "+(s-u)+","+(t-v),u=d+h-j,v=e+i,r+=" "+(s-u)+","+(t-v),s=u,t=v,u=d-h+l,v=e+i,r+="l"+(s-u)+","+(t-v),s=u,t=v,u=d-h+l-.55*l,v=e+i,r+="c"+(s-u)+","+(t-v),u=d-h,v=e+i-m+.55*m,r+=" "+(s-u)+","+(t-v),u=d-h,v=e+i-m,r+=" "+(s-u)+","+(t-v),s=u,t=v,u=d-h,v=e-i+o,r+="l"+(s-u)+","+(t-v),s=u,t=v,u=d-h,v=e-i+o-.55*o,r+="c"+(s-u)+","+(t-v),u=d-h+n-.55*n,v=e-i,r+=" "+(s-u)+","+(t-v),u=d-h+n,v=e-i,r+=" "+(s-u)+","+(t-v),r+="z",b.isLine=!1,b.data=r,b.shape?a.makeShape(b):a.makePath(b)},a.makeBezier=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p=a.Position.prototype.numberConvert,q=a.xtGet,r=a.point;if(b=a.safeObject(b),b.closed=!1,b.handleX=b.handleX||"left",b.handleY=b.handleY||"top",b.isLine=!0,c=a.Entity.prototype.getEntityCell(b),d=q(b.startX,0),e=q(b.startY,0),f=q(b.startControlX,0),g=q(b.startControlY,0),h=q(b.endControlX,0),i=q(b.endControlY,0),j=q(b.endX,0),k=q(b.endY,0),d=d.substring?p(d,c.actualWidth):d,e=e.substring?p(e,c.actualHeight):e,f=f.substring?p(f,c.actualWidth):f,g=g.substring?p(g,c.actualHeight):g,h=h.substring?p(h,c.actualWidth):h,i=i.substring?p(i,c.actualHeight):i,j=j.substring?p(j,c.actualWidth):j,k=k.substring?p(k,c.actualHeight):k,m=b.fixed||"none",b.fixed=!1,l="m0,0c"+(f-d)+","+(g-e)+" "+(h-d)+","+(i-e)+" "+(j-d)+","+(k-e),b.data=l,b.shape)n=a.makeShape(b);else switch(n=a.makePath(b),o=n.name.replace("~","_","g"),m){case"all":r[o+"_p1"].setToFixed(d,e),r[o+"_p2"].setToFixed(f,g),r[o+"_p3"].setToFixed(h,i),r[o+"_p4"].setToFixed(j,k);break;case"both":r[o+"_p1"].setToFixed(d,e),r[o+"_p4"].setToFixed(j,k);break;case"start":r[o+"_p1"].setToFixed(d,e);break;case"startControl":r[o+"_p2"].setToFixed(f,g);break;case"endControl":r[o+"_p3"].setToFixed(h,i);break;case"end":r[o+"_p4"].setToFixed(j,k)}return n},a.makeQuadratic=function(b){var c,d,e,f,g,h,i,j,k,l,m,n=a.Position.prototype.numberConvert,o=a.xtGet,p=a.point;if(b=a.safeObject(b),b.closed=!1,b.handleX=b.handleX||"left",b.handleY=b.handleY||"top",b.isLine=!0,c=a.Entity.prototype.getEntityCell(b),d=o(b.startX,0),e=o(b.startY,0),f=o(b.controlX,0),g=o(b.controlY,0),h=o(b.endX,0),i=o(b.endY,0),d=d.substring?n(d,c.actualWidth):d,e=e.substring?n(e,c.actualHeight):e,f=f.substring?n(f,c.actualWidth):f,g=g.substring?n(g,c.actualHeight):g,h=h.substring?n(h,c.actualWidth):h,i=i.substring?n(i,c.actualHeight):i,k=b.fixed||"none",j="m0,0q"+(f-d)+","+(g-e)+" "+(h-d)+","+(i-e),b.fixed=!1,b.data=j,b.shape)l=a.makeShape(b);else switch(l=a.makePath(b),m=l.name.replace("~","_","g"),k){case"all":p[m+"_p1"].setToFixed(d,e),p[m+"_p2"].setToFixed(f,g),p[m+"_p3"].setToFixed(h,i);break;case"both":p[m+"_p1"].setToFixed(d,e),p[m+"_p3"].setToFixed(h,i);break;case"start":p[m+"_p1"].setToFixed(d,e);break;case"control":p[m+"_p2"].setToFixed(f,g);break;case"end":p[m+"_p3"].setToFixed(h,i)}return l},a.makeLine=function(b){var c,d,e,f,g,h,i,j,k,l=a.Position.prototype.numberConvert,m=a.xtGet,n=a.point;if(b=a.safeObject(b),b.isLine=!0,b.closed=!1,b.handleX=b.handleX||"left",b.handleY=b.handleY||"top",c=a.Entity.prototype.getEntityCell(b),d=m(b.startX,0),e=m(b.startY,0),f=m(b.endX,0),g=m(b.endY,0),d=d.substring?l(d,c.actualWidth):d,e=e.substring?l(e,c.actualHeight):e,f=f.substring?l(f,c.actualWidth):f,g=g.substring?l(g,c.actualHeight):g,i=b.fixed||"none",h="m0,0 "+(f-d)+","+(g-e),b.fixed=!1,b.data=h,b.shape)j=a.makeShape(b);else switch(j=a.makePath(b),k=j.name.replace("~","_","g"),i){case"both":n[k+"_p1"].setToFixed(d,e),n[k+"_p2"].setToFixed(f,g);break;case"start":n[k+"_p1"].setToFixed(d,e);break;case"end":n[k+"_p2"].setToFixed(f,g)}return j},a.makeRegularShape=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=["c","s","q","t","l"],v=["s","t"],w=["c","s","q","t"],x=["c","q"],y=a.Position.prototype.numberConvert,z=a.xtGet,A=a.contains;if(b=a.safeObject(b),c=a.Entity.prototype.getEntityCell(b),s=b.sides,t=b.angle,a.xto(s,t)){b.closed=!0,b.isLine=!1,j=z(b.startControlX,b.controlX,0),k=z(b.startControlY,b.controlY,0),l=b.endControlX||0,m=b.endControlY||0,j=j.substring?y(j,c.actualWidth):j,k=k.substring?y(k,c.actualHeight):k,l=l.substring?y(l,c.actualWidth):l,m=m.substring?y(m,c.actualHeight):m,i=A(u,b.lineType)?b.lineType:"l",d=b.radius||20,e=s&&s.toFixed&&s>1?360/s:t&&t.toFixed&&t>0?t:4,f=0,g=0,o=a.requestVector(),p=a.requestVector(),q=a.requestVector(),r=a.requestVector(),o.x=p.x=d,o.y=p.y=0,q.x=j,q.y=k,r.x=l,r.y=m,n="m"+o.x.toFixed(1)+","+o.y.toFixed(1),n+=A(v,i)?"s"===i?"c":"q":i;do g++,f+=e,f%=360,h=f.toFixed(0),o.rotate(e),q.rotate(e),r.rotate(e),A(w,i)&&(1===g&&A(v,i)?n+="s"===i?q.x.toFixed(1)+","+q.y.toFixed(1)+" "+r.x.toFixed(1)+","+r.y.toFixed(1)+" ":q.x.toFixed(1)+","+q.y.toFixed(1)+" ":"s"===i?n+=r.x.toFixed(1)+","+r.y.toFixed(1)+" ":A(x,i)&&(n+=q.x.toFixed(1)+","+q.y.toFixed(1)+" ")),"c"===i&&(n+=r.x.toFixed(1)+","+r.y.toFixed(1)+" "),n+=(o.x-p.x).toFixed(1)+","+(o.y-p.y).toFixed(1)+" ",1===g&&A(v,i)&&(n+="s"===i?"s":"t"),p.set(o);while("0"!==h&&1e3>g);return n+="z",b.data=n,a.releaseVector(o),a.releaseVector(p),a.releaseVector(q),a.releaseVector(r),b.shape?a.makeShape(b):a.makePath(b)}return!1},a}(scrawl);