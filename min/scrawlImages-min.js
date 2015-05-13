/*! scrawl-canvas 2015-05-13 */
if(window.scrawl&&window.scrawl.modules&&!window.scrawl.contains(window.scrawl.modules,"images"))var scrawl=function(a){"use strict";return a.newPattern=function(b){return a.makePattern(b)},a.newPicture=function(b){return a.makePicture(b)},a.makePattern=function(b){return new a.Pattern(b)},a.makePicture=function(b){return new a.Picture(b)},a.Entity.prototype.convertToPicture=function(b){var c,d,e;return b=a.safeObject(b),d=a.cell[a.group[this.group].cell],e=a.context[a.group[this.group].cell],c=a.prepareConvert(d,e,this),b.name=b.name||this.name+"_picture",b.group=b.group||this.group,b.convert&&a.deleteEntity([this.name]),a.doConvert(c,b)},a.Group.prototype.convertGroupToPicture=function(b){var c,d,e;return b=a.safeObject(b),this.entitys.length>0?(d=a.cell[this.cell],e=a.context[this.cell],c=a.prepareConvert(d,e,this),b.name=b.name||this.name+"_entity",b.group=b.group||this.name,b.convert&&a.deleteEntity(this.entitys),a.doConvert(c,b)):!1},a.prepareConvert=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;for(f=a.actualWidth,g=0,h=a.actualHeight,i=0,a.clear(),c.stamp(null,a.name),d=b.getImageData(0,0,a.actualWidth,a.actualHeight),e=d.data,k=0,l=a.actualHeight;l>k;k++)for(m=0,n=a.actualWidth;n>m;m++)j=4*(k*a.actualWidth+m)+3,e[j]>0&&(h=h>k?k:h,i=k>i?k:i,f=f>m?m:f,g=m>g?m:g);return d=b.getImageData(f,h,g-f+1,i-h+1),a.clear(),d},a.doConvert=function(b,c){return a.imageCanvas.width=b.width,a.imageCanvas.height=b.height,a.imageCvx.putImageData(b,0,0),c.url=a.imageCanvas.toDataURL(),c.width=b.width,c.height=b.height,b=a.makeImage(c),a.makePicture(c)},a.Pattern=function(b){var c;return a.isa(b,"obj")&&a.xt(b.url)&&!a.xt(b.dynamic)?(b.dynamic=!0,c=a.makeImage(b),b.source=c.name,a.makePattern(b)):(b=a.safeObject(b),a.Base.call(this,b),a.Base.prototype.set.call(this,b),this.repeat=b.repeat||"repeat",this.sourceType=this.getSourceType(),a.design[this.name]=this,a.pushUnique(a.designnames,this.name),this.makeDesign(),this)},a.Pattern.prototype=Object.create(a.Base.prototype),a.Pattern.prototype.type="Pattern",a.Pattern.prototype.classname="designnames",a.d.Pattern={repeat:"repeat",source:"",autoUpdate:!1,callback:!1},a.mergeInto(a.d.Pattern,a.d.Base),a.Pattern.prototype.getSourceType=function(){return a.contains(a.imagenames,this.source)?"image":a.contains(a.cellnames,this.source)?"cell":a.contains(a.videonames,this.source)?"video":!1},a.Pattern.prototype.set=function(b){return a.Base.prototype.set.call(this,b),this.sourceType=this.getSourceType(),this.makeDesign(),this},a.Pattern.prototype.getData=function(b,c){return this.sourceType||(this.sourceType=this.getSourceType(),this.makeDesign(b,c)),a.xt(a.dsn[this.name])?a.dsn[this.name]:"rgba(0,0,0,0)"},a.Pattern.prototype.makeDesign=function(b,c){var d,e;if(c=a.xtGet(c,this.cell),e=a.context[c],a.xt(e))switch(this.sourceType){case"video":scrawl.xt(a.asset[this.source])&&(d=a.video[this.source].api,a.dsn[this.name]=d.readyState>1?e.createPattern(a.asset[this.source],this.repeat):void 0);break;case"cell":scrawl.xt(a.canvas[this.source])&&(a.dsn[this.name]=e.createPattern(a.canvas[this.source],this.repeat));break;case"image":scrawl.xt(a.asset[this.source])&&(a.dsn[this.name]=e.createPattern(a.asset[this.source],this.repeat))}return this},a.Pattern.prototype.remove=function(){return delete a.dsn[this.name],delete a.design[this.name],a.removeItem(a.designnames,this.name),!0},a.Pattern.prototype.update=function(a,b){return this.makeDesign(a,b)},a.Picture=function(b){var c,d,e;return a.isa(b,"obj")&&a.xt(b.url)&&!a.xt(b.dynamic)?(b.dynamic=!0,c=a.makeImage(b),b.source=c.name,a.makePicture(b)):(b=a.safeObject(b),a.xt(b.source)&&(e=a.xtGet(a.image[b.source],a.video[b.source],a.cell[b.source],!1))?(a.Entity.call(this,b),d=a.safeObject(b.paste),this.start.x=a.xtGet(b.pasteX,d.x,this.start.x),this.start.y=a.xtGet(b.pasteY,d.y,this.start.y),this.copyWidth=a.xtGetTrue(b.copyWidth,e.actualWidth,e.width,"100%"),this.copyHeight=a.xtGetTrue(b.copyHeight,e.actualHeight,e.height,"100%"),this.width=a.xtGet(b.pasteWidth,b.width,this.copyWidth),this.height=a.xtGet(b.pasteHeight,b.height,this.copyHeight),a.Position.prototype.set.call(this,b),this.source=b.source,this.imageType=this.sourceImage(),d=a.safeObject(b.copy),this.copy=a.makeVector({x:a.xtGet(b.copyX,d.x,0),y:a.xtGet(b.copyY,d.y,0),name:this.type+"."+this.name+".copy"}),this.work.copy=a.makeVector({name:this.type+"."+this.name+".work.copy"}),this.registerInLibrary(),this.copyData={},this.pasteData={},this.setCopy(),this.setPaste(),this):!1)},a.Picture.prototype=Object.create(a.Entity.prototype),a.Picture.prototype.type="Picture",a.Picture.prototype.classname="entitynames",a.d.Picture={source:"",imageData:"",imageDataChannel:"alpha",animation:"",imageType:"",checkHitUsingImageData:!1,copy:!1,copyWidth:300,copyHeight:150,copyData:!1,pasteData:!1,callback:!1},a.mergeInto(a.d.Picture,a.d.Entity),a.Picture.prototype.get=function(b){return a.contains(a.animKeys,b)?a.spriteanimation[this.animation].get(b):a.Entity.prototype.get.call(this,b)},a.Picture.prototype.set=function(b){var c;return a.Entity.prototype.set.call(this,b),a.xto(b.paste,b.pasteX,b.pasteY)&&(c=a.safeObject(b.paste),this.start.x=a.xtGet(b.pasteX,c.x,this.start.x),this.start.y=a.xtGet(b.pasteY,c.y,this.start.y)),a.xt(b.pasteWidth)&&(this.width=a.xtGet(b.pasteWidth,this.width)),a.xt(b.pasteHeight)&&(this.height=a.xtGet(b.pasteHeight,this.height)),a.xto(b.copy,b.copyX,b.copyY)&&(c=a.safeObject(b.copy),this.copy.x=a.xtGet(b.copyX,c.x,this.copy.x),this.copy.y=a.xtGet(b.copyY,c.y,this.copy.y)),a.xt(b.copyWidth)&&(this.copyWidth=a.xtGet(b.copyWidth,this.copyWidth)),a.xt(b.copyHeight)&&(this.copyHeight=a.xtGet(b.copyHeight,this.copyHeight)),a.xto(b.start,b.startX,b.startY,b.paste,b.pasteX,b.pasteY,b.pasteWidth,b.pasteHeight,b.width,b.height,b.scale)&&this.setPaste(),a.xto(b.copy,b.copyX,b.copyY,b.copyWidth,b.copyHeight,b.width,b.height)&&this.setCopy(),a.xt(this.animation)&&a.spriteanimation[this.animation].set(b),this},a.Picture.prototype.setDelta=function(b){var c,d,e,f,g;return a.Entity.prototype.setDelta.call(this,b),b=a.safeObject(b),a.xto(b.paste,b.pasteX,b.pasteY)&&(c=a.safeObject(b.paste),d=a.xtGet(b.pasteX,c.x,0),e=a.xtGet(b.pasteY,c.y,0),this.start.x=a.isa(this.start.x,"num")?this.start.x+d:a.addPercentages(this.start.x,d),this.start.y=a.isa(this.start.y,"num")?this.start.y+e:a.addPercentages(this.start.y,e)),a.xto(b.pasteWidth,b.width)&&(f=a.xtGet(b.pasteWidth,b.width),this.width=a.isa(this.width,"num")?this.width+f:a.addPercentages(this.width,f)),a.xto(b.pasteHeight,b.height)&&(g=a.xtGet(b.pasteHeight,b.height),this.height=a.isa(this.height,"num")?this.height+g:a.addPercentages(this.height,g)),a.xto(b.copy,b.copyX,b.copyY)&&(c=a.safeObject(b.copy),d=a.xtGet(b.copyX,c.x,0),e=a.xtGet(b.copyY,c.y,0),this.copy.x=a.isa(this.copy.x,"num")?this.copy.x+d:a.addPercentages(this.copy.x,d),this.copy.y=a.isa(this.copy.y,"num")?this.copy.y+e:a.addPercentages(this.copy.y,e)),a.xto(b.copyWidth,b.width)&&(f=a.xtGet(b.copyWidth,b.width),this.copyWidth=a.isa(this.copyWidth,"num")?this.copyWidth+f:a.addPercentages(this.copyWidth,f)),a.xto(b.copyHeight,b.height)&&(g=a.xtGet(b.copyHeight,b.height),this.copyHeight=a.isa(this.copyHeight,"num")?this.copyHeight+g:a.addPercentages(this.copyHeight,g)),a.xto(b.start,b.startX,b.startY,b.paste,b.pasteX,b.pasteY,b.pasteWidth,b.pasteHeight,b.width,b.height,b.scale)&&this.setPaste(),a.xto(b.copy,b.copyX,b.copyY,b.copyWidth,b.copyHeight,b.width,b.height)&&this.setCopy(),this},a.Picture.prototype.setCopy=function(){var b,c;switch(this.imageType){case"canvas":b=a.cell[this.source].actualWidth,c=a.cell[this.source].actualHeight;break;case"video":b=a.video[this.source].width,c=a.video[this.source].height;break;case"img":b=a.image[this.source].width,c=a.image[this.source].height}return"animation"!==this.imageType&&(this.copyData.x=a.isa(this.copy.x,"str")?this.convertX(this.copy.x,b):this.copy.x,this.copyData.y=a.isa(this.copy.y,"str")?this.convertY(this.copy.y,c):this.copy.y,a.isBetween(this.copyData.x,0,b-1,!0)||(this.copyData.x=this.copyData.x<0?0:b-1),a.isBetween(this.copyData.y,0,c-1,!0)||(this.copyData.y=this.copyData.y<0?0:c-1),this.copyData.w=a.isa(this.copyWidth,"str")?this.convertX(this.copyWidth,b):this.copyWidth,this.copyData.h=a.isa(this.copyHeight,"str")?this.convertY(this.copyHeight,c):this.copyHeight,a.isBetween(this.copyData.w,1,b,!0)||(this.copyData.w=this.copyData.w<1?1:b),a.isBetween(this.copyData.h,1,c,!0)||(this.copyData.h=this.copyData.h<1?1:c),this.copyData.x+this.copyData.w>b&&(this.copyData.x=b-this.copyData.w),this.copyData.y+this.copyData.h>c&&(this.copyData.y=c-this.copyData.h)),this.imageData=!1,this},a.Picture.prototype.setPaste=function(){var b=a.cell[a.group[this.group].cell];return this.pasteData.x=a.isa(this.start.x,"str")?this.convertX(this.start.x,b.actualWidth):this.start.x,this.pasteData.y=a.isa(this.start.y,"str")?this.convertY(this.start.y,b.actualHeight):this.start.y,this.pasteData.w=a.isa(this.width,"str")?this.convertX(this.width,b.actualWidth):this.width,this.pasteData.h=a.isa(this.height,"str")?this.convertY(this.height,b.actualHeight):this.height,this.pasteData.w*=this.scale,this.pasteData.h*=this.scale,this.pasteData.w<1&&(this.pasteData.w=1),this.pasteData.h<1&&(this.pasteData.h=1),this},a.Picture.prototype.clone=function(b){var c=a.Entity.prototype.clone.call(this,b);return b=a.safeObject(b),b.keepCopyDimensions||c.fitToImageSize(),c},a.Picture.prototype.fitToImageSize=function(){var b;return"img"===this.imageType&&(b=a.image[this.source],this.set({copyWidth:b.get("width"),copyHeight:b.get("height"),copyX:0,copyY:0})),this},a.Picture.prototype.sourceImage=function(){return a.contains(a.videonames,this.source)?"video":a.contains(a.imagenames,this.source)?a.contains(a.spriteanimationnames,this.animation)?"animation":"img":a.contains(a.cellnames,this.source)?"canvas":!1},a.Picture.prototype.clip=function(a,b){var c=this.prepareStamp();return this.rotateCell(a,b),a.beginPath(),a.rect(c.x,c.y,this.pasteData.w,this.pasteData.h),a.clip(),this},a.Picture.prototype.none=function(){return this.prepareStamp(),this},a.Picture.prototype.clear=function(a,b){var c=this.prepareStamp();return this.rotateCell(a,b),a.clearRect(c.x,c.y,this.pasteData.w,this.pasteData.h),this},a.Picture.prototype.clearWithBackground=function(b,c){var d=this.prepareStamp();return this.rotateCell(b,c),b.fillStyle=a.cell[c].backgroundColor,b.strokeStyle=a.cell[c].backgroundColor,b.globalAlpha=1,b.strokeRect(d.x,d.y,this.pasteData.w,this.pasteData.h),b.fillRect(d.x,d.y,this.pasteData.w,this.pasteData.h),b.fillStyle=a.ctx[c].fillStyle,b.strokeStyle=a.ctx[c].strokeStyle,b.globalAlpha=a.ctx[c].globalAlpha,this},a.Picture.prototype.draw=function(b,c){var d=this.prepareStamp();return this.rotateCell(b,c),a.cell[c].setEngine(this),b.strokeRect(d.x,d.y,this.pasteData.w,this.pasteData.h),this},a.Picture.prototype.fill=function(b,c){var d,e=this.getImage();return e&&(d=this.prepareStamp(),this.rotateCell(b,c),a.cell[c].setEngine(this),b.drawImage(e,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,d.x,d.y,this.pasteData.w,this.pasteData.h)),this},a.Picture.prototype.drawFill=function(b,c){var d,e=this.getImage();return e&&(d=this.prepareStamp(),this.rotateCell(b,c),a.cell[c].setEngine(this),b.strokeRect(d.x,d.y,this.pasteData.w,this.pasteData.h),this.clearShadow(b,c),b.drawImage(e,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,d.x,d.y,this.pasteData.w,this.pasteData.h)),this},a.Picture.prototype.fillDraw=function(b,c){var d,e=this.getImage();return e&&(d=this.prepareStamp(),this.rotateCell(b,c),a.cell[c].setEngine(this),b.drawImage(e,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,d.x,d.y,this.pasteData.w,this.pasteData.h),this.clearShadow(b,c),b.strokeRect(d.x,d.y,this.pasteData.w,this.pasteData.h)),this},a.Picture.prototype.sinkInto=function(b,c){var d,e=this.getImage();return e&&(d=this.prepareStamp(),this.rotateCell(b,c),a.cell[c].setEngine(this),b.drawImage(e,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,d.x,d.y,this.pasteData.w,this.pasteData.h),b.strokeRect(d.x,d.y,this.pasteData.w,this.pasteData.h)),this},a.Picture.prototype.floatOver=function(b,c){var d,e=this.getImage();return e&&(d=this.prepareStamp(),this.rotateCell(b,c),a.cell[c].setEngine(this),b.strokeRect(d.x,d.y,this.pasteData.w,this.pasteData.h),b.drawImage(e,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,d.x,d.y,this.pasteData.w,this.pasteData.h)),this},a.Picture.prototype.getImage=function(){var b;switch(this.imageType){case"img":return a.asset[this.source];case"animation":return b=a.spriteanimation[this.animation].getData(),this.copyData.x=b.x,this.copyData.y=b.y,this.copyData.w=b.w,this.copyData.h=b.h,a.asset[this.source];case"canvas":return a.canvas[this.source];case"video":return a.asset[this.source];default:return!1}},a.Picture.prototype.getImageData=function(b){var c;return b=a.xt(b)?b:"data",c=this.getImage(),c&&(a.imageCanvas.width=this.copyData.w,a.imageCanvas.height=this.copyData.h,a.imageCvx.drawImage(c,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,0,0,this.copyData.w,this.copyData.h),this.imageData=this.name+"_"+b,a.imageData[this.imageData]=a.imageCvx.getImageData(0,0,this.copyData.w,this.copyData.h)),this},a.Picture.prototype.getImageDataValue=function(b){var c,d,e;if(b=a.safeObject(b),a.workimg.v1.x=b.x||0,a.workimg.v1.y=b.y||0,a.workimg.v1.vectorSubtract(this.pasteData).rotate(-this.roll),a.workimg.v1.x=this.flipReverse?-a.workimg.v1.x:a.workimg.v1.x,a.workimg.v1.y=this.flipUpend?-a.workimg.v1.y:a.workimg.v1.y,a.workimg.v1.vectorSubtract(this.getPivotOffsetVector(this.handle)),a.workimg.v1.x=Math.round(a.workimg.v1.x*(this.copyData.w/this.pasteData.w)),a.workimg.v1.y=Math.round(a.workimg.v1.y*(this.copyData.h/this.pasteData.h)),this.imageData||this.getImageData(),c=a.imageData[this.imageData],e=4*(a.workimg.v1.y*c.width+a.workimg.v1.x),a.isBetween(a.workimg.v1.x,0,c.width-1,!0)&&a.isBetween(a.workimg.v1.y,0,c.height-1,!0))switch(d=c.data,b.channel||this.get("imageDataChannel")){case"red":return a.xt(d[e])?d[e]:!1;case"green":return a.xt(d[e+1])?d[e+1]:!1;case"blue":return a.xt(d[e+2])?d[e+2]:!1;case"color":return a.xta([d[e],d[e+1],d[e+2],d[e+3]])?"rgba("+d[e]+","+d[e+1]+","+d[e+2]+","+d[e+3]+")":!1;default:return a.xt(d[e+3])?d[e+3]:!1}return!1},a.Picture.prototype.checkHit=function(b){var c,d,e,f,g,h=[],i=[],j={tests:[]};for(b=a.safeObject(b),a.xt(b.tests)?h=b.tests:(h.length=0,h.push(b.x||0),h.push(b.y||0)),c=a.isa(b.test,"num")?b.test:0,f=0,g=h.length;g>f&&(e=null,j.tests.length=0,j.tests.push(h[f]),j.tests.push(h[f+1]),i=a.Entity.prototype.checkHit.call(this,j),this.checkHitUsingImageData?i&&(i.x=Math.floor(i.x),i.y=Math.floor(i.y),this.animation&&(this.imageData=!1),d=this.getImageDataValue(i),e="color"===this.get("imageDataChannel")?"rgba(0,0,0,0)"===d?!1:i:d>c?i:!1):e=i,!e);f+=2);return e?e:!1},a.Picture.prototype.dropEntity=function(b){return a.Entity.prototype.dropEntity.call(this,b),this.setPaste(),this},a}(scrawl);