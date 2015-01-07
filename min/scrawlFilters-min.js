/*! scrawl-canvas 2015-01-07 */
if(window.scrawl&&window.scrawl.modules&&!window.scrawl.contains(window.scrawl.modules,"filters"))var scrawl=function(a){"use strict";return a.pushUnique(a.sectionlist,"filter"),a.pushUnique(a.nameslist,"filternames"),a.filterCanvas=document.createElement("canvas"),a.filterCanvas.id="filterHiddenCanvasElement",a.f.appendChild(a.filterCanvas),a.filterCvx=a.filterCanvas.getContext("2d"),a.d.Pad.filters=[],a.d.Cell.filters=[],a.d.Group.filters=[],a.d.Group.filterOnStroke=!1,a.d.Group.filterLevel="entity",a.d.Entity.filters=[],a.d.Entity.filterOnStroke=!1,a.d.Entity.filterLevel="entity",a.xt(a.d.Block)&&a.mergeInto(a.d.Block,a.d.Entity),a.xt(a.d.Shape)&&a.mergeInto(a.d.Shape,a.d.Entity),a.xt(a.d.Wheel)&&a.mergeInto(a.d.Wheel,a.d.Entity),a.xt(a.d.Picture)&&a.mergeInto(a.d.Picture,a.d.Entity),a.xt(a.d.Phrase)&&a.mergeInto(a.d.Phrase,a.d.Entity),a.xt(a.d.Path)&&a.mergeInto(a.d.Path,a.d.Entity),a.Pad.prototype.filtersPadInit=function(){this.filters=[]},a.Cell.prototype.filtersCellInit=function(){this.filters=[]},a.Group.prototype.filtersGroupInit=function(b){b=a.safeObject(b),this.filters=a.xt(b.filters)?b.filters:[],this.filterOnStroke=a.xtGet(b.filterOnStroke,!1),this.filterLevel=a.xtGet(b.filterLevel,"entity")},a.Entity.prototype.filtersEntityInit=function(b){b=a.safeObject(b),this.filters=a.xt(b.filters)?b.filters:[],this.filterOnStroke=a.xtGet(b.filterOnStroke,!1),this.filterLevel=a.xtGet(b.filterLevel,"entity")},a.newGreyscaleFilter=function(b){return new a.GreyscaleFilter(b)},a.newInvertFilter=function(b){return new a.InvertFilter(b)},a.newBrightnessFilter=function(b){return new a.BrightnessFilter(b)},a.newSaturationFilter=function(b){return new a.SaturationFilter(b)},a.newThresholdFilter=function(b){return new a.ThresholdFilter(b)},a.newChannelsFilter=function(b){return new a.ChannelsFilter(b)},a.newChannelStepFilter=function(b){return new a.ChannelStepFilter(b)},a.newTintFilter=function(b){return new a.TintFilter(b)},a.newSepiaFilter=function(b){return b.redInRed=.393,b.redInGreen=.349,b.redInBlue=.272,b.greenInRed=.769,b.greenInGreen=.686,b.greenInBlue=.534,b.blueInRed=.189,b.blueInGreen=.168,b.blueInBlue=.131,new a.TintFilter(b)},a.newMatrixFilter=function(b){return new a.MatrixFilter(b)},a.newSharpenFilter=function(b){return b.data=[0,-1,0,-1,5,-1,0,-1,0],new a.MatrixFilter(b)},a.newPixelateFilter=function(b){return new a.PixelateFilter(b)},a.newBlurFilter=function(b){return new a.BlurFilter(b)},a.newLeachFilter=function(b){return new a.LeachFilter(b)},a.newSeparateFilter=function(b){return new a.SeparateFilter(b)},a.newNoiseFilter=function(b){return new a.NoiseFilter(b)},a.Pad.prototype.compile=function(){var b,c,d;for(this.filters.length=0,this.sortCellsCompile(),c=0,d=this.cells.length;d>c;c++)b=a.cell[this.cells[c]],b.rendered&&b.compiled&&b.compile();return this},a.Pad.prototype.show=function(){var b,c,d,e,f;for(b=a.cell[this.display],c=a.cell[this.base],this.sortCellsShow(),e=0,f=this.cells.length;f>e;e++)d=a.cell[this.cells[e]],d.rendered&&d.shown&&c.copyCellToSelf(d);for(e=0,f=this.filters.length;f>e;e++)a.xt(a.entity[this.filters[e]])&&a.entity[this.filters[e]].stampFilter(a.context[c.name],c.name,!0),a.xt(a.group[this.filters[e]])&&a.group[this.filters[e]].stampFilter(a.context[c.name],c.name,!0);return b.copyCellToSelf(c,!0),this},a.Cell.prototype.compile=function(){var b,c,d;for(this.filters.length=0,this.groups.sort(function(b,c){return a.group[b].order-a.group[c].order}),c=0,d=this.groups.length;d>c;c++)b=a.group[this.groups[c]],b.get("visibility")&&b.stamp(!1,this.name);for(c=0,d=this.filters.length;d>c;c++)a.xt(a.entity[this.filters[c]])?a.entity[this.filters[c]].stampFilter(a.context[this.name],this.name,!0):a.xt(a.group[this.filters[c]])&&a.group[this.filters[c]].stampFilter(a.context[this.name],this.name,!0);return!0},a.Group.prototype.stampFilter=function(b,c,d){var e,f,g,h,i,j,k;if(d=a.xtGet(d,!1),this.filters.length>0){for(f=a.canvas[c],a.cv.width=f.width,a.cv.height=f.height,a.filterCanvas.width=f.width,a.filterCanvas.height=f.height,a.filterCvx.clearRect(0,0,f.width,f.height),j=0,k=this.entitys.length;k>j;j++){switch(h=a.entity[this.entitys[j]],i=h.filterOnStroke,h.filterOnStroke=this.filterOnStroke,a.cvx.save(),h.type){case"Phrase":e=h.stampFilterPhrase(b,c,d);break;case"Picture":e=h.stampFilterPicture(b,c,d);break;case"Wheel":e=h.stampFilterWheel(b,c,d);break;default:e=h.stampFilterDefault(b,c,d)}h.filterOnStroke=i,a.filterCvx.putImageData(e,0,0),a.cvx.restore()}if(e=a.filterCvx.getImageData(0,0,f.width,f.height))for(j=0,k=this.filters.length;k>j;j++)"pad"!==this.filterLevel||d?"cell"!==this.filterLevel||d?a.filter[this.filters[j]]&&(e=a.filter[this.filters[j]].add(e)):a.cell[this.cell].filters.push(this.name):a.pad[a.cell[this.cell].pad].filters.push(this.name);a.cvx.putImageData(e,0,0),g=b.globalCompositeOperation,b.globalCompositeOperation=a.filter[this.filters[this.filters.length-1]].composite,b.setTransform(1,0,0,1,0,0),b.drawImage(a.cv,0,0,f.width,f.height),b.globalCompositeOperation=g}},a.Entity.prototype.stampFilter=function(b,c,d){var e,f,g,h,i;if(d=a.xtGet(d,!1),this.filters.length>0){switch(f=a.canvas[c],a.cv.width=f.width,a.cv.height=f.height,a.cvx.save(),this.type){case"Phrase":e=this.stampFilterPhrase(b,c,d);break;case"Picture":e=this.stampFilterPicture(b,c,d);break;case"Wheel":e=this.stampFilterWheel(b,c,d);break;default:e=this.stampFilterDefault(b,c,d)}if(e){for(h=0,i=this.filters.length;i>h;h++)"pad"!==this.filterLevel||d?"cell"!==this.filterLevel||d?a.filter[this.filters[h]]&&(e=a.filter[this.filters[h]].add(e)):a.cell[a.group[this.group].cell].filters.push(this.name):a.pad[a.cell[a.group[this.group].cell].pad].filters.push(this.name);a.cvx.putImageData(e,0,0),g=b.globalCompositeOperation,b.globalCompositeOperation=a.filter[this.filters[this.filters.length-1]].composite,b.setTransform(1,0,0,1,0,0),b.drawImage(a.cv,0,0,f.width,f.height),b.globalCompositeOperation=g}a.cvx.restore()}},a.Entity.prototype.stampFilterPhrase=function(b,c){var d,e,f,g,h,i,j,k,l,m;if(e=a.canvas[c],d=a.ctx[this.context],a.cvx.font=d.font,a.cvx.fillStyle="rgb(0, 0, 0)",a.cvx.textAlign=d.textAlign,a.cvx.textBaseline=d.textBaseline,f=a.entity[this.path]&&"Path"===a.entity[this.path].type,this.pivot||!f||"phrase"===this.get("textAlongPath"))for(i=this.getOffset(),j=this.prepareStamp(),k=this.size*this.lineHeight*this.scale,this.rotateCell(a.cvx,a.cv),l=j.x+i.x,g=0,h=this.texts.length;h>g;g++)m=j.y+k*g+i.y,a.text[this.texts[g]].fill(a.cvx,c,l,m);else a.text[this.texts[0]].clipAlongPath();return a.cvx.setTransform(1,0,0,1,0,0),a.cvx.globalCompositeOperation="source-in",a.cvx.drawImage(e,0,0),a.cvx.globalCompositeOperation="source-over",a.cvx.getImageData(0,0,e.width,e.height)},a.Entity.prototype.stampFilterWheel=function(b,c){var d=a.canvas[c],e=a.ctx[this.context];return this.filterOnStroke?(a.cvx.lineWidth=e.lineWidth,a.cvx.shadowOffsetX=e.shadowOffsetX,a.cvx.shadowOffsetY=e.shadowOffsetY,a.cvx.shadowBlur=e.shadowBlur,a.cvx.lineJoin=e.lineJoin,a.cvx.lineCap=e.lineCap,a.cvx.miterLimit=e.miterLimit,a.cvx.lineDash=e.lineDash,a.cvx.lineDashOffset=e.lineDashOffset,a.cvx.globalAlpha=e.globalAlpha,this.buildPath(a.cvx,a.cv),a.cvx.stroke(),a.cvx.setTransform(1,0,0,1,0,0),a.cvx.globalCompositeOperation="source-in",a.cvx.drawImage(d,0,0),a.cvx.globalCompositeOperation="source-over"):(this.clip(a.cvx,c),a.cvx.setTransform(1,0,0,1,0,0),a.cvx.drawImage(d,0,0)),a.cvx.getImageData(0,0,d.width,d.height)},a.Entity.prototype.stampFilterPicture=function(b,c){var d,e,f;return d=a.canvas[c],e=this.getImage(),e?(f=this.prepareStamp(),this.rotateCell(a.cvx,a.cv),a.cvx.drawImage(e,this.copyData.x,this.copyData.y,this.copyData.w,this.copyData.h,f.x,f.y,this.pasteData.w,this.pasteData.h),a.cvx.setTransform(1,0,0,1,0,0),a.cvx.globalCompositeOperation="source-in",a.cvx.drawImage(d,0,0),a.cvx.globalCompositeOperation="source-over",a.cvx.getImageData(0,0,d.width,d.height)):!1},a.Entity.prototype.stampFilterDefault=function(b,c){var d=a.canvas[c];return this.clip(a.cvx,c),a.cvx.setTransform(1,0,0,1,0,0),a.cvx.drawImage(d,0,0),a.cvx.getImageData(0,0,d.width,d.height)},a.Filter=function(b){return b=a.safeObject(b),a.Base.call(this,b),this.alpha=a.xtGet(b.alpha,1),this.composite=a.xtGet(b.composite,"source-over"),this},a.Filter.prototype=Object.create(a.Base.prototype),a.Filter.prototype.type="Filter",a.Filter.prototype.classname="filternames",a.d.Filter={alpha:1,composite:"source-over"},a.mergeInto(a.d.Filter,a.d.Base),a.Filter.prototype.add=function(a){return a},a.Filter.prototype.cloneImageData=function(b){var c,d;return a.xt(b)&&a.xta(b.width,b.height)?(c=b.width,d=b.height,a.filterCanvas.width=c,a.filterCanvas.height=d,a.filterCvx.putImageData(b,0,0),a.filterCvx.getImageData(0,0,c,d)):!1},a.Filter.prototype.getAlpha=function(){var b=a.isa(this.alpha,"str")?parseFloat(this.alpha)/100:this.alpha;return b>=0&&1>=b?b:b>.5?1:0},a.GreyscaleFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.GreyscaleFilter.prototype=Object.create(a.Filter.prototype),a.GreyscaleFilter.prototype.type="GreyscaleFilter",a.GreyscaleFilter.prototype.classname="filternames",a.d.GreyscaleFilter={},a.mergeInto(a.d.GreyscaleFilter,a.d.Filter),a.GreyscaleFilter.prototype.add=function(a){var b,c,d,e,f,g;for(b=this.getAlpha(),c=a.data,f=0,g=c.length;g>f;f+=4)0!==c[f+3]&&(d=f,e=Math.floor(.2126*c[d]+.7152*c[++d]+.0722*c[++d]),d=f,c[d]=e,c[++d]=e,c[++d]=e,c[++d]*=b);return a},a.InvertFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.InvertFilter.prototype=Object.create(a.Filter.prototype),a.InvertFilter.prototype.type="InvertFilter",a.InvertFilter.prototype.classname="filternames",a.d.InvertFilter={},a.mergeInto(a.d.InvertFilter,a.d.Filter),a.InvertFilter.prototype.add=function(a){var b,c,d,e,f;for(b=this.getAlpha(),c=a.data,e=0,f=c.length;f>e;e+=4)0!==c[e+3]&&(d=e,c[d]=255-c[d],c[++d]=255-c[d],c[++d]=255-c[d],c[++d]*=b);return a},a.BrightnessFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.brightness=a.xtGet(b.brightness,1),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.BrightnessFilter.prototype=Object.create(a.Filter.prototype),a.BrightnessFilter.prototype.type="BrightnessFilter",a.BrightnessFilter.prototype.classname="filternames",a.d.BrightnessFilter={brightness:1},a.mergeInto(a.d.BrightnessFilter,a.d.Filter),a.BrightnessFilter.prototype.add=function(b){var c,d,e,f,g,h;for(c=this.getAlpha(),f=a.isa(this.brightness,"str")?parseFloat(this.brightness)/100:this.brightness,d=b.data,f=0>f?0:f,g=0,h=d.length;h>g;g+=4)0!==d[g+3]&&(e=g,d[e]*=f,d[++e]*=f,d[++e]*=f,d[++e]*=c);return b},a.SaturationFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.saturation=a.xtGet(b.saturation,1),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.SaturationFilter.prototype=Object.create(a.Filter.prototype),a.SaturationFilter.prototype.type="SaturationFilter",a.SaturationFilter.prototype.classname="filternames",a.d.SaturationFilter={saturation:1},a.mergeInto(a.d.SaturationFilter,a.d.Filter),a.SaturationFilter.prototype.add=function(b){var c,d,e,f,g,h;for(c=this.getAlpha(),f=a.isa(this.saturation,"str")?parseFloat(this.saturation)/100:this.saturation,d=b.data,f=0>f?0:f,g=0,h=d.length;h>g;g+=4)0!==d[g+3]&&(e=g,d[e]=127+(d[e]-127)*f,d[++e]=127+(d[e]-127)*f,d[++e]=127+(d[e]-127)*f,d[++e]*=c);return b},a.ThresholdFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.threshold=a.xtGet(b.threshold,.5),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.ThresholdFilter.prototype=Object.create(a.Filter.prototype),a.ThresholdFilter.prototype.type="ThresholdFilter",a.ThresholdFilter.prototype.classname="filternames",a.d.ThresholdFilter={threshold:.5},a.mergeInto(a.d.ThresholdFilter,a.d.Filter),a.ThresholdFilter.prototype.add=function(b){var c,d,e,f,g,h;for(c=this.getAlpha(),f=a.isa(this.threshold,"str")?parseFloat(this.threshold)/100:this.threshold,f=a.isBetween(f,0,1,!0)?f:f>.5?1:0,f*=255,b=a.GreyscaleFilter.prototype.add.call(this,b),d=b.data,g=0,h=d.length;h>g;g+=4)0!==d[g+3]&&(e=g,d[e]=d[e]>f?255:0,d[++e]=d[e]>f?255:0,d[++e]=d[e]>f?255:0,d[++e]*=c);return b},a.ChannelsFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.red=a.xtGet(b.red,1),this.green=a.xtGet(b.green,1),this.blue=a.xtGet(b.blue,1),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.ChannelsFilter.prototype=Object.create(a.Filter.prototype),a.ChannelsFilter.prototype.type="ChannelsFilter",a.ChannelsFilter.prototype.classname="filternames",a.d.ChannelsFilter={red:1,green:1,blue:1},a.mergeInto(a.d.ChannelsFilter,a.d.Filter),a.ChannelsFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j;for(c=this.getAlpha(),f=a.isa(this.red,"str")?parseFloat(this.red)/100:this.red,g=a.isa(this.green,"str")?parseFloat(this.green)/100:this.green,h=a.isa(this.blue,"str")?parseFloat(this.blue)/100:this.blue,d=b.data,f=0>f?0:f,g=0>g?0:g,h=0>h?0:h,i=0,j=d.length;j>i;i+=4)0!==d[i+3]&&(e=i,d[e]*=f,d[++e]*=g,d[++e]*=h,d[++e]*=c);return b},a.ChannelStepFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.red=a.xtGet(b.red,1),this.green=a.xtGet(b.green,1),this.blue=a.xtGet(b.blue,1),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.ChannelStepFilter.prototype=Object.create(a.Filter.prototype),a.ChannelStepFilter.prototype.type="ChannelStepFilter",a.ChannelStepFilter.prototype.classname="filternames",a.d.ChannelStepFilter={red:1,green:1,blue:1},a.mergeInto(a.d.ChannelStepFilter,a.d.Filter),a.ChannelStepFilter.prototype.add=function(a){var b,c,d,e,f,g,h,i,j,k,l;for(b=this.getAlpha(),e=this.red,f=this.green,g=this.blue,c=a.data,e=1>e?1:e,f=1>f?1:f,g=1>g?1:g,k=0,l=c.length;l>k;k+=4)0!==c[k+3]&&(d=k,h=c[d],i=c[++d],j=c[++d],d=k,c[d]=Math.floor(h/e)*e,c[++d]=Math.floor(i/f)*f,c[++d]=Math.floor(j/g)*g,c[++d]*=b);return a},a.TintFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.redInRed=a.xtGet(b.redInRed,1),this.redInGreen=a.xtGet(b.redInGreen,0),this.redInBlue=a.xtGet(b.redInBlue,0),this.greenInRed=a.xtGet(b.greenInRed,0),this.greenInGreen=a.xtGet(b.greenInGreen,1),this.greenInBlue=a.xtGet(b.greenInBlue,0),this.blueInRed=a.xtGet(b.blueInRed,0),this.blueInGreen=a.xtGet(b.blueInGreen,0),this.blueInBlue=a.xtGet(b.blueInBlue,1),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.TintFilter.prototype=Object.create(a.Filter.prototype),a.TintFilter.prototype.type="TintFilter",a.TintFilter.prototype.classname="filternames",a.d.TintFilter={redInRed:1,greenInRed:0,blueInRed:0,redInGreen:0,greenInGreen:1,blueInGreen:0,redInBlue:0,greenInBlue:0,blueInBlue:1},a.mergeInto(a.d.TintFilter,a.d.Filter),a.TintFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;for(c=this.getAlpha(),i=a.isa(this.redInRed,"str")?parseFloat(this.redInRed)/100:this.redInRed,j=a.isa(this.redInGreen,"str")?parseFloat(this.redInGreen)/100:this.redInGreen,k=a.isa(this.redInBlue,"str")?parseFloat(this.redInBlue)/100:this.redInBlue,l=a.isa(this.greenInRed,"str")?parseFloat(this.greenInRed)/100:this.greenInRed,m=a.isa(this.greenInGreen,"str")?parseFloat(this.greenInGreen)/100:this.greenInGreen,n=a.isa(this.greenInBlue,"str")?parseFloat(this.greenInBlue)/100:this.greenInBlue,o=a.isa(this.blueInRed,"str")?parseFloat(this.blueInRed)/100:this.blueInRed,p=a.isa(this.blueInGreen,"str")?parseFloat(this.blueInGreen)/100:this.blueInGreen,q=a.isa(this.blueInBlue,"str")?parseFloat(this.blueInBlue)/100:this.blueInBlue,d=b.data,r=0,s=d.length;s>r;r+=4)0!==d[r+3]&&(e=r,f=d[e],g=d[++e],h=d[++e],e=r,d[e]=f*i+g*l+h*o,d[++e]=f*j+g*m+h*p,d[++e]=f*k+g*n+h*q,d[++e]*=c);return b},a.MatrixFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.width=a.xtGet(b.width,!1),this.height=a.xtGet(b.height,!1),this.data=a.xt(b.data)?b.data:[1],this.x=a.xtGet(b.x,Math.floor(this.width/2)),this.y=a.xtGet(b.y,Math.floor(this.height/2)),this.includeInvisiblePoints=a.xtGet(b.includeInvisiblePoints,!1),this.setFilter(),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.MatrixFilter.prototype=Object.create(a.Filter.prototype),a.MatrixFilter.prototype.type="MatrixFilter",a.MatrixFilter.prototype.classname="filternames",a.d.MatrixFilter={width:1,height:1,x:0,y:0,includeInvisiblePoints:!1,data:!1},a.mergeInto(a.d.MatrixFilter,a.d.Filter),a.MatrixFilter.prototype.set=function(b){a.Base.prototype.set.call(this,b),this.width=a.xtGet(b.width,!1),this.height=a.xtGet(b.height,!1),this.setFilter()},a.MatrixFilter.prototype.setFilter=function(){var b,c,d,e,f=0;for(!this.height&&this.width&&a.isa(this.width,"num")&&this.width>=1?(this.width=Math.floor(this.width),e=Math.ceil(this.data.length/this.width),this.height=e,e=this.width*this.height):!this.width&&this.height&&a.isa(this.height,"num")&&this.height>=1?(this.height=Math.floor(this.height),e=Math.ceil(this.data.length/this.height),this.width=e,e=this.width*this.height):this.width&&a.isa(this.width,"num")&&this.width>=1&&this.height&&a.isa(this.height,"num")&&this.height>=1?(this.width=Math.round(this.width),this.height=Math.round(this.height),e=this.width*this.height):(e=Math.ceil(Math.sqrt(this.data.length)),e=e%2===1?Math.pow(e,2):Math.pow(e+1,2),this.width=Math.round(Math.sqrt(e)),this.height=this.width),d=0;e>d;d++)this.data[d]=a.xt(this.data[d])?parseFloat(this.data[d]):0,this.data[d]=isNaN(this.data[d])?0:this.data[d];for(this.cells=[],b=0;b<this.height;b++)for(c=0;c<this.width;c++)0!==this.data[f]&&this.cells.push([c-this.x,b-this.y,this.data[f]]),f++;return this},a.MatrixFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;if(c=this.getAlpha(),d=b.data,f=a.cvx.createImageData(b.width,b.height),e=f.data,this.includeInvisiblePoints){for(j=0,k=b.height;k>j;j++)for(l=0,m=b.width;m>l;l++)if(s=4*(j*m+l),d[s+3]>0){for(g=0,h=0,i=0,q=0,n=0,o=this.cells.length;o>n;n++)t=l+this.cells[n][0],u=j+this.cells[n][1],t>=0&&m>t&&u>=0&&k>u&&(p=this.cells[n][2],r=4*(u*m+t),q+=p,g+=d[r]*p,r++,h+=d[r]*p,r++,i+=d[r]*p);0!==q&&(g/=q,h/=q,i/=q),e[s]=g,s++,e[s]=h,s++,e[s]=i,s++,e[s]=d[s]*c}}else for(j=0,k=b.height;k>j;j++)for(l=0,m=b.width;m>l;l++)if(s=4*(j*m+l),d[s+3]>0){for(g=0,h=0,i=0,q=0,n=0,o=this.cells.length;o>n;n++)t=l+this.cells[n][0],u=j+this.cells[n][1],t>=0&&m>t&&u>=0&&k>u&&(p=this.cells[n][2],r=4*(u*m+t),d[r+3]>0&&(q+=p,g+=d[r]*p,r++,h+=d[r]*p,r++,i+=d[r]*p));0!==q&&(g/=q,h/=q,i/=q),e[s]=g,s++,e[s]=h,s++,e[s]=i,s++,e[s]=d[s]*c}return f},a.PixelateFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.width=a.xtGet(b.width,5),this.height=a.xtGet(b.height,5),this.offsetX=a.xtGet(b.offsetX,0),this.offsetY=a.xtGet(b.offsetY,0),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.PixelateFilter.prototype=Object.create(a.Filter.prototype),a.PixelateFilter.prototype.type="PixelateFilter",a.PixelateFilter.prototype.classname="filternames",a.d.PixelateFilter={width:5,height:5,offsetX:0,offsetY:0},a.mergeInto(a.d.PixelateFilter,a.d.Filter),a.PixelateFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;for(c=this.getAlpha(),d=b.data,f=a.cvx.createImageData(b.width,b.height),e=f.data,s=b.width,t=b.height,u=s-1,v=t-1,q=this.width,r=this.height,o=this.offsetX-q;s>o;o+=q)for(p=this.offsetY-r;t>p;p+=r){for(g=0,h=0,i=0,j=0,w=0,k=p,l=p+r;l>k;k++)for(m=o,n=o+q;n>m;m++)y=0>m||m>u||0>k||k>v?!0:!1,y||(x=4*(k*s+m),d[x+3]>0&&(g+=d[x],h+=d[++x],i+=d[++x],j+=d[++x],w++));if(w>0&&j>0)for(g=Math.round(g/w),h=Math.round(h/w),i=Math.round(i/w),x=4*(p*s+o),k=p,l=p+r;l>k;k++)for(m=o,n=o+q;n>m;m++)x=4*(k*s+m),e[x]=g,e[++x]=h,e[++x]=i,e[++x]=d[x]*c}return f},a.BlurFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.radiusX=a.xtGet(b.radiusX,2),this.radiusY=a.xtGet(b.radiusY,2),this.roll=a.xtGet(b.roll,2),this.skip=a.xtGet(b.skip,1),this.cells=a.xt(b.cells)?b.cells:!1,this.includeInvisiblePoints=a.xtGet(b.includeInvisiblePoints,!1),a.isa(this.cells,"arr")||(this.cells=this.getBrush()),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.BlurFilter.prototype=Object.create(a.Filter.prototype),a.BlurFilter.prototype.type="BlurFilter",a.BlurFilter.prototype.classname="filternames",a.d.BlurFilter={radiusX:2,radiusY:2,skip:1,roll:0,includeInvisiblePoints:!1},a.mergeInto(a.d.BlurFilter,a.d.Filter),a.BlurFilter.prototype.set=function(b){a.Base.prototype.set.call(this,b),a.isa(b.cells,"arr")||(this.cells=this.getBrush())},a.BlurFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;if(c=this.getAlpha(),d=b.data,e=a.cvx.createImageData(b.width,b.height),f=e.data,g=this.cells.length,h=Math.floor(g/this.skip),this.includeInvisiblePoints){for(j=0,k=b.height;k>j;j++)for(l=0,m=b.width;m>l;l++)if(t=4*(j*m+l),d[t+3]>0){for(p=0,q=0,r=0,n=0,o=g;o>n;n+=this.skip)u=l+this.cells[n][0],v=j+this.cells[n][1],u>=0&&m>u&&v>=0&&k>v&&(s=4*(v*m+u),p+=d[s],s++,q+=d[s],s++,r+=d[s]);0!==h&&(p/=h,q/=h,r/=h),f[t]=p,t++,f[t]=q,t++,f[t]=r,t++,f[t]=d[t]*c}}else for(j=0,k=b.height;k>j;j++)for(l=0,m=b.width;m>l;l++)if(t=4*(j*m+l),d[t+3]>0){for(p=0,q=0,r=0,i=0,n=0,o=g;o>n;n+=this.skip)u=l+this.cells[n][0],v=j+this.cells[n][1],u>=0&&m>u&&v>=0&&k>v&&(s=4*(v*m+u),d[s+3]>0&&(i++,p+=d[s],s++,q+=d[s],s++,r+=d[s]));0!==i&&(p/=i,q/=i,r/=i),f[t]=p,t++,f[t]=q,t++,f[t]=r,t++,f[t]=d[t]*c}return e},a.BlurFilter.prototype.getBrush=function(){var b,c,d,e,f,g,h,i,j,k,l,m;for(b=this.radiusX,c=this.radiusY,d=this.roll,e=b>c?b+2:c+2,f=Math.floor(e/2),g=Math.cos(d*a.radian),h=Math.sin(d*a.radian),i=[],j=a.filterCanvas,k=a.filterCvx,j.width=e,j.height=e,k.setTransform(g,h,-h,g,f,f),k.beginPath(),k.moveTo(-b,0),k.lineTo(-1,-1),k.lineTo(0,-c),k.lineTo(1,-1),k.lineTo(b,0),k.lineTo(1,1),k.lineTo(0,c),k.lineTo(-1,1),k.lineTo(-b,0),k.closePath(),l=0;e>l;l++)for(m=0;e>m;m++)k.isPointInPath(m,l)&&i.push([m-f,l-f,1]);return k.setTransform(1,0,0,1,0,0),i},a.LeachFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.minRed=a.xtGet(b.minRed,0),this.minGreen=a.xtGet(b.minGreen,0),this.minBlue=a.xtGet(b.minBlue,0),this.maxRed=a.xtGet(b.maxRed,255),this.maxGreen=a.xtGet(b.maxGreen,255),this.maxBlue=a.xtGet(b.maxBlue,255),this.preserve=a.xtGet(b.preserve,!1),this.composite=this.preserve?"destination-in":"destination-out",a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.LeachFilter.prototype=Object.create(a.Filter.prototype),a.LeachFilter.prototype.type="LeachFilter",a.LeachFilter.prototype.classname="filternames",a.d.LeachFilter={minRed:0,minGreen:0,minBlue:0,maxRed:255,maxGreen:255,maxBlue:255,preserve:!1},a.mergeInto(a.d.LeachFilter,a.d.Filter),a.LeachFilter.prototype.set=function(b){a.Base.prototype.set.call(this,b),a.xt(b.preserve)&&a.isa(b.preserve,"bool")&&(this.composite=b.preserve?"destination-in":"destination-out")},a.LeachFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j,k,l,m;for(c=Math.floor(255*this.getAlpha()),d=this.maxRed,e=this.maxGreen,f=this.maxBlue,g=this.minRed,h=this.minGreen,i=this.minBlue,j=b.data,k=0,l=j.length;l>k;k+=4)j[k+3]>0&&(m=!1,a.isBetween(j[k],g,d,!0)&&a.isBetween(j[k+1],h,e,!0)&&a.isBetween(j[k+2],i,f,!0)&&(j[k+3]=c,m=!0),m||(j[k+3]=0));return b},a.SeparateFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.channel=a.xtGet(b.channel,"all"),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.SeparateFilter.prototype=Object.create(a.Filter.prototype),a.SeparateFilter.prototype.type="SeparateFilter",a.SeparateFilter.prototype.classname="filternames",a.d.SeparateFilter={channel:"all"},a.mergeInto(a.d.SeparateFilter,a.d.Filter),a.SeparateFilter.prototype.add=function(a){var b,c,d,e,f,g;for(b=this.getAlpha(),c=this.channel,d=a.data,e=0,f=d.length;f>e;e+=4)if(d[e+3]>0){switch(c){case"red":d[e+1]=0,d[e+2]=0;break;case"green":d[e]=0,d[e+2]=0;break;case"blue":d[e]=0,d[e+1]=0;break;case"cyan":g=(d[e+1]+d[e+2])/2,d[e]=0,d[e+1]=g,d[e+2]=g;break;case"magenta":g=(d[e]+d[e+2])/2,d[e+1]=0,d[e]=g,d[e+2]=g;break;case"yellow":g=(d[e]+d[e+1])/2,d[e+2]=0,d[e+1]=g,d[e]=g}d[e+3]*=b}return a},a.NoiseFilter=function(b){return b=a.safeObject(b),a.Filter.call(this,b),this.radiusX=a.xtGet(b.radiusX,2),this.radiusY=a.xtGet(b.radiusY,2),this.roll=a.xtGet(b.roll,2),this.cells=a.xt(b.cells)?b.cells:!1,this.strength=a.xtGet(b.strength,.3),a.isa(this.cells,"arr")||(this.cells=this.getBrush()),a.filter[this.name]=this,a.pushUnique(a.filternames,this.name),this},a.NoiseFilter.prototype=Object.create(a.Filter.prototype),a.NoiseFilter.prototype.type="NoiseFilter",a.NoiseFilter.prototype.classname="filternames",a.d.NoiseFilter={radiusX:2,radiusY:2,roll:0,strength:.3},a.mergeInto(a.d.NoiseFilter,a.d.Filter),a.NoiseFilter.prototype.set=function(b){return a.BlurFilter.prototype.set.call(this,b)},a.NoiseFilter.prototype.getBrush=function(){return a.BlurFilter.prototype.getBrush.call(this)},a.NoiseFilter.prototype.add=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;for(c=this.getAlpha(),d=b.data,f=a.cvx.createImageData(b.width,b.height),e=f.data,g=this.strength,q=this.cells.length,h=0,i=b.height;i>h;h++)for(j=0,k=b.width;k>j;j++)m=4*(h*k+j),d[m+3]>0&&(Math.random()<g?(p=this.cells[Math.floor(Math.random()*q)],n=j+p[0],o=h+p[1],n>=0&&k>n&&o>=0&&i>o&&(l=4*(o*k+n),e[m]=d[l],e[m+1]=d[l+1],e[m+2]=d[l+2],e[m+3]=d[m+3]*c)):(e[m]=d[m],e[m+1]=d[m+1],e[m+2]=d[m+2],e[m+3]=d[m+3]*c));return f},a}(scrawl);