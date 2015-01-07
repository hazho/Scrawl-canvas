/*! scrawl-canvas 2015-01-07 */
if(window.scrawl&&window.scrawl.modules&&!window.scrawl.contains(window.scrawl.modules,"shape"))var scrawl=function(a){"use strict";return a.newShape=function(b){return new a.Shape(b)},a.Shape=function(b){return b=a.isa(b,"obj")?b:{},a.Entity.call(this,b),a.Position.prototype.set.call(this,b),this.isLine=a.isa(b.isLine,"bool")?b.isLine:!0,this.dataSet=a.xt(this.data)?this.buildDataSet(this.data):"",this.registerInLibrary(),a.pushUnique(a.group[this.group].entitys,this.name),this},a.Shape.prototype=Object.create(a.Entity.prototype),a.Shape.prototype.type="Shape",a.Shape.prototype.classname="entitynames",a.d.Shape={dataSet:!1,isLine:!0,method:"draw"},a.mergeInto(a.d.Shape,a.d.Entity),a.Shape.prototype.set=function(b){return a.Entity.prototype.set.call(this,b),b=a.isa(b,"obj")?b:{},a.xt(b.data)&&(this.dataSet=this.buildDataSet(this.data),this.offset.flag=!1),this},a.Shape.prototype.getPivotOffsetVector=function(){return this.isLine?a.Entity.prototype.getPivotOffsetVector.call(this):this.getCenteredPivotOffsetVector()},a.Shape.prototype.buildDataSet=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o=["M","L","C","Q","S","T"],p=[],q=[],r=[];p.length=0,d=999999,e=999999,f=-999999,g=-999999,h=this.start.x,i=this.start.y,j=b.match(/([A-Za-z][0-9. ,\-]*)/g);var s=function(a,b){d=d>a?a:d,e=e>b?b:e,f=a>f?a:f,g=b>g?b:g};for(k=0,l=j.length;l>k;k++){if(c=j[k][0],q=j[k].match(/(-?[0-9.]+\b)/g)){for(m=0,n=q.length;n>m;m++)q[m]=parseFloat(q[m]);switch(c){case"H":for(m=0,n=q.length;n>m;m++)h=q[m],s(h,i);break;case"V":for(m=0,n=q.length;n>m;m++)i=q[m],s(h,i);break;case"M":for(m=0,n=q.length;n>m;m+=2)h=q[m],i=q[m+1],s(h,i);break;case"L":case"T":for(m=0,n=q.length;n>m;m+=2)h=q[m],i=q[m+1],s(h,i);break;case"Q":case"S":for(m=0,n=q.length;n>m;m+=4)h=q[m+2],i=q[m+3],s(h,i);break;case"C":for(m=0,n=q.length;n>m;m+=6)h=q[m+4],i=q[m+5],s(h,i);break;case"h":for(m=0,n=q.length;n>m;m++)h+=q[m],s(h,i);break;case"v":for(m=0,n=q.length;n>m;m++)i+=q[m],s(h,i);break;case"m":case"l":case"t":for(m=0,n=q.length;n>m;m+=2)h+=q[m],i+=q[m+1],s(h,i);break;case"q":case"s":for(m=0,n=q.length;n>m;m+=4)h+=q[m+2],i+=q[m+3],s(h,i);break;case"c":for(m=0,n=q.length;n>m;m+=6)h+=q[m+4],i+=q[m+5],s(h,i)}}p.push({c:c,p:q})}for(k=0,l=p.length;l>k;k++){if(a.contains(o,p[k].c))for(m=0,n=p[k].p.length;n>m;m+=2)p[k].p[m]-=d,p[k].p[m+1]-=e;if("H"===p[k].c)for(m=0,n=p[k].p.length;n>m;m++)p[k].p[m]-=d;if("V"===p[k].c)for(m=0,n=p[k].p.length;n>m;m++)p[k].p[m]-=e}for(this.width=f-d,this.height=g-e,k=0,l=p.length;l>k;k++)r.push(p[k]);return r},a.Shape.prototype.doOutline=function(b,c){return a.cell[c].setEngine(this),!this.dataSet&&this.data&&this.buildDataSet(this.data),this.completeOutline(b,c)},a.Shape.prototype.completeOutline=function(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p=["M"],q=["C","c","S","s"],r=["Q","q","T","t"];if(this.dataSet)for(h=this.prepareStamp(),i=0,j=0,k=0,l=0,this.rotateCell(b,c),b.translate(h.x,h.y),b.beginPath(),a.contains(p,this.dataSet[0].c)||b.moveTo(i,j),d=0,e=this.dataSet.length;e>d;d++)switch(m=this.dataSet[d],m.c){case"M":for(i=m.p[0],j=m.p[1],k=i,l=j,b.moveTo(i*this.scale,j*this.scale),f=2,g=m.p.length;g>f;f+=2)i=m.p[f],j=m.p[f+1],k=i,l=j,b.lineTo(i*this.scale,j*this.scale);break;case"m":for(i+=m.p[0],j+=m.p[1],k=i,l=j,b.moveTo(i*this.scale,j*this.scale),f=2,g=m.p.length;g>f;f+=2)i+=m.p[f],j+=m.p[f+1],k=i,l=j,b.lineTo(i*this.scale,j*this.scale);break;case"Z":case"z":b.closePath();break;case"L":for(f=0,g=m.p.length;g>f;f+=2)i=m.p[f],j=m.p[f+1],k=i,l=j,b.lineTo(i*this.scale,j*this.scale);break;case"l":for(f=0,g=m.p.length;g>f;f+=2)i+=m.p[f],j+=m.p[f+1],k=i,l=j,b.lineTo(i*this.scale,j*this.scale);break;case"H":for(f=0,g=m.p.length;g>f;f++)i=m.p[f],k=i,b.lineTo(i*this.scale,j*this.scale);break;case"h":for(f=0,g=m.p.length;g>f;f++)i+=m.p[f],k=i,b.lineTo(i*this.scale,j*this.scale);break;case"V":for(f=0,g=m.p.length;g>f;f++)j=m.p[f],l=j,b.lineTo(i*this.scale,j*this.scale);break;case"v":for(f=0,g=m.p.length;g>f;f++)j+=m.p[f],l=j,b.lineTo(i*this.scale,j*this.scale);break;case"C":for(f=0,g=m.p.length;g>f;f+=6)b.bezierCurveTo(m.p[f]*this.scale,m.p[f+1]*this.scale,m.p[f+2]*this.scale,m.p[f+3]*this.scale,m.p[f+4]*this.scale,m.p[f+5]*this.scale),k=m.p[f+2],l=m.p[f+3],i=m.p[f+4],j=m.p[f+5];break;case"c":for(f=0,g=m.p.length;g>f;f+=6)b.bezierCurveTo((i+m.p[f])*this.scale,(j+m.p[f+1])*this.scale,(i+m.p[f+2])*this.scale,(j+m.p[f+3])*this.scale,(i+m.p[f+4])*this.scale,(j+m.p[f+5])*this.scale),k=i+m.p[f+2],l=j+m.p[f+3],i+=m.p[f+4],j+=m.p[f+5];break;case"S":for(f=0,g=m.p.length;g>f;f+=4)d>0&&a.contains(q,this.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.bezierCurveTo(n*this.scale,o*this.scale,m.p[f]*this.scale,m.p[f+1]*this.scale,m.p[f+2]*this.scale,m.p[f+3]*this.scale),k=m.p[f],l=m.p[f+1],i=m.p[f+2],j=m.p[f+3];break;case"s":for(f=0,g=m.p.length;g>f;f+=4)d>0&&a.contains(q,this.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.bezierCurveTo(n*this.scale,o*this.scale,(i+m.p[f])*this.scale,(j+m.p[f+1])*this.scale,(i+m.p[f+2])*this.scale,(j+m.p[f+3])*this.scale),k=i+m.p[f],l=j+m.p[f+1],i+=m.p[f+2],j+=m.p[f+3];break;case"Q":for(f=0,g=m.p.length;g>f;f+=4)b.quadraticCurveTo(m.p[f]*this.scale,m.p[f+1]*this.scale,m.p[f+2]*this.scale,m.p[f+3]*this.scale),k=m.p[f],l=m.p[f+1],i=m.p[f+2],j=m.p[f+3];break;case"q":for(f=0,g=m.p.length;g>f;f+=4)b.quadraticCurveTo((i+m.p[f])*this.scale,(j+m.p[f+1])*this.scale,(i+m.p[f+2])*this.scale,(j+m.p[f+3])*this.scale),k=i+m.p[f],l=j+m.p[f+1],i+=m.p[f+2],j+=m.p[f+3];break;case"T":for(f=0,g=m.p.length;g>f;f+=2)d>0&&a.contains(r,this.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.quadraticCurveTo(n*this.scale,o*this.scale,m.p[f]*this.scale,m.p[f+1]*this.scale),k=n,l=o,i=m.p[f],j=m.p[f+1];break;case"t":for(f=0,g=m.p.length;g>f;f+=2)d>0&&a.contains(r,this.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.quadraticCurveTo(n*this.scale,o*this.scale,(i+m.p[f])*this.scale,(j+m.p[f+1])*this.scale),k=n,l=o,i+=m.p[f],j+=m.p[f+1]}return this},a.Shape.prototype.clip=function(a,b){return a.save(),this.doOutline(a,b),a.clip(),this},a.Shape.prototype.clear=function(b,c){return c=a.cell[c],this.clip(b,c),b.clearRect(0,0,c.get("actualWidth"),c.get(".actualHeight")),b.restore(),this},a.Shape.prototype.clearWithBackground=function(b,d){return d=a.cell[d],this.clip(b,d),b.fillStyle=c.backgroundColor,b.fillRect(0,0,d.get("actualWidth"),d.get("actualHeight")),b.fillStyle=a.ctx[d].get("fillStyle"),b.restore(),this},a.Shape.prototype.draw=function(a,b){return this.doOutline(a,b),a.stroke(),this},a.Shape.prototype.fill=function(b,c){return this.doOutline(b,c),b.fill(a.ctx[this.context].get("winding")),this},a.Shape.prototype.drawFill=function(b,c){return this.doOutline(b,c),b.stroke(),this.clearShadow(b,c),b.fill(a.ctx[this.context].get("winding")),this},a.Shape.prototype.fillDraw=function(b,c){return this.doOutline(b,c),b.fill(a.ctx[this.context].get("winding")),this.clearShadow(b,c),b.stroke(),this},a.Shape.prototype.sinkInto=function(b,c){return this.doOutline(b,c),b.fill(a.ctx[this.context].get("winding")),b.stroke(),this},a.Shape.prototype.floatOver=function(b,c){return this.doOutline(b,c),b.stroke(),b.fill(a.ctx[this.context].get("winding")),this},a.Shape.prototype.none=function(a,b){return this.doOutline(a,b),this},a.Shape.prototype.checkHit=function(b){var c,d,e,f,g;for(b=a.isa(b,"obj")?b:{},c=a.xt(b.tests)?[].concat(b.tests):[b.x||!1,b.y||!1],d=!1,e=a.ctx[this.context].winding,a.cvx.mozFillRule=e,a.cvx.msFillRule=e,this.completeOutline(a.cvx,a.group[this.group].cell),f=0,g=c.length;g>f;f+=2)if(d=a.cvx.isPointInPath(c[f],c[f+1])){b.x=c[f],b.y=c[f+1];break}return d?b:!1},a.Shape.prototype.buildCollisionVectors=function(b){var c,d,e,f,g,h;if(this.isLine)a.Entity.prototype.buildCollisionVectors.call(this,b);else for(e=a.xt(b)?this.parseCollisionPoints(b):this.collisionPoints,f=this.getOffsetStartVector().reverse(),g=this.width/2,h=this.height/2,this.collisionVectors.length=0,c=0,d=e.length;d>c;c++)if(a.isa(e[c],"str"))switch(e[c]){case"start":this.collisionVectors.push(0),this.collisionVectors.push(0);break;case"N":this.collisionVectors.push(-f.x),this.collisionVectors.push(-h-f.y);break;case"NE":this.collisionVectors.push(g-f.x),this.collisionVectors.push(-h-f.y);break;case"E":this.collisionVectors.push(g-f.x),this.collisionVectors.push(-f.y);break;case"SE":this.collisionVectors.push(g-f.x),this.collisionVectors.push(h-f.y);break;case"S":this.collisionVectors.push(-f.x),this.collisionVectors.push(h-f.y);break;case"SW":this.collisionVectors.push(-g-f.x),this.collisionVectors.push(h-f.y);break;case"W":this.collisionVectors.push(-g-f.x),this.collisionVectors.push(-f.y);break;case"NW":this.collisionVectors.push(-g-f.x),this.collisionVectors.push(-h-f.y);break;case"center":this.collisionVectors.push(-f.x),this.collisionVectors.push(-f.y)}else a.isa(e[c],"vector")&&(this.collisionVectors.push(e[c].x),this.collisionVectors.push(e[c].y));return this},a}(scrawl);