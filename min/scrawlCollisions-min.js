/*! scrawl-canvas 2015-01-07 */
if(window.scrawl&&window.scrawl.modules&&!window.scrawl.contains(window.scrawl.modules,"collisions"))var scrawl=function(a){"use strict";return a.workcols={v1:a.newVector({name:"scrawl.workcols.v1"}),v2:a.newVector({name:"scrawl.workcols.v2"}),v3:a.newVector({name:"scrawl.workcols.v3"})},a.buildFields=function(b){var c,d,e;for(c=a.xt(b)?[].concat(b):[a.pad[a.currentPad].current],"all"===b&&(c=a.cellnames),d=0,e=c.length;e>d;d++)a.cell[c[d]].buildField();return!0},a.Pad.prototype.buildFields=function(){for(var b=0,c=this.cells.length;c>b;b++)a.cell[this.cells[b]].buildField();return this},a.Cell.prototype.collisionsCellInit=function(b){a.newGroup({name:this.name+"_field",cell:this.name,visibility:!1}),b.field&&(a.group[this.name+"_field"].entitys=[].concat(b.field)),a.newGroup({name:this.name+"_fence",cell:this.name,visibility:!1}),b.fence&&(a.group[this.name+"_fence"].entitys=[].concat(b.fence))},a.d.Cell.fieldLabel="",a.Cell.prototype.buildField=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n;for(f=[],g=[],l=a.ctx[this.context],m=a.context[this.context],j=l.get("fillStyle"),m.fillStyle="rgba(0,0,0,1)",m.fillRect(0,0,this.actualWidth,this.actualHeight),m.fillStyle=j,f=a.group[this.name+"_field"].entitys,b=0,c=f.length;c>b;b++)h=a.entity[f[b]],n=a.ctx[h.context],i=n.fillStyle,k=n.strokeStyle,n.fillStyle="rgba(255,255,255,1)",n.strokeStyle="rgba(255,255,255,1)",h.forceStamp("fillDraw",this.name),n.fillStyle=i,n.strokeStyle=k;for(g=a.group[this.name+"_fence"].entitys,d=0,e=g.length;e>d;d++)h=a.entity[g[d]],n=a.ctx[h.context],i=n.fillStyle,k=n.strokeStyle,n.fillStyle="rgba(0,0,0,1)",n.strokeStyle="rgba(0,0,0,1)",h.forceStamp("fillDraw",this.name),n.fillStyle=i,n.strokeStyle=k;return this.set({fieldLabel:this.getImageData({name:"field"})}),this},a.Cell.prototype.checkFieldAt=function(b){var c,d,e,f,g,h,i,j,k,l;for(b=a.safeObject(b),e=b.channel||"anycolor",f=b.test||0,i=b.coordinates?b.coordinates:[b.x||0,b.y||0],l=this.get("fieldLabel"),k=a.imageData[l],c=0,d=i.length;d>c;c+=2){if(g=Math.round(i[c]),h=Math.round(i[c+1]),!a.isBetween(g,0,k.width,!0)||!a.isBetween(h,0,k.height,!0))return!1;switch(j=4*(h*k.width+g),e){case"red":if(k.data[j]<=f)return b.x=g,b.y=h,b;break;case"green":if(k.data[j+1]<=f)return b.x=g,b.y=h,b;break;case"blue":if(k.data[j+2]<=f)return b.x=g,b.y=h,b;break;case"alpha":if(k.data[j+3]<=f)return b.x=g,b.y=h,b;break;default:if(k.data[j]<=f||k.data[j+1]<=f||k.data[j+2]<=f)return b.x=g,b.y=h,b}}return!0},a.Group.prototype.getEntitysCollidingWith=function(b){var c,d,e,f,g=[],h={tests:[]},i=["Block","Phrase","Picture","Path","Shape","Wheel"];if(e=a.isa(b,"str")?a.entity[b]:b,a.contains(i,e.type)){for(g.length=0,c=0,d=this.entitys.length;d>c;c++)if(f=a.entity[this.entitys[c]],e.name!==f.name&&f.visibility){if(h.tests=e.getCollisionPoints(),f.checkHit(h)){g.push(f);continue}if(h.tests=f.getCollisionPoints(),e.checkHit(h)){g.push(f);continue}}return g.length>0?g:!1}return!1},a.Group.prototype.getInGroupEntityHits=function(){var b,c,d,e,f,g,h,i,j,k=[],l={tests:[]};for(k.length=0,d=0,e=this.entitys.length;e>d;d++)if(f=a.entity[this.entitys[d]],f.visibility)for(b=d+1,c=this.entitys.length;c>b;b++)if(g=a.entity[this.entitys[b]],g.visibility){if(this.regionRadius&&(h=a.workcols.v1.set(f.start),i=a.workcols.v2.set(g.start),j=h.vectorSubtract(i).getMagnitude(),j>this.regionRadius))continue;if(l.tests=f.getCollisionPoints(),g.checkHit(l)){k.push([f.name,g.name]);continue}if(l.tests=g.getCollisionPoints(),f.checkHit(l)){k.push([f.name,g.name]);continue}}return k},a.Group.prototype.getBetweenGroupEntityHits=function(b){var c,d,e,f,g,h,i,j,k,l=[],m={tests:[]};if(a.xt(b)){if(a.isa(b,"str")){if(!a.group[b])return!1;b=a.group[b]}else if(!a.xt(b.type)||"Group"!==b.type)return!1;for(l.length=0,e=0,f=this.entitys.length;f>e;e++)if(g=a.entity[this.entitys[e]],g.visibility)for(c=0,d=b.entitys.length;d>c;c++)if(h=a.entity[b.entitys[c]],h.visibility){if(this.regionRadius&&(i=a.workcols.v1.set(g.start),j=a.workcols.v2.set(h.start),k=i.vectorSubtract(j).getMagnitude(),k>this.regionRadius))continue;if(m.tests=g.getCollisionPoints(),h.checkHit(m)){l.push([g.name,h.name]);continue}if(m.tests=h.getCollisionPoints(),g.checkHit(m)){l.push([g.name,h.name]);continue}}return l}return!1},a.Group.prototype.getFieldEntityHits=function(b){var c,d,e,f=[];for(b=a.xt(b)?b:this.cell,f.length=0,c=0,d=this.entitys.length;d>c;c++)e=a.entity[this.entitys[c]].checkField(b),a.isa(e,"bool")||f.push([this.entitys[c],e]);return f},a.d.Entity.fieldChannel="anycolor",a.d.Entity.fieldTest=0,a.d.Entity.collisionVectors=[],a.d.Entity.collisionPoints=[],a.d.Entity.collisionArray=[],a.xt(a.d.Block)&&a.mergeInto(a.d.Block,a.d.Entity),a.xt(a.d.Shape)&&a.mergeInto(a.d.Shape,a.d.Entity),a.xt(a.d.Wheel)&&a.mergeInto(a.d.Wheel,a.d.Entity),a.xt(a.d.Picture)&&a.mergeInto(a.d.Picture,a.d.Entity),a.xt(a.d.Phrase)&&a.mergeInto(a.d.Phrase,a.d.Entity),a.xt(a.d.Path)&&a.mergeInto(a.d.Path,a.d.Entity),a.Group.prototype.resetCollisionPoints=function(){for(var b=0,c=this.entitys.length;c>b;b++)a.entity[this.entitys[b]].resetCollisionPoints();return this},a.Entity.prototype.collisionsEntityConstructor=function(b){a.xt(b.field)&&this.addEntityToCellFields(),a.xt(b.fence)&&this.addEntityToCellFences()},a.Entity.prototype.collisionsEntityRegisterInLibrary=function(){return this.collisionVectors=[],this.collisionArray=[],this.parseCollisionPoints(),this},a.Entity.prototype.collisionsEntitySet=function(b){a.xt(b.collisionPoints)&&this.parseCollisionPoints(),a.xto(b.start,b.startX,b.startY,b.handle,b.handleX,b.handleY,b.scale,b.roll)&&(this.collisionArray.length=0),a.xto(b.collisionPoints,b.width,b.height,b.radius,b.pasteWidth,b.pasteHeight)&&(this.collisionVectors.length=0),a.xto(b.field,b.fence)&&(a.xt(b.field)&&this.addEntityToCellFields(),a.xt(b.fence)&&this.addEntityToCellFences())},a.Entity.prototype.resetCollisionPoints=function(){return this.collisionArray.length=0,this},a.Entity.prototype.collisionsEntitySetDelta=function(b){a.xto(b.start,b.startX,b.startY,b.handle,b.handleX,b.handleY,b.scale,b.roll)&&(this.collisionArray.length=0),a.xto(b.width,b.height,b.radius,b.pasteWidth,b.pasteHeight)&&(this.collisionVectors.length=0)},a.Entity.prototype.addEntityToCellFields=function(b){var c,d;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)a.cell[b[c]]&&a.group[b[c]+"_field"].addEntitysToGroup(this.name);return this},a.Entity.prototype.addEntityToCellFences=function(b){var c,d;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)a.cell[b[c]]&&a.group[b[c]+"_fence"].addEntitysToGroup(this.name);return this},a.Entity.prototype.removeEntityFromCellFields=function(b){var c,d;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)a.cell[b[c]]&&a.group[b[c]+"_field"].removeEntitysFromGroup(this.name);return this},a.Entity.prototype.removeEntityFromCellFences=function(b){var c,d;for(b=a.xt(b)?[].concat(b):[this.group],c=0,d=b.length;d>c;c++)a.cell[b[c]]&&a.group[b[c]+"_fence"].removeEntitysFromGroup(this.name);return this},a.Entity.prototype.checkField=function(b){var c={coordinates:[],test:0,channel:""};return b=b?a.cell[b]:a.cell[a.group[this.group].cell],c.coordinates=this.getCollisionPoints(),c.test=this.get("fieldTest"),c.channel=this.get("fieldChannel"),b.checkFieldAt(c)},a.Entity.prototype.getCollisionPoints=function(){var b,c;if(0===this.collisionVectors.length&&a.xt(this.collisionPoints)&&(this.buildCollisionVectors(),this.collisionArray.length=0),0===this.collisionArray.length)for(b=0,c=this.collisionVectors.length;c>b;b+=2)a.v.x=this.flipReverse?-this.collisionVectors[b]:this.collisionVectors[b],a.v.y=this.flipReverse?-this.collisionVectors[b+1]:this.collisionVectors[b+1],this.roll&&a.v.rotate(this.roll),1!==this.scale&&a.v.scalarMultiply(this.scale),a.v.vectorAdd(this.start),this.collisionArray.push(a.v.x),this.collisionArray.push(a.v.y);return this.collisionArray},a.Entity.prototype.buildCollisionVectors=function(){var b,c,d,e,f;for(d=this.getOffsetStartVector().reverse(),a.xt(this.localWidth)?(e=this.localWidth/this.scale||0,f=this.localHeight/this.scale||0):a.xt(this.pasteData)?(e=this.pasteData.w/this.scale||0,f=this.pasteData.h/this.scale||0):(e=this.width||0,f=this.height||0),this.collisionVectors.length=0,b=0,c=this.collisionPoints.length;c>b;b++)if(a.isa(this.collisionPoints[b],"str"))switch(this.collisionPoints[b]){case"start":this.collisionVectors.push(0),this.collisionVectors.push(0);break;case"N":this.collisionVectors.push(e/2-d.x),this.collisionVectors.push(-d.y);break;case"NE":this.collisionVectors.push(e-d.x),this.collisionVectors.push(-d.y);break;case"E":this.collisionVectors.push(e-d.x),this.collisionVectors.push(f/2-d.y);break;case"SE":this.collisionVectors.push(e-d.x),this.collisionVectors.push(f-d.y);break;case"S":this.collisionVectors.push(e/2-d.x),this.collisionVectors.push(f-d.y);break;case"SW":this.collisionVectors.push(-d.x),this.collisionVectors.push(f-d.y);break;case"W":this.collisionVectors.push(-d.x),this.collisionVectors.push(f/2-d.y);break;case"NW":this.collisionVectors.push(-d.x),this.collisionVectors.push(-d.y);break;case"center":this.collisionVectors.push(e/2-d.x),this.collisionVectors.push(f/2-d.y)}else a.isa(this.collisionPoints[b],"vector")&&(this.collisionVectors.push(this.collisionPoints[b].x),this.collisionVectors.push(this.collisionPoints[b].y));return this},a.Entity.prototype.parseCollisionPoints=function(){var b,c,d,e,f=[];for(this.collisionPoints=a.isa(this.collisionPoints,"arr")?this.collisionPoints:[this.collisionPoints],f.length=0,d=0,e=this.collisionPoints.length;e>d;d++)f.push(this.collisionPoints[d]);if(this.collisionPoints.length=0,a.xt(f))for(b=0,c=f.length;c>b;b++)if(a.isa(f[b],"str"))switch(f[b].toLowerCase()){case"all":a.pushUnique(this.collisionPoints,"N"),a.pushUnique(this.collisionPoints,"NE"),a.pushUnique(this.collisionPoints,"E"),a.pushUnique(this.collisionPoints,"SE"),a.pushUnique(this.collisionPoints,"S"),a.pushUnique(this.collisionPoints,"SW"),a.pushUnique(this.collisionPoints,"W"),a.pushUnique(this.collisionPoints,"NW"),a.pushUnique(this.collisionPoints,"start"),a.pushUnique(this.collisionPoints,"center");break;case"corners":a.pushUnique(this.collisionPoints,"NE"),a.pushUnique(this.collisionPoints,"SE"),a.pushUnique(this.collisionPoints,"SW"),a.pushUnique(this.collisionPoints,"NW");break;case"edges":a.pushUnique(this.collisionPoints,"N"),a.pushUnique(this.collisionPoints,"E"),a.pushUnique(this.collisionPoints,"S"),a.pushUnique(this.collisionPoints,"W");break;case"perimeter":a.pushUnique(this.collisionPoints,"N"),a.pushUnique(this.collisionPoints,"NE"),a.pushUnique(this.collisionPoints,"E"),a.pushUnique(this.collisionPoints,"SE"),a.pushUnique(this.collisionPoints,"S"),a.pushUnique(this.collisionPoints,"SW"),a.pushUnique(this.collisionPoints,"W"),a.pushUnique(this.collisionPoints,"NW");break;case"north":case"n":a.pushUnique(this.collisionPoints,"N");break;case"northeast":case"ne":a.pushUnique(this.collisionPoints,"NE");break;case"east":case"e":a.pushUnique(this.collisionPoints,"E");break;case"southeast":case"se":a.pushUnique(this.collisionPoints,"SE");break;case"south":case"s":a.pushUnique(this.collisionPoints,"S");break;case"southwest":case"sw":a.pushUnique(this.collisionPoints,"SW");break;case"west":case"w":a.pushUnique(this.collisionPoints,"W");break;case"northwest":case"nw":a.pushUnique(this.collisionPoints,"NW");break;case"start":a.pushUnique(this.collisionPoints,"start");break;case"center":a.pushUnique(this.collisionPoints,"center")}else a.isa(f[b],"num")?this.collisionPoints.push(f[b]):a.isa(f[b],"vector")&&this.collisionPoints.push(f[b]);return this.collisionPoints},a}(scrawl);