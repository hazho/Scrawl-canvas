/*! scrawl-canvas 2017-06-26 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"collisions"))var scrawl=function(a){"use strict";return a.buildFields=function(b){var c,d,e,f=a.cell;for(c=a.xt(b)?[].concat(b):[a.pad[a.work.currentPad].current],"all"===b&&(c=a.cellnames),d=0,e=c.length;e>d;d++)f[c[d]].buildField();return!0},a.Pad.prototype.buildFields=function(){for(var b=a.cell,c=this.cells,d=0,e=c.length;e>d;d++)b[c[d]].buildField();return this},a.Cell.prototype.collisionsCellInit=function(b){a.makeGroup({name:this.name+"_field",cell:this.name,visibility:!1}),b.field&&(a.group[this.name+"_field"].entitys=[].concat(b.field)),a.makeGroup({name:this.name+"_fence",cell:this.name,visibility:!1}),b.fence&&(a.group[this.name+"_fence"].entitys=[].concat(b.fence))},a.Cell.prototype.defs.fieldLabel="",a.Cell.prototype.buildField=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n;for(f=[],g=[],l=a.ctx[this.context],m=a.context[this.context],j=l.get("fillStyle"),m.fillStyle="rgba(0,0,0,1)",m.fillRect(0,0,this.actualWidth,this.actualHeight),m.fillStyle=j,f=a.group[this.name+"_field"].entitys,b=0,c=f.length;c>b;b++)h=a.entity[f[b]],n=a.ctx[h.context],i=n.fillStyle,k=n.strokeStyle,n.fillStyle="rgba(255,255,255,1)",n.strokeStyle="rgba(255,255,255,1)",h.forceStamp("fillDraw",this.name),n.fillStyle=i,n.strokeStyle=k;for(g=a.group[this.name+"_fence"].entitys,d=0,e=g.length;e>d;d++)h=a.entity[g[d]],n=a.ctx[h.context],i=n.fillStyle,k=n.strokeStyle,n.fillStyle="rgba(0,0,0,1)",n.strokeStyle="rgba(0,0,0,1)",h.forceStamp("fillDraw",this.name),n.fillStyle=i,n.strokeStyle=k;return this.set({fieldLabel:this.getImageData({name:"field"})}),this},a.Cell.prototype.checkFieldAt=function(b){var c,d,e,f,g,h,i,j,k,l,m,n=a.isBetween;for(b=a.safeObject(b),e=b.channel||"anycolor",f=b.test||0,i=b.coordinates?b.coordinates:[b.x||0,b.y||0],l=this.get("fieldLabel"),k=a.imageData[l],c=0,d=i.length;d>c;c+=2){if(g=Math.round(i[c]),h=Math.round(i[c+1]),!n(g,0,k.width,!0)||!n(h,0,k.height,!0))return!1;if(j=4*(h*k.width+g),m=this.checkFieldAtActions[e](k.data,j,f,b,g,h))return m}return!0},a.Cell.prototype.checkFieldAtActions={red:function(a,b,c,d,e,f){return a[b]<=c?(d.x=e,d.y=f,d):!1},green:function(a,b,c,d,e,f){return a[b+1]<=c?(d.x=e,d.y=f,d):!1},blue:function(a,b,c,d,e,f){return a[b+2]<=c?(d.x=e,d.y=f,d):!1},alpha:function(a,b,c,d,e,f){return a[b+3]<=c?(d.x=e,d.y=f,d):!1},anycolor:function(a,b,c,d,e,f){return a[b]<=c||a[b+1]<=c||a[b+2]<=c?(d.x=e,d.y=f,d):!1}},a.Group.prototype.getEntitysCollidingWith=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o=a.entity,p=this.entitys,q=this.regionRadius,r=[],s=[],t={tests:[]},u=["Block","Phrase","Picture","Path","Shape","Wheel","Frame"];for(g=b.substring?o[b]:b,n=g.getCollisionPoints(),e=0,f=p.length;f>e;e++)h=o[p[e]],r[h.name]=h.getCollisionPoints();if(a.contains(u,g.type)){for(i=a.requestVector(),j=a.requestVector(),s.length=0,c=0,d=p.length;d>c;c++)if(h=o[p[c]],g.name!==h.name&&h.visibility){if(q&&(k=i.set(g.currentStart),l=j.set(h.currentStart),m=k.vectorSubtract(l).getMagnitude(),m>q))continue;if(t.tests=n,h.checkHit(t)){s.push(h);continue}if(t.tests=r[h.name],g.checkHit(t)){s.push(h);continue}}return a.releaseVector(i),a.releaseVector(j),s.length?s:!1}return!1},a.Group.prototype.getInGroupEntityHits=function(){var b,c,d,e,f,g,h,i,j,k=[],l=a.entity,m=this.entitys,n=this.regionRadius,o=a.requestVector(),p=a.requestVector(),q={},r={tests:[]};for(k.length=0,d=0,e=m.length;e>d;d++)f=l[m[d]],q[f.name]=f.getCollisionPoints();for(d=0,e=m.length;e>d;d++)if(f=l[m[d]],f.visibility)for(b=d+1,c=m.length;c>b;b++)if(g=l[m[b]],g.visibility){if(n&&(h=o.set(f.currentStart),i=p.set(g.currentStart),j=h.vectorSubtract(i).getMagnitude(),j>n))continue;if(r.tests=q[f.name],g.checkHit(r)){k.push([f.name,g.name]);continue}if(r.tests=q[g.name],f.checkHit(r)){k.push([f.name,g.name]);continue}}return a.releaseVector(o),a.releaseVector(p),k},a.Group.prototype.getBetweenGroupEntityHits=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o=[],p=a.xt,q=a.entity,r=this.entitys,s=this.regionRadius,t={tests:[]},u={};if(p(b)){if(j=a.requestVector(),k=a.requestVector(),b.substring){if(!a.group[b])return!1;b=a.group[b]}else if(!p(b.type)||"Group"!==b.type)return!1;for(i=b.entitys,o.length=0,e=0,f=r.length;f>e;e++)g=q[r[e]],u[g.name]=g.getCollisionPoints();for(e=0,f=i.length;f>e;e++)g=q[i[e]],u[g.name]=g.getCollisionPoints();for(e=0,f=r.length;f>e;e++)if(g=q[r[e]],g.visibility)for(c=0,d=i.length;d>c;c++)if(h=q[i[c]],h.visibility){if(s&&(l=j.set(g.currentStart),m=k.set(h.currentStart),n=l.vectorSubtract(m).getMagnitude(),n>s))continue;if(t.tests=u[g.name],h.checkHit(t)){o.push([g.name,h.name]);continue}if(t.tests=u[h.name],g.checkHit(t)){o.push([g.name,h.name]);continue}}return a.releaseVector(j),a.releaseVector(k),o}return!1},a.Group.prototype.getFieldEntityHits=function(b){var c,d,e,f=a.entity,g=this.entitys,h=a.isa_bool,i=[];for(b=a.xt(b)?b:this.cell,i.length=0,c=0,d=g.length;d>c;c++)e=f[g[c]].checkField(b),h(e)||i.push([g[c],e]);return i},a.Entity.prototype.defs.fieldChannel="anycolor",a.Entity.prototype.defs.fieldTest=0,a.Entity.prototype.defs.collisionVectors=[],a.Entity.prototype.defs.collisionPoints=[],a.Entity.prototype.defs.collisionArray=[],a.xt(a.Block)&&a.mergeInto(a.Block.prototype.defs,a.Entity.prototype.defs),a.xt(a.Shape)&&a.mergeInto(a.Shape.prototype.defs,a.Entity.prototype.defs),a.xt(a.Wheel)&&a.mergeInto(a.Wheel.prototype.defs,a.Entity.prototype.defs),a.xt(a.Picture)&&a.mergeInto(a.Picture.prototype.defs,a.Entity.prototype.defs),a.xt(a.Phrase)&&a.mergeInto(a.Phrase.prototype.defs,a.Entity.prototype.defs),a.xt(a.Path)&&a.mergeInto(a.Path.prototype.defs,a.Entity.prototype.defs),a.Group.prototype.resetCollisionPoints=function(){for(var b=a.entity,c=this.entitys,d=0,e=c.length;e>d;d++)b[c[d]].resetCollisionPoints();return this},a.Entity.prototype.collisionsEntityConstructor=function(b){var c=a.xt;c(b.field)&&this.addEntityToCellFields(),c(b.fence)&&this.addEntityToCellFences()},a.Entity.prototype.collisionsEntityRegisterInLibrary=function(){return this.collisionVectors=[],this.collisionArray=[],this.parseCollisionPoints(),this},a.Entity.prototype.collisionsEntitySet=function(b){var c=a.xt,d=a.xto;c(b.collisionPoints)&&this.parseCollisionPoints(),d(b.start,b.startX,b.startY,b.handle,b.handleX,b.handleY,b.scale,b.roll)&&(this.collisionArray.length=0),d(b.collisionPoints,b.width,b.height,b.radius,b.pasteWidth,b.pasteHeight)&&(this.collisionVectors.length=0),d(b.field,b.fence)&&(c(b.field)&&this.addEntityToCellFields(),c(b.fence)&&this.addEntityToCellFences())},a.Entity.prototype.resetCollisionPoints=function(){return this.collisionArray.length=0,this},a.Entity.prototype.collisionsEntitySetDelta=function(b){var c=a.xto;c(b.start,b.startX,b.startY,b.handle,b.handleX,b.handleY,b.scale,b.roll)&&(this.collisionArray.length=0),c(b.width,b.height,b.radius,b.pasteWidth,b.pasteHeight)&&(this.collisionVectors.length=0)},a.Entity.prototype.addEntityToCellFields=function(b){var c,d,e=a.cell,f=a.group;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)e[b[c]]&&f[b[c]+"_field"].addEntitysToGroup(this.name);return this},a.Entity.prototype.addEntityToCellFences=function(b){var c,d,e=a.cell,f=a.group;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)e[b[c]]&&f[b[c]+"_fence"].addEntitysToGroup(this.name);return this},a.Entity.prototype.removeEntityFromCellFields=function(b){var c,d,e=a.cell,f=a.group;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)e[b[c]]&&f[b[c]+"_field"].removeEntitysFromGroup(this.name);return this},a.Entity.prototype.removeEntityFromCellFences=function(b){var c,d,e=a.cell,f=a.group;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)e[b[c]]&&f[b[c]+"_fence"].removeEntitysFromGroup(this.name);return this},a.Entity.prototype.checkField=function(b){var c={coordinates:[],test:0,channel:""};return b=b?a.cell[b]:a.cell[a.group[this.group].cell],c.coordinates=this.getCollisionPoints(),c.test=this.get("fieldTest"),c.channel=this.get("fieldChannel"),b.checkFieldAt(c)},a.Entity.prototype.getCollisionPoints=function(){var b,c,d=a.requestVector(),e=this.collisionVectors,f=this.collisionArray,g=this.flipReverse,h=this.flipUpend,i=this.roll,j=this.scale,k=this.currentStart;if(0===e.length&&a.xt(this.collisionPoints)&&(this.buildCollisionVectors(),f.length=0),0===f.length)for(b=0,c=e.length;c>b;b+=2)d.x=g?-e[b]:e[b],d.y=h?-e[b+1]:e[b+1],i&&d.rotate(i),1!==j&&d.scalarMultiply(j),d.vectorAdd(k),f.push(d.x),f.push(d.y);return a.releaseVector(d),f},a.Entity.prototype.buildCollisionVectors=function(){var b,c,d,e,f,g=a.xt,h=a.requestVector(),i=this.collisionVectors,j=this.collisionPoints,k=this.currentHandle;for(k.flag||this.updateCurrentHandle(),d=h.set(k).reverse(),g(this.localWidth)?(e=this.localWidth/this.scale||0,f=this.localHeight/this.scale||0):g(this.pasteData)?(e=this.pasteData.w/this.scale||0,f=this.pasteData.h/this.scale||0):(e=this.width||0,f=this.height||0),this.collisionVectors.length=0,b=0,c=j.length;c>b;b++)if(j[b].substring)switch(j[b]){case"start":i.push(0),i.push(0);break;case"N":i.push(e/2-d.x),i.push(-d.y);break;case"NE":i.push(e-d.x),i.push(-d.y);break;case"E":i.push(e-d.x),i.push(f/2-d.y);break;case"SE":i.push(e-d.x),i.push(f-d.y);break;case"S":i.push(e/2-d.x),i.push(f-d.y);break;case"SW":i.push(-d.x),i.push(f-d.y);break;case"W":i.push(-d.x),i.push(f/2-d.y);break;case"NW":i.push(-d.x),i.push(-d.y);break;case"center":i.push(e/2-d.x),i.push(f/2-d.y)}else a.isa_vector(j[b])&&(i.push(j[b].x),i.push(j[b].y));return a.releaseVector(h),this},a.Entity.prototype.parseCollisionPoints=function(){var b,c,d,e,f,g=[],h=a.pushUnique;if(this.collisionPoints){for(this.collisionPoints=Array.isArray(this.collisionPoints)?this.collisionPoints:[this.collisionPoints],f=this.collisionPoints,g.length=0,d=0,e=f.length;e>d;d++)g.push(f[d]);if(f.length=0,a.xt(g))for(b=0,c=g.length;c>b;b++)if(g[b].substring)switch(g[b].toLowerCase()){case"all":h(f,"N"),h(f,"NE"),h(f,"E"),h(f,"SE"),h(f,"S"),h(f,"SW"),h(f,"W"),h(f,"NW"),h(f,"start"),h(f,"center");break;case"corners":h(f,"NE"),h(f,"SE"),h(f,"SW"),h(f,"NW");break;case"edges":h(f,"N"),h(f,"E"),h(f,"S"),h(f,"W");break;case"perimeter":h(f,"N"),h(f,"NE"),h(f,"E"),h(f,"SE"),h(f,"S"),h(f,"SW"),h(f,"W"),h(f,"NW");break;case"north":case"n":h(f,"N");break;case"northeast":case"ne":h(f,"NE");break;case"east":case"e":h(f,"E");break;case"southeast":case"se":h(f,"SE");break;case"south":case"s":h(f,"S");break;case"southwest":case"sw":h(f,"SW");break;case"west":case"w":h(f,"W");break;case"northwest":case"nw":h(f,"NW");break;case"start":h(f,"start");break;case"center":h(f,"center")}else g[b].toFixed?f.push(g[b]):a.isa_vector(g[b])&&f.push(g[b])}return f?f:[]},a}(scrawl);