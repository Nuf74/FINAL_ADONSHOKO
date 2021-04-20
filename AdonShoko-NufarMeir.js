(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.walkagain = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgbBfQgHgCgHgFQgPgLgIgPQgIgPACgRQABgOAGgLQAHgKAJgJQAKgJALgHQAMgHALgEQgGgHgFgHQgFgHgCgHQgCgHAAgGQAAgHAHgEQAHgFAIAFQAGAFAFAMQAEAKAFAFQAFAGAFADIAIgCIAGgBQAOABAHAEQAIAEAAAGQAAAEgDAFQgEAEgGAEQgHADgLAAIgIgBIgJgCQgTAGgOAKQgQAJgIALQgJALgBAKQABANAHAJQAHAKAKAHQAEACABAEQACAEAAAEQgBAEgEADQgCACgEAAIgFgBg");
	this.shape.setTransform(-1.8618,4.5584);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhLByQgKgBgEgIQgFgHACgMQABgMAGgHQAFgHAIgDQAHgEAHgBQADgSAGgWIAOgxQANgnAVgSQAUgTAagBQAJAAALADQAKAEAIAGQAIAHACAGQABAHgDADQgEADgFgBQgFgBgFgDIgLgGQgGgDgGAAQgNgBgLAJQgLAIgIANQgHAOgHARQgGAQgFAQIgIAgIgFAYQgEATgFAMQgGALgGAGQgGAFgGABIgIACIgCgBg");
	this.shape_1.setTransform(-6.2437,-1.3937);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRApQgFgCgBgHQAAgHADgKIAHgTIAHgUQADgJAFgEQAFgFAHACQAIADABAHQABAIgEAJIgDAMIgGAPIgIAPQgEAHgFADQgDADgDAAIgFgBg");
	this.shape_2.setTransform(-16.39,-0.1207);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgwB7QgEgBgBgGQgBgGACgIQACgIAFgIIAIgSIAOghIAPgoIAOgrIALglIAEgLIAGgNQAEgHAFgEQAEgEAGACQAGACACAFQABAGgBAIQgBAIgDAJIgSAyIgTAwIgRArIgPAgIgIARQgHALgEAEQgDADgEAAIgDgBg");
	this.shape_3.setTransform(-24.0792,6.2358);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbBfQgHgCgHgFQgPgLgIgPQgIgPACgRQABgOAGgLQAHgKAJgJQAKgJALgHQAMgHALgEQgGgHgFgHQgFgHgCgHQgCgHAAgGQAAgHAHgEQAHgFAIAFQAGAFAFAMQAEAKAFAFQAFAGAFADIAIgCIAGgBQAOABAHAEQAIAEAAAGQAAAEgDAFQgEAEgGAEQgHADgLAAIgIgBIgJgCQgTAGgOAKQgQAJgIALQgJALgBAKQABANAHAJQAHAKAKAHQAEACABAEQACAEAAAEQgBAEgEADQgCACgEAAIgFgBg");
	this.shape_4.setTransform(-39.3118,4.5584);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhLByQgKgBgEgIQgFgHACgMQABgMAGgHQAFgHAIgDQAHgEAHgBQADgSAGgWIAOgxQANgnAVgSQAUgTAagBQAJAAALADQAKAEAIAGQAIAHACAGQABAHgDADQgEADgFgBQgFgBgFgDIgLgGQgGgDgGAAQgNgBgLAJQgLAIgIANQgHAOgHARQgGAQgFAQIgIAgIgFAYQgEATgFAMQgGALgGAGQgGAFgGABIgIACIgCgBg");
	this.shape_5.setTransform(-43.6937,-1.3937);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRApQgFgCgBgHQAAgHADgKIAHgTIAHgUQADgJAFgEQAFgFAHACQAIADABAHQABAIgEAJIgDAMIgGAPIgIAPQgEAHgFADQgDADgDAAIgFgBg");
	this.shape_6.setTransform(-53.84,-0.1207);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgwB7QgEgBgBgGQgBgGACgIQACgIAFgIIAIgSIAOghIAPgoIAOgrIALglIAEgLIAGgNQAEgHAFgEQAEgEAGACQAGACACAFQABAGgBAIQgBAIgDAJIgSAyIgTAwIgRArIgPAgIgIARQgHALgEAEQgDADgEAAIgDgBg");
	this.shape_7.setTransform(-61.5292,6.2358);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgbBfQgHgCgHgFQgPgLgIgPQgIgPACgRQABgOAGgLQAHgKAJgJQAKgJALgHQAMgHALgEQgGgHgFgHQgFgHgCgHQgCgHAAgGQAAgHAHgEQAHgFAIAFQAGAFAFAMQAEAKAFAFQAFAGAFADIAIgCIAGgBQAOABAHAEQAIAEAAAGQAAAEgDAFQgEAEgGAEQgHADgLAAIgIgBIgJgCQgTAGgOAKQgQAJgIALQgJALgBAKQABANAHAJQAHAKAKAHQAEACABAEQACAEAAAEQgBAEgEADQgCACgEAAIgFgBg");
	this.shape_8.setTransform(-76.7618,4.5584);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhLByQgKgBgEgIQgFgHACgMQABgMAGgHQAFgHAIgDQAHgEAHgBQADgSAGgWIAOgxQANgnAVgSQAUgTAagBQAJAAALADQAKAEAIAGQAIAHACAGQABAHgDADQgEADgFgBQgFgBgFgDIgLgGQgGgDgGAAQgNgBgLAJQgLAIgIANQgHAOgHARQgGAQgFAQIgIAgIgFAYQgEATgFAMQgGALgGAGQgGAFgGABIgIACIgCgBg");
	this.shape_9.setTransform(-81.1437,-1.3937);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRApQgFgCgBgHQAAgHADgKIAHgTIAHgUQADgJAFgEQAFgFAHACQAIADABAHQABAIgEAJIgDAMIgGAPIgIAPQgEAHgFADQgDADgDAAIgFgBg");
	this.shape_10.setTransform(-91.29,-0.1207);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgwB7QgEgBgBgGQgBgGACgIQACgIAFgIIAIgSIAOghIAPgoIAOgrIALglIAEgLIAGgNQAEgHAFgEQAEgEAGACQAGACACAFQABAGgBAIQgBAIgDAJIgSAyIgTAwIgRArIgPAgIgIARQgHALgEAEQgDADgEAAIgDgBg");
	this.shape_11.setTransform(-98.9792,6.2358);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AguBYQgFgGAAgJQAAgEACgFQABgFAEgEQAEgEAFgDQAFgCAHAAQAOAAAGAGQAGAGgBAIQAAAFgCAFQgBAFgFAEQgEAEgHADQgGACgJAAQgJAAgFgGgAgiAGQAEgKAGgIQAGgIAGgGIAMgMIAJgJQADgFAAgDIgBgFQgCgCgEAAQgFAAgGADIgOAJIgPANIgNgfQANgLAQgIQAQgGAPAAQAJAAAGACQAIACAFADQAFAEAEAGQADAGAAAJQAAAMgEAJQgEAJgGAGQgGAGgHAGIgOALQgHAFgEAHQgGAHgCAKIgeACQAAgNAEgKg");
	this.shape_12.setTransform(-103.45,0.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgfBrQgLgCgKgHQgKgHgGgOQgGgRACgRQABgRAJgPQAIgOANgNQANgMAQgJIgBgEIgIgUIgIgTQgDgJABgGQABgGAHgDIAIgCQAFAAAEADQAFAEAEALIAFAPIAHAYIARgFIASgBQAJgBAGADQAGADACAFQACAGgDADQgDAEgFACIgMADIgPACIgPAFQAEATACASQABATgCASQgDARgJAOQgIANgPAGQgJADgJAAIgFAAgAgdAMQgKAMgEAOQgEAOAGAPQADAJAFADQAFAEAHgDQAEgBAEgGQAFgFAEgLQAEgLAAgQQAAgQgDgVQgPAIgLALg");
	this.shape_13.setTransform(-17.8791,-45.5181);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AghBPQgEgBAAgHQAAgGADgJIAFgNIAJgZIAMggIAKgkQAFgQAGgHQAFgIALACQAHADACAIQABAIgEANIgIAZIgMAbIgMAcIgKAXIgGAOQgGAIgFACIgEAAIgFgBg");
	this.shape_14.setTransform(-27.99,-44.9226);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKBVQgEgBgCgEQgBgEACgFIAJgTQADgIABgIQABgHgEgEQgEgEgMgCIgNABIgNACQgGAAgFgDQgEgCgCgIQAAgGAEgDQAFgDAHgBQAHgCAHAAIAMAAIAFAAQALgDAJgGIATgLQAJgGAEgEQAEgEAAgFQABgEgDgEQgDgDgIgBQgIgBgIABIgPADQgHACgFACIgNAEQgHABgHAAQgGgBgDgDQgDgEABgEQAAgEACgDIAEgFQAFgEAIgDQAJgDAKgCIAUgDQALgBAJABQALABAKAFQAKAFAGAIQAGAJgBANQgCALgFAJQgGAIgJAGQgIAGgIADIgOAFQADABADADQACAEACAHQABAHgBALQgBANgDAHQgDAIgDAFIgHAKQgEAEgDABIgEAAIgFgBg");
	this.shape_15.setTransform(-36.3198,-45.455);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgzBVQgLgEgHgLQgHgKAAgTQAAgLAFgLQAEgLAIgIQAHgIAJgFQAJgGAIgCQAMgBAKAEQAJAEAFAIQAGAIgDANQgBAEgFAGQgEAGgGAGQgGAFgHACQgGACgFgEQgDgDACgFIAGgKIAHgLQACgFgCgDQgDgCgFACQgGACgGAFQgGAFgEAIQgEAIAAALQAAAIAFAFQAGAEALAAQAHAAAKgDQAKgDAJgHQALgHAJgKQAJgKAFgOQAGgMAAgRQAAgSgIgJQgHgKgLgCQgJgBgKABQgIACgKADQgJAEgJAGQgGAEgGABQgHABgDgEQgFgFADgHQADgIALgIQAMgIAQgEQAOgEASgBQAQAAAMAHQAMAGAHALQAHALADANQAEAOgCAOQgCAVgJASQgKATgPAOQgPAOgSAIQgRAJgSAAQgNAAgLgFg");
	this.shape_16.setTransform(-59.1025,-44.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgfBrQgLgCgKgHQgKgHgGgOQgGgRACgRQABgRAJgPQAIgOANgNQANgMAQgJIgBgEIgIgUIgIgTQgDgJABgGQABgGAHgDIAIgCQAFAAAEADQAFAEAEALIAFAPIAHAYIARgFIASgBQAJgBAGADQAGADACAFQACAGgDADQgDAEgFACIgMADIgPACIgPAFQAEATACASQABATgCASQgDARgJAOQgIANgPAGQgJADgJAAIgFAAgAgdAMQgKAMgEAOQgEAOAGAPQADAJAFADQAFAEAHgDQAEgBAEgGQAFgFAEgLQAEgLAAgQQAAgQgDgVQgPAIgLALg");
	this.shape_17.setTransform(-72.5291,-45.5181);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhGBGQgDgCAAgGQAAgDADgKIAHgXIAKgaIAJgcQACgGADgDQADgDAFAAIABAAIABAAIACgHIAEgGIAMgIQAJgFAKgEQALgDANABQAJACAKAHQAKAHAGANQAHAMAAARQAAAPgGAMQgHAMgLAHQgLAIgOAAQgLgBgKgFQgIgFgIgJQgHgIgFgIIgIAUIgIAUIgIARIgGAJQgEADgEAAQgFAAgDgDgAANgrQgGACgFADIgIAHIgEAEIgBABIgCABIAGAKIAIANQAFAEAHAFQAGAEAHABQAGABAFgEQAFgEACgHQADgHABgJQAAgIgEgGQgEgGgFgEQgFgDgEAAIgCAAQgFAAgGACg");
	this.shape_18.setTransform(-87.825,-43.3125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#70301A").s().p("Ai0JkQljgZj+jMQj+jLAbjyQAbjzDxitQDwisGMAuQGLAuDJCOQDICOAAELQAACdhXCDQAUDLGTgHQmlCIi5iUQjSCWkoAAQgrAAgtgDg");
	this.shape_19.setTransform(-38.3802,-14.6237);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#993300").s().p("AgbBfQgHgCgHgFQgPgLgIgPQgIgPACgRQABgOAGgLQAHgKAJgJQAKgJALgHQAMgHALgEQgGgHgFgHQgFgHgCgHQgCgHAAgGQAAgHAHgEQAHgFAIAFQAGAFAFAMQAEAKAFAFQAFAGAFADIAIgCIAGgBQAOABAHAEQAIAEAAAGQAAAEgDAFQgEAEgGAEQgHADgLAAIgIgBIgJgCQgTAGgOAKQgQAJgIALQgJALgBAKQABANAHAJQAHAKAKAHQAEACABAEQACAEAAAEQgBAEgEADQgCACgEAAIgFgBg");
	this.shape_20.setTransform(-1.8618,4.5584);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#993300").s().p("AhLByQgKgBgEgIQgFgHACgMQABgMAGgHQAFgHAIgDQAHgEAHgBQADgSAGgWIAOgxQANgnAVgSQAUgTAagBQAJAAALADQAKAEAIAGQAIAHACAGQABAHgDADQgEADgFgBQgFgBgFgDIgLgGQgGgDgGAAQgNgBgLAJQgLAIgIANQgHAOgHARQgGAQgFAQIgIAgIgFAYQgEATgFAMQgGALgGAGQgGAFgGABIgIACIgCgBg");
	this.shape_21.setTransform(-6.2437,-1.3937);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#993300").s().p("AgRApQgFgCgBgHQAAgHADgKIAHgTIAHgUQADgJAFgEQAFgFAHACQAIADABAHQABAIgEAJIgDAMIgGAPIgIAPQgEAHgFADQgDADgDAAIgFgBg");
	this.shape_22.setTransform(-16.39,-0.1207);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#993300").s().p("AgwB7QgEgBgBgGQgBgGACgIQACgIAFgIIAIgSIAOghIAPgoIAOgrIALglIAEgLIAGgNQAEgHAFgEQAEgEAGACQAGACACAFQABAGgBAIQgBAIgDAJIgSAyIgTAwIgRArIgPAgIgIARQgHALgEAEQgDADgEAAIgDgBg");
	this.shape_23.setTransform(-24.0792,6.2358);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#993300").s().p("AgbBfQgHgCgHgFQgPgLgIgPQgIgPACgRQABgOAGgLQAHgKAJgJQAKgJALgHQAMgHALgEQgGgHgFgHQgFgHgCgHQgCgHAAgGQAAgHAHgEQAHgFAIAFQAGAFAFAMQAEAKAFAFQAFAGAFADIAIgCIAGgBQAOABAHAEQAIAEAAAGQAAAEgDAFQgEAEgGAEQgHADgLAAIgIgBIgJgCQgTAGgOAKQgQAJgIALQgJALgBAKQABANAHAJQAHAKAKAHQAEACABAEQACAEAAAEQgBAEgEADQgCACgEAAIgFgBg");
	this.shape_24.setTransform(-39.3118,4.5584);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#993300").s().p("AhLByQgKgBgEgIQgFgHACgMQABgMAGgHQAFgHAIgDQAHgEAHgBQADgSAGgWIAOgxQANgnAVgSQAUgTAagBQAJAAALADQAKAEAIAGQAIAHACAGQABAHgDADQgEADgFgBQgFgBgFgDIgLgGQgGgDgGAAQgNgBgLAJQgLAIgIANQgHAOgHARQgGAQgFAQIgIAgIgFAYQgEATgFAMQgGALgGAGQgGAFgGABIgIACIgCgBg");
	this.shape_25.setTransform(-43.6937,-1.3937);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#993300").s().p("AgRApQgFgCgBgHQAAgHADgKIAHgTIAHgUQADgJAFgEQAFgFAHACQAIADABAHQABAIgEAJIgDAMIgGAPIgIAPQgEAHgFADQgDADgDAAIgFgBg");
	this.shape_26.setTransform(-53.84,-0.1207);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#993300").s().p("AgwB7QgEgBgBgGQgBgGACgIQACgIAFgIIAIgSIAOghIAPgoIAOgrIALglIAEgLIAGgNQAEgHAFgEQAEgEAGACQAGACACAFQABAGgBAIQgBAIgDAJIgSAyIgTAwIgRArIgPAgIgIARQgHALgEAEQgDADgEAAIgDgBg");
	this.shape_27.setTransform(-61.5292,6.2358);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#993300").s().p("AgbBfQgHgCgHgFQgPgLgIgPQgIgPACgRQABgOAGgLQAHgKAJgJQAKgJALgHQAMgHALgEQgGgHgFgHQgFgHgCgHQgCgHAAgGQAAgHAHgEQAHgFAIAFQAGAFAFAMQAEAKAFAFQAFAGAFADIAIgCIAGgBQAOABAHAEQAIAEAAAGQAAAEgDAFQgEAEgGAEQgHADgLAAIgIgBIgJgCQgTAGgOAKQgQAJgIALQgJALgBAKQABANAHAJQAHAKAKAHQAEACABAEQACAEAAAEQgBAEgEADQgCACgEAAIgFgBg");
	this.shape_28.setTransform(-76.7618,4.5584);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#993300").s().p("AhLByQgKgBgEgIQgFgHACgMQABgMAGgHQAFgHAIgDQAHgEAHgBQADgSAGgWIAOgxQANgnAVgSQAUgTAagBQAJAAALADQAKAEAIAGQAIAHACAGQABAHgDADQgEADgFgBQgFgBgFgDIgLgGQgGgDgGAAQgNgBgLAJQgLAIgIANQgHAOgHARQgGAQgFAQIgIAgIgFAYQgEATgFAMQgGALgGAGQgGAFgGABIgIACIgCgBg");
	this.shape_29.setTransform(-81.1437,-1.3937);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#993300").s().p("AgRApQgFgCgBgHQAAgHADgKIAHgTIAHgUQADgJAFgEQAFgFAHACQAIADABAHQABAIgEAJIgDAMIgGAPIgIAPQgEAHgFADQgDADgDAAIgFgBg");
	this.shape_30.setTransform(-91.29,-0.1207);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#993300").s().p("AgwB7QgEgBgBgGQgBgGACgIQACgIAFgIIAIgSIAOghIAPgoIAOgrIALglIAEgLIAGgNQAEgHAFgEQAEgEAGACQAGACACAFQABAGgBAIQgBAIgDAJIgSAyIgTAwIgRArIgPAgIgIARQgHALgEAEQgDADgEAAIgDgBg");
	this.shape_31.setTransform(-98.9792,6.2358);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#993300").s().p("AguBYQgFgGAAgJQAAgEACgFQABgFAEgEQAEgEAFgDQAFgCAHAAQAOAAAGAGQAGAGgBAIQAAAFgCAFQgBAFgFAEQgEAEgHADQgGACgJAAQgJAAgFgGgAgiAGQAEgKAGgIQAGgIAGgGIAMgMIAJgJQADgFAAgDIgBgFQgCgCgEAAQgFAAgGADIgOAJIgPANIgNgfQANgLAQgIQAQgGAPAAQAJAAAGACQAIACAFADQAFAEAEAGQADAGAAAJQAAAMgEAJQgEAJgGAGQgGAGgHAGIgOALQgHAFgEAHQgGAHgCAKIgeACQAAgNAEgKg");
	this.shape_32.setTransform(-103.45,0.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#993300").s().p("AgfBrQgLgCgKgHQgKgHgGgOQgGgRACgRQABgRAJgPQAIgOANgNQANgMAQgJIgBgEIgIgUIgIgTQgDgJABgGQABgGAHgDIAIgCQAFAAAEADQAFAEAEALIAFAPIAHAYIARgFIASgBQAJgBAGADQAGADACAFQACAGgDADQgDAEgFACIgMADIgPACIgPAFQAEATACASQABATgCASQgDARgJAOQgIANgPAGQgJADgJAAIgFAAgAgdAMQgKAMgEAOQgEAOAGAPQADAJAFADQAFAEAHgDQAEgBAEgGQAFgFAEgLQAEgLAAgQQAAgQgDgVQgPAIgLALg");
	this.shape_33.setTransform(-17.8791,-45.5181);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#993300").s().p("AghBPQgEgBAAgHQAAgGADgJIAFgNIAJgZIAMggIAKgkQAFgQAGgHQAFgIALACQAHADACAIQABAIgEANIgIAZIgMAbIgMAcIgKAXIgGAOQgGAIgFACIgEAAIgFgBg");
	this.shape_34.setTransform(-27.99,-44.9226);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#993300").s().p("AgKBVQgEgBgCgEQgBgEACgFIAJgTQADgIABgIQABgHgEgEQgEgEgMgCIgNABIgNACQgGAAgFgDQgEgCgCgIQAAgGAEgDQAFgDAHgBQAHgCAHAAIAMAAIAFAAQALgDAJgGIATgLQAJgGAEgEQAEgEAAgFQABgEgDgEQgDgDgIgBQgIgBgIABIgPADQgHACgFACIgNAEQgHABgHAAQgGgBgDgDQgDgEABgEQAAgEACgDIAEgFQAFgEAIgDQAJgDAKgCIAUgDQALgBAJABQALABAKAFQAKAFAGAIQAGAJgBANQgCALgFAJQgGAIgJAGQgIAGgIADIgOAFQADABADADQACAEACAHQABAHgBALQgBANgDAHQgDAIgDAFIgHAKQgEAEgDABIgEAAIgFgBg");
	this.shape_35.setTransform(-36.3198,-45.455);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#993300").s().p("AgzBVQgLgEgHgLQgHgKAAgTQAAgLAFgLQAEgLAIgIQAHgIAJgFQAJgGAIgCQAMgBAKAEQAJAEAFAIQAGAIgDANQgBAEgFAGQgEAGgGAGQgGAFgHACQgGACgFgEQgDgDACgFIAGgKIAHgLQACgFgCgDQgDgCgFACQgGACgGAFQgGAFgEAIQgEAIAAALQAAAIAFAFQAGAEALAAQAHAAAKgDQAKgDAJgHQALgHAJgKQAJgKAFgOQAGgMAAgRQAAgSgIgJQgHgKgLgCQgJgBgKABQgIACgKADQgJAEgJAGQgGAEgGABQgHABgDgEQgFgFADgHQADgIALgIQAMgIAQgEQAOgEASgBQAQAAAMAHQAMAGAHALQAHALADANQAEAOgCAOQgCAVgJASQgKATgPAOQgPAOgSAIQgRAJgSAAQgNAAgLgFg");
	this.shape_36.setTransform(-59.1025,-44.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#993300").s().p("AgfBrQgLgCgKgHQgKgHgGgOQgGgRACgRQABgRAJgPQAIgOANgNQANgMAQgJIgBgEIgIgUIgIgTQgDgJABgGQABgGAHgDIAIgCQAFAAAEADQAFAEAEALIAFAPIAHAYIARgFIASgBQAJgBAGADQAGADACAFQACAGgDADQgDAEgFACIgMADIgPACIgPAFQAEATACASQABATgCASQgDARgJAOQgIANgPAGQgJADgJAAIgFAAgAgdAMQgKAMgEAOQgEAOAGAPQADAJAFADQAFAEAHgDQAEgBAEgGQAFgFAEgLQAEgLAAgQQAAgQgDgVQgPAIgLALg");
	this.shape_37.setTransform(-72.5291,-45.5181);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#993300").s().p("AhGBGQgDgCAAgGQAAgDADgKIAHgXIAKgaIAJgcQACgGADgDQADgDAFAAIABAAIABAAIACgHIAEgGIAMgIQAJgFAKgEQALgDANABQAJACAKAHQAKAHAGANQAHAMAAARQAAAPgGAMQgHAMgLAHQgLAIgOAAQgLgBgKgFQgIgFgIgJQgHgIgFgIIgIAUIgIAUIgIARIgGAJQgEADgEAAQgFAAgDgDgAANgrQgGACgFADIgIAHIgEAEIgBABIgCABIAGAKIAIANQAFAEAHAFQAGAEAHABQAGABAFgEQAFgEACgHQADgHABgJQAAgIgEgGQgEgGgFgEQgFgDgEAAIgCAAQgFAAgGACg");
	this.shape_38.setTransform(-87.825,-43.3125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFCC99").s().p("Ai0JkQljgZj+jMQj+jLAbjyQAbjzDxitQDwisGMAuQGLAuDJCOQDICOAAELQAACdhXCDQAUDLGTgHQmlCIi5iUQjSCWkoAAQgrAAgtgDg");
	this.shape_39.setTransform(-38.3802,-14.6237);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF99FF").s().p("Ai0JkQljgZj+jMQj+jLAbjyQAbjzDxitQDwisGMAuQGLAuDJCOQDICOAAELQAACdhXCDQAUDLGTgHQmlCIi5iUQjSCWkoAAQgrAAgtgDg");
	this.shape_40.setTransform(-38.3802,-14.6237);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("rgba(255,255,255,0.996)").ss(1,1,1).p("AcIAAQAAG/oPE9QoPE8rqAAQroAAoQk8QoPk9AAm/QAAm/IPk8QIQk8LoAAQLqAAIPE8QIPE8AAG/g");
	this.shape_41.setTransform(-36.8,2.4);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FF99FF").s().p("Az4L8QoPk8AAnAQAAm+IPk9QIQk8LoAAQLpAAIPE8QIQE9AAG+QAAHAoQE8QoPE8rpAAQroAAoQk8g");
	this.shape_42.setTransform(-36.8,2.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_40},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.8,-120.3,362,231.7);


(lib.Symbol6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(49,50,50,0.996)").ss(6,1,1).p("A1BhgQWeScT4xwQADgDADgDQAVgTAVgTAWFm9QFWi4hAGIA2El4QlWi5BAGJ");
	this.shape.setTransform(170.05,50.4797);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(50,50,50,0.996)").ss(6,1,1).p("AVvrqQgCAUgDATQAAADAAADQgZDAgHAiQgNBEgvB4QhMDChUCpQhxDihVBaQl7GOqlATQovgRk3l8QhwiIi5otQgtiKgMhFQgIgvgPjTAyLsNQkFgwheC9ASMsfQEFgvBeC9");
	this.shape_1.setTransform(172.3,115.423);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F8B1B5").s().p("AvDh2QNakzQtEeQl7GOqmATQovgRk3l7g");
	this.shape_2.setTransform(169.525,168.5599);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#860A17").s().p("A0KlXQK4FdJ4AOQEyAGFShpQEphdE4ixQhMDChUCpQhxDihVBaQwtkftZEzQhwiIi5otg");
	this.shape_3.setTransform(172.575,121.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAeGeQp4gOq4leQguiJgKhFQgJgvgPjTQWdSdT4xwIAHgGIApgnIgEAnIAAAGQgZDAgHAiQgOBEguB3Qk4CxkpBeQk/BkkiAAIgjgBg");
	this.shape_4.setTransform(173.4,82.2188);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(50,50,50,0.996)").ss(6,1,1).p("AUdrIQgCATgCASQgBADAAACQgXC4gGAgQgNBBgsBzQhHC6hQChQhqDYhQBVQlkF9p+ASQoOgQkmlrQhpiCitoUQgriEgKhCQgIgtgQjJARIr7QD2gtBYC0AxHrqQj1gthZC0");
	this.shape_5.setTransform(172.2,114.667);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(49,50,50,0.996)").ss(6,1,1).p("AzyhcQVKRnSsw9QADgCAEgDQATgSAUgTA0xlnQlCixA9F3AUympQFCiwg9F3");
	this.shape_6.setTransform(170.075,52.6546);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#860A17").s().p("AunCRQhpiCiuoUQKPFOJTAOQEfAGE/hlQEXhaEmipQhHC6hPCiQhrDXhQBVQlkF9p+ASQoOgQkllrg");
	this.shape_7.setTransform(172.45,139.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAcGMQpTgOqPlOQgriDgKhCQgHgtgQjJQVKRnStw9IAGgFIAoglIgFAlIAAAFQgXC4gHAgQgMBBgtByQklCpkYBaQksBfkRAAIghAAg");
	this.shape_8.setTransform(173.225,82.9668);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(50,50,50,0.996)").ss(6,1,1).p("ATmp1QgCARgCAQQgBACAAADQgWCigGAdQgMA5grBlQhECkhMCOQhlC/hNBMQlWFQpjAQQn4gPkYlAQhlhzimnWQgqh0gJg6QgIgogOiyAQaqhQDrgoBVCfAwZqTQjrgohVCg");
	this.shape_9.setTransform(172.125,112.749);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(49,50,50,0.996)").ss(6,1,1).p("AT6l3QE1icg6FLAy9hRQURPjR6u+QADgCADgDQATgQATgQAz5k9Qk1icA6FL");
	this.shape_10.setTransform(170.1,57.9667);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#860A17").s().p("AuHFBQhkhyinnWQgqh1gJg6QgIgogOixQURPjR6u+IAHgFIAlggIgEAgIAAAFQgXCigGAdQgMA5grBmQhECkhMCOQhlC/hMBLQlXFQpiAQQn5gOkYlBg");
	this.shape_11.setTransform(173.1,115.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(50,50,50,0.996)").ss(6,1,1).p("AVvrqQgCAUgDATQAAADAAADQgZDAgHAiQgNBEgvB4QhIC3hPChQgFAKgEAJQhxDihVBaQl7GOqlATQovgRk3l8QhJhYhnkLQg4iPhBjDQgtiKgMhFQgIgvgPjTAyLsNQkFgwheC9ASMsfQEFgvBeC9");
	this.shape_12.setTransform(172.3,115.423);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#860A17").s().p("AyaDgQg3iPhBjDQguiKgKhFQgJgvgPjSQWdScT4xwIAHgGIApgmIgEAmIAAAGQgZDAgHAiQgOBEguB5QhIC2hPChIgJATQhxDihVBaQwtketZEzQhJhZhokLg");
	this.shape_13.setTransform(173.4,98.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},5).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},4).to({state:[{t:this.shape_13},{t:this.shape_2},{t:this.shape_12},{t:this.shape}]},5).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-3,346.1,202.4);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAABsQgqgNgegqQgegpAAgsQAAgtAegWQAfgWApAOQArANAeAqQAeApAAAsQAAAtgeAWQgTANgYAAQgOAAgQgFg");
	this.shape.setTransform(36.0996,19.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#323031").s().p("AgrC7QhEgpgjhTQgkhTAShNQAThNA9gaQA8gaBEAoQBEApAkBTQAjBTgSBNQgSBNg9AaQgYAKgZAAQgmAAgqgYg");
	this.shape_1.setTransform(32.55,40.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#669933").s().p("AhSFjQiDhNhDifQhEidAjiUQAjiTB0gxQB1gyCABOQCDBNBDCfQBDCdgiCUQgjCTh0AxQgtAUgwAAQhJAAhPgwg");
	this.shape_2.setTransform(32.55,40.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,65.1,80.6), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAABsQgqgNgegqQgegpAAgsQAAgtAegWQAfgWApAOQArANAeAqQAeApAAAsQAAAtgeAWQgTANgYAAQgOAAgQgFg");
	this.shape.setTransform(36.0996,19.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#323031").s().p("AgrC7QhEgpgjhTQgkhTAShNQAShNA+gaQA8gaBEAoQBEApAkBTQAjBTgSBNQgTBNg8AaQgYAKgZAAQgmAAgqgYg");
	this.shape_1.setTransform(32.55,40.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#88D2DB").s().p("AhSFjQiDhNhDifQhEidAjiUQAjiTB0gxQB1gyCABOQCDBNBDCfQBDCdgiCUQgjCTh0AxQgtAUgwAAQhJAAhPgwg");
	this.shape_2.setTransform(32.55,40.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,65.1,80.6), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#70301A").s().p("AhfELQiegKhxhbQhfhMglhoQgbhLAMhEQAMhDAwgsQAEgEAFAFQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgtApgLBAQgLA/AZBHQAlBlBcBJQBuBZCZAKQEIAQCfhDQCghEAKiEQAJhzgGg6QgGg5gXgLQgGgDADgGQADgGAGADQAcANAHA7QAIA7gKB7QgJB9iIBHQiIBGjlAAQglAAg8gDg");
	this.shape.setTransform(48.4551,172.9829,0.4518,0.4518,158.4721);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#9B4F33").s().p("Al3KnQgpgLgigXQhQg1AbhkQAJgjAagxIArhPIBairQALgWAgg4QAbgygBgfQjaGIhPBWQguA0gZgSQgYgRgHhaIAJgcQAKgeASgqIANgfQAbg4BDh3QBOiLArhTQANgZAEgnQAEgngKAaQh/E1h8BvQgzAtgfgIQgfgJAAg6QAAggBjiGQA0hFBJhcQAlgwAahCQAOgiAJgdQAfguAyhQQAqhDApglQBEg+BUgkQBWgkBXgFQDEgKB/CPQA4A+AiB3QAfCHAVA9QAMAlAsAhQASAOBEApQA1AgAWAXQAfAigFApQgKBHhZANQhLAMhCgdQhQgihKhKQhFhDgrhRQgKArgZBfQgZBagKAxQgLA3gIBsQgIBvgKA0QgRBagjAuQgwBAhTgRQhNgRAEhlQADg3AbhmQAIgpAVhmQAQhagCgtQgDg5giAsQgYAggTAvQgeBKgdBtIgwC6IgTBFQgPAmgeAMQgRAHgVAAQgUAAgYgHg");
	this.shape_1.setTransform(43.35,173.5,0.758,0.758,-29.9952,0,0,6.7,-75.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#70301A").s().p("AkdAxQgPgGgDgWQgDgVAJguQAOANAVgDQAOgCAjgOQBaggBIABQBdAABcA0IA2AfQAXALAKgFQAdgQAAgbQAAgfgihGQBLA/AMBXQAKBXg8ApQoChSgYgJg");
	this.shape_2.setTransform(50.1252,176.9827,0.758,0.758,-29.9952);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#9B4F33").s().p("AkdBZQgPgHgDgVQgDgVAJgvQADgVAIghIABgCQAThPBmgZQBlgaCaAhQA/AOAxAkIANALIAAAAQBLBAAMBXQAKBXg8AoQoChRgYgJg");
	this.shape_3.setTransform(48.6167,174.3695,0.758,0.758,-29.9952);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9B4F33").s().p("AgMJfIhmmmQiNpPAShbQAgioDGhxQBig4BcgWIA5aqIjLAHQgCgugvjMg");
	this.shape_4.setTransform(33.65,21.9,1,1,0,0,0,0,-63.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(9.7,0,111.1,285.3), null);


(lib.sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Objects
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7D931").s().p("AgDADIgBgJQADAEABABQACABADACQgBADgDABIgBABQAAAAgBgBQAAAAgBAAQAAgBAAAAQgBgBAAgBg");
	this.shape.setTransform(-5.925,132.5188);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#455756").s().p("ACABcIAAABQgBAAgBgBQAAAAAAAAQgBgBAAAAQAAAAABgBQAAABAAAAQAAAAAAAAQAAABAAAAQABAAAAgBIABgCQgDACgCgEIAJAAQAAgBgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAEABALgFQAAAAgBAAQAAgBAAAAQAAAAAAAAQABgBAAAAQABAAAAAAQAAAAAAAAQAAAAAAAAQgBgBAAAAIgDABQABAAAAAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgBgBIgDAAQAAgBAAAAQgBgBAAAAQgBAAAAAAQgBgBgBAAIgGgBIgEAAQABAAAAAAQAAAAAAgBQgBAAAAAAQgBAAgBAAIgBABQgBAAAAABQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQABAAAAAAQABAAABAAIADgBQAAAEgCAEIgDAAIACACIAEABQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQgCABgDgBQgEgCgDABQAAABABAAQAAAAAAAAQAAAAABAAQABAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAQAAAAgBAAIgGgBIAAAAIgCABQgBAAAAABQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAIAFgDIgBgDQABAAABAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAHAAgBgDIgDAAIgCAAQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAgBAAAAIgBgCIgCAAIgDAAIABgBQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAgBAAIAJgCQABAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBABAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBIgCACIgDgBQAAAAgBAAQAAgBgBAAQAAAAAAAAQAAgBAAAAIgEAAQACAAADgEQgHAAACgCQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAABAAIAAgEIABAAQABAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIACAAIABAAQADgDgDgCIAHgBIgBgCQAAAAAAgBQAAAAAAAAQgBAAAAAAQgBAAAAAAIAAACQgBAAgBAAQgBABgBAAQAAAAgBgBQAAAAAAAAIgBAFQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAIACgDQAAgBAAAAQAAAAAAgBQAAAAAAAAQgBAAgBgBIAHgCIgCgHQAEAAAHgBIgCgBIAHAAIACgFQACgDgFACQAAAAgBAAQAAAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAIABACQgBABAAABQgBABAAAAQAAAAgBAAQAAAAgBgBQABAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAIgCgDQADAAACgCIgFgCIACgBIgHgBIgDACQAAABAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAgBAAIgEAAQgBABAAAAQAAAAAAABQgBAAABAAQAAABAAAAIAFgBQAAABgBAAQAAABAAAAQAAABABAAQAAAAABAAQABABABAAQAAAAABABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBIgCAAIgIgDQAFgDgBgDQgCgDACgCQAAAAAAAAQgBgBAAABQAAAAgBAAQAAAAAAAAQAAABgBAAQAAAAAAAAQgBABAAAAQAAAAgBgBQADgBABgCQABAAAAgBQAAAAAAAAQAAgBAAAAQgBAAAAAAIACAAIgBABQAAABAAAAQABAAAAAAQABAAABAAQABAAABgBQgEAAACgDIACAAIAAgCQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAIgBABIgBgCQgEAEgCgBQgCgDgEgBIACAAIAAgCQgGAEgDgBQABgBgFgEQADgCAEgBQAEAAACgBIABgGIgCgBIgCABQAAABAAAAQAAAAABABQAAAAABAAQAAAAABAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIgCAAIgCACIgDACQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIACgEQgBAAgDADQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBAAgBAAIADgBQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAABAAAAQAAABAAAAQABAAAAAAQABAAAAgBIACgCQABAAAAAAQAAAAAAgBQABAAAAAAQAAAAAAAAIABgDQAAAAgBAAQgBAAAAAAQAAABAAAAQgBAAAAABQAAAAgBgBQgBAAAAAAQgBAAAAAAQgBAAAAABQABgBAAgBQABAAAAgBQAAAAgBgBQAAAAAAgBIgCABQgBABAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgDAAIAAABIgBgCIABABQABAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAIgBgBIABgBQgCAAgEADQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIABgCIgCACIgBgBIgCAEQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAgBABgBQAAAAAAgBQABgBAAAAQAAgBAAAAQAAgBgBAAQgFACgBgEIACABIACABQAEgCgBgDQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAgBAAQAAABAAAAQAAABgBAAIgBgBQAAAAgBAAQAAgBAAAAQAAAAAAAAQABgBAAAAIgCAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBABIAAACQAAgBAAAAQAAAAAAAAQgBgBAAABQAAAAAAAAIADgFQgBABAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQgCAFgCAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAIgBgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIgCACQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAIgCgBQAAAAgBAAQAAAAAAAAQAAAAgBABQAAAAAAABQgBAAAAABQAAABAAAAQAAAAAAABQAAAAAAAAIgDACIABgCQAAAAAAAAQgBgBAAABQAAAAAAAAQAAAAAAABIgCABIABgCIgCADQAAgDADgCQAAAAAAgBQgBAAAAAAQAAAAAAAAQgBABAAAAIgCAAQABAAAAAAQAAAAAAAAQAAAAABgBQAAAAAAgBQgBAAAAAAQAAAAgBABQAAAAAAAAQgBAAAAABIgDACQAAABAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIACgBIgBAFQAAgBAAAAQAAgBAAAAQgBAAAAABQAAAAAAABIAAACIgBgCQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAIAAgEQAAAAABgBQAAAAAAAAQAAAAAAAAQABgBAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAAAAAAAAIACgDQAAAAAAAAQABgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIABABQgFACgCAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIAAACIACAAQAAAAAAAAQAAAAAAAAQABAAgBABQAAAAAAAAQgBAAAAAAQgBgBgBAAQAAAAgBABQAAAAAAAAIAAAAIgBABIAAgBIgBgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBABAAAAIABABIgDABQAAAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQAAgEACgCQACgCABgDQgDABgFAFIgBAFIAAgBIgBgBIAEgHQgBAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAgBIgBgCQAAABAAABQAAABAAAAQAAABgBAAQAAAAAAAAQAAABAAABQAAABAAAAQAAAAABAAQAAAAAAgBIgBADIAAAEQgCgBgBgFQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAIAAADIgDAEQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAABgBQAAAAAAAAQAAgBAAAAQABAAAAAAIACAAIgBABIABgBQAAAAABAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgDQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABIAAACQACgBAAgHIgCgBQgBAHgCgEQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQABgBgBAAQAAAAAAgBQAAAAAAAAIgBAAIgBgCIgBAAQAAAAgBAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBADABAEIgBADIgCgDIAAAEQAAAAAAAAQAAgBgBAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQAAgBgBgBIAAADQgEgEACgEIAAADQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIgFgGQAAAAABAAQAAAAAAAAQAAAAAAAAQAAABAAAAIACACQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIgCgEQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQgBAFADAFIgCAKIgCAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAIABgDQAAgBgBAAQAAAAAAABQAAABgBABQAAABAAABIgCgBQACADgCADQAAABAAAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAAAAAABQAAAAAAAAIABACIgGAAIABADQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBABAAAAIgBABIgBgEIgBABQAAAAAAgBQAAgBgBAAQAAgBgBAAQAAAAgBAAIgCgGQAAABABABQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAgBgBQgBAAgBgBQAAABAAAAQABABAAAAQAAAAAAAAQABAAAAAAIgBACIgBgBIgBAAQADAIACABIgCgDIAEACQAAABgBAAQAAABAAAAQgBABAAAAQgBAAgBAAQgEAAgBABIgDgCQAAAAAAgBQAAAAgBAAQAAAAAAABQAAAAAAAAIACAEIgCgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAIgCgCIgBgCIgDgBIABAFQAAABAAABQABAAAAABQAAABAAAAQAAABgBAAIACABIABABIgBgEIACACQAAABAAAAQAAABAAAAQABAAAAAAQAAAAAAAAIgCAAIgDgBIABAAQgBgBAAAAQAAgBgBAAQAAAAgBAAQAAgBgBAAIgDAAIAFAFQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAIgDAAIADAEQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAgBIgCACQAAAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAIgCgCIgCAAQABABAAABQABABAAAAQAAABgBAAQAAAAgBAAIgDABIgBgCIgCgBIAAABIgDAAIACACIgEgEQgDgDgCABQAAAAAAABQAAAAAAABQAAAAABAAQAAABABAAIADAEIgDAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIgDgBQABAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAAAAAIgBgBQAAAAAAAAQAAABgBAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBAAQAAABgBgBQgBAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAgBAAIgBABIAAACQAAgBgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBgDIgDAAIgCgCIABADQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIADACIgDAAQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIgBgCQgBAAAAABQAAAAgBAAQAAAAAAABQgBAAAAABQAAABAAAAQAAABAAAAQAAAAgBAAQAAABAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQABABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQgBAAAAAAQAAAAgBABQAAAAABAAQAAABAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQgDAAgFgCIgGgDIAAgCQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAAAgBAAIAAAAIgCgBIAAgCIAEAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAIAEgDIAAABQAAAAABAAQAAAAABAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQABAAAAAAQABAAAAAAQAAgBABgBQAAAAAAgBIAAACQALgHAHgRIAAABQABgBAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAIgBAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAgBQAAAAgBgBQAAgBAAAAQAAgBgBAAQAAAAgBgBQABABAAAAQAAAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQABAAgBABQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAgBIABgDIABADQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAABAAQgDgEADgGQAEgGgBgEIACABQABgDADgDIAGgFIAGgBIABACQgBgDADgCQAEgDABgCQAJgGAFAEQAAAAgBAAQAAABAAAAQAAAAgBAAQAAAAAAgBIgDABIACAEQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIADABIABgDQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIABABIAAgCIABABIACgDIABgEIAAAFIABgBIAAAAIABgEQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAAACIABgCIAAACIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIACgCQABABAAAAQAAAAABABQAAAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAABgBAAQAAAAAAAAQAAAAAAABQABAAAAAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAAAIABgBIABgBQAAgBAAAAQABAAgBgBQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQABgDAGgEQAEACAKgCIgBACQACAAADgDQAAABAAABQABAAAAABQAAAAABAAQABABAAAAIAFgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIABADIACgDIAAABIACgCQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQACABAHgCIgDACQAAABAAAAQgBAAAAAAQAAABgBAAQAAAAgBgBIABgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAABAAAAIAAABQAAABAAAAQAAAAAAAAQABABAAAAQABAAAAgBIAEAAIAFgCQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAABQAAABAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAABAAAAQAAABAAAAQAAABABAAQAAAAABAAQAAAAABAAQABgFgCgBQAAgCAEgCQACABAGgBQAHgCADABIgBABIAbAGQAAAAAAABQAAAAAAABQAAABgBAAQAAABgBAAIAFgBQAAgBABAAQABAAAAAAQABAAAAAAQAAAAABABQgBADAFAAQAEABgBADQABgBAAAAQABAAAAAAQABAAAAABQABAAAAABIgCABQADADAGAAQAHABACADIgBAEQAFAAADAEQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBABQABAAABAAQAAAAABAAQABAAAAAAQAAABABAAQAAABABAAQAAABABAAQABAAAAAAQABAAAAAAQAAABAAABQAAAAAAABQABABAAAAQAAABABAAIgGABQgEABAAADQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBIgCADIADABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAIgBAAIAAACQAAABAAAAQAAAAAAAAQABABAAgBQABAAAAAAIADgDQABAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAIgDADIABABQgEAAgBACIADACQABABAAAAQABAAAAAAQABgBABAAQAAAAABgBQAAAAAAAAQAAAAAAgBQAAAAABAAQAAAAABgBIAAACIADgCQACgDgEgCQgEgBABgDIABABIADgDIAEABIgCABIADADQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAIgCABQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAIADgBQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAAAAAABQgEgEgEADQACACAFACQAFACAAADIgBACIAEABQAAABAAAAQgBAAAAABQAAAAgBAAQgBAAgBAAQAAABgBAAQgBAAAAABQAAAAAAAAQgBABAAAAIAGgCIACAEIgBAAIgCAEIADgCIAAgBQABAAABAAQABAAAAAAQABAAAAABQAAAAAAABQAAABAAABQAAAAAAABQAAABABAAQAAAAAAAAIAAABQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCgBIABAAIgDgBIAAAGIAEAAQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAAAAAIgCAAQAFgBADADQgDACABAFIACgBIACABQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQACAFADgCIACAAQABAAAAAAQABAAAAAAQAAgBABAAQAAAAAAgBIgBADQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAIgFABIAGACQABAAABAAQAAAAABAAQAAAAABABQAAAAAAAAIgBAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAABQAAABAAAAQAAABABABQAAAAAAAAQAAABAAAAIgDABIAAACIABgBIAAADIgCACIAAgDQAAAAgBAAQAAABAAAAQAAAAgBAAQAAAAAAABIAAgDQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAgBQgEACABAFQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQgBAEADABIAKACQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAAAABQgBAAAAAAQAAgBAAAAQAAAAAAAAIgBgCIgFABQABABAAAAQAAAAAAAAQAAABAAAAQAAAAgBABIgCADIgCgDIgCACQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQgCgEgGADQACAAADADIgHABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAAAABQAAAAAAAAQAAABABAAQAAAAABAAIADgEQAHACAAAEQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIACAFIAEgCQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQABABAAABQABAAAAABQAAAAAAABQAAAAAAAAIAEADIAAAAQAAAAAAAAQAAABAAAAQABAAABAAQAAAAABgBQAAABAAABQgBAAAAAAQgBABAAAAQgBAAAAgBIgCgBIgCAAQADACgGACIADACQABAAAAAAQABABAAAAQABAAAAAAQAAAAABgBIgCgCQgBAAAAAAQAAAAAAAAQgBgBABAAQAAAAAAgBQAAABABAAQAAABAAAAQABAAAAAAQAAAAABAAIAEABIgBABIADABIgCAAQAAABAAAAQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQgBAAAAAAIgDgCQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIAFACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIACgBIACAEIgBgBIgBAAIADAEQAAAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgEAAIgBABQAEgCgHgDQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBgBIgBgDIAEABQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAgBgBQgEgDgCAAIAAACIABABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAIACACQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAIgCgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIgCABIgCACIgDgBQAAAAAAAAQABABAAAAQAAAAgBAAQAAABAAAAIAAABg");
	this.shape_1.setTransform(256.8667,-29.3875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#455756").s().p("ABzBYQAAAAAAAAQABgBgBAAQAAAAAAAAQAAgBgBAAQADAAACgDIgBgDIACAAIAAACIAEgBQAAgBAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBQgEgBgBABQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAgBAAAAIgDAAQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAgBAAIAJgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABAAIgDABIgDgBQAAAAgBgBQAAAAgBAAQAAAAAAAAQAAgBAAAAIgEABQADAAACgEQgGgBABgCQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAIAAgEIABAAIABgBQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIADABQADgDgDgDIAHgBQAAAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAIAAACIgFAAQAAABgBABQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIgDABQgBABAAAAQAAAAgBAAQAAABgBAAQAAgBAAAAIACgDQAAgBAAAAQAAgBAAAAQAAAAAAAAQgBgBAAAAIAGgCQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIAAgEIAKgBIgCgBIAHAAIACgEQADgDgFABQgBAAAAABQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBAAAAAAQgBAAAAAAIABADIAAAAQgBABAAAAQgBABAAAAQAAAAgBAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIgCgCQADAAACgDIgFgCIADgBIgIgBIgDADIAAACIgBACQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAIgFABQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABABAAIAGgBQgBABAAAAQgBABABAAQAAABAAAAQAAAAABABQABAAABAAQAAABAAAAQABAAAAABQAAAAgBABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIgDAAQgBgCgGgCQAEgDgBgCQgCgDADgDQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABIgCAAQAHgDgEgCIADABIgBABQAAAAAAAAQAAABAAAAQABAAABgBQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAIACgBQAAAAAAgBQAAAAgBgBQAAAAgBAAQAAAAgBAAIAAABIgCgBQgEADgCgBQgBgCgFgCIACAAIAAgCQgFAEgEAAQABgCgFgEIAHgDIAGgCQACgDgBgCQAAAAgBAAQAAgBgBAAQAAAAgBABQAAAAgBABQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgBACIgEABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIABgDIgEACQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAIgBAAIACgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBABgBIAAACQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAABAAIACgCQAAgBAAAAQAAAAAAAAQABAAAAAAQAAAAABAAIABgEQgBAAgBAAQAAABgBAAQAAAAAAABQAAAAAAAAQgEgBgBABQACgCgBgDIgCACQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIgDABIAAAAIgBgBIACAAIABgBIgBgBIABgBQgEAAgBADQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBABQAAAAAAgBQgBAAAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAgBAAIABAAIABgDIgCABIgBACIgBgCIgCAEQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAgBAAAAQAAgBABAAQAAgBgBAAQAAAAAAAAQgFACgBgEIACABIACABIACgDQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBgBQAAAAgBAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABgBAAQAAABAAABIgCgCQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBAAIgCABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAgBABIAAgBIgBAAQABgCACgCQgBAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIgBgBQgCAFgBgBQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAgBQABAAAAAAIgCAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABAAIgCABQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgDgBQgBAAAAAAQAAAAAAAAQgBABAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAAAABAAQgBABAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAIABgCIgBABIgBABIAAgCIgCADQAAgCADgDQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgCAAIACgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABIgDACQAAABAAAAQAAABABAAQAAAAABAAQAAgBABAAIgBAEQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABIAAACQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAAAgBABIAAgFQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAAAAAIACgBQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQAAgBAAAAQAAAAAAgBIgCAAIgCABIABABIgDAAIgEABIAAAEIACAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABIgDgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABIAAgBIgBABIAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAAAAAABIAAACIgDABQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAIgDADQAAgEACgCQACgDABgCIgIAFQAAABAAAAQAAAAAAABQAAABAAAAQAAABAAABIgBgBIgBgBIAEgHIgBgCQAAgBAAAAQgBAAAAgBQAAAAAAAAQAAAAgBAAQAAABAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQAAABAAAAQABAAAAAAQAAAAAAgBQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABIgBADQgBgBgBgFQgBACACAEIgEAFQAAgBAAAAQgBAAAAgBQAAAAAAAAQgBAAAAAAIgDgBIABgCIACAAIAAABIABgBIABABIAAgDIAAACQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQABAAAAgHIgCgCQgBAHgCgEQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBIAAgCIgCABIAAgDIgBABQgBAAAAAAQAAAAAAAAQAAAAgBABQAAAAAAABIABAEIAAADIgCADQAAgBAAgBQgBAAAAgBQAAAAgBAAQAAAAAAAAIAAAEQAAgBAAAAQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQAAgBgBAAQAAAAAAgBIAAABIgBABQgEgEACgDIAAACQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAgBIgEgGIACADQACgCgEgEQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQgCAFADAFIgCAKIgCABIgCgCIABgDQAAAAgBAAQAAAAAAAAQgBABAAABQAAABAAACQgCgGAAAEQACAEgCADQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAABQAAAAAAABIABABIgGAAIABADQgBgBAAAAQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgBgDIgBABQAAgBgBgBQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAgHgCACIABACIgBABQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAgBAAIACACIAAACIgBgBIgCAAQACAGADADIgBgEIADADQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAQgEAAgBABIgCgCQgBAAAAgBQAAAAAAABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAIgCgBQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAIgCgBIgBgDIgDAAIABAFQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABIABACIACAAIgCgDIACACIACACIgCABIgDgDQAAABAAAAQABABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABAAABAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAAAAAIgEgBIAFAGQgBAAAAAAQAAgBgBAAQAAAAgBAAQAAAAAAAAIgDABIADADQAAABAAAAQAAAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAAAAAABQAAAAABAAIgCgBIgCAAQAAABABAAQAAABAAAAQAAABgBAAQAAAAgBAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAAAAAIgBgCIgBAAIgBABIAAgBIgCAAIABACQgBAAgDgDQgDgEgCABQAAAAAAABQAAAAAAABQAAAAABABQAAAAABABIADAEIgDgBQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAABQAAAAAAAAQABAAAAABQAAAAABAAQgBAAAAABQAAAAAAAAQgBAAAAAAQAAgBgBAAIgDgBQAAAAAAABQABAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAIgBgBQAAAAAAABQAAAAAAAAQgBABAAABQABAAAAABQAAABAAAAQAAABgBAAQAAAAgBAAQgBAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAIgBACIAAABIgDAAIgBgEIgDAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAgBAAIABADIADACIgBAAIADADIgCgBQgBAAAAAAQAAAAgBAAQAAAAAAABQAAAAAAABIgBgCQgBAAAAAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQgBgBgBAAQgBAAAAAAQAAAAgBAAQAAAAAAABQgDAAgEgCIgHgDIAAgCIgCgCIAAABQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQADgBAEABQAAgBAAAAQAAgBABAAQAAgBABAAQAAgBABAAIAEgCIAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAIAAABQAAgBABAAQABAAAAgBQAAAAABgBQAAAAAAgBIAAADQAKgIAIgRIAAABQABgBAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAIAAAAQABgFgEgCQABAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQAAAAABABQAAAAABgBQAAAAAAAAQAAgBAAAAIABgEIABADQAAABAAAAQAAAAAAAAQAAABABAAQAAAAABAAQgDgFADgFQAEgGgBgEIACABQABgEADgCIAGgFIAGgCIABADQgBgEADgCIAFgEQAJgIAFAFQgBABAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABIACAEQAAAAAAgBQAAAAABAAQAAAAAAAAQAAAAABAAIACABIABgDQABgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABABIAAgBIABABIACgEIABgDIAAAEIABgBIAAAAIABgEQAAgBAAgBQABAAAAAAQAAgBABAAQAAAAABAAIAAABIACgBIgBACQAAAAAAAAQAAAAAAAAQgBABAAAAQABAAAAAAIACgDIACgCQAAABABAAQAAABAAAAQABAAAAAAQABAAAAgBQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQgBAAAAABQAAAAAAAAQAAAAABAAIACACIADgDQAAgBAAAAQAAAAAAgBQAAAAAAAAQgBgBAAAAIgCAAQABgDAGgEIAHABIAHgBIAAADQACAAACgDQABAFAHgDIAAgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBABAAIAAAFIACgDIABAAQAAAAAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQADABAGgCIgCACQgBABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAIAAgBQgBAAAAgBQAAAAAAAAQAAAAAAABQAAAAAAAAIgBACQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABAAIADABIAFgDIgCADQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQABAAAAAAQAAABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAAAABAAQAAABABAAQAAAAABgBQABgFgCgBIAEgEQACABAHgBQAGgBADABIgBABIAbAFIAAACIgBADIAEgCQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABABQgBAEAFAAQAEAAgBADQABAAAAAAQABgBAAAAQABABAAAAQABAAAAABIgCABQADADAGABQAHAAACADQAAABgBABQAAAAAAABQAAAAAAABQAAAAAAAAQAGAAACAEIAAABQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQABAAAAAAQABAAAAABQABAAAAABQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAQAAAEACABIgGABQgEABABAEIgEAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBIgCADIADABQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAAAIgBAAIAAADQAAAAAAABQAAAAAAAAQABAAAAAAQABAAAAgBIAEgDQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAABAAIgDACIAAABQgEAAgBADIADACQABAAAAAAQABAAAAAAQABAAAAAAQABgBABAAIADgDIgBACIADgBQACgEgEgBQgEgCACgDIAAABIADgDIAEABIgCABIADADQABAAAAAAQAAABABAAQAAAAABAAQABgBAAAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAgBABAAQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAAAABABQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIgDgCQgCAAgDABQABACAGACQAFACABADIgCACIAEACQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQAAABAAAAIAFgBQABAAAAAAQAAABAAAAQAAABABAAQAAABAAAAIgBAAIgBACIAAACIACgBIAAgCQABAAABAAQABAAAAAAQABAAAAABQAAAAAAABQAAABAAABQAAABAAAAQAAABABAAQAAAAABAAIgBAAIACACQAAAAAAAAQAAABABAAQAAAAAAAAQABAAAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQAAgBAAAAIgCgBIABAAIgDgBIAAAHIAEAAQAAgBAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIgCgBQAFgBADADQgCACAAAFIACgBQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAEAEgBQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAAAAAIgBACQAAAAAAABQAAAAAAAAQAAAAAAAAQAAABABAAQgEACgBgBQAAABAFABQABAAAAAAQABAAABAAQAAABAAAAQABAAAAABIgBgBQACACAAADIAAAEIgDABIAAACIABAAQAAAAAAAAQAAABAAAAQAAABgBABQAAAAAAABIgBgCIgCABQABgEgCgCQgDABAAAGQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAABQABAAAAAAQgEACgDgEQgBAEADABQAHACAEAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAgCIgDAAIgDACQABAAAAAAQAAAAAAABQAAAAAAAAQAAABgBAAIgCADIgCgCIgCABQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQgBgBABAAQAAAAAAgBQgCgDgGACIAFADIgHABQABABAAAAQAAAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAAAAAABQAAAAAAAAQABAAABAAIAEgEQAGADAAAEQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIADAFIADgBQAAAAgBABQAAAAAAABQAAAAAAABQABAAAAABQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABIAFACIgBAAQAAAAAAABQAAAAABAAQAAAAABAAQABAAABAAQgBAAAAABQgBAAAAAAQgBABAAAAQgBgBAAAAIgCgBIgCgBQAAABABAAQAAAAAAAAQAAABAAAAQAAAAgBABIgDACIgCAAQgBgBAAAAQAAgBgBAAQAAAAgBAAQgBgBAAAAIgHgBIgEABQAAAAABAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIgCgBIgBACQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQACACAGgDIgCAFQAAAAAAABQgBAAAAABQAAAAAAABQAAAAAAABQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAAAAAIACADIAAgBIAFABQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAAAQgBABgEgBQgEgCgCABQAAABAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAgBAAQAAAAAAAAIgFgBIgBABIAAgBIgCACQgBAAAAAAQAAAAAAAAQABAAAAAAQAAABABAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBgACWA6IAAABIgDAAIgBgBIAGAAQABAAABABQAAAAABAAQABAAAAABQAAAAABAAg");
	this.shape_2.setTransform(178.3857,-48.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#455756").s().p("AAHE4QAAgBgBAAQAAAAAAAAQgBgBgBAAQAAAAgBAAQAAgDAIgBQAHAAAAgCIgHAAQgCAAAAAAQgBAAAAAAQgBAAAAgBQABAAAAgBIgEACQgEgCgGgBIgNAAQgFAAAAADQAAADAFAAIgGACIgGAAQAAAAAAgBQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAAAAAABQgBAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAgBgBAAQAAAAgBgBQAAAAgBAAIgEADQgFgEALgBQgDgBgFAAQgFABgCgBQABAAAAAAQABAAAAAAQABgBAAAAQAAAAAAgBQgGgBgFACIgKABQADACAEAAIAHAAIACAFIgDgBQgBAAAAgBQgBAAAAABQgBAAAAAAQAAAAAAABIAEACIgHgCQgFgCgDABIgGgGQABgCAFABQAFABACgBQgBAAAAAAQAAgBAAAAQAAAAABgBQABAAACAAQAEgBgFgCIgOgCIADACIgPgBQgJAAgFgCQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAABABIAEACIAIABQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAQgEAAgJgCIgLgCIAAgBIgDAAQgLgFgDABIAEADQgEgCgKgBQgIgCgCgDQgDgBgDAAQgDABgEgBQgBgEAKAAQALABACgCIgUgDIgSgDQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAgBABQgBAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIgFgDQgBgBgBAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAMADAIgDQgGgDAAgBQABgBgGgEQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBAAQgBAAgBgBIABACQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAQAAABAAAAQAAAAgBAAQAAABgBAAQgBgBgBAAQgHgBABADQgMgGgBgGQgEgBABADIABAEIgVgGQgBgCgKgFQgLgGgEgEQAFAAAFACIAJAGQgCgBAAAAQgBAAAAAAQgBAAAAAAQABABAAAAIAGACQADABACACIACgDQABABABAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAABABQAAAAABABQAAAAACABQADACAEgCIAGgCIgKgGQgCABgGgBQgGgCgEgEQAEACAEABQAAAAABAAQAAAAABgBQAAAAgBAAQAAgBAAgBIgRgHIAHADQAFACgDgDIgHgEQgEgDgDAAQgEgBAAAEQAAABAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQACAAgNgFIgCgDQgBgDgEgCQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABIAAACQgBgEgKgEQgJgEgBgEQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgFgDQABgBgCgFQgCgEAHADQAAABgBAAQAAAAAAABQAAAAgBAAQAAAAAAAAQAFADADgBQgIgJgBgGQABABAAAAQABAAAAABQAAAAABABQAAAAAAABIACAEQABAAABABQABAAAAAAQABAAAAAAQAAgBAAgBQgCgFABAAQgKgKACgBQgMgEACAIQgIgCgSgIIgIgIQgGgFABgCIAKAGQgCgEgNgGIgBgDQAAgDgDgBQgCAEgLgJQgGgFgCgGQgBgFgFgDIAAAEQgIgKgIgPIgEABQAAgEgDgCQgEgEgBgCIAFABIgGgHQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQABgCgCgDIAHADQAEAAgEgEQAAABAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgDgCgCgEQADACgBgDIgCgGQgBgBgBAAQAAAAAAAAQAAAAAAAAQAAABAAAAIABAEIgGgHQAAABAAgBQABAAAAAAQAAAAAAgBQAAAAgBgBIgCgFQgMgDABAGIAFAAIAAAIQgGgGgFgNIgLgWQgBAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQABgCgEgFQgCgBAAAAQgBAAgBAAQAAAAgBAAQAAABAAABIgBgIQgBgGgEgCQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAgBQAAAAABABQAAAAABAAQAAABABAAIgCgHQgEgFgFgDQgFgDgEgGIgBABQgBAAAAAAQAAABAAAAQAAABAAAAQABABAAABIAGAEQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQgCgCAAADQgBgEgDgGQAAAAAAAAQABAAAAgBQAAAAAAgBQABgBAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQACgCADAJQADAAgBgGIgCgJIgEABQgCABgDgDQABgCgCgGIgCgIQgFgEABAEQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQgBgBgCgIQgCgGgCgBQAAAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBIgBgGQgFgBgCgLIgDgNIAEAEQAAAAAAgBQABAAAAAAQAAgBgBAAQAAgBAAgBIgCgFIABABIAAgGIgDgCQAAgDAFABQAEAAgBgGQgCgGgDABQgFAAgBgCIABgHQgDAAgBgGQgBgBAAgBQAAgBgBAAQAAgBgBAAQAAAAAAABQgCgFACgCQABAAAAgBQAAgBABAAQAAgBAAAAQAAgBAAAAQgCgCAAgEIgBgIIACACQgBgFgFgJQgEgGADgHIACADIABACIgCgJIgBgDQABgCAAgFQACACADAFQABgBgBgHQAAABABABQAAABABAAQAAAAABAAQAAAAABAAIgEgIQgDgDAAAHIAAgCQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAIgEABQAAgDABgDQACgDgCgFIACACQABgDgDgKQgDgIABgCQADADAAgEQABgFACACQgDgEABgHQABgIgDgCQgBgEADgFQADgEgBgEQACgHAFgCIAHgEIABAHQAAABABAAQAAABAAAAQAAABABgBQAAAAABAAIAAgDQADAEABAEIgDAGIgBAJQACAGAAAJQgBAKABAFIgBgCQgBAEACAFQADAEgBAGIgBgBQAAALAEAGIgEgGQAHA0AZA3IgBAAQADAHABgCIAAgCQACAFAEAEQAEAEABgCQgBADADACQAAABABAAQAAABAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAQgBgBAAAAIgCgDQgBAEAEAFIAFAJIgEgDQgCgDAAAFQAGADAKASQALATAGAEIAAAEQAJAJAPAdIAIASIgDAAQAFABAGAKQAJANADADQAWAcABAJQgFgEAAgCIgDgGIgEACQAFACgBAHQADABAFAEQAFAFADAAIgBABIADACIAAABIAIAFIAHAFIgGgBIAEACIgBABIAIADQAFABAEAFIgBABIAEADIgDgBQgBgBgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAFABALAJQgCACAGAFQAHAFgBACQgBAAgBAAQAAgBgBAAQAAAAAAABQAAAAABABQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAIAFADIAFACQAEABgCgDIgEgEQAEABASALQAIAIAYAQIgDABQAFADAIACQgBADAIAFQAGAEAGACQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAABAAIAAAFIADABQABAAAAAAQABAAAAAAQABAAAAAAQAAgBABAAIAAABIAGABQAAAAABABQABAAAAgBQABAAAAAAQAAAAAAgBQAHAEARAFIgGAAIgHgCIABAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQACACAHADIAKAFIANABQAAACgFAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAABAAAAQAEABABAEQACADAHABQADgEgFgCQAAgBAAAAQAAgBAAAAQABAAABAAQAAAAACAAIAGAAQAFADAUADIAbAEQgBAAgBAAQAAAAAAAAQgBABAAAAQAAAAAAAAQAyAIAbgBQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABIgBACQADAAAEgDQAFgCAFABQAEADALgCQAKgCADADQACgCAJAAIgDACQAKAAAQgEQAPgGAJAAIACACQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAMgFAMgDQAAAAAAAAQABAAAAABQAAAAAAAAQgBAAAAABQAAAAAAAAQgBABABAAQAAAAAAAAQAAAAABAAQADgEAIgBQAHgCADgDQAGABAHgDIgHAIQgEAEAIAAQgCAAgDAEQgDAEgFAAIAEACIAHgEQADgDAEAAIgCACQAKABABgFIgCgEQgBgBAFgDIAAAEIAFgCIADgDIgGAGQgBABAAABQgBABAAAAQAAABABAAQAAAAABAAIALgFQAFgDgBgDQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAIACgEQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAAAAAAAQAAgBAAAAIAAgCQgGgCgJAGQgJAFgFgBIACgBQAAgBAAAAQAAgBAAgBQAAAAAAAAQgBAAAAAAIAHgGIABACIAKgEQAFgDABgDIABACQACABADgCQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgDAEgCQADAAAGgEQAFgDADABQgNAIACADQAHgDAKgJQAKgJAHgCIADABIAIgHQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAABQgBAEAFgCQABgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBIgBgDIAKgGIgBABQAAACAJgEQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAAAgBAAIgDABQABgFAHgDQAJgEADgDIAAAAQABgCAFgDQADgCABgDQAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAIgDAEIgBAAIgDAEIAIgDQAFgCADgDIACgGQgBAAAAABQgBAAAAAAQgBABAAAAQAAABAAAAIgDAEQABgDACgEIAFgHQAGAAAMgJQgBAAAAABQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgCADgCQAFAAgEAEQgEAGACABQAMgIgDgEQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAgBQgBgBAAAAQAAAAgBAAQAAAAgBAAIAGgCQADgBABgCQAEACgBACQADgDABgGQABgGAEgDIAAABQADgFAIgFQAIgGABgCIADACIAEgEIgBgBQADgDACgBIAGgDIgGAGQAAAAAAABQAAAAAAAAQABAAAAAAQABgBABAAIgHAGIgGAHQAEADAMgOQAAAAgBAAQAAgBAAAAQABAAAAgBQABAAABgBQAEgDAAgCQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABQgBAEgDAEQAJgHADgHQAEgMgCgEQAFgGADgCQACADgHAFQAAAAAAABQAAAAAAABQAAAAAAAAQABAAABAAIADAAQABgDAFgCQAFgCADgDIgGAJIAEgBQgDABgDAGQgEAGgEACQgJALAHACQAGgJABgFQAAAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQABABAAAAQACgFAGgBQAFgCAAgFIgLAFQAEgNAKgLQgEAIABACIALgQIgEgBQAEgBAFgIQAFgKADgDIADgKIABAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAAAQAAgBABAAIAEAAQAAgBAAAAQABAAAAAAQAAAAAAABQAAAAAAAAQgDAEABABIAAAEQABgFAEgCIAHgDIACgHQAAgCAAAAQAAgBAAgBQAAAAAAAAQgBAAAAAAQgCACgBAEQAAADgEADQAEgGgBgCQgCgCABgFQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAABAAIAAgHQAAABABAAQAAAAAAABQAAAAABAAQAAAAABgBQACgCAAgEQgBgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIgCAHQgBAEACACIACgLQACgGADgEIgEABIAGgLIgBAEQgBAAAAAAQAAABAAAAQAAAAAAAAQABAAAAAAIAGgOQAAAAAAABQAAAAAAAAQABAAAAAAQABgBABAAIAFgGQgBABAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAIgBgCQADgEACADIACAEIADgCQgHAFABAJQABgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIABACIgFAJIgCgEQgBgEgDAHIgBAHQgBAEABABQAFgEAAgDQAAABAAAAQAAAAABAAQAAgBABAAQAAgBABgBQADgFACABQABgHAFgFQABAFgEACQAEAAAGgHQgBACABADQABgDACgCQACgCABgDQABABgDALQABAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBQABACgCAEQgBAEgCACIACgEIgHAHQADgBAAADIgDAHIgCgEQgBgBAAAAQAAgBgBAAQAAAAgBAAQgBAAAAAAQgDAJgFAFQAAgEgGAAIgKABQgCAFgCAAQgCAAgBAFIAEgCQgEAFgCAFQgDAFABABQgEAHABAEQAAAGgBAFIAEACQgBAAgBAAQAAAAAAABQgBAAAAABQAAAAAAABIgBAEIAEgDQABAAAAAAQABgBAAAAQABAAAAgBQAAAAABgBQACgEgDgBQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIALgLQAGgFAEgFIABADIAEgJIAAABIgBgGQgBgDADgCQADgCgCAIQgBAJAEgCQADgDgCgDQAAAAAAgBQgBAAABgBQAAAAAAAAQAAgBABAAIACAIIAAgBIAAACIAEgCQACgCABgDQABACgFAFQgEADAAADQgCgBgHAFIgIALQgCgBAFgFQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgEABgDAFQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQgBABAAABQAAAAABABQAAAAAAAAQAAAAABAAQgBAEgDADQgEAEgBAEQAAgBABAAQABAAAAAAQAAABAAAAQAAAAAAABQAAABAAABQAAAAAAABQAAAAAAAAQABAAAAAAIgEAEQgBABAAAAQAAABgBAAQAAABAAAAQAAABAAAAQgFgBgCgEQgBAAgBABQAAAAAAABQgBAAABABQAAABAAAAQACACgEADIAEgCQgBACgBAFQgBAFgDADIACABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAgDgMAJQgCAJgFAFIACgCIABgDIgLAJIAAgBQAAAAgBAAQAAAAgBAAQAAAAgBABQAAABAAAAIgDADQAEgHgDABQgJAFgIALIgDgHIgFAFQgDAEABABIAGgEIABADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQAMgJACgCQgDAGgDAAQgBAEAFgCQAEgCgCADIgJAGQgGADgCAGQgBgDgGAAQgBACgUAQQABgDAAgEIAAgHIgEAGIABgKQgCACgJADQgIACADAFQABACgFAEQgFADACACIAHgGIAFgCQABAAAAAAQABAAAAAAQAAAAgBABQAAABgBABQgBgCgFAEIgJAIQABgEgHACIgHALIgBgBIgBgBIgGANQAFgBAAADQAMgJABABQgFAEABADQAAAEgDADQACACAGgFIAAgDQgBgBAAAAQAAgBABAAQAAgBAAgBQAAAAABgBQAFAAAFgIQAGgIAFgCQAAABAAAAQABABAAAAQAAAAgBABQAAABAAAAQgBABgBABQAAAAAAABQAAAAAAABQAAAAAAAAQgFAFgEAGIgHAKQgHgBgJAHQgLAJgIABQgEAEAEgBQAAAAABAAQAAAAAAABQAAAAAAABQAAAAgBABQgBgCgFABQgFAAgEAFIAAAAIAAAAIAFgGIACABQADgCABgCQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgFAHgGABQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIgGADQgDADAAACIACAAIgGAEIAEADQAAAAAAABQAAAAAAABQAAAAgBABQgBABAAAAIgXASIACgEIgHAEQAGAFgHAGQgGABgWAOQgDgDAEgGQAEgGgBgCIgQADIgFADQgBABgBAAQAAABAAAAQgBABABAAQAAAAAAABQAFgBAGgGQAAACgEACQgFACABACIAFAAQgDACAAADQAAADgEABIgJAAQgBABgBAAQAAABAAABQgBAAAAAAQAAABABAAIADABQgEABgEADIgBABIgBgCQgDAAgHAFQgFAEgHgBIAIgCQAEgBABgDQAAAAAAAAQAAgBgBAAQAAAAgBAAQAAgBgBAAQgBAAAAAAQgBAAABgBQAAAAABgBQAAAAACgBIgKABIgDADQAAAAAAAAQAAABAAAAQABAAAAAAQABgBABAAIgIAFQgFACABABQgBgDgNADQgBAAAAABQgBAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABABAAQAAAAABgBQABAAABAAIgJAFIACAAIgIACIAFgCQABgBABAAQABAAAAgBQAAAAAAgBQAAAAAAAAQgHADAAgCQgKAFADACIAFAAQgEADgEgBQgFgCgFADIABgBQAAgBgGAAQAAAAgBAAQAAABAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAAAAAQAAABAAAAQgIABgDABQAEAAACADQgGADgGgDQgHgDgFABQgEADgKACIgQABIAKgBQAGAAAEgCQAAAAAAAAQAAgBAAAAQAAgBAAAAQABgBABAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQgBAAgBAAQgGADgOABQgNACgEABQABADAGgCQAFgCABAEIgLAAQgGABgBgCIAAAAIAAAAQAAABgFAAQgGAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABIAAABIgEAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQgBgCACgDQgDAAgCABQgEACgDAAQADgCgFAAQgGgBAAgBIgBAEQgBACgEABIADgCgAG2AoQAAgFAEgFIgCAFIgBAHIACgCIABAEIAAAAIgDAEIgBgIg");
	this.shape_3.setTransform(211.6492,3.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F49D86").s().p("AgWBjQhBgQgngnQgngoAKgoQAJgpA1gSQA1gSA/APQBBAQAnAoQAnAngKAoQgJApg1ASQgcAKggAAQgbAAgdgHg");
	this.shape_4.setTransform(265.533,-5.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F49D86").s().p("AgXBjQhBgQgngnQgmgoAJgoQAKgpA1gSQA0gSBAAPQBBAQAnAoQAnAngKAoQgJApg1ASQgcAKggAAQgcAAgdgHg");
	this.shape_5.setTransform(161.208,-29.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F7D931").s().p("AC8CPQAAgBAAAAQABgBAAgBQAAAAAAAAQgBgBAAAAIgCADQgBAAAAAAQAAABgBAAQAAAAgBgBQAAAAAAAAIAAgBIACAAIAAgBQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAIgDABIACgCQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAAAIgBgBQAAABABgBQAAAAAAAAQABgBAAAAQAAgBAAgBIgCABIgBABIgFgBQAAAAgBgBQAAAAAAAAQAAgBgBAAQAAAAABgBIgCABIgDgEQABAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBQgBABAAAAQAAAAgBAAQAAABAAAAQgBAAAAgBIABgCQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAABAAAAIAAgCIgCABQgBAAAAAAQAAAAAAAAQgBABAAAAQAAABAAABIAAgBQAAAAgBABQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAAAABAAQAAAAAAgBQABAAAAgBQABAAAAgBIAAgCIgCADIAAgCIAAAAIAAgDIgBACIAAgCIABgCIAAgBIgBAAQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAgBAAQAAAAAAABIgBAAIgCAAIAAACIgBABIAAACQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBIgDABIABgCIADAAQAAAAgBgBQAAAAAAAAQAAgBABAAQAAgBAAAAIADgCQAAgBAAAAQAAgBgBAAQAAAAAAAAQAAgBAAAAIgDACIACgCQgBgBAAAAQAAAAAAAAQgBAAAAAAQAAABgBAAQABACgFAEIABgDIABgBIgCgBIgBABIgBAAIgCABIABgBIgDACQgCgEAAgBIgBABQABgBAAgBQAAAAAAgBQABAAAAgBQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAIgDgBIgDACIACgCIgCgBIAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQgBAAAAAAQAAAAAAAAQgBABAAAAQAAABgBABQABgBAAgBQAAAAgBgBQAAAAAAAAQgBAAgBAAIgDAAIAAACIABgEQAAAAgBAAQAAABAAAAQAAAAAAgBQgBAAAAAAIgBgCIABgBIgCgBQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAABQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAgBIABgEIgDABIAAABQAAAAAAAAQAAgBgBAAQAAABgBAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIAAACIAAABQgBAAgBAAQAAgBgBAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAAAIABgCIgEACIADgFIgCgBIgBABQABAAAAgBQAAAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQgBABAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAIABAAIAAgCQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAAAAAAAQAAAAAAAAIgCABIAAgBIABgCIgCgCIgCADIgCgCIAAACQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAAAgBIABgCQAAAAAAgBQAAAAAAAAQAAgBAAAAQgBAAAAAAIABgBIAAABIABgCIgEACQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBgBIgBgBQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAABIgDgBQABAAAAgBQAAAAAAAAQAAAAAAAAQABABAAAAIABgBIgCgBIgBgBQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAgBIgDgBIgCABIgBABIgEgCIgCABIABgDIgCgBIgBgBQABAAAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAABIgBACQgBgBAAgBQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAgBQgBAAAAAAQAAAAABAAQAAgBABAAIABgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIgCgBIABAAIgBgBIgCABQAAAAAAAAQABgBAAAAQAAAAgBAAQAAgBAAAAIABgBQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAABQgBAAAAABQAAAAAAABQAAAAAAAAIgCABIgBgDQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIABgBIgEAAIACgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIgCAAQAAAAAAAAQAAABgBAAQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAABAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBIgDgBIACgBQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAAAAAIgCAAIAAgCIgBACIABgEIgFACQAAAAAAAAQAAgBAAAAQAAAAgBgBQAAAAAAgBIgBgCQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBIgBABIgCACQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAgBQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAIgCAAIAAAAQgBgCgEACQgEABgBgCIABgBQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAAAAAIgCABIgFgDQAAAAABAAQAAgBAAAAQABAAAAAAQgBgBAAAAIAAgCIgBAAIAAAAIgCAAIACgDQgEgCgCACQgCgDgGgCIgJgEIgBgCQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAAAIABgBIgFgFIgBABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAAAAAIgCgBQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAAAAAIABgBQAAAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAIAAABIAAABQgBAAAAAAQAAAAgBgBQAAAAgBgBQAAAAgBgBQAAAAgBgBQAAAAgBgBQAAAAgBAAQAAAAgBAAIABgBIgBgBIABgCIgBgBIgBADQAAAAgBABQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAgBAAIAAgCQgCgBgDAAIgGgBIACgEIgCAAIABAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBAAAAAAIgBACQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBIAAgBIgBAAIgBACQgFgEgGgDIgCgDIgBgCIgGgDIgCgCQgBAAAAAAQAAAAAAgBQgBAAAAAAQABgBAAAAIgCABIAAgBIAAAAIgBgCIgBACIgFgDIAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAgBIABgBQgEAAgEgDQgEgFgCAAQAAgBAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBgBQAAAAgBgBQAAAAAAgBQAAgBAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIgBACQgQgNgJgFQgOgKgCgGIABgBIgEAAIAAACIgGgGQgEgDgBgDIgBABIgCgFQAAAAgBgBQAAgBAAAAQAAAAgBgBQAAAAAAAAIABgCQgDgBgCgFIgDgJQAAABAAAAQABAAAAAAQAAgBABAAQAAAAAAgBIgCgBIABgBIABAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAgBQgBAAAAAAIAAgCIgBABQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIABAAIgDgCIABgCQABgBAAAAQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAABAAgBQgBAAAAAAQAAAAAAAAQAAgBABAAIgDAAIABgBIgBgBIABgCIABAAIAAgCQAAAAABgBQAAAAAAAAQAAgBAAAAQAAAAgBgBIABAAQAAAAgBAAQAAAAAAAAQAAgBgBABQAAAAAAAAIgDACIAAgDIgCADQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIgBgBIACAAIABgDQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIABAAIABACIAEgDQAPgEAhAVQARALANALQAAABAAABQAAABAAAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAABAAIACAAIACABIgBABQAAAAAAAAQAAAAABABQAAAAAAAAQAAgBABAAIACAAIAAACQABABAAAAQABAAABAAQAAAAAAAAQABAAAAAAQAJAIAFAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAAAIADACIgBACIACgBIAAADIACgBQgBAAABAAQAAAAABAAQAAABAAAAQAAAAgBAAQAAABAAAAIAIABIgBAAQABAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAABAAQAAAAABAAQAEAAAFAIIACAAIgBgDIADADIgBAAQACACAHACIAHAHQAFAEABADIADgDIgBAEQAAAAAAAAQABAAAAAAQABAAAAgBQAAAAABgBIAAACQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAAAQAAAAABAAQAAAAABgBIAAACQAAABABAAQAAAAAAAAQAAAAAAAAQAAAAABAAIgBABQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIACgBIABAAIABACIABABIgBABQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAIgBABQABABAAAAQAAAAABAAQAAAAABAAQAAgBABgBIgBgBIAEAEIAAABIADgBIgBADIABgBIAAABIACgBQgBAEADgCIAAgBIAAABIACAAIgBACQACACAGACIgBAAIAFABQAFACAFAGIACgBIgBABQACABACAEQACAEABAAIABgBIABABIAAABIAHABQAAAAgBABQAAAAAAAAQAAABABAAQAAABAAAAQABAAAAgBQABAAAAAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQABAAAAAAQAAAAABAAIgBAAIADABIgBAAQAAABABAAQAAABAAAAQABAAAAAAQABAAAAAAIAAABIABABIADgBQAAABAAAAQAAABABAAQAAABAAAAQABAAAAgBIgBABIACABIgBAAIACABIACABIgBABIAHADIgBABIAEAAIgBABIABABIgBAAQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAABAAABQAAAAAAABQABAAAAAAQAAABABAAIgBAAQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABAAAAgBQAAAAABgBQAAAAABAAQABAAAAAAIgCABIABABQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBQAAgBAAABIABABQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIAEABIgBABQABAAAAgBQABAAAAAAQAAAAABAAQAAABAAAAIgCAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAgBIABABIACABIgCABQAAAAABAAQAAAAAAAAQAAAAAAAAQABABAAAAIgCABIAEACIABAAQABACAFAAIgCACQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAgBIACAAIAAAAIgBACIACgBIgBABQACAAADAFQACAEADgBIACgCIABACQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABIABgBIgBACIACgCIgBACIABAAIAAABQAAAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAABAAIgBABQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAABAAIgBABIACABIAAgBIAAACIACAAIgBAAIAEABIgBACIACACIAAABQAAABABAAQAAAAAAAAQAAAAABgBQAAAAAAAAIABABIABgBQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIgBACQAAAAAAAAQAAAAABAAQAAABAAAAQABAAAAgBIABgBIADACIgCACIABAAIAAAAQAAABAAAAQAAABAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIAAgBQAAABABAAQAAAAAAAAQAAAAABAAQAAAAAAgBQAAABAAAAQAAABAAAAQAAABABAAQAAAAABABIADgBQABACgCADIAGABIgBACQAAAAAAAAQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAIABgCQABABAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIABgCIACABIAAABQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIABAAIgBABQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBIAAACIACgCQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAIACAAIAAAAIgBABIgBACIACgBQABAAAAAAQAAAAAAAAQAAAAAAAAQABABAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIADABQAAABABAAQAAAAAAAAQABAAAAAAQABAAAAAAQgDADAGgBQgBAAAAAAQAAAAAAAAQABAAAAgBQAAAAABAAIgCACIADACIgBABIAAABIADgBIgDACQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIABABIgBABQgBAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIACAAIgBABIAEgBQABAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAIgCABIABABIABgCIAAACIgCACIABABIABgBIAAACQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIACgCQAAAFACABQgFADABgEQAAABgBABQAAAAAAABQAAAAAAAAQAAABABgBIgCABIAAgBgABDBIIAAgBQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAIgBAAIgCgBgAAzA6IAGgFIABABIgCADIgBAAIgCACQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAgBAAg");
	this.shape_6.setTransform(68.625,-109.4875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F7D931").s().p("ADaCpQgBAAAAgBQgBAAAAAAQgBAAAAAAQAAAAgBAAQABgCgBgEIgFgCQAAAAABgBQAAAAAAAAQAAAAABAAQAAABABAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAgBAAIgBACQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAAAAAIgCACIgCgCQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBABQACgFADgEQAAAAgBgBQAAAAAAAAQAAAAgBABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAAAgBQAAAAgBAAIAAADIgDABQgBAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAIgCADQACgCgDgFQgHAEgBgEQAAABABAAQAAAAAAAAQABAAAAAAQABAAAAAAIgEgEIABAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAIgBgBIACgBQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQgCgFgFAAIAEgGIgCgBQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAABAAAAIACACIgEADIAEAFQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAAAABQABABAAAAQAAABAAAAQgBAAAAABQAAAAgBAAIgCgEQAAgBgBgBQAAAAgBAAQAAgBgBAAQAAAAgBABQABgCABgEIgEgDIgFgDQADgCAFgFIgDAAIAGgFQgBAAgBgFQgBgEgDAEQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQAAABgBAAIAEACIgBAAQABABAAABQAAABAAAAQAAABAAAAQgBAAgBAAQABgBAAgBQAAAAAAAAQAAgBgBAAQAAAAgBAAIgEgCQADgCgBgDIgHABIACgCIgIADQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBABIADACQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAgBgBAAQAAAAgBAAQAAAAgBABQAAAAgBABQgCACgCAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAABABIACgCIACgCQAAADAEAAQAFgBAAADIgCACQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABQgDgCgJACQACgGgEgCQgFgCgBgEQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQABgDAAgCQAAgBgBgBQAAAAAAAAQgBgBAAAAQgBAAAAAAIADAAIAAABQAAABABAAQAAAAABAAQAAAAABgBQABgBAAgBQgEACgBgEIACgCQgBgBAAAAQgBAAgBAAQAAAAgBAAQAAAAgBABIAAABIgCgBQgDAGgBgBQgDgBgIgBIACgBIgCgCQgDAHgEAAQgBgDgJgDQABgDAEgCQAEgCABgCIgDgHIgDAAQAAgBAAAAQgBAAAAABQAAAAAAAAQgBABAAAAQABACAEgBQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAIAAADQAAAAgBAAQAAAAAAABQgBAAAAAAQgBABAAABQgBAAAAAAQAAABgBAAQAAAAAAAAQgBgBAAAAIgBgFQgDAAAAAFQAAgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAIgBAAIACgBQAAgBgBAAQAAgBAAAAQgBAAgBAAQAAAAgBAAQgBAAgBAAQAAAAgBAAQAAgBAAAAQgBgBAAgBQAEAEABgCQABAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBAAAAQABAAAAABIgBgFQgBAAgBABQAAAAgBABQAAAAAAAAQAAABAAAAQgFgBgBABQACgDgEgCQAAgBgBAAQAAAAAAABQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAAAAAQABAAAAABIgEABIAAAAIgDgCIADABQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAAAQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAIgDAAIgDADIACABQgBAAgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAIAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQgBAAAAgBIgBABIgBACQAAAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBAAIAAAFQgDgBAAgEQAAgEgCgBQgHABgDgFIADACIADABIADgCQAAgBAAAAQABAAAAgBQAAAAgBAAQAAgBAAAAQgDABgFgDQgEgCgCAAQAAABAAAAQAAABAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAgBABIgDgCQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIgCAAQgBAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAABIABABIgBABIgBgBIgCAAIAEgFQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgDABQABgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBgCQgDAFgDgBQABAAABgBQAAAAABgBQAAAAAAgBQAAAAgBAAQABgBAAgBQABAAAAAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQgFgBADgDIgDABQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBgBAAIgEgCQgBgBAAAAQgBABAAAAQgBAAAAAAQAAABAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAABQgCACgDgCIABgCQAAgBgBAAQAAAAAAAAQAAAAAAAAQgBAAAAABIgCABIABgDIgEADQAAgEAFAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAAAQgBgBAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABIgBAEIgBgCIgCABIABACIgCgCQAAAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBABIABgFQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABAAIACABQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQgEgCgBAAIAAACQgCgCgDAAIgGgBQAAAAAAAAQAAAAAAAAQgBABAAAAQAAABAAAAIABACIACABQABAAAAAAQAAAAABAAQAAABAAAAQAAAAgBABIgEgDQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAAAgBAAIAAgBIgBABIAAgBQgCgDgCAAIAAADIgFgCQAAgBgBAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgDABQACgEAEAAQAFAAABgCIgHgCIgIAAIgBABIgCACIgBgBIgBgCQAEAAAGgDQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQgBAAAAgBIgCACQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAABQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgBAAAAABQgBAAAAAAQAAABAAAAQgEgDACgFQgBAAAAAAQAAAAgBAAQAAABAAAAQAAABAAAAIgBADIgJgBQAAAAAAgBQAAAAgBgBQAAAAgBgBQAAAAgBgBQgEgCgBgCQAAgBABAAQABAAAAAAQABAAAAAAQABAAAAABIADACQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAIACAAIACACIACgDQAAAAAAABQAAAAAAAAQAAAAAAABQgBAAAAABQgBAAAAAAQAAAAAAABQAAAAAAAAQAAABABAAQACABAFgFIgCgDQgBAAAAAAQgBAAAAABQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAgBIADABQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIgDgBQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQgCgEgDACQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABQAAABgBAAQAAABAAAAQAAABgBAAQAAAAAAAAIgCgBIgDAAIAAgCQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAIgBACQABgDgFAAQgBgBAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAIgBAAIgCAAIABgFQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBABABIgCABQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAIgBgJIABAFQAAAAABAAQAAAAABgBQAAAAAAAAQAAgBAAAAIABgEQgDgEABgCQgGACgBAGIgNACIgDgDQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAIAFAAQAAgEgHADQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAAAAAAAQgDADgFgBQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAAAgBgBQAAAAgBABIgBACIgHgJIgCACQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgCgBIADgCIgDgCQABAAABgBQAAgBABAAQAAgBAAAAQgBgBAAAAQAHgDgDgBQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgCgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBgCQgBAAAAAAQAAAAAAAAQAAABAAAAQAAABAAAAIgDAAQAAgBAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIgBgCQgHAFAAADIADgCIAAAEQgEAAgDgFQgEgFgCgCIABgDQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAgBAAIgDADIAAgDQAAgBgBgBQAAAAAAAAQgBAAAAgBQgBAAAAABIABgDIACgBIgBgEQgCAAgEABQgDACgDgCIgBACQAAAAgBABQAAAAAAAAQAAAAABABQAAAAAAAAIAEgBQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAgBgBAAQAAgBAAAAQgBAAAAgBQgBAAAAAAIACgEIAAABQAAgBABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIgBgEIgGAFQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAIgCgDQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAAAABIgBgBIABgCQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBgBAAAAQgBgBAAAAQAAgBgBAAQAAAAAAAAQgBAAAAABQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBgCQgDADgCgEQgCgFgBAAIADAAQAAgBAAgBQAAgBAAAAQAAAAgBgBQAAAAgBAAIAAgCIgDABQAAgBADgEQADgDgBgCQAAAAgBAAQgBAAAAAAQgBAAAAABQgBAAAAABIgEADIgBgEQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIABgDQgBAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBgBgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIABAAQgBgCgEAAQgEAAABgFQABAAAAABQAAAAABAAQAAAAAAgBQABAAAAAAIgDgCIgBAAIgBgDIAFgBIAAgDIgBgBQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAAAAAIgEAAQAAAAgBAAQAAABAAAAQAAABAAAAQAAABAAABIAAgBIgBgBIgCADQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAIACgCQAAAAAAgBQAAAAAAgBQgBAAgBAAQAAgBgBAAQgBAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQABgBAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAgBAAAAQAAgBgBgBQAAAAAAgBQgBAAAAAAQgBAAAAABQgBgBAAAAQAAgBAAAAQgBgBAAAAQABgBAAgBQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgDACgFIAEgGIADABQAAAAAAAAQABAAAAgBQAAAAAAAAQABAAAAgBIgBAAQACgDADACIgBAEIABAEQADABACADIADAFIgBAAQAAABAAAAQABABAAAAQAAAAABAAQAAABABAAQABgBAAAAQABABAAAAQAAAAABABQAAAAAAABIgBAAQACAEAEAAIgEAAQANAPAXAKIgBAAIACABIACgBIgBgBQACABADAAQABgBABAAQAAAAABAAQAAgBAAAAQABAAAAgBQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQABgBAAAAQAAAAABABQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAABAAQAAABAAAAQABAAABAAIAEABIgDABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABQAEgDAIADQAIADAEgBIAAADQAEgBAEAEIAIAFIAFAHIgCACQADgDAEADQAGAEACAAQAMAGgBAHQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAAAgBAAIgDAEQADgCgBAFIAEAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAIgBABIACAAIAAABIAEAAIAEAAIgEACIACAAIAAABIAEgCQABAAABAAQAAAAABAAQAAAAABAAQAAABABAAIgBABIACABIgCAAIgCABQABAAAAAAQABAAAAAAQABAAAAAAQABAAABABIADAAQAAABAAAAQAAAAAAABQAAAAABABQAAAAABABQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAIADABIACAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAIgCgCQADAAAIACQACAFAKAGIgCABQACACAEgBQgBADACADQADACACAAQABAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAIgBADQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAAAIAAABIADAAQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAAAgBQADAEAHABIgDABQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAIABgBQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAAAABIgCABIAAAAIAAAAQAAAAABABQAAAAAAAAQABABAAAAQABAAAAABQABAAABAAQAAAAABABQAAAAAAAAQABABAAAAIAGABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAABQAAAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAQAEgDgCgCQAAgCAFAAQACACAIACQAHACACACIgBABQAXALAFABIAAADIgCACIAFgBQABgBAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAEAEABQAFAAgBAEQACgCADADIgCABQADADAHAAQAHABADADIgBACQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAABQAGAAAEADIgBABQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAQADgCADADQACACADgBQAAADADABIgGADQgDABABAEIgDABQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAIAAADQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAIgCABIABACQABABAAAAQAAAAABAAQAAAAAAAAQABgBAAAAIACgEQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIgCADQAAAAABAAQAAABAAAAQABAAAAAAQABAAABAAIgFABQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABIAFABQAAAAABAAQABAAAAAAQABgBAAAAQAAgBABAAIACgDQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAABIABgBIABgBQABgFgFAAQgFgBAAgDIABABQABgBAAgBQABAAAAgBQAAAAAAAAQAAgBAAAAIAFAAIgBACIAEABQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBIgBACQAAAAAAABQAAAAAAAAQAAABAAAAQABAAAAAAIADgCQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAABABAAQAAABAAAAQgGgCgCAEQACACAHAAQAGAAACACIAAADIAEgBQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABQAAAAAAABQAAAAAAABQAAAAAAABIAFgEIAEACIgBAAQgBABAAAAQAAABAAAAQABABAAAAQABABAAABIABgDIgBgCQAEgCABADQADADACAAIAAABIADAAQAAAAAAAAQABABAAAAQAAAAABgBQAAAAABAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIABgBIgDABIACADIADADIADgCQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgCABIAEgCIAFgBQAAAEAEADIABgCQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAABQAFAFACgFIABgCQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIABADQAAABABAAQAAAAAAAAQAAABABAAQAAAAAAAAQgBADgCABQACABAEgDQABgBABAAQABAAAAgBQABAAAAAAQABAAAAABIgBAAQADAAADADIADADIgBADIACACIAAgCQABAAAAAAQABABAAAAQAAAAAAAAQABABAAAAIAAADIgCgCQgBAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQgDgDgDAAQgCAEAHAEQAAgBAAAAQAAgBABAAQAAAAAAAAQAAABAAAAQABABAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQgBAEgGgBQAEAEADgBQAGgCADgEQABAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAgBAFQAAgBABAAQAAAAAAABQABAAAAAAQAAABAAABIACAEIgFgBIABACQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAgBAAQAAAAgBgBQgBAAAAAAQgBAAAAgBQAAAAAAAAQgFgCgCAGIAHgBQgBADgDADQAAAAABAAQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAIgCgGQAHgDAFADQgBAAgBAAQgBAAAAAAQgBABAAAAQAAAAgBABIAHACIABgEQABADAEAAQAEABABABIAFgCIAAABQABAAAAAAQABAAAAAAQAAAAABgBQAAgBAAAAIABACQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAABQgBgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBABIgBABQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABIABAEQAHAAgBgEIgDABQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAAAAAIAAABIADgBIgBACQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABQgGABgBACIAFgCQAEgBABACIAAgDIAFABIgCAAIgBABIAHAAQAAAAAAAAQgBAAAAABQAAAAAAABQABAAAAABQAAAAAAAAQAAABABAAQAAAAAAABQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIABgBQACABgFAFQABAAAAAAQABAAAAAAQAAABAAAAQgBAAAAABQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBABQAAAAgBABQABAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABIgEgCIADgDQAAAAAAgBQABAAgBAAQAAAAAAgBQgBAAgBAAIgDACIgDABIACACIABAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAABABQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAABIADgBIACACQgBAAAAAAQgBABAAAAQgBAAAAgBQAAAAAAAAQgBADACADQAAAAAAAAQgBgBAAABQAAAAgBAAQAAABAAABQAAgBAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAABABQAAAAAAAAQAAAAABAAIgGACQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIgCABIgDAAIACAAIgDgEQABAFgFgCIACgDIACgEQgEABgCgDQACgCABgEIACgJQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAABQgBAAAAAAIAAADQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBgBgBAAQAAAAgBABQAAAAgBAAQAAAAAAABQgDgBgDACIgFAEIgCAEQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAAAABIgCABIAAACQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAAAAAQADABACgGIAEAEQACADACABIgCACIAEAAIAAAAIAEgDQAAAAAAgBQABAAAAAAQAAAAAAAAQABAAAAABQAAACgEACQgEACAAADQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQAAAAAAAAQAAAAAAABIgEAEIAAAAIgBAAQAAAFADgCIgCABIgBgBg");
	this.shape_7.setTransform(65.3244,-106.0531);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7D931").s().p("AAAAAIAAAAIAAAAg");
	this.shape_8.setTransform(113.4,127.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7D931").s().p("AiKC/QAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIgDgEQgEgQAVghIAWgdQABAAABAAQABAAAAAAQAAgBAAAAQABAAgBAAQABAAAAAAQABAAAAAAQAAAAABAAQAAgBAAAAIABgEIABAAQAAAAAAAAQAAAAAAAAQABAAgBAAQAAgBAAAAIAAgDIADAAIAAgEQAIgIAAgGQABABAAAAQABAAAAAAQABAAAAgBQAAAAABgBIABgCIACAAIgBgCIADAAIgBgBQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABAAAAAAQAAABABAAIAAgJIABABQAAAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBQABgFAHgFIAAgCIgDABIADgCIAAABIAEgJQADgCAEgFQAEgFADgCIgCgCIADABIgCgDIADAAQgBAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBgBAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABABQAAAAABAAQAAAAAAAAQABAAAAgBIgCgBIAAgCIACAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIABABQAAAAABAAQAAAAAAgBQAAAAAAgBQAAgBAAgBIABABQAAAAAAAAQAAAAAAAAQABAAgBgBQAAAAAAAAIgBgCIgBAAIAEgEIABABIgBgEIADAAIgBAAIABAAIgBgBQABAAABAAQAAAAAAgBQABAAAAAAQAAgBAAAAIgCAAIABgBQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAgBAAIACABQACgCACgGIAAAAIABgFQADgFAFgEIgBgCIABABQABgCAEgCQAEgCAAgCIgBAAIABgBIABAAIABgHQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAIABgCIABgCIABAAIABgDQAAABABAAQAAAAABAAQAAAAAAAAQABgBAAAAQgBAAAAAAQAAgBAAAAQAAgBgBAAQAAgBAAgBQAEABgCgDIABABIABgBIAAAAIABgBIACgDIAAABIADgGIABAAIAAgDIABABIABgBIAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABAAQAAgBABAAQAAAAABAAQAAgBAAAAIAAAAQABABAAAAQAAAAABAAQAAAAABgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBIABACIABgBIAAAAQABABAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQABgBgBAAIgBgBQAAABAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAIABgEIABAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQABAAAAAAIAAABQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQABAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBAAIABgBIABgCIABABIABgBIABABIACgEIAAAAQABgBACgFQAAAAAAABQAAAAAAAAQAAABAAAAQABAAAAAAIAAgDIgBgCIAAABIACABIgBgDIACABQAAgCAEgCQAEgCgBgEIgCgBIACgBQABAAAAAAQAAgBABAAQAAAAAAABQABAAAAAAIAAgBIACABIgCgDIABABIAAgBIABABQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIABABQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAIACgCIABABQAAAAAAAAQABgBAAAAQAAAAAAAAQAAgBAAAAIgBgBIACAAIAAgBIABABIABgEQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAABAAIABgDIABAAIAAgBIgBgBIgBABQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAIACAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAIAAABIACgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQABABAAAAIAAgDIgBAAIACgDIACABIAAAAQABAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAIgBgBIABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAABABAAQAAAAAAgBQABAAAAAAQAAgBABgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQACgBADABIAAgDIABgDIACACQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIgBgBIACABQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBIgCgBIABgCIABAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIABgBIAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIACAAIgCgBQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIAAgCIAAABIAAgCQAAABABABQAAAAAAABQABAAAAAAQABAAAAAAQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAAAIABABQABAAAAAAQABAAAAAAQAAAAAAAAQABABAAAAIABgHQAAABABAAQAAABABAAQAAAAAAgBQAAAAAAAAIAAgDQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAIADABIABgDQAAABAAAAQAAABAAAAQABAAAAAAQABAAAAAAIgBgDIADADIAAgBIABAAIAAgCIACACIAAgCIABABIgBgDQAAgBAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAQAAABAAAAQAAABABAAQAAABAAAAQABABAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAIACABIgDgDQAAAAABAAQAAAAABAAQAAABABAAQAAABABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBgBIACABQABAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIgCgBQAFAAABgCQADAFgEgCIACACIACAAIgBABIgCgBQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAIADADQAAABAAAAQABAAAAABQAAAAgBAAQAAABAAAAIgBgBIAAgBQAAAAAAAAQAAABAAAAQgBAAAAgBQAAAAgBgBQgCABACAFQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAIgBACQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBgBAAIgCAAIABACIABABIgBAEQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAIACABIgEADQAAAAAAAAQgBgBAAAAQAAAAAAAAQgBABAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAIgCAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIgCAAIABACIAAAAQAAAAAAABQAAAAAAAAQABAAAAAAQABAAABAAIgBABQABAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAIgBACIgDgEIgCABIADABIgCABIAAgBIgDABQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQgBAAgBAAQAAAAgBAAQgBAAAAgBQAAAAgBgBIgBAAIAAABQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAIAAABIABABIABABIABAAIACABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBgBAAIABADIgBgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQgBABgEgEIgDABIACACIgCgBQgBAAAAABQAAAAAAAAQAAABABAAQAAAAAAAAQADgBADAGIgDgBIgBgBIgBABIABACIAAAAIABACIgBAAIACACQgBABgBABQAAAAgBAAQAAAAgBABQAAAAgBgBIABABIgCgBIgCAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgBAEACABIgCgBIgBABIgBABQAAABgBAAQAAAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAABAAAAQABAAAAABQABAAABAAQgBAAAAABQgBAAAAAAQgBAAAAABQAAAAAAAAIAAADIACABIgEgBQABAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgCABIgBAAIAAABQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBIABADIABAAQAAABgBAAQAAAAAAABQABAAAAABQAAAAAAABQABABAAAAQAAABAAABQAAAAAAABQAAAAAAAAIACAAIABABQAAAEgDgBQAAAAgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAIgCgBQAAAAAAABQAAAAAAAAQAAABABAAQAAABABAAIgFgDIgBACIACABQgBAAAAABQgBAAAAAAQAAAAAAAAQAAAAAAAAIgDABIABACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIgCABQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAABABQAAAAAAAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAIgCgCIgBADIACABIgBACIAAABIgBAAIgCAAIAAgBIAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBgBAAAAIACAEQABABAAABQAAAAAAABQAAAAAAABQAAAAgBAAIgBACQAAAAAAAAQgBAAAAAAQAAABABAAQAAAAAAAAIgBABIgBgBIgBACIgBAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQgBABABAEIABABQAAAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAIABACQABAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABgBAAAAQAAABAAAAQABABAAAAQgBABAAAAQAAABgBAAIgEgBQAAAAgBABQAAAAAAABQgBAAAAAAQgBAAAAAAIABABQAAgBAAABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBgBgBAAQAAAAAAgBQgBAAAAAAQAAABAAAAQAAAAABABIACABQgBAAAAABQgBAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQgBABAAgBQAAAAgBAAQAAAAAAgBIAAAAIgBgBQAAAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAAAIgCABIAAgBQgBABAAAAQAAAAAAABQAAAAABABQAAAAAAABIAAgBQgBAAAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQAAAAABABQAAAAAAAAQABAAAAABQABAAABAAIgBABIABABIAAACIgFgGQABAAAAAAQAAAAAAAAQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAgBAAQABABAAAAQAAAAABAAQAAABABAAQAAAAAAgBIABACIgCACQgBABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgBAAIAAADIgBgCQAAAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAAAIAAABQAAABABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAABABABQAAAAAAABQAAAAgBAAQAAAAgBAAIABgCIgCADIgBgBQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABIgBgBIABACIgDgBQgBABACAEIgCABIgDABQABABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAQAAABABAAQAAABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAgBgBIABAAIAAADIAAgBQgCABACAFQACAEgDABIgBgCIAAACIAAACIgDAFQAAgBAAAAQgBAAAAAAQAAgBAAAAQAAAAgBAAIgCABIACACIgBgBIgBgBIAAACIgDgBQgCADACACIgJASQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAIgBgBQgCAEgDAAIABABIAAAAIgBABQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBABAAAAQAAAAAAABQAAAAABABIgCgCQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABAAAAQAAAAAAAAQAAABgBAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAABgBAAQAAABgBAAQAAABAAAAQAAABAAAAIgBgBIAAACIgDgCIgBABIADACQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQgBAAAAAAIgBABQgCADgBAHIgEgBIAAABIAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAAAAAIACABIAAgBIABAAIgBACQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBgBIAAABIACABQgEAFgDAHIgFACQgDADAAAEIgCACQAAABAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIABACIgBgBQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAIABABQgBADgCACIAAgBIgBACIgBgBQAAAEgDAEQgFAEAAADQgBAAAAAAQgBAAAAABQgBAAAAABQAAABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQgBAAgBgBQAAABAAAAQAAAAAAAAQAAAAAAAAQAAABABAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAAAgBIgJANIgJANIgIAJQgFAFgDABIgBAAIAAAEIACAAIgFAGQgDAEgEABIABABIgFACQgBAAAAAAQgBABAAAAQgBABAAAAQAAABAAAAIgCgCQgBADgFABIgIAEIgCgDIgBACIAAAAIgBgBQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQABAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgBABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIAAgBIgCADQAAAAgBAAQAAAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIAAACIgBgBIgBABQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAABAAAAIABAAIgBABQAAABAAgCQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIgCAAIgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIAAAAQgBAAAAAAQAAABAAAAQAAABABABQAAAAABABIgDAAIACACIgBAAIgDgCg");
	this.shape_9.setTransform(102.0186,142.105);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7D931").s().p("AigDuIgGgDIAAgDQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAIgBABQgCgDACgCIAEAAIAEgBQAAgCAEgCIAFgEIAAABQAAAAABAAQABAAAAAAQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAIAAAAQAEgCAAgDIAAADQAQgOAIgWIABABQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAIgBAAQABgCgBgDQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAgBQAAgBAAAAIABgFIABADQAAABABAAQAAAAAAABQAAAAABAAQAAAAABAAQgDgFADgHQADgJgBgEIACAAQAAgDADgFIAGgIIAGgFIACACQgCgDADgEQADgFAAgCQAIgMAGABQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAIADADQAAAAAAgBQAAAAAAAAQAAAAAAAAQABAAAAAAIADAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIAAABIAAgDIACABIAAgFQAAAAgBgBQAAgBAAAAQAAgBAAAAQABAAAAgBIACAEIAAgCIAAABIgBgFQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAIABAAIABgCIAAACIABACIAAgEIABgEQABABAAAAQABAAAAAAQABgBAAAAQAAgBABAAQAAgBABgBQAAAAAAAAQABgBAAAAQABAAAAABQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIABgCIAAgDQAAAAgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAIgCABQgBgDADgHQADgCADgEIAEgHIACACIABgDIAAgDQACACADgDIADgFIgCgCIAEACQAAgBAAgBQAAAAgBgBQAAAAAAAAQAAgBAAAAIAAAAIAAgCQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQADgCACgIIAAAEQAAAAABABQAAAAAAAAQAAABgBAAQAAABAAAAIgBgBQAAAAAAABQgBAAAAAAQAAAAAAAAQABAAAAABIAAABIAAAAIAAAAQABAAAAAAQABAAAAgBQAAAAABgBQAAAAAAgBIADgDIAAgGQABAAAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAAAABQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAgBQgDgEgCACQgCgBAAgFQACgBACgHQACgIACgDIAAACQAJgSAEgLQABgBAEADIgCgEQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAEABAAgFQABgEADAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQABgBAAAAIABACQAEgEAAgGQAAgHADgDIADAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAgGADgEQAAgBABAAQAAAAAAAAQAAAAAAABQABAAAAAAIABABQgCgDADgCQACgDgCgCQAEAAABgEIACAGQACAEADgCIABAEQABAAAAABQAAABAAAAQAAABgBAAQAAAAgBAAIAEABIAAgEQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAIAAABQAGAAgDgEIgEgBQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIADACIABgBIgBgCIACAEQAAABAAAAQAAABABAAQAAAAABABQAAAAABAAIABgFQAAgBAAAAQAAgBgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAABgBQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAgBQgEAAAAAFQgBAEgDAAIAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAAAAAIgBgFIACABIACgEQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAAAIACABQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAgBIgDgCQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQgCAFAEADQABgDAAgGQAAgGADgCIACAAIAAgFQABAAAAAAQAAAAABAAQAAABABAAQAAABABAAQAAABABAAQAAABABAAQAAAAABAAQAAAAABgBIgFgEIADgEIAAABQABAAAAAAQABAAAAAAQABAAAAgBQABAAABgBIgDAAIgCAAQgCgDACgCQAEgCAAgCIAAAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAAAABAAQAAABAAAAQABABAAABQgBAAAAABIAAAAIAAACQAGgBABgDIgCgEQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAIAAACIgCgEIAAgEQADAAAEgFIgCAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQAAABABAAQAAABAAAAQAAABAAABQAAAAAAABQABAAAAABQABAAAAAAQAEgFgEgBIgCgCIgCgBQABAAABAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAEABABACQAAgCgCgEQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAIAAABQAAgDADgDIADgEIADACIABgCIgBgBQAAgBAFgCIgCADQAAAAABAAQAAABAAAAQAAAAABAAQAAgBAAAAIgBADQgBABAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQADACAEgGQAAAAgBgBQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQADgDAAgEQgEgHgCgCIABgCIACgBQAAAAAAABQABAAAAABQAAAAgBABQAAAAgBABIACABIADABQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQAEAAABgCIgBAFIADAAQgBAAAAAAQAAAAgBABQAAAAAAABQAAAAAAABQAAABgBABQAAAAAAABQAAAAgBAAQAAABgBAAQgCAFAHACIgBgEIgBgDQAEABADADQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQABAAAAgBQABAAAAAAQAAgBAAAAQAAgBgBAAIgGACQgDgIAEgEQgBADACACIADgIIgEgBQACAAABgEQAAgFACgBIgCgFIABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIgCgBIADAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAAAABQAAABAAAAQAAABABAAQABABAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAABAAIAEgBIACACQgBADACACQADAEABACIADACQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABIABACQABAAABAAQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQgBgBAAAAIgEgBIAFgEIAEgFIACADIAAgFQgGgEADgBQAAAAABAAQAAAAABAAQAAABAAABQABAAAAABQACAFADAAQAAgBABAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABAAIAEAFIAAgBIAAABQAFAAgCgCQABAAAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAABQAAAAAAABQgBAAAAAAQABABAAAAQgCgBgEABIgCAFQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQAAgBgBAAQAAAAgBgBQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQABAAAAABQAAAAABAAQAAABAAAAIABACQABAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAABQAAAAAAABIADABQAAAAAAABQAAAAABAAQAAAAAAABQAAAAABAAIgCABQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQgFgBgDgDQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAgBABQAAAAgBAAIAEAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAABQAAAAgBABQAAAAAAABQABAAAAAAQABAAAAABQAAAAABAAQAAAAAAABQgCgCgFADQAEAGgEACQABgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBIgDAEIgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIAAgCQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgFABAAAGIgGgFQAAAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABABIACgCIADAEQAFgEAAgBQAAAAAAABQAAABAAAAQAAABgBAAQAAAAgBAAQAAABABAAQAAAAABAAQAAABABAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAIgFADQAAAAgBAAQAAABAAAAQgBABAAAAQABABAAABIgHgDIgCAFIgEAEIgHgIIABADIgFgGQAAABgFACQgEAAAEADQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAABAAIABgDIAAAAIADAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAIgCAFQgCgDgDABIABAGIgDgBIADAHQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAIACgCQABgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAABQABAAAAABQABAAAAABQABAAAAABQAAAAABABQAAAAAAABQAAAAABAAQAAAAABgBQAAAAABAAQAAgBAAAAQgDgCgBgCQAEAAgBgFQAAgEACgBQABAAAAABQAAAAABAAQAAABAAAAQAAAAAAABIABACQgBACACAJQgGgBgCAEQgCAFgEAAQAAABAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQgGgEgBAGIAAgDIABAAQAAgBAAAAQABAAgBgBQAAAAAAgBQgBgBgBgBQABAEgDABIgCgCQgCAEACABIAAAAIAAADQAFACAAACIgCALIgBgCIgCACQAHADgBAEQgDABgCAJQgDgCgDgDQgCgEgCgBIgHACIAAADQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAIABgCIAAgDQAAAAAAABQABAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQABAAAAABIADgBIACAEQABAAAAAAQAAABAAAAQAAABAAAAQAAAAAAABIgFAAQAAADAEAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAABAAAAIAAABIgCgBQAAAAAAAAQgBAAAAABQAAAAAAABQAAABAAABQABAAgBABQAAABAAAAQAAABgBAAQgBAAgBAAIACgCQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAgBIgDAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIgEACQAAABAAAAQABABAAAAQABABAAAAQAAAAABgBQgCAFACABQgCgBgEAEQABABABABQAAAAABAAQAAABAAgBQABAAAAgBIAAAFIABAAIgCACIAAgCQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAgBgBQAAAGADAAIABgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBABAAAAIgDABIABABIACAAIgCADIAEABQAAACgEABQgFAAAAABQABAGgFAFQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAIACgEIgCgCQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAADgCAEQgDAFABABQAAABABAAQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAABQABAAABAAIgCADQgBABAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQABAAgBABQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAQABAAAAABQAAgBAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIABABIgCACIgEgDIAAACQABABAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAABIgCABIADADQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBgBAAAAQAAgBgBAAQAAAAgBAAQAAAAgBABQAAgBgBAAQAAgBAAAAQgBgBAAgBQABAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQgBAEgCgCIABACQgBAAAAAAQgBAAgBABQAAAAgBAAQAAABAAAAIgCAFQAAAAAAABQAAAAAAABQAAAAAAAAQABABAAAAQABABAAAAQABAAAAAAQABAAAAAAQAAgBABAAIAAADIAAACIgDAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAABABIAAABIgCAAIACADQgDAAAAgFQgBAAAAABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAABQgBAAAAAAIAAgBIgBgBQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAIABAFQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAIAFACIgCAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAIACAAIgCABQgBABAAAAQAAAAAAABQgBAAAAAAQABABAAAAIgFAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIAAgDQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAIgCACIAAADIABgBQgBACAAAEIgCAFIADABIACAAIABgDQAAAAAAgBQAAAAAAAAQABAAAAAAQAAAAABAAIgDAEQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAIgBAAIAAACIAAgBQgEAEABABIACgBIgCAFQAAABAAABQgBAAAAAAQgBABAAAAQgBAAAAAAIAAACIAAADQgDgBAAgEQAAgFgDgCQgCAFAAALIACABIACABIgCACIgBABQAAgFgDgFQAAAAgBAAQAAABgBAAQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQgBABAAAAQgBAAAAABIABABQABAAAAABQAAAAAAAAQABAAAAABQgBAAAAAAIACABQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAABQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAAAABABQAAAAABAAQgEAEgFgCQABADAFAAIgBAJQAAAAgBAAQAAAAgBAAQAAABgBAAQAAABgBABQgCAEgCABIgBgFIADgDQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAIAAgDIABgBIgCgCQAAgBAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBgBAAIgCgEIgEADQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAIgBADQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBAAAAAAIgCACQAAABAAAAQgBAAAAABQAAAAAAABQAAAAABABQAAAAAAABQAAAAABAAQAAABABAAQABAAAAABQABAAABAAQAAAAAAABQABAAAAAAQAAAAAAABIgBAFIgCgBQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAAAQgCAAgBAEQAAABAAABQAAAAgBABQAAAAgBABQAAAAgBAAIABABIgBACQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAgBAAQAAAAAAAAQgBgBAAAAQAAAAgBgBQAAgBAAAAIACABQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAIgJAAIAEAAQAAgBABAAQAAgBgBAAQAAAAAAAAQgBgBAAAAIgEgBQgFAEgBgCQABAGAGACIACANIgCADQgBAAAAABQAAAAgBAAQAAABgBAAQAAgBgBAAIABgFQgEABADAHQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAEACgBAFQgBADgEAAQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABIADABIgJAGIACADQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAIgCADIgCgDIgBACIgCgBQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAAAABQgDgIgBADQACACgCADQAAAAAAgBQAAAAgBAAQAAAAAAAAQAAAAgBAAIgDABQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAgBIAAAEQAAgBgBAAQAAAAAAAAQAAAAAAAAQAAAAgBAAIgCABQADAIAFAAIgDgDIAFAAQgBADgEADIgHAHIgDgCQAAAAgBAAQAAAAAAABQAAAAAAAAQgBABAAABIADACIgDABQgBAAgBAAQAAAAAAABQgBAAAAABQAAAAABABIgDgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIgEABIABAGQABADgBACQABABAAABQABAAAAAAQABAAAAAAQABAAAAgBIgBgEIACACQAAABAAAAQAAAAABAAQAAAAAAAAQAAAAABAAQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAABIgDgCIAAAAQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBABIgEABIAEACIACAEQgBgBAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAIgEACQABABAAABQAAAAABABQAAAAABAAQAAAAABAAQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIgDADQAAAAgBAAQAAABAAAAQAAABAAAAQAAAAAAABQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgDABQADAEgEACIgEACIgBgCIgCAAIgBACIAAgBIgDABIACACQgCAAgDgDQgDgDgCABQAAABAAAAQAAABAAABQAAAAAAABQABAAAAABQAEACAAACIgEAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABABQgBAAAAAAQAAABgBAAQAAAAAAAAQgBgBAAAAIgDAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAABgBAAIgCACIAAgCQgCABAAAFQAAADgFgBQAAAAABAAQAAgBAAAAQAAAAgBgBQAAAAAAAAIgCADIgBAAIgDABIgBgEIgCAAIgBABIgBgDIgBAEQABABAAAAQABABAAAAQABAAAAAAQABAAAAgBIgBABIgBABIADACQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQgBABAAAAIgBgCQAAAAgBAAQAAAAgBABQAAAAgBABQAAABAAABQAAABgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAABAAABQAAAAAAABQgBAAAAAAQgBABgBAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBgBgBAAQAAAAgBAAQgBAAAAABQAAAAAAAAIgBAAQgDAAgEgCgAg+CvIAAAAIABAAIgBAAIABACQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAgBQAAAAABAAQAAgBABAAg");
	this.shape_10.setTransform(105.475,146.8264);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7D931").s().p("ACIB+IgegWQAAgBAAgBQAAgBAAAAQAAgBgBABQAAAAgBAAQABAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAIgCAAIgCgBIABgBIgCgBIgDABIABgDIgEAAQgJgIgFAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBIgDgBIABgCIgDABIAAgDIgBABQABAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQAAAAAAAAQgBAAABAAQAAgBAAAAQAAAAAAgBIgJAAIACgBQgBAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQABAAgBgBQAAAAAAAAQAAAAgBAAQAAAAgBAAQgFgBgEgHIgDAAIABADIgCgDIABAAIgJgEQgCgDgFgEQgFgEgCgDIgCACIABgEIgDADIAAgDQAAABAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQAAAAgBABIAAgCQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQABgBAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIgBACIgCAAQABgBAAAAQAAgBgBAAQAAgBAAAAQAAAAgBAAIABgBIgBgBIgCAAQAAABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAIACgEIgBgBIgCACIAAABIgEgEIABAAIAAgCIgDACIAAgDIAAABIAAgBIgCABIAAgCQAAgBAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAIAAACQAAgBAAAAQAAgBAAAAQgBAAAAAAQAAAAgBABIABgCQgCgCgGgCIgFgBIgJgIIgCABIABgBQgCgBgCgEQgCgEgBAAIgBABQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgDgBgEAAIAAgCIgBgBQAAAAAAAAQgBABAAAAQAAAAAAAAQgBgBAAAAIgBgBIgDgBIABgBIgCgBIgCAAQABAAAAgBQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAABAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAgBAAgBQAAAAgBgBQAAAAAAAAQgBAAAAABIABgBIgCgBIABAAIgCgBIgCgCIAAAAIgGgDIABgBIgEAAIABgBIgBgBQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAgBQgBgBAAAAQAAgBAAAAQAAAAgBAAIABAAIgCgDQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAIABgBIgBgBIABAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAABIAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAIgEgBIABgBIgDAAIABAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIgCABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIgCgBIACgBIgCgBIABgBQAAAAgBgBQAAAAgBgBQAAAAgBAAQAAAAgBAAIAAAAQgBgCgFgBIABAAQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQABAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBIgDABIACgCQgCAAgDgEQgDgEgDABIgBACIgBgCQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBAAIABgCIgCACIABgBIgCAAIABgBQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIABgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAgBIgCgCIABgBIgCgBIAAgBIgCAAIABgBQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAgBAAIABgCIgDgBIABgBQAAgBgBAAQAAAAAAAAQgBAAAAABQAAAAgBABIABABQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAIAAgCQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIABAAIgBgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQABgBAAAAIgBgBIgCABIAAABIgDgCIACgCIgBAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAIgBABIAAgBQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAIgCgCQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAIAAgFIgDAAIgCgCIABgBQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBgBAAIgBABIABgCQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAIAAACIgDgBIABgCIgBgBIAAAAIgCABIAAgCIgBACIAAgDIgBAAIAAAAIgBAAQABAAAAAAQABgBAAAAQABgBAAAAQAAgBgBAAQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAIgGgBQAAAAABgBQAAAAAAgBQAAAAAAAAQgBAAAAAAIgDAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAIABgDIgCgBQAAAAABAAQAAAAAAAAQAAgBAAAAQAAgBAAAAIgDABIADgDIgBAAIAAgBIgBgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAAAgBAAQAAAAAAABIABgBIgEABQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAIADgCQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAAAIABgCIgCADIAAgCIACgCQAAAAgBAAQAAgBAAABQgBAAAAAAQAAAAgBABIABgCQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgCACQgBgCgBgEQAFgDgBAEIABgCIAAgCIABABIgBACQAAAAAAAAQAAABAAAAQAAAAABAAQAAABAAAAIACgDQABAAAAAAQAAgBABAAQAAAAAAABQABAAAAAAIAAABIgCAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIAAABQAAAAAAABQABAAAAAAQABAAABAAQABgBABAAQAAAAAAABQAAAAAAAAQgBAAAAABQAAAAgBAAIgBABIABABQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABIgBACQABAAAAAAQABAAAAAAQAAAAABgBQAAgBAAgBIAFACQAAAAABAAQAAABAAAAQAAABABAAQAAABgBABIABgBIABgBQAAABAAAAQAAAAABABQAAAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQABgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIgBACIABgBIAAACIACgBIAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBQAAgBAAgBIABABQABgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAIACABIgEADQAAAAAAAAQAAAAAAABQABAAAAAAQAAAAAAABQABAAAAAAQAAgBABAAQAAAAAAgBQAAAAAAgBIAAACIAAAAIAAADQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQABABgBABQAAAAAAABQAAABgBAAQAAAAgBABIAAABIABAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAQAAAAABAAQAAgBAAAAIABAAIACgBIAAgBIABgBIAAgCQAAABAAAAQABABAAAAQgBABAAAAQAAABgBABIACAAIAAAAIgDABQACABgFAEIABADIACgCIgBACIABABIABgBQAAgBAAAAQAAAAABgBQAAAAAAgBQABAAAAgBIADgCIgBADIgBABIACABIABgBIABAAIABgBIAAABIADgCIACAFIABgBQgBABAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAABAAQAAgBAAABQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABgBAAQAEABACgCIgCACIACABIAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAgBAAgBQAAABABABQAAAAAAABQAAAAABAAQAAAAAAAAIAEAAIgBACQABgBAAAAQAAAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQABAAAAAAIgBABIACAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAABQABAAAAAAQAAABAAAAQAAABAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABIAEgBIgBgBQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQADgCACABIAAgCQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAQAEAAgBADQAAAAAAAAQAAAAgBABQAAAAAAAAQAAABAAAAIgBACQABAAAAAAQAAAAABAAQAAAAAAAAQABgBAAgBIgDAFIACABIACgCQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQABAAAAABIABgBIAAABIgBAAIABACQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIABgBQAAgBABAAQAAAAAAAAQABAAAAABQAAAAAAAAIgCACIADABIACgCIABABIABgBIABgBIgBADIAAACQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgBACIAFgCQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABIABABQAAAAAAABQABAAAAAAQAAgBAAAAQAAAAAAAAIAAAAIACABIgBAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAgBAAIACACIABABQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBABQABABAEgBIABgBQAAAAAAAAQABABAAAAQABAAAAABQABAAABAAIABgBQAAgBAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBQgBAAAAAAQABgBAAAAQABAAAAAAQABAAAAABQABAAAAABIgBAEIACADQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAQABAAgBABQAAAAAAABQAAABgBABQAAAAgBAAQAAABABAAQAAAAAAAAQABAAAAgBIABgCQABABAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAgBAAQAAABgBAAIAAAAIgBABQAAAAgBABQAAABABAAQAAABAAAAQABAAAAABIAAAAIABABIACgBIAAAAQAAABAAAAQgBAAAAAAQAAAAABABQAAAAAAAAIABgCIABgCIABABIACgBIABAAQgCAAgDAFQAAgBAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQABAAAAABQAAAAABAAQAAgBABAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAABIABgDIACgBIABACQABAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAIgBABIADAAIgBABQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIABAAQABgBAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAAAAAIgCABQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAAAAAIACAAIAAABIABgBIgBADIAFgBQAAAAAAAAQAAABAAAAQAAAAABABQAAAAAAAAIABADIACAAIABAAIABgCIABgBIACAAIgBAAQACACAEgCQAEgCABADIgBABQAAAAAAABQAAAAABAAQAAAAAAAAQAAgBAAAAIACAAIAFADQgBAAAAAAQAAABAAAAQgBAAAAAAQAAAAAAABIABACIACgCIAAACIABAAIgCADQAEABACgBQADAEAOAFQAAAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIgBABQAEADABACIABgDQAAABAAABQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAAAgBQABAAAAAAQAAAAABAAQABAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBABQABAAAAAAQAAAAAAABQABAAAAAAQABgBAAAAIgBACQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAABABQAAAAABAAQAAAAAAAAIAAgCQABAAAAAAQABAAAAABQAAAAABABQAAAAABABQAAAAABABQAAAAABABQAAAAAAAAQABAAAAAAIgBABIACAAIgBACIABACIABgDQABAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAABAAAAQgBAAABAAQAAABAAAAIAAABQADACAIABIgCAEIABAAIAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAQAAgBgBAAIgBAAIAAgBQAAAAABAAQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAABABAAQAAAAgBABIgBAAIABABIACgCQAEAEAHADQADAEAAABQACADAEAAIACACQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABIACgBIAAABQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAAAAAIABgBIACABIADACIABABIAAABQAEAAADADQAFAFACAAQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAQADABAAAEQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAFACAIAHQAIAGAFADIAJAIQAGAFABADIgBABIAEgBIAAgBIAGAGQAEACABAEIABgBQAAAAABABQAAAAAAABQAAAAABABQAAABAAABQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAIgBAAIgBACQADABACAFQABAHACACIgCABIACABQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQABAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAABABQAAAAAAAAIAAABIACAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIADACQAAAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAAAQAAAAgBABIADAAIgCABIACABQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAIAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIAAACIAAAAIgBACIAAAAQAAACAFgDIAAADIABgCIABAAQABAAgBABIgBgBIgBAEIgCACQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAgBAAIgEADIgFABQgPAAgcgSgAibh4IAAABIAAgBg");
	this.shape_11.setTransform(351.1583,94.6314);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7D931").s().p("ADvCpQABgEgBgEQgDAAgCgEIgDgFIAAAAQABAAAAgBQgBAAAAgBQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAAAAgBIABAAQgBgEgEAAIADAAQgNgPgXgJIAAgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAgBABQAAAAAAAAQgBABAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAIACAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQgBAAgBAAIgEgBQAFAAgBgEQgFADgHgDQgJgDgEABIABgCQgEAAgFgDIgIgGIgEgGIACgCQgEACgEgDQgFgDgCAAQgMgHABgHQABAAABAAQAAAAAAABQAAAAABAAQAAABgBAAQAAAAABABQAAAAAAABQAAAAAAAAQABAAAAAAIADgDQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBgBAAAAIAAgDQAAAAgBAAQAAAAgBAAQAAABgBAAQAAgBgBAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAIABgBIgCABIAAgCIgEAAIgEAAIAEgCIgCAAIAAAAIgEABQgEABgBgCIABgBIgCgBIABAAIACgBIgEAAIgDgBQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBgBQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAgBAAIAAgDQAAgBgBAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBABAAAAQAAAAAAAAQgBAAAAABQAAAAAAAAIACACQgEABgHgDQgCgDgEgDIgGgEIABgCIgCgBIgDAAQABgCgDgDQgCgCgCgBQAAABgBAAQAAABAAAAQAAAAgBAAQAAAAgBAAIACgEQAAAAgBAAQgBAAAAABQgBAAAAAAQAAAAgBAAIAAAAIgCAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABQgCgDgJgCIAEAAQABAAAAAAQABgBAAAAQABABAAAAQAAAAABAAIgBABQAAABAAAAQABAAAAAAQAAAAABAAQAAAAABgBQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAgBgBAAIgGAAQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABgBAAAAQABgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgDAEABABQAAACgGAAQgCgCgHgCIgJgEIABAAIgcgNIACgFIgFACQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAgEgEAAQgFgBAAgDQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAgBgBAAIACgBQgDgEgHAAQgHgBgDgDQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAAAAAQgFAAgFgEIABgBQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAgBAAQgDACgCgDQgCgCgDABQAAgDgDgBIAGgCQADgCgCgEQABABAAAAQAAAAABAAQAAAAABgBQAAAAABAAQABgBAAAAQABAAAAAAQABAAAAABQAAAAAAABIABgEIgDAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAIACAAQgBgGgDADIgCAEQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAIACgDIgBAAQAEgBAAgEIgFgBQAAAAgBAAQAAAAgBABQAAAAgBAAQgBABAAAAQAAAAABABQAAAAAAAAQAAAAAAAAQAAABgBAAIgCABIAAgCIgCADQAAAEAEAAQAFABAAADIgBAAIgCADIgFABIABgDQgFgDgDADIABgCQABAAAAAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQgDAFgDgCQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAGACACgEQgCgCgHABQgGAAgCgDIAAgCIgEAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQABAAAAgBQAAAAAAgBQABAAgBgBQAAAAAAgBIgFAFQAAAAAAAAQgBAAAAgBQgBAAAAgBQgBAAgBgBIABAAIAAgCIgBgDIgBADIAAACQAAAAgBABQgBAAAAAAQgBAAAAAAQgBgBAAAAQgDgEgCAAIAAAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAABgBAAQAAAAgBAAQABAAAAgBQAAAAABgBQAAAAABAAQABAAAAABIAAAAIADAAQgCgGgDgBIgDACQAAABAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAIADAAIgEACIgFAAQAAgDgFgEQABAAAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAgBABAAQAAAAABAAQAAgBABAAQABAAABAAQAAAAABAAQAAgBABAAQAAgBAAAAQgFgDgCADIgBACQgBAAAAABQAAAAAAAAQgBABAAAAQAAAAAAABIgBgDQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIADgFQgBAAgEACQgBABAAAAQgBABgBAAQAAAAgBAAQAAAAgBgBIABAAQgDAAgDgDQAAAAgBgBQAAgBgBAAQAAAAgBAAQAAgBgBAAIACgDIgCgBIAAABQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAAAAAgBIgBgDIACACIABgCIACACIAEABQABgDgGgEQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAgBAAABQgBAAAAAAIADgDIADgBQgCgEgEABQgHADgCADIgCgBIgCgCQABAAAAgBQABAAAAAAQABAAAAABQABAAAAABQACgBAAgEQAAAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBgEgBgBIAEABIAAgDQABABAAAAQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAGACABgHIgDABIgEABIAEgHQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAgBgBQAAgBAAAAQAAgBgBAAQAAAAAAAAQgBAAgBABIACAGQgHACgFgDQABAAABAAQABAAABAAQAAAAAAgBQABAAAAAAIgHgDIgCAEQAAgCgEgBQgEAAgBgCIgGACIABgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAABIgCACIAAgDQAAAAAAAAQAAAAAAgBQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAgBIABgBQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBIgBgEIACgCQADABADgCIAFgEIACgDQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAAAAAIACgCQABgBAAAAQgBgBAAgBQAAAAAAAAQgBAAgBAAQAAAAAAAAQgBAAAAAAQAAABgBAAQAAABgBAAIgBAEIgEgFIgEgEQAAAAABAAQAAAAABgBQAAAAAAAAQAAgBAAAAIgFAAIABAAQgFAGgBgDQAAgCAEgBQAEgCAAgDQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAABgBAAQAAABAAAAQgBAAAAAAQAAAAAAAAQAAAAgBgBIAFgEIAAAAIABAAQAAgFgDACQABgBAAAAQABAAAAAAQAAAAABAAQAAABAAAAQABABAAAAQABAAAAABQAAAAABAAQAAAAAAgBIABAGIAFACQAAABgBAAQAAAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAABQAAABAAAAQgBABAAAAQABABAAAAQAAABAAAAQABABAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAIABgCQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAIADACIABgDQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAgBIACACQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAIgEAIQABAAAAAAQAAABAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQABgBAAAAQAAABAAAAQABAAAAABIgBgEQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAIACgCQgBACACAEQAGgEACAEQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABIAEADIgBABQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAAAQAAABgBAAIgCAAQAAAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAAAQABAFAGAAIgEAGIACABQABAAAAAAQABABAAgBQAAAAABAAQAAAAAAgBIgCgCIAEgDQgEgFgBAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAAAgBQABAAAAgBQAAAAgBgBQAAgBAAAAQAAAAABgBQAAAAAAAAQAAgBABAAIACAFQABAAAAABQAAAAABAAQAAABABAAQABAAAAgBIgCAHIAEACIAFAEIgIAHIADgBIgGAFQABAAABAFQABAEADgEQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAQABgBAAAAIgEgBIABgBIgBgCQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAABAAAAQAAABAAAAQABABAAAAQAAAAABAAIAEACQgDACABADIAGgBQAAABAAAAQAAAAAAABQAAAAAAAAQgBABAAAAIAIgDQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAAAABgBIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBABAAQACgDACAAQABgBAAAAQgBgBAAAAQAAAAAAgBQgBAAgBAAQgCADgCAAQAAAAAAgBQgBAAAAgBQgBAAAAAAQgBAAgBAAQgFAAgBgCQABgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAIACgBQACABAJgCQgBAGAEACQAFACABAEQABAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAQAAAAAAABQAAABgBAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQABABAAAAQABAAAAAAIgDAAIAAgBQAAAAAAAAQAAAAAAgBQgBAAAAABQgBAAAAAAIgCACQADgBACADIgDACQAEACACgCIAAgBIACABQABgFADAAQACABAJABIgCABQAAABABAAQAAAAAAABQAAAAABAAQAAAAAAAAQADgHAEABQABADAJACQgBADgEADQgEACgBACQABAEACACIACABQABAAAAAAQABAAAAgBQAAAAAAAAQABAAAAgBIgDgBIgCAAQAAAAAAAAQABAAAAgBQAAAAABABQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAgBIAAgDQAAAAABAAQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAIABAFQADAAAAgFQAAABAAAAQABABAAAAQABAAAAAAQABABAAAAIgBABQAAAAAAAAQABABAAAAQABAAABAAQAAAAABAAQABAAABAAQAAAAABAAQAAAAABABQAAABAAABQgEgEgCACIAAADQAAABAAAAQAAAAgBABQAAAAAAAAQgBAAAAgBIABAFIACgBQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAIAEABQABAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQgBACADAEQABgBABAAQAAgBABgBQAAAAAAAAQAAgBgBAAIAEAAIAAgBIACACIgCAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABIACABIAAABQAFAAAAgDQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQABAAAAABQAAAAABAAIgBACIABABQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAAgCIAEACIAAgEQADAAAAAEQAAAEABABQAGgBAFAFQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAIgDgCIgDACQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQADAAAFACQAEADACgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBIADACQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBIABgBIACACIgDAEIADAAQAAAAABAAQAAgBAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIABACIADgDQAAAAAAAAQABgBAAAAQAAAAABAAQAAAAAAAAQAAAAgBABQAAAAAAABQgBAAAAABQABAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQgBAAgBgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABIACABQABAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAIADgBQAAABAAAAQAAABAAAAQABABAAAAQAAABABAAIAEACQABABAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBIADAAIACAAIAAADQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAgBIABAAIAAACIADgCQABADgFAAQAAABABAAQAAAAAAAAQABABAAAAQAAAAABAAIACAAQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQACACADgBIAEgBQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBABQAAAAgBgBQAAAAAAAAQAAAAgBAAIACgFQAAABABABQAAAAAAAAQAAAAABAAQAAAAAAgBIAAgCIACACQAAABAAAAQABAAAAAAQAAABABAAQAAAAAAgBIAAAFQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgDAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAABQAAAAAAAAQAAABAAAAQAEADABgBIgBgBQACABAEAAIAFACQABAAAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAIgBgDIgDgBQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBIAFADQABAAAAABQABAAAAAAQABAAAAAAQABABAAgBIgBABIACAAIAAAAQABABAAABQABAAAAABQABAAAAAAQABAAAAAAIAAgCIAFABQABABAAAAQABAAAAABQAAAAAAABQABAAgBABQABABAFgBQgCADgEAAQgFAAgCADQAFACALAAIABgCIABgCIACACIABABQgFAAgFADQAAAAABABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABABAAIABgBQABgBAAAAQAAAAABAAQAAgBAAABQABAAAAAAIAAgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAgBQAEAEgCAFQADgBAAgFIAJABQAAACADACQAEACABACQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgDgCQAAAAABAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBAAAAgBIgCADQAAAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQgBAAAAABQgBAAgBABIgEACIADAEQABgBAAAAQABAAABgBQAAAAABAAQAAAAABAAQABAAAAABQABAAAAAAQAAABABAAQAAABAAAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAAAQgBAAAAAAQAAABAAAAIAHACIgDAAQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAAAIADACQAAABABAAQAAAAABAAQAAAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQABgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAAAQABAAABABQABAAAAAAQABAAAAAAQABAAAAAAIAAACQAAABAAAAQAAAAAAABQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBQAAACAFABQABAAABAAQAAABABAAQAAAAAAABQAAABAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAAAIACABIgBADQAAABAAAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAAAABAAQAAgBAAAAQAAAAAAAAQABgBAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAQACAGgBADQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAIAAgDQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAIgBAEIACADQAAABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAGgBABgGIANgDIADADQABABAAAAQABAAAAABQAAAAAAABQAAAAgBAAIgEAAQAAAEAHgDQAAABAAABQAAABAAAAQAAAAABABQAAAAAAAAQACgEAGABQACABAAAEQAAAAABABQAAAAAAABQABAAAAAAQABAAAAAAIABgDIAHAJIACgCQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABAAIACABIgDADIADABIgCACQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQgIACADACQACgDADADQAAAAAAAAQgBAAAAABQAAAAAAAAQAAAAAAABIABADQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAIAEAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAIABACQAHgEAAgEIgDADIAAgFQAEABADAEQADAFADACIgBADQAAABAAAAQAAAAAAAAQAAAAABABQAAAAABAAQABAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAIAAADQABABAAABQAAAAAAAAQABABAAAAQABAAAAgBQABABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIABAEQACAAAEgBQADgBADABIABgCQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAgBAAIgDABIABgCQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBQAAABABAAQAAABAAAAQABABAAAAQAAAAABAAIgCAEIACgBIABABQAAABAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBgCQgBABAAAAQAAABAAAAQAAABAAABQAAAAAAABIABAEIADgEIADgCQAAABAAABQAAAAAAABQAAAAAAABQABAAAAAAIABADQABAAABAAQABgBAAAAQAAAAAAgBQABAAgBgBIACACIgBABIADADQABAAAAABQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIABADQADgDACAEIACAEIgCABIAAACIACABIAAAAIAAADIADgCQAAABgDAEQgDADABACQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQADgEABAAIAAAEQABAAAAgBQABAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQABABAAgBQABAAAAAAQAAAAAAgBQABABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABABAAQAAAAAAABIACACIgCAAQABACAFAAQAEAAgBAFQgBAAAAAAQAAgBgBAAQAAABAAAAQgBAAAAAAIADACQAAABABAAQAAAAAAAAQABgBAAAAQABAAAAgBQAAABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAIABACIgFABIAAACIABABIgDABIAEABQABAAAAgBQAAAAABAAQAAgBAAgBQAAAAAAgBIAAABQAAAAAAABQAAAAAAAAQAAAAABAAQAAAAAAAAIACgDQABAAAAAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAABABQAAAAAAAAIgCABQAAACAEABQABABABAAQABAAAAABQAAAAAAAAQABABgBAAQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQABAAABAAQAAAAABAAQAAABABAAQAAABAAABQAAABABAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAABQAAAAAAABQAAABAAABQAAABAAAAQAAABAAAAQAAAAABAAQAAAEgCAEIgEAGIgDAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBABIABABIgDABIgCgBgAjUhyQADAAAEgDIgBgBIACgCIADAAIgFAEQgDACgCAAIgBAAgAjpiEQAAAAAAAAQAAAAgBAAQAAAAgBABQAAAAgBAAQAAABAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIAEgBQAAAAABAAQAAAAABgBQAAAAAAAAQABgBAAAAQgIAEgCgDIAAACIgDAAIABgCIgHABQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQAAAAgBAAQAAgBgBAAQABABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAgBABAAIADgDIgBgCQABAFAFgEQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIABgBIAEABIgDADQAAABAAAAQAAAAAAABQAAAAAAAAQABAAAAAAIAHgDIgCgBIgBAAQAAAAAAgBQABAAgBAAQAAAAAAgBQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQgDABgCgDIACgBQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAAAIAAgDIgCgDIADgCQAAABAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBIgBgBIAFgCIgCAAIADgBIADABQAAgBgBAAQAAAAAAAAQAAAAAAAAQgBAAAAABIACADQAAgDAFAAIgDAEIgBAEIADAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQgDACgCANQABAAAAAAQABAAAAAAQAAAAAAAAQABABgBAAQAAABAAAAQAAAAABAAQAAABAAgBQABAAAAAAIAAgDQACACACAAIgCABQgBAAAAABQgBAAAAAAQAAABAAAAQgBAAAAABIADgBQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAABQAAAAgBAAIgDADIAAgBIgEACIABgDg");
	this.shape_12.setTransform(354.4542,91.1627);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7D931").s().p("AiLC+IgCgCQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQABABAAAAQABAAABAAQAAAAAAAAQABAAAAAAIgDgDQAAAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAAAIABAAIAAABIABABQAAAAAAgBQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAABgBQAAAAAAAAQAAAAAAgBQAAAAAAgBIgBgDIACACQAAABAAAAQAAAAAAAAQABABAAAAQAAAAAAAAIABgCQAAABAAAAQAAABAAAAQABAAAAAAQABAAABAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAgBgBIABgEQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABAAIgBgBIAEgDQAAAAAAABQABAAAAAAQAAAAAAAAQABAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIACAAIgBgBIACAAIgBgCQAAAAAAAAQAAgBAAAAQAAAAgBAAQgBAAgBAAIABgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAgBAAgBQAAABAAAAQAAAAABABQAAAAABABQAAAAABABQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAgBIgDgBIACgBIAAABIADgBIgCgBIACABIACABQADACgCgDQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAIgCgBIgBAAIgCAAQABgBAAAAQABAAAAAAQABAAAAAAQABABABAAIgBgDIACABIAAADQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAABIACACQABAAAAAAQABAAAAAAQAAAAAAAAQABgBAAAAIgCgCIACABQABAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBAAAAgBIgDgDIADABIABABIABgBIgBgCIAAAAIgBgCIABAAIgCgCIAFgCIgBgBIAEABQAAAAAAgBQAAAAAAAAQgBgBAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAABQABAAAAAAIABgCQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAgBgBAAIACABIAAgBIABAAIACgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAQgBAAAAgBQgBAAgBAAQABAAABAAQAAAAABAAQAAAAAAgBQAAgBAAAAIAAgDIgCgBIAEABQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAIABgBIABAAIABgBIgFgCQAAAAABAAQAAgBAAAAQABAAAAAAQABAAABAAIAEABIgBgDIgBAAQAAAAAAgBQABAAAAAAQgBgBAAAAQAAgBAAAAQgCgDABgCQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAgBAAAAQABgBAAAAQAAgBABAAQABAAAAAAQAAABABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABABIgBgDIAEADIABgCIgBgBQAAAAABAAQAAAAAAAAQAAAAABAAQAAgBAAAAIACgBIgBgCQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIAAABIACAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAAAAAIgBgBIABgBIACACIACgCQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAIACgCIgCgBIAAgBIACABQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIABABIgBAAIACABIgCgEQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAgBAAAAQAAgBgBAAIABgCIABABIAAABIABgCIABAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAABAAIABgCIgBgDIgBgBQAAAAABAAQAAAAAAgBQAAAAABgBQAAAAAAgBIgBgCIADAAIABgBIACgBQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABABABAAQAAABAAAAQABAAAAAAQAAAAAAgBQAAAAgBgBIgCgBQABAAAAAAQABgBAAAAQAAAAAAAAQAAgBAAAAIABAAIAAAAIABABQAAABABAAQAAAAAAAAQABAAAAAAQAAAAABgBIABgBIAAABIABgBIgBgDQAAABABAAQAAAAAAAAQAAAAABAAQAAAAAAgBIABABQAAAAABAAQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIgBgCIADgCQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIABAAIAAgDIABACQABAAAAAAQAAAAAAAAQABgBgBAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIAAgCQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQgBAAAAABQAAAAAAAAQAAAAAAAAQAAABABAAIABgDIABACQAAAAABgBQAAAAAAAAQAAAAAAAAQAAgBAAAAIAAgBIACAAIgCgCQABAAAAAAQAAAAABAAQAAAAABABQAAAAABAAIgCgFQADABACgDIAAgBIABgBQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAAAAAABQgBAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIAAgDIAAABQACgBgCgFQgBgEACgBIABACQABgBAAAAQAAAAAAAAQAAgBAAAAQgBgBAAAAIADgGQAAABABABQAAAAABABQAAAAABgBQAAAAABgBIgBgCIABABIAAABIAAgCIADABQACgEgCgCQAEgDAFgNQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIABABIAFgEIgBgBQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQAAgBAAAAIABgCQAAABAAAAQAAABAAAAQABABAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABACQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAgBIgBAAIgBAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAAAgBQAAAAAAgBIABABIABgCQAAABAAAAQAAAAAAAAQAAAAABAAQAAABABAAIABgBIgDgCQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAABAAAAQABAAAAAAQAAAAABAAQAAAAAAAAIACgBQAAgBABgEIABgFIAFABIgBgBQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgCgBQAAgBAAAAQAAAAABAAQAAgBAAAAQAAAAABAAIABABIAAgBIgCgBQAEgFADgHIADgCIADAAIACgHQAAAAABAAQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAIgBgCIABABIABgBIABgBIgCgBQABAAACgFIAAABIABgCIABABQAAgEADgEQAFgEAAgDQABAAAAAAQABAAAAgBQABAAAAgBQAAAAAAgBQAAgBABAAQAAgBABAAQAAAAABAAQABAAABAAQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAgBAAIAJgNIAJgNIAIgJQAFgFADgBIABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIgCAAQACgBAEgFQADgEAEgBIgCgBIAFgCQABAAAAAAQABAAAAgBQABAAAAgBQAAAAAAgBIABABIABABQABgDAFgBIAJgEQAAABAAAAQAAAAAAABQAAAAAAAAQABABAAAAIABgCQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAABAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAABgBIgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAIAAABIACgDIACACQABAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIAAgCIABABIABgBIACABIAAgBQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAAAAAIACAAIABABQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAIAAAAQAAAAAAAAQAAAAABgBQAAAAgBAAQAAAAAAgBIgCgCQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAABAAIgDgCIACAAIAAAAIADACQAAAAABAAQAAABAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgCAAIADAEQAEAQgVAhIgWAdIgCABIgBAAQgBAAAAAAQAAAAgBAAQAAAAgBABQAAAAAAAAIAAADIgBABIAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAADIgCAAQgBAAAAABQAAABAAAAQAAABAAAAQAAAAAAABQgIAJAAAFQAAAAgBgBQAAAAgBABQAAAAgBAAQAAAAAAABIgCACIgCAAIABACIgDAAIABABQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAgBIAAAJIgBgBQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAAAQAAABABAAQgBAGgIAEIAAACIADgBIgDACIAAgBIgEAJIgHAHQgEAFgDACIADACQgBAAgBAAQAAgBgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAQAAABAAAAQABAAAAABQABAAAAAAIgCAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAAAQAAABABAAIgCABQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgBAAQgBAAAAgBQAAAAAAAAQAAAAAAAAQAAABAAAAIABABIAAACQAAAAAAAAQAAAAAAAAQgBABAAAAQAAAAgBAAIgBAAIgBgBQAAAAAAAAQgBABAAAAQAAABAAAAQAAABABABIACABQgBAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAABQgBAAAAAAQABAAAAAAIABACIABAAIgEAEIgBgBIABADIgCAAIAAAAIgBAAIABADQgEgCACADIABAAIgBABIAAABIgCgBQgCACgCAGIAAAAIgBAFQgCAFgGAEIABACIgBgBQgBACgEACIgEAEIABABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAgBIgBAHIgDABQABABAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIgCACIgBACIAAAAIgBABIgBACQAAgBgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAIABAEIgBAAQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAAAABIgBgBIgBABIAAAAIgBACIgBACIgBgBIgDAGIgBAAIAAADIgBgBIgBABIAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAIgEACIAAAAIgDABQAAAAABABQAAAAABAAQAAABAAABQAAAAAAABIgBgCIgBABIgBAAIgBAAQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAQABAAgBABIgBABQAAAAAAAAQgBABAAAAQAAAAgBAAQAAgBAAAAIgBAEIgBAAQABAAAAABQAAAAAAABQAAAAAAAAQAAAAgBAAIAAgBQAAAAAAAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQAAABAAAAQAAgBgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAIgBABIgBACIgBgBQAAAAAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAIgBgBIgCAEIAAAAQgCABAAAEIgCgBQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABABIAAACQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAIABADIgBgBQAAACgFADQgEACABADIADABIgDABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAgBgBAAIABABIgCgBIACADIgCgBIAAABIgBgBQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIgBgBQAAABAAAAQAAABAAAAQAAAAAAAAQAAABgBAAIgCABIgBgBIgBACIABABIgCAAIAAABIAAAAQAAAAAAABQAAABgBAAQAAABAAAAQAAAAAAAAIgCgBIgCADIgBAAQgBAAAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAABAAAAIABAAIgBABIgBAAIgBABIAAABIABAAIgCADIgCgBIAAABIAAgBQgBAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAIABABIgBABIABABIgCAAIgCACIABACQgCABgDgBIgBAGIgBgCQgBAAAAAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAIACABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIABABIgBACQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBIAAABIgBAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAIgCAAIACABIgDAAIAAACIAAABIgBgCIgCgBQAAABAAAAQABABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBIgBADQgBABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQAAgBgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABIAAACQAAAAAAAAQAAAAAAAAQABAAAAABQAAAAAAAAIgCgBIgCADIgBgCIgBAAIABADIgCgDQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgBACQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAAAAAIAAACIgBgBIACAEQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAIgCgEIgBABIACACIgCgBIgCgBIgBABIABABIgCgBIABADQgBACgFAAQAAgBAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAgAhKBOIAAAAIAAAAgAhKBOgAg4A3IAAgBIgCgCQAAAAABABQAAAAAAgBQAAAAAAAAQAAgBAAAAIAFAGIgBAAIgDgCg");
	this.shape_13.setTransform(307.3864,-142.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F7D931").s().p("AiOD6QADgBgEgFQgBABAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIgBgBIABgEIADADQAAAAABAAQAAABAAgBQABAAAAAAQAAgBAAgBQgBgFgCgBIgBACIAAABQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQACADgDACQgBgBgBAAQAAgBAAAAQAAgBAAAAQABAAABAAIgDAAIgEACQAAgBABAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABIgCgGIgBABIgBgCIABgDIAAACIADgDQgEABABgFIAEACIAEACIAAgDQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQADAEAMABQAAgBAAgBQAAAAAAAAQAAgBABAAQAAAAABABQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBgBAAIgDAAIACgEQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQAAgDgCgDIgEgFIgDgCQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAAAIgBgCIgDAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAAAAAAABQAAACAGACIgFAEQgCACgBACIgDgCIAAAEIABAAIACAEQABAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQgCAAgCgEQgCgEgDAAQAAAAAAAAQAAABAAAAQAAABABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgEgEIgBAAIAAgBQgEAAABADQAAgBgBAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQACABAFgBIABgFQABAAAAABQAAAAAAAAQAAAAAAABQAAAAgBABQABAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBAAAAgBIgBgBQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAIACgCQAAAAAAAAQABAAgBAAQAAgBAAAAQAAAAAAAAIAIAEQAAAAABgBQAAAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAIgDAAIgCgDQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQACACAGgDQgFgGAEgCQAAAAgBABQAAAAAAABQAAAAAAAAQAAABABAAIAEgGIAAABIAAACQABAAAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAIABgBIAAACQAAAAAAAAQABABAAAAQAAAAAAAAQAAAAABAAQAEgCAAgFIAGAEIABgCQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAIgCACQgBgBAAAAQgBgBAAgBQgBAAAAAAQAAgBAAAAIgFAEQAAAAAAgBQAAAAABgBQAAAAAAAAQAAAAABAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBIAFgCQAAgBABAAQAAAAABgBQAAAAAAgBQAAgBAAAAQABABAFABIACgEIAEgFQABADAGAFIAAgDIAEAGQAAgBAGgBQAEgBgFgDQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAIgBAEIAAgBQgCABgBAAQAAAAgBAAQAAAAgBAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAgBQABAAAAgBIABgEQACADAEgBIgCgHIADACIgDgIQgBAAAAABQgBAAAAgBQgBAAAAAAQgBAAAAgBQgDAFgCgBQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQgDgCAAgCQgBgBAAAAQgBAAAAABQAAAAgBAAQAAABAAABIAEAEQgEAAABAEQAAAFgCAAIgCgCIgBgCQABgDgBgJQAFACACgEQACgFAEgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQACABADAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAgBAAgBIABAEIgCAAQgBAAAAABQAAAAAAABQABAAAAABQABAAABABQgBgDADgCIACACQADgCgCgDIgBAAIABgCQgGgBAAgDIADgLIAAACIACgCQgGgEAAgDQADgBACgJQAEABACAEQACAEACABIAHgDQACgEgEgBQAAAAAAABQAAAAgBAAQAAAAAAABQABAAAAABIgBACQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgDAAQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBgBAAAAQgBgBAAAAQAAAAgBgBQAAAAABgBQAAAAAAAAIAFgBQAAgDgEAAQAAAAAAAAQABgBAAAAQAAAAAAgBQAAgBAAAAIACABQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQAAgBAAgBQAAAAAAgBQABAAAAAAQABgBABAAQgDAEABABQAAAAAAABQABAAAAAAQAAAAABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAIAEgBQAAgBgBgBQAAAAAAgBQgBAAAAAAQAAAAgBAAQACgFgCgBQACACAEgEQAAAAAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAIgBgEIgBAAIACgDIAAADQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAABAAIABgCQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAgFgDAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAAAAAQgBgBAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAAAAAQABgBAAAAQAAAAAAgBQABABAAAAQAAAAABAAQAAAAAAAAQABgBAAAAIgBgBIgCgBQABAAAAgBQABAAAAgBQAAAAAAAAQAAgBAAAAIgEAAQAAgDAEAAQAFAAAAgCQgBgHAGgDQAAAAAAABQgBAAAAABQAAAAAAAAQAAABgBAAIgCADIADADQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAgDADgFIACgGQgBAAgBAAQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAgBgBIACgDQAAAAABgBQAAAAABAAQAAgBAAAAQABABAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIgBABIgCgBQABgBAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAIAEAEIAAgDQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAABABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABgBQgFgDABgDQABABAAABQABAAAAAAQAAABABAAQAAAAABgBQAAABABAAQAAABABAAQAAABAAAAQAAABAAABQgBAAAAABQAAAAAAABQAAAAAAAAQAAABABAAIABgCQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABIgBgDQABAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBIADgEQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgBgCIABgDIACABQAAgBAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIgBgCIACABIgCgDQADgBAAAFQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAABAAIABACQAAgBAAAAQAAgBAAAAQABgBgBgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAAAAAAAIgFgBIACgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAIgCAAIACgCQABAAAAgBQAAAAAAAAQABgBAAAAQAAAAAAgBIAEABQABAAAAAAQAAABAAAAQAAABAAAAQAAAAAAABIAAACQAAAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQABABAAAAQAAAAABAAQAAAAABAAQACgEgBgBIgBAAQABgCAAgDIACgGIgCgBIgCABQgBAFgCgCQAEgFgBgDIABAAIAAgBIAAAAQAEgCgBgCIgCAAIACgFQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQACgCgCgEQAEACAAAEQAAAFACABIABgHIABgIIgCgBIgCgCIACgBIABgBQAAAEADAGQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABgBAAAAIgBgBQgBgBAAAAQAAAAAAAAQgBgBAAAAQAAAAABgBIgCAAQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAgBAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAQAEgEAFACQgBgBAAAAQAAgBAAAAQgBAAAAAAQAAAAgBAAIgDgBIABgJQACABACgEQADgEACgBQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIgDADQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAIAAACQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIACACQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAAAAAAAQgBAAAAAAQgBAAAAABQgBACAFAFQABAAAAAAQABAAAAgBQAAAAABAAQAAgBABAAQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBABAAIgBADQAAABAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIADgGIgBADQgBAAABABQAAAAAAAAQAAAAAAAAQABAAAAAAQAFgCgDgDQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQgBgBAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAgBIAAgDIADAAQAAAAAAAAQABAAAAAAQAAAAAAgBQABAAAAAAIgCgCIgBgBQACABABgFQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAIgBgBIABgCIADABQABAAAAAAQABAAAAAAQABABAAAAQAAABAAABIgCgCQgBABAAAAQAAABAAAAQAAABAAAAQABAAAAABIAJgBQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAIgDAAQgBAAABABQAAAAAAABQAAAAABAAQAAAAABAAIADABIAEgBQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQgBgGgGgBIgCgNIADgDQAAgBAAAAQABgBAAAAQABAAAAAAQAAAAABAAIAAAFQADAAgDgHQABAAABAAQAAAAABgBQAAAAAAAAQABAAAAAAQgEgDACgFQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAgBAAAAIgCgBIAIgHIgCgCQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAgBIACgCIACADIABgDQABABAAABQABAAAAABQABAAAAAAQABgBABAAQACAHACgDQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIABgCQAAAAAAABQABAAAAAAQAAAAAAAAQABAAAAAAIADgBIgBgBIgCAAIABgDQAAAAAAABQABAAAAAAQAAAAABgBQAAAAABgBQgEgHgDAAIACADIgFAAQABgEAEgDQAGgEABgCIADABQABAAAAAAQAAAAAAAAQABAAAAgBQAAAAAAgBQAAgBAAAAQgBgBAAAAQAAgBgBAAQAAAAAAAAIADAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABIACACIADgBQABgCgCgEQgBgDABgDQAAgBgBAAQgBgBAAAAQgBAAAAAAQgBABAAAAIABAEQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAQABAAAAgBQABAAAAAAQAAgBABAAQAAgBAAAAIAEACIAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAAAABAAIAEgBIgFgGQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAgBIAEgCQgBgBAAAAQgBgBAAAAQAAgBgBAAQAAAAAAAAIABgBIACABQgBgBABAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQACABADgCQgDgDAEgCQAEgCAAgBIABADQAAAAABAAQABAAAAAAQABAAAAgBQAAAAAAgBIADAAIgCgDQACAAADADQADADACgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgEgEIAEAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAABAAIADABQgBgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAAAAAIABABQABgBAAgEQAAgEAFABIAAACIABABIACgDQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAgBgBQABAAAAAAQAAAAABABQAAAAAAAAQAAAAABABIACgBQAAABABAAQAAABAAAAQAAABAAABQAAAAAAABQAAAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAIABACIABgEQgBAAAAAAQAAgBAAAAQAAAAgBAAQAAAAAAAAIAAgBIgDgCQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAgBIABACQABAAAAAAQAAAAABAAQAAgBABgBQAAAAAAgBQAAgBABgBQAAAAAAgBQABAAAAgBQAAAAABAAQAAABAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQABAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABABQABAAABAAQABAAAAAAQABAAAAAAQAAAAAAgBQAGAAAJAGIgBADQAAAAAAAAQAAABAAAAQAAAAAAAAQABABAAAAIABgBIABACIAAADQgFgBgEABQAAADgDACIgGADIAAgBQAAAAgBAAQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAAAgBABQAAAAgBAAIAAgBQgEACAAAEIAAgEQgOANgKAXIAAgBQgBABAAABQAAAAAAABQAAAAAAAAQAAABABAAIAAAAQAAAAAAABQAAAAAAABQgBAAAAABQABAAAAABQAAABAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAABAAABIgBAEIgBgDQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQADAEgDAIQgEAIACAEIgDAAQAAAGgJALIgGAEIgCgCQADADgDAFQgEAFAAACQgHAMgHgBQAAgBAAAAQABgBAAAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAAAABgBIgEgDQACADgGgBIAAAEQAAABAAAAQAAABAAABQAAAAAAABQAAAAABABIgBgBIAAACIgBAAQgBADABAFIgCgEIgBACIAAAAIABAEQAAABAAABQAAAAAAABQAAAAAAABQAAAAgBABIgBgBIAAACIgBgCIgBgCQAAABAAAAQABABAAAAQgBABAAAAQAAABAAABIgBADQAAAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAABQgBAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQAAgBAAAAIgBAFQAAABAAAAQABAAAAABQAAAAAAAAQABAAAAAAIACgCQABADgCAIQgDABgDAFIgFAGIgCgCQAAAAAAABQAAAAAAAAQgBABAAAAQABABAAAAIgBADQgCgBgDADQgCACAAACIABACIAAABIgEgCIABAEIAAgBIAAADQgBAAABAAQAAABAAAAQAAAAAAABQABAAAAAAQgCACgDAIIAAgDQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBIAAABQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgBgCIAAAAIAAAAQgBAAAAABQgBAAAAAAQgBABAAAAQAAABAAAAQgBABAAABQAAAAAAABQgBAAAAAAQgBABAAAAIAAAGIgCgDQgBgBAAAAQAAgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAABQAEAEACgCQACAAAAAFQgDADgCAHQgCAGgCADIAAgBIgNAcIgCAAIgCgCIABAFQAAAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQgEAAAAAEQgBAFgDgBQACACgDADIgBgCQgEADAAAHQAAAHgDADIgEAAQAAAGgDAEIgBgBQgBAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAABQACADgCACQgCACABADQgDAAgCADIgCgGQgCgDgDABIgBgDQgBgBAAgBQAAAAAAgBQAAAAABAAQAAgBABAAIgDAAQgBAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBABIAAgCIgDABQAAAAAAABQgBAAABAAQAAABAAAAQAAABABAAIADACQABAAAAABQAAAAAAAAQAAABABAAQAAABAAAAIgDgCIgBACIAAACIgCgFQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAIgBAFQAAAAAAABQAAAAABABQAAAAAAABQABAAABABIADACQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIABABIABABQAEABABgFQAAgFAEAAIgBABIADACIABAFIgCgBIgCAEQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAABIgCgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAABAAAAQAGADgDADQgBAAAAABQAAAAgBAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQACgGgEgCIgBAJQAAAGgDACIgCAAIAAAEQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAADAEACQAAAAAAAAQAAABgBAAQAAABgBAAQAAABgBABIAAgBIgCAAIgCABIACABIACgBQADAEgDABQgEADAAACIAAAAIgBADQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAAAIAAgDIAAABIAAgDQgFACgCADIADADQAAAAABAAQAAgBAAAAQAAgBAAAAQgBgBAAgBQADAEAAAFQgDAAgFAEIACABQAAAAABAAQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAAAAAQgBgBAAAAQAAAAAAgBQgBAAABgBQAAgBgBAAQAAgBAAgBQAAAAgBAAQAAgBgBAAQgEAFAEACIACABQAAABABAAQAAAAABAAQAAAAAAAAQABAAAAAAIgDABQAAAAgBABQAAAAAAAAQAAAAAAABQAAAAAAAAIgFgCQAAABADAEQAAABABABQAAAAAAABQAAAAAAABQAAAAAAABIgBgBQABADgDADIgDAEIgEgCIgBACIABAAIgBADIgEAAIACgCQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAEgDgBgDQgDgCgEAHQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAAAABABQgFgBABgGQgDADABAEQACAHADACQAAABAAABQgBAAAAABQAAAAgBAAQAAABgBAAIAAgCQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAAAAAQAAgBgFgBQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAIgEACIAAgEIgCAAQAAAAAAgBQABAAAAAAQAAgBAAAAQABgBAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQACgFgGgCIABAHIgGgEQAAABgBAAQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAgBAAQAAAAAAABQAAAAAAABQAAAAABABIAGgCQACAHgDAFQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgCAHIADABQgCABgBAEQAAAEgCABIACAGIAAgBQgBAAAAABQAAAAAAAAQAAAAABABQAAAAAAAAIACABQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIgCgCQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAgBAAIgEABIABAEQAAAAABABQAAABAAAAQABAAAAAAQABAAAAAAIAAgCQgBgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQgBAAAAABQAAABABAAQAAABAAAAQAAAAABABQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAIgBAAIACADIgDgBQAAABAAAAQAAAAAAABQAAAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgDgHIACAFQABAEgCABIADAAIgBADIgBgBIAAAHQgBAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAAAABQABgBAAAAQABAAAAABQABAAAAAAQAAABABAAIgCABQgBAAgEgEgAh4DMIAAAAIAAgBIADADIAAABgAA/i9QgBgBAAAAQAAAAAAAAQAAAAABAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAgBABQAAAAgBAAIAAgBg");
	this.shape_14.setTransform(303.9375,-145.4735);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7D931").s().p("Ai2AzIAAABQgBAAAAAAQAAAAgBAAQAAAAgBgBQgBAAgBAAQgDgCgCABIABgBIAAgBQgDABgFgCQgGgEgCAAQAAAAAAgBQAAAAABAAQAAAAAAgBQAAAAAAgBIgCABIgBgBIABgBQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAgBABQAAAAAAAAQAAAAgBAAIgBgCIgCAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIAAgBIgDABIgBgCIABgBQgBAAAAgBQAAAAAAAAQgBAAAAAAQAAAAAAABQgBAAAAAAQAAAAAAAAQAAAAAAgBQgBAAAAAAIgBACIAAgCIgCABQAAgBAAgBQAAAAAAgBQAAAAAAAAQgBAAAAAAQABABAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAQAAAAAAABIgCgBIABAAQAAgBgBgBQAAAAAAgBQAAAAgBAAQAAAAAAAAIAAAAQAAgBAAAAQAAAAgBAAQAAAAAAABQAAAAAAABIgBADIgCgCIAAACIgBgDIgBgDQAAgBAAABIACAAIAAgFQAIgOAngIQATgDARgBQABAAABABQAAAAABAAQAAAAAAAAQAAAAAAgBQAAABABAAQAAABAAAAQABAAAAAAQABAAAAAAIACgBIABAAIAAAAQABAAAAAAQAAAAABAAQAAAAABgBQAAgBABAAIABABIADgCQAMAAAEgEQAAAAAAAAQABABAAAAQABAAAAAAQABABAAAAIADgBIABABIABgCQAAAAAAABQAAAAAAAAQABAAAAABQABAAAAAAIAAgBIABAAQAAgBABAAQAAAAAAAAQAAABAAAAQAAAAAAABIAGgGIAAACQAAgBABAAQAAAAAAAAQABAAAAAAQAAABABAAQAAABAAAAQAAAAABAAQAAAAAAAAQAAgBABAAQAEgEAIADIACgCIgDgBIAEAAIgBABQADAAAGgEQADABAHgBQAHAAADABIAAgEIACAEQAAgBABAAQAAAAAAgBQAAAAAAgBQAAgBgBAAIACACQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAABQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAIACABIABgBQAAABABAAQAAABAAAAQAAAAAAAAQABAAAAAAIAAgCIABgBIADACIAAAAQAAABABAAQAAAAAAAAQABgBAAAAQAAgBABAAIgBgDIABAEQABAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBAAIAFgBIABACIACgEIACADIAAgBIAAAAIABgCQABABAAAAQAAABABAAQAAAAAAAAQABgBAAAAIgBgBIABAAIABgBIABACQADAAAFgDIAAABIAEgEIAMgBIAAgCIABACQACgBAEACIAFAAIAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAIABABIAGgEQAAAAAAAAQABAAAAABQAAAAABAAQAAAAABABQAAgBAAgBQAAAAAAAAQABAAAAgBQAAAAAAABQABAAAAAAQAAAAAAAAQABAAAAgBQAAAAAAAAIAAABIACgCIABABQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAgBIABABQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAAAIABgEQABABAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIAAABIACgBIAAABIACgBIACAAIAAAAIAHgCIAAABIACgCIAAABIACAAIAAABQAAgBAAAAQABgBAAAAQAAAAABABQAAAAABAAQAAABABAAQABAAAAAAQABABAAAAQABAAAAAAIAAAAQAAAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAIgBACIACAAIgBAAQAAABABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIABAAQAAgBAAAAQABAAAAABQAAAAAAAAQABAAAAABIADgDIAAABQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIAAACIACgBQAAgBAAAAQABAAAAAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBgBAAIACABIACgBIAAACIACgBIgBACQABAAABgBQABAAAAAAQABAAAAAAQAAAAABAAIAAgBQABAAAFgCQAAAAAAAAQgBABAAAAQAAAAAAAAQABAAAAABIABgCIABgCIAAABIAAACIABgDIABACQABgBAGABQAEABABgDIgBgCIADABQAAAAAAAAQABAAAAAAQAAAAABABQAAAAAAABIAAgBIABABIAAgDIABACIABgBIAAACQAAgBAAAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIgBABQAAgBABAAQAAAAAAAAQABAAAAAAQAAAAABAAIACAAIAAACIADgBIgBgBIACACIAAgCIAAABIAEgCIAAADIAEgBIAAABQABAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBIgBAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIACABIAAgBQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQAAAAAAgBQAAAAABAAIgBgCIAEAAIAAACIAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAABIAAgBQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAABAAAAQABAAABAAQAAgBABAAIABgCQADABABADIAFgDQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAABIADgBQABAAAAgBQAAAAABAAQAAAAAAAAQABAAAAABIAAgCQAAAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAIAAgBIACgBIABABIAAABIABgBIAAABQAAAAABgBQAAAAAAAAQAAAAAAgBQAAAAAAAAIABABIAAgCQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAABIAAgBIAAAAIABgBQAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIABgBQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABABQgBAAAAAAQAAAAAAAAQAAAAABABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABIAFgEQAAABABAAQAAABAAAAQAAAAABAAQAAAAAAAAIACgCQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAABAAIABACIACgBQAAAAAAABQAAAAAAAAQAAABAAAAQABABAAAAIACgDIgBAEQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIACAAIAAABIAAABQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAAABIACgEQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABABIgBAEIABAAIAAABIAAgDQAAAAABAAQAAAAAAABQAAAAAAABQAAABAAABIABgBQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAAACQABAAAAAAQAAAAAAAAQABgBAAAAQAAgBAAgBQADADACAAIgBACQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBIABADIABABIgBAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAgBAAIAAAEQAAABAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAIgBgBIABgBIAAgBQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQAAAAgBABQAAAAAAABIgCACQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIAAgCIgBAAIAAgCIgBgCIgBACIABACIgEACQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAIAAACIgFAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIgBACIgBgCQAAAAgBAAQAAAAAAAAQAAABAAAAQAAAAABABIgBgBIgBACIAAgBQgBAAAAAAQAAABAAAAQAAAAABABQAAAAABABIgBAAQAAABAAAAQAAAAAAABQgBAAAAABQgBAAAAABIAAgFIgCAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAABABAAIgCgBIABAAIgDgCQAAAAAAABQAAAAAAAAQAAAAABABQAAAAAAABQAAgBgBAAQAAgBAAgBQgBAAAAgBQABAAAAgBIgBAAIgBAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAABABQAAAAAAABIgBABIgBABIABACIAAAAIACACQgBgBAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBIgCACIAAgBIACgDQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAgBgBAAQAAAAAAABIgBADIAAgDIgCAAIAAACQACABgBAGIgBgCIAAgCIgCAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAIgBAAIAAADIgBgBIgBADQgBgBAAAAQgBAAgBAAQAAAAgBgBQAAAAAAAAIgBABIgCgEQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBABIgBACQAAgBAAAAQAAgBgBAAQAAAAAAAAQAAAAgBAAIgBgCQgDADAAACIAAgCIgCAAIgBAAQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAgBABQAAAAAAABQAAAAABABQAAAAAAABQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABIgCACIgCgCQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAgBAAIgCgBIAAgBIgBABIABAEQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBgBAAAAIgCgEIgCADIABAAQgBAAAAAAQAAAAAAABQgBAAAAABQAAAAAAABQAAABgBAAQAAABgBAAQAAABAAAAQgBAAAAABIABABQABAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBABgBAAQAAAAgBgBQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIgBgCQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAABAAAAIAAADIgBgGIgCABIAAACQAAgBgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgDgBIAAACQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAIABAAIgCgCQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABIgBABQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAgBAAIABgDIgDABIAAADIgCAAIgBABIAAgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAABQAAgBAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIgBgCIgBAFQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgCAAQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIgCABIABgBQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIgCABIgBgBQAAAAABAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABgBAAIgCACIABACIgFABIAAACQABAAAAABQAAAAAAAAQABAAAAAAQAAgBAAAAIACAAQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAIgDgEQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBIAAABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQAAgBAAAAQgBAAAAAAQAAAAAAAAQAAABAAABIAAACQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAABgBIAAABIAAgCQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAgBAAIgCAAIABgBIgBABIgCACIAAgBIgBgBQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABABIgCABIABABIgCABIABgHIABAAIAAgBQgBgBAAAAQAAABAAAAQgBAAAAAAQAAABAAABQgBAAAAAAQAAABAAAAQgBAAAAAAQAAgBAAAAIABADIgBACIgCAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAIAAgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAABIgBAAIABgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIgCABIACACQAAABgBAAQAAABAAAAQAAAAgBAAQAAAAAAgBIABgBIgEABIABgCQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABIgBABQAAAAAAgBQAAAAgBAAQAAAAAAAAQAAAAgBAAIAAABIgBgCIgDAEIgCgBIgDgBIgBABIgBAAIAAACIgBADQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgBACIAAAAQgCgBgCAEQgCAFgCgBIAAgCIgBABIgBABIgGABQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIgCgBIAAACIgBgBIAAgBIgBACIgBgEQgEACAAADIgKACIgJAEQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAABIAAgCIgGAAIAAABIgBAAQABADgEAAIABgBIABgCQgBgBAAAAQAAAAgBABQAAAAAAAAQgBABAAABIABgCQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAAAABQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQgBgBAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAIAAgBIgCABIAAgDIgCAAIABADQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABQAAgBAAAAQAAgBgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAIgFACIgFADIgCgEIgBABIAAAAQAAgBAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAIAAACIAAAAQAAAAAAAAQgBABAAAAQAAAAAAgBQgBAAAAAAIAAgBIgBAAIABADQgHAAgGADIgGgCQgCAAgFADIgCAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAIgBACIAAgBQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIAAACIgFABIAAAAIgCABIgBgCQgCADgFAAQgHAAgCABQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBABAAAAQgBAAAAABQgBAAgBgBQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAAAAAABQgBAAAAAAQAAABAAAAIABACQgFABgKABQgLABgFACQgRACgFgDIAAAAIgDADIABAAIgJABQgEAAgDgBgACngvIAAgBIAAABg");
	this.shape_15.setTransform(31.175,19.3442);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F7D931").s().p("AjLBXIgFgBIABgCIgCgCIgCABIABgBIgDgBIAAADQgCgBAAgFQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAABgBAAQAAAAgBABQAAAAAAABQAAABAAAAQABAFgBABIgDgDQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBgBAAAAQAAgBAAAAQgBAAAAAAQAAgBAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgDgBIAAgBQgCAAgDADQgCADgDgFQAAAAABAAQAAAAAAAAQABgBAAAAQAAgBAAAAIgEABIgBABQAAgBAAAAQgBAAAAAAQAAgBgBAAQAAAAgBAAIADgEIgCgCIgBAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAAAAAgBIgDADIAAACIACABIgBAAIgCAAIABAEIgDgCQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAABAAAAIAAgDQgBgBgEACQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQABAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBABAAAAQgBABAAAAQgBAAAAAAQgBgBgBAAQAAAAgBgBQgBAAAAABQgBAAAAAAQAAABAAAAQgBABAAgBQgBAAAAAAQgBAAAAgBQgBgBAAgBQgBAAAAgBQgBAAAAgBQAAAAgBAAQAAAAAAAAQgDgCgCgFIgCgHIADgBQAAAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAgBIgBAAQAAAAAAgBQAAgBAAAAQABgBAAAAQABAAAAgBIADADIADADQADgCADABIAGABIAAABQAAABABAAQAAAAABAAQAAAAAAAAQABAAAAgBQABAAAAgBQAAAAABAAQAAAAABAAQABAAAAABIAAAAQAGAAABgBIgDADQAUABAXgKIAAABQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAAAIgBgBQAGgCgBgFQAAAAAAABQABAAAAAAQAAAAAAAAQABgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQABABAAAAQABABAAAAQABAAAAgBQABAAAAgBIAEgCIgCADQAAAAAAABQAAAAAAAAQAAABAAAAQABAAAAAAQABgFAIgDQAIgDACgEIACACQACgDAGgBIAJgCIAIABIAAADQABgEAFgBQAGgBABgBQAPgDADAFQAAAAgBABQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIABAFQAAgBAAAAQAAAAABAAQAAAAAAAAQAAAAABAAIACACIADgDQAAAAABAAQAAgBABAAQAAgBAAAAQABgBAAAAIAAABIABgCIABABIADgDIADgDIgCAFIACgBIAAAAIACgEQACgDACAAIAAACIACgBIgBABIgBACIAEgDQABAAAAAAQABAAAAgBQAAAAABAAQAAAAAAgBQAAABAAAAQAAABABAAQAAAAABAAQAAAAABAAQABAAABAAQABAAAAAAQABAAAAAAQAAABABAAQgBABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIACACIAEgDQAAAAABgBQAAAAAAAAQAAgBgBAAQAAAAAAgBIgDAAQACgDAHgDQAFABALgCIAAACQADAAACgDQABACAEAAQADAAACgBQAAgBgBAAQAAAAAAgBQAAAAABAAQAAgBAAAAIACAEIACgDIACgBQAAAAAAAAQABAAAAgBQAAAAAAAAQgBgBAAAAQAEAAAHgEIgCADQAAAAgBABQAAAAAAAAQgBAAAAABQgBAAAAAAIAAgBQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIgBACQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAIAFgBIAEgEQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABABAAQAAAAAAAAQABAAAAABQABAAAAAAQAAABABAAQAAABABAAQAAABABAAQAAAAABAAQAAgBABAAQgBgFgCAAQAAAAgBAAQAAAAAAgBQAAAAABgBQAAAAAAgBIACgCQAEABAGgEQAGgEADgBIAAACIAdgLIACACIAAADIADgFQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAAAQADADADgDQAEgDACADQAAgBAAAAQABgBAAAAQABAAAAAAQABgBABAAIgBADQAFAAAFgFQAFgFAEAAIADADQAEgEAFgBIABACQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQABgDADAAQAEgBAAgCQACADAEgDIgCAGQgBAEADACQAAAAAAAAQAAAAgBAAQAAABAAAAQgBABAAABQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBIACADQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQAAAAABAAQAAgBABAAIgBACIACABQABAAAAAAQAAAAABAAQAAgBAAAAQAAgBAAgBIgBgDQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBIABAEQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABgBIgCAEQgBABAAAAQAAABAAAAQAAABAAAAQABABAAAAIAEgDQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIAAgDIABABIAAgDQgDgDgDADQgDADgDgDIABAAIgBgDIADgEIABACIAEgBQAAAAABgBQAAAAAAgBQAAAAABgBQAAAAAAgBIABACQAAAAAAABQAAAAABAAQAAAAAAAAQAAgBABAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAQABABAAAAQABAAAAgBQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAIgDADQgBAAAAABQAAABgBAAQAAABAAAAQAAABAAAAQADAAAFgFQAEgEADAAIACACIADgEQAAABAAAAQABAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAABAAAAQAAABABAAQAAAAABAAIAAgGQAAAAABAAQAAgBABAAQAAAAABAAQABAAABAAIgBABQAAAAABABQAAAAAAAAQABABAAAAQABAAABAAQAAgBAAgBQAAAAgBgBQAAAAAAAAQgBgBgBAAQABgEADABQAEABACgCIAAABQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQABAAAAgBQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBACIAAAAIgCACIADABIAFAAIABgEQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAIgBACIABgFIADgDQACACAGAAIgBgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABABAAAAQABABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAAAABQgBAAAAABQABAAAAABQAGAAgCgFQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAgBAAAAIACABQABABAAAAQAAAAABAAQAAAAAAgBQABAAAAAAIABAFQABgBABgFQAAgBABAAQAAgBAAgBQAAAAABAAQAAgBABAAIgBABQACgCAEAAQAEAAABgBIABAEIADgBIgBgBIADAAIADACIgDAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAIgEABIgDABQABADAHgBQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQABABAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAEABADgEQADgHgBgDQABAAAAAAQABAAABAAQAAAAABAAQAAAAABgBQAAABAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQgBACADADQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABABABQAAAAABAAQAAAAABABQAAAAABgBIAAgGQABgEACgBIgDAHIACgBIAAAEIgBAAQgBACgEACIACACQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgGADAEAGQADgDABgDIACAHQAAAAAAgBQABAAAAAAQABAAAAABQABAAABAAQAAABABAAQAAAAAAAAQABgBAAAAQAAgBAAgBIgFgDQADgGAGgCQgDADAAACIAHgEIgCgDQACACADgDIAGgDIACgFIAAABQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIAAgCIACACQABAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIgCACIgBADQABgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAIADACIACgDQAAgBABAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAAAABQgBAAAAAAQAAAAAAABQgBAAAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAABgBQAAAAABgBQAAAAAAAAQAAgBAAAAQgBgDACgCIAAABIABgEIABADQABAAAAAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAAAAAQAAAAABABQgDAFAAACIADgFQABgEADABIgCgCIAEgDIgBABQAAABgBAAQAAAAAAAAQAAAAAAAAQABABAAAAIAEgFQAAAAAAABQAAAAAAABQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAIgBgDIAAgBQACAAAAAHIACAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAAAABQgBAAAAABQAAAAAAABQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAABIgEABIAAgEQAAAAAAgBQAAAAAAAAQgBAAAAAAQgBAAAAABIgDAGQABABABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAABAAAAQAAAAAAABQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAQABgDAEABQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQACACAEABQAAAAAAABQAAAAgBAAQAAABAAAAQAAABAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABgBAAAAIgDAFIABAAIgBADQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIgEAAQADACgEADQAAgFgCgDIgDACQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQABgEgIgKQAAABgBAAQAAABAAAAQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAAAABQAAAAAAABIACACQgBAAAAAAQgBAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgDACAAADIgBAHIABADQgBAAAAAAQAAAAAAAAQAAAAAAAAQgBABAAAAIAAACQAAABABAAQAAABABAAQAAAAABAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAgBAAgBQgBAAAAgBIgCgDIAGAAQAEABACgBIAAADIAEgDIgBAAIABgFQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQACABgCAEQgCAEACACQABAAAAAAQAAAAAAAAQABgBAAAAQAAgBAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAIgBAGIABAAIgBABIACABQABABAAAAQAAAAAAAAQABAAAAgBQAAAAAAgBQAAABAAABQAAAAAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQgBAAAAABQgBAAAAAAQAAAAAAABQgBgCgEgCIgFACQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBABAAIABAAQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAIAAACQAAABgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAAAgBAAQABABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAIAAADIgCAAQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgDgJQgBAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAIACACIgBADQAAABgBABQAAAAAAAAQAAABgBAAQAAAAgBAAIAAADQAAgCgFgCQgBAGgCABIAAgDIgGABIABgBQAAAAgBgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAIACgCQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAQgEgDgEAEIgBgHQAAAAAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAAAAAABIADgBIgBAFIAHABQAAABgBAAQAAAAgBABQAAAAAAgBQgBAAAAAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgFgBQgBAAgBgBQAAAAgBABQAAAAgBAAQAAABAAAAIgDgGQgCACgJAAQABgCAAgDIAAgFIgCACIABgHIgFgDQgEgCABAFQAAABAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAQAAAAAAABIADgBIADACQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAIgEACQAAgDgCgCIgEAFIgBgDIgDAIQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABIAEgBIADABQgBABAAAAQgBAAAAABQAAAAgBABQAAABAAAAQAAABAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAAAABABQAAAAAAAAQABAAAAAAQABAAABAAQgBgEABgCQADACACgDQADgDACABQAAAAABABQAAAAAAABQAAAAAAAAQgBABAAAAIgBACQgCABgGAHQgDgEgEABQgFACgDgDQgBABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQgDgIgEAEIACgDIABABQAAABAAAAQABAAAAgBQAAAAAAAAQABgBAAAAIAAgDQgCADgDgBIAAgDQgEABAAACIABABIgDABQAEAFgDACIgJAFIABgCQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQACAHgDACQgCgBgJAFQgBgEABgEIABgGIgHgCIgCABQAAABAAAAQgBAAAAABQAAAAAAAAQAAAAABAAQACABACgDQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAIACACIgBAEQAAABAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgEgDQgBACACAEQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAIgBABIAAgDQAAAAgBAAQAAAAgBAAQAAAAgBABQAAABgBAAQAAABgBAAQAAABgBAAQAAAAgBgBQgBAAAAgBIADAAQAAAAAAAAQABAAAAAAQAAAAAAgBQABAAAAgBIgCgDQgBAAAAAAQAAAAAAgBQAAAAABAAQAAAAAAgBIgEgCQAAABAAABQAAAAAAABQAAAAAAABQAAAAABAAQgFACAAADQAAgEgFAAQAAACgBABQAAABABAAQAAABAAAAQAAAAABgBIgDAEIABAAIgDAAQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAAAQgBgBAAAAIgBAAQgBABAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQgEACACAEIACAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIAAAAIgCgCQgBAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIABACIgEABQAAAAAAAAQABABAAAAQABABAAAAQAAABABAAQgCACgDgDQgDgDgCABQgDAFgHgBIADgBIAEgBIAAgDQAAAAAAgBQAAAAAAAAQgBgBAAAAQgBAAAAAAQgCACgFABQgFACgBABQABABAAABQAAAAAAAAQABAAAAAAQAAAAABgBQAAgBAAAAQABAAAAAAQAAABABAAQAAABAAABIgEAAQAAABgBAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCAAIgBgFIgCACIgCACQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBgBAAAAIgCgBIAAAEQAAABAAABQAAAAAAAAQAAABgBAAQAAAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAAAQgBgBAAAAQgBAAAAgBQAAgBABAAQAAgBAAAAQABAAABgBQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAAAgBIgDABQAAABAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAIgBACQgBAAAAgBQgBAAAAAAQgBAAgBAAQAAAAgBAAIgEABQgBABAAAAQAAAAgBABQAAAAAAABQAAAAAAABQAAABABAAQAAABAAAAQAAAAABAAQAAAAABAAIgCADIgCABQAAAAAAgBQAAAAAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAgBAAAAIgBAEQgDgCAEgEQgBAAAAAAQAAAAgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQAAAAgBAAQAAABAAAAQgBAAAAgBQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAABgBAAQAAAAgBAAQAAABgBAAQAAABAAAAIgDAEQABAAAAABQAAAAAAAAQABAAAAAAQAAgBABAAIACgCIACAFQAAAAgBgBQgBAAAAAAQAAAAAAABQAAAAAAAAIACACIgDgBQgBAAAAAAQgBAAAAAAQAAABAAAAQgBAAAAAAIgDgDQAAgBAAAAQAAAAAAgBQAAAAAAAAQABAAAAgBIADgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgFABAAABIABABIgFADQgDACgCAAQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAIACABIADgCQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIgFACIgEABIAAAAIgBABIAAgBQgFAAAAABIACACIgEACQgBABAAAAQgBAAgBAAQAAAAAAgBQgBAAAAgBIgCACIgCADQgCgEADgDQADgEAAgCQgEACgIAHIABACQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCgBQADgDACgGQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBgBgBAAIAAACQAAABAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQABABAAAAQAAABABAAQAAAAAAAAQABAAAAgBQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgFAAgCgFQgCADADADIgGAGQgCgCgDABQgFACgCgBQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAIAEgBIgBACIACgCQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAIAAgDQAAAAAAABQABAAAAAAQAAAAAAABQAAAAAAABQAAABAAAAQAAAAAAABQABAAAAAAQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBIABgEIgEAAQAAABAAAAQgBABAAAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBAAAAIACgBQAAAAABgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgDABQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBgBIgDABQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAABABAAQAAABAAAAIABAEQAAgBgEAEIgCgCQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAIgBACIABACQgBgBAAAAQgBAAAAAAQgBABAAAAQgBAAgBABQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgBABIgCABIgCgEQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBIAAADQABAAAAAAQABAAAAgBQAAAAABgBQAAAAAAgBQgFgDgCgDIADADQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIgCgEQgGAAAAgCQgDAFADAFIgHALIgFAAQAAABgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAIAEgEQgDgCgDAHQgBAAAAgBQgBAAAAgBQAAAAgBAAQAAAAAAAAQABAEgFADQgCACgDgDQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBABIACACQgEAAgHgCIAAAEQgBAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABAAAAQAAAAgBgBIABgEIgDABIAAgCQAAAAgBgBQAAAAAAAAQAAAAgBAAQAAgBAAAAQAFgHgFABIAAADIgDABQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBgBIgDgBQAAABAAAAQAAABAAAAQAAAAABABQAAAAABAAIgDACQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBgBAAAAIgCAAQgDAHADADIABgEIADAEQgDACgFgBIgJgBIgCgDQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBABIAAADIgDgBQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAIgBgCQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIgDgCQgCACgBADQgCADgCABIAAADQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAABAAIACgEQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQgBAAAAABQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBAAIgBgDIAAAAQAAgBAAAAQAAgBAAgBQgBAAAAAAQgBgBAAAAIgEgCIAAAIQAAgBgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAIgEgCQAAABAAABQgBABAAAAQAAABABAAQAAABAAAAIgCAAIgBgCQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAAAQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAAAgBgBIgCgBQAAABAAABQAAAAgBABQAAAAAAAAQgBABAAAAIgCgBgAiwBWQgBgDAEABIgBABIgBABIgBAAg");
	this.shape_16.setTransform(30.825,24.1041);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F7D931").s().p("AAdDrIAAgCIgFgBQgNgIgJgmIgEgkQAAgBABgBQAAAAAAgBQAAAAAAAAQAAgBgBAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBIgBgCIAAgBIAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgCgCIABgCQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBAAQgBgNgDgDQAAAAAAgBQABAAAAAAQAAgBAAAAQABgBAAAAIgBgEIACAAIgDgBIACgCIgBAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIABgBIgGgHIACABQgBAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAQAAAAAAAAQgBgBAAAAQgDgDACgKIgCgBIgBACIAAgDIABAAQAAgDgEgFQABgEgBgGQAAgHABgDIgEAAIAEgCIgEAAIACgCQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAIABgBIgBgCQABAAAAgBQABAAAAAAQAAAAAAAAQAAgBAAAAIgCAAIgBgBQAAgBABAAQAAgBAAAAQABgBAAAAQAAAAAAAAIAAAAQAAAAAAAAQABAAAAgBQAAAAgBAAQAAAAAAAAIgBgCIgDABIAEgBIAAgCIgCAAIgBAAIAAgEIABgBQAAAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIADgCIgBAAIAAAAIgCgBQABgBAAAAQAAgBAAAAQABAAgBgBQAAAAAAAAIgBABIAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIACAAQAAgFgDgEIABAAQAAgBgBgBQAAAAAAgBQgBAAAAAAQgBgBgBAAIAAgMIgDAAIACAAQgBgCACgFIAAgFIgBAAQgBAAAAgBQAAAAAAAAQAAAAAAAAQABgBABAAIgEgGIACgDQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBAAABgBIAAgBIAAgBIgBgBIABAAIgBgCIgBgCQABAAAAAAQAAAAAAAAQABgBAAAAQAAAAAAgBIgEgCQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAgBAAIABAAIgBgCIABAAIgBgCIAAgCIAAAAIgBgHIABAAIgDgCIABAAIAAgCIABAAQgBAAAAgBQAAAAgBAAQAAgBABAAQAAgBAAAAQABgBAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAIAAAAIACgDQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAIACABIAAgBQABgBAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIgBgBIAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAAAABAAQAAgBAAAAQAAAAABAAIgDgDIACAAQgBgBgBAAQAAAAAAgBQgBAAAAAAQAAAAABgBIABABQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAABIABgCIgBgDIABABIABAAIgBAAIAAgCQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAIgBgFIgBAAQABgCgDgEQAAAAAAABQABAAAAAAQAAAAAAAAQAAAAABgBIgEgCQAAAAAAAAQABABAAAAQAAAAABgBQAAAAABAAIgDgBIACgBQgCgCACgEQABgFgDgCIgCABIABgCIACgCIgBAAIABgBIgDAAIACgBIgBAAIACgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQABAAgBgBQAAAAAAAAQAAAAAAgBIABAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAAgCIACAAIgBgDIgBABIACgCIgCgBIABAAQAAAAAAAAQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAABAAIgBgEIABgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAABgBAAQAAAAAAgBQAAAAgBAAQAAAAAAAAIABAAIAAgBQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAABABIAAgCIgBgBIgCABIAAgEIACAAIAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAIgBAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQABAAAAgBQAAAAAAgBQgBAAAAgBIgCgBIAEgDIgDgGIACAAIgBgCQAAgBAAAAQgBAAAAgBQAAAAABgBQAAAAAAgBIgCABIACgBQAAAAAAAAQABAAAAAAQAAAAgBgBQAAAAAAAAIgBAAIgBgCIABAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIgBgBIABAAQAAgBAAAAQgBAAAAAAQAAgBAAABQgBAAAAAAIABgBIgCABIACgDIgBgBIAAAAIgBAAQABAAAAABQABAAABAAQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAAAABAAIgEgGQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIgCgCIABAAIgBgEQAAABABAAQAAAAAAAAQABAAAAAAQABAAAAgBIgDgCIAEABQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAAAAIAAgBQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAAAIABAAIgEgCQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAABgBIABABIADAAQgBAAABgBIABgBIgDABIACgBIACgBIgBgBIABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBAAgBAAIACgDIABgDQAFACgDACIACgBIABgBQAAAAAAAAQABABAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAABQAAAAAAABIAEAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABIAAAAIgCgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAABIgBAAQgBACAFABIgCABIgCgBIAAACQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAIgCABIACABQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIACADQAAABAAABQAAAAAAABQAAAAAAAAQgBABAAAAIACAAIAAAFQgBAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABIACABIgCABIACAAIgBABIACACIgBAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAABAAIABgCIABACQAAgBAAAAQABAAAAAAQAAAAAAAAQAAAAABABIABABIgFAAIAAACQAAAAAAAAQAAAAAAAAQABAAAAAAQABgBAAAAIgBACIAAgBIgCACQAAABABAAQAAAAAAgBQABAAAAAAQAAAAABgBQgBABAAABQgBAAgBAAQAAABgBAAQAAAAgBgBIAAACIADABQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAIABABIABABIACgBIAAAAIACgBQgBAAAAAAQAAABgBAAQAAAAgBABQAAAAgBAAIACACIgBAAIgDgBQABABgGgBIgBADIADAAIgDABIABACIABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABgBABAAIADABIgCABIgCABIABABQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAABAAIgBAAIADAAIgBABIADAAIgCAFIABABIgEACQAAAAABAAQAAAAAAAAQABAAAAAAQAAABABAAIACABQgBAAAAABQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAQAAABABAAQAAAAABABQAAAAABAAIgBAAIAAACIAAABQAAABgBAAQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAQgBABAAAAQAAAAAAABQAAAAAAABQAAAAABABIACABIABAAIgDABQAAAAABABQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAADIgBgBIAAADQABAAAAgBQABAAAAAAQABAAAAgBQABAAAAgBQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIADABIABAAQAAAAAAABQAAAAAAAAQABABAAAAQAAAAABAAQABABAAAAQABAAAAABQABAAAAAAQAAABABAAIADgCQAAABABAAQAAABAAAAQAAABAAAAQgBABAAAAIgDABIgCABQAAAAAAABQAAAAABAAQAAAAABAAQABAAABAAIgFABIAAADIACgBIgBABIAAABIgBACIACABQAAAAAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAIAAgBIgBACQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQABAAAAABQABAAAAAAQAAAAAAABQAAAAAAABIgDAAIABACQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAIAAACIABAAIgBAAIgBACQgBAAAAAAIgCAAIAFACQAAAAABABQAAAAAAAAQABABAAAAQAAAAAAABIAAACQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABgBIgBABIABACIgBgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIABADIgBABIAAgBQgBAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAABQAAACADACIACgBIABAEIACAAQAAAAABAAQAAgBAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAABAAAAIgEADIgBADIABAAIABAAQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAgBAAQgBAAAAAAQAAABAAAAQAAAAAAAAQABAAABAAIACgBQAAABAAABQAAAAAAAAQAAABAAAAQAAAAABAAIgBABIgBABIABgBIgCAAQgBAAAAAAQgBABAAAAQgBABAAAAQAAABAAAAIAAAAQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAAABAAAAQgBAAAAAAQAAAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAABAAQAAgBABAAIABACIACgBIAAACQgBgBgGAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAABABQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAAAQgBABAAAAIADgBIACABIAAACIABACIgBAAIABADIAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAABABQAAAAAAAAQAAAAABAAQAAgBAAAAQAAAAABAAIABAAQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAIgBgBIABADIgCAAQAAAAAAABQAAAAAAAAQABABAAAAQAAAAABAAQAAAAgBABQAAAAAAAAQAAAAAAAAQAAAAAAABIACAAIgDACQAAAAAAAAQAAABABAAQABAAAAAAQABAAABAAQgCACAAAEIACACIAEABQAAgBAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAABAAQAAAAAAAAIACABQgBACAEACQAFACgBADIgCAAQgBAAABAAQAAAAAAABQAAAAABAAQAAAAABAAIABAGQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAABIgBABIADABIgCAAIABABIgEABQADADACABIAGATQAAAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAABAAIgCAAIAAAHQAAAAABAAQAAAAAAAAQAAgBABAAQAAAAAAAAIgBACQADgCAAAEIgBgBIgCAAQgBAAAAABQAAAAABAAQAAABAAAAQABAAABAAIgCAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAAAABQAAAAABAAQAAABABAAQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAAABABAAQAAABAAABQAAAAAAABQgBABAAAAQAAABAAABQABAAAAABQAAAAAAABIgBgBIABACIgCAAIgBABIADAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAEAFAGIgEACIABABIAAAAQgBAAAAAAQAAAAAAAAQABABAAAAQAAAAAAAAIACgBQAAABAAAAQABAAAAAAQAAABgBAAQAAAAAAAAIgBABIAAABIADgBQAAAGADAIIgCAFQAAACADAEIAAADQAAAAAAABQAAAAAAAAQAAAAgBABQAAAAAAAAIACABIgBABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIACAAQgBABACAFIAAAAIABABIgCABQADACAAAGQAAAFACADQgBAAAAABQAAAAAAABQAAAAAAABQAAAAABABQABADgDACQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAEABALQABALACAEIABANQAAAHgBADIABgBQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgCABIADACIABgBIAAAIQABAFgCADIABAAQABABgCAEQgBABAAAAQAAABgBAAQAAABABAAQAAABAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQABADgCAEQgEAHAAACIgDgBIABACQAAABgBAAQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAABABQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAIAAABIABABIAAABIgBgBIABAEQgBAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABIABABIgBAAIABABIgDABIABABQABgBAAABQAAABAAAAQAAAAAAAAQAAAAgBAAQAAAAAAgBIgBgBIgBABIAAAAIgCAAQAAABgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAAAQgBAAAAAAQAAABAAAAQAAAAABAAQAAAAABABIADAAIgCACIADgBIAAABIgBAAIgDABIgDABQgBAAABAAgAAyDAIAAABIAAgBg");
	this.shape_17.setTransform(233.1393,173.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F7D931").s().p("AAzEgQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAABgBAAIAAABQgDAAgBgDQAEgDACgDQgCgCABgEQACgEgBgCIABAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBIAAAAQAAgGgBgBIADADQABgUgKgXIABABQAAgBAAgBQgBAAAAAAQAAgBgBAAQAAAAAAAAIgBABIgDgEQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBAAAAABQAAgBABAAQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAAAAAAAQgBAAAAgBQAAAAABAAQAAAAAAAAIABAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAAAAAQABgBAAAAQABAAAAgBQAAAAAAgBQgBAAAAgBIgDgEQAEAEABgDQgFgBgDgIQgDgIgEgCIACgCQgDgCgBgGIgCgJIABgIIADAAQgEgBgBgFQgBgGgBgBIgCgKQAAgFAEgDQAAABABAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAAAABIAFgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIACgCIgDgDQAAAAAAgBQgBAAAAgBQgBAAAAAAQgBgBAAAAIABAAIgCgBIABgBIgDgDIgDgDIAFACIgBgCIAAAAIgEgCQAAAAgBgBQgBAAAAgBQAAAAgBgBQAAAAAAgBIACAAIgBgCIABABQABABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBgBIgBgDQAAAAABAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQAAABAAAAQABAAAAAAQAAgBAAAAIACgCIgDgEQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBABIAAACQgCgCgEgHQABgDgBgFIgBgIIACAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgDQADgBAAgDQgBgEgBgBQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBAAIAEgCQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAAAAAIAAgBIgBgCQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAABQAAgDgEgIIADADQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIgBAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIACAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgFIgFgEQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQABgBAAAAQABgBAAAAQAAgBAAAAQgBgBAAAAQgFAAAAACQgBABgEgDQABgEgEgGQgEgHgBgCIACABQgIgYgDgGQAAgBABAAQAAAAABAAQAAgBABAAQABAAABAAIgFgCQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAgBAAAAQADgDgDgDQgDgEADgCQgDAAAAgEIADABQAAgFgFgFQgFgFAAgEIADgBQAAAAAAgBQABAAAAAAQAAAAAAAAQAAgBgBAAQgEgEAAgFIABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQgDgBAAgDQgBgDgCgBQADgCgDgEIAGADQAEABACgEQAAAAAAABQAAAAAAAAQABAAAAABQABAAABAAQABABAAAAQABAAAAABQAAAAAAAAQAAABgBAAIADgCIgCgCQgBgBAAAAQAAAAAAgBQgBAAAAAAQAAgBAAAAIACABIABgDQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBAAgBAAIgDABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAIAEgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAgBAAIgBgCIAEACQABABAAAAQABAAAAAAQABAAAAAAQABgBAAAAIgDgEQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBABIgEAAIABgBQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQgDADADADQADAEgDACIAAgBIgDABIgEgDIACAAIgBgEQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIACgBQAAgBABAAQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQABgBAAAAQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAFAEACAAQAAgDgFgEQgEgEAAgEIACgBIgDgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAIgDAAQgBgBAAgEIABABQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAgBIgCABIgBACQgFgBABgDQABgEgCgCIABAAIgCgCQAAgBAAAAQAAAAAAAAQAAgBgBAAQAAAAgBAAQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABIAAAAIACABQACgFgBgCIgEgBQAAAAAAABQAAAAAAAAQABABAAAAQABAAABAAIgEgBIgEgCQACgCAAgHIgCABQAAAAgBAAQAAAAAAAAQAAAAAAgBQgBAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAABABQAAAAABAAQAAAAABAAQAAAAABAAQAAgHgFACIgCABQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAABIABgDQABgBAAAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQACgCADABQgBgCgFgBQgBAAAAAAQgBAAgBgBQAAAAAAAAQgBgBAAAAIABAAQgCgCAAgEQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAgBgBAAIAEgBIgBgCIgBAAIAAgDIACgDIAAAEIACgBIABADIABADQABAAAAAAQABgBAAAAQAAgBABAAQAAgBAAgBIgBgEQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQABAAAAgBQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAgBABAAQABAAAAAAQABAAAAAAQABAAAAAAIADADQABgEgEgDQgGgDgEABIgBgDIAAgCQABAAABAAQAAAAABABQAAAAAAABQAAAAAAABQACABADgDQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQADgDgBgCQgJABgCgEQABADAGAAIgBgBIAEAAQACABACAEIACgCQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQAAABAAABQAAAAAAAAQAAABgBAAQADAGAGgEQgDgDgDgBIAHgCQAAAAgBAAQAAgBAAAAQAAgBABAAQAAgBAAgBQABAAAAgBQAAAAAAAAQgBgBAAAAQgBAAgBAAIgDAFQgHgDAAgGQAAABABABQAAAAABAAQAAABABAAQAAAAABAAIgEgHIgDACQACgCgDgDQgDgDABgCIgGgDIABAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgCAAIACgCQAAAAAAAAQAAgBABAAQAAAAAAAAQAAABAAAAQABABAAAAQABABAAAAQABAAABAAQAAAAABAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIACgEIgDgCQgBAAAAAAQgBgBAAAAQgBAAAAABQAAAAgBAAQAAABABAAQAAAAAAAAQAAAAABAAQAAABABAAQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAgBgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBAAIABgBIgEgBIADgBQAAgBAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAgBQABAAAAAAIADACIAEAAQgJgDABgDIgCACIgCgDIACAAIgFgFQAAAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBgBQAAgCAHAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQgDAEAHABQAAAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAIACgBIABAEIgEAAQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAABABIAGACQABgBAAgBQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQgDgBABgEIACABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAIACgDIABgDIADABQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQgBgBAAAAIAFADIAAgBQAEABAAADQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAgBAAIAAAEQADgDACAEIgEABIgEACIACACIABADQgDAAgEACIgHAFQABABAAAAQABAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQAAAAAAABQAAAAABAAQAAAAABAAIACgCQAAABAAAAQAAABAAABQABAAAAABQAAAAAAABQABAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQACADADAAIAHACIADgCQAAAAAAABQAAAAAAAAQAAAAAAAAQABABAAAAIACABQABgBAAgBQABAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAIgDACIAAgGQABgEgBgCQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAIgDgDIAAAAIgEAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQABgBAEABQAEACADgCQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAIAGAAIAAAAIABAAIACgCQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAgBgBAAQABAAABAAQAAABAAAAQAAAAABAAQAAABgBAAQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQgCABgCAEIACAFQAAAAgBAAQAAAAAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAgBABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAAAABQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAIADAAQAAAAABABQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQABgBAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIAAACQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQgEADgFAAQAAABAAAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAIACgCIADABQABAAABABQAAAAAAAAQABABAAAAQAAABAAAAIAEgBQgDAAgBAHQAEABABABIgCAAIABAGIgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAgBAAQAAABAAAAIgCgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgDAEAEAEIgHABIABADQABABAAAAQAAAAAAAAQABAAAAAAQAAAAABAAIgBgDQAFAAAAABIABgHQABABAAAAQAAABAAAAQABAAgBABQAAAAAAAAQAAABABAAQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQABAAAAgBQAAAAABAAQAAAAAAABIgBAEQAAABgBABQAAAAABABQAAAAAAABQABAAAAABQgCAAgEACQACACAAAJIgKgBIACACIgHgBIgDAGQgCADAFgBQABAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAQABgBAAAAIgBgDIAAAAIACgCQAAgBAAAAQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABIACAEQgDAAgCADIAFADIgDABIAIADQABAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAIgBgDQAAgBABAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAABABQABAAAAAAQABAAABAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAgBQABAAAAAAQAAgBAAAAQgBgBAAgBIgGAAQACgDgDgCQgDgDABgCQAAAAABgBQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABACAHAGQgEADABAEQACAFgDADQABABAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQgIADAEAEIgDgCIABgBQABAAgBgBQAAAAAAAAQgBgBgBAAQgBAAgBAAQADACgBADIgDAAIAAADQABAAAAAAQAAABABAAQAAAAABAAQAAAAAAAAIABgBIABADQAGgDABACIAFAKIgCgCQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAABQAGgEADAEQgBACAFAJQgEABgEgBIgGgBIgCAHIACACQAAAAAAABQABAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIgCgCQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAIACgCIAEABQABAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAIgDAEQADADADgEQAAABAAAAQAAABAAAAQAAABAAAAQABABAAAAIgCAAQAAABAAAAQAAAAAAABQAAAAABABQABAAAAABQABAAAAABQABAAAAABQAAAAgBABQAAABgBAAIAAgDQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAAAgBAAIgDABQAAABAAAAQAAAAgBAAQAAAAAAAAQAAgBgBAAIgCAEIACABQABAAAAAAQAAAAAAAAQABgBAAAAQAAAAAAgBQACAFADAAQgDAAAAAFQABABABAAQABAAAAAAQABAAAAgBQAAAAgBgBIAEADIAAgBIAAAEQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAAAAAQgBAAAAABIAAACQABAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAIADACQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAAAQgBgBAAAAQAAAAABAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAAAAAQgBABAAAAQgBABAAAAQAAABAAABQAAAAAAAAQAAABAAAAIAAAAIgCACQAAABABAAQAAAAABAAQAAAAAAgBQABAAAAgBIABAEIADgDQACACgDADQgDAEABABQAFADgBAIIgBgEIgBgEIgDAAQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAABQACACABAEQACAFABABQABAAABAAQAAgBAAAAQAAAAAAgBQAAAAgBgBQgBAAAAAAQAAgBAAAAQABAAAAgBQABAAABAAIAAAEQABAAAAABQAAAAgBAAQAAABAAAAQAAAAgBAAQABAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQgBAAAAAAQAAgBABAAQAAAAAAAAIABAAIABACIgGABIACACQABAAAAABQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBABAAAAIgBADIAEgBQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAAAAAABQgBAAAAABQAAAAgBAAQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBAAgBQgBAAAAAAQAAgBgBAAQAAAAAAAAQABABAAABQAAABAAABQAAAAgBAAQAAAAgBAAIACABQAAABAAAAQgBABAAAAQAAABAAABQAAAAAAABIABAFQABAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQABAAAAgBQABAAAAAAQAAAAAAgBQABAAgBgBIADACIABACIgCABQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIACABIgCABIAEABQgCACgEgDQAAABAAAAQAAAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAQAAABgBAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQABAAAAABQAAAAAAABQABAAAAABQABAAAAAAIAEADQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgDIAFgCQgBABAAAAQAAABAAAAQAAAAAAAAQABAAAAAAIACgBIgBACQAAABAAAAQAAABAAAAQABAAAAABQAAAAAAAAIgDADQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAQABAFABAAIABgBIADAFQACADAAACQABAAAAAAQABAAAAAAQAAAAAAAAQABgBAAAAIABgCQgEgEADgBIACAFIABAEIAAAAIABABIgBAAQAAAFABAAIACgCIACAEQABABAAABQAAAAAAABQAAAAAAABQgBAAAAABIABABIADACQgEACgDgDQgEgDgCAAQACAFAHAHIgFgCQAAABAAABQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAABQgBAAAAABIACAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAQABAAAAgBQABAAAAAAQAAgBAAAAQAAAAgBgBQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABABAAAAQABAAAAABQABAAAAAAQABAAAAgBQAAAFgFADQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAIACgCIAGAHQgCABABAEQACAEgBACQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBIgBgEIACABQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAIgDAAQAAAAABAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAgBIgEgBIgFgBIAAAEQAHABgDAGIgBgDQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIADAHIgCgDQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBABIABADQAAABAAAAQAAAAABABQAAAAAAAAQABAAAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAgBIADgBIABACIADADIgCABQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABgBQgCACADADQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIABACIgEADQAAAAgBAAQAAABgBAAQAAAAgBgBQAAAAgBgBIADAAQAAgBAAgBQAAAAgBAAQAAgBgBAAQAAAAgBABQgDAFgDABQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAIACgCQAAgBgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAIgDACQgBAGgCAAQAFADAFgDIALAIIAAAEQABAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAIgEgDQgBADAGACQAAABgBAAQAAABAAAAQgBABAAAAQABAAAAABQADgBADAEQABADgCACQAAABAAAAQAAAAAAABQAAAAAAABQAAAAABABIACgCQAAAEgCAHIAEABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAAAQABABAAAAQAAAAAAABQABAAAAAAQAAABgBAAIgEgBIABADQgEgCAAAEQgHgFABAFQAEgCAAAFQAAAAgBgBQAAAAAAAAQgBAAAAABQAAAAgBAAIgBADQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIABgCIACADQAAAAgBAAQAAAAAAAAQAAAAAAABQgBAAAAAAIAAACQAIACACgCIgDAAIADgEQACADgBAFIgBAKIgDABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAABABQABAAAAAAQABAAAAABQABAAAAAAQAAgBABAAIgCADQgBAAAAABQAAAAAAABQAAAAAAABQABAAAAAAIgCABQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgCADIAFAEQADABABACQABABABAAQABAAAAgBQABAAAAAAQAAgBAAgBIgEgCIADAAQAAAAABABQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAABQAAABAAAAQAAAAAAABQAAAAAAABIgDABIABACQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQgEABACgEQgBAAAAAAQgBAAgBAAQAAABAAAAQgBABAAAAIgCAEQAHAAABABQgBAAAAAAQAAAAgBABQAAAAAAABQAAAAAAABIgBADQABAAAAABQABAAAAAAQABAAAAgBQABAAAAAAIAAACIgCABQABAAAAAAQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAAAAgBABIgBACQAFABgCAEIgBAFIgCgCIgCACIABACIgCACIADABQgBABgFAAQgEAAgBACQABAAAAABQAAAAABABQAAAAABAAQABAAAAAAIAGABIgDACQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQABAAAAABQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQgBABAAAAQAAABgBAAIgDABQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABIgBADIgBgBQAAACADADQADACgFADQAAAAAAgBQAAAAAAAAQgBAAAAAAQgBAAAAAAIABADQAAAAAAABQABAAAAAAQAAAAABAAQAAAAABAAIgDABIgBACIgEgDIgCADIgDgBIADADIACAAIABgBIAAABIAAABIAEgBIgCADQAAAAAAAAQgBABAAAAQAAAAAAABQABAAAAAAIgCAAQgBAAAAABQAAAAAAABQAAAAAAABQAAABABABQAAABABAAQAAABAAABQAAAAAAAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQABAAABABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAABQAAAAAAABQAAAAAAAAQABABAAAAQABAAgBABQAAAAAAAAQAAABgBAAQgBABgBAAQAAABgBAAQAAABgBAAQAAABAAAAQAAAAAAABQgCADgFABIgHACIgBgDgAA0ARIACAAIADgBIAAADIgBABIgEgDg");
	this.shape_18.setTransform(237.9041,173.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F7D931").s().p("AjDAyIgCABIAAAAIgBABQACgDgCgCQAAABAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBIgGAEQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAAAAAAAIgCACIAAgBIgDABQAAAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAAAIgCADIABgEQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBAAQAAAAAAgBQABAAAAAAQAAgBgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAgBIgCAEQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAgBgBIABgBIAAgDIgBAAIgBgBIABADQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAIgBgDIgBABQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgBgBIAAgBQAAAAAAAAQAAAAgBAAQAAABAAAAQAAABAAABIgCgCIgEgBQACgFACAEIgBgDIgBgBQAAAAAAAAQABgBAAAAQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAABAAIAAgEQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIABABIgBABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIABABQACABABgFIABACIgBACIACAAQAAAAAAAAQgBABAAAAQAAAAABAAQAAABAAAAIABACQAAAAABgBQAAAAAAAAQAAgBAAgBQAAAAAAgBIADgCQABAAABAAQAAgBABABQAAAAAAAAQABABAAAAIAAgBIABgBIADAAQAAABABAAQAAABAAAAQAAAAAAAAQAAAAAAAAIACgCIABACIABgCIAAABIACgCIAAABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIgBgBIABAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBIABgBIAAAFQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQgBgBAAAAIABABIAAAAIACACIAAgBIABAAQAAABAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIABgDQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAgBIAAgCIAAAAIgBgCQAAAAAAABQABAAAAAAQAAABABAAQAAABAAABIACgCIAAABIgCADQACgBgBAGIAEABIAAgDIABADIABAAIAAgCIgBgEIAAgDIABACIABACIABAAIAAgCIABAAIAAgDIABABIAAgDIAFACIABgBIABAEQAAgBABAAQAAAAAAAAQAAgBAAAAQABAAAAAAIABgDQAAABAAAAQABAAAAABQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABQABgBAAAAQABAAAAgBQAAAAABgBQAAAAAAgBIAAABIABAAQAAAAABAAQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAABgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAIgBgBIACADQAAgBABAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIADABIAAABIACgBIgCgEQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIABgDIAAAAQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAABgBQAAgBAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIACgBQABAAAAAAQAAAAABABQAAAAAAAAQAAAAAAABIABACIABACQAAAAABAAQAAAAAAgBQAAAAAAgBQAAgBAAgBIABAFIADAAIgBgCIABABIABAAIACABIABgCQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAABIgBAAIACABQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAIAAADIACgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAgBgBIADAAIAAAAIAAAAIADABQAAABgBAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIABACIABgEQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAAAIACAAIAAgBIADgBIgBABQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAABABAAIACgBIABABIgBACQACAAACgDIgBgCIAFgBIAAgCQgBgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBABQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAIADgBIACAEQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABIAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABABAAQAAABAAABQAAABAAAAQABAAAAAAQAAAAAAAAQAAgBABgBIgBgCQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAgBIABABIAAABIAAABQAAABAAAAQABABAAAAQABABAAAAQABAAAAAAIAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBABgBQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIgBgEIACgBIgBgCIACgBQgBACAAAGQAAAAAAAAQgBgBAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQAAAAABAAQAAAAAAABIgCgDIABgCIADAAIACgBIABABIABAAIABgCIAAACQAAAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAIAAgCIAAgBQAAgBAAAAQAAAAABAAQAAAAAAAAQAAAAAAABIgBABIADgBIAAACQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAABgBQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIAAgBIABACQABAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAgBQACACAEAAIACgBQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBgBgBIgBABQAAABAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIABgCQACABACgEQACgFACABIAAACQABAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAgBIAGgBQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAABAAIABABIAAgCQABAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAIACgCIABAEQADgDABgCIATgGQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIAAACIAGAAIgBgCIADABQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAIADgBIgCABIAAACQAAABABAAQAAAAAAgBQABAAAAAAQAAgBABgBIAAACQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAAAgBQABAAAAAAIgCgCQABAAAAAAQABAAAAAAQABAAABAAQAAAAABAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAAAAAIAAABIABgBIABACIABABIAAgDQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAIAFgCIAFgDIACAEIAAgBIAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIgBgCQABAAAAgBQAAAAAAAAQABAAAAAAQAAABAAAAIABABIABAAIAAgDQAFAAAHgDIAGACQACAAAEgDIADAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAABAAAAIABgCIABABQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIAAgCIAGgBIAAAAIABgBIAAACQADgDAFAAQAHAAACgCQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQACgCADADQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAEgBALgBQALgBAEgCIANgBQAHAAADACIgBgCQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAABgBIgBAAIAIgBQAFgBADACIAAgBQABgBAEADQABAAAAAAQABABAAAAQABAAAAgBQABAAABAAIgBABIAAABQADgBAFACQAGAEACAAIgBADIADgBQAAAAAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQABAAAAAAQAAABAAAAQAAABABAAQAAAAAAAAQABAAAAAAIABgBIABAAIgBABIAEgBIABADQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAIACgCIAAACIABgBIACADQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBABAAQgBABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIACABIgBAAIABACQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIAAAAQAAABAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBIABgDIACACIgBgDIABAAIABAAIgBABIABADQAAABABAAQAAABAAAAQAAAAAAABQAAAAABAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAgBAAIgBAAIgBAFQgIAOgmAIIglAEIgBgBQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAgBAAIgCACIgCAAIAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIgBACIgDgBIgDACQgMABgDADQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAgBAAIgDABIgBgBIgBACIgCgCIAAABQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgBgBIgHAGIABgCQAAABgBAAQAAAAAAAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQgBABAAAAQgDADgKgCIgBACIADABIgEAAIAAgBQgCAAgHAEQgCgBgIABQgGAAgDgBIAAAEIgCgEIAAAEIgCgCQAAABAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIgCgBIgBABQAAgBgBAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIABACIgCABQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBAAIABAAIgBAAIgCABIABADQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAABgBIgCAAIAAADIABAAIgGAAIAAgBQAAAAgBABQAAABAAAAQAAABgBAAQAAAAAAABIgBgDIgBABIAAAAIgBACQgBgBAAAAQgBgBAAAAQAAAAgBABQAAAAAAAAIABABIgBAAIgCABIAAgCQgEAAgFADIAAgBQAAAAAAABQgBAAAAAAQgBABAAAAQgBABAAABIgMABIAAACIgBgCQgBABgFgCIgFAAIAAABQAAABgBAAQAAAAAAAAQAAAAgBgBQAAAAAAgBIgGAEIgDgCQAAABAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABgBAAIABgBIgDACIAAgBIgBAAIgCABQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAIgCAEIAAgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIAAgBIgCABIAAgBIgCABIgCAAIAAAAIgHACIAAgBIgDACIABgBIgCAAIAAgBQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAIAAAAIgDgBQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAIABgCIgBAAIAAAAIgBgBIgBAAIAAABIAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAgBIgDADIAAgCQgBABAAABQAAAAAAAAQgBABAAAAQAAAAAAgBIABgBQgBAAAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgCAAIAAgCIAAAAIAAAAIgCABQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBIgFABIAAABQgBgBgFADQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAgBgBIgBACIgBACQAAAAAAAAQABgBAAAAQAAgBgBAAQAAAAAAgBIgBADIgBgCQgBACgGgCQgEgBgBADIABACIgDgBIgCgCIgBABIgBgBIAAADIAAgCIAAABIgBgCQAAABAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBAAAAABQAAAAgBAAIAAgBQAAABAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIgCAAIAAgCIgCABIAAABIgBgCIgCACIAAgBQAAAAAAAAQAAAAgBAAQAAAAgBABQAAAAgBABQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIgDABIAAgBQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIAAABQgDABABgDIgBAAIgBABIABACIgEAAIAAgCIgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBIAAABIgBABQAAgBAAABIgCgBIgCABIgCACIgDgEIgDACIgCABIAAgCIgCABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAAAgBIAAACIgBgCQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAABAAAAIAAABIgCABQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgBABIAAgBQgBAAAAAAQAAAAAAABQgBAAABAAQAAAAAAABIgBgBIABACIgCgCgAjBAeIAAAAIAAAAgAAqgdIABAAIAAABIgBgBg");
	this.shape_19.setTransform(375.05,-37.13);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F7D931").s().p("AAAAAIABAAQAAAAAAAAQAAAAAAAAQgBABAAAAQAAAAAAAAIAAgBg");
	this.shape_20.setTransform(355.6,-34.375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F7D931").s().p("AkYBRQACABABgGQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAgBIgBgCIAEgCIAAAEQAAABAAABQABAAAAAAQAAAAABAAQAAAAABgBQACgFAAgCQgBAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAABQgBAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAEgEgBIABgCQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIgDgCIgDgCIABgDQAAABgBAAQAAAAAAAAQAAABgBAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAIADgGIgBABQABgFADABQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAAAIAEABQgDgDAEgDIABAFIACAEIACgCIADgCQAAAEAHAKQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAABAAQAAAAAAgBQAAAAAAgBIgCgCQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQADgBAAgEIACgGIgCgEQAAABABAAQAAAAAAAAQAAAAAAAAQABgBAAAAIABgCQgBgBgBAAQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABQAAAAAAABIACADIgGAAQgEgBgCABQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIgDAEIAAAAIAAAEQAAABAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQgBgBABgEQACgFgCgCQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAAAAAIAAgHIAAAAIAAAAIgCgCQAAAAAAAAQgBAAAAAAQAAAAAAABQgBAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQABABABAAQAAAAAAgBQABAAAAAAQAAgBAAAAQABACAEACIAFgCIAAABIgCAAQAAABAAABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAABAAAAQABAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgCQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIACAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBQADAFAAAEQABABAAAAQAAgBAAAAQABAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQABAAAAAAIgCgCIABgEQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAIgBgEQABADAGABQABgGADAAIgBABQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAAAAAIAIgBIgCABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAAAIgBABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAEACAEgEIABAIIADgCQABAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAIgDAAQAAgFABAAIgGAAIAAgBQABAAAAAAQAAgBAAAAQAAAAABABQAAAAAAAAQAAgBABAAQAAAAgBgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAABgBIAEACQABAAABAAQAAABABgBQAAAAABAAQAAgBAAgBIADAGQACgBAJgBQgCAEABAHIACgCIgBAHIAGACQADACgBgFQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBgBgBIgDACIgCgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAABAAAAQAAABABAAQAAAAABAAQAAAAABgBIAEgBQgBACAEADIADgGIABADIADgIQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBIgDAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQgBAAgBAAQABAEgBABQgDgCgCADQgDAEgCgBQgBgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQACgBAGgHQADAFAEgCQAFgBADACQABAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQABADACABQABABAAAAQABAAAAAAQABAAAAAAQABgBAAAAIgCACIgBgBQAAAAgBABQAAAAAAAAQAAABgBABQAAABAAABQACgEADACIAAADIADgBQAAAAAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBIgBAAIADgCQgDgFACgBIAKgFIgCABQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQgCgGADgDQACACAJgFQABADgBAEIgBAGIAHADQABAAABgBQAAAAAAgBQABAAAAgBQAAgBgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAIgCACQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIgCgCIABgEQAAgBAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAIAEADQADgCgEgDQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAIAAACQABAAAAAAQAAAAABAAQAAAAABgBQAAgBABgBQAAAAABAAQAAgBABAAQAAAAABABQABAAAAAAQgEAAAAADIABACQABABAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAIAEADQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAFgCAAgDQAAAEAFgBQABgBAAgBQAAgBAAAAQAAgBgBAAQAAAAgBAAIADgDIgBgBIAEAAQAAABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQgBAAAAAAQABABAAAAIACgBQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAEgDgDgDQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQABgBAAAAQAAgBABAAQAAAAABAAQAAAAAAABQABAAAAABQABAAABAAQAAAAAAAAQABAAAAgBIAAABIACACQABgBAAAAQAAAAAAgBQAAAAgBAAQAAgBgBAAIAEgBIgDgEQACgBADACQAEADABAAQABgCAEgCQADgBADAAIgEABIgEABIAAAEQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQACgCAEgCQAFgBABgCQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAgBABQAAAAAAABQgBAAAAgBQAAAAgBAAQAAgBAAgBIAEgBQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBQAAABAAAAQAAAAAAAAQgBAAAAgBQAAAAAAAAIAAgCIACAAIABAFIACgCIACgCQAAABAAAAQAAABAAAAQAAAAAAABQABAAAAAAIADAAIgBgEQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAgBQAAABAAABQAAABAAAAQAAABABAAQAAAAABAAQAAABAAABQAAABAAAAQgBABAAAAQgBABAAAAQgBAAgBABQAAAAAAAAQgBAAAAABQAAAAAAAAIADgBQABAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABIABgDQABABAAABQABAAAAAAQABAAABAAQAAAAABAAIAFgCQAAAAAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAgBAAIACgDIACgBIABACQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBIABgBIABABIABgDQADACgEADQABABAAAAQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAABgBQAAAAAAAAQAAAAABAAIgBABIAAABQAAAAABAAQAAAAABgBQAAAAABAAQAAgBAAgBIADgDQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAABAAAAIgDABIgCgEQABABAAAAQABAAAAAAQAAAAAAAAQAAgBAAgBIgCgBIADAAQABABAAAAQABAAAAgBQAAAAABAAQAAAAAAgBIADAEQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAgBAAIgCACQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAAAABQAAAAAAAAQABABAAAAQAFgBAAgCIgBAAIAFgDIAFgDQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIgCgBQgEADgBgDIAFgBIAEgCIAAABIABgCIAAABQAFAAAAgBIgCgBIAEgDQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAIABgBIACgDQACADgDADQgDAEAAADQAFgCAHgIIAAgCIgBgCIADAAIABAAIgDAEIgCAFQABABABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAAAAAABQABAAAAAAQAAAAABAAQAAAAABAAIAAgCQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAIgBgCQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBABAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQABAAAAgBQAAAAAAgBQABAAAAgBQgBAAAAgBQAFAAADAFQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIgCgDIAHgGQABACAEgBQAEgBACABQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgEAAIABgBQgBABAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBIAAADQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAgBAAIgBAEIgBAFIAEAAQABgHAGADIgDABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAIAHgCIgDABQgBABAAAAQAAAAAAAAQAAABAAAAQAAAAABAAQAFABAAgEQAAAAABAAQAAgBAAAAQAAgBAAAAQgBgBAAgBIgBgDQABAAABgBQABAAAAAAQABgBAAAAQAAgBAAAAIACACQABAAAAAAQAAABAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQACABADgCQABgBABAAQAAAAABAAQAAAAABAAQAAAAABABIAAgCIACgBIADAEQAAABAAAAQABABAAAAQAAABgBAAQAAABgBAAIAAgCQgBAAAAAAQgBAAAAABQgBAAABABQAAAAAAABQAFADABACQAAABAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAIgCgCQgBAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABIACADIAEABQABABAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAEgFgEgGIAIgKIAEgBQAAAAABAAQAAAAABABQAAAAABAAQAAAAAAABIgEADQAEACACgHQABABAAABQABAAAAABQABAAAAAAQAAgBABAAQgBgEAEgDQADgBACACQABABAAAAQAAAAABAAQAAAAABAAQAAAAABgBIgCgCQAEgBAHACIABgDQAAAAAAABQABAAAAAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAAAAAQABAAAAAAIgBAEIADgBIAAADQAAAAABABQAAAAAAAAQAAAAABAAQAAAAAAAAQgFAHAFAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAgBABQAAAAAAAAQAAABAAAAQABAAAAAAIADABQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgCgBIADgCQAAABAAAAQAAAAABABQAAAAABAAQAAAAABAAQACgJgCgCIAAAEIgEgDQADgCAFABIAKAAIABADQAAABAAAAQABAAAAAAQAAAAABAAQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBAAAAQgBAAAAgBIADACQAAAAABABQAAAAABAAQAAAAABgBQAAAAAAgBIABADQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAAAIADACIAEgFQABgDACgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAgBAAIgCADIAAgCQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAgBQAAABABAAQAAAAABAAQAAAAABAAQAAAAABgBIABAEIAAAAQAAABAAAAQAAABAAAAQABABAAAAQABABAAAAIAEACQAAgHABgBQAAAAAAABQAAAAABAAQAAABABAAQAAAAABAAIADABQABgBAAAAQAAgBAAgBQAAAAgBgBQAAAAAAAAIACAAIABABQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAgBQAAABAAAAQAAAAABABQAAAAAAAAQAAAAABAAIACABQABgEAEACQAEABABgBQAAABAAAAQAAABgBAAQAAAAAAAAQAAABgBAAQABABAAAAQAAABABAAQAAAAABAAQAAAAABgBIAAAAIACACIAAgDQACABAAAFQAAABAAABQAAABAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAgBQAAgBAAgBIABgFIACADQAAgBAAAAQABgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIABACQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAIADAAIgBABQACABADgEQACgCADAEIgBABQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAFAAgBgEQAAAAABABQAAAAAAAAQAAABAAAAQAAABAAAAIACABIgDAEQAAAAABABQAAAAAAAAQABABAAAAQABAAAAAAIgBACIADgCIAAgDIgBgBIABABIABAAIgBgEIADACQAAAAAAABQABAAAAAAQAAAAABAAQAAgBAAAAIAAACQABACAEgCQABgBAAAAQABAAABAAQAAAAAAAAQABAAAAAAQAAABgBABQAAAAAAAAQAAABABAAQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAAAQABgBAAAAQABAAABAAQAAAAABABQABAAABAAQAAABABgBQAAAAAAAAQABgBAAgBQAAAAABAAQAAABAAAAQABAAAAABQABABAAAAQABABAAABQABABAAAAQABAAAAAAQAAAAABAAQADACABAFIACAHIgDABQAAAAAAABQgBAAAAAAQAAAAAAABQAAAAABAAIABAAQAAAEgDAAQgDgEgDgBQgDABgDgBIgGgBIAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBABAAAAQAAABgBAAQgBAAAAAAQgBgBAAAAIAAgBIgDAAIgEABIADgCQgUgCgXAKIABgBQgBABgBAAQAAABAAAAQgBAAAAAAQAAABAAAAIABAAIgEADQAAABAAABQgBAAAAABQAAAAAAABQAAAAABABQgBAAAAgBQAAAAgBAAQAAAAAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIAAgBQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBABQAAAAgBAAIgEADQAEgEgDgCQgBAGgIADQgIADgCAEIgCgCQgCACgGABIgJACIgIgBIAAgDQgBAFgFAAQgGABgBACIgKABQgFAAgDgDQABAAAAgBQABAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAABAAAAQABAAAAAAQAAAAABgBIgBgEQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAIgCgDIgDADQAAABgBAAQAAABgBAAQAAABAAAAQgBAAAAABIAAgBIgBABIgBgBIgDADIgDADIACgEIgCABIAAgBIgCAFQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBgBIAAgBIgCABIABgCQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAABgBAAQAAABAAAAQgBAAAAABQgBAAgBAAQAAABgBAAQgBAAAAAAQAAABgBAAQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAgBQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAgBAAIgCgCIgEADQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAABAAIACAAQgCADgHAEQgDgBgFABIgIABIAAgCQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAAAAAIgDACQgBgDgEAAQgDAAgCACQABAAAAABQAAAAAAABQAAAAAAAAQAAAAgBAAIgCgEIgBAEIgBAAIgCAAQAAABAAAAQgBAAAAABQAAAAAAAAQABABAAAAQgDAAgIAEIACgDQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAIAAABQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBIAAgCQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgFABIgEAEQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAgBQgBABAAAAQAAgBgBAAQAAAAAAAAQgBgBAAgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAABQAAAEACAAQABACgDADQgEAAgGAEQgHAEgCAAIABgBIgeALQgCgBAAgEIgCAEQgBABAAABQgBAAAAABQAAAAgBAAQgBAAAAAAQgDgDgDADQgEACgCgCQAAABAAAAQAAABgBAAQAAAAgBAAQgBAAgBAAIABgCQgFAAgFAFQgFAEgEAAIgDgDQgEAFgFAAIAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAgBQgBAEgDAAQgDAAgBADQgCgDgEACIADgGQABgEgEgBQABAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQABgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIgCgCIgCACQgBAAAAABQAAAAgBAAQAAABAAAAQgBAAAAgBIABgBIgDgBQgBAAAAAAQAAAAgBAAQAAABAAAAQAAABAAAAIABAEQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAIgBgDQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIgCACIACgEQABgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAAAIgEADQgBAAAAABQAAAAgBABQAAAAAAABQAAAAAAABQAAAAABAAQAAAAAAABQAAAAAAABQAAABAAAAIgBgBQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQADAEADgDQAEgDACACIgBAAIABAEIgDAEIAAgDIgEACQgBAAAAABQgBAAAAAAQAAABAAABQAAAAAAABIgBgCQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAABgBAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAFgCgBgFQgDABgEAFQgEAEgEgBIgBgCIgEAEQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAIAAAEQgBABgEAAIABgBIgCgBIgCgBIABACIACABQgBAEgDAAQgEgBgCABIAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIACgCIAAABIABgCQgFgDgCABIgCAFQABAAAAAAQABAAAAAAQABgBAAAAQAAgBAAgBQAAAFgDADQgCgCgHAAIABACQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQgHAAACAFIAAACQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIgDgCQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAAAQgCgDABgCQgCABgBAEQAAABAAABQAAABgBAAQAAABAAAAQgBAAAAAAIAAgBQgCACgEAAQgBAAgBABQgBAAAAAAQgBAAAAAAQgBAAAAAAIgBgEIgDABIABABIgDABIgDgCIAEgBQAAAAAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAIAEgBIADgBQgBgEgHACQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBgBQAAAAgBAAQAAAAgBABQAAAAAAAAQAAAAAAABQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQgFgBgCADQgDAGABAFQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAgBIACAAIAAgDIgCgCQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBgBQgDgCgCAAIAAAFIgBAAIAAgDQABgDAEgBIgCgCQABAAAAABQABAAAAAAQABAAAAgBQABAAAAgBQABAAAAAAQABgBABAAQAAAAAAAAQABAAAAAAQAGgCgEgGIgCADIgCADIgCgHQAAAAAAABQgBAAAAAAQgBAAAAgBQgBAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABQAAABAAAAIAFADQgDAHgGABQADgDAAgBIgHADIACAEQgCgCgDACQgEADgBAAIgDAFIAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIAAACQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAABgBQAAAAABAAQAAgBABAAQAAgBAAgBQAAAAAAgBQgBAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAgBIgEgCIgCAEQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAIAAAFIgBgBIgBADIgBgCQgBAAAAAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAgBAAQAAgBAAAAIACgDIAAgEQgDAIgDAAIACABIgDACIAAgBIgFAFQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAQAAgBAAAAQgBAAAAABQAAAAgBAAQABAAAAABQAAAAABAAQAAABAAAAQAAABgBAAIAAABQgCAAAAgHgAkYBRIgBAAIABAAIAAAAIAAAAgACuhTIABAAIgBAAgACvhTIABgCQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgBAAg");
	this.shape_21.setTransform(375.375,-41.8983);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F7D931").s().p("AApDoIgDABIgBABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAgBQAAAAAAAAIgEAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQgBAAAAAAIABgBIABACQAAAAABgBQAAAAAAAAQAAAAAAAAQAAAAAAAAIABgBQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAgBgBAAIgCgCIACAAIACAAIAAgBQAAAAAAAAQABABAAAAQAAAAAAgBQABAAAAAAIACgBQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBAAgBABIgCgFQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIgBAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQABAAAAAAQAAAAABAAQAAAAAAAAQAAgBgBAAIgCgBIACgBIgCAAIACgBIgDgBIABAAQAAgBAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBACIAAgBQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAgBgBAAIAFAAQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAAAgBIgDABIABgCIAAAAIACgCIgDABIACgBQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIAAAAIAAgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQAAAAAAAAQgBAAAAABIgDgBIgBAAIgBAAIgCACQABgBAAAAQAAgBABAAQAAAAABgBQAAAAABAAIgDgCIACAAIADABQAAAAAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABgBAAAAQAAgBAAAAQAAAAgBgBIgDAAIADAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAAAgBABQgBABgGgBIADgBIABAAQABgBgBgBQAAAAAAAAQAAgBgBAAQAAAAgBAAIAAAAIgDAAIACgBIgEgBIACgEIgBAAIAEgDIgCgBQAAAAgBAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQABAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAIACgBQAAgBgBAAQAAgBgBAAQAAAAgBgBQAAAAgBAAIABAAIAAgCQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQAAAAABAAQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBABgBAAQABgBAAAAQAAAAAAgBQABAAgBgBQAAAAAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAIgBAAIADgCQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIABgBIABgBIgBgBIgEACQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAIgDgCIAAABQAAAAAAgBQAAAAAAAAQgBgBAAAAQgBAAgBAAQAAgBgBAAQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAAAABgBQAAABABAAQAAAAAAAAQABAAAAgBQAAAAAAAAIACgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAIgDAAIAGgBIgBgCIgCAAIABgBIAAgCQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAgBIgCAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAIABAAIABgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQAAAAAAABQAAgBgBAAQAAAAAAAAQAAAAAAgBQgBAAAAAAIADAAIgBgDIgDAAIAAgCIAAAAIAAgBQABAAAAAAQAAAAAAgBQABAAAAAAQAAAAgBAAQABgBAAABIACAAIgEgCQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAgBAAAAQABgBgBAAQAAAAAAgBQgBAAgBAAIABAAIgBgCIABABIABAAIAAgDIACACIgBgDIgCgCIgCAAIgBgDIgCgBQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBIgBgBIAEgCIAAgDIABgBIgCAAQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAABgBQABAAAAAAQAAAAAAAAQAAAAAAAAQgBAAgBAAIgCAAIAAgBIAAgBIAAgBQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAABIAAAAIABAAQABAAABgBQAAAAAAAAQABgBAAgBQAAAAgBgBIABAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAgBgBAAIgCgBQABAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAIgEABIgBgBIgCAAIAAgCQABABAGAAQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQABAAAAgBQgBAAAAAAQAAAAAAgBQgBAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAIgDACIgCgCIAAgDIgBgBIABAAIAAgCIgCgBIACABQAAgBABAAQAAAAAAAAQAAgBgBAAQAAAAgBgBIgCACIgBgBQAAAAAAAAQgBAAAAAAQAAgBABAAQAAAAAAAAIABABIgBgEIACABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBgBIgBAAIABgBIgBAAIACgCQAAgBAAAAQAAAAAAAAQAAgBgBAAQAAAAgBAAIgCgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIABgCIgBgBIAAgCQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBAAgBAAIABACQABAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAABIgCgCQABgCgEgCQgFgCABgCIACAAQABgBAAAAQAAAAAAAAQAAAAgBAAQAAgBAAAAIgCAAIgBgGQADACAAgEIgCgBIABAAIgBgBIAEgBQgDgEgCAAIgGgTQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAIACAAIAAgGQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAABIABgEQgDADAAgEIABAAIACABQABAAAAgBQAAAAgBAAQAAgBAAAAQgBAAgBAAIACAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAAAIgCABQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQAAgBAAAAQAAgBAAgBQAAAAAAgBQgBAAAAgBIABABIgBgCIADAAIAAgCIgDABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIgCgFIgDgFIAEgCIgBgBIAAAAQABAAAAAAQAAAAgBgBQAAAAAAAAQgBAAgBAAIABABIgBABIAAgCQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIABAAIAAgBIgDAAQAAgFgDgHIABgEIABgCQAAgCgDgFIAAgCQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAIgCgBIABAAIAAgBIAAgBIgCAAIgBgFIAAAAIgBgCIACAAQgDgDAAgFIgBgIQAAgBABAAQAAgBAAAAQAAgBAAgBQgBAAAAgBQgCgDADgCQABAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAABIgCAAIgCgPIgDgQIgBgMQAAgHACgDIgCABQAAAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAIABAAIgCgDIgBABQgDgLADgFIgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAgBABgBQAAAAABgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIABAAIABAAQgBgDACgFQAEgFAAgDIADAAIgBgBIABAAIABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAgBIgCAAIAAgBIABAAIAAgDIACAAQABgBAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIgCgCIACAAIgBgBIADgBIAAABIABgBIABAAQABAAAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAIAAABQABgBAAAAQAAAAAAAAQAAgBgBAAQAAAAgBAAIgDgBIACgCIgDAAIAAgBIAAAAIABABIADgBIADgCIAAABIAAACIAFAAQAOAJAIAmQADATABASIgBABQAAAAAAABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAABgBABIAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAQABAAAAAAIACACIgCABIACADQAAAMAEAEQAAAAAAABQgBAAAAAAQAAABAAAAQgBABAAABIABADIgBAAIACAAIgCADIABAAIAAABQABAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAIAGAGIgCAAQABAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBABAAAAQAAABAAAAQAAAAAAAAQABAAAAABQADAEgCAIIACACIABgDIAAADIgBAAIAEAJQgBAEABAGQABAHgCADIAEAAIgEACIAEABIgCABQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQABAAAAAAIgBACIABACIgCAAQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIACAAIABABIgBACIAAABIgBAAIAAACIABABIADgBQgBAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAIAAABIADAAIAAgBIABAFIgBAAIgBACQAAAAABAAQAAAAABAAQAAAAABABQAAAAABABIgCABIABAAIgBAAIACABQgBABAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIABgBIAAABIABACIgCAAQAAADADAGIgBAAQAAAAABAAQAAABAAAAQABABAAAAQABABABAAIABAMIACAAIgCAAQABADgCADIAAAGIABAAQABAAAAAAQAAABAAAAQAAAAAAAAQgBABgBAAIAEAGIgBACIgBABQABAAABAAQAAAAAAABQABAAAAAAQAAAAgBAAIAAACQAAAAABABQAAAAAAAAQAAABAAAAQABAAAAABIgBAAQAAAAAAAAQAAABAAAAQAAABAAAAQABABAAAAIgBAAQAAABAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIAEABIAAABQAAABgBAAQAAAAAAABQAAAAAAAAQAAAAAAABIgBgBIABACIgBAAIABACIAAACIAAAAQACAEAAADIgBAAIACACIgBAAIAAABIgBABQABAAAAABQABAAAAAAQAAABgBAAQAAAAAAABIgBAEIgBgBIgBACIAAACQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAIgCAAIAAABIAAAAIgBABIAAAAIABAAIABAAQAAABAAAAQgBAAAAAAQAAAAAAAAQAAABAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAgBAAIADAEIgBAAQABAAAAAAQAAAAABABQAAAAAAAAQAAAAAAAAIgCAAQAAAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAIACAAQAAABAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAACIgCAAIABABIgBAAQAAAEABABIAAgBQgBADAEAEIgDgBIADACIgBABIACACIgCAAQACABgCAFQgBAFADABIADAAQAAAAgBAAQAAAAAAABQAAAAAAAAQgBABAAAAQABAAAAABQAAAAgBAAQAAAAAAABQgBAAAAAAIABAAIgCACIADAAIgCAAIABABIgCAAQABAAAAAAQABABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgBAAQABABAAAAQAAAAAAAAQABABAAAAQAAAAgBAAIAAAEIgCAAIABACIABgBIgCABIACABIgBAAIACAEQAAAAgBgBQAAAAAAAAQgBAAAAABQAAAAgBABIACADIgCAAQAAABABAAQAAABAAAAQAAAAABAAQAAgBABAAIgBABIABAAQAAAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBgBQAAABAAAAQAAAAAAABQABAAAAAAQAAABABAAIABgBIAAAEIgCAAIABAAIgBAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAQAAABgBAAIACAAIgBAAIABABQgBAAABABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAACQAAAAABAAQAAAAAAAAQAAABABAAQAAAAAAAAQgBACgDACQACABABAEQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBgBQAAABAAAAQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAIACAAIgCABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIABgBIABADQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAIABABIgBAAIACABIgBABIACAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAIABABIAAAAIABABIgCAAIgCABIABABQABAAAAAAQAAAAAAAAQABAAAAABQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAIAEAFQgBAAAAABQgBAAAAAAQAAAAAAAAQAAABAAAAIACACQAAAAAAAAQABgBAAAAQAAAAAAABQAAAAAAAAIgCABIABACQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBABIADABIgEAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIABACQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIABACIgBAAIAEABQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQAAgBgBAAQAAAAgBAAQgBAAgBAAQABAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAIADAAQAAAAAAABQAAAAgBAAQAAAAgBAAQgBAAgBAAIABABQAAABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAABAAQAAACgDADQgFgBAEgCg");
	this.shape_22.setTransform(176.2558,-173);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F7D931").s().p("AA6EgIABABQgFgBABgDQAAABAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIABgEQgDADgDgEIAFgBIAEgCIgCgCQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQADAAAEgCIAHgFQgBAAAAgBQgBAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAgBAAAAQAAAAgBAAQAAAAgBgBIgCADQAAgEgCgBIADABQAAAAABABQABAAAAAAQAAAAABAAQAAgBABAAQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAABABABQAAAAAAAAQABABAAAAQABAAAAAAIAFAAIgBABIADABIgCABQAAABAAAAQAAAAABABQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABgBAAQAAAAAAAAIgDgCQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIAFACQABABAAAAQABABAAAAQABABAAAAQAAABAAAAIACgCIACADIgCAAIAFAFQgBAAAAAAQgBAAAAABQAAAAgBAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAAAAAQABABAAAAIACgBIACgBQAAAFgHgCQAAgCgFgBQAAABAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgCgEIAFAAQAAAAABAAQAAAAAAgBQAAAAAAAAQgBgBAAgBQgFgCgCAAQAAABAAABQAAAAAAABQAAAAAAAAQAAABABAAIgBABQABABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAEABgBADQgBAAgBAAQAAAAAAAAQgBAAAAgBQAAAAABgBIgCADIgCADIgBgBIgCAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAIgBABIgFgDgAAnEUQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBAAAAgBQACAAACgEIgCgFQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIAAABQAGgBgCgFQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAIgCAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAAAgBgBQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgDAAIAAgCQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAgBAAIAJgDQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAgBgBAAQAAABgBAAQAAAAAAgBQgBAAAAAAQAAgBABAAIgCACIgEgBQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAIgEABQACgBACgGQgHgBABgEQAAABAAABQAAABABAAQAAAAAAAAQABAAAAAAIgBgIIABACQAAAAAAAAQAAABAAAAQAAAAAAAAQABAAAAgBQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAABgBIABABQABABAAAAQAAAAAAAAQAAAAAAgBQABAAAAAAQACgEgEgEIAIgBIgCgDQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBAAAAAAIAAADQgEABgBgCQgBAGABABQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBgBIACgEQAAgBAAAAQAAgBAAgBQAAAAgBgBQAAAAgBgBQAEAAACgCIgCgLQAEABAHAAIgCgCIAHABQgBgBADgEQADgEgGABQAAABgBgBQAAAAAAAAQAAAAgBgBQAAAAAAgBQAAgBAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAIABADQgCAFgCgDQABAAAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBIgCgEQACABADgEIgGgDIADgBIgHgDQgBABAAAAQAAABgBAAQAAAAgBAAQgBAAAAAAIAAADQAAABAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBgBAAAAQgBAAgBAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAABQAAAAgBABQAAAAAAABQAAAAABABIAGAAQgDADAEACQADADgBACQgBABAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAgCgIgGQAFgDgCgEQgBgFACgEQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAAAgBQgBAAAAAAQAIgDgEgEIACACIgBABQAAAAAAABQABAAAAAAQABABABAAQABAAABAAQgEgCACgDIADAAIgBgDQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAAAgBAAIAAAAIgBgCQgGADgBgCIgFgKIABABQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQgGAEgDgEQACgCgFgJQAEgBAEABIAFABIADgHIgCgCQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAADACACQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAIgCACIgEgBQgBABAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAIADgEQgCgCgDADQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBgBAAAAIgBgCQAAAAAAABQAAAAABAAQAAAAAAAAQABAAABAAQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAgBgBQgCgCACgDQAAAFADAAIACgBQABAAAAgBQAAAAABAAQAAAAAAABQAAAAABAAIACgEIgCgBQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAAAABQgDgFgCAAQADAAAAgFIgDgBQAAAAgBAAQAAAAAAABQAAAAAAAAQAAABAAAAIgDgDIAAABIgBgEQABAAAAABQAAAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABgBIgBgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQABgBAAAAQgDgDgDABQAAABAAAAQABAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAgBQAAAAABAAQAAgBAAgBQgBAAAAAAQAAAAAAAAQAAAAAAABQgBAAAAAAIgBAAIgBgDIgEADQgBgCACgDQADgEAAgBQgCgBgCgEQgBgDAAgDQABABAAAAQAAABAAAAQABABAAAAQAAAAAAABIABADIADAAQAAABABAAQAAgBAAAAQAAAAAAAAQABgBAAgBQgCgCgCgFQgBgEgCgBQAAAAgBABQAAAAAAAAQAAABAAAAQAAAAABABQAAAAABABQAAAAAAAAQgBABAAAAQgBAAgBAAIgBgEQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAgBQAAABAAgBQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAQABAAAAABQAAAAgBAAQAAAAAAAAQgBAAgBAAIAAgDIAFAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAgBIgDgCQABABAAAAQABAAAAgBQAAAAAAAAQABgBAAAAIAAgCIAAgBIAAABQgFABgCgCQABAAABAAQABAAAAAAQABAAAAgBQAAAAAAgBQABAAABAAQAAAAABAAQAAABABAAQAAABABAAQAAABAAABQABAAAAAAQAAAAABABQAAAAAAgBIgBgCQAAAAAAgBQAAAAAAAAQABAAAAAAQAAAAABAAIgDgBQABgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBIgCgFQAAAAAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQgBABAAAAQgBAAAAAAQAAABAAAAQAAAAAAABQgEgBAAgDIACgBQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAgBgBAAIgBAAIABgBIgDgBQACgDAEAEQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBIADABQgBAAAAgBQAAAAgBgBQAAAAgBAAQAAgBgBAAIgDgDQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAABAAIABADIgEACIABgCQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBABIAAgCQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAIAEgDQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAIACACQAAAAAAAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQgBgFgCAAIAAABIgDgFIgDgFQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAIgBACQABABAAABQABABAAAAQAAABgBAAQAAAAgBAAQgBgHgCgBIABAAIgCgCIABABQAAgFgBAAIgBACIgDgEQAAgBAAAAQAAgBAAgBQAAAAAAgBQABAAAAgBIgBgBIgDgCQAEgCADADQADADADAAQgBgDgEgDIgFgGIgCAAQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBIAAgBIAJAFQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAgBIgCAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQABAAAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgFAFgDQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBABAAAAIgDABIgGgHQACgBgBgEQgBgEABgCQAAAAABABQAAAAABAAQAAABAAAAQABAAAAABIAAADIgBAAIABACQAAABABAAQAAAAAAAAQAAABAAAAQgBAAAAAAIADAAQAAAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAABQAAAAgBAAQAAAAAAABQABACAIAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQABAAAAgBIABADQABABAAAAQAAAAABAAQAAAAAAAAQAAgBABAAIgDgHIABADQABABAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBIAAgDQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAABQgBAAgBAAIgDAAQgBAAAAgBQAAgBgBAAQAAgBAAAAQgBAAAAgBIACgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBIgCAAIgBABQACgCgDgDQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAAAABgBIgCAAIgBgCIAEgDQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABIgCAAQAAABAAAAQAAABAAAAQABAAAAAAQABAAABAAQADgFACgBQABAAAAABQAAAAgBAAQAAABgBAAQAAABgBAAQAAABAAAAQABABAAAAQAAAAABgBQAAAAABAAIADgCIABgEQAAAAABgBQAAAAAAAAQAAgBAAAAQABAAAAAAQgFgEgFAEIgLgIIgBgEQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABAAIADADQACgDgHgCQABgBABAAQAAAAAAgBQABAAAAgBQAAAAgBgBQgEABgDgEQgBgDACgCQABAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIgCABQgBgDACgHIgDgBQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAIAEABIgBgDIADAAQAAAAAAAAQABgBAAAAQAAAAAAAAQAAgBAAAAQAHADAAgDQgBABAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIgBgDQAAABAAAAQABAAAAAAQAAAAABAAQAAgBAAAAIABgDQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIgBACIgCgDQAAAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAIABgCQgIgCgDACIAEAAIgDAEQgCgDABgFIAAgKIADgBQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBgBgBIgDAAQAEgEgEgCQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAAAIABgDQgBgCgEgBQgDgCgBgCIgCAAQgBAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAIADACIgCgBQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAgBAAQAAAAABAAQAAgBAAAAQAAgBAAgBQgBAAAAgBQABAAAAAAQAAAAABAAQAAAAABgBQABAAAAgBIAAABQAFAAABgGQgGABgCgCQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBAAgBIABgDQgBAAgBAAQAAgBgBAAQAAAAgBABQAAAAAAAAIAAgCIABgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBAAQADAAABgEQgFgBACgEQABgEgBgBQABAAAAABQAAAAABAAQAAAAAAAAQABABAAAAIABgCIAAgCIAAAAIACgCIgDgBQABgBAFAAQABAAABAAQAAAAABAAQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAIgGgBIADgDQgBABAAAAQgBgBAAAAQAAAAgBAAQAAgBAAgBQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQABgBAAAAQAAAAABgBIADgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBIABgCIABAAQAAgCgDgDQgDgDAEgCIABABQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAgBIgBgDQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIADgBQAAAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAgBQABABAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAAAgBIACABIgCgDQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBABQAAgBAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIgEABIACgDQAAAAAAAAQABAAAAgBQAAAAgBAAQAAgBAAAAIACAAQACgBgCgEQgBAAAAgBQAAgBAAAAQAAgBAAAAQAAAAAAgBQABABAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABgBQAAgBAAAAQABgBAAAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQABgBABAAQAAAAABgBQAAAAAAgBQAAAAAAgBQACgCAFgCIAHgCIABADQAAAAABABQAAAAAAAAQAAAAABAAQAAAAAAgBIABgBQABAAAAABQABAAAAAAQABABAAAAQAAABAAAAQgEADgBADQACADgBADIgCAGIAAAAQgBAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQAAABABAAQAAABAAAAQAAABAAAAQgBAAAAABQgCAEACACIgCgCQgBAVAJAWIgBgBQABABAAABQAAAAABABQAAAAAAAAQAAAAABAAIAAgBIADAEQABAAAAABQABAAABAAQAAAAABAAQAAAAABgBQgBABAAAAQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgBAAIgCgBQAAABgBAAQAAABAAAAQAAABAAAAQABABAAAAIADAEQgEgEgCADQAGABADAIQADAIAEACIgCACQACACABAGIACAJIgBAIIgDAAQAFABAAAEQABAHACABQADAOgFAEQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBIAAgDIgEABQADABgFADIADADQABABAAAAQAAABABAAQAAAAABABQAAAAABAAIgBAAIABABIgBABIADADIADACIgEgBIABACIgBAAIAFACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAAIAAABQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAABQAAABABAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAgBAAQAAABAAAAQgBABAAAAQABABAAAAQAAABAAABQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAAAIgCACIABACIACACQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAgBIAAgCQAEACADAHQgCAFADALIgCAAQAAACADADQgDABAAAEQAAABAAAAQAAABABABQAAAAAAABQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIABAAIgDABIADACIAAABIAAACQABAAAAABQAAAAAAAAQABAAAAAAQAAAAABgBQgBADAEAIIgCgDQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAgBIABABQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBgBAAIgCAAQAAAAAAABQAAAAAAABQAAAAAAABQAAABABAAIAAAEIAEAFIgEgBQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABABAAQAEAAAAgCQACgBADADQAAAEAEAGQAEAGAAADIgBgBIALAeQgBACgEAAIAEACQABABABAAQAAABAAAAQABABAAAAQAAAAAAABQgDACADAEQACAEgCACQAAAAABAAQAAAAABABQAAAAAAABQAAABAAABIgCgBQAAAFAFAFQAEAFAAAEIgDADQAEAEABAFQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAgBIgCABQAEABAAADQAAADADABQgDACACAEIgGgDQgEgBgBAEQAAAAAAgBQAAAAgBAAQAAAAgBgBQAAAAgBAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAIgCACIACACQAAABABAAQAAABAAAAQAAAAAAABQAAAAAAAAIgBgBIgBADQAAAAAAABQAAAAAAAAQAAABABAAQAAAAABAAIAEgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAIgDABQAAAAAAABQgBAAABAAQAAAAAAABQAAAAABAAIgDgBQgBAAAAgBQgBAAAAAAQgBAAAAABQgBAAAAAAIADAEQAAABABAAQAAABABAAQAAAAABAAQABAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQABgBAAAAIADABQgBAAAAAAQAAAAAAAAQgBABAAAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAQAAAAABgBQADgDgDgDQgDgEACgCIAAABIAEgBIAEADIgCAAIABAEQAAABABAAQAAABABAAQAAAAABAAQAAAAABAAIgCABQAAABgBAAQAAAAAAAAQAAABAAAAQABAAAAABQAAAAABAAQAAgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAIgCgDQgBAAAAAAQgBgBAAAAQgBAAgBAAQAAAAgBAAQABADAFAFQAEAEAAADIgCABIADAEQAAAAAAABQAAAAgBAAQgBAAAAAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQABABAAAAQAAAAABAAQAAAAAAgBIAEAAQAAAAAAABQAAAAAAABQABAAAAABQAAABAAAAIgBAAIgBACIgBACIACgBIABgCQABABABAAQABAAAAABQABAAAAABQAAAAAAABQgBAEABACIAAAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAQAAABABAAQAAAAAAABQAAAAABAAQAAAAABAAQgBABAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIgCgCIABAAIgCgBIgBADIAAAEIAEABQAAAAAAAAQAAAAAAAAQAAgBAAAAQgBAAAAAAIgCgCQAFABADADQgCACAAAHIACgBQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQgBgBAAAAQgBAAAAAAQgBAAAAAAQABAGAEgBIACgBQABABAAAAQAAAAABgBQAAAAAAAAQABAAAAgBIgCADQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAABAAQgDACgCgBQABACAEABQABAAABAAQABABAAAAQABAAAAABQAAAAAAAAIgBAAQACACAAAEQAAABAAABQAAABABABQAAAAAAAAQAAABAAAAIgDABIAAACQAAABABAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIABADIgCACIAAgDQgBAAAAABQAAAAgBAAQAAAAAAAAQAAABAAAAQAAgFgCgCQgEABACAHQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABAAQgFADgCgFQgBAFADACQAHADAEgBQAAABAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAgBIgBgCIgDAAIgCACQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAIgCAEIgCgEIgCACQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgCgGgGAEIADACQAAAAABABQAAAAAAAAQABABAAAAQAAAAABAAIgHACQAAAAABABQAAAAAAAAQAAABAAABQgBAAAAABQgBAAAAABQAAAAAAABQABAAAAAAQAAAAABAAIADgFQAIADAAAGQgDgDgBAAIADAHIAEgCQgCACACADQADAEAAABIAFADIAAAAQAAABAAAAQAAABABAAQAAAAABAAQAAgBABAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBgBIgBgBIgDAAQABAAAAAAQAAAAAAABQAAAAAAABQAAAAAAAAIgDAEIgCAAQgCgDgDAAIgHgCIgEACQABAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAgBIgCgBIgBACQAAABgBAAQAAAAAAABQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAABAAIADgCIAAAGQgBAEABACQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAIAEADIAAAAIAEAAQABAAAAABQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAgBAAQgBAAAAAAQgBgBgBAAQgFgCgCACQAAABABAAQAAAAAAAAQABABAAAAQABAAAAgBQABAAAAABQAAAAABAAQAAAAAAAAQAAAAAAAAIgHAAIAAAAIAAAAIgCACQAAAAAAABQAAAAAAAAQAAAAAAABQABAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAgBgAAaDhIAAAAIAAAAg");
	this.shape_23.setTransform(171.525,-173.3464);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E99142").s().p("AAKgLQAIgEgHAHIgYAVQABgDAWgVg");
	this.shape_24.setTransform(130.369,-64.4977);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F7D931").s().p("AiMUfQgegIgbgKIhigrQgSgHgSgFIgUgCIgDASQgZgCgFgGQgDgJgEgFIgWgDIAJAPIgFAAIg1gLIgngJIgRgFIATAAQglgKgUgCQgdgEgCAJIgBgMIgCAAIhNgQIgQgDIgLgDQgygLghgLQhxgmhDg4QgqgigfgtQgcgogTgxIgZgSIAEgBQgSgigagkQgdglgNgTQgyhBgXhPIgNALIgRgwQgMghgFgRIgTgzIgKgZQgEgPgFgLIAIAHIgMgxIAEABQgFgJgFgkQgGgngIgVIAEABQADgZgDgTQgCgSgHgZIANgfQgMg3ALhRIAIhDQAEgmgEgWQARhrAjhoQAkhtAyhcIAYgwIAZgrQAdgxASgYQAkgxALgMQAVgZAagbIAygyIA4gyIBlhTIApggIAtglQAagWASgNIAqgfQAOgLAbgRIAogbIAngXIAngWQAWgNARgHIAngSIAogQQAvgPAlgKQAsgJAwgGQAlgDBBABIAXABQAWABAhAEQAhAFAeAIQAhAKARAMQAhAXgoAWQAEAEABAEIADgHIgCAIIAEgHIgBAFQAAgBAAAAQABgBAAAAQAAAAAAAAQABAAAAAAIAAACIACgBIABgCIAAACQAHgEAMgDQATgEAegCQASgBAuADQASABA4AKIAoAHIAnALQAdAIALAEIAmANIAlAPIBEAeICCBLIAXAPIBFA0IAjAdIAeAaIAdAaQABgCAMAGQAMAGADAGQCaBtBoDkIAVAxIAUAyIATAyIAzCUQAJAfAHASIARAvQAaBVAMBMIAGAtIAEAwIABBjQAAAVgDAcIgHAwQgBAMgIAjIgLAtQgHAbgVA2QgNAcgWAmQgHARgQAgIgWAwQgeA9gQAdIgZAsQgQAYgNARIggAoQgUAVgSAQIglARIgOAZQgHAKgSAPQAHgLgJADIgSAGIgWAhQgIgCgLAMQgGAIgOAVQgMAVgHAIQgLALgGgGIgWgFQkDCHjSBCQjlBJjQAAQgqAAgpgDgAgoRGIAnAFQAWgDgIgEIg1ACgAkAQ1IAYAAQAKgCACgGQgvgOgigRIgkgTIgIgBQiggViVhbQh7hJhkhvQgyg6gog+IgVgiIgTgjIgSgjIgPgjIgLgbIAHBOIADgCQAOA8AwA4IAUAaQAMAMAKANIAWAcIAWAfIgFgDQADALALAOQALAOAOALQAhAYAXAEQgLABAHAUIAEAMQAAAEgFABQASABAnAcQAWAOASAPQACAJANAKIAdASIAjASQANAHASAPIA/gBIgaAIQAVAHAEAJQADAHgMACQAIAFAKABIAYAEIgOAJQAMAHAMAAQAKAAAGgFQAFgEgBgFQgDgGgKgCQAdgFAOAEQAJADAIAIQAKAJAGACQANAFAYgDIASgQQAmAAAMATQAKASApgDgAkJOBIAcAFQAPADAOAAQAUACAWAAQgfgJgNgEIgRgGIgxAAIgWAAIgDAAIAkAJgAh3OIIAVgCIAFAAQADABAOgEIANgDIgJgCIABAAIAJACIAGgCIgBAAQgMgCgCACIgpgKIgvAFIAqAKQARAGg4gMIgPgEIgEAAgApCM/IgYgXIgTgDQAcASAPAIgAiuM4IALADIALgCIgCgCgABrMiIACABQAOgJARgPIgBgBgANtLyIgUAbIAEAAIAFgCQAIgQAKgMgAtoIqQAIAOATAYQAdAoAeAhIAHADQAWAMAeAMIgXgSQgggdgfgfQgtgtgggsIgEgFgAG2JDIgbAiIAAABIAngMIABAAIBLhTQgdAVgkAWIgOAIIgHAIIAAAAIgCABgAP6IfQgRAUgRASQgKALgMAKIgBACQBIgrA2g+QAfgjAXgoIACgKIAEgBQAXgsALgrIAEgnIgHgdQgGgdAEgVIgCgZQAAgOACgKQACgKAFgPQgGgTgJgUIABBYIgFAuQgKBDgRAvIgRAqQgOAdgEAGIgTAgIgUAeQgeAogWAYIgSAVIgCACIABgBQAFgDATgVIANgPgAvdB/QAEBNAZBLQAXBIAoBCQAnBCAxA2QARATASARQgSgjgOghQgSgvgQg3Qg3hYgahcQgNgcgLggIgVg2QgNhCgGgrQgJBDAFA8gAm+ICIADACIAcAPIgogfgAIPIGIAFgBQABAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAgAIWIBQAEADAEgFIAAgDgAQ6BXQgOBYghBTQADBIgOBPQAXgoAPgpIANgmIADgPIgDAVQAXhZgKhfIABAFIAEBDQAEg0gNg8gAg2GZIAHgCIgFgDIAAAAgAgwGTIAEADIACgBIgFgDgAn5ECQAMAWAXAeQALAQAPAQIANAHQgKgVgHgWQgNgPgIgOQAFAHACgCIABgCQgVgigIghIgDgQIgRgtIgEgPIgPAqIgBAEIACAGIgCgFQAIArARAfgAkDE1IATAFQAYAFAWABQACgbAEgaQgVgHgIgDQgSgGgQgIgAj6DxQASAJAZAJQANACgHgDIgrgSIgGgDgAg5CzIABAhIAAADIABgBIAQgTQABgbAFgagAL0CrIgEAZIAaAIQgBgegGgiIgKgZIgBgBgAjXBxQgNAfgJAjIAFADQAPAHAVAGIAVAFIADgLQAfh1BAhfIgLASQgEAHAFgHIAegsIAYgrIgGADIgiAWQghAagWAYIACgEQg4A4ghBOgADxBCQgFAQgFALQgTAsgdAgIAVgSIAJgVIAGgDQAEgBAEgEIAAAAIAIgiIACAHIAIgggAL2B7IABgMIgFgLQACAVACACgANOAWIgDgYIgEgGIAEAFIAAgBIgagfQAPAYAOAhgAyAgEIAGANIAMhWQgDAAABgLIgGAcQgDAKgGgNQgKAiAJAZgAHCg/QANAeALAgQAIgdADgeIgFgRIgYAMIABgBIgHADgAugisQgMAWgHASIgBANQAAAzAHA4QAFgrAHgoQAHgugJApIgJAtQAGgoAMgyIgFgegAnvhJIACAVIAWgvQAEgJATggQgUAXgIARIAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQgJAPgJAQgAgdhfIgOAYIARgZgASVhSQgGgcgFgSQgEgNgEgJQgGgLgFgGQABAAACgHQgHgOgLgmQgIgZgTgUIAHADQgZgegRgfIgXgnQgOgcgJgOQgZgrgbgpQAyBcAfBfQAUBAALBDQA1AvAoAvIAAAAgAPahuIgCgQIgGgFIAIAVgAmyh1IAWgcIABgBIAXgpIgRAWQgMASAEgHgAPTh4IgEgNIAAgCIgEgDgAxhibQgGAUgIALQAGgHADADIABgEIAFgZgAh1ktIgYAIQgZAMgUANQgwAggqA5QAdgXAggRIAlgjQAhgbAmgXIgKADgAvci/IAAgBIAFgJIADgSgAsDjmIgBAFIAMgNQAAgcAEgoIABgCQgJAhgHAqIACgCIABAAQABAAgEAFgArzkzQgCAKAAANIgBAsIAJhagALUj7QAQAAAWAFIgngfgAMRj/IgCgGIgIgDgABTkTIAKACIgEgDgAOsk0QgYhCgfg5QhDiAhwh5Qgvgzg5gxQAuArA2BDQA7BLAxBbQAjBCAbBGIARAOIgRgNIADAGIAZAVQAPALgagZIAzAuIAAAAgAqclWIgCAOIAMgPIAGgLgAqKmrIgLAwIgHAkIARgNIAFgJIAPgcIARgbIASgZIALgQgALGl+IAFAAIAAAAIgFgDgAGcmTIAlAVIgIgVIgHgGIgggZgAIUnMQARAQAQATQANAOAOASIANAIIANgBIgBgIIgKgrIgWgJIAWAIIAAgCIhdglgAmjmcIgGAOQATgJASgHIAngOgAGQmaIACACIAGADIgIgfIgLgHgAk/nYIgkASIBYgVIAZADIAdgDIgFAAQgUgCgUAAQggAAgdAFgAIBneQAjAMADAAIgqgQgAFHndIgBgBIAAgBIgDAAgAB9njQgZgEAYACIAPABQg3gcg2gLIgPgCIgQAIIAUAKIAfAQIAiACIgBABIgggDIAHAEQAXACACgDIAqAFIAAAAgApwn/IgBAEIAQgGQAtgVBCgXIAWgIIAngfQgRADgCgBQgBgBgKACQgYAGgZAJQgYALgVAMQgKAFgVAOIgbAUIAHgEIgEADIgBAAQAcgLAbgJIg+AagAHaovQAuAPAsAQIgNgJIgfgKQgtgOgEAAQAAAAgBAAQAAAAABAAQAAABABAAQABAAABABgAG5o+IBnAhQgqgbgrgUIgRgIIgRgCIANAUIADABIAiAJQgMgCgYgGgAG0o/IADABIgCgDIgDgBgAGxpDIADABIgNgUIgDgBgApWsoQgRAJgPAJQg9AxguAxQgaAfgaAkIghAvQAVgXAXgWQABABAJgIIAZgVIAhgZIA2g3IAegYIAqgcQAcgQAYgKIAegfQg4ANgoATgAODpbIgPgYIgRgRgAElptIAWgEIgUgVIgdgHIAbAggACCqgIBCARIgOgMIg3gGgANTqZQAEABAFgBQgNgHgSgTgALQslQAsApAqAwIgUgbQgTgZgSgRQgJgJgOgIIgFgDIgCgBIABABgAkasCQhaAHhAAUIgbAJIgNAEQBqgcCIgOIALgBgAByvyQAOACAtAJQByAiBaA6QA4AQAoAUQAVAKAUAMIgigXQh9hRiCgjQhAgShFgHgAgrx9QhPAKhKAXQhBAThLAfQBWgbBYgPQB/gUB7ALIABgBQgDgDAAgCIgCAFIAAgEQgBAFgDgCIAEgEQAAAAAAAAQAAgBgBABQAAAAAAAAQgBABgBABIACgDQgBAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAAAgBAAQAAgBAAABQgBAAAAAAIgBADQAAABAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQgBABAAAAIABgCIgCAAIACgFIABgBIgBAAQgCAIgDACIABgEQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBAAAAABQgBAAgBAAIgEACIACgJIgBACIAAgBQAAAAAAAAQAAAAAAAAQgBABAAABQgBABAAABIABgBIgBACIgBAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABgBIABgCIgBAAIgCAEQgCgCgGAAIgBgHQgBgBgFADQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAgBAAgBIgCADIABgCIgBABIAAgCIgCAEQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAgBQgBABAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBIABgDQgEAFgCgDQgDgEgBABQAAAAAAgBQgBgBAAAAQAAAAAAAAQgBAAAAAAQgDACABgHQgCAFABAAQgDAAgGgDQgFgDgDABIgBgBgAl1w4IAlgOIgTAHQAOgFACACQAGgBAsgPIAsgQIgEABQgWACgUAGIgVAGIgMAFIgUAJIAUgJIgUAJgAEHw8IAIACIgKgGIgBADIADAAIAAAAgAEExAIgBACIABAAIABgCIgBgBgADuxEIABABIABgEIgCADgADoxFIACAAIABgBIAAgEgADnxHIAAACIABAAIACgFIgBgBIgCAEgADMxNIgBABIACAAIABgCgADIxOIAAABIABABIACgGIgDAEgAC+xPIABABIgBgCgAC6xPIACAAIAAgCgAC4xQIACAAIAAAAIABgBIAAgDQAAACgDACgAC1xSIgBABIADABIAAgBIgBgBIgBAAgACoxTIACABIABgCIgBAAIgCABgACexXIgBACIABABIACgGgACVxWIAGABIACgDIABgEIgBgCIAAgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIgCADQABgBAAAAQAAgBAAgBQAAAAAAAAQAAAAAAAAIgEAHIgBAAgACMxXIAJABIAFgKQAAACABgBIABgDQAAAAAAAAQgBAAAAAAQAAAAgBABQAAABgBAAQAAABgBABQAAAAAAAAQAAAAAAAAQAAgBAAgBIgCAGIgDADIAAAAIgBgDQAAAAAAAAQAAAAgBAAQAAAAAAABQAAAAgBAAIABgBIgBgBIgCACIACgCQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAAAAAAAIgCABgACExYIAEAAIACABIABgCQAAAAAAgBQAAAAAAAAQgBAAAAAAQAAABAAAAIgCABIABgDIgCADIACgGQgCAAgDAGgAB+xZIAGABIAAgDQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAABgBAAQAAAAgBABQAAAAAAgBQAAAAAAgBIgDAFgAhpyHIgQAFIAJgCIA3gLIAlgFIAAgCIAAgBQgBABAAAAQAAAAAAAAQgBAAAAgBQgBAAAAgBIgEgJQgnAMgnAOg");
	this.shape_25.setTransform(206.825,-0.741);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sun, new cjs.Rectangle(-6.4,-202.4,410.9,404.9), null);


(lib.start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660100").s().p("AjUGnQhCgFghgXQgggWADgiQADgQAPgGQAQgGAVAAQAVAAATACQAfADAmgEQAmgDArgRQAqgSArgoQArgnAohHQAqhGAjhsQAjhtAbicQAFghANgaQANgZAUgNQAVgLAcAJQAcAKABAdQACAcgKAmQgKAlgIAmQgJApgRBBQgQBBgcBMQgcBNgpBLQgpBMg4A+Qg3A9hIAjQg9AchMAAIgbAAg");
	this.shape.setTransform(1827.379,504.7974);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#660100").s().p("AixFiQgjgFgMgHQgZgKgPgSQgPgSAAgTQAAgUATgRQATgQAWADQAVADAcAIQAbAIAmgBQBHgDAxgTQAxgSAbgbQAcgbAFgcQAFgcgQgUQgQgTgdgKQgegJglACQg2ACgSgNQgRgOAGgYQAEgZAWgLQAVgLAegBQAOgBAegNQAfgMAigUQAhgVAXgXQAYgYgBgWQgCgXgbgKQgZgLgngBQgngCgoAFQgnAEgeAKQg6ARgYgJQgZgKABgYQABgcAXgUQAZgTAmgNQAngMArgHQAtgHAqgCQA4gCAuAVQAtAWAYAnQAXAogIAzQgJApgWAgQgVAggaAWQgaAWgXAMQAfANATAbQAUAbAHAfQAIAfgDAXQgRBNguAwQguAvhAAYQhAAYhJAHQgfACgZAAQgaAAgSgDg");
	this.shape_1.setTransform(1811.3372,484.6435);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#660100").s().p("AkMFMQgRgEgFgdQgFgcALg0QAEgTAOgoQANgpAUg1QATg2AWg4IArhsQAVg0AQgkQAQgkAIgMQAUgcAXgKQAXgMAXAIQAQAGAGAZQAHAZgPAiIgVAxIglBXIguBrIgtBvQgVA1gPAoQgPApgEATQgIAigNAPQgOAPgQACIgLABQgJAAgIgCgABREZQgSgBgagMQgbgLgYgVQgagVgRghQgQggACgsQAFgzAZgpQAagoAjggQAkggAlgWQAlgWAdgNQAdgMAKgDQAZgHAXABQAXACAPATQAPAXgMAZQgLAagmAPQgXAHghAPQghAOggAVQghAVgWAcQgVAbgBAjQABAhASATQASAUAYAKIApATQATAHABALQgBAYgWAPQgTAOgdAAIgKgBg");
	this.shape_2.setTransform(1760.6592,490.117);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660100").s().p("AkiG3QgmgEgRgdQgRgdAFgsQAGgvAWgcQAWgbAcgNQAcgNAZgDQAMhGAXhVQAWhVAjhqQAxiVBQhHQBOhIBjgDQAlAAApAMQAoAMAdAYQAgAbAGAZQAGAagLALQgRANgTgDQgTgEgUgNIgrgYQgWgLgYgBQgygBgpAfQgpAfggA1QgfA0gZBAQgZBAgRA/QgSBCgMA4IgUBdQgPBLgWAsQgVAsgXAUQgXAUgWAGQgQAEgNAAIgLgBg");
	this.shape_3.setTransform(1714.6356,473.8026);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660100").s().p("AkDF2QgugagdguQgcgugBg/QABh2AvhoQAvhqBShTQBThTBqgwQBrgwB5gBQAmAAAeAEQAeAEARAMQASAMAAAYQgBAcgYAMQgXALghAAQhoAAhfAhQheAihKBAQhKBAgrBbQgrBagBBzQABAkAaAZQAZAYAlABQAogBAdgZQAdgZASgoQATgoAJgsQAIgjASgOQASgOASAAQAhACAOAcQAOAcgGApQgFAcgSAqQgTApghAqQggApgwAcQgvAdg9ABQg3gBgugYg");
	this.shape_4.setTransform(1668.125,478.5722);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660100").s().p("AhDCdQgWgJgBgaQgBgbANgkQALglAQgnQAQgoAKgkQALgkAVgRQAWgSAYAHQAhANAEAcQADAcgOAlIgPAsQgJAbgNAgQgOAggQAbQgQAbgUANQgMAJgOAAQgIAAgJgDg");
	this.shape_5.setTransform(1621.6563,478.7352);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660100").s().p("AiDEwQgPgHABgZQABgYALgjIASgxIAkhfQAWg6AXhDQAYhEAUhHQAQg9AXgdQAWgeAnAKQAdAIAGAgQAFAggQAzQgMAogUA0QgUA1gXA3QgYA5gXAzIgoBZQgSAlgJAOQgVAhgSAHQgIACgIAAQgLAAgKgEg");
	this.shape_6.setTransform(1597.8327,487.427);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660100").s().p("AkiG3QgmgEgRgdQgRgdAFgsQAGgvAWgcQAWgbAcgNQAcgNAZgDQAMhGAXhVQAWhVAjhqQAxiVBQhHQBOhIBjgDQAlAAApAMQAoAMAdAYQAgAbAGAZQAGAagLALQgRANgTgDQgTgEgUgNIgrgYQgWgLgYgBQgygBgpAfQgpAfggA1QgfA0gZBAQgZBAgRA/QgSBCgMA4IgUBdQgPBLgWAsQgVAsgXAUQgXAUgWAGQgQAEgNAAIgLgBg");
	this.shape_7.setTransform(1592.8356,473.8026);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660100").s().p("AiSEtQgLgUAAgfQABgdAUgUQAUgUAegBQAkABARAUQARAUAAAdQAAAUgOAQQgNAQgUAJQgTAKgUAAQgggBgMgTgAhICBQgTgEgMgQQgNgQAEggQAGgkAXgaQAXgcAfgVQAegVAegSQAfgRAVgRQAVgQADgRQACgUgQgPQgQgPgagIQgbgJgbABQghABgVAPQgWAPgMAXQgNAVgHAVQgHASgTAJQgSAJgQgIQgQgHgLgQQgKgRAIghQAJghAcgjQAbgiAqgYQAqgYA0ABQA7ACAuAYQAuAYAaAjQAbAjAAAjQgBAvgUAcQgTAdgeATQgeATggARQgfAQgXAWQgXAWgGAjQgDASgMAJQgMAJgNADQgJACgGAAIgGgBg");
	this.shape_8.setTransform(1544.2099,485.0245);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgnB9IAAj5IBPAAIAAD5gAgUBYIARAAIgRALIAAAJIApAAIAAgJIgZAAIAQgLIAJAAIAAgJIgpAAgAgUBKIApAAIAAgdIgpAAgAgUAfIApAAIAAgdIgZAAIAAAOIAIAAIAAgFIAIAAIAAAMIgYAAIAAgVIgIAAgAgUgCIApAAIAAgaIgJAAIAAARIggAAgAgUgRIAYAAIAAgRIARAAIAAgIIgpAAIAAAIIAQAAIAAAKIgQAAgAgUgxIApAAIAAgIIgRAAIAAgSIgYAAgAgUhSIApAAIAAgIIgRAAIAAgJIARAAIAAgIIgpAAIAAAIIAQAAIAAAJIgQAAgAgMBCIAAgMIAYAAIAAAMgAgMg5IAAgJIAIAAIAAAJg");
	this.shape_9.setTransform(1770.275,729.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("EghUAUwQuWtzAArUQAAuuOWoJQOWoKUSiOQUTiOL9JaQL+JbB6PfQB7PduYImQuYInwdBtQwdBtqtkAIy7Leg");
	this.shape_10.setTransform(1669.1701,512.6699);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF66").s().p("EghUAUwQuWtzAArUQAAuuOWoJQOWoKUSiOQUTiOL9JaQL+JbB6PfQB7PduYImQuYInwdBtQwdBtqtkAIy7Leg");
	this.shape_11.setTransform(1669.1701,512.6699);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1272.6,269.3,833.8000000000002,486.8);


(lib.shoko2walkingshoe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#231F20").ss(0.5).p("AFTDcQAGgWgBgdQgBghgJhBQgKhHgFgkQgIg/gEgtQgGhGgEiNIgFgDQgIATggAPQglAPgOAIQgPgGgXgBIgNAAQgwADgwgHIgUgDQgZgCgPAFIgFACQgEABgCACQgMgKgSAJQgTAIgBAQQgCAMAGAJQAGAKALADQAIADAKgBQALgDAEgHIAAgBIADABQAQADAhgBQBHgBB1AYQAEAJALAAQALABAHgKQAKgOgJgPQgFgHgGgDIgEAAIgEAAIgBAAQgBAAAAAAIgBAAQgGgMgQgJQgDgDgLgEQADgCAogQQAagLAOgNQAGgGADgHQAACXANB6IAGAxQgCAHgJAHQgKAIgEAEQgWAQgQAHQgpARgnAEQhSAIhfgdQgggJg5gdQgcgPgPgIQgYgOgQgNQgngngVgSQglghgkABQAIg8AXhHQANgqAWg3QAKgaAGgUQAFAdAbATQAUANA3AWIBsAoQABABABgBQABAAAAgCQAAgCgBAAQhRgegogQQgkgPgFgCQgXgMgNgOQgPgRABgaIgHAEQgIAagRArQgTAygHAUQgbBRgHA/IgCAAQgDABAAADQABADADgBIgCAZQgCAjACAYQgRBIgFAzQgGBFALA4QAWBrBOA/QB9BmD6AEQA2ABAdgLQAogQAYgkQAagmAOgrQAPgugCgsgAD2kMQAHAAADAIQAHAOgHAJQgHAKgIgCQgEAAgDgDIAAAAQAEACADgBQAIAAADgKQAFgMgFgFQgCgCgHgDIgCgGgADSkjQAQAJAIAMQAIAOgHAOQgBgBgBAAQgCAAAAACIAAADIgBgEQAAgCgCAAQgDAAAAACIABAHQhtgchKACQglAAgOgDQgjgGASgXIABABQACABACgCQABgBgBgCIgBgBIADgCIABABQABADADgBQACgBgBgDIgBgDQARgKAnAFQA1AIAegBQAPAAAcAAQAYABARAJgAk3ibQApgBAwAxQAEADANAOQAKALAHAGQAOANAXAOQA0AeAiAPQAxAWAqAJQAzAKAkACQAvADAogJQAxgKAYgSQAPgJARgQQAHgGADgGIAFAnQgQAMgZAJQgLAEgiALQg3ARgkADQhbAGhQghQgjgOg0gfIhRgwQgZgPgKgOQgVgdgDgDQgKgKgWgFQgNgDgHAAIgGgBgAk6hGIgBgTQAAgVACgVIANAAQAjAFARAYQAEAFAHAMQAHAKAHAFQAOANATAKQAEACBRAxQAzAgAmANQBVAeBWgJQAhgEA5gSQAfgKAIgEQAXgIAOgLQAMBQAEAlQAHBAgNAjQgSAwguASQg9AYhkgWQhkgVhug9Qhvg8gvhGQgthDgHhagAELGYQghAhg4AHQggADhEgGQkIgWheiDQgyhFgGhiQgEhKAWhnQAHA2ATAqQAkBPBSA5QBZA9BjAlQBmAkBNAAQBhAAAkg8QAGgLAFgNQgDAvgRArQgXA9gbAbgAg9kfQAFgKAMgGQAOgHAIAGIgEAEQgIgDgJAFQgNAHADAQQACARAMADQALACAGgIIAGACQgLAPgWgMQgVgNAJgSg");
	this.shape.setTransform(3.6023,-13.2843,0.8212,0.8212);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#010202").s().p("ACLHDQj6gEh9hmQhOg/gWhrQgLg4AGhFQAFgyARhJQgCgYACgjIACgZQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBgBAAAAQAAgBAAgBQAAAAABgBQAAAAABAAQAAgBABAAIACAAQAHg/AbhRQAHgUATgyQARgrAIgaIAHgEQgBAaAPARQANAOAXAMIApARQAoAQBRAeQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAgBAAQAAgBAAAAIhsgoQg3gWgUgNQgbgTgFgdQgGAUgKAaQgWA3gNAqQgXBHgIA8QAkgBAlAhQAVASAnAnQAQANAYAOIArAXQA5AdAgAJQBfAdBSgIQAngEApgRQAQgHAWgQIAOgMQAJgHACgHIgGgxQgNh6AAiXQgDAHgGAGQgOANgaALIgrASIAOAHQAQAJAGAMIABAAIABAAIABAAIAEAAIAEAAQAGADAFAHQAJAPgKAOQgHAKgLgBQgLAAgEgJQh1gYhHABQghABgQgDIgDgBIAAABQgEAHgLADQgKABgIgDQgLgDgGgKQgGgJACgMQABgQATgIQASgJAMAKQACgCAEgBIAFgCQAPgFAZACIAUADQAwAHAwgDIANAAQAXABAPAGQAOgIAlgPQAggPAIgTIAFADQAECNAGBGQAEAtAIA/IAPBrQAJBBABAhQABAdgGAWQACAsgPAuQgOArgaAmQgYAkgoAQQgaAKgwAAIgJAAgAlQB7QAGBiAyBFQBeCDEIAWQBEAGAggDQA4gHAhghQAbgbAXg9QARgrADgvIgLAYQgkA8hhAAQhNAAhmgkQhjglhZg9QhSg5gkhPQgTgqgHg2QgWBnAEBKgAk7hbIABATQAHBaAtBDQAvBGBvA8QBuA9BkAVQBkAWA9gYQAugSASgwQANgjgHhAQgEglgMhQQgOALgXAIIgnAOQg5ASghAEQhWAJhVgeQgmgNgzggIhVgzQgTgKgOgNQgHgFgHgKIgLgRQgRgYgjgFIgNAAQgCAVAAAVgAk3idIgCAVIAGABQAHAAANADQAWAFAKAKIAYAgQAKAOAZAPIBRAwQA0AfAjAOQBQAhBbgGQAkgDA3gRIAtgPQAZgJAQgMIgFgnQgDAGgHAGQgRAQgPAJQgYASgxAKQgoAJgvgDQgkgCgzgKQgqgJgxgWQgigPg0geQgXgOgOgNIgRgRIgRgRQgwgwgoAAIgBAAgADqjqQADADAEAAQAIACAHgKQAHgJgHgOQgDgIgHAAIgFgBIACAGQAHADACACQAFAFgFAMQgDAKgIAAQgDABgEgCgADijtIgBgHQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAABIABAEIAAgDQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAIACABQAHgOgIgOQgIgMgQgJQgRgJgYgBIgrAAQgeABg1gIQgngFgRAKIABADQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBIgBgBIgDACIABABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBgBQgSAXAjAGQAOADAlAAIALAAQBHAABlAagAgskxQgMAGgFAKQgJASAVANQAWAMALgPIgGgCQgGAIgLgCQgMgDgCgRQgDgQANgHQAJgFAIADIAEgEQgEgDgFAAQgGAAgHAEg");
	this.shape_1.setTransform(3.6023,-13.102,0.8212,0.8212);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#030504").s().p("ACFBNIAAgCIAjgTQhHg3hEgFQgVgBghAHIgWAFQgPAFgEAHIAHADQAlARAbAeQABABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBgBQgggjg4gXIgngMIgBAAQgngKgRgIQgmgRgGgYQgBgEAAgMIAFgDQgCAUALAOQAMAOAXAJQALAGAdAIIALADIABAAIAigUQAUgMARgEQArgLA2AJQAtAIApAXQASAKAXAVIAPAQIAGAIQAdgMAFgPQACgGgBgIIADACQABAFgCAIQgCAIgKAIQgFAEgNAGIgGADIABAAIABAAIgBABIAAABIgDgCQgjAQgVAMgACqA4IARgJIgFgIQgRgSgYgRQgjgYg5gNQgwgJgsAHQgUADgUALIgkAVQAhAKAQAGQACgGALgFIARgEQAkgKATAAIABAAQBPAABLBBg");
	this.shape_2.setTransform(6.136,-45.2676,0.8212,0.8212);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#010202").s().p("AgfBUQgjgOg0ghIhRguQgZgQgKgOIgYggQgKgKgWgFQgNgDgHAAIgGAAIACgWQApAAAwAwIARASIARARQAOANAXANQA0AdAiAQQAxAWAqAJQAzAKAkADQAvADAogJQAxgLAYgRQAPgLARgQQAHgGADgFIAFAnQgQAMgZAKIgtAOQg3ASgkACIgeACQhLAAhCgcg");
	this.shape_3.setTransform(3.8725,-16.9326,0.8212,0.8212);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#010202").s().p("AB+AmIgMAAQgRgCgZgJQgbgKgOgEQgZgIgcgBQgYgCgfAEQggADgMgDQgGgBgEgDQgGAKgMgFQgNgEABgRQACgNAJgJQALgJAJALIADgBQgLgOgPANQgPANACAQQADAQAPAGQAQAGAKgOIABgBIABACQgKATgTgIQgRgHgFgSQgFgVAVgPQAVgPANATIALgDQATgDAcADIAuAIQATACA8AEQAtACAVANIAJAGIARgBQAKABAEAGQAJAPgGASQgGAPgPABIgCAAQgNAAgJgLgACFAlQAHAHAIAAQALABAHgOQAEgKgFgOQgCgHgIgCIgPgBIADADQAOgBADAHQAEAJgEALQgFALgHADQgIADgFgHgAB8AiQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAABABAAQAAAAAAAAIACACIADgBQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAIABAAQAFgDAFgKIgBgBQgKgagmgJQgOgDgygCQgbAAgygIIgmgFQgXgCgPAFQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgFADIgBAAIgBABQgLAHAGAKQAGAKANABQALACAbgDQA1gFAgAGQASAEAYAIIAoAOQAXAHAMAAIAAAAg");
	this.shape_4.setTransform(11.7735,-27.8452,0.8212,0.8212);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag7AMQglAAgPgDQgjgHASgVIABAAQABABAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIgBgBIADgCIABACQAAAAAAABQABAAAAAAQABABAAgBQABAAABAAQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIgBgDQASgLAnAGQA1AHAdAAIArgBQAYABARAKQAQAJAIAKQAIAOgHAOIgCgBQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABAAAAIAAADIgBgEQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIABAHQhtgbhJACg");
	this.shape_5.setTransform(12.098,-35.7163,0.8212,0.8212);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#010202").s().p("Ag/AiIAAgFIAAAAQAVgLAjgQIACACIABgBIAAgBIgBAAIAAgBIAFgBQANgGAFgEQAJgIADgJQACgHgBgFIAiAXQgJASgfAQQglAPgOAHQgPgFgWgBg");
	this.shape_6.setTransform(22.3296,-41.3873,0.8212,0.8212);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#010202").s().p("ABSBKQABAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAgBAAIh4guIgogRQgYgLgMgOQgPgRABgaIAbgOQAAALABAFQAGAXAmARQARAIAnALIAAAAIAnAMQA4AWAhAjIABABIAAABQgZgCgQAFIgFACg");
	this.shape_7.setTransform(-4.2192,-45.0418,0.8212,0.8212);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#010202").s().p("ABPAwIgqgKQgUgFghgEIg2gHQgggFgOgHIgJgFQgIAKgLgGQgKgFgDgLQgEgOALgKQAIgHARAHIACgBQgDgMgRADQgQACgCAZQgCAVATAKQAIAEAKgEIAFgCQABAAABgBQAAAAAAgBQAAAAAAAAQAAgBAAAAIACgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQgBABAAAAQgEAJgKABQgJACgKgFQgLgFgEgNQgDgJABgNQABgLAHgHQAIgIAKgBQAIgBAHAEQAHAEABAHIAJgCQATgEAZADIArAIIApAJQAQADAmgBIAigBQAVABAJAMIACACQAKgEAJAHQAJAHgBALQgBATgMAHQgHAEgIgBQgKAAgGgFIgCACQgMAGgQAAIgOgBgAh1gdIgDABIgJAEQgLAHAKALQAHAHAMAGQALAFAZAEIBTAMIApAJQAZAGAQABQAVABAPgKQAKgHAFgKIgBgCQgDgSgKgGQgGgFgLAAIgTAAIgmACQgWAAgQgDQgtgLgYgEQgUgDgQAAQgQAAgLADgAB/AmQAKAHANgFQAJgEAEgRQABgJgHgIQgHgHgJADIACADQAJgBAEAJQAFAKgFAHQgLAUgPgJg");
	this.shape_8.setTransform(10.3663,-19.633,0.8212,0.8212);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCA0D").s().p("AgHDXQghgJg4geIgrgXQgZgOgQgNQgmgngVgSQglghgkABQAIg7AXhHQANgqAWg3QAJgaAHgUQAEAdAcATQATANA3AWIBsAoQABAAAAAAQAAABAAAAQABAAAAgBQAAAAABAAIABACQgEABgCACQgMgKgSAJQgTAIgCAQQgBAMAGAJQAFAKAMADQAIADAKgBQAKgDAEgHIABgBIADABQAQADAhgBQBHgBB0AYQAFAJALAAQAKABAIgKQAKgOgJgPQgFgHgGgDIgFAAIgDAAIgBAAIgBAAIgBAAQgGgMgQgJIgOgHIArgSQAagLAOgNQAGgGADgHQAACXANB5IAGAxQgCAHgJAHIgPAMQgVARgQAHQgqARgmAEQgTABgTAAQhCAAhJgWgAAKCPIA2AIQAhAEAUAFIArAJQAZAEARgJIACgBQAGAFAKAAQAIAAAHgEQAMgHABgSQABgLgJgIQgKgIgJAFIgCgDQgKgMgUgBIgjACQglABgRgDIgpgJIgrgIQgYgDgTADIgJACQgCgHgHgEQgGgDgIABQgKABgIAHQgHAIgBAKQgBANADALQAEANAKAFQAKAEAKgBQAKgCAEgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIAAAAQAPAGAfAFgAD4BHQAPgBAFgPQAGgSgIgPQgFgHgKgBIgRAAIgIgGQgVgMgtgCQg8gDgUgDIgugHQgcgEgSAEIgLADQgOgTgUAOQgVAPAFAUQAFATARAHQATAIAKgSIgBgCQAMADAfgEQAfgDAYABQAcACAaAHQANAEAcALQAYAJASABIAMABQAJAMAPgBg");
	this.shape_9.setTransform(3.7287,-29.5852,0.8212,0.8212);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFCA0D").s().p("AgaAmIgUgDIAAgBQAAABAAAAQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQgcgeglgRIgIgDQAEgHAPgEIAXgGQAhgIAWACQBDAFBGA2IgjATIAAACIAAAEIgNAAIgcABQgiAAghgFg");
	this.shape_10.setTransform(10.2986,-42.1009,0.8212,0.8212);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#060807").s().p("AgRgRQgUAAgkAKIgRAFQgMAEgCAGQgQgHghgJIAkgVQAVgLATgDQAtgIAvAKQA5AMAkAaQAYAPARATIAFAIIgRAIQhMhAhOAAg");
	this.shape_11.setTransform(8.8819,-44.6028,0.8212,0.8212);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABVAdIgpgOQgYgIgRgEQgggGg1AFQgbADgMgCQgNgCgFgJQgHgKAMgHIABgBIAAAAIAGgDQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABgBQAPgFAWACIAnAFQAyAIAbAAQAyACAOADQAmAJAJAaIABABQgEAKgGADIAAAAQgBgBAAAAQgBAAAAABQgBAAAAAAQAAABAAABIgEABIgBgCQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQgMAAgXgHg");
	this.shape_12.setTransform(12.1115,-27.9821,0.8212,0.8212);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("ABXAmQgQgBgZgGIgogJIhUgMQgZgEgKgFQgNgEgHgIQgKgLAMgHIAJgFIACAAQAWgHApAGQAYAEAuALQAQADAVAAIAmgBIATgBQAMABAGAEQAKAHADASIAAABQgFALgKAGQgNAKgSAAIgFgBg");
	this.shape_13.setTransform(10.5593,-19.1912,0.8212,0.8212);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFCA0D").s().p("ABfDTQhkgWhug9Qhvg8gwhFQgthDgGhaIgBgUQAAgVABgVIANABQAkAFAQAXIAMARQAHAKAGAGQAPANASAKIBVA0QA0AfAlAOQBWAeBVgKQAigEA4gSIAogNQAWgJAPgKQALBPAEAlQAHBAgNAjQgRAwgvARQggANgrAAQgmAAgvgKg");
	this.shape_14.setTransform(4.589,-5.9858,0.8212,0.8212);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ABOD3QkHgWhfiDQgyhFgFhhQgFhKAXhoQAGA3ATAqQAkBPBTA5QBYA8BkAlQBmAkBNAAQBgAAAlg8IAKgYQgDAvgQArQgYA9gbAbQggAhg4AHQgMABgRAAQgdAAgrgEg");
	this.shape_15.setTransform(3.5794,3.0025,0.8212,0.8212);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko2walkingshoe, new cjs.Rectangle(-25.6,-51.5,58.5,77.9), null);


(lib.shoko1walkingshoe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#231F20").ss(0.5).p("AFTDcQAGgWgBgdQgBghgJhBQgKhHgFgkQgIg/gEgtQgGhGgEiNIgFgDQgIATggAPQglAPgOAIQgPgGgXgBIgNAAQgwADgwgHIgUgDQgZgCgPAFIgFACQgEABgCACQgMgKgSAJQgTAIgBAQQgCAMAGAJQAGAKALADQAIADAKgBQALgDAEgHIAAgBIADABQAQADAhgBQBHgBB1AYQAEAJALAAQALABAHgKQAKgOgJgPQgFgHgGgDIgEAAIgEAAIgBAAQgBAAAAAAIgBAAQgGgMgQgJQgDgDgLgEQADgCAogQQAagLAOgNQAGgGADgHQAACXANB6IAGAxQgCAHgJAHQgKAIgEAEQgWAQgQAHQgpARgnAEQhSAIhfgdQgggJg5gdQgcgPgPgIQgYgOgQgNQgngngVgSQglghgkABQAIg8AXhHQANgqAWg3QAKgaAGgUQAFAdAbATQAUANA3AWIBsAoQABABABgBQABAAAAgCQAAgCgBAAQhRgegogQQgkgPgFgCQgXgMgNgOQgPgRABgaIgHAEQgIAagRArQgTAygHAUQgbBRgHA/IgCAAQgDABAAADQABADADgBIgCAZQgCAjACAYQgRBIgFAzQgGBFALA4QAWBrBOA/QB9BmD6AEQA2ABAdgLQAogQAYgkQAagmAOgrQAPgugCgsgAD2kMQAHAAADAIQAHAOgHAJQgHAKgIgCQgEAAgDgDIAAAAQAEACADgBQAIAAADgKQAFgMgFgFQgCgCgHgDIgCgGgADSkjQAQAJAIAMQAIAOgHAOQgBgBgBAAQgCAAAAACIAAADIgBgEQAAgCgCAAQgDAAAAACIABAHQhtgchKACQglAAgOgDQgjgGASgXIABABQACABACgCQABgBgBgCIgBgBIADgCIABABQABADADgBQACgBgBgDIgBgDQARgKAnAFQA1AIAegBQAPAAAcAAQAYABARAJgAk3ibQApgBAwAxQAEADANAOQAKALAHAGQAOANAXAOQA0AeAiAPQAxAWAqAJQAzAKAkACQAvADAogJQAxgKAYgSQAPgJARgQQAHgGADgGIAFAnQgQAMgZAJQgLAEgiALQg3ARgkADQhbAGhQghQgjgOg0gfIhRgwQgZgPgKgOQgVgdgDgDQgKgKgWgFQgNgDgHAAIgGgBgAg9kfQAFgKAMgGQAOgHAIAGIgEAEQgIgDgJAFQgNAHADAQQACARAMADQALACAGgIIAGACQgLAPgWgMQgVgNAJgSgAk6hGIgBgTQAAgVACgVIANAAQAjAFARAYQAEAFAHAMQAHAKAHAFQAOANATAKQAEACBRAxQAzAgAmANQBVAeBWgJQAhgEA5gSQAfgKAIgEQAXgIAOgLQAMBQAEAlQAHBAgNAjQgSAwguASQg9AYhkgWQhkgVhug9Qhvg8gvhGQgthDgHhagAELGYQghAhg4AHQggADhEgGQkIgWheiDQgyhFgGhiQgEhKAWhnQAHA2ATAqQAkBPBSA5QBZA9BjAlQBmAkBNAAQBhAAAkg8QAGgLAFgNQgDAvgRArQgXA9gbAbg");
	this.shape.setTransform(-10.8347,13.6572);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#010202").s().p("ACLHDQj6gEh9hmQhOg/gWhrQgLg4AGhFQAFgyARhJQgCgYACgjIACgZQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBgBAAAAQAAgBAAgBQAAAAABgBQAAAAABAAQAAgBABAAIACAAQAHg/AbhRIAahGQARgrAIgaIAHgEQgBAaAPARQANAOAXAMIApARIB5AuQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAgBAAQAAgBAAAAIhsgoQg3gWgUgNQgbgTgFgdQgGAUgKAaQgWA3gNAqQgXBHgIA8QAkgBAlAhQAVASAnAnQAQANAYAOIArAXQA5AdAgAJQBfAdBSgIQAngEApgRQAQgHAWgQIAOgMQAJgHACgHIgGgxQgNh6AAiXQgDAHgGAGQgOANgaALIgrASIAOAHQAQAJAGAMIABAAIABAAIABAAIAEAAIAEAAQAGADAFAHQAJAPgKAOQgHAKgLgBQgLAAgEgJQh1gYhHABQghABgQgDIgDgBIAAABQgEAHgLADQgKABgIgDQgLgDgGgKQgGgJACgMQABgQATgIQASgJAMAKQACgCAEgBIAFgCQAPgFAZACIAUADQAwAHAwgDIANAAQAXABAPAGQAOgIAlgPQAggPAIgTIAFADQAECNAGBGQAEAtAIA/IAPBrQAJBBABAhQABAdgGAWQACAsgPAuQgOArgaAmQgYAkgoAQQgaAKgwAAIgJAAgAlQB7QAGBiAyBFQBeCDEIAWQBEAGAggDQA4gHAhghQAbgbAXg9QARgrADgvIgLAYQgkA8hhAAQhNAAhmgkQhjglhZg9QhSg5gkhPQgTgqgHg2QgWBnAEBKgAk7hbIABATQAHBaAtBDQAvBGBvA8QBuA9BkAVQBkAWA9gYQAugSASgwQANgjgHhAQgEglgMhQQgOALgXAIIgnAOQg5ASghAEQhWAJhVgeQgmgNgzggIhVgzQgTgKgOgNQgHgFgHgKIgLgRQgRgYgjgFIgNAAQgCAVAAAVgAk3idIgCAVIAGABQAHAAANADQAWAFAKAKIAYAgQAKAOAZAPIBRAwQA0AfAjAOQBQAhBbgGQAkgDA3gRIAtgPQAZgJAQgMIgFgnQgDAGgHAGQgRAQgPAJQgYASgxAKQgoAJgvgDQgkgCgzgKQgqgJgxgWQgigPg0geQgXgOgOgNIgRgRIgRgRQgwgwgoAAIgBAAgADqjqQADADAEAAQAIACAHgKQAHgJgHgOQgDgIgHAAIgFgBIACAGQAHADACACQAFAFgFAMQgDAKgIAAQgDABgEgCgADijtIgBgHQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAABIABAEIAAgDQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAIACABQAHgOgIgOQgIgMgQgJQgRgJgYgBIgrAAQgeABg1gIQgngFgRAKIABADQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBIgBgBIgDACIABABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBgBQgSAXAjAGQAOADAlAAIALAAQBHAABlAagAgskxQgMAGgFAKQgJASAVANQAWAMALgPIgGgCQgGAIgLgCQgMgDgCgRQgDgQANgHQAJgFAIADIAEgEQgEgDgFAAQgGAAgHAEg");
	this.shape_1.setTransform(-10.8347,13.8792);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#030504").s().p("ACFBNIAAgCIAjgTQhHg3hEgFQgVgBghAHIgWAFQgPAFgEAHIAHADQAlARAbAeQABABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBgBQgggjg4gXIgngMIgBAAQgngKgRgIQgmgRgGgYQgBgEAAgMIAFgDQgCAUALAOQAMAOAXAJQALAGAdAIIALADIABAAIAigUQAUgMARgEQArgLA2AJQAtAIApAXQASAKAXAVIAPAQIAGAIQAdgMAFgPQACgGgBgIIADACQABAFgCAIQgCAIgKAIQgFAEgNAGIgGADIABAAIABAAIgBABIAAABIgDgCQgjAQgVAMgACqA4IARgJIgFgIQgRgSgYgRQgjgYg5gNQgwgJgsAHQgUADgUALIgkAVQAhAKAQAGQACgGALgFIARgEQAkgKATAAIABAAQBPAABLBBg");
	this.shape_2.setTransform(-7.7687,-25.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#010202").s().p("AgfBUQgjgOg0ghIhRguQgZgQgKgOIgYggQgKgKgWgFQgNgDgHAAIgGAAIACgWQApAAAwAwIARASIARARQAOANAXANQA0AdAiAQQAxAWAqAJQAzAKAkADQAvADAogJQAxgLAYgRQAPgLARgQQAHgGADgFIAFAnQgQAMgZAKIgtAOQg3ASgkACIgeACQhLAAhCgcg");
	this.shape_3.setTransform(-10.525,9.2032);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#010202").s().p("AB+AmIgMAAQgRgCgZgJQgbgKgOgEQgZgIgcgBQgYgCgfAEQggADgMgDQgGgBgEgDQgGAKgMgFQgNgEABgRQACgNAJgJQALgJAJALIADgBQgLgOgPANQgPANACAQQADAQAPAGQAQAGAKgOIABgBIABACQgKATgTgIQgRgHgFgSQgFgVAVgPQAVgPANATIALgDQATgDAcADIAuAIQATACA8AEQAtACAVANIAJAGIARgBQAKABAEAGQAJAPgGASQgGAPgPABIgCAAQgNAAgJgLgACFAlQAHAHAIAAQALABAHgOQAEgKgFgOQgCgHgIgCIgPgBIADADQAOgBADAHQAEAJgEALQgFALgHADQgIADgFgHgAB8AiQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAABABAAQAAAAAAAAIACACIADgBQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAIABAAQAFgDAFgKIgBgBQgKgagmgJQgOgDgygCQgbAAgygIIgmgFQgXgCgPAFQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgFADIgBAAIgBABQgLAHAGAKQAGAKANABQALACAbgDQA1gFAgAGQASAEAYAIIAoAOQAXAHAMAAIAAAAg");
	this.shape_4.setTransform(-0.904,-4.085);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag7AMQglAAgPgDQgjgHASgVIABAAQABABAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIgBgBIADgCIABACQAAAAAAABQABAAAAAAQABABAAgBQABAAABAAQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIgBgDQASgLAnAGQA1AHAdAAIArgBQAYABARAKQAQAJAIAKQAIAOgHAOIgCgBQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABAAAAIAAADIgBgEQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIABAHQhtgbhJACg");
	this.shape_5.setTransform(-0.5088,-13.6695);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#010202").s().p("Ag/AiIAAgFIAAAAQAVgLAjgQIACACIABgBIAAgBIgBAAIAAgBIAFgBQANgGAFgEQAJgIADgJQACgHgBgFIAiAXQgJASgfAQQglAPgOAHQgPgFgWgBg");
	this.shape_6.setTransform(11.95,-20.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#010202").s().p("ABSBKQABAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAgBAAIh4guIgogRQgYgLgMgOQgPgRABgaIAbgOQAAALABAFQAGAXAmARQARAIAnALIAAAAIAnAMQA4AWAhAjIABABIAAABQgZgCgQAFIgFACg");
	this.shape_7.setTransform(-20.3781,-25.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#010202").s().p("ABPAwIgqgKQgUgFghgEIg2gHQgggFgOgHIgJgFQgIAKgLgGQgKgFgDgLQgEgOALgKQAIgHARAHIACgBQgDgMgRADQgQACgCAZQgCAVATAKQAIAEAKgEIAFgCQABAAABgBQAAAAAAgBQAAAAAAAAQAAgBAAAAIACgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQgBABAAAAQgEAJgKABQgJACgKgFQgLgFgEgNQgDgJABgNQABgLAHgHQAIgIAKgBQAIgBAHAEQAHAEABAHIAJgCQATgEAZADIArAIIApAJQAQADAmgBIAigBQAVABAJAMIACACQAKgEAJAHQAJAHgBALQgBATgMAHQgHAEgIgBQgKAAgGgFIgCACQgMAGgQAAIgOgBgAh1gdIgDABIgJAEQgLAHAKALQAHAHAMAGQALAFAZAEIBTAMIApAJQAZAGAQABQAVABAPgKQAKgHAFgKIgBgCQgDgSgKgGQgGgFgLAAIgTAAIgmACQgWAAgQgDQgtgLgYgEQgUgDgQAAQgQAAgLADgAB/AmQAKAHANgFQAJgEAEgRQABgJgHgIQgHgHgJADIACADQAJgBAEAJQAFAKgFAHQgLAUgPgJg");
	this.shape_8.setTransform(-2.6175,5.9149);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A4DEF4").s().p("AgHDXQghgJg4geIgrgXQgZgOgQgNQgmgngVgSQglghgkABQAIg7AXhHQANgqAWg3QAJgaAHgUQAEAdAcATQATANA3AWIBsAoQABAAAAAAQAAABAAAAQABAAAAgBQAAAAABAAIABACQgEABgCACQgMgKgSAJQgTAIgCAQQgBAMAGAJQAFAKAMADQAIADAKgBQAKgDAEgHIABgBIADABQAQADAhgBQBHgBB0AYQAFAJALAAQAKABAIgKQAKgOgJgPQgFgHgGgDIgFAAIgDAAIgBAAIgBAAIgBAAQgGgMgQgJIgOgHIArgSQAagLAOgNQAGgGADgHQAACXANB5IAGAxQgCAHgJAHIgPAMQgVARgQAHQgqARgmAEQgTABgTAAQhCAAhJgWgAAKCPIA2AIQAhAEAUAFIArAJQAZAEARgJIACgBQAGAFAKAAQAIAAAHgEQAMgHABgSQABgLgJgIQgKgIgJAFIgCgDQgKgMgUgBIgjACQglABgRgDIgpgJIgrgIQgYgDgTADIgJACQgCgHgHgEQgGgDgIABQgKABgIAHQgHAIgBAKQgBANADALQAEANAKAFQAKAEAKgBQAKgCAEgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIAAAAQAPAGAfAFgAD4BHQAPgBAFgPQAGgSgIgPQgFgHgKgBIgRAAIgIgGQgVgMgtgCQg8gDgUgDIgugHQgcgEgSAEIgLADQgOgTgUAOQgVAPAFAUQAFATARAHQATAIAKgSIgBgCQAMADAfgEQAfgDAYABQAcACAaAHQANAEAcALQAYAJASABIAMABQAJAMAPgBg");
	this.shape_9.setTransform(-10.7,-6.2037);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0085BC").s().p("AgaAmIgUgDIAAgBQAAABAAAAQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQgcgeglgRIgIgDQAEgHAPgEIAXgGQAhgIAWACQBDAFBGA2IgjATIAAACIAAAEIgNAAIgcABQgiAAghgFg");
	this.shape_10.setTransform(-2.7,-21.444);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#060807").s().p("AgRgRQgUAAgkAKIgRAFQgMAEgCAGQgQgHghgJIAkgVQAVgLATgDQAtgIAvAKQA5AMAkAaQAYAPARATIAFAIIgRAIQhMhAhOAAg");
	this.shape_11.setTransform(-4.425,-24.4904);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABVAdIgpgOQgYgIgRgEQgggGg1AFQgbADgMgCQgNgCgFgJQgHgKAMgHIABgBIAAAAIAGgDQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABgBQAPgFAWACIAnAFQAyAIAbAAQAyACAOADQAmAJAJAaIABABQgEAKgGADIAAAAQgBgBAAAAQgBAAAAABQgBAAAAAAQAAABAAABIgEABIgBgCQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQgMAAgXgHg");
	this.shape_12.setTransform(-0.4924,-4.2517);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("ABXAmQgQgBgZgGIgogJIhUgMQgZgEgKgFQgNgEgHgIQgKgLAMgHIAJgFIACAAQAWgHApAGQAYAEAuALQAQADAVAAIAmgBIATgBQAMABAGAEQAKAHADASIAAABQgFALgKAGQgNAKgSAAIgFgBg");
	this.shape_13.setTransform(-2.3826,6.4529);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0085BC").s().p("ABfDTQhkgWhug9Qhvg8gwhFQgthDgGhaIgBgUQAAgVABgVIANABQAkAFAQAXIAMARQAHAKAGAGQAPANASAKIBVA0QA0AfAlAOQBWAeBVgKQAigEA4gSIAogNQAWgJAPgKQALBPAEAlQAHBAgNAjQgRAwgvARQggANgrAAQgmAAgvgKg");
	this.shape_14.setTransform(-9.6525,22.533);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ABOD3QkHgWhfiDQgyhFgFhhQgFhKAXhoQAGA3ATAqQAkBPBTA5QBYA8BkAlQBmAkBNAAQBgAAAlg8IAKgYQgDAvgQArQgYA9gbAbQggAhg4AHQgMABgRAAQgdAAgrgEg");
	this.shape_15.setTransform(-10.8625,33.4895);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko1walkingshoe, new cjs.Rectangle(-46.2,-32.9,70.80000000000001,94.3), null);


(lib.shoko1shoes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#010202").s().p("AhnAkIgBgCQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAngJBNgQIAogJQAWgHAOgMQAGgGAEgJIAFADQgJARgVAKQgVAKg0ALIhnAWg");
	this.shape.setTransform(77.85,-19.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#231F20").ss(0.5).p("AFGhvIgCgBQAAg9gRhQQgEgTgIgiQgLgngDgOIgFgEIAGAaQAQA+AHAjQANBFABA6QghgGgmAZQgpAggUANQgRAKgYAJQgcAKgOAFQgyASglAFQhaAMhMgUQgigIgngWQgPgKgRgTQgIgIgEgFQgHgIgCgHIALgtQAZhuAQiQQACAIAFAFQALAOAXAOQAlAXABABIgOAEQgOAGgIALIgCAAIAAgBIgIgBQgHACgFAGQgKANAJAPQAFAJAKACQAKABAFgIQBygFA+AMQAfAGAQAAIADAAIAAAAQADAIAJADQAJAEAIgCQALgCAHgIQAGgIAAgLQAAgPgQgLQgRgLgMAIIgJgHQgMgGgWgCIgWgBQgtAAgtgKIgIgCQgUgDgTADQgjgVgRgMQgegXABgZIgEACIABAKQgTCIgNBBQgIAqgOA6QgJAhgRBBQgPA8gEAfQgDAbACAVQgGApAKAtQAIArAUAoQATAlAjAVQAaAQAyAGQDpAjB/hOQBPgwAfhgQARgyABhDQABgwgIhGQAEgcACgdIAAgXQADABABgDQABgCgDgBgAi6kEQgHAAgHgKQgFgJAIgMQADgHAHAAIAFAAIgDAGQgGABgDACQgEADACANQACAKAIACQADAAADgBIAAAAQgCACgEAAgAhIk2QAdAFAvABQAmABAQAMIgCADQgCACADACQACABACgCIABgCIACADIgBAAQgBACABACQABACACgBIABgBQAXAkhagQQhEgNhoAJQACgDAAgDQAAgCgCgBQgCAAgBACIgBAEIAAgDQAAgCgBAAQgCgBgBABQgFgOAKgMQAIgKAQgGQARgGAWADQANABAbAGgABkkNQAHATgVAIQgVAJgKgQIAGgBQAFAJAKgBQANgBADgPQADgQgLgIQgGgGgJABIgDgDQAIgFAMAIQALAIADAKgAE/hXIgGAAQgKgBgJABQgVABgKAIQgEADgWAXQgMANgYAKQgbAJgNAGIgoAQQg3AYgeAHQhOAShUgTQgjgJgwgXQgggQgIgEQgXgNgNgOQAIgiABgCQACAGAGAHQARAUAKAJQAUATAtATQAkANAsAEQAiADAwgCQAogBAwgOQAhgJA0gUQATgIASgLQADgCAggZQAxgnAnAHgAE7gtIgCARIgBABIAAABQgPBTgxA4QgzA6huAoQhrAohgAGQhgAFg1ggQgqgYgLgvQgIgjANg7QADgOAXhdQANAMAUAMQACABAhARQAzAZAeAJQBRAWBQgQQAlgHAzgVQBNghAHgCQAWgJALgIQAHgEAHgJQAFgEAIgKQARgTAiAAQADAAAKACQgBAOgDAZgADzE1QhmBtj2gTQhBgGgdgIQgzgOgbgkQgWgegQg9QgKgrACgsQACANAFALQAbA9BaAPQBHAMBjgTQBhgTBYgsQBUgqAohEQAXgmALgwQAKBkgLBFQgQBbg2A6g");
	this.shape_1.setTransform(61.738,14.0932);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#010202").s().p("AijGLQgygHgagPQgjgVgTglQgUgogIgrQgKgtAGgpQgCgVADgcQAEgeAPg8IAahjQAOg6AIgqQANhBATiIIgBgKIAEgBQgBAZAeAWQARANAjAVQATgEAUAEIAIABQAtAKAtABIAWAAQAWACAMAHIAJAGQAMgIARAMQAQAKAAAPQAAALgGAJQgHAIgLACQgIABgJgDQgJgEgDgHIAAgBIgDAAQgQABgfgGQg+gMhyAFQgFAIgKgCQgKgBgFgKQgJgPAKgNQAFgFAHgCIAIABIAAAAIACAAQAIgLAOgFIAOgFIgmgXQgXgOgLgPQgFgFgCgIQgQCRgZBtIgLAtQACAHAHAJIAMANQARATAPAJQAnAXAiAJQBMATBagNQAlgFAygRIAqgPQAYgKARgKQAUgMApghQAmgYAhAGQgBg7gNhFQgHgjgQg+IgGgaIAFAEIAOA2IAMA1QARBQAAA9IACAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAgBAAQAAAAgBAAIAAAXQgCAdgEAbQAIBGgBAxQgBBCgRAyQgfBhhPAwQhYA1iKAAQg+AAhIgKgAk7DzQAQA8AWAeQAbAkAzAPQAdAIBBAFQD2AUBmhuQA2g5AQhcQALhFgKhkQgLAwgXAmQgoBFhUAqQhYAshhATQhjAThHgMQhagPgbg+QgFgLgCgNQgCAsAKAsgAk5A/QgNA8AIAjQALAvAqAYQA1AfBggFQBggFBrgoQBugoAzg7QAxg4APhTIAAAAIABgBIACgRIAEgoIgNgBQgiAAgRATIgNAOQgHAIgHAFQgLAIgWAIIhUAjQgzAWglAHQhQAPhRgWQgegIgzgZIgjgTQgUgLgNgMIgaBqgAkdgwQANANAXANIAoAVQAwAXAjAIQBUAUBOgTQAegGA3gYIAogRIAogPQAYgKAMgMIAagaQAKgJAVgBQAJgBAKABIAGABIAAgUQgngIgxAnIgjAbQgSAMgTAHQg0AVghAKQgwAMgoACQgwACgigDQgsgFgkgNQgtgTgUgSQgKgKgRgUQgGgHgCgGIgJAlgAA3j7QAKARAVgJQAVgJgHgSQgDgKgLgIQgMgJgIAFIADAEQAJgBAGAFQALAIgDAQQgDAQgNAAQgKABgFgJgAAAkGQBaARgXgkIgBAAQAAAAgBAAQAAABgBgBQAAAAAAAAQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAAAIABgBIgCgCIgBABQgBABAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBIACgCQgQgNgmgBQgvgBgdgFQgbgFgNgCQgWgCgRAGQgQAGgIAKQgKAMAFAOQAAgBABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAAAQAAABAAAAIAAADIABgEQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAEgCADQAsgEAlAAQA0AAAnAHgAjFklQgIAMAFAKQAHAKAHAAQAEAAACgCIAAgBQgDACgDgBQgIgCgCgJQgCgNAEgEQADgCAGgBIADgFIgFAAQgHAAgDAGg");
	this.shape_2.setTransform(61.738,14.2314);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhmDLQhBgFgdgIQgzgPgbgkQgWgegQg8QgKgsACgrQACANAFALQAbA9BaAPQBHAMBjgTQBhgTBYgrQBUgqAohFQAXgmALgxQAKBlgLBFQgQBbg2A5QhXBdi+AAQgiAAglgDg");
	this.shape_3.setTransform(61.4416,33.6474);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#010202").s().p("AB3AmQgJgDgDgJIABgCIABABIABABIAAAAQgDACAJAEQAIAFAJgDQASgGABgVQAAgWgOgFQgQgGgEALIACACIAAgBQASgDAGAIQAIAJgEAOQgEAKgLAEQgLADgFgLIgJAEIAAAAQgKADgjABIgzgBQgegBgTABQgjADgFAAQgZgBgOgKIgCgCQgGADgJgBQgIgBgGgEQgKgIABgRQAAgLAJgGQAKgGAIAGIACgCQAKgJATABIAgAHQAhAHARgBIAngCQAbgBAOAAQAXABASAGIAIAEQACgHAHgCQAGgCAIABQAJADAGAIQAGAIAAAJQAAAegUAHIgJABQgEAAgFgBgAh1geQgJAFgFARIgBABQAEALAIAHQANAMAUABQAPACAYgCIAmgCIBPABQAVAAANgDQAMgDAHgHQALgIgKgIIgIgFIgCgBQgUgKgnAAIghABIghACQgSAAg0gKIgRgDIgFgBQgIAAgFADgAiRgYQgIAGABAKQAAAOAJAFQALAHAKgEIgCgCQgPAFgIgSQgDgIAEgIQAGgJAIADIAAAAIACgDQgDgCgDAAQgFAAgEAEg");
	this.shape_4.setTransform(56.6205,4.9398);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#010202").s().p("ABwAYIABgBIABAAQAIAPAPgDQAPgEAEgPQAEgPgMgNQgNgPgMALIADACQAJgJAJALQAIAJAAAMQgBARgMACQgMACgEgKQgGACgEAAQgMACgdgJQg7gPgqAGIgnAHQgYAFgQgBIgMgCQgKAKgNgDQgOgDgEgPQgEgRAKgNQAFgGAJABIAQADIAJgFQATgIArAEQA+AHAMAAIAsAAQAbABARAGIAJAEQAPgQASASQASARgHASQgGARgRAEIgGAAQgOAAgGgPgAiZgUQgGAOADAJQAEAOAMAAQAHABAHgFIgCgBQgGAGgGgEQgHgFgDgKQgCgMAEgGQAEgHAMADIAEgDIgOgBQgIAAgDAHgABKAKQAaAHAJAAQAMAAAHgIQAHgJgKgIIgBAAIAAgBIgFgDQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAgBgBAAQgNgIgVgBIgkgBQg0gBgVgDQgvgGgNABQgkACgMAYIgBABQADAIAFAEIAAABQABgBABAAQAAAAABABQAAAAAAAAQAAABAAABIADABIACgBQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIABADQAMACAVgEIAngHQAXgDAQgBIAGAAQAeAAAsALg");
	this.shape_5.setTransform(56.0179,-4.8561);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AA3AaQhDgMhoAJQABgDAAgEQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAIgCAEIABgDQAAAAAAAAQgBgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAABAAAAQgFgOAJgLQAIgKAQgGQARgGAXACQANACAaAFQAdAFAwABQAmABAPANIgCACQAAABAAAAQgBAAABABQAAAAAAAAQAAABABAAQABABAAAAQABAAAAAAQABAAAAgBQABAAAAgBIABgBIACACIAAABQgBAAAAABQAAAAAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABABQAAAAABAAQAAAAABgBIABAAQAPAYglAAQgSAAgcgFg");
	this.shape_6.setTransform(56.1888,-14.6775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A4DEF4").s().p("AiqC8QgigJgngXQgQgJgQgTIgMgNQgIgJgCgHIALgtQAZhsAQiRQADAIAEAFQAMAPAXAOIAmAXIgOAFQgPAFgIALIgBAAIgBAAIgIgBQgHACgEAFQgKANAIAPQAFAKALABQAKACAFgIQBygFA+AMQAeAGAQgBIADAAIAAABQADAHAKAEQAIADAJgBQALgCAGgIQAHgJgBgLQAAgPgQgKQgQgMgMAIIgFgDIABgCIACABIBogWQAzgLAWgLQAUgKAKgRIAJAGIAHAaQAPA+AHAjQANBEACA7QgigGgmAYQgoAhgVAMQgQAKgYAKIgrAPQgxASgkAFQgjAFghAAQg1AAgugMgAAiB6QADAJAKADQAIADAKgDQAUgHAAgeQgBgKgFgIQgGgIgKgDQgHgBgGACQgIACgCAHIgIgEQgRgGgWgBQgOAAgbABIgoACQgRABghgHIgggHQgTgBgKAJIgCACQgJgGgJAGQgJAGgBALQgBASAKAIQAGAEAJABQAIABAGgDIADACQAOAKAYABQAGAAAigDQATgBAgABIAzABQAhgBAKgDgAAiAVIgBABQAIATASgEQARgEAGgRQAHgSgRgRQgSgSgPAQIgKgEQgRgGgZgBIgsAAQgNAAg+gHQgrgEgUAIIgIAFIgQgDQgKgBgEAGQgKANAEARQADAPAOADQANADAKgKIAMACQAQABAYgFIAogHQAqgFA8AOQAbAJAMgCg");
	this.shape_7.setTransform(63.875,-4.6596);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#030504").s().p("AgIA0QAdgYAjgLIAHgCQgCgGgOgHIgUgHQgdgNgVgCQg/gFhIAoIAfAXQAAABABAAQAAABAAAAQgBAAAAAAQAAAAgBAAIgxgiQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAAAAAIgBAAIAAgCIABAAIAAAAIgEgDQgYgPgCgOQgBgLAGgNIAEgBQgJAOADAKQAEAQAZAPIAHgGIAPgNQAVgPAVgJQAogPArAAQAxgBApARQAPAGARAOIAeAYIAAAAIALgCQAcgDALgDQAXgFALgLIAAgBIAFADQgMALgYAGQgSAFgkAEIgBAAQgYADgNADQg4ANggAcIgCAAQgBAAgBgBQAAAAAAAAQAAgBAAgBQAAAAABgBgAgJgWQASADAgAPIAPAGQAKAGACAGQALgDAkgFIgfgZQgSgNgSgGQgpgOgtACQg1ACglATQgYANgRAOIgGAGIAPAKQA9gnA8AAQAPAAAPADg");
	this.shape_8.setTransform(64.3429,-22.7778);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhVAdQgUgCgMgMQgIgHgEgKIAAgBQAFgSAKgFQAGgDALABIARAEQA0AKATAAIAggCIAigCQAnAAATAKIACABIAIAGQAKAHgKAJQgIAGgMADQgNAEgVAAIhOgCIgnACIgYABIgPAAg");
	this.shape_9.setTransform(56.3689,4.4946);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#010202").s().p("AhXApQgMgGgWgCIAAgCIACgBQAhgbA4gNQANgCAXgEIABAAQAkgEASgFQAYgHAMgLQAOAGALAIQgEAIgHAGQgNAMgXAGIgoAKQhNAQgnAJQAAAAgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIABADIAAABg");
	this.shape_10.setTransform(75.725,-20.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#010202").s().p("AAVAxQgigVgRgMQgegWABgZQAUgJAYgIQgGANABALQACAOAXAPIAEADIAAABIgBAAIAAABIABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAgBAAAAIAxAiIAAAGQgUgDgTADg");
	this.shape_11.setTransform(45.4246,-23.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABNATQgwgNgfABQgRABgXAEIgnAHQgUAEgNgCIgBgDQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAIgBABIgDgBQAAgBAAgBQgBAAAAAAQAAgBgBAAQAAAAgBABIgBgBQgFgEgCgJIABgBQALgXAlgCQANgBAvAGQAUADA0ABIAkABQAVABAOAIQAAAAAAABQABAAAAABQABAAAAAAQABAAAAAAIAFADIAAAAIABAAQAKAJgHAJQgGAIgMAAIgBAAQgKAAgZgHg");
	this.shape_12.setTransform(55.6691,-5.7504);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#010202").s().p("AiPBBQgjgIgwgYIgogVQgWgMgOgNIAJglQADAGAGAHQARAUAKAKQATARAtATQAkAOAtAFQAiADAvgCQApgCAvgNQAigKAzgVQATgGASgMIAjgbQAxgnAoAIIgBAUIgGgBQgJgBgKABQgUABgLAJIgZAaQgMAMgZAJIgnAPIgpASQg2AYgfAGQglAJgoAAQgpAAgsgKg");
	this.shape_13.setTransform(63.375,10.7148);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0085BC").s().p("AARAnQgsAAgtgKIgIgCIAAgGQABABAAAAQABAAAAgBQAAAAAAAAQAAgBgBAAIgfgWQBIgpA+AFQAVABAeANIAUAJQAOAGACAHIgHACQgjAKgeAYQgBAAAAABQAAABAAAAQAAABABAAQAAAAABABIAAACg");
	this.shape_14.setTransform(59.525,-20.9272);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#030504").s().p("ABXAVIgQgIQgfgNgTgEQhKgMhMAxIgPgLIAFgGQARgPAZgLQAlgTA1gDQAsgBAqAOQARAGASANIAfAYQgjAGgMADQgBgHgKgFg");
	this.shape_15.setTransform(61.275,-24.6323);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0085BC").s().p("AkHCRQgqgYgLgvQgIgjANg7IAahrQANAMAUALIAjATQAzAaAeAIQBRAWBQgPQAlgHAzgWIBUgkQAWgIALgIQAHgFAHgIIANgOQARgTAiAAIANABIgEAoIgCARIgBABIAAAAQgPBUgxA3QgzA7huAoQhrAohgAFIgaABQhNAAgugbg");
	this.shape_16.setTransform(61.5476,22.6092);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#231F20").ss(0.5).p("AFTDcQAGgWgBgdQgBghgJhBQgKhHgFgkQgIg/gEgtQgGhGgEiNIgFgDQgIATggAPQglAPgOAIQgPgGgXgBIgNAAQgwADgwgHIgUgDQgZgCgPAFIgFACQgEABgCACQgMgKgSAJQgTAIgBAQQgCAMAGAJQAGAKALADQAIADAKgBQALgDAEgHIAAgBIADABQAQADAhgBQBHgBB1AYQAEAJALAAQALABAHgKQAKgOgJgPQgFgHgGgDIgEAAIgEAAIgBAAQgBAAAAAAIgBAAQgGgMgQgJQgDgDgLgEQADgCAogQQAagLAOgNQAGgGADgHQAACXANB6IAGAxQgCAHgJAHQgKAIgEAEQgWAQgQAHQgpARgnAEQhSAIhfgdQgggJg5gdQgcgPgPgIQgYgOgQgNQgngngVgSQglghgkABQAIg8AXhHQANgqAWg3QAKgaAGgUQAFAdAbATQAUANA3AWIBsAoQABABABgBQABAAAAgCQAAgCgBAAQhRgegogQQgkgPgFgCQgXgMgNgOQgPgRABgaIgHAEQgIAagRArQgTAygHAUQgbBRgHA/IgCAAQgDABAAADQABADADgBIgCAZQgCAjACAYQgRBIgFAzQgGBFALA4QAWBrBOA/QB9BmD6AEQA2ABAdgLQAogQAYgkQAagmAOgrQAPgugCgsgAD2kMQAHAAADAIQAHAOgHAJQgHAKgIgCQgEAAgDgDIAAAAQAEACADgBQAIAAADgKQAFgMgFgFQgCgCgHgDIgCgGgADSkjQAQAJAIAMQAIAOgHAOQgBgBgBAAQgCAAAAACIAAADIgBgEQAAgCgCAAQgDAAAAACIABAHQhtgchKACQglAAgOgDQgjgGASgXIABABQACABACgCQABgBgBgCIgBgBIADgCIABABQABADADgBQACgBgBgDIgBgDQARgKAnAFQA1AIAegBQAPAAAcAAQAYABARAJgAk3ibQApgBAwAxQAEADANAOQAKALAHAGQAOANAXAOQA0AeAiAPQAxAWAqAJQAzAKAkACQAvADAogJQAxgKAYgSQAPgJARgQQAHgGADgGIAFAnQgQAMgZAJQgLAEgiALQg3ARgkADQhbAGhQghQgjgOg0gfIhRgwQgZgPgKgOQgVgdgDgDQgKgKgWgFQgNgDgHAAIgGgBgAg9kfQAFgKAMgGQAOgHAIAGIgEAEQgIgDgJAFQgNAHADAQQACARAMADQALACAGgIIAGACQgLAPgWgMQgVgNAJgSgAk6hGIgBgTQAAgVACgVIANAAQAjAFARAYQAEAFAHAMQAHAKAHAFQAOANATAKQAEACBRAxQAzAgAmANQBVAeBWgJQAhgEA5gSQAfgKAIgEQAXgIAOgLQAMBQAEAlQAHBAgNAjQgSAwguASQg9AYhkgWQhkgVhug9Qhvg8gvhGQgthDgHhagAELGYQghAhg4AHQggADhEgGQkIgWheiDQgyhFgGhiQgEhKAWhnQAHA2ATAqQAkBPBSA5QBZA9BjAlQBmAkBNAAQBhAAAkg8QAGgLAFgNQgDAvgRArQgXA9gbAbg");
	this.shape_17.setTransform(-65.0847,13.6572);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#010202").s().p("ACLHDQj6gEh9hmQhOg/gWhrQgLg4AGhFQAFgyARhJQgCgYACgjIACgZQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBgBAAAAQAAgBAAgBQAAAAABgBQAAAAABAAQAAgBABAAIACAAQAHg/AbhRIAahGQARgrAIgaIAHgEQgBAaAPARQANAOAXAMIApARIB5AuQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAAAgBAAQAAgBAAAAIhsgoQg3gWgUgNQgbgTgFgdQgGAUgKAaQgWA3gNAqQgXBHgIA8QAkgBAlAhQAVASAnAnQAQANAYAOIArAXQA5AdAgAJQBfAdBSgIQAngEApgRQAQgHAWgQIAOgMQAJgHACgHIgGgxQgNh6AAiXQgDAHgGAGQgOANgaALIgrASIAOAHQAQAJAGAMIABAAIABAAIABAAIAEAAIAEAAQAGADAFAHQAJAPgKAOQgHAKgLgBQgLAAgEgJQh1gYhHABQghABgQgDIgDgBIAAABQgEAHgLADQgKABgIgDQgLgDgGgKQgGgJACgMQABgQATgIQASgJAMAKQACgCAEgBIAFgCQAPgFAZACIAUADQAwAHAwgDIANAAQAXABAPAGQAOgIAlgPQAggPAIgTIAFADQAECNAGBGQAEAtAIA/IAPBrQAJBBABAhQABAdgGAWQACAsgPAuQgOArgaAmQgYAkgoAQQgaAKgwAAIgJAAgAlQB7QAGBiAyBFQBeCDEIAWQBEAGAggDQA4gHAhghQAbgbAXg9QARgrADgvIgLAYQgkA8hhAAQhNAAhmgkQhjglhZg9QhSg5gkhPQgTgqgHg2QgWBnAEBKgAk7hbIABATQAHBaAtBDQAvBGBvA8QBuA9BkAVQBkAWA9gYQAugSASgwQANgjgHhAQgEglgMhQQgOALgXAIIgnAOQg5ASghAEQhWAJhVgeQgmgNgzggIhVgzQgTgKgOgNQgHgFgHgKIgLgRQgRgYgjgFIgNAAQgCAVAAAVgAk3idIgCAVIAGABQAHAAANADQAWAFAKAKIAYAgQAKAOAZAPIBRAwQA0AfAjAOQBQAhBbgGQAkgDA3gRIAtgPQAZgJAQgMIgFgnQgDAGgHAGQgRAQgPAJQgYASgxAKQgoAJgvgDQgkgCgzgKQgqgJgxgWQgigPg0geQgXgOgOgNIgRgRIgRgRQgwgwgoAAIgBAAgADqjqQADADAEAAQAIACAHgKQAHgJgHgOQgDgIgHAAIgFgBIACAGQAHADACACQAFAFgFAMQgDAKgIAAQgDABgEgCgADijtIgBgHQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAABIABAEIAAgDQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAIACABQAHgOgIgOQgIgMgQgJQgRgJgYgBIgrAAQgeABg1gIQgngFgRAKIABADQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBIgBgBIgDACIABABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBgBQgSAXAjAGQAOADAlAAIALAAQBHAABlAagAgskxQgMAGgFAKQgJASAVANQAWAMALgPIgGgCQgGAIgLgCQgMgDgCgRQgDgQANgHQAJgFAIADIAEgEQgEgDgFAAQgGAAgHAEg");
	this.shape_18.setTransform(-65.0847,13.8792);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#030504").s().p("ACFBNIAAgCIAjgTQhHg3hEgFQgVgBghAHIgWAFQgPAFgEAHIAHADQAlARAbAeQABABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAAAAAQgBAAAAAAQAAAAgBAAIgBgBQgggjg4gXIgngMIgBAAQgngKgRgIQgmgRgGgYQgBgEAAgMIAFgDQgCAUALAOQAMAOAXAJQALAGAdAIIALADIABAAIAigUQAUgMARgEQArgLA2AJQAtAIApAXQASAKAXAVIAPAQIAGAIQAdgMAFgPQACgGgBgIIADACQABAFgCAIQgCAIgKAIQgFAEgNAGIgGADIABAAIABAAIgBABIAAABIgDgCQgjAQgVAMgACqA4IARgJIgFgIQgRgSgYgRQgjgYg5gNQgwgJgsAHQgUADgUALIgkAVQAhAKAQAGQACgGALgFIARgEQAkgKATAAIABAAQBPAABLBBg");
	this.shape_19.setTransform(-62.0187,-25.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#010202").s().p("AgfBUQgjgOg0ghIhRguQgZgQgKgOIgYggQgKgKgWgFQgNgDgHAAIgGAAIACgWQApAAAwAwIARASIARARQAOANAXANQA0AdAiAQQAxAWAqAJQAzAKAkADQAvADAogJQAxgLAYgRQAPgLARgQQAHgGADgFIAFAnQgQAMgZAKIgtAOQg3ASgkACIgeACQhLAAhCgcg");
	this.shape_20.setTransform(-64.775,9.2032);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#010202").s().p("AB+AmIgMAAQgRgCgZgJQgbgKgOgEQgZgIgcgBQgYgCgfAEQggADgMgDQgGgBgEgDQgGAKgMgFQgNgEABgRQACgNAJgJQALgJAJALIADgBQgLgOgPANQgPANACAQQADAQAPAGQAQAGAKgOIABgBIABACQgKATgTgIQgRgHgFgSQgFgVAVgPQAVgPANATIALgDQATgDAcADIAuAIQATACA8AEQAtACAVANIAJAGIARgBQAKABAEAGQAJAPgGASQgGAPgPABIgCAAQgNAAgJgLgACFAlQAHAHAIAAQALABAHgOQAEgKgFgOQgCgHgIgCIgPgBIADADQAOgBADAHQAEAJgEALQgFALgHADQgIADgFgHgAB8AiQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAABABAAQAAAAAAAAIACACIADgBQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAIABAAQAFgDAFgKIgBgBQgKgagmgJQgOgDgygCQgbAAgygIIgmgFQgXgCgPAFQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgFADIgBAAIgBABQgLAHAGAKQAGAKANABQALACAbgDQA1gFAgAGQASAEAYAIIAoAOQAXAHAMAAIAAAAg");
	this.shape_21.setTransform(-55.154,-4.085);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ag7AMQglAAgPgDQgjgHASgVIABAAQABABAAAAQABAAAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIgBgBIADgCIABACQAAAAAAABQABAAAAAAQABABAAgBQABAAABAAQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIgBgDQASgLAnAGQA1AHAdAAIArgBQAYABARAKQAQAJAIAKQAIAOgHAOIgCgBQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABAAAAIAAADIgBgEQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBAAgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIABAHQhtgbhJACg");
	this.shape_22.setTransform(-54.7588,-13.6695);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#010202").s().p("Ag/AiIAAgFIAAAAQAVgLAjgQIACACIABgBIAAgBIgBAAIAAgBIAFgBQANgGAFgEQAJgIADgJQACgHgBgFIAiAXQgJASgfAQQglAPgOAHQgPgFgWgBg");
	this.shape_23.setTransform(-42.3,-20.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#010202").s().p("ABSBKQABAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAgBAAIh4guIgogRQgYgLgMgOQgPgRABgaIAbgOQAAALABAFQAGAXAmARQARAIAnALIAAAAIAnAMQA4AWAhAjIABABIAAABQgZgCgQAFIgFACg");
	this.shape_24.setTransform(-74.6281,-25.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#010202").s().p("ABPAwIgqgKQgUgFghgEIg2gHQgggFgOgHIgJgFQgIAKgLgGQgKgFgDgLQgEgOALgKQAIgHARAHIACgBQgDgMgRADQgQACgCAZQgCAVATAKQAIAEAKgEIAFgCQABAAABgBQAAAAAAgBQAAAAAAAAQAAgBAAAAIACgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQgBABAAAAQgEAJgKABQgJACgKgFQgLgFgEgNQgDgJABgNQABgLAHgHQAIgIAKgBQAIgBAHAEQAHAEABAHIAJgCQATgEAZADIArAIIApAJQAQADAmgBIAigBQAVABAJAMIACACQAKgEAJAHQAJAHgBALQgBATgMAHQgHAEgIgBQgKAAgGgFIgCACQgMAGgQAAIgOgBgAh1gdIgDABIgJAEQgLAHAKALQAHAHAMAGQALAFAZAEIBTAMIApAJQAZAGAQABQAVABAPgKQAKgHAFgKIgBgCQgDgSgKgGQgGgFgLAAIgTAAIgmACQgWAAgQgDQgtgLgYgEQgUgDgQAAQgQAAgLADgAB/AmQAKAHANgFQAJgEAEgRQABgJgHgIQgHgHgJADIACADQAJgBAEAJQAFAKgFAHQgLAUgPgJg");
	this.shape_25.setTransform(-56.8675,5.9149);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A4DEF4").s().p("AgHDXQghgJg4geIgrgXQgZgOgQgNQgmgngVgSQglghgkABQAIg7AXhHQANgqAWg3QAJgaAHgUQAEAdAcATQATANA3AWIBsAoQABAAAAAAQAAABAAAAQABAAAAgBQAAAAABAAIABACQgEABgCACQgMgKgSAJQgTAIgCAQQgBAMAGAJQAFAKAMADQAIADAKgBQAKgDAEgHIABgBIADABQAQADAhgBQBHgBB0AYQAFAJALAAQAKABAIgKQAKgOgJgPQgFgHgGgDIgFAAIgDAAIgBAAIgBAAIgBAAQgGgMgQgJIgOgHIArgSQAagLAOgNQAGgGADgHQAACXANB5IAGAxQgCAHgJAHIgPAMQgVARgQAHQgqARgmAEQgTABgTAAQhCAAhJgWgAAKCPIA2AIQAhAEAUAFIArAJQAZAEARgJIACgBQAGAFAKAAQAIAAAHgEQAMgHABgSQABgLgJgIQgKgIgJAFIgCgDQgKgMgUgBIgjACQglABgRgDIgpgJIgrgIQgYgDgTADIgJACQgCgHgHgEQgGgDgIABQgKABgIAHQgHAIgBAKQgBANADALQAEANAKAFQAKAEAKgBQAKgCAEgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIAAAAQAPAGAfAFgAD4BHQAPgBAFgPQAGgSgIgPQgFgHgKgBIgRAAIgIgGQgVgMgtgCQg8gDgUgDIgugHQgcgEgSAEIgLADQgOgTgUAOQgVAPAFAUQAFATARAHQATAIAKgSIgBgCQAMADAfgEQAfgDAYABQAcACAaAHQANAEAcALQAYAJASABIAMABQAJAMAPgBg");
	this.shape_26.setTransform(-64.95,-6.2037);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#0085BC").s().p("AgaAmIgUgDIAAgBQAAABAAAAQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQgcgeglgRIgIgDQAEgHAPgEIAXgGQAhgIAWACQBDAFBGA2IgjATIAAACIAAAEIgNAAIgcABQgiAAghgFg");
	this.shape_27.setTransform(-56.95,-21.444);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#060807").s().p("AgRgRQgUAAgkAKIgRAFQgMAEgCAGQgQgHghgJIAkgVQAVgLATgDQAtgIAvAKQA5AMAkAaQAYAPARATIAFAIIgRAIQhMhAhOAAg");
	this.shape_28.setTransform(-58.675,-24.4904);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("ABVAdIgpgOQgYgIgRgEQgggGg1AFQgbADgMgCQgNgCgFgJQgHgKAMgHIABgBIAAAAIAGgDQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABgBQAPgFAWACIAnAFQAyAIAbAAQAyACAOADQAmAJAJAaIABABQgEAKgGADIAAAAQgBgBAAAAQgBAAAAABQgBAAAAAAQAAABAAABIgEABIgBgCQAAAAgBgBQAAAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAQgMAAgXgHg");
	this.shape_29.setTransform(-54.7424,-4.2517);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("ABXAmQgQgBgZgGIgogJIhUgMQgZgEgKgFQgNgEgHgIQgKgLAMgHIAJgFIACAAQAWgHApAGQAYAEAuALQAQADAVAAIAmgBIATgBQAMABAGAEQAKAHADASIAAABQgFALgKAGQgNAKgSAAIgFgBg");
	this.shape_30.setTransform(-56.6326,6.4529);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#0085BC").s().p("ABfDTQhkgWhug9Qhvg8gwhFQgthDgGhaIgBgUQAAgVABgVIANABQAkAFAQAXIAMARQAHAKAGAGQAPANASAKIBVA0QA0AfAlAOQBWAeBVgKQAigEA4gSIAogNQAWgJAPgKQALBPAEAlQAHBAgNAjQgRAwgvARQggANgrAAQgmAAgvgKg");
	this.shape_31.setTransform(-63.9025,22.533);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("ABOD3QkHgWhfiDQgyhFgFhhQgFhKAXhoQAGA3ATAqQAkBPBTA5QBYA8BkAlQBmAkBNAAQBgAAAlg8IAKgYQgDAvgQArQgYA9gbAbQggAhg4AHQgMABgRAAQgdAAgrgEg");
	this.shape_32.setTransform(-65.1125,33.4895);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko1shoes, new cjs.Rectangle(-100.5,-32.9,196.1,92.9), null);


(lib.shoko1hand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#70301A").s().p("AB5BWQgVhEgkgyQgkgxhAgzIhzhTQBMAeA1AhQBBApAoA2QArA5ARBIQAPBFgKBLQgLhOgQg0g");
	this.shape.setTransform(12.2142,54.5134,0.4519,0.4519,-171.5311);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#70301A").s().p("AhfELQiegKhxhbQhfhMglhoQgbhLAMhEQAMhDAwgsQAEgEAFAFQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgtApgLBAQgLA/AZBHQAlBlBcBJQBuBZCZAKQEIAQCfhDQCghEAKiEQAJhzgGg6QgGg5gXgLQgGgDADgGQADgGAGADQAcANAHA7QAIA7gKB7QgJB9iIBHQiIBGjlAAQglAAg8gDg");
	this.shape_1.setTransform(7.9014,16.5347,0.4519,0.4519,-171.5311);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#9B4F33").s().p("Al3KnQgpgLgigXQhQg1AbhkQAJgjAagxIArhPIBairQALgWAgg4QAbgygBgfQjaGIhPBWQguA0gZgSQgYgRgHhaIAJgcQAKgeASgqIANgfQAbg4BDh3QBOiLArhTQANgZAEgnQAEgngKAaQh/E1h8BvQgzAtgfgIQgfgJAAg6QAAggBjiGQA0hFBJhcQAlgwAahCQAOgiAJgdQAfguAyhQQAqhDApglQBEg+BUgkQBWgkBXgFQDEgKB/CPQA4A+AiB3QAfCHAVA9QAMAlAsAhQASAOBEApQA1AgAWAXQAfAigFApQgKBHhZANQhLAMhCgdQhQgihKhKQhFhDgrhRQgKArgZBfQgZBagKAxQgLA3gIBsQgIBvgKA0QgRBagjAuQgwBAhTgRQhNgRAEhlQADg3AbhmQAIgpAVhmQAQhagCgtQgDg5giAsQgYAggTAvQgeBKgdBtIgwC6IgTBFQgPAmgeAMQgRAHgVAAQgUAAgYgHg");
	this.shape_2.setTransform(-1.8593,71.8445,0.758,0.758);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#70301A").s().p("AkdAxQgPgGgDgWQgDgVAJguQAOANAVgDQAOgCAjgOQBaggBIABQBdAABcA0IA2AfQAXALAKgFQAdgQAAgbQAAgfgihGQBLA/AMBXQAKBXg8ApQoChSgYgJg");
	this.shape_3.setTransform(7.3306,20.8271,0.758,0.758);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9B4F33").s().p("AkdBZQgPgHgDgVQgDgVAJgvQADgVAIghIABgCQAThPBmgZQBlgaCaAhQA/AOAxAkIANALIAAAAQBLBAAMBXQAKBXg8AoQoChRgYgJg");
	this.shape_4.setTransform(7.3306,17.8095,0.758,0.758);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#9B4F33").s().p("Aih2TIFTAaQgFBNApFeQAYDQBBIDQB6P0gvCVQhWESldCWQiwBKieAUg");
	this.shape_5.setTransform(23.001,-71.7188,0.5961,0.5961,-171.5246);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko1hand, new cjs.Rectangle(-59,-152.4,117.7,276.2), null);


(lib.Scene_1_sign = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sign
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660100").s().p("AAEAHIgFgGQgCADAAACIAAABIgCABIgBgBIgBgBQAAgEAEgDIgCgDIAAgCIACgBIABABIADAGQACgDABgCIABgCIABAAIABAAIABADQgBADgEACIAEAEIAAABIAAABIgBABIgCgBg");
	this.shape.setTransform(110.275,190.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#660100").s().p("AADAIIgBgBIgBgBIACgJIgEAAIgCAJIAAABIgCABIgBgBIgBgBIACgKIgBgBIAAgBIABgBIABAAIABAAIABAAIAIAAIABABIAAACQgBAEgBAGIAAABIgBABIgBAAg");
	this.shape_1.setTransform(108.4625,190.6083);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#660100").s().p("AADAIIgCgBIAAgBIABgJIgGAAIgCgBIAAgBIAAgCIACAAIAJAAIACABIAAACQgCAEAAAGIgBABIgBABIAAAAg");
	this.shape_2.setTransform(106.725,190.6083);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660100").s().p("AAEAIIgFgHQgCADAAADIAAABIgCAAIgBAAIgBgCQAAgDAEgEIgCgDIAAgCIACgBIABABIADAGQACgDABgDIABgBIABAAIABAAIABACQgBAEgEACIAEAEIAAABIAAABIgBABIgCAAg");
	this.shape_3.setTransform(113.475,186.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660100").s().p("AAAAIIgCgBIAAgBIABgJIgDAAIgCgBIAAgBIAAgCIACAAIAJAAIACAAIAAACIAAABIgCABIgDAAIgBAJIgBABIAAABIAAAAg");
	this.shape_4.setTransform(111.775,186.8083);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660100").s().p("AAAAIIgCgBIAAgBQAAgHACgFIABgBIACABIAAACQgCAEAAAGIgBABIAAABIAAAAg");
	this.shape_5.setTransform(110.4625,186.8083);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660100").s().p("AAAANIgCAAIAAgCIACgWIAAgBIABgBIACABIAAABIgCAXIgBABIAAABIAAgBg");
	this.shape_6.setTransform(109.625,187.3583);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660100").s().p("AgHAIIgBgBIgBgMIABgCIABAAIACAAIAAACIABAJIACAAQgBgEACgFIABgBIAAgBIACABIAAACQgCAFABADIADAAIACgJQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAIABABIAAACQgBAEAAAFIAAACIgCABIgBAAIgFAAIgFAAIgBAAIgBAAg");
	this.shape_7.setTransform(107.2625,186.7833);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660100").s().p("AAAAIIgCgBIAAgBQAAgHACgFIABgBIACABIAAACQgCAEAAAGIgBABIAAABIAAAAg");
	this.shape_8.setTransform(105.7125,186.8083);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660100").s().p("AgGANIAAgBIABgPIABgBIABgBIABABIABABIgCAPIAAABIgBABIgCgBgAACACIgBgCIACgJIgHAAIgBAAIgBgCIABgBIABgBIAJAAIACABIAAACIgCALIgBABIgBAAIgBAAg");
	this.shape_9.setTransform(104.4,187.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660100").s().p("AAAAIIgCgBIAAgBQAAgHACgFIABgBIACABIAAACQgCAEAAAGIgBABIAAABIAAAAg");
	this.shape_10.setTransform(103.0625,186.8083);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(255,223,202,0.996)").ss(0.5,1,1).p("AhTgdQADAAADgBQAugJAuACQAhACAhAGQAKAYgEATQgCAIgEAHQhbAThJgTQgGgNAEgeQABgHABgIg");
	this.shape_11.setTransform(108.1293,188.6943);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EF854B").s().p("AhTAdQgGgNAEgeIACgPIAGgBQAugJAuACQAhACAhAGQAKAYgEATQgCAIgEAHQguAJgoAAQgqAAgkgJg");
	this.shape_12.setTransform(108.1293,188.6943);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},270).wait(261));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.CompoundPath_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlKFZQjugoiEgHQjKgNitAkQgUAEgaAAIgvgBQB8gsBXANQAMgSAXgTQAvgmA6gDQA7gEAqAVQAVALAJALQAGgQANgWQAbgtAmggQjBgghvgGQimgKiNAdQgRAEgWAAIgngBQBlglBLALQAKgPATgQQAmgfAxgDQAxgDAjASQASAJAIAJQANgkAggjQBAhJBegFQBegGA+AwQAfAYAMAYQgEgqARguQAhhdBngOQA9gIA2AXQAuATAgAmQAlg6BBgNQAdgbAogPQArgPAvAAIASABQAXg/AzglQA0gnA/AAQBXAAA+BDQA/BEACBgQAAATgCAPIAIAAQAdhKA9guQA+guBMAAQBpAABKBRQBMBRABBzQABAmgIAjQAQAXAJAbQBAAEAsAWQArAWAAAeQAAAWgYASQAyABAjANQAiAOAAAUQABAUgkAOQgkAOgyAAQgmAAgkgKIhtgfQh4geiRAiQgWAFgqAWQgpAVgTAEQjzAmjbABIgLAAQjlAAjigng");
	this.shape.setTransform(129.1504,38.4262);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_1, new cjs.Rectangle(0,0,258.3,76.9), null);


(lib.CompoundPath_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhsE2QiygBjEgfQgPgCgggSQgigRgTgFQhzgbhiAYQguANgqANIAAgBQgbAIghAAQgpAAgcgLQgdgMAAgQQABgPAcgMQAbgLAoAAQgTgPAAgRQABgYAjgSQAigRA0gEQAHgVANgUQgGgfAAgbQAChdA8hBQA9hCBUAAQA+AAAyAmQAxAkAXA9IAGgBQgBgPAAgMQABhNAzg3QAyg3BGAAQAzAAAqAgQApAeATAyIAOAAQAnAAAiAMQAgAMAYAWQAzAKAfAvQAageAlgQQArgSAxAGQBTALAbBLQAOAlgEAiIAIgLQAMgPAPgMQAzgnBLAFQBMAEA0A7QAaAcAKAcIAVgOQAcgOAnACQAoACAfAaQAQANAHAMQA8gKBSAfIgfAAQgSAAgOgDQhygXiGAIQhaAFibAZQAfAaAVAkQALASAFANIAYgRQAigRAwACQAvADAlAfQATAPAJAPQBGgLBkAkIglAAQgVAAgQgDQiMgdiiAKQhsAHi/AfQizAgi0AAIgQAAg");
	this.shape.setTransform(104.1746,30.9783);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_0, new cjs.Rectangle(0,0,208.4,62), null);


(lib.CompoundPath = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhTDvQiJgBiXgXQgMgCgZgOQgagNgOgEQhbgVhKATIhEATQgUAGgZAAQggAAgWgJQgWgIAAgNQAAgMAWgJQAVgIAfgBQgPgKAAgOQABgTAbgNQAagOAogDQAFgPALgQQgFgWAAgXQABhHAvgzQAvgyBAAAQAwAAAnAdQAlAcASAuIAFAAIgBgVQABg8AngqQAngqA2AAQAnAAAhAYQAfAYAPAmIALAAQA8AAAnAkQAoAHAXAkQAUgXAcgMQAigOAmAFQBAAJAUA5QALAdgDAaIAbgeQAngdA6ADQA7ADAoAuQAUAVAIAWIAQgLQAVgLAfACQAeACAYATQAMAKAGAKQAtgIBAAYIgYAAQgNAAgLgCQhYgShnAGQhFAEh4ATQAXAVARAbQAJAOADAKIATgOQAagMAlACQAkACAdAXQAOAMAHALQA3gIBNAcIgdAAQgQAAgNgDQhsgWh9AIQhSAFiUAZQiKAYiMAAIgLAAg");
	this.shape.setTransform(80.325,23.8769);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath, new cjs.Rectangle(0,0,160.7,47.8), null);


(lib.Path_97 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5E544B").s().p("A4J0gIH0grQErKLIOJUQLGMnQgJmMgwTAArg");
	this.shape.setTransform(238.65,135.625,1.0679,1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_97, new cjs.Rectangle(73.6,0,330.20000000000005,271.3), null);


(lib.Path_36_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99A52D").s().p("Ag1AiQgWgOAAgUQAAgTAWgOQAXgOAeAAQAgAAAWAOQAWAOAAATQAAAUgWAOQgWAOggAAQgeAAgXgOg");
	this.shape.setTransform(7.6,4.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_36_0, new cjs.Rectangle(0,0,15.2,9.7), null);


(lib.Path_36 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#382B18").s().p("AgKghIgWAMIgBgIIAXgNIAAg2IAIgEIAAA2IAkgVIAAAJIgkAVIAACHIgIADg");
	this.shape.setTransform(3.375,10.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_36, new cjs.Rectangle(0,0,6.8,20.3), null);


(lib.Path_35 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#382B18").s().p("AAAgkIgpAYIACgKIAngWIAAhBIAHAAIAAA9IAigTIABAHIgjAUIAACSIgHADg");
	this.shape.setTransform(4.2,10.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_35, new cjs.Rectangle(0,0,8.4,21.9), null);


(lib.Path_34 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#382B18").s().p("AgJgYIgYAKIgBgIIAZgKIAAhAIAHgDIAABAIAkgPIABAIIglAPIAAB+IgHABg");
	this.shape.setTransform(3.45,10);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_34, new cjs.Rectangle(0,0,6.9,20), null);


(lib.Path_33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#382B18").s().p("AgDgZIgkAQIgBgIIAlgQIAAhHIAHgEIAABIIAkgPIgBAJIgjAPIAACFIgHACg");
	this.shape.setTransform(4.05,10.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_33, new cjs.Rectangle(0,0,8.1,21.7), null);


(lib.Path_24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99A52D").s().p("Ag9AnQAEgXALgXQAOgbAOgHQAWgKAgANQAmARgPAoQgaACgiAJIg9AQIABgHg");
	this.shape.setTransform(6.3143,4.5122);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_24, new cjs.Rectangle(0,-0.1,12.7,9.299999999999999), null);


(lib.Path_23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99A52D").s().p("ABtBuQgXgbgSgJIgDgCIgXgEQgfgDgVgUQgcgagKgEQAygPgWgYQgNgOhjg9QgagRghgDIA+gKQAlgFApAJQAtAKAggBQApAkAuBWQAnBKAlARIADACQgHASgVAIQgHADgVADIgBAAQgIAAgSgVg");
	this.shape.setTransform(19.225,13.1629);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_23, new cjs.Rectangle(0,0,38.5,26.3), null);


(lib.Path_22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99A52D").s().p("AhVAZQhBgUgbAQQATgQApgbQAfgVABgEIAEgJQBdgZBHAeQAoARA3ApQgfADgoATQgVAJg1AfQg2gZhAgTg");
	this.shape.setTransform(17.8,6.8944);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_22, new cjs.Rectangle(0,0.1,35.6,13.700000000000001), null);


(lib.Path_21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99A52D").s().p("AAQgjQgIAMgGATIgHAoQgcgZAxgug");
	this.shape.setTransform(1.6076,3.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_21, new cjs.Rectangle(0,0,3.2,7.1), null);


(lib.Path_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3F2C1C").s().p("AgWifQhkl5hmlEIC2AyIEKOAQAFA9gQEzQgTFSgZBEQAJkLjIrwg");
	this.shape.setTransform(22.4938,86.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,45,172.1), null);


(lib.Path_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D2816").s().p("ACOd2IhagEQgaAAhPgGQg1gEgaAFQAHhcAFiFQAKkIgMjHQghocgZmKQgxrqgdkPQgllfAEi1QAGjdBBjLQAdhbAEh8QCgLbgjE8QgaDiC7UAQBeKBBjJTQgoAQgtAKQgVAEgcAAIgQAAg");
	this.shape.setTransform(29.2006,191.0161);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,58.4,382.1), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99A52D").s().p("Ag1AiQgWgOAAgUQAAgTAWgOQAXgOAeAAQAgAAAWAOQAWAOAAATQAAAUgWAOQgWAOggAAQgeAAgXgOg");
	this.shape.setTransform(7.6,4.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,15.2,9.7), null);


(lib.Group_50 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9B+QgEgCACgFIB2jxQADgFAEACQAFADgDAEIh2DyQgBACgEAAg");
	this.shape.setTransform(8.0889,12.6192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXCyQgEgDACgEICqlZQACgFAFACQAEADgCAEIiqFZQgBADgEAAg");
	this.shape_1.setTransform(17.675,32.8192);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ah+EGQgFgDADgEID4oBQACgEAFACQAEACgCAFIj4IAQgCADgDAAg");
	this.shape_2.setTransform(13,27.1942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_50, new cjs.Rectangle(0,0,26.8,53.4), null);


(lib.Group_49 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9B+QgEgDACgEIB2jxQACgFAFACQAEACgCAFIh2DxQgCADgDAAg");
	this.shape.setTransform(8.0853,12.6192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXCyQgEgCACgFICqlZQACgEAFACQAEACgCAEIiqFaQgCACgDAAg");
	this.shape_1.setTransform(17.675,32.7942);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ah+EFQgFgCADgEID5oBQACgEAEACQAFACgCAEIj5IBQgCADgDAAg");
	this.shape_2.setTransform(12.9861,27.1692);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_49, new cjs.Rectangle(0,0,26.8,53.4), null);


(lib.Group_48 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9B+QgFgCADgFIB2jxQACgFAFACQAEADgCAEIh2DyQgCACgDAAg");
	this.shape.setTransform(8.1111,12.6192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXCyQgFgDADgEICqlZQADgFAEACQAFADgDAEIiqFZQgBADgDAAg");
	this.shape_1.setTransform(17.7,32.8192);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ah+EGQgFgDACgEID5oBQADgEAEACQAFADgDAEIj5IAQAAADgEAAg");
	this.shape_2.setTransform(13.0139,27.1942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_48, new cjs.Rectangle(0,0,26.8,53.4), null);


(lib.Group_47 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9B+QgEgCACgFIB2jxQADgFAEACQAEADgCAEIh2DyQgBACgDAAg");
	this.shape.setTransform(8.1,12.6192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXCyQgFgDADgEICqlZQADgFAEACQAFADgDAEIiqFZQgBADgDAAg");
	this.shape_1.setTransform(17.7,32.8192);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ah+EGQgFgDACgEID5oBQADgEAEACQAFADgDAEIj5IAQgBADgDAAg");
	this.shape_2.setTransform(13.0109,27.1942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_47, new cjs.Rectangle(0,0,26.8,53.4), null);


(lib.Group_46 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9B+QgEgCACgFIB2jxQACgFAFACQAEADgCAEIh2DyQgCACgDAAg");
	this.shape.setTransform(8.075,12.6192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXCyQgEgDACgEICqlZQACgFAFACQAEADgCAEIiqFZQgCADgDAAg");
	this.shape_1.setTransform(17.675,32.8192);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ah+EGQgFgDADgEID5oBQACgEAEACQAFACgCAFIj5IAQgCADgDAAg");
	this.shape_2.setTransform(12.9861,27.1942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_46, new cjs.Rectangle(0,0,26.8,53.4), null);


(lib.Group_45 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag9B+QgFgDADgEIB2jxQACgFAFACQAEADgCAEIh2DyQgCACgDAAg");
	this.shape.setTransform(8.1111,12.6192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXCyQgFgDADgEICqlZQADgFAEACQAFADgDAEIiqFZQgBADgDAAg");
	this.shape_1.setTransform(17.7,32.8192);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ah+EGQgFgDACgEID5oBQADgEAEACQAFADgDAEIj5IAQAAADgEAAg");
	this.shape_2.setTransform(13.0139,27.1942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_45, new cjs.Rectangle(0,0,26.8,53.4), null);


(lib.Group_43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag2BZQgEgCACgFIBoipQADgEAEADIACADQABAAAAABQAAAAAAABQgBAAAAABQAAAAAAAAIhoCqQAAAAgBABQAAAAgBAAQgBABAAAAQgBAAgBAAg");
	this.shape.setTransform(14.1603,22.0019);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhaCRQgEgCACgFICwkYQAEgEADADQAEACgCAFIiwEYQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAg");
	this.shape_1.setTransform(12.6,14.49);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhIByQgEgDADgEICLjaQADgEADADQAFADgDAEIiLDZQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAg");
	this.shape_2.setTransform(7.45,12.0769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_43, new cjs.Rectangle(0,0,22,31), null);


(lib.Group_42 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsBIQgDgCACgDIBUiIQABgEAEACQAEADgCADIhUCIQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABAAAAg");
	this.shape.setTransform(11.4214,17.7386);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhIB0QgEgBACgEICOjhQACgEADADQAEACgDADIiNDhIgDACg");
	this.shape_1.setTransform(10.1657,11.7229);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag5BbQgEgBACgEIBwivQABgDAEACQAEACgDADIhvCvQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAg");
	this.shape_2.setTransform(6.0157,9.7636);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_42, new cjs.Rectangle(0,0,17.7,25), null);


(lib.Group_35 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C555E").s().p("AhXCRQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAICskdQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAAAAAABQAAABAAAAIisEdIgCACg");
	this.shape.setTransform(8.875,14.5833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_35, new cjs.Rectangle(0,0,17.8,29.2), null);


(lib.Group_34 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C555E").s().p("AhuCqQgBAAAAAAQAAgBAAAAQgBAAABgBQAAAAAAgBIDblQQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQABABgBAAQAAABAAAAIjbFQIgCABg");
	this.shape.setTransform(11.2155,17.1083);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_34, new cjs.Rectangle(0,0,22.5,34.2), null);


(lib.Group_33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C555E").s().p("AhnCqQgBAAAAAAQAAgBAAAAQgBAAABgBQAAAAAAgBIDNlQQAAAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABABAAAAQAAAAAAABQABAAgBABQAAAAAAABIjNFQIgCABg");
	this.shape.setTransform(10.5155,17.1083);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_33, new cjs.Rectangle(0,0,21.1,34.2), null);


(lib.Group_32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C555E").s().p("Ag6BbQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIByiwQABAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABIhzCwIgCABg");
	this.shape.setTransform(6.0095,9.1333);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_32, new cjs.Rectangle(0,0,12.1,18.3), null);


(lib.Group_22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFE4F4").s().p("AjOGVQgFgDADgEIGYsfQAEgFAEADQADACgCAEImYMfQgCADgDAAg");
	this.shape.setTransform(21,40.4804);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_22, new cjs.Rectangle(0,0,42,81), null);


(lib.Group_21_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("AgnBWQgFgDADgEIBKiiQACgFAFADQAEACgCAEIhKCjQgCADgDAAg");
	this.shape.setTransform(4.2641,8.6583);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_21_0, new cjs.Rectangle(0,0,8.6,17.4), null);


(lib.Group_21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFE4F4").s().p("AkYI2QgEgDACgEIIsxiQACgEAFACQAEACgCAFIosRhQgCADgDAAg");
	this.shape.setTransform(28.3833,56.6054);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_21, new cjs.Rectangle(0,0,56.8,113.3), null);


(lib.Group_20_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("AhKCfQgFgDADgEICRkzQACgEAEACQAEACgBAEIiREzQgCADgDAAg");
	this.shape.setTransform(7.8,15.8942);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_20_0, new cjs.Rectangle(0,0,15.6,31.8), null);


(lib.Group_20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFE4F4").s().p("AivGBQgEgCACgFIFar3QACgFAEADQAFACgCAEIlaL3QAAADgEAAg");
	this.shape.setTransform(17.85,38.4833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_20, new cjs.Rectangle(0,0,35.7,77), null);


(lib.Group_19_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("Ag7B8QgFgCADgEIByjuQACgFAFACQAEADgCAEIhyDuQgCADgDAAg");
	this.shape.setTransform(6.2611,12.4442);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_19_0, new cjs.Rectangle(0,0,12.6,24.9), null);


(lib.Group_19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFE4F4").s().p("AhkDOQgEgDACgEIDEmSQADgEAEACQAFACgDAFIjEGRQgCADgDAAg");
	this.shape.setTransform(10.3755,20.6054);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_19, new cjs.Rectangle(0,0,20.8,41.3), null);


(lib.Group_18_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("Ag2B4QgFgCADgFIBojlQACgFAFADQAEACgCAEIhoDlQgCADgDAAg");
	this.shape.setTransform(5.7641,11.9833);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_18_0, new cjs.Rectangle(0,0,11.6,24), null);


(lib.Group_18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EFE4F4").s().p("AhoDOQgEgBACgFIDMmTQADgFAEADQAEACgCAEIjMGTQgBADgDAAg");
	this.shape.setTransform(10.7474,20.6554);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_18, new cjs.Rectangle(0,0,21.5,41.4), null);


(lib.Group_17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("AgnBWQgFgCADgFIBKiiQACgFAFADQAEACgCAEIhKCjQgCADgDAAg");
	this.shape.setTransform(4.2611,8.6554);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_17, new cjs.Rectangle(0,0,8.6,17.4), null);


(lib.Group_16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("AhKCfQgFgDADgEICRkzQACgEAEACQAFACgCAEIiREzQgCADgDAAg");
	this.shape.setTransform(7.7891,15.8942);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_16, new cjs.Rectangle(0,0,15.6,31.8), null);


(lib.Group_15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("Ag7B8QgFgCADgEIByjuQACgFAFACQAEADgCAEIhyDuQgCADgDAAg");
	this.shape.setTransform(6.2611,12.4442);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_15, new cjs.Rectangle(0,0,12.6,24.9), null);


(lib.Group_14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("Ag2B4QgFgDADgEIBojlQACgFAFADQAEACgCAEIhoDlQgCADgDAAg");
	this.shape.setTransform(5.7611,11.9804);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_14, new cjs.Rectangle(0,0,11.6,24), null);


(lib.Group_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BCA895").s().p("AixAfQgPgDgGgPQgFgNAJgNIALgQQALgQASgKQARgJAUAAIA/gBQDgAEAbAwQAJAOgLATQgcAuhrAAQhkAAiJgjgAh1g6QgSABgQAIQgQAJgLAPIgLAQQgHAJAEALQAFALALADQBqAaBWAGQCPALAegzQAJgQgGgLQgNgWg/gMQhAgNhqgBg");
	this.shape.setTransform(133.0433,11.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BCA895").s().p("AiyAfQgPgEgFgOQgFgOAIgMIAMgQQALgQARgKQASgJAUAAIA+gBQDhAEAbAwQAJAPgLASQgcAuhrAAQhjAAiLgjgAh1g6QgSABgQAIQgQAJgLAPIgLAQQgHAJAEALQAEAKAMAEQBrAaBVAGQCOALAfgzQAJgPgHgMQgMgWhAgMQg/gNhrgBg");
	this.shape_1.setTransform(1069.6772,49.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#BCA895").s().p("AiyAfQgOgDgGgPQgFgOAIgMIAMgQQALgQARgKQASgJAUAAIA+gBQDhAEAbAwQAJAPgMASQgbAuhsAAQhdAAiQgjgAh1g6QgSABgQAIQgRAJgKAOIgLARQgIAJAFALQAEALAMADQBqAaBWAGQCOAKAfgyQAJgQgHgLQgMgWhAgMQg/gNhrgBg");
	this.shape_2.setTransform(1045.013,104.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BCA895").s().p("AiyAfQgPgEgFgOQgFgNAIgNIAMgQQALgQARgKQASgJAUAAIA+gBQDhAEAbAwQAIAOgKATQgcAuhrAAQhgAAiOgjgAiygZIgLAQQgHAJAEALQAEAKAMAEQBrAaBVAGQCOALAfgzQAJgPgHgMQgMgWhAgMQg/gNhrgBIg+AAQgnABgWAgg");
	this.shape_3.setTransform(816.0649,111.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BCA895").s().p("AixAfQgPgEgGgOQgFgNAJgNIALgQQAMgQARgJQARgKAUAAIA/AAQDgACAbAxQAJAOgLATQgcAuhrAAQhhAAiMgjgAh1g5QgSAAgQAIQgQAJgLAPIgLAQQgHAJAEALQAFAMALACQBrAaBVAGQCPALAegzQAJgPgGgLQgNgWg/gNQhAgNhqgBg");
	this.shape_4.setTransform(698.2433,68.4875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BCA895").s().p("AiyAfQgPgEgFgOQgFgNAIgNIAMgQQALgQARgJQASgKAUAAIA+AAQDhACAbAxQAIAOgKATQgcAuhrAAQhgAAiOgjgAh1g5QgSAAgQAIQgQAJgLAPIgLAQQgHAJAEALQAEALAMADQBrAaBVAGQCOALAfgzQAJgPgHgLQgMgWhAgNQhAgNhqgBg");
	this.shape_5.setTransform(1022.5649,68.4875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BCA895").s().p("AjOAZQgSgDgFgMQgGgKAJgKIAOgNQAbgcAxgBIBIAAQEEACAgAoQAKALgNAPQggAlh8AAQhrgBiogbgAiIguQgVAAgTAHQgSAHgMAMIgNANQgIAHAFAIQAEAJAOACQB7AWBjAEQClAJAjgoQALgNgIgJQgdgkkAgCg");
	this.shape_6.setTransform(738.3013,89.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BCA895").s().p("AjcAmQgTgFgGgRQgHgQALgQIAOgUQAOgUAWgMQAVgLAZgBIBNAAQB0ABBNANQBkAQATAiQAKASgOAXQghA4iFAAQh4AAiugrgAi7g9QgUALgNASIgOAUQgIAMAFANQAGAOANADQCDAhBqAIQCxANAlg/QAMgTgIgOQgQgchOgPQhPgPiEgCIhNAAQgWABgUAKg");
	this.shape_7.setTransform(1031.5639,87.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#BCA895").s().p("AkoBTQgagEgLgXQgLgYANgWIAQgdQARgdAcgSQAcgSAhgEQA7gHAvgDQF8gfA1BOQARAYgQAhQgnBRi2ARQgvAEg3AAQiCAAiugZgAhmhXIhqAKQgeADgaARQgaARgPAbIgQAcQgKASAIASQAJASAUADQC2AbCTgDQDygFAshaQANgagNgUQgZgjhtgLQgvgFg8AAQhQAAhmAJg");
	this.shape_8.setTransform(678.1554,89.5919);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BCA895").s().p("AknBTQgagEgLgYQgLgXAMgXIARgcQAQgdAcgSQAcgSAhgEQA1gGA1gFQCfgNBqAIQCKAJAeAsQARAZgQAgQgnBQi1ASQgwAEg3AAQiCAAitgZgAhmhXIhpAKQgfADgZARQgaARgPAbIgRAcQgKASAJARQAJATATACQC4AcCSgDQDygFArhaQANgbgNgTQgYgjhugLQgvgFg8AAQhQAAhmAJg");
	this.shape_9.setTransform(1098.9429,99.8834);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#BCA895").s().p("AknBSQgagEgLgXQgMgXANgXIARgcQAQgdAcgSQAcgTAhgEIBqgKQF7geA2BOQARAYgQAhQgnBRi1AQQgyAFg4AAQiEAAiogagAhmhYIhqALQgeADgaARQgZARgQAbIgQAcQgLARAKASQAIASAUADQC4AcCSgDQDxgFAshaQANgbgNgTQgYgjhugLQgvgFg9AAQhPAAhmAIg");
	this.shape_10.setTransform(1178.224,37.5523);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BCA895").s().p("AknBTQgagEgLgYQgLgXAMgXIARgcQAQgdAcgSQAcgSAhgEQA1gGA1gFQCfgNBqAIQCKAJAeAsQARAZgQAgQgnBQi1ASQgwAEg3AAQiCAAitgZgAhmhXIhpAKQgfADgaARQgZARgQAbIgQAcQgKASAJARQAJATATACQC4AcCSgDQDxgFAshaQANgagNgUQgYgjhugLQgvgFg9AAQhPAAhmAJg");
	this.shape_11.setTransform(959.4929,66.0334);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#BCA895").s().p("AimAdQgNgDgGgOQgFgNAJgLIAKgPQALgPAQgJQAQgJATAAIA6AAQDSACAZAuQAJANgLASQgZAqhlAAQhcAAiCgggAimgYIgKAPQgHAJAEAKQAEAKALADQBjAYBQAGQCFAKAdgwQAIgOgGgKQgLgVg8gLQg8gMhjgBIg6AAQgkABgVAdg");
	this.shape_12.setTransform(742.7427,73.5125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BCA895").s().p("AimAdQgOgDgFgOQgFgMAIgMIALgPQAKgQARgIQAQgJASAAIA7gBQDSAEAZAtQAIAOgKAQQgaArhkABQhYgBiGgggAimgYIgLAQQgGAIAEAKQAEAKALADQBjAZBQAFQCFAKAcgvQAJgOgGgLQgMgUg7gMQg8gMhjgBIg6AAQgkABgVAdg");
	this.shape_13.setTransform(787.7646,89.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#BCA895").s().p("AimAdQgOgDgFgOQgFgMAIgMIALgPQAKgPARgJQAQgJASAAIA7AAQDSACAZAuQAJANgLASQgZAqhlAAQhdAAiBgggAhtg2QgRABgPAIQgQAHgJAOIgLAPQgGAJAEAKQAEAKALADQBjAYBQAGQCFAKAcgvQAJgPgGgKQgLgVg8gLQg8gMhjgBg");
	this.shape_14.setTransform(847.5772,87.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BCA895").s().p("AkOAvQgWgGgJgVQgIgVAOgTIARgZQARgYAagOQAbgOAegBIBfAAQCOABBeAPQB7AUAXAqQANAWgRAcQgpBFikAAQiRAAjXg0gAjmhLQgYANgQAXIgRAZQgLAOAHAQQAGAQASAFQCgAoCDAJQDYAQAuhNQAOgXgKgRQgSgihhgSQhhgTihgCIhfAAQgcABgYAMg");
	this.shape_15.setTransform(892.5578,73.5125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#BCA895").s().p("AkOAvQgWgGgJgVQgIgVAOgTIARgZQARgYAagOQAbgOAegBIBfAAQCOABBeAPQB7AUAXAqQANAWgRAcQgpBFikAAQiRAAjXg0gAjmhLQgYANgQAXIgRAZQgLAOAHAQQAGAQASAFQCgAoCDAJQDYAQAuhNQAOgXgKgRQgSgihhgSQhhgTihgCIhfAAQgcABgYAMg");
	this.shape_16.setTransform(1014.5578,47.5125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#BCA895").s().p("AjSAzQgHgDgFgMQgEgLgBgQQgBghAPgLQAzgnCRADQBiABCGAVQAMACABAZQAAAMgDAIQgDAHgFACQjABCh8AAQhFAAgqgWgAjSgVQgLAIABAVQAAAXALAFQBGAjCLgXQBhgQB2goQAGgCgBgLQAAgLgFgCQiGgUhhgCIgSgBQiBAAgvAkg");
	this.shape_17.setTransform(773.2219,61.9424);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#BCA895").s().p("AjSA0QgHgEgFgLQgEgMgBgQQAAgOAEgNQAEgMAHgFQAygnCRADQBkABCFAVQAFABADAIQAEAHAAALQAAAMgDAIQgDAHgFACQi9BCh+AAQhGAAgqgVgAjSgUQgKAHAAAWQABAXAKAEQBGAjCLgWQBggQB4goQAFgCAAgMQAAgMgGAAQiEgVhjgCIgSAAQiBAAgvAkg");
	this.shape_18.setTransform(813.3758,76.7924);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BCA895").s().p("AjSAYQgQgEgBgQQAAgGAEgGQAEgFAGgDQBYgeFUAYQAMABABALQAAALgLACQi/Afh8AAQhFAAgrgKgAjSgJQgLAEABAJQABAKAKADQB6AcEugwQAGgBAAgFQgBgGgFAAQiXgLhkAAQh+AAgwARg");
	this.shape_19.setTransform(853.5722,51.8716);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#BCA895").s().p("AjSAYQgQgEgBgQQgBgPAQgFQBXgeFVAYQAMABAAALQABALgMACQi/Afh8AAQhFAAgrgKgAjSgJQgKADAAAKQABAKAKADQB7AcEugwQAFgBAAgFQAAgGgGAAQiXgLhkAAQh+AAgwARg");
	this.shape_20.setTransform(856.7258,99.8716);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#BCA895").s().p("AklAhQgLgCgGgIQgGgHgBgKQAAgJAFgIQAFgIAKgEQBHgZDKACQCMABC4AOQAHAAAFAFQAFAFABAHQAAAHgFAGQgEAEgHABQkMArisAAQhfAAg8gOgAklgNQgPAFABANQAAAPAPADQBiAXDCgPQCHgKClgaQAHgBABgHQgCgIgGAAQi4gOiLgBIgeAAQiwAAhAAXg");
	this.shape_21.setTransform(993.5002,99.8676);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#BCA895").s().p("AkmAhQgJgCgHgHQgGgIgBgKQAAgJAFgIQAGgIAJgDQB6grHbAiQAIABAFAEQAEAFAAAIQABAPgQADQkLAqitAAQhgAAg8gOgAklgNQgPAFABAOQABAOAPAEQBhAWDCgOQCIgLCkgZQAIgCgBgHQAAgIgHAAQi6gNiJgCIgXAAQi2AAhBAXg");
	this.shape_22.setTransform(1089.7508,4.6867);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#BCA895").s().p("AkmAhQgJgCgHgIQgGgHgBgKQAAgJAFgIQAGgIAJgEQBHgZDKACQCMABC4AOQAIAAAFAFQAEAFAAAHQABAHgFAGQgEAEgHABQkLAritAAQhgAAg8gOgAklgNQgPAFABANQABAPAPADQBhAXDCgPQCIgKCkgaQAIgBgBgHQAAgIgHAAQi4gOiLgBIgeAAQiwAAhAAXg");
	this.shape_23.setTransform(746.8004,104.5676);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#BCA895").s().p("AhiAUQgHgDgBgNQAAgNAHgEQAYgPBEABQAvABA9AIQAFAAABAKQAAAJgFACQhZAZg7AAQggAAgUgIgAhigHQgEACgBAIQAAAJAGACQA4AXCOgnQACgBAAgFQABgEgDAAQg9gIgvgBIgIAAQg9AAgWAOg");
	this.shape_24.setTransform(1168.75,74.7219);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#BCA895").s().p("AhiAUQgHgEgBgNQAAgMAHgEQApgaCfAUQAGABAAAKQABAIgGACQhaAag5AAQghAAgUgIgAhigIQgFAEABAHQAAAJAFACQA5AXCNgoQADAAAAgFQAAgEgDgBQhHgIguAAQg7AAgXANg");
	this.shape_25.setTransform(1114.3321,83.1604);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#BCA895").s().p("AhiAiQgIgFAAgXQgBgVAIgIQAYgaBEACQAuABA+AOQAGABAAARQABAPgGADQhbAsg5AAQggAAgUgOgAhigOQgFAHABAMQAAAPAFAEQAhAXBAgPQAtgKA4gbQADgBAAgIQgBgIgCAAQg/gOgtgBIgIAAQg9AAgWAXg");
	this.shape_26.setTransform(1128.5263,75.5179);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#BCA895").s().p("AijAhQgMgFgBgWQgBgVAMgHQBEgrEJAiQAJABAAAQQABAIgDAFQgCAEgEABQiUArhhAAQg2AAghgOgAijgNQgIAFAAAOQABAPAIACQBcAnDuhCQAEgCAAgHQAAgHgFgBQh1gPhOAAQhiAAglAXg");
	this.shape_27.setTransform(1082.8253,81.2867);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#BCA895").s().p("Ai1AhQgNAAgCgNQgBgNAMgDQBrgbBTgJQB5gMA2AfQAUAMgDAJQgJAcjXAAQg1AAhlgDgAi3AIQgJACABAJQABAJAJABQCrAFBigGQBkgGAEgQQACgGgQgJQgmgWhJAAQhjAAiXAng");
	this.shape_28.setTransform(718.3412,54.6724);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#BCA895").s().p("AkJAwQgTAAgDgTQgBgIAEgGQAFgHAJgDQCbgoB6gMQCxgSBPAuQAdARgFANQgMAqk7AAQhdAAiEgFgAkNAMQgNADACANQABAGADADQAEAEAHABQD6AICQgJQCRgIAHgYQADgJgYgNQg3gghrAAQiSAAjdA5g");
	this.shape_29.setTransform(830.7702,63.5719);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#BCA895").s().p("AkJAwQgTAAgDgTQgBgIAEgGQAFgHAJgDQCbgoB6gMQCxgSBPAuQAdARgFANQgMAqk7AAQhdAAiEgFgAkNAMQgNADACANQABAGADADQAEAEAHABQD6AICQgJQCRgIAHgYQADgJgYgNQg3gghrAAQiSAAjdA5g");
	this.shape_30.setTransform(797.7702,47.5219);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#BCA895").s().p("AEWBPIg4gDQBzAAAIgbQAEgPgkgVQgRgKgGgNIAcAOQArAagHAVQgFASgRAGQgOAEghAAIgHAAgAARBHQiFAAjOgHQgOAAgJgJQgIgJgBgLQgBgMAFgJQAHgLANgDQC5gwCDgJQiNAWisAsQgKADgEAHQgEAHABAIQABAIAFAGQAGAGAKAAQDWAHDfALIhigBgAALg7IgZACQCGgVBrAAQA1AAADAhQADAZABAFIADAFQhzg3ikAGg");
	this.shape_31.setTransform(1176.36,105.4773);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#BCA895").s().p("AmRBJQgOAAgJgJQgIgIgBgMQgBgMAFgJQAHgLANgEQBYgWBRgRQCHgdB0gLQEGgbB4BDIAEACQArAagGAUQgTA/ncAAQiGAAjOgHgAi+gfQhlAUhzAdQgKADgEAHQgEAHABAIQABAIAFAGQAGAGAKAAQF5ANDbgNQDbgNAKgkQAEgOgkgUIgVgLQhSgmiNAAQiRAAjBAmg");
	this.shape_32.setTransform(918.2794,105.9723);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#BCA895").s().p("AmRBJQgOAAgJgJQgIgIgBgMQgBgMAFgJQAHgLANgEQDqg9C6gSQEMgbB2BFQArAagGAUQgSA/ndAAQiGAAjOgHgAmWASQgKADgEAHQgEAHABAIQABAIAFAGQAGAGAKAAQF6ANDagNQDbgNAKgkQAEgOgkgUQhTgxihAAQjbAAlPBXg");
	this.shape_33.setTransform(947.785,87.2223);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#BCA895").s().p("AhfARQgIgCgDgIQgDgHAFgGIAGgJQANgSAXgBIAhAAQB5ABAOAbQAFAHgGAKQgPAYg6AAQg2AAhJgSgAhfgNIgGAJQgDAEABAGQACAFAHACQA4AOAvAEQBMAFARgbQAFgIgEgGQgNgYh3gCIghAAQgWABgLARg");
	this.shape_34.setTransform(512.7364,46.075);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#BCA895").s().p("AhfARQgIgDgDgHQgDgHAFgHIAGgIQAMgSAXgBIAiAAQB4ABAPAaQAFAIgGAKQgPAYg6AAQgwAAhPgSgAhfgNIgGAJQgEAEACAGQACAGAHABQA6AOAtAEQBMAFARgbQAEgIgDgGQgNgYh3gCIgiAAQgUABgMARg");
	this.shape_35.setTransform(500.6768,26.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#BCA895").s().p("Ah2AVQgKgDgDgJQgEgJAGgIIAHgLQAQgWAcgBIAqAAQCVABASAhQAGAJgIANQgSAehHAAQhAAAhegXgAhOgmQgZAAgPAWIgIAKQgEAHADAGQADAHAHADQBHARA5AEQBeAHAUgiQAHgKgFgHQgRgeiSgCg");
	this.shape_36.setTransform(505.5233,36.7375);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#BCA895").s().p("AieASQgMgEAAgLQgBgLAMgEQA/gWECARQAJABAAAJQABAIgJABQiVAXhYAAQgxAAgjgHgAidgHQgIADAAAHQABAHAIACQBZAVDlgjQAFgBgCgEQAAgEgEAAQhxgIhLAAQheAAgkAMg");
	this.shape_37.setTransform(485.026,43.5672);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#BCA895").s().p("AjYAoQgHgBgFgFQgEgEgBgGQgBgGADgGQAEgFAHgCQB+ghBjgKQCRgOA/AlQAXAOgDAKQgJAikBAAQhdAAhagDgAjaAKQgLACABALQACALAKAAQDLAHB2gHQB2gHAFgTQACgIgTgKQgugbhWAAQh4AAixAvg");
	this.shape_38.setTransform(444.5548,46.8228);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#BCA895").s().p("AixAfQgPgDgGgPQgFgNAJgNIALgQQALgQASgKQARgJAUAAIA/gBQDgAEAbAwQAJAOgLATQgcAuhrAAQhkAAiJgjgAh1g6QgSABgQAIQgQAJgLAPIgLAQQgHAJAEALQAFALALADQBqAaBWAGQCPALAegzQAJgQgGgLQgNgWg/gMQhAgNhqgBg");
	this.shape_39.setTransform(416.5433,94.975);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#BCA895").s().p("AiyAfQgPgEgFgOQgGgNAJgNIAMgQQALgQARgKQASgJATAAIA/AAQDgACAcAxQAJAOgMATQgbAuhsAAQhfAAiOgjgAiXgxQgRAJgKAPIgLAQQgHAJAEALQAEALAMADQBrAaBVAGQCOALAfgzQAJgQgHgLQgMgWhAgMQhAgNhqgBIg+AAQgSABgQAIg");
	this.shape_40.setTransform(187.6013,101.5375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#BCA895").s().p("AiyAfQgPgDgFgPQgFgNAIgNIAMgQQALgQASgJQARgKAUAAIA+AAQDhABAbAyQAJAPgLASQgbAthsAAQhgAAiOgigAh1g6QgSABgQAIQgQAJgLAOIgLARQgHAJAEALQAEALAMADQBoAZBYAHQCOALAfgzQAJgPgGgLQgNgXhAgMQg/gMhrgCg");
	this.shape_41.setTransform(69.7772,58.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#BCA895").s().p("AiyAfQgPgEgFgOQgFgNAIgNIAMgQQALgQARgKQASgJAUAAIA+AAQBeABA+AKQBRANAPAbQAJAOgMATQgbAuhrAAQhgAAiOgjgAiXgxQgRAJgKAPIgLAQQgHAJAEALQAEAKAMAEQBrAaBVAGQCOALAfgzQAJgPgHgMQgMgWhAgMQhAgNhqgBIg+AAQgSABgQAIg");
	this.shape_42.setTransform(1135.363,18.5375);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#BCA895").s().p("AiyAfQgPgEgFgOQgFgNAIgNIAMgQQALgQASgKQARgJAUAAIA+AAQDhACAbAxQAJAPgLASQgcAuhrAAQhgAAiOgjgAiXgxQgQAJgLAPIgLAQQgHAJAEALQAEALAMADQBrAaBVAGQCOALAfgzQAJgQgGgLQgNgWhAgMQhAgNhqgBIg+AAQgSABgQAIg");
	this.shape_43.setTransform(1104.9272,40.9375);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#BCA895").s().p("AixAfQgPgDgGgPQgFgNAJgNIALgQQALgQASgJQARgKAUAAIA/AAQDgABAcAyQAIAOgLATQgbAthsAAQhfAAiOgigAh1g6QgSABgQAIQgQAJgKAOIgMARQgHAJAFALQAEALALADQBpAZBXAHQCPALAegzQAJgQgGgKQgNgXg/gMQhAgMhqgCg");
	this.shape_44.setTransform(394.0891,58.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#BCA895").s().p("AjNAZQgRgDgHgLQgGgLAKgKIANgNQANgNAVgIQAUgHAXAAIBIAAQEEACAfAnQAKALgNAPQgfAkh9AAQhyABiggcgAjNgUIgOANQgHAHAEAIQAGAKANACQB6AVBkAFQClAIAjgoQALgNgIgJQgPgRhJgKQhKgKh7gBIhIAAQgtABgZAZg");
	this.shape_45.setTransform(109.7931,80);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#BCA895").s().p("AjbAmQgSgEgIgSQgGgRALgPIAOgUQAOgUAVgMQAWgLAYgBIBOAAQEWAEAhA8QAKASgNAXQgiA4iFAAQh5AAisgrgAi7g9QgUALgNASIgOAVQgIALAFANQAFAOAPADQCCAhBrAIQCwANAmg/QALgTgIgOQgPgchPgPQhPgPiDgCIhOAAQgWABgUAKg");
	this.shape_46.setTransform(403.084,77.6375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#666666").s().p("Al3BzQgZgEgMgYQgLgXANgXIAQgdQAPgZBtgrQBkgnAogFQAigEBIgGQCfgNBqAIQCKAJAeAsQARAYgQAhQgnBRi1AQIhTAHQD+gdAnhPQANgcgNgTQgYgjhugLQhtgLi0AOIhpALQgmAEhiAmQhqApgOAXIgRAdQgJASAIARQAJATAUACQA3AIBuACQA9ABA6gBQBkgGBggIIhIAHQg8AFhAACIgUABQhqAFhEAAQg+AAgegEg");
	this.shape_47.setTransform(41.7804,81.1384);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#BCA895").s().p("AknBTQgagEgLgYQgMgXANgWIARgdQAQgdAcgSQAcgSAhgEIBqgLQF7geA2BOQARAZgQAgQgnBRi1ARQgwAEg3AAQiCAAitgZgAhmhXIhqAKQgeADgaARQgZARgQAbIgQAcQgLASAKASQAIASAUADQC3AbCTgDQDxgFAshaQANgbgNgTQgYgjhugLQgvgEg9AAQhPAAhmAIg");
	this.shape_48.setTransform(470.474,90.2669);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#BCA895").s().p("AknBTQgagEgMgYQgLgXANgXIARgcQAQgdAcgSQAcgSAhgEIBqgLQCfgNBpAIQCLAJAeAsQARAYgQAhQgnBRi1ARQgwAEg3AAQiDAAisgZgAhmhXIhqAKQgeADgaARQgZARgQAbIgQAcQgKASAIASQAKASATADQC6AbCQgDQDxgFAshaQANgbgNgTQgYgjhugLQgvgFg8AAQhQAAhmAJg");
	this.shape_49.setTransform(331.0114,56.4334);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#BCA895").s().p("AimAdQgOgDgFgOQgFgMAIgMIALgPQALgPAQgJQAQgJATAAIA6AAQDSACAZAuQAJANgLASQgZAqhlAAQhdAAiBgggAhtg2QgRABgPAIQgPAIgKANIgLAPQgGAJAEAKQADAKAMADQBjAYBQAGQCFAKAcgvQAJgPgGgKQgLgVg8gLQg8gMhjgBg");
	this.shape_50.setTransform(114.2891,63.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#BCA895").s().p("AimAdQgNgDgGgOQgFgNAJgLIAKgPQALgPAQgJQAQgJATAAIA6AAQDSACAZAuQAIANgKASQgaAqhkAAQhXAAiHgggAimgYIgKAPQgHAJAEAKQAEAKALADQBjAYBQAGQCFAKAdgwQAIgOgGgKQgLgVg8gLQg8gMhjgBIg6AAQgkABgVAdg");
	this.shape_51.setTransform(159.2804,80.0125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#BCA895").s().p("AimAdQgNgEgGgNQgFgNAJgLIAKgPQALgPAQgJQAQgJATAAIA6AAQDSACAaAuQAHANgKASQgaAqhkAAQhZAAiFgggAhtg2QgkABgVAdIgKAQQgHAIAEAKQAEAKALADQBlAYBOAGQCFAKAdgvQAIgOgGgLQgLgUg8gMQg7gMhkgBg");
	this.shape_52.setTransform(219.0931,77.625);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#BCA895").s().p("AiPAVQgLgCgFgKQgEgJAHgIIAJgLQATgYAiAAIAygBQC0ACAWAiQAHAJgJANQgWAfhWAAQhRAAhugYgAhegnQgfAAgSAWIgJALQgGAGAEAHQAEAIAJACQBUASBGAEQByAHAZgiQAHgLgFgHQgUgfiygCg");
	this.shape_53.setTransform(130.5054,32.625);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#BCA895").s().p("AkOAvQgXgFgIgWQgIgUANgUIASgZQARgYAagOQAbgOAdgBIBgAAQCPACBdAPQB6AUAYApQANAWgRAdQgqBFijAAQiSAAjWg1gAiyhYQgcABgYANQgYANgQAWIgRAZQgLAOAHAQQAGARARAEQCiAoCCAKQDYAQAuhOQAOgXgKgRQgTgihggSQhhgTiigCg");
	this.shape_54.setTransform(1155.4543,90.7917);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#BCA895").s().p("AhpBRQhTgOhSgUQgWgFgJgWQgIgVANgTIASgZQARgYAagOQAbgOAdgBIBgAAQCNABBfAPQB6AUAYAqQANAWgRAcQgpBFikAAQhUAAhvgSgAjmhLQgZANgPAXIgRAZQgLAOAHAQQAGARARAEQChAoCDAJQDYAQAuhNQAOgXgKgRQgTgihggSQhhgTiigCIheAAQgcABgYAMg");
	this.shape_55.setTransform(264.1043,63.9125);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#BCA895").s().p("AhpBRQhTgOhSgUQgWgFgJgWQgIgVANgTIASgZQARgYAagOQAbgOAdgBIBgAAQCNABBfAPQB6AUAYAqQANAWgRAcQgpBFikAAQhUAAhvgSgAjmhLQgZANgPAXIgRAZQgLAOAHAQQAGARARAEQChAoCDAJQDYAQAuhNQAOgXgKgRQgTgihggSQhhgTiigCIheAAQgcABgYAMg");
	this.shape_56.setTransform(386.1043,37.9125);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#BCA895").s().p("AjSAzQgHgDgFgMQgEgLgBgQQAAgOAEgNQAEgMAHgFQAygnCRADQBkABCFAVQAFABADAIQAEAHAAALQAAAMgDAIQgDAHgFACQjABCh7AAQhGAAgqgWgAjSgVQgKAIABAVQAAAXAKAFQBGAjCLgXQBhgPB3gpQAFgBAAgMQAAgMgGAAQiEgVhjgCIgVAAQh+AAgvAjg");
	this.shape_57.setTransform(144.7258,52.3424);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#BCA895").s().p("AjSAzQgHgDgFgMQgEgLgBgQQAAgPAEgMQAEgMAGgFQAzgnCRADQBiABCHAVQAFABADAHQAEAIAAALQAAAMgDAIQgDAHgFABQi+BDh9AAQhFAAgrgWgAjSgVQgKAHAAAWQABAXAKAFQBGAjCLgXQBigQB2goQAFgCAAgLQAAgMgGgBQiGgUhhgCIgSgBQiBAAgvAkg");
	this.shape_58.setTransform(1184.2758,11.9924);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#BCA895").s().p("AiDAsQgHgEgFgLQgEgLgBgQQAAgPAEgMQAEgMAGgGQAugiBHAUQAUAGAwARQAvAPAmAGQAFABAEAHQADAHAAALQABALgDAIQgEAJgFABQg7AVgKABQgGABhRAAQhGAAgqgVgAiDgcQgKAHAAAWQABAWAKAGQBKAlA4gDQAogCBggiQAFgCAAgLQAAgMgFgBQgngFgugPQgwgRgUgGQgagHgWAAQgmAAgcAVg");
	this.shape_59.setTransform(1194.3008,79.958);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#BCA895").s().p("AjTAzQgHgEgEgLQgEgLgBgQQgBghAPgLQAzgnCRADQBiABCGAVQAMACABAZQAAAZgLAEQjABCh8AAQhFAAgrgWgAjSgVQgLAIABAVQAAAXALAFQBGAjCLgXQBhgQB2goQAGgCgBgLQAAgLgFgCQiGgUhhgCIgSgBQiBAAgvAkg");
	this.shape_60.setTransform(1155.4719,56.4424);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#BCA895").s().p("AjSAzQgHgDgFgMQgEgLgBgQQAAgOAEgNQAEgMAGgGQAzgmCRACQBkACCEAVQAFABAEAHQADAIABALQAAALgDAIQgDAIgFABQi+BDh9AAQhFAAgrgWgAjSgVQgLAIABAVQABAXAKAFQBGAjCLgXQBhgQB2goQAGgCAAgLQgBgMgFgBQiEgVhjgBIgSAAQiBAAgvAjg");
	this.shape_61.setTransform(184.9222,67.2174);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#BCA895").s().p("AjSAYQgHgCgFgFQgEgGgBgHQgBgPAQgFQBXgeFVAYQAFAAADAEQAEAEAAAFQAAAFgDAEQgDADgFAAQi+Afh9AAQhFAAgrgKgAjSgJQgKAEABAJQAAALAKACQB4AcExgwQAFgBAAgFQAAgGgGAAQiDgKhkAAIgVAAQh/AAguAQg");
	this.shape_62.setTransform(225.0755,42.2716);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#BCA895").s().p("AjSAYQgHgCgFgFQgEgGgBgHQAAgGAEgGQAEgFAGgDQBYgeFUAYQAMABABALQAAAFgDAFQgDADgFAAQi/Afh8AAQhFAAgrgKgAjSgJQgKAEAAAJQABAKAKADQB4AcEwgwQAGgBAAgFQgBgGgFAAQiDgKhkAAIgWAAQh+AAguAQg");
	this.shape_63.setTransform(228.2754,90.2716);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#BCA895").s().p("AkmAhQgJgCgHgIQgGgHgBgKQAAgJAFgIQAGgIAJgDQBHgZDKABQCNABC3AOQAIAAAFAFQAEAFAAAHQABAHgFAGQgDAEgIABQkEAri0AAQhfAAg9gOgAklgNQgPAFABANQABAPAPADQBhAXDCgPQCIgKCkgaQAIAAgBgIQAAgIgHAAQi2gOiNgBIgXAAQi2AAhBAXg");
	this.shape_64.setTransform(365.0004,90.2708);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#BCA895").s().p("AklAhQgKgCgHgIQgGgHgBgKQAAgJAFgIQAFgIAKgEQBHgZDKACQCMABC5AOQAGAAAFAFQAFAFAAAHQABAHgFAGQgEAEgHABQkMArisAAQhgAAg7gOgAklgNQgPAEABAOQAAAPAPADQBiAXDCgPQCHgKCmgaQAGgBAAgHQAAgIgHAAQi4gOiLgBIgeAAQiwAAhAAXg");
	this.shape_65.setTransform(1086.1002,67.2176);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#BCA895").s().p("AkmAhQgKgCgGgIQgGgHgBgKQAAgJAFgIQAFgIAKgEQBHgZDKACQCMABC4AOQAHAAAFAFQAFAFAAAHQABAHgFAGQgEAEgHABQkMArisAAQhgAAg8gOgAkmgNQgOAFABANQABAPAOADQBiAXDCgPQCIgKCkgaQAHgBAAgHQAAgIgHAAQi4gOiLgBIgdAAQixAAhBAXg");
	this.shape_66.setTransform(118.3504,94.9676);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#BCA895").s().p("AkmAhQgKgCgGgIQgGgHgBgKQAAgJAFgIQAFgIAKgEQBHgZDKACQCMABC5AOQAGAAAFAFQAFAFABAHQAAAHgFAGQgEAEgHABQkMArisAAQhgAAg8gOgAklgNQgOAEAAAOQAAAPAPADQBiAXDCgPQCHgKCmgaQAGgBAAgHQgBgIgGAAQi4gOiLgBIgeAAQiwAAhAAXg");
	this.shape_67.setTransform(459.7002,67.0176);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#BCA895").s().p("AkKAxQgJgBgGgGQgFgFgBgIQgBgIAEgGQAEgHAJgCQCcgoB6gNQCxgSBPAvQAcAQgEAOQgMApk7AAQhsAAh2gEgAkNAMQgMAEABANQACANANAAQD6AJCQgJQCRgJAHgXQACgKgYgNQg3gghqAAQiUAAjbA5g");
	this.shape_68.setTransform(71.3094,32.6238);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#BCA895").s().p("Ai1AhQgHAAgEgEQgDgEgBgFQgBgFADgFQADgEAGgCQBqgbBUgJQB5gMA2AgQATALgDAJQgIAcjXAAQg2AAhkgDgAi4AIQgIACABAJQABAJAJABQCrAFBigFQBjgGAFgQQACgHgQgJQgmgWhJAAQhjAAiYAng");
	this.shape_69.setTransform(89.8575,45.0744);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#BCA895").s().p("AkKAwQgJAAgGgGQgFgFgBgIQgBgIAEgGQAEgHAJgDQCcgoB6gMQCxgSBPAuQAcARgEANQgMAqk7AAQhdAAiFgFgAkNAMQgMADABANQACAOANAAQD6AICQgJQCRgIAHgYQACgJgYgNQg3gghqAAQiSAAjdA5g");
	this.shape_70.setTransform(202.3094,53.9719);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#BCA895").s().p("AkKAwQgJAAgGgGQgFgFgBgIQgBgIAEgGQAEgHAJgDQCcgoB6gMQCxgSBPAuQAcARgEANQgMAqk7AAQhdAAiFgFgAkNAMQgMADABANQACAOANAAQD5AICRgIQCRgJAHgYQACgJgYgNQg3gghqAAQiSAAjdA5g");
	this.shape_71.setTransform(169.3094,37.9219);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#BCA895").s().p("AmSBJQgOAAgIgJQgIgIgBgMQgBgMAFgJQAHgLANgEQDpg9C6gSQEMgbB3BFQArAZgGAVQgTA/ncAAQigAAi1gHgAmWASQgKADgFAHQgDAHABAIQABAIAFAGQAGAGAKAAQF5ANDbgNQDbgNAKgkQAEgOgkgUQhTgxiiAAQjdAAlMBXg");
	this.shape_72.setTransform(555.829,94.9723);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#BCA895").s().p("AmSBJQgOAAgIgJQgIgIgBgMQgBgMAFgJQAHgLANgEQDpg9C6gSQEMgbB3BFQArAZgGAVQgTA/ncAAQigAAi1gHgAmWASQgKADgFAHQgDAHABAIQABAIAFAGQAGAGAKAAQF5ANDbgNQDbgNAKgkQAFgOglgUQhUgxihAAQjdAAlMBXg");
	this.shape_73.setTransform(289.829,96.3723);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#BCA895").s().p("AmRBJQgOAAgJgJQgIgIgBgMQgBgMAFgJQAHgLANgEQDqg9C6gSQELgbB3BFQArAagGAUQgTA/ncAAQigAAi0gHgAmWASQgKADgEAHQgEAHABAIQABAIAFAGQAGAGAKAAQF5ANDbgNQDbgNAKgkQAEgOgkgUQhTgxihAAQjdAAlNBXg");
	this.shape_74.setTransform(319.3294,77.6223);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_11, new cjs.Rectangle(0,0,1212.1,117.7), null);


(lib.Group_10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag6BrQgEgCACgFIBxjMQADgEADACQAEADgCAEIhxDMQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAg");
	this.shape.setTransform(6.175,10.7417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_10, new cjs.Rectangle(0,0,12.4,21.5), null);


(lib.Group_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhUChQgEgCACgFICkk4QACgEAEACQAFACgDAFIijE4QgCADgDAAg");
	this.shape.setTransform(8.7116,16.1804);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_9, new cjs.Rectangle(0,0,17.5,32.4), null);


(lib.Group_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFCIQgFgDADgEICGkGQADgEAEACQAFACgDAEIiHEHQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAg");
	this.shape.setTransform(7.25,13.6525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_8, new cjs.Rectangle(0,0,14.6,27.3), null);


(lib.Group_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag2BoQgFgDACgEIBqjGQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAFACgDAFIhpDGQgBACgDAAg");
	this.shape.setTransform(5.8255,10.4167);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_7, new cjs.Rectangle(0,0,11.7,20.9), null);


(lib.Group_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag6BrQgEgCACgFIBxjMQACgEAEACQAEADgCAEIhxDMQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAg");
	this.shape.setTransform(6.1858,10.7054);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_6, new cjs.Rectangle(0,0,12.4,21.5), null);


(lib.Group_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhUChQgEgCACgEICkk5QABgEAFACQAFADgDAEIijE4QgCADgDAAg");
	this.shape.setTransform(8.7616,16.1417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_5, new cjs.Rectangle(0,0,17.5,32.3), null);


(lib.Group_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhFCIQgFgCADgFICGkGQACgEAFACQAFACgDAFIiHEGQgBACgDAAg");
	this.shape.setTransform(7.2616,13.6054);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_4, new cjs.Rectangle(0,0,14.6,27.3), null);


(lib.Group_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag3BoQgEgCACgFIBqjGQACgEAEACQAFADgDAEIhpDGQgBADgDAAg");
	this.shape.setTransform(5.8113,10.4417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_3, new cjs.Rectangle(0,0,11.7,20.9), null);


(lib.eyebrows = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250000").s().p("AEhBLQhxhch2g1Qh7g4iBgJQh9gJh+AoIglieQCegaCUAhQCPAfCDBTQB0BKBnBwQBjBvBCB2QhQhrhxhcg");
	this.shape.setTransform(97.1,0.0099);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#250000").s().p("Ak8AtQBnhwB1hKQCChTCPgfQCUghCdAaIgkCeQh+goh+AJQiAAJh8A4Qh1A1hxBcQhwBchSBrQBDh2Bjhvg");
	this.shape_1.setTransform(-96.05,0.0099);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#250000").s().p("AEhBLQhxhch1g1Qh8g4iAgJQh/gJh9AoIgkieQCdgaCUAhQCPAfCCBTQB1BKBnBwQBjBvBCB2QhRhrhwhcg");
	this.shape_2.setTransform(97.1,0.0099);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{y:0.0099}},{t:this.shape,p:{y:0.0099}}]}).to({state:[{t:this.shape_1,p:{y:-1.9901}},{t:this.shape,p:{y:-1.9901}}]},4).to({state:[{t:this.shape_1,p:{y:0.0099}},{t:this.shape_2}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.3,-29.4,289.70000000000005,56.9);


(lib.bell = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// OBJECTS
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F3CE2C").s().p("AKNB/QimgRjzgJQnlgTmXAjIgxAEIAFgwQACgRAHgaQANgzAYg5IAKgVIAXgDQCfgQDogIQHOgRF+ApIAXADIAJAVQANAcALAhQAUA9AAArIAAAtg");
	this.shape.setTransform(107.075,-31.7367);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F3CE2C").s().p("AhCAtQgcgcAAgmIAAgzIC9AAIAAAzQAAAmgcAcQgcAbgnAAQgmAAgcgbg");
	this.shape_1.setTransform(109.3,-17.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC9933").s().p("AplHwQAphVAqh5QBUjzAJi0QAJjMCChiQBvhVC7AAIBEgCQBSADBGAaQDgBQAQEPQAREOBGDTQAjBpAgA0QiTAPjiAHQiCAFh8AAQk5AAkfgbg");
	this.shape_2.setTransform(107.475,-87.5857);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DAB324").s().p("ApQAvQhfgmgKglQA+gYB2gXQDrgwEaAAQEbAADrA0QB2AbA+AaQgFAjhWAkQitBHmaAAQmqAAi+hNg");
	this.shape_3.setTransform(107.075,-16.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F3CE2C").s().p("AhaBbQgmglAAg2QAAg0AmgmQAlgmA1AAQA1AAAmAmQAmAmAAA0QAAA2gmAlQgmAmg1AAQg0AAgmgmgAgygyQgWAVAAAdQAAAeAWAWQAVAVAdAAQAeAAAVgVQAWgWAAgeQAAgdgWgVQgVgVgeAAQgdAAgVAVg");
	this.shape_4.setTransform(107.475,-139.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.3,-152.6,139.60000000000002,148.4);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.tlakingshoko2eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Symbol3();
	this.instance.setTransform(30.15,38.65,1,1,0,0,0,0,40.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:32.5,regY:40.3,x:62.15,y:38.7},0).wait(1).to({x:61.7,y:38.65},0).wait(1).to({x:61.25,y:38.6},0).wait(1).to({x:60.8,y:38.55},0).wait(1).to({x:60.3,y:38.45},0).wait(1).to({x:59.85,y:38.4},0).wait(1).to({x:59.4,y:38.35},0).wait(1).to({x:58.95,y:38.3},0).wait(1).to({x:58.5,y:38.2},0).wait(1).to({x:58,y:38.15},0).wait(1).to({x:57.55,y:38.1},0).wait(1).to({x:57.1,y:38.05},0).wait(1).to({x:56.65,y:38},0).wait(1).to({x:56.2,y:37.9},0).wait(1).to({x:55.7,y:37.85},0).wait(1).to({x:55.25,y:37.8},0).wait(1).to({x:54.8,y:37.75},0).wait(1).to({x:54.35,y:37.65},0).wait(1).to({x:53.85,y:37.6},0).wait(1).to({x:53.4,y:37.55},0).wait(1).to({x:52.95,y:37.5},0).wait(1).to({x:52.5,y:37.45},0).wait(1).to({x:52.05,y:37.35},0).wait(1).to({x:51.55,y:37.3},0).wait(1).to({x:51.1,y:37.25},0).wait(1).to({x:50.65,y:37.2},0).wait(1).to({x:50.2,y:37.1},0).wait(1).to({x:49.75,y:37.05},0).wait(1).to({x:49.25,y:37},0).wait(1).to({x:48.8,y:36.95},0).wait(1).to({x:48.35,y:36.9},0).wait(1).to({x:47.9,y:36.8},0).wait(1).to({x:47.4,y:36.75},0).wait(1).to({x:46.95,y:36.7},0).wait(1).to({x:46.5,y:36.65},0).wait(1).to({x:46.05,y:36.55},0).wait(1).to({x:45.6,y:36.5},0).wait(1).to({x:45.1,y:36.45},0).wait(1).to({x:44.65,y:36.4},0).wait(1).to({x:44.2,y:36.35},0).wait(1).to({x:43.75,y:36.25},0).wait(1).to({x:43.3,y:36.2},0).wait(1).to({x:42.8,y:36.15},0).wait(1).to({x:42.35,y:36.1},0).wait(1).to({x:41.9,y:36},0).wait(1).to({x:41.45,y:35.95},0).wait(1).to({x:40.95,y:35.9},0).wait(1).to({x:40.5,y:35.85},0).wait(1).to({x:40.05,y:35.75},0).wait(1).to({x:39.6,y:35.7},0).wait(1).to({x:39.15,y:35.65},0).wait(1).to({x:38.65,y:35.6},0).wait(1).to({x:38.2,y:35.55},0).wait(1).to({x:37.75,y:35.45},0).wait(1).to({x:37.3,y:35.4},0).wait(1).to({x:36.85,y:35.35},0).wait(1).to({x:36.35,y:35.3},0).wait(1).to({x:35.9,y:35.2},0).wait(1).to({x:35.45,y:35.15},0).wait(1).to({x:35,y:35.1},0).wait(1).to({x:34.5,y:35.05},0).wait(1).to({x:34.05,y:35},0).wait(1).to({x:33.6,y:34.9},0).wait(1).to({x:33.15,y:34.85},0).wait(1).to({x:32.7,y:34.8},0).wait(1).to({x:32.25,y:34.75},0).wait(1).to({x:31.8,y:34.65},0).wait(1).to({x:31.35,y:34.6},0).wait(1).to({x:30.9,y:34.55},0).wait(1).to({x:30.45,y:34.5},0).wait(1).to({x:29.95,y:34.45},0).wait(1).to({x:29.5,y:34.35},0).wait(1).to({x:29.05,y:34.3},0).wait(1).to({x:28.6,y:34.25},0).wait(1).to({x:28.1,y:34.2},0).wait(1).to({x:27.65,y:34.1},0).wait(1).to({x:27.2,y:34.05},0).wait(1).to({x:26.75,y:34},0).wait(1).to({x:26.3,y:33.95},0).wait(1).to({x:25.8,y:33.9},0).wait(1).to({x:25.35,y:33.8},0).wait(1).to({x:24.9,y:33.75},0).wait(1).to({x:24.45,y:33.7},0).wait(1).to({x:24,y:33.65},0).wait(1).to({x:23.5,y:33.55},0).wait(1).to({x:23.05,y:33.5},0).wait(1).to({x:22.6,y:33.45},0).wait(1).to({x:22.15,y:33.4},0).wait(1).to({x:21.65,y:33.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.8,-7,106.1,86);


(lib.tlakingshoko1eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Symbol2();
	this.instance.setTransform(37.15,40.2,1,1,0,0,0,0,40.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:32.5,regY:40.3,x:69.95,y:40.15},0).wait(1).to({x:70.3,y:40},0).wait(1).to({x:70.65,y:39.8},0).wait(1).to({x:71,y:39.65},0).wait(1).to({x:71.35,y:39.5},0).wait(1).to({x:71.7,y:39.3},0).wait(1).to({x:72.05,y:39.15},0).wait(1).to({x:72.4,y:39},0).wait(1).to({x:72.75,y:38.8},0).wait(1).to({x:73.1,y:38.65},0).wait(1).to({x:73.45,y:38.45},0).wait(1).to({x:73.8,y:38.3},0).wait(1).to({x:74.15,y:38.15},0).wait(1).to({x:74.5,y:37.95},0).wait(1).to({x:74.85,y:37.8},0).wait(1).to({x:75.2,y:37.65},0).wait(1).to({x:75.55,y:37.45},0).wait(1).to({x:75.9,y:37.3},0).wait(1).to({x:76.25,y:37.1},0).wait(1).to({x:76.6,y:36.95},0).wait(1).to({x:76.95,y:36.8},0).wait(1).to({x:77.3,y:36.6},0).wait(1).to({x:77.65,y:36.45},0).wait(1).to({x:78,y:36.3},0).wait(1).to({x:78.35,y:36.1},0).wait(1).to({x:78.7,y:35.95},0).wait(1).to({x:79.05,y:35.75},0).wait(1).to({x:79.4,y:35.6},0).wait(1).to({x:79.75,y:35.45},0).wait(1).to({x:80.05,y:35.25},0).wait(1).to({x:80.4,y:35.1},0).wait(1).to({x:80.75,y:34.95},0).wait(1).to({x:81.1,y:34.75},0).wait(1).to({x:81.45,y:34.6},0).wait(1).to({x:81.8,y:34.45},0).wait(1).to({x:82.15,y:34.25},0).wait(1).to({x:82.5,y:34.1},0).wait(1).to({x:82.85,y:33.9},0).wait(1).to({x:83.2,y:33.75},0).wait(1).to({x:83.55,y:33.6},0).wait(1).to({x:83.9,y:33.4},0).wait(1).to({x:84.25,y:33.25},0).wait(1).to({x:84.6,y:33.1},0).wait(1).to({x:84.95,y:32.9},0).wait(1).to({x:85.3,y:32.75},0).wait(1).to({x:85.65,y:32.55},0).wait(1).to({x:86,y:32.4},0).wait(1).to({x:86.35,y:32.25},0).wait(1).to({x:86.7,y:32.05},0).wait(1).to({x:87.05,y:31.9},0).wait(1).to({x:87.4,y:31.75},0).wait(1).to({x:87.75,y:31.55},0).wait(1).to({x:88.1,y:31.4},0).wait(1).to({x:88.45,y:31.2},0).wait(1).to({x:88.8,y:31.05},0).wait(1).to({x:89.15,y:30.9},0).wait(1).to({x:89.5,y:30.7},0).wait(1).to({x:89.85,y:30.55},0).wait(1).to({x:90.2,y:30.4},0).wait(1).to({x:90.5,y:30.2},0).wait(1).to({x:90.85,y:30.05},0).wait(1).to({x:91.2,y:29.9},0).wait(1).to({x:91.55,y:29.7},0).wait(1).to({x:91.9,y:29.55},0).wait(1).to({x:92.25,y:29.35},0).wait(1).to({x:92.6,y:29.2},0).wait(1).to({x:92.95,y:29.05},0).wait(1).to({x:93.3,y:28.85},0).wait(1).to({x:93.65,y:28.7},0).wait(1).to({x:94,y:28.55},0).wait(1).to({x:94.35,y:28.35},0).wait(1).to({x:94.7,y:28.2},0).wait(1).to({x:95.05,y:28},0).wait(1).to({x:95.4,y:27.85},0).wait(1).to({x:95.75,y:27.7},0).wait(1).to({x:96.1,y:27.5},0).wait(1).to({x:96.45,y:27.35},0).wait(1).to({x:96.8,y:27.2},0).wait(1).to({x:97.15,y:27},0).wait(1).to({x:97.5,y:26.85},0).wait(1).to({x:97.85,y:26.65},0).wait(1).to({x:98.2,y:26.5},0).wait(1).to({x:98.55,y:26.35},0).wait(1).to({x:98.9,y:26.15},0).wait(1).to({x:99.25,y:26},0).wait(1).to({x:99.6,y:25.85},0).wait(1).to({x:99.95,y:25.65},0).wait(1).to({x:100.3,y:25.5},0).wait(1).to({x:100.65,y:25.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-15,96.10000000000001,95.6);


(lib.talkingmouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Symbol6();
	this.instance.setTransform(-423.75,171.15,1,1,0,0,0,170.1,98.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({y:176.85},0).wait(3).to({y:192.7},0).wait(3).to({y:204},0).wait(3).to({y:188.15},0).wait(3).to({y:172.3},0).wait(3).to({y:158.7},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-596.8,57.5,346.09999999999997,247.7);


(lib.street = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// רחוב
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,0,0,0.996)").s().p("AASBEIgBABIABAAIgdgDIAAgCIgBgDIgBgBIAAgBIABABIAAgHIgBgCIAAAAIABgBIgDABIAAgBIABAAIgBgCQABABAAAAQAAAAAAAAQAAAAAAAAQABAAAAgBIAAgTIACAAIgBgBIAAABQgCgCgCgKIAAABIgBgEIAAABIABgCIAAAAIAAgDIgBABIAAgCIABAAIgBgCQAAAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQAAABAAAAIgBgEIgBgDIABgBIgBAAIABgBIABgBIAAgCIgCACQgBgHACgNQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBIAAgBIgBAAIAAgBIABgBIAAgBIgBgCIAAgBIABgBIgBAAIgBgIIABgBIAAgFIAAAAIABgQIACgCIgBgBIAAgBIABAAIAAABIAAgBIAAgBIABAAQADgCANABIAOABIgCACQABACgCAGIABAEIgBAAIABAFQAAABAAAAQABABAAAAQAAAAAAAAQABAAAAAAIgBADIABAAIgBAOQAAAEABACIgBAKIAAALIABADQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIgBADIACAaIABAYIABABIgBADIABAAIgBACQAAABAAAAQAAABAAAAQAAABAAAAQAAABABABIgBAAIABACIgBABIAAABQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAAAAAAAg");
	this.shape.setTransform(-263.075,42.07);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(102,0,0,0.996)").s().p("AgrATIgFABIAAgBIgRgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAIgCABIAAAAIgBAAQABAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIACAAQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAAAgBABIAAAAIAAgBQgEgFACgZIABAAIACACIAIABIAFgBIAAABIAFgCIAAABQABAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAgBIABABIACAAIAPAAIAAAAQAEAAACgBQACABAJAAIALgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIAAgBIAEAAIAbgBIAZgBIABgBIADABIAAgBIADAAIACAAIACAAIAAAAIACAAIABABIACAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQABABAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAIAAgBIAAAAIgDAdIgCAAIgDABQAAAAAAABQgBAAAAAAQAAAAAAAAQAAAAAAABIgBgBIABgBIgHAAQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAABIAAgBIgCAAIABACIgBABIAAgBIgBABIgBgCIgUAAIAAgBIABgCIgCABIABABQgBABgLADIABAAIgEABIABAAIgDgBIABAAQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIgBgBIgBABQAAgBAAAAQgBAAAAAAQAAAAAAAAQgBAAAAABIAAAAQAAAAAAAAQgBAAAAAAQgBAAAAABQgBAAgBAAIgDAAIAAAAIgBABIgBgBIgBgBIgCAAIACACQgHABgOgCQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAgBAAIgBAAIAAABIgBAAIgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAAAgBQAAAAAAAAQAAAAgBgBIAAACIgJAAgAA8gTIAAAAg");
	this.shape_1.setTransform(-263.2981,35.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2C549").s().p("AlbgSIAAh2IK3CdIAAB1g");
	this.shape_2.setTransform(-284.2716,-57.55,1.1322,1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(242,197,73,0.996)").s().p("AgXAAIAqgEQAFAAAAAEQAAAFgFAAg");
	this.shape_3.setTransform(-281.815,53.6,1.2917,1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F7C6AA").s().p("AJfARQgagMgJgSIgCgFIgCAFQgJASgaAMQgbAMgfAAQgfAAgbgMQgagMgJgSIgCgFIgCAFQgJASgaAMQgbAMgfAAQggAAgZgMQgagMgKgSIgCgFIgDAFQgJASgZAMQgaAMggAAQggAAgZgMQgagMgKgSIgCgFIgCAFQgIASgbAMQgZAMggAAQggAAgZgMQgagMgKgSIgCgFIgDAFQgIASgbAMQgZAMggAAQggAAgZgMQgagMgKgSIgCgFIgDAFQgJASgaAMQgZAMggAAQggAAgagMQgZgMgKgSIgCgFIgDAFQgJASgaAMQgZAMggAAQgnAAgcgRQgcgQgCgYIXzAAQgCAYgcAQQgcARgnAAQgfAAgbgMg");
	this.shape_4.setTransform(-392.8,2.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#443B44").s().p("AJeATQgagMgKgTQgJATgaAMQgbAMghAAQghAAgagMQgagMgKgTQgJATgaAMQgbAMghAAQghAAgagMQgagMgKgTQgJATgaAMQgbAMghAAQghAAgagMQgagMgKgTQgJATgZAMQgbAMghAAQghAAgbgMQgZgMgKgTQgKATgZAMQgbAMghAAQghAAgbgMQgZgMgKgTQgKATgaAMQgaAMghAAQghAAgbgMQgagMgJgTQgKATgaAMQgaAMghAAQgpAAgdgSQgdgRAAgaIX4AAQgBAagdARQgdASgpAAQghAAgagMgAI+gOQAJARAZAMQAaALAfAAQAlAAAbgPQAbgOADgWI3tAAQADAWAbAOQAcAPAkAAQAfAAAZgLQAZgMAKgRIAEgJIAFAJQAIARAaAMQAZALAfAAQAfAAAZgLQAZgMAKgRIAEgJIAFAJQAJARAZAMQAZALAfAAQAfAAAZgLQAZgMAKgRIAEgJIAEAJQAKARAZAMQAZALAfAAQAfAAAZgLQAZgMAJgRIAEgJIAEAJQAKARAZAMQAZALAfAAQAfAAAZgLQAagMAIgRIAFgJIAEAJQAKARAYAMQAaALAfAAQAfAAAZgLQAagMAIgRIAFgJIAEAJQAJARAZAMQAaALAfAAQAfAAAZgLQAagMAIgRIAFgJg");
	this.shape_5.setTransform(-392.8,2.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFDFCA").s().p("AgrB4Ig1jvICIAAIA5Dvg");
	this.shape_6.setTransform(-326.375,-12.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCC6B8").s().p("AgtAJIAAgQIBbAAIAAAQg");
	this.shape_7.setTransform(126.7,8.9);

	this.instance = new lib.Path();
	this.instance.setTransform(127.75,-78.4,1,1,0,0,0,7.6,4.8);
	this.instance.alpha = 0.3789;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#77871A").s().p("Ag0AiQgXgOAAgUQAAgTAXgOQAVgOAfAAQAfAAAXAOQAWAOAAATQAAAUgWAOQgXAOgfAAQgfAAgVgOg");
	this.shape_8.setTransform(127.75,-78.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#84A037").s().p("AgBAIQgDgCgDgIQgDgIABAAIANAHQAGAIAAAGQgIAAgDgDg");
	this.shape_9.setTransform(92.9126,-58.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#5A6D16").s().p("AAAAMQgEgRADgPQgCAMAGAdIgDgJg");
	this.shape_10.setTransform(92.6188,-59.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#5A6D16").s().p("AgeAZIAAgNQABgRAHgKQAIgMAOgDQASgEANAFQgMgEgRADQgLADgHAGQgLAKgCATQAAADADAIQADAHgCAEQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgCgIg");
	this.shape_11.setTransform(102.9625,-71.5303);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#84A037").s().p("AgHgCQABgHAGgEIAGgCIACAGQABAHgBADQgBAIgPAHg");
	this.shape_12.setTransform(116.02,-65.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#84A037").s().p("AgIADQAAgDAHgGIAHgGIACACQACACgBADQgBAFgQANg");
	this.shape_13.setTransform(102.4417,-60.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#677F1D").s().p("AgIADQAAgDAHgGIAGgGIADACQACACgBADQgBAFgQANIAAgKg");
	this.shape_14.setTransform(105.8268,-61.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#677F1D").s().p("AgGAKIgIgDIAMgMQAGgIALAIQgCAJgHAFQgCABgEAAIgGAAg");
	this.shape_15.setTransform(92.85,-66.0219);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#677F1D").s().p("AgFAJQgDgDgBgKIgBgJIAPAJQAJAFgEANQgKAAgFgFg");
	this.shape_16.setTransform(112.8365,-66.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#677F1D").s().p("AABAGIgLgCIAJgIQAEgDAIAHQgBAGgIAAIgBAAg");
	this.shape_17.setTransform(97.6,-72.5516);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#677F1D").s().p("AgFAAQgDgDgCgEIgBgEIADABIAJAFQAKAGABALQgNgGgEgGg");
	this.shape_18.setTransform(95.925,-75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#677F1D").s().p("AgGAFQgCgEABgHIABgIIALAOQAHAHgGAIQgHgFgFgFg");
	this.shape_19.setTransform(98.244,-74.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#677F1D").s().p("AABAGIgLgCIAJgIQADgDAJAHQgBAGgIAAIgBAAg");
	this.shape_20.setTransform(113.05,-75.0016);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#677F1D").s().p("AgFAAQgDgDgCgEIgBgDIAMAFQAKAGABALQgNgGgEgGg");
	this.shape_21.setTransform(111.375,-77.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#677F1D").s().p("AgGAFQgCgEABgHIABgIIALAOQAHAHgGAIQgHgEgFgGg");
	this.shape_22.setTransform(113.6817,-77.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#677F1D").s().p("AgKAEIAJgIQADgEAJAIQgCAGgIAAg");
	this.shape_23.setTransform(119,-68.3283);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#677F1D").s().p("AgFAAIgFgHIgBgDIAMAFQAKAGABAKQgNgFgEgGg");
	this.shape_24.setTransform(117.325,-70.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#677F1D").s().p("AgGAFQgDgEABgHIABgHIAMAMQAHAHgGAIQgIgEgEgFg");
	this.shape_25.setTransform(119.651,-70.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#677F1D").s().p("AgEgDQABgDAFgBIAGgBQACAHgHAEIgHAFIgDABg");
	this.shape_26.setTransform(86.4813,-64.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#677F1D").s().p("AgFAEIgKgFIAOgDQAKgBAHAHQgKADgGAAIgFgBg");
	this.shape_27.setTransform(83.7,-65.0702);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#677F1D").s().p("AgBAHQgEgBgEgGIgDgHIAQADQAKACgBAJIgIABIgGgBg");
	this.shape_28.setTransform(85.6262,-66.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#677F1D").s().p("AgEgDQABgEAFgBIAGAAQACAHgHAEIgHAFIgDABg");
	this.shape_29.setTransform(90.7722,-54.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#677F1D").s().p("AgFAEIgKgEIACgBIAMgDQAKgBAHAHQgKADgGAAIgFgBg");
	this.shape_30.setTransform(88,-55.5166);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#677F1D").s().p("AgCAHQgEgBgDgGIgDgHIAQADQAKACgBAJIgJABIgGgBg");
	this.shape_31.setTransform(89.9262,-56.7375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#84A037").s().p("AgHAAQgCgGAFgGIAEgFIAEAEQAEAHAAAEQABAHgKANg");
	this.shape_32.setTransform(139.6256,-55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#84A037").s().p("AgHgCQABgHAGgDIAGgDIACAFQABAIgBADQgCAHgOAIg");
	this.shape_33.setTransform(110.72,-63.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#84A037").s().p("AAAAJQgDgBgGgHIgGgHIARgCQAKgBAEANQgHAFgGAAIgDAAg");
	this.shape_34.setTransform(87.2,-68.0462);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#84A037").s().p("AgFAJQgDgDgBgKIgBgJIAOAJQAJAFgEANQgJAAgFgFg");
	this.shape_35.setTransform(89.5615,-70.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#84A037").s().p("AgFAJQgDgDgBgJIgBgKIAPAJQAJAFgEANQgKAAgFgFg");
	this.shape_36.setTransform(106.2865,-64.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#84A037").s().p("AgNAIIABgFQACgGACgDQAGgFAQACIgJAOQgEAGgFAAQgEAAgFgDg");
	this.shape_37.setTransform(139.35,-72.0474);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#84A037").s().p("AgGAKIgHgBIABgGQABgFADgEQAFgFARACIgJAOQgEAFgGAAIgBAAg");
	this.shape_38.setTransform(138.6,-73.8265);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#84A037").s().p("AgDAMQgFgHADgFIAJgQIACAEQACAFgBAGQgBAJgFAJIgEgFg");
	this.shape_39.setTransform(137.2854,-75.225);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#84A037").s().p("AgBAKQgEgCgEgJIgDgJIAQAEQAKACgBAOIgIABQgEAAgCgBg");
	this.shape_40.setTransform(78.4262,-61.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#84A037").s().p("AgCAKQgEgDgDgIIgEgJIAQAEQALADgBANIgIABQgEAAgDgBg");
	this.shape_41.setTransform(77.1,-60.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#84A037").s().p("AgHAIIgEgBIAJgJQAHgIAIAEQgDAHgHAFQgDACgEAAIgDAAg");
	this.shape_42.setTransform(77.5,-56.8821);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#84A037").s().p("AADAHIgMgCIgFgCIACgDQAEgDAFgBQAIgDALADQgDALgJAAIgBAAg");
	this.shape_43.setTransform(76.25,-58.4589);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#84A037").s().p("AgGAIIgBgGQAAgFADgBQAKgGABAEQABABAAABQAAAAAAABQAAAAAAAAQAAAAgBAAQABAFgFAEIgHADg");
	this.shape_44.setTransform(81.05,-53.73);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#84A037").s().p("AAAAHQgDAAgEgGIgCgEIALgDQAIgCABALQgGAEgFAAIAAAAg");
	this.shape_45.setTransform(82.05,-56.2125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#84A037").s().p("AgHADIgFgBIACgCQADgCAHAAQALgBAAACIACAAQgCACgIACIgEABIgGgBg");
	this.shape_46.setTransform(83.95,-53.8542);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#5A6D16").s().p("AiWBHQAKgeATgNQAQgKAZgKIAqgQQAOgIAEgGQAFgIADgUQAFgOAOgJQAMgIARgCIAjgCQAWgBANgDQAcgFAUgLQgWAOgmAFQgrADgVADQgZAEgJAPQgEAFgCAJIgEAQQgDAKgHAGQgGAFgKAFIgZAJQgeAMgRAMQgKAGgLALQgNANgEAWQgDAXASADQgagDALggg");
	this.shape_47.setTransform(96.3659,-66.3375);

	this.instance_1 = new lib.Path_21();
	this.instance_1.setTransform(77.45,-59.55,1,1,0,0,0,1.6,3.6);
	this.instance_1.alpha = 0.3789;

	this.instance_2 = new lib.Path_22();
	this.instance_2.setTransform(98.15,-66.35,1,1,0,0,0,17.8,6.9);
	this.instance_2.alpha = 0.3789;

	this.instance_3 = new lib.Path_23();
	this.instance_3.setTransform(127.8,-66.25,1,1,0,0,0,19.2,13.2);
	this.instance_3.alpha = 0.3789;

	this.instance_4 = new lib.Path_24();
	this.instance_4.setTransform(98.7,-80.15,1,1,0,0,0,6.3,4.5);
	this.instance_4.alpha = 0.3789;

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#77871A").s().p("AEACJQgXgbgSgJIgDgCIgXgEQgfgDgWgUQgcgagKgEQgZgLgpACIgEAAQgdADgpATQgUAJg2AfQg/AjgoAMQg7ASgygPQgYgHgJgJQgdgYAygvIANgLQATgQApgcQAfgUABgEIAEgJIANgOQAJgKADgKIABgHQAEgXALgYQAOgcAOgHQAXgKAgAOQAmAQgPApIgEAJQgBACAtgLIA9gKQAlgFApAJQAtAKAhgBQATgBAbgEIANgCQBpgTAGAXQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAIAOA1QAPA1ABAMQABAJgHAIIgZAYIgCACIACAWQACARgFAOQgHASgVAIQgHADgVADIgBAAQgIAAgSgVg");
	this.shape_48.setTransform(113.1389,-68.9606);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#3A2516").s().p("Aghg7QgCgJABgGQABgEACgCQADgCADABQADACAMAwIAOA4QAHAQALAVIAGgbIAEgQIADABQgKAigBANIAIANIgGADQglg+gWhQg");
	this.shape_49.setTransform(100.2107,-63.5531);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#3A2516").s().p("Agug/IAbgLQAQBEAPArQAEgOAOgZQAMgVADgCIACACIgPAZQgQAcgCANIANAeIgMACQgZgvgkhbg");
	this.shape_50.setTransform(114.45,-66.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#935B34").s().p("AAEDpQgDgFgFgCIgGgBQAIhiAChpQAHjRgRgfQgFgJgHgIIAEAEQAUAaAIAwQAGAsgEA6QgFA7ADAQIAKA6QAFAhgDAiQgDAtgFAuIgDAAQgEAAgDgDg");
	this.shape_51.setTransform(125.8654,-14.3275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#3A2516").s().p("AgTgBIgXgNIACgEIAYAPQAdAOAeAGIgIACQgbgGgbgOg");
	this.shape_52.setTransform(88.2,-52.675);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#3A2516").s().p("AgQgDIgQgMIAFgIIARANIArAeIgLAEQgUgNgSgOg");
	this.shape_53.setTransform(92.075,-54.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#3A2516").s().p("AAHAMQgLgJgIgJIgHgIIADgDIAGAIQAJAJAKAJIALAHIgFACg");
	this.shape_54.setTransform(96.15,-54.875);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#3A2516").s().p("AgEgIIgFgVIAFADIAEASIAKAlIgEABQgGgSgEgUg");
	this.shape_55.setTransform(106.75,-60.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#3A2516").s().p("AgLgdIAFABIASA4IgGACg");
	this.shape_56.setTransform(111,-61.425);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#3A2516").s().p("AgiBpQAJgUAEgRQAGgXAEhCQAEg5ALgeIAfAvQgMBMgxBeg");
	this.shape_57.setTransform(139.675,-67.05);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#543723").s().p("ACAGgQgDgFgHgCIgFgBQAHhiAEhpQAHjRgSgfQgKgSgSgLQgNgJghgLQgdgLgMgLIgJgHIgPgJQg+gDhRgzIgKAAQgUAAgSgEQgmgJgfgUIgDgBIgGgFIACgEIAMAJIAFACQAiATAhAGQAQADARAAIgxghIgGgFIgBgBIgOgLIADgHIABgBIAWARIAnAbQBYA5A+AGQgWgWgQgVIgCABQgvgHgggUIgPgJQgOgKgLgOIgDgEIADgCIAEAFQAJALAOAKIAWAOQAeAPAmAGIghgwQgKgQgLgWQgQgggOgsIAAAAIgJgcQgCgJABgGQABgEACgCQADgDADACQAEACAKArIAAABIAQA9IAEAJIAAAAIAFAKIAAABIATAjQAMASAJAMIAJAMQAmAuAwAfQAAgTgPg4QgQgJgQgFIgBAAQgPgEgOgpQgHgTgFgWIgEgTIAFADIABABIACALQAFAXAHAUQANAlANAEIATAGIAMAGIgjh5IACgDIABAAIABACIASA3IAQA4IACAFQATBIAAAVQAlAUAjAGQALACAEgCIABAAIABgBQALgGABgTQACgagSgbQgHgJgeghIgFgGQgWgZgUgkQgQgagMgfIgihSIAbgLIAaBiIABABIAYA6QAPAfARAVQAfApAmAQQAMAEAGgCQAGgBAHgIQAjgmATgqIABgCIADgIIA5iqIAIANIgGAfQgOA8gmBJIgTAlQgiA0gRAfQgfA4AGAlQALA8gEFrIADAVQgIADgIAAIgCAAQgFAAgCgDg");
	this.shape_58.setTransform(113.525,-32.615);

	this.instance_5 = new lib.Path_36_0();
	this.instance_5.setTransform(127.75,-78.4,1,1,0,0,0,7.6,4.8);
	this.instance_5.alpha = 0.3789;

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#77871A").s().p("Ag0AiQgXgOAAgUQAAgTAXgOQAVgOAfAAQAfAAAXAOQAWAOAAATQAAAUgWAOQgXAOgfAAQgfAAgVgOg");
	this.shape_59.setTransform(127.75,-78.375);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#44591E").s().p("Ah9CUIgJAAIgpgCIgRgBQgigBghgEIgbgEIAAAAIgYgFQgegHgFgKQgCgCAAgDIABgGQACgGAJgNIABgCIAOgPQAOgRA2gyIAOgNIAVgUQAkglAQgXQAVgdgHgPQgTgqBqBoIABABIAkAjIDRgRICRAjIADAVQAEAcAMAmQAIAbgVAJQgPAHgngBIgjAAQgSgBgPACQgRADgnALQgtAMgVAFIgGABQglAIgZABg");
	this.shape_60.setTransform(111.8853,-67.4918);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#899B50").s().p("AhXAyQAdgfAngwQAkgyAqAKQAWAFANAOIAAABIAHAFIAIAZIgBABIgKgZIgGgGIjHB5g");
	this.shape_61.setTransform(521.8,-42.8265);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#899B50").s().p("AhvBgIAfgmIABAAQAAghALgdQATg1AqgDQArgDAqgRQAWgJAMgHQgaAmgeAmQg7BMgVABIg2ACIgiAmg");
	this.shape_62.setTransform(544.65,-52.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#899B50").s().p("AiBAHQAzgsApgKQApgKBDAjQApAVAXATIAAAAQAiAJAFAEIgogNQgbALgkAHQg8AMgdgOQgfgPhBAOIg7ARg");
	this.shape_63.setTransform(516.55,-54.5861);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#899B50").s().p("AB8ByQghgdgCgKIgFgNIjUiuIArgEQAzADAuAgQApAdARArQAGANAKA2IABAEQAEAHABAFQACAMAjAeg");
	this.shape_64.setTransform(521.075,-63.15);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#899B50").s().p("AgngRIAXgeQAdgiAkgSIgBAiQgGAmgeAbQgcAcgTAnIgNAhg");
	this.shape_65.setTransform(538.975,-61.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#5A7030").s().p("AhGCGIg6gSIAcgcQAjgcAlABQAeACAWgBIBCgBIAigBQgQgGgcgNIgXgLIAAgBIgBgBQgVgEgTgIQgigPgQgYQgRgagCgzIACgtIAwAjQAwAqADAjQAEArAEAOIADAEIAbAOQAaAOARADIABACIglABIgCABQglBFgkAMQgIACgKAAQgaAAgsgMg");
	this.shape_66.setTransform(483.5,25.8755);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#899B50").s().p("AgdAeIgegLIAKgTQAOgUAVgGQATgGAdACQAPABALADQgPARgTAPQgdAagTAAIgHgCg");
	this.shape_67.setTransform(484.725,-21.8231);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#5A7030").s().p("AALAzQgNgYABgbQAAgagUgYIgVgTIATADQAXAIAZAfQAZAfgKAkQgFASgKAMQgHgHgHgMg");
	this.shape_68.setTransform(481.9179,-41);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#5A7030").s().p("AAmArQgkgYg0gzIgugvIA6AFQA/ALAfAiQAfAiAIAoQADAWgCANg");
	this.shape_69.setTransform(467.6021,-27.6);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#332210").s().p("ADENIQgpmPARiTIj3pwIlhh8IFcBwIj7p4ICWFEIB5kVIh0EiIFiN6QAWibBFm/IhFnsIBKHLQAokAA9lDIA1kPIhrKqQhuK7gSCQQgTCQArGWQAUDLAZC0IgSAHQgbi/gVjKg");
	this.shape_70.setTransform(496.15,45.65);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#62682A").s().p("AgaAuQgIgWgDgdQgEgfAVgQQALgIAKgCIAYAdQAWAggOALIg0A1QgDgFgEgMg");
	this.shape_71.setTransform(583.9104,-286.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#62682A").s().p("AgzAeIgtgPIAOgQQASgUAUgNQBNAFBAACQgdAegpAXQgRAJgXAAQgRAAgVgFg");
	this.shape_72.setTransform(623.025,-301.9345);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#62682A").s().p("Ag0AoIgtgPIAjglQAsglArAGQArAFATAKQAKAFABADQgaAeguAaQgRAJgXAAQgRAAgVgFg");
	this.shape_73.setTransform(524.875,-264.9201);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#77773D").s().p("AgXAtQgrgFgTgJIgLgJIASgTQAZgVAcgQQAbgQAyAKQAaAGATAIQgMAUgWASQgmAhgmAAIgKAAg");
	this.shape_74.setTransform(279.95,-293.6089);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#77773D").s().p("Ag7AiQANgxAXgUQAWgSAlgPQATgHAOgEIAAAiQgHAngiAWIhFAuIgbASQACgVAHgZg");
	this.shape_75.setTransform(281.3,-285.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#686B32").s().p("AgXAtQgrgFgUgKIgKgIIASgTQAYgVAdgQQAbgRAyALQAaAFATAJQgNAUgVARQgnAigmAAIgJAAg");
	this.shape_76.setTransform(243.725,-294.5303);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#686B32").s().p("Ag7AiQANgxAXgTQAWgTAlgPQATgHAOgEIAAAiQgGAngkAXIhEAuIgbARQACgVAHgZg");
	this.shape_77.setTransform(245.075,-286.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#62682A").s().p("AgaAiQgXgWgEgzIABgvIAvAXQAvAfAHAqQAIArgEAVQgBALgEACQglgRglgkg");
	this.shape_78.setTransform(592.9417,-285.825);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#62682A").s().p("AgaAkQgZgQgZgfIgTgeIAhgJQAmgEAgAbQA0AqAkAgQgVAEgaAAIgGABQguAAgXgQg");
	this.shape_79.setTransform(600.45,-289.7979);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#62682A").s().p("AgnBDQgMgggFgrQgEgsAfgYQAPgLAQgDIAkAqQAgAugVARQgUASgeAfIgbAbQgFgHgGgRg");
	this.shape_80.setTransform(476.3217,-296.875);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#62682A").s().p("AAlBsQgpgZgjghQgjghgFhKIABhEIBFAgQBHAtALA+QALA/gFAfQgDAPgFADQgNgGgVgMg");
	this.shape_81.setTransform(486.839,-295.075);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#62682A").s().p("AgnA1QglgYgkguIgdgqIAwgOQA5gGAwAnQBOA+A0AvQgfAFgmABIgJAAQhFAAgigWg");
	this.shape_82.setTransform(497.975,-300.8351);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#62682A").s().p("AgnBDQgMgggFgrQgEgsAfgYQAPgLAQgDIAkAqQAgAugVARQgUASgeAfIgbAbQgFgHgGgRg");
	this.shape_83.setTransform(444.3217,-294.825);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#62682A").s().p("AAlBsQgpgZgjghQgjghgFhKIABhEIBFAgQBHAtALA+QALA/gFAfQgDAPgFADQgNgGgVgMg");
	this.shape_84.setTransform(454.839,-293.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#62682A").s().p("AgnA1QglgYgkguIgdgqIAwgOQA5gGAwAnQBOA+A0AvQgfAFgmABIgJAAQhFAAgigWg");
	this.shape_85.setTransform(465.975,-298.7851);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#62682A").s().p("AgnBDQgMgggFgrQgEgsAfgYQAQgLAPgDIAkAqQAgAugVARQgUASgeAfIgbAbQgFgHgGgRg");
	this.shape_86.setTransform(325.2217,-296.875);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#62682A").s().p("AAkBsQgogZgjghQgjghgGhKIAChEIBFAgQBGAtAMA+QALA/gFAfQgDAPgFADQgOgGgVgMg");
	this.shape_87.setTransform(335.764,-295.075);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#62682A").s().p("AgnA1QglgYgkguIgdgqIAvgOQA7gGAvAnQBNA+A1AvQgeAFgnABIgJAAQhFAAgigWg");
	this.shape_88.setTransform(346.9,-300.8351);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#62682A").s().p("AgnBEQgMghgFgrQgEgsAfgYQAQgLAPgEIAkArQAgAugVARQgUASgeAfIgbAcQgFgIgGgQg");
	this.shape_89.setTransform(297.0217,-282.9);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#62682A").s().p("AAkBrQgogYgjghQgjghgGhKIAChEIBFAgQBGAtAMA+QALA/gFAeQgDAQgFADQgOgGgVgNg");
	this.shape_90.setTransform(307.564,-281.1);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#62682A").s().p("AgnA1QgkgYglguIgegqIAxgOQA5gGAwAnQBOA+A0AvQgeAGgnAAIgGAAQhIAAgigWg");
	this.shape_91.setTransform(318.7,-286.8625);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#62682A").s().p("AgnBDQgMgggFgrQgEgsAfgYQAQgLAPgDIAkAqQAgAugVARQgUASgeAfIgbAbQgFgHgGgRg");
	this.shape_92.setTransform(393.8717,-296.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#62682A").s().p("AAkBsQgogZgjghQgjghgGhKIAChEIBFAgQBGAtAMA+QALA/gFAfQgDAPgFADQgOgGgVgMg");
	this.shape_93.setTransform(404.414,-295.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#62682A").s().p("AgnA1QglgYgkguIgegqIAxgOQA6gGAvAnQBOA+A0AvQgeAFgnABIgJAAQhFAAgigWg");
	this.shape_94.setTransform(415.55,-300.8351);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#62682A").s().p("AgnBDQgMgggFgrQgEgtAfgXQAQgLAPgEIAkAqQAgAvgVARQgUASgeAfIgbAcQgFgIgGgRg");
	this.shape_95.setTransform(541.7717,-297.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#62682A").s().p("AAkBsQgogZgjghQgjghgGhKIAChEIBFAgQBGAtAMA+QALA/gFAfQgDAPgFADQgOgGgVgMg");
	this.shape_96.setTransform(552.314,-295.425);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#62682A").s().p("AgoA1QgkgYgkguIgdgqIAvgOQA6gGAwAnQBNA+A1AvQgfAFgmABIgJAAQhFAAgjgWg");
	this.shape_97.setTransform(563.45,-301.1851);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#62682A").s().p("AgnBDQgMgggFgrQgEgtAfgXQAPgLAQgDIAkAqQAgAugVARQgUASgeAfIgbAbQgFgHgGgRg");
	this.shape_98.setTransform(514.4717,-295.375);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#62682A").s().p("AAlBsQgpgZgjghQgjghgFhKIABhEIBFAgQBHAtALA+QALA/gFAfQgDAPgFADQgNgGgVgMg");
	this.shape_99.setTransform(524.989,-293.575);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#62682A").s().p("AgnA1QglgYgkguIgdgqIAwgOQA5gGAwAnQBOA/A0AuQgfAGgmAAIgGAAQhHAAgjgWg");
	this.shape_100.setTransform(536.125,-299.3625);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#604326").s().p("AgMEnQgOgLgQhaQgfizgHmJIBbgCQBlEtgsCXQhCDsgOBJg");
	this.shape_101.setTransform(510.0798,-274.2);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#604326").s().p("AmYKxQgRg7AVhoIAXhbIA7hrQBIiJBAieQBBidDXk5QBsicBgh9IAegXQAkgaAYgQIAdACQgOARguAuQiECCjQGaQiwFdg3CvQgjBthGCwQgiBXgcBCg");
	this.shape_102.setTransform(516.7821,-232.825);

	this.instance_6 = new lib.Path_2();
	this.instance_6.setTransform(493.2,-19.8,1,1,0,0,0,29.2,191);
	this.instance_6.alpha = 0.5117;

	this.instance_7 = new lib.Path_3();
	this.instance_7.setTransform(416.05,-227.35,1,1,0,0,0,22.5,86);
	this.instance_7.alpha = 0.3281;

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#443021").s().p("ABKFeIACguQAEgkACgKIAGgtQABgXgCgWQgJhEgrhqQgOgjgWgyIgmhUQgZg4gKgdQgQgpgEgyQgDg1ACgnQACg2AFgnQAKhfARhXQgOBXgJBgQgJBrAHBMQADApARAwQAJAbAaA6IBLCoQArBpAJBIQACAZgBAVIgHAuQgDAPgDAfIgDAuQgEBNAFBrQACBRAJBnQgYjTAFieg");
	this.shape_103.setTransform(457.8418,16.575);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#3D2E21").s().p("AAsJpQAKhYAXh4QAIg1gGgyQgGgugVg3QgHgTgNgeIgVgwQgWg4gMgrQgehlAIhtIAEg0IAYiCQADgMABgOIALhoIABg0QAAgbgDgZQgGg6gRgsQgNgfgMgQQgSgZgTgMQATALATAZQANASANAcQARApAIA+IAEA1IAAA1IgJBoQgCAQgQBZQgMA+gBApQgGBsAcBiQALAmAXA8IAoBiQAVA3AGAvQAHAzgJA3IgLA0IgJA0QgLA7gFAtQgNBtABBNQgDhXAKhkg");
	this.shape_104.setTransform(457.9485,-96.95);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#454C19").s().p("AgpBDQgehCAggtQAQgWgDgRIAjASQBuBBgQAiQgRAkgvAfIgsAXQgVgYgPghgAhoh7IASACQAUAEAOAGQAXALADARg");
	this.shape_105.setTransform(467.2822,-300.225);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#454C19").s().p("AglBEQgNgggFgrQgGgsAegYQAQgMAPgEIAlAqQAhAtgUARQgUATgeAgIgZAcQgFgIgHgQg");
	this.shape_106.setTransform(602.7913,-294.825);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#454C19").s().p("AAnBrQgpgYgkggQgkgggHhKIAAhEIBGAfQBHArANA9QANA/gFAfQgCAPgFADQgOgFgVgMg");
	this.shape_107.setTransform(613.4329,-293.325);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#454C19").s().p("AgmAyQglgXgmgtIgegqIAUgJIBrAIQAQAIALAJQBPA8A2AtQgfAGgmACIgSABQg+AAghgUg");
	this.shape_108.setTransform(624.4,-298.9824);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#454C19").s().p("AglBEQgNgggGgrQgFgsAegYQAQgMAPgEIAlAqQAhAtgUARIgyAzIgaAcQgFgIgGgQg");
	this.shape_109.setTransform(551.1236,-291.675);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#454C19").s().p("AAnBrQgpgYgkggQgkgggHhKIAAhEIBGAfQBHArANA9QANA/gFAfQgCAPgFADQgOgFgVgMg");
	this.shape_110.setTransform(561.7444,-290.175);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#454C19").s().p("AgmA1QglgWgmgtIgegqIAvgPQA6gIAwAnQBQA8A2AtQgfAGgnACIgRAAQg+AAghgUg");
	this.shape_111.setTransform(572.75,-296.1935);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#454C19").s().p("AAEBIQgYgXgZglQgYgkAQgkIAWgbIAzAVQAxAagKAZQgPAogTA/QgIgEgNgMg");
	this.shape_112.setTransform(517.3951,-284.275);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#454C19").s().p("AgIA+QgvgNgng/Igfg9IBNgDQBTAHAnAyQAnAyAJAeQAFAPgDAFIgTAAQg0AAg9gRg");
	this.shape_113.setTransform(528.1063,-288.1173);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#454C19").s().p("AgNA3QgrgEg2gZIgtgYIAkghQAwggA+AMQBhAUBEARQgZASgiATQg9AggoAAIgJAAg");
	this.shape_114.setTransform(535.85,-297.4058);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#454C19").s().p("AAEBIQgYgXgZglQgYgkAQgjIAWgcIAzAVQAxAagKAZQgPAogTA/QgIgEgNgMg");
	this.shape_115.setTransform(464.3951,-273.175);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#454C19").s().p("AgIA+QgvgNgng/Igfg9IBNgDQBTAGAnAzQAnAxAJAeQAFAPgDAFIgVABQgzAAg8gRg");
	this.shape_116.setTransform(475.1063,-276.9853);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#454C19").s().p("AgMA3QgsgEg1gZIgugYIAkgiQAwgfA+AMQBhAUBEARQgZASgiASQg9AhgoAAIgIAAg");
	this.shape_117.setTransform(482.85,-286.2958);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#604326").s().p("EAHvAmUIhbgEQgaAAhPgGQg2gEgaAGQgbAGg7gCQhCgEgbAAQghAAgwgUIgqgVQgHjEgGj7QgOn3ABkSQAAiPgbkPQgJhZgxmoQhNqlAUjXIABgfQAJkMjIrxQhkl5hmlDIC2AxIEKOCQABjCgGldQgDixgtkfQA4AYBQASQAlAIAmAFQA3GoA6DmQA3DfAhCZQChLcgkE8QgZDhC8UAQBdKBBjJUQgoAQgtAJQgVAFgbAAIgQgBg");
	this.shape_118.setTransform(457.975,-74.0339);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#4C3825").s().p("AtaEPIDDidQDUi1BQh/QAWgkgDg0QgBgQgQhSIBtgBIAYAAQgZCBgtBVIKhhFIBIgYICsg3QCFAKB0ACQj/BQoCBYInOBJQhRBcjUC5IjCCng");
	this.shape_119.setTransform(551.7,-274.275);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#604326").s().p("AjsAEIqoizIBBAFQIDCAAagGQAQgDBMAXQAnAMAiANIB9AlImzjMIAvgFIB5A3QCXBBCNAxQHJCcDShCQDThCAdAIQAPADgcARQgtAehAAfQiCA+hjAHIgIAAQh1AAqgisg");
	this.shape_120.setTransform(325.7647,-280.3618);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#454C19").s().p("AAgBaQhagIgZgfQgZgegIg3IgCgyIBEgJQBGABAcAyQAsBNAaA6IgZABQgdAAgggEg");
	this.shape_121.setTransform(335.45,-287.2942);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#454C19").s().p("AgMAyQgSgTgggeIgdgZIAYgMQAggNArgGQAsgHAYAfQAMAPAEAQQgTAUgWARQgcAUgSAAQgKAAgHgHg");
	this.shape_122.setTransform(299.575,-305.57);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#454C19").s().p("AhnBTIgTgHIARgjQAYgpAfglQAggkBJgIQAmgEAeADQgIAigVAkQgrBIg9AOQgvAKgdAAIgRgBg");
	this.shape_123.setTransform(298.2,-294.9846);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#454C19").s().p("AhHBMQgEhMAWgmQAWglAtgmQAXgTASgMIAQAwQAIA5gmAxQglAzgkAuIgeAlQgHgegCgmg");
	this.shape_124.setTransform(304.3646,-284);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#454C19").s().p("AAgBaQhagIgZgfQgZgegHg3IgDgyIBDgIQBIABAbAxQAsBOAbA5IgVAAQgfAAgjgDg");
	this.shape_125.setTransform(373.475,-290.4062);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#454C19").s().p("AgMAyQgSgTghgeIgcgZIAYgMQAggNAqgGQAsgGAZAeQANAPADAQQgTAUgWARQgcAUgSAAQgJAAgIgHg");
	this.shape_126.setTransform(349.5,-306.3129);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#454C19").s().p("AhoBTIgSgHIARgjQAXgpAgglQAfgkBKgIQAlgEAfADQgIAigVAkQgrBIg9AOQgvAKgeAAIgRgBg");
	this.shape_127.setTransform(348.125,-295.7346);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#454C19").s().p("AhHBMQgEhMAWgmQAWglAtgmQAXgTASgMIAQAwQAIA5glAxIhKBiIgeAlQgHgfgCgmg");
	this.shape_128.setTransform(354.2896,-284.725);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#454C19").s().p("Ag8BDQgghVAQgkQAQgkAvgfQAXgPAUgJIANAQQAOAUAKAVQAfBBggAtQggAvggArIgaAiQgTgkgRgrg");
	this.shape_129.setTransform(430.4238,-273.275);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#454C19").s().p("AgSBEQgygaAKgZQAOgoAShAIAVAQQAZAXAZAlQAZAjgQAkQgIARgNALQgbgIgYgMg");
	this.shape_130.setTransform(435.5614,-302.575);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#454C19").s().p("AAyBNQhUgGgngyQgogwgKgeIgCgUIAnAAQAxACAtAMQAuANApA+QAUAgALAdQgZAFgdAAIgWgBg");
	this.shape_131.setTransform(424.9,-298.4421);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#454C19").s().p("AALA0Ih3gYIgvgKIA6glQBDgmArADQArAEA2AYQAbAMATALQgMASgYAQQgjAYgrAAQgPAAgQgDg");
	this.shape_132.setTransform(417.275,-289.2108);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#28180D").s().p("AmCjaIA0AAIKrE1IAmCAg");
	this.shape_133.setTransform(375.725,-276.1);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#47365B").s().p("Ag/AeQAAgKAFgIQAGgIAJgBQAAgHAEgGQAFgFAGgBIANAAIAAgBQAAgMAKAAIAJAAQAKAAAAAMIAAABIAPAAQAHAAAFAHQAEAFAAAHQAIACAGAHQAFAIAAAKg");
	this.shape_134.setTransform(229.525,-155.6);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#332744").s().p("AgPByQgHgBgEgFQgEgGgBgHIAAgCIgBAAQgHgBgBgIIgTjEIB3AAIgQDDQgBAKgHAAIAAACQAAAHgFAGQgEAFgHABgAAfhgIgMCxQgBAEACACQACADACAAIACAAQAJAAABgLIAPitQAAgDgCgDQAAgBAAAAQgBgBAAAAQgBAAAAAAQgBAAAAAAIgIAAQgFAAgCAGgAgMhkQgDADABAEIAICsQAAALAIAAIAAAAQAEAAADgDQACgDABgFIALisQABgEgDgDQgBgCgDAAIgYAAQgDgBgCADgAgwhkQgCAEAAAEIASCqQAAAFADADQADADADAAQAEAAADgDQACgDAAgEIgIitQAAgIgIAAIgMAAQgEAAgCACg");
	this.shape_135.setTransform(229.65,-141.7);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#CCCBA3").s().p("AgVBkIgTjHIAvAAQgEAeAEAmQAFA+AXA3IAGAOg");
	this.shape_136.setTransform(228.175,-142.55);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#F9F9EF").s().p("AgjBkIgUjHIBvAAIgRDHg");
	this.shape_137.setTransform(229.65,-142.55);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2D2238").s().p("AgDAaQgHAAgFgFQgFgFAAgGIAAgjIApAAIAAAjQAAAGgFAFQgFAFgHAAg");
	this.shape_138.setTransform(230.025,-130.35);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#57436D").s().p("Ag4AJQgHAAAAgHIAAgDQAAgCACgDQACgCADAAIBxAAQADAAACACQACADAAACIAAADQAAAHgHAAg");
	this.shape_139.setTransform(229.25,0.9);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#6E5189").s().p("AgzAJQgHAAABgHIAAgDQgBgHAHAAIBnAAQAGAAABAHIAAADQgBAHgGAAg");
	this.shape_140.setTransform(229.25,-0.875);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#443751").s().p("AhWAQIAAgHQgBgJAIgIQAIgHAKAAIB7AAQALAAAHAHQAHAIAAAJIAAAHg");
	this.shape_141.setTransform(229.35,52.9);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#443751").s().p("Ag+ERIAOohIBeAAIAAADQggAcgOA9QgMAyAZCUQASBlAfB+IABAcg");
	this.shape_142.setTransform(229.35,27.225);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#6E5189").s().p("Ag+ERIAOohIBeAAIARIhg");
	this.shape_143.setTransform(229.35,27.225);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2D2238").s().p("AgUOVIAc8pIAOAAQgGFwgFIkQgHLzADCig");
	this.shape_144.setTransform(228.35,-37.2);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#4E3760").s().p("AgeOVIAd8pIARAAIAQcpg");
	this.shape_145.setTransform(229.35,-37.2);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#A81E22").s().p("AhWCsQAAgRgLgOQgLgOgQgEIAAkXIAGAAQAUAAAPgPQAPgOAAgWICWAUQAAATANAOQAMAOASADIAAEoIgLgBQgVAAgOAOQgPAPAAAUgAhOiiQgQAOgUACIAAEGQAPAGAKANQALANACAQICDAgQAEgRANgOQARgRAZAAIABAAIAAkVQgQgFgMgNQgMgOgCgRIiEgRQgEAUgPANg");
	this.shape_146.setTransform(335.8,39.65);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#595160").s().p("AgHECIAAoDIAPgEIAAILg");
	this.shape_147.setTransform(150.55,-12.525);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#A81E22").s().p("AgLBGIAAiPIAXAFIAACOg");
	this.shape_148.setTransform(398.225,-201.675);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#544C56").s().p("AnBCOIODlJIgCBEItdEzg");
	this.shape_149.setTransform(432.85,-173.775);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#E7B4FC").s().p("AiQgFIEhhRIAABjIkhBKg");
	this.shape_150.setTransform(136.75,-40.025);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#6C5C6D").s().p("AicAgIE5hPIAAATIk5BMg");
	this.shape_151.setTransform(135.575,-33.875);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#007368").s().p("AkhChIBMkdIH3glIhhFCg");
	this.shape_152.setTransform(292.05,-24.45);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#007368").s().p("AjJBRQgMgLgRAAIgEAAIAAhWQAPgCALgMQAJgLAAgPIGEg1QAAARAMAMQAMALAQAAIAFAAIAABoQgPACgLALQgKAMAAAPImEAjQAAgRgLgMgAi9gvQgDANgJALQgKAKgNAFIAABEQAQACAMALQALAKAEAQIFyghQADgOAJgLQAKgKAOgEIAAhWQgQgBgMgLQgNgLgEgPg");
	this.shape_153.setTransform(295.8,-49.325);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#C7E5D0").s().p("Aj7hIIH3hAIAADeIn3Azg");
	this.shape_154.setTransform(295.825,-49.25);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#F7924B").s().p("Ah1GSIAAsgIDrg9IAAOXgAhrmHIAAMRIDXA1IAAt9g");
	this.shape_155.setTransform(258.875,-1.15);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#B7B6B7").s().p("AhwGNIAAsXIDhg6IAAOJg");
	this.shape_156.setTransform(258.875,-1.15);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#F7924B").s().p("AhbFXIAAqrIC3gwIAAMJgAhRlNIAAKcICjApIAArvg");
	this.shape_157.setTransform(233.375,-1.025);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#B7B6B7").s().p("AhWFTIAAqjICtgtIAAL7g");
	this.shape_158.setTransform(233.375,-1.025);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#B7B6B7").s().p("AgjDpIAAnSIBHgSIAAH3g");
	this.shape_159.setTransform(184.225,-2.025);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#B7B6B7").s().p("AgODOIAAmbIAdgIIAAGrg");
	this.shape_160.setTransform(171.55,-2.05);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#B7B6B7").s().p("AgQDaIAAmzIAigJIAAHFg");
	this.shape_161.setTransform(176.35,-2.05);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#F7924B").s().p("AijEcIAAn4IFHhNIAAAVIkSBMIAAHxg");
	this.shape_162.setTransform(205.675,-4.8);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#BAACA2").s().p("AijD4IAAn4IFHhNIAAKag");
	this.shape_163.setTransform(205.675,-1.2);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#BAACA2").s().p("AijD4IAAn4IFHhNIAAKag");
	this.shape_164.setTransform(205.675,-1.2);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#F2B170").s().p("An5BvIPzlLIAADDIvzD2gAnvB2IAABaIPfjxIAAitg");
	this.shape_165.setTransform(220.075,-46.7);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#F7924B").s().p("An0BzIPplIIAAC4IvpDzg");
	this.shape_166.setTransform(220.075,-46.675);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#F7924B").s().p("Aj3BCIHviyIAAA6InvCng");
	this.shape_167.setTransform(245.85,-79.925);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#F7924B").s().p("AgqiVIBVARIAAD9IhVAcg");
	this.shape_168.setTransform(258.475,-98.1);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#F7924B").s().p("Agqi5IBVAQIAAFGIhVAcg");
	this.shape_169.setTransform(244.825,-97.1);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#F7924B").s().p("AgqjdIBVARIAAGNIhVAcg");
	this.shape_170.setTransform(231.825,-96.4);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#B7B6B7").s().p("AgZhHIAzgSIAACiIgzARg");
	this.shape_171.setTransform(213.975,-58.3);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#B7B6B7").s().p("AgZhZIAzgSIAADFIgzASg");
	this.shape_172.setTransform(213.975,-77.55);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#B7B6B7").s().p("AgZhCIAzgTIAACaIgzARg");
	this.shape_173.setTransform(213.975,-96.675);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#B7B6B7").s().p("AgZgwIAzgVIAAB4IgzATg");
	this.shape_174.setTransform(213.975,-111);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#B7B6B7").s().p("AgogoIBRghIAAB2IhRAdg");
	this.shape_175.setTransform(205.975,-108.025);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#B7B6B7").s().p("AgohCIBRgdIAACiIhRAdg");
	this.shape_176.setTransform(205.975,-55.525);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#B7B6B7").s().p("AgohUIBRgbIAADEIhRAbg");
	this.shape_177.setTransform(205.975,-74.925);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#B7B6B7").s().p("Agog7IBRgfIAACZIhRAbg");
	this.shape_178.setTransform(205.975,-93.9);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#B7B6B7").s().p("AgShKIAlgNIAACiIglANg");
	this.shape_179.setTransform(198.975,-53.075);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#B7B6B7").s().p("AgShbIAlgMIAADDIglAMg");
	this.shape_180.setTransform(198.975,-72.625);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#B7B6B7").s().p("AgShDIAlgOIAACWIglANg");
	this.shape_181.setTransform(198.975,-91.425);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#B7B6B7").s().p("AgSgxIAlgOIAAByIglANg");
	this.shape_182.setTransform(198.975,-105.325);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#B7B6B7").s().p("AgQhbIAigMIAADDIgiAMg");
	this.shape_183.setTransform(194.35,-71.1);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#B7B6B7").s().p("AgQhDIAigNIAACVIgiAMg");
	this.shape_184.setTransform(194.35,-89.825);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#B7B6B7").s().p("AgQhKIAigMIAAChIgiAMg");
	this.shape_185.setTransform(194.35,-51.475);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#B7B6B7").s().p("AgQgwIAigOIAABwIgiANg");
	this.shape_186.setTransform(194.35,-103.6);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#F26E70").s().p("AgthWIBbgrIAAAAIAADhIhbAigAgjhQIAADEIBHgbIAAjKg");
	this.shape_187.setTransform(164.875,-46.825);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#F26E70").s().p("AglhWIBLgjIAADXIhLAcgAgbhPIAAC7IA3gVIAAjAg");
	this.shape_188.setTransform(155.125,-42.75);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#F26E70").s().p("AglhPQABAABKguIAADZIhLAigAgbhJIAAC4IA3gaIAAjAg");
	this.shape_189.setTransform(155.125,-65.275);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#F26E70").s().p("AgthQIBbg6IAADrIhbAqgAgjhLIAADGIBHggIAAjTg");
	this.shape_190.setTransform(164.875,-70.65);

	this.instance_8 = new lib.Path_33();
	this.instance_8.setTransform(164.8,-46.5,1,1,0,0,0,4,10.8);
	this.instance_8.alpha = 0.5781;

	this.instance_9 = new lib.Path_34();
	this.instance_9.setTransform(155.1,-42.15,1,1,0,0,0,3.5,10);
	this.instance_9.alpha = 0.5781;

	this.instance_10 = new lib.Path_35();
	this.instance_10.setTransform(164.6,-70.05,1,1,0,0,0,4.2,11);
	this.instance_10.alpha = 0.5781;

	this.instance_11 = new lib.Path_36();
	this.instance_11.setTransform(155.1,-64.5,1,1,0,0,0,3.4,10.1);
	this.instance_11.alpha = 0.5781;

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#E2D0E6").s().p("AgohUIBRgmIAADXIhRAdg");
	this.shape_191.setTransform(164.875,-46.8);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#E2D0E6").s().p("AgghSIBBgfIAADLIhBAYg");
	this.shape_192.setTransform(155.125,-42.725);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#E2D0E6").s().p("AgohOIBRg0IAADfIhRAmg");
	this.shape_193.setTransform(164.875,-70.575);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#E2D0E6").s().p("AgghMIBBgpIAADNIhBAeg");
	this.shape_194.setTransform(155.125,-65.2);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#F26E70").s().p("Ag2DxIAAnaIBtgkIAAAGIhaAeIAAHaIBaAYIAAAFg");
	this.shape_195.setTransform(163.975,-8.575);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#E2D0E6").s().p("Ag2DxIAAnaIBtgkIAAIbg");
	this.shape_196.setTransform(163.975,-8.575);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#F26E70").s().p("AjLA5IDRiOIDGARIAAAfIjGgQIjRCLg");
	this.shape_197.setTransform(168.85,-83.675);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#F26E70").s().p("AAGhFIDGAQIAAAYIjGgQIi0ByIgdABg");
	this.shape_198.setTransform(168.85,-82.05);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#F7924B").s().p("AmrBRIFoihIHvBEIAAAcInvhFIk+CGg");
	this.shape_199.setTransform(227.875,-118.175);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#39BBA1").s().p("AhPCMIAAknICfgBIAAE5g");
	this.shape_200.setTransform(283.375,-13.475);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#39BBA1").s().p("AhPC2IAAmNICfAQIAAGeg");
	this.shape_201.setTransform(283.375,25.8);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#007368").s().p("AhqFrIAAsEIDVgIIAANDg");
	this.shape_202.setTransform(283.325,9.075);

	this.instance_12 = new lib.Group_3();
	this.instance_12.setTransform(309.15,-12.75,1,1,0,0,0,5.8,10.5);
	this.instance_12.alpha = 0.2891;

	this.instance_13 = new lib.Group_4();
	this.instance_13.setTransform(308.1,-21.95,1,1,0,0,0,7.2,13.6);
	this.instance_13.alpha = 0.2891;

	this.instance_14 = new lib.Group_5();
	this.instance_14.setTransform(307,-32.65,1,1,0,0,0,8.8,16.1);
	this.instance_14.alpha = 0.2891;

	this.instance_15 = new lib.Group_6();
	this.instance_15.setTransform(305.15,-41.45,1,1,0,0,0,6.2,10.7);
	this.instance_15.alpha = 0.2891;

	this.instance_16 = new lib.Group_7();
	this.instance_16.setTransform(285.55,-73.35,1,1,0,0,0,5.8,10.4);
	this.instance_16.alpha = 0.2891;

	this.instance_17 = new lib.Group_8();
	this.instance_17.setTransform(284.5,-82.4,1,1,0,0,0,7.2,13.7);
	this.instance_17.alpha = 0.2891;

	this.instance_18 = new lib.Group_9();
	this.instance_18.setTransform(283.35,-93.2,1,1,0,0,0,8.7,16.1);
	this.instance_18.alpha = 0.2891;

	this.instance_19 = new lib.Group_10();
	this.instance_19.setTransform(281.55,-101.9,1,1,0,0,0,6.2,10.8);
	this.instance_19.alpha = 0.2891;

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#007368").s().p("Aj6KZIAAyXIH1jFIAAWIgAADAqIAAJxIDkAUIAAqlgAjmBLIAAI7IDWATIAApsgAjmnxIAAInIDWgdIAApdgAADpMIAAJiIDkgfIAAqdg");
	this.shape_203.setTransform(295.7,-63.4);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#39BBA1").s().p("AjwKOIAAyIIHhi9IAAVug");
	this.shape_204.setTransform(295.7,-62.55);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#39BBA1").s().p("Aj6BTIH1jZIAAA8In1DRg");
	this.shape_205.setTransform(295.7,-130.075);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#F26E70").s().p("AiXF7IAAtFIEwAAIAAOVgAiNgsQAlADD3AaIAAmxIkcAAg");
	this.shape_206.setTransform(336,19.825);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#F26E70").s().p("AiXBLQAAg2AjgoQAhgpA1gLQARgDAOAAQAaAAAdAKIAAAAIAHADQAoASAYAkQAZAlABAtgACOBBQgEgmgVgfQgWgegjgRIg8B0ICOAAIAAAAgAgQBBIg/hoQgaASgRAaQgQAcgDAgIB9AAgAgbg9QgXAEgVAMIA/BoIA7hyQgZgJgZAAQgOAAgOADg");
	this.shape_207.setTransform(336,-33.575);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#59515B").s().p("A3oB8IOAlRMAhQAAPIAABbMghMgAIIuEFJgA3iB/IAABQIN9lHMAhJAAIIAAhRMghLgAPg");
	this.shape_208.setTransform(539.1,-180.975);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#AA8DA4").s().p("A3lB+IN+lQMAhNAAPIAABWMghKgAIIuBFIg");
	this.shape_209.setTransform(539.1,-181.025);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F26E70").s().p("AholjIDRhhIAANNIjRA9gAhghcIAAIXIBvggIAAocgAAZiFIAAIdIBJgVIAAoggAhglfIAAD5IBvgmIAAkHgAAZmXIAAEHIBJgYIAAkRg");
	this.shape_210.setTransform(333.75,-122.9);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#F26E70").s().p("AhXmVICvhRIAAOaIivA0gAhQhQIAAIuIBPgYIAAoxgAAIhvIAAIzIBJgVIAAo2gAhQmQIAAE1IBPgbIAAk/gAAIm5IAAE/IBJgYIAAlJg");
	this.shape_211.setTransform(380.775,-140.4);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#F26E70").s().p("AhzlyIDohrIAAN3IjoBEgAhshNIAAIhIB+glIAAoogAAch8IAAIoIBRgXIAAosgAhsltIAAEVIB+grIAAklgAAcmsIAAEmIBRgbIAAkwg");
	this.shape_212.setTransform(357.6,-131.95);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#B2AD9A").s().p("ApLCTIFCjuINNg3IAIElg");
	this.shape_213.setTransform(418.825,-17.775);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#F8E0ED").s().p("AiTF5IAAs9IEmAAIAAOJg");
	this.shape_214.setTransform(336.35,20.1);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#F8E0ED").s().p("AiTBGQADgyAhgmQAigmAwgKQAQgDAOAAQA6AAArApQArAoACA6g");
	this.shape_215.setTransform(336,-33.575);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#F8E0ED").s().p("AiyE3IAApVIFlhIIAALNgACsFcIgBq2IlTBFIAAJDIFUAug");
	this.shape_216.setTransform(373.1,-16.675);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#F8E0ED").s().p("AiuEyIAApMIFchHIABLDg");
	this.shape_217.setTransform(373.275,-16.65);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#F26E70").s().p("AlcAJIK5i+IAADBIq5Cqg");
	this.shape_218.setTransform(356.1,-65.125);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#F8E0ED").s().p("AhTmTICnhOIAAORIinAyg");
	this.shape_219.setTransform(380.75,-140.35);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#F8E0ED").s().p("AhwlvIDhhpIAANvIjhBCg");
	this.shape_220.setTransform(357.6,-131.925);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#F8E0ED").s().p("AhkliIDJhdIAANEIjJA7g");
	this.shape_221.setTransform(333.775,-122.85);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#A81E22").s().p("AmxCjIMRmWIBSARIAABPIhQgRIsTGXgAmpCoIAAA/IMKmTIBJAQIAAg/IhJgQg");
	this.shape_222.setTransform(356,-185.9);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#A81E22").s().p("AmuCnIMOmUIBPAQIAABHIhNgRIsQGVg");
	this.shape_223.setTransform(356,-186.025);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#F26E70").s().p("AFijLIBQARIAAA6IhQgMIrBFXIhSABgAmRDEIAwgBILClXIBJAMIAAgsIhHgPg");
	this.shape_224.setTransform(356,-181.975);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#F26E70").s().p("AFdjHIBLAQIAAAzIhMgMIrDFXIhAABg");
	this.shape_225.setTransform(356.625,-181.975);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#6B6577").s().p("AgimiIBFgyIAAAkIgkAaIAANfIghAMg");
	this.shape_226.setTransform(432.1,-230.9);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#6B6577").s().p("AggmFIBBguIAAAkIggAXIAAMfIghAMg");
	this.shape_227.setTransform(412.35,-220.15);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#6B6577").s().p("Aggl5IBBgvIAAAkIghAXIAAMKIggAMg");
	this.shape_228.setTransform(405.775,-216.6);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#6B6577").s().p("AgdmRIA7gqIAAAjIgaATIAAM0IghANg");
	this.shape_229.setTransform(418.6,-223.475);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#6B6577").s().p("AgimXIBFgxIAAAjIgjAaIAANIIgiAMg");
	this.shape_230.setTransform(425.1,-227.1);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#7F7989").s().p("AgimiIBFgyIAAOPIhFAag");
	this.shape_231.setTransform(432.1,-230.9);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#7F7989").s().p("AggmFIBBguIAANOIhBAYg");
	this.shape_232.setTransform(412.35,-220.15);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#7F7989").s().p("Aggl5IBBgvIAAM4IhBAZg");
	this.shape_233.setTransform(405.775,-216.6);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#7F7989").s().p("AgdmRIA7gqIAANgIg7AXg");
	this.shape_234.setTransform(418.6,-223.475);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#7F7989").s().p("AgimXIBFgxIAAN3IhFAag");
	this.shape_235.setTransform(425.1,-227.1);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#574F5B").s().p("AjnCKIHPlZIAABDInPFcgAjiCMIAAA5IHFlUIAAg2g");
	this.shape_236.setTransform(414.9,-277.775);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#77715F").s().p("AjkCLIHKlVIAAA9InKFYg");
	this.shape_237.setTransform(414.9,-277.775);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#574F5B").s().p("A3oCvIHQlcMAnyAAQIAPArMgn9AAAImHEhgA3ZCpIA9AAIGFkfIABgBMAn4AAAIgMghMgnsgARg");
	this.shape_238.setTransform(542.975,-274.45);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#B2AD9A").s().p("A3iCsIHJlXMAnvAAQIANAmMgn6AAAImGEhg");
	this.shape_239.setTransform(543.175,-274.45);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#EFEAD5").s().p("A6XCTIE6jmINWg/MAhuAAEIAxEhg");
	this.shape_240.setTransform(528.825,-17.775);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#443D47").s().p("Aw3BAIAAh/MAhuAAAIAAB/gAwvA5MAhfAAAIAAhxMghfAAAg");
	this.shape_241.setTransform(584.8,-38.5);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#968799").s().p("AwyA9IAAh5MAhmAAAIAAB5g");
	this.shape_242.setTransform(584.8,-38.5);

	this.instance_20 = new lib.Group_18();
	this.instance_20.setTransform(418.9,-127.85,1,1,0,0,0,10.8,20.7);
	this.instance_20.alpha = 0.1914;

	this.instance_21 = new lib.Group_19();
	this.instance_21.setTransform(452.65,-83.45,1,1,0,0,0,10.3,20.6);
	this.instance_21.alpha = 0.1914;

	this.instance_22 = new lib.Group_20();
	this.instance_22.setTransform(444.05,-101.05,1,1,0,0,0,17.9,38.5);
	this.instance_22.alpha = 0.1914;

	this.instance_23 = new lib.Group_21();
	this.instance_23.setTransform(433.5,-107.7,1,1,0,0,0,28.4,56.6);
	this.instance_23.alpha = 0.1914;

	this.instance_24 = new lib.Group_22();
	this.instance_24.setTransform(429.1,-118.05,1,1,0,0,0,21,40.5);
	this.instance_24.alpha = 0.1914;

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#EFE4F4").s().p("Al+l/IL9kUIAAT2Ir9AxgAlqlxIAAPwILVguIAAzHg");
	this.shape_243.setTransform(433.275,-108.675);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#9195B7").s().p("Al0l6ILpkMIAATeIrpAvg");
	this.shape_244.setTransform(433.275,-108.475);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#6F6572").s().p("AgLAoQgEgRAAgXQAAgXAEgQQAFgQAGAAQAHAAAFAQQAEAQABAXQgBAXgEARQgFAQgHAAQgGAAgFgQg");
	this.shape_245.setTransform(420.6,47.1);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#6F6572").s().p("AiIEEIAAoIIERAAIAAIIg");
	this.shape_246.setTransform(408.6,5.8);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#A694AA").s().p("AjBAxIAAi4IGDAwIAADfg");
	this.shape_247.setTransform(452.225,74.95);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#716D72").s().p("AjBFgIAAr3IGDAAIAAMvg");
	this.shape_248.setTransform(452.225,18.2);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#4B464C").s().p("AivHbIAAv/IFfgKIAARdgAiqoeIAAPtIFVBZIAAxRg");
	this.shape_249.setTransform(409.05,28.65);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#A694AA").s().p("AitHVIAAv5IFbgLIAARfg");
	this.shape_250.setTransform(409.05,29);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#59515B").s().p("At8h5MAhgAAAIADAtMghPAAAIksDDIhSADgAzUB0IA+gDIEsjCIABgBMAhKAAAIgCgjMghZAAAg");
	this.shape_251.setTransform(564.875,-269.3);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#AA8DA4").s().p("At+h3MAhdAAAIACAoMghMAAAIktDDIhIAEg");
	this.shape_252.setTransform(565.175,-269.325);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#AFAAB5").s().p("AiYF8IAAr5IExAAIAAL7g");
	this.shape_253.setTransform(666.5,-238.875);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#AFAAB5").s().p("AiXF6IAAr1IEwAAIAAL3g");
	this.shape_254.setTransform(616,-239.05);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#AFAAB5").s().p("AiYGCIAAsDIEwAAIAAMDg");
	this.shape_255.setTransform(559.35,-238.475);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#AFAAB5").s().p("AiYF3IAArtIEwAAIAALtg");
	this.shape_256.setTransform(506.85,-239.55);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#968799").s().p("AwpAsIgChXMAhXAAHIgCBQg");
	this.shape_257.setTransform(584.15,-188.65);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#4B464C").s().p("AwnAkIAAhHMAhPAAAIAABHgAwfAbMAg/AAAIAAg1Mgg/AAAg");
	this.shape_258.setTransform(583.975,-102.325);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#968799").s().p("AwjAgIAAg/MAhHAAAIAAA/g");
	this.shape_259.setTransform(583.975,-102.325);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#6F6970").s().p("AinGSIAAsjIFPAAIAAMjgAicGIIE6AAIAAsPIk6AAg");
	this.shape_260.setTransform(675.6,-145);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#6F6970").s().p("AinGSIAAsjIFOAAIAAMjgAidGIIE6AAIAAsPIk6AAg");
	this.shape_261.setTransform(619.6,-145);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#6F6970").s().p("AinGSIAAsjIFPAAIAAMjgAicGIIE6AAIAAsPIk6AAg");
	this.shape_262.setTransform(560.85,-145);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#6F6970").s().p("AinEgIAAo/IFPAAIAAI/gAicEZIE6AAIAAowIk6AAg");
	this.shape_263.setTransform(675.6,-71.475);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#6F6970").s().p("AinEgIAAo/IFOAAIAAI/gAidEZIE6AAIAAowIk6AAg");
	this.shape_264.setTransform(619.6,-71.475);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#6F6970").s().p("AinEgIAAo/IFPAAIAAI/gAicEZIE6AAIAAowIk6AAg");
	this.shape_265.setTransform(560.85,-71.475);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#6F6970").s().p("AimEgIAAo/IFOAAIAAI/gAicEZIE6AAIAAowIk6AAg");
	this.shape_266.setTransform(498.85,-71.475);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#6F6970").s().p("AimGSIAAsjIFOAAIAAMjgAicGIIE6AAIAAsPIk6AAg");
	this.shape_267.setTransform(498.85,-145);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FCFCFC").s().p("AnCGpIAAtRIOEAAIAANRgADnGfIDRAAIAAs+IjRAAgAhvGfIFNAAIAAs+IlNAAgAm4GfIE/AAIAAs+Ik/AAg");
	this.shape_268.setTransform(645.3,19.3);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FCFCFC").s().p("An/GpIAAtRIP/AAIAANRgADYGfIEeAAIAAs+IkeAAgAitGfIF7AAIAAs+Il7AAgAn1GfIE+AAIAAs+Ik+AAg");
	this.shape_269.setTransform(536.175,19.3);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#716D72").s().p("Am8GlIAAtJIN6AAIAANJg");
	this.shape_270.setTransform(645.3,19.3);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#716D72").s().p("An6GlIAAtJIP1AAIAANJg");
	this.shape_271.setTransform(536.175,19.3);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#A694AA").s().p("AwABwIAAjfMAgBAAAIAADfg");
	this.shape_272.setTransform(587.4,77.325);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#59515B").s().p("AzmBgIFgjwMAhtAAAIgDAtMghgAAAIlqDzgAzhBjIAAAkIFijvIACgBMAhcAAAIACghMghlAAAg");
	this.shape_273.setTransform(564.875,-271.5);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#655668").s().p("AzjBjIFejvMAhpAAAIgCAnMghfAAAIlmDyg");
	this.shape_274.setTransform(564.875,-271.625);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#443D47").s().p("AmqgaINVhDIAACAItVA7gAmigTIAABpINGg6IAAhxg");
	this.shape_275.setTransform(434.15,-35.575);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#968799").s().p("AmngXINOhCIAAB5ItOA6g");
	this.shape_276.setTransform(434.15,-35.575);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#F2B170").s().p("AmWJ1IAA03IE+iHIAAIlIHvioIAAUWg");
	this.shape_277.setTransform(229.95,-39.35);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#59515B").s().p("AmuStMAAAgkGINdk0MAAAAsagAmpxVMAAAAj/INTDeMAAAgsOg");
	this.shape_278.setTransform(434.525,-43.6);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#DDD0EF").s().p("AmrSrMAAAgkDINXkxMAAAAsTg");
	this.shape_279.setTransform(434.525,-43.575);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#59515B").s().p("AwnWNMAAAgsaMAhPAAAMAAAAsagAwiWJMAhFAAAMAAAgsQMghFAAAg");
	this.shape_280.setTransform(583.975,-43.6);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#9195B7").s().p("AwkWLMAAAgsVMAhJAAAMAAAAsVg");
	this.shape_281.setTransform(583.975,-43.6);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#59515B").s().p("AiVcbMAAAg2ZIErjEMAAAA6FgAiQ58MAAAA2SIEhAoMAAAg53g");
	this.shape_282.setTransform(462.575,-91.125);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#AA97BA").s().p("AiTcXMAAAg2VIEnjBMAAAA5/g");
	this.shape_283.setTransform(462.575,-91);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#59515B").s().p("AwndDMAAAg6FMAhPAAAMAAAA6Fg");
	this.shape_284.setTransform(583.975,-91.125);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#F3EDF9").s().p("AwkdBMAAAg6BMAhJAAAMAAAA6Bg");
	this.shape_285.setTransform(583.975,-91.125);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#443D47").s().p("AjCbJMAAAgz3IGFkiMgADA6ggAi+4sMAAAAzxIF4CEMAAFg6Pg");
	this.shape_286.setTransform(418.95,-98.7);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#BFB6C6").s().p("AjAbGMAAAgz0IGBkdMgAEA6Xg");
	this.shape_287.setTransform(418.925,-98.625);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FDFAFF").s().p("AzsdQMAAEg6gMAnVAAAMAAAA6gg");
	this.shape_288.setTransform(564.225,-98.7);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#F8B1AB").s().p("AhaHeIAAt3IC1hzIAAQZg");
	this.shape_289.setTransform(160.4,-34.125);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#C7E5D0").s().p("Aj6NuIAA6CIH1jaIAAfdg");
	this.shape_290.setTransform(295.7,-42.9);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#A81E22").s().p("Amu1QINdCLMAAAAleItdC4gAmpVLINTi2MAAAglVItTiLg");
	this.shape_291.setTransform(434.525,-59.975);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#A81E22").s().p("Amr1OINXCMMAAAAlaItXC2g");
	this.shape_292.setTransform(434.525,-60);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#F26E70").s().p("AlgSaMAAAgiSILBlYMAAAAqhgAlcv1MAAAAiKIK5C2MAAAgqTg");
	this.shape_293.setTransform(356.1,-60);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#A81E22").s().p("AleSXMAAAgiOIK9lWMAAAAqbg");
	this.shape_294.setTransform(356.1,-59.95);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#F2B170").s().p("AlcK9IAA4RIKEBbIA1ZOg");
	this.shape_295.setTransform(255.975,-38.3);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#F7924B").s().p("AhiFKIAAp+IDFhIIAAL5g");
	this.shape_296.setTransform(179.375,-14.55);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#F8B1AB").s().p("AjOHXIAAwZIGXAgIAGRlg");
	this.shape_297.setTransform(190.225,-28.725);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#E7B4FC").s().p("AgwCpIAAk6QAAgRAKgNQALgOARgEQAWgGATAPQATAPAAAYIAAFUg");
	this.shape_298.setTransform(127.15,-10.8857);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#E7B4FC").s().p("Ag3DGIAAlvQAAgUANgPQALgPATgFQAZgGAVARQAWAQAAAcIAAGMg");
	this.shape_299.setTransform(139.15,-10.7149);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#914EF9").s().p("AicC0IAAlpIE5hQIAAILg");
	this.shape_300.setTransform(135.575,-12.525);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FDFAFF").s().p("AmIPaIAA/cIMRAAMAAAAgFg");
	this.shape_301.setTransform(360.075,-40.85);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#F2C549").s().p("ABwHrIAAtGIkNh2IAAgmIE7CKIAANkg");
	this.shape_302.setTransform(-303.275,-109.4);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#655268").s().p("AgDB7IAAj1IAHACIAADzg");
	this.shape_303.setTransform(3.15,-31.1);

	this.instance_25 = new lib.Group_11();
	this.instance_25.setTransform(107.45,224,1,1,0,0,0,606.1,58.8);
	this.instance_25.alpha = 0.6016;

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#47365B").s().p("Ag/AeQAAgKAFgIQAGgIAIgBQABgHAEgGQAFgFAGgBIANAAIAAgBQAAgMAKAAIAJAAQAEAAADADQADAEAAAFIAAABIAPAAQAHAAAFAHQAEAFAAAHQAIACAGAHQAFAIAAAKg");
	this.shape_304.setTransform(-64.025,-155.6);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#332744").s().p("AgQByQgFgBgFgFQgFgGABgHIAAgCIgCAAQgHgBgBgIIgUjEIB5AAIgRDDQgBAEgCADQgDADgDAAIAAACQAAAHgEAGQgEAFgHABgAAghgIgOCxQAAAEACACQACADADAAIABAAQAJAAABgLIAPitQAAgDgBgDQgBgBAAAAQgBgBAAAAQgBAAAAAAQgBAAgBAAIgIAAQgEAAgBAGgAgMhkQgCADAAAEIAHCsQACALAGAAIABAAQAEAAADgDQACgDAAgFIANisQAAgEgDgDQgCgCgCAAIgYAAQgDgBgCADgAgvhkQgDAEAAAEIARCqQABAFADADQADADADAAQAEAAACgDQADgDgBgEIgHitQAAgIgHAAIgNAAQgDAAgCACg");
	this.shape_305.setTransform(-63.9,-141.7);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#CCCBA3").s().p("AgVBkIgTjHIAvAAQgEAeAEAmQAFA+AXA3IAGAOg");
	this.shape_306.setTransform(-65.375,-142.55);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#F9F9EF").s().p("AgjBkIgUjHIBvAAIgRDHg");
	this.shape_307.setTransform(-63.9,-142.55);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#2D2238").s().p("AgDAaQgHAAgFgFQgFgFAAgGIAAgjIApAAIAAAjQAAAGgFAFQgFAFgHAAg");
	this.shape_308.setTransform(-63.525,-130.35);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#57436D").s().p("Ag4AJQgHAAAAgHIAAgDQAAgHAHAAIBxAAQAHAAAAAHIAAADQAAAHgHAAg");
	this.shape_309.setTransform(-64.3,0.9);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#6E5189").s().p("AgzAJQgGAAgBgHIAAgDQABgHAGAAIBnAAQAGAAAAAHIAAADQAAAHgGAAg");
	this.shape_310.setTransform(-64.3,-0.875);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#443751").s().p("AhXAQIAAgHQABgJAHgIQAIgHAKAAIB7AAQALAAAHAHQAIAIgBAJIAAAHg");
	this.shape_311.setTransform(-64.2,52.9);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#443751").s().p("Ag+ERIAOohIBeAAIAAADQghAdgNA8QgMAyAZCUQASBjAfCAIABAcg");
	this.shape_312.setTransform(-64.2,27.225);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#6E5189").s().p("Ag+ERIAOohIBeAAIAAADIARIeg");
	this.shape_313.setTransform(-64.2,27.225);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#2D2238").s().p("AgVOVIAe8pIANAAQgFFwgGIkQgHLzADCig");
	this.shape_314.setTransform(-65.2,-37.2);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#4E3760").s().p("AgfOVIAf8pIAQAAIAPcpg");
	this.shape_315.setTransform(-64.2,-37.2);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#677F1D").s().p("AAOAYQgSgCgHgMIgTghIAWACQAXAEAHAIQAKALgBAVIgNABIgEAAg");
	this.shape_316.setTransform(-1.9207,-89.7687);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#677F1D").s().p("AgTAHIgEgHIALgJQALgHAEAFIAVATQgIAFgRABIgBAAQgLAAgGgHg");
	this.shape_317.setTransform(4.375,-85.4398);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#677F1D").s().p("AgVAMQAGgPAPgJQAVgPAEACQgCALgJAOQgJAOgdANQAAgGADgJg");
	this.shape_318.setTransform(8.025,-91.1618);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#677F1D").s().p("AgRAWQgDgOAKgKIAagfQAHAfgJAMQgGAJgLAIIgKAHQgDgFgBgHg");
	this.shape_319.setTransform(3.0771,-90.725);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#7C8C50").s().p("AEYGIQhshPAjhlQAYhGBGgxQgdAEgbgGQgjgIgQgYQgLgSACgTQgQAZgZAMQgdAMg6gFQgngEgogKQAbAOgWA1QgZA5grAbQgzAfhXgCQhNgBgEg0QgCgQAGgTIAGgQQgQARggALQAPAVAAAUQAAAxhCAiQhCAiheAAQhdAAhCgiQhCgiAAgxQAAgrA3ghQA2ghBSgGQhMhOBNhkQAngzA4gsQAliTB9gDQApgBBRAPQBhATAmADQAgADAaAGQAAgTADgTQAQhWB9gRQBjgOB9AfQA1ANAJAvQAGAkgTAuQAogaBFALQBNANBFA2QBcBHAVBGQAVBFgjB1QgdBjhOAUQgYAHgagCIgWgEQAeAigOA1QgOAzgtAnQgxApg+ADIgIAAQhFAAhDgygADGgQQAPgYAVgRQgYASgVgHQAKAMgBASg");
	this.shape_320.setTransform(-33.3347,-112.249);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#5E2419").s().p("AhkA7ICkh8IA2gWIjrCvg");
	this.shape_321.setTransform(-0.2,-61.5);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#5E2419").s().p("AhMBYICcjOIifDtg");
	this.shape_322.setTransform(-21.65,-101.85);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#5E2419").s().p("AAAAHQiwheABgHQABgIASADIASAFICFBRQCJBSAaADIASAcIiwhdg");
	this.shape_323.setTransform(-55.4753,-85.0429);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#5E2419").s().p("AhPOPQARhtAPiTQAfkmgHi/QgHi9hPjAQgZg8gdg1IgYgpIhXj6IAogKIAqCcQArCKAChZQAChZglh2IgkhjIAagvIA0EWQA7EoAnBaQAmBbgQm1IgXnHIAnHuQApH6AOBAQAGAaAFA4IAHBbQA5iCBJk8IA+kjIANgRIgNAuQgPBAgEBUQgEBEg5DWQguCvg6C6QAHCGgMDFQgGBigJBIg");
	this.shape_324.setTransform(-29.1,-57.775);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#565E28").s().p("ADwG/Qg9gfijg3QgoAXgqADQgvADgtgWQgxgYhJATQgLADhwAqQhGAbgkgJQgxgLgVhMQgVhJAZgeQAQgTAugGQAvgHAJgLQARgUghg8Qg9hvBohJQA1glBAgOQgSgDgMghQgNgjAFgsQAOh3CGhHQBjg0BFAwQA9AqAABVQAXg2BAgiQBAgiBSAAQBlAABHAyQBHAyAABGIAAAEQAXANAOAYQAMAYAFAmQAGApgTAvQgSApgiAnQBNASASBhQAaCUiaBtQg8AqhBARQggAJgYAAQgWAAgPgIg");
	this.shape_325.setTransform(-21.6292,-95.8459);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#005C2F").s().p("AANggIgfgIIAlAAIgHBRg");
	this.shape_326.setTransform(540.7,171.05);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#005C2F").s().p("AgoghIBRgGIhKAKIgHBFg");
	this.shape_327.setTransform(448.925,175.125);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#005C2F").s().p("AgogVIBRgeIhLAgIgGBHg");
	this.shape_328.setTransform(469.75,179.175);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#005C2F").s().p("AgJgUIATgZIgMAZIgCBCg");
	this.shape_329.setTransform(494.9,180.725);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#005C2F").s().p("AAtgSIhjgWIBtANIAABDg");
	this.shape_330.setTransform(524.25,176.95);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#83B741").s().p("Al0BiQibgpAAg5QAAg5CbgoQCagpDaAAQDaAACbApQCbAoAAA5QAAA5ibApQiaApjbAAQjaAAiagpgAlfg9QhDAQgnAWQgaAOgEAJQAEAKAaAOQAnAVBDARQCUAlDLAAQDMAACUglQBDgRAngVQAagOAEgKQgEgJgagOQgngWhDgQQiUgljMAAQjLAAiUAlg");
	this.shape_331.setTransform(490.575,164.725);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#211A09").s().p("AE8ALQiPgfi+AAQisAAiHAZQh3AYg1AiQgLgLAAgLQAAgpCIgjQCYgpDbAAQDcAACYApQCIAjAAApQAAASgdASQglgmh+gcg");
	this.shape_332.setTransform(490.575,160.55);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#3A2D09").s().p("AlzBOQiIglAAgpQAAgpCIgkQCYgpDbAAQDcAACYApQCIAkAAApQAAApiIAlQiYApjcAAQjbAAiYgpg");
	this.shape_333.setTransform(490.575,164.725);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#5B5852").s().p("AkUAoQhQgNg3gRQgmgLgbgNQgUgKgKgIQgOgLgEgKQAEAKAPALQALAIATAJQAaAMAmAKQA7ARBNAMQB/AUCUAAQCYAAB8gTQBNgMA6gRQAlgKAcgNQARgIANgJQASgPABgNQgBAOgSAOQgKAIgUAKQgcAOgkAKQg4ARhQANQh8AUiYABQiUgBiAgUg");
	this.shape_334.setTransform(490.3875,180.625);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#83B741").s().p("Al7BeQiSglAAgpQgEgiAAgdQgBg4ASgJQAsgWCcAMQDxAUBJAAQBRAADagYQCdgRAvAUQAaAKAAA8QgBAfgFAmQAAApiQAlQieApjdAAQjcAAihgpg");
	this.shape_335.setTransform(490.3978,172.9667);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#83B741").s().p("AhwAeQgvgMAAgSQAAgRAvgMQAvgMBBAAQBCAAAvAMQAvAMAAARQAAASgvAMQgvAMhCAAQhBAAgvgMgAhpgSQgVAFgMAGQgHAFgCACQAFAKAlAIQAqAMA/AAQBAAAArgMQAkgIAFgKQgCgCgHgFQgMgGgUgFQgugLg9AAQg8AAgtALg");
	this.shape_336.setTransform(-29.625,33.25);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#211A09").s().p("ABgADQgsgIg4AAQg0AAgpAHQgkAHgQAKQgEgDAAgDQAAgNApgKQAvgMBBAAQBDAAAuAMQApAKAAANQAAAFgJAFQgLgLgmgJg");
	this.shape_337.setTransform(-29.625,31.975);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#3A2D09").s().p("AhwAYQgpgLAAgNQAAgLApgLQAvgNBBAAQBDAAAuANQApALAAALQAAANgpALQguAMhDAAQhCAAgugMg");
	this.shape_338.setTransform(-29.625,33.225);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#83B741").s().p("AhyAcQgsgLAAgMIgCgTQAAgQAGgDQANgHAwAEQBIAGAWAAQAZAABBgHQAwgGAOAGQAIAEgBASIgBAUQAAAMgsALQgwANhCAAQhCAAgxgNg");
	this.shape_339.setTransform(-29.6985,35.7185);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#47365B").s().p("AgWAKQAAgIAHgBQAAgGAGABIAEAAIAAgBQAAgFAEAAIADAAQADAAAAAFIAAABIAGAAQAFgBAAAGQAHACAAAHg");
	this.shape_340.setTransform(120.175,-68.45);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#332744").s().p("AgFAnQgFAAAAgGIAAgBIgBAAQgBAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBIgHhDIArAAIgGBDQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAIAAABQAAAGgGAAgAALghIgEA9QAAABAAABQAAAAAAAAQAAABABAAQAAAAABAAIAAAAQAEAAAAgEIAFg7QAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAIgDAAQAAAAgBAAQAAABAAAAQAAAAgBAAQAAABAAAAgAgEggIACA8QAAABAAAAQABABAAAAQABABAAAAQAAAAABAAQABAAAAAAQABAAAAgBQABAAAAgBQAAAAAAgBIAEg8QABAAgBgBQAAgBAAAAQAAAAgBgBQAAAAgBAAIgIAAQgBAAAAAAQgBABAAAAQAAAAAAABQAAABAAAAgAgRgfIAGA6QABAEACAAIABAAQABAAAAAAQABAAAAgBQAAAAAAgBQAAgBAAgBIgCg7QAAAAAAgBQgBgBAAAAQAAAAgBgBQAAAAgBAAIgFAAQAAAAgBAAQAAABgBAAQAAABAAAAQAAABAAABg");
	this.shape_341.setTransform(120.225,-63.625);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#CCCBA3").s().p("AgHAjIgHhFIARAAQgEAgAOAgIACAFg");
	this.shape_342.setTransform(119.675,-63.925);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#F9F9EF").s().p("AgMAjIgHhFIAnAAIgGBFg");
	this.shape_343.setTransform(120.225,-63.925);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#2D2238").s().p("AgHACIAAgKIAOAAIAAAKQAAAHgHAAQgHAAAAgHg");
	this.shape_344.setTransform(120.35,-59.7);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#57436D").s().p("AgTADQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAIAnAAQABAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBAAg");
	this.shape_345.setTransform(120.075,-14.15);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#6E5189").s().p("AgRADQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAIAjAAQABAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAgBAAg");
	this.shape_346.setTransform(120.075,-14.75);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#443751").s().p("AgfAGQABgFADgCQADgEAFAAIAnAAQAFAAADAEQADACAAAFg");
	this.shape_347.setTransform(120.1,3.875);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#443751").s().p("AgWBfIAFi9IAhAAIAAABQgLALgFAUQgHAfAdB0IABAKg");
	this.shape_348.setTransform(120.125,-5.025);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#6E5189").s().p("AgWBfIAFi9IAhAAIAHC9g");
	this.shape_349.setTransform(120.125,-5.025);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#2D2238").s().p("AgGE+IAJp7IAEAAQgGI3ACBEg");
	this.shape_350.setTransform(119.75,-27.375);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#4E3760").s().p("AgKE+IAKp7IAGAAIAFJ7g");
	this.shape_351.setTransform(120.125,-27.375);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#47365B").s().p("AghAPQAAgLALgCQAAgKAIABIAHAAIAAgBQAAgHAFAAIAEAAQAGAAAAAHIAAABIAIAAQAHgBABAKQAJABABAMg");
	this.shape_352.setTransform(15.75,-92.35);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#332744").s().p("AgIA5QgHAAgBgJIAAgBIgBAAQgDAAAAgFIgKhiIA+AAIgJBiQgBAFgEAAIAAABQABADgDAEQgCACgEAAgAAQgwIgHBZQgBAFAFAAIABAAQAEgBAAgFIAIhXQAAgEgCAAIgFAAQAAAAgBAAQAAAAgBABQAAAAAAABQgBAAAAABgAgHgvIAEBXQAAAFADAAIABAAQAEAAABgFIAGhWQABgFgFAAIgLAAQgEAAAAAEgAgaguIAJBWQABAFAFAAQAEAAAAgFIgEhXQgBgEgDAAIgGAAQgGAAABAFg");
	this.shape_353.setTransform(15.85,-85.35);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#CCCBA3").s().p("AgLAyIgJhjIAYAAQgCAOACAUQACAeAMAcIAEAHg");
	this.shape_354.setTransform(15.05,-85.775);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#F9F9EF").s().p("AgSAyIgKhjIA5AAIgIBjg");
	this.shape_355.setTransform(15.825,-85.775);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#2D2238").s().p("AgHAKQgDgDAAgFIAAgOIAVAAIAAAOQAAAFgDADQgEADgEAAQgDAAgEgDg");
	this.shape_356.setTransform(16.025,-79.65);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#57436D").s().p("AgcAFQgEAAAAgFQAAgEAEABIA5AAQAEgBAAAEQAAAFgEAAg");
	this.shape_357.setTransform(15.625,-13.65);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#6E5189").s().p("AgZAEQgFAAAAgEQAAgDAFAAIAzAAQAFAAAAADQAAAEgFAAg");
	this.shape_358.setTransform(15.625,-14.525);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#443751").s().p("AgtAIQAAgHAFgEQAFgEAHAAIA5AAQAHAAAFAEQAFAEAAAHg");
	this.shape_359.setTransform(15.675,12.525);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#443751").s().p("AggCKIAIkTIAwAAIAAACQgRAPgHAeQgLArArCqIABAPg");
	this.shape_360.setTransform(15.675,-0.4);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#6E5189").s().p("AggCKIAIkTIAwAAIAJETg");
	this.shape_361.setTransform(15.675,-0.4);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#2D2238").s().p("AgKHOIAPubIAGAAQgKMrADBwg");
	this.shape_362.setTransform(15.15,-32.8);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#4E3760").s().p("AgPHOIAPubIAIAAIAIObg");
	this.shape_363.setTransform(15.675,-32.8);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#70665C").s().p("AhjgEIDHAGIi1ADg");
	this.shape_364.setTransform(163.225,14.925);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#70665C").s().p("AiXAFIgbgKIFlALg");
	this.shape_365.setTransform(206,27.975);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#70665C").s().p("AjTACIGngKImUARg");
	this.shape_366.setTransform(260.475,46.125);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#70665C").s().p("AjOAVIGdgyImcA7g");
	this.shape_367.setTransform(317.0125,65.175);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#70665C").s().p("AkEA4IIKh7InkCHg");
	this.shape_368.setTransform(393.55,87.025);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#70665C").s().p("AjSiAIGlDwIgKARg");
	this.shape_369.setTransform(655.225,111.325);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#70665C").s().p("ABAB1IiajsIC1Dvg");
	this.shape_370.setTransform(557.7,110.175);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#70665C").s().p("AizB0IFnjqIlGDtg");
	this.shape_371.setTransform(465.525,110.3);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FCF1E3").s().p("AGJJRMgzfgShIBVAAMA37AO5MAhKAAAIATDog");
	this.shape_372.setTransform(410.975,62.05);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#6D645A").s().p("AGAJmMgzYgTLIBVAAMA37AO5MAhLAAAIAWESg");
	this.shape_373.setTransform(411.15,64.2);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#6D655C").s().p("AjZCBIACgmIGxjbImWDcIABAlg");
	this.shape_374.setTransform(-425.8,103.75);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#6D655C").s().p("ACfBWIlljTIFwDNIAcAkIglAKg");
	this.shape_375.setTransform(-304.35,103.5);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#6D655C").s().p("AhzAAIDngBIgFADg");
	this.shape_376.setTransform(-41.8,24.6);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#6D655C").s().p("ACJgDIkyAKIFHgRIAMAKIghALg");
	this.shape_377.setTransform(-79.175,36.75);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#6D655C").s().p("ACQgHIk4AGIFPgOIACAWIgaAJg");
	this.shape_378.setTransform(-137.9125,56.8);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#6D655C").s().p("AFdgDIrygEIMkgNIAHAdIgnAMg");
	this.shape_379.setTransform(-239.325,83.825);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#F9E5CD").s().p("EgmaAFLIVGgBMA2zgNtIA+AAMgyXARDI6iAFg");
	this.shape_380.setTransform(-213.3,57.85);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#6D655C").s().p("EgmRAFfIVGgBMA21gOVIAqAAMgyFARrI6iAFg");
	this.shape_381.setTransform(-212.375,59.85);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#E8D2B3").s().p("EgmaAFLIVGgBMA2zgNtIA+AAMgyXARDI6iAFg");
	this.shape_382.setTransform(-213.3,57.85);

	this.instance_26 = new lib.Group_14();
	this.instance_26.setTransform(266.25,5.85,1,1,0,0,0,5.8,12);
	this.instance_26.alpha = 0.3516;

	this.instance_27 = new lib.Group_15();
	this.instance_27.setTransform(266.65,-9.05,1,1,0,0,0,6.2,12.5);
	this.instance_27.alpha = 0.3516;

	this.instance_28 = new lib.Group_16();
	this.instance_28.setTransform(266.65,-19.3,1,1,0,0,0,7.8,15.9);
	this.instance_28.alpha = 0.3516;

	this.instance_29 = new lib.Group_17();
	this.instance_29.setTransform(264.65,-25,1,1,0,0,0,4.2,8.7);
	this.instance_29.alpha = 0.3516;

	this.instance_30 = new lib.Group_18_0();
	this.instance_30.setTransform(242.15,4.85,1,1,0,0,0,5.8,12);
	this.instance_30.alpha = 0.3516;

	this.instance_31 = new lib.Group_19_0();
	this.instance_31.setTransform(242.55,-10.05,1,1,0,0,0,6.2,12.5);
	this.instance_31.alpha = 0.3516;

	this.instance_32 = new lib.Group_20_0();
	this.instance_32.setTransform(242.55,-20.3,1,1,0,0,0,7.8,15.9);
	this.instance_32.alpha = 0.3516;

	this.instance_33 = new lib.Group_21_0();
	this.instance_33.setTransform(240.55,-26,1,1,0,0,0,4.2,8.7);
	this.instance_33.alpha = 0.3516;

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#968772").s().p("ApLASIAAg9ISXAAIAABYg");
	this.shape_383.setTransform(428.125,1.25);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#F2C549").s().p("ArLkDIAAhFIWXJXIAAA6gArGkHIWNJJIAAgwI2NpSg");
	this.shape_384.setTransform(-252.65,-154.625);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#F2C549").s().p("ArHkFIAAg/IWPJUIAAA1g");
	this.shape_385.setTransform(-252.775,-154.65);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#F2C549").s().p("AAQEwIAAorIgygoIAAgVIBFA1IAAI8g");
	this.shape_386.setTransform(-264.65,-189.225);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#F2C549").s().p("AAQEwIAAosIgygnIAAgVIBFA1IAAI8g");
	this.shape_387.setTransform(-273.65,-195.425);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#F2C549").s().p("AAXFDIAApJIhAgrIAAgUIBTA4IAAJTg");
	this.shape_388.setTransform(-282.225,-200.2);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#F2C549").s().p("AAUFHIAApdIg6glIAAgUIBNAyIAAJtg");
	this.shape_389.setTransform(-291.675,-205.3);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#EBEAEC").s().p("AgiEXIAApPIBFA1IAAI8g");
	this.shape_390.setTransform(-264.65,-189.225);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#EBEAEC").s().p("AgiEXIAApPIBFA1IAAI8g");
	this.shape_391.setTransform(-273.65,-195.425);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#EBEAEC").s().p("AgpEdIAApiIBTA4IAAJTg");
	this.shape_392.setTransform(-282.225,-200.2);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#EBEAEC").s().p("AgmEqIAAp5IBNAyIAAJtg");
	this.shape_393.setTransform(-291.675,-205.3);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#EF7CF2").s().p("AjdARQgHgEAAgHIHJgaIAAABQAAAGgHAEQgFAEgIAAQgNAAgGgIQgEALgQAAQgMAAgGgJQgDALgRAAQgNAAgFgIQgDAKgQAAQgMAAgGgIQgFAKgPAAQgNAAgFgHQgCADgFAEQgGADgHAAQgNAAgFgIQgDAKgQAAQgNAAgFgIQgFAKgPAAQgMAAgGgIQgEALgPAAQgOAAgEgJQgEALgQAAQgNAAgFgIQgFALgPAAQgMAAgHgJQgDALgQAAQgJAAgFgEg");
	this.shape_394.setTransform(4.35,-8.875);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#815CA7").s().p("AklgSIITgPIA4ApInJAag");
	this.shape_395.setTransform(-2.15,-11.675);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#88798E").s().p("Ag/iHIB/gEIAAD3Ih/Afg");
	this.shape_396.setTransform(-3.625,-0.3);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#59515B").s().p("AgehiIA9gDIAAC+Ig9ANgAgchgIAADDIA5gMIAAi5g");
	this.shape_397.setTransform(17.225,-4.475);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#88798E").s().p("AAVhUIgyACIAAgJIA7gDIAAC8IgJABg");
	this.shape_398.setTransform(17.225,-5.025);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#9A87A0").s().p("AgdhhIA7gCIAAC8Ig7ALg");
	this.shape_399.setTransform(17.225,-4.5);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#59515B").s().p("AgthrIBbgEIAADLIhbAUgAgrhoIAADVIBXgTIAAjGg");
	this.shape_400.setTransform(8.325,-3.225);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#88798E").s().p("AAjhcIhPADIAAgIIBZgEIAADIIgKADg");
	this.shape_401.setTransform(8.325,-4.1);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#9A87A0").s().p("AgshqIBZgDIAADIIhZATg");
	this.shape_402.setTransform(8.325,-3.225);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#59515B").s().p("AhciHIC6gKIAAD3Ii6AsgAhaiFIAAETIC1gqIAAjyg");
	this.shape_403.setTransform(-21.4,1.025);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#88798E").s().p("ABLhsIimAIIAAgPIC3gJIAAD1IgRADg");
	this.shape_404.setTransform(-21.4,-0.95);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#9A87A0").s().p("AhbiGIC3gJIAAD0Ii3Arg");
	this.shape_405.setTransform(-21.4,1.025);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#655268").s().p("AgsBpIAAjRIBZAFIAADMgAgnBkIBPAAIAAjCIhPgFg");
	this.shape_406.setTransform(-2.75,-29.325);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#88828E").s().p("AgpBnIAAjNIBTAGIAADHg");
	this.shape_407.setTransform(-2.75,-29.325);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#655268").s().p("AgiBsIAAjXIBFAFIAADSgAgdBnIA7AAIAAjIIg7gEg");
	this.shape_408.setTransform(-12.25,-29.575);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#88828E").s().p("AggBpIAAjRIBBAEIAADNg");
	this.shape_409.setTransform(-12.25,-29.575);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#655268").s().p("Ag8BuIAAjbIB5AGIAADVgAg2BpIBtAAIAAjLIhtgGg");
	this.shape_410.setTransform(-23.15,-29.8);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#88828E").s().p("Ag5BsIAAjWIBzAFIAADRg");
	this.shape_411.setTransform(-23.15,-29.8);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#655268").s().p("Ag6CzIgDlLIA9ggIA/BFIAAEsgAg5iUIAEFCIBuAGIAAklIg5hAg");
	this.shape_412.setTransform(-23.35,-60.25);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#88828E").s().p("Ag4CwIgDlGIA7gfIA8BDIAAEog");
	this.shape_413.setTransform(-23.35,-60.225);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#655268").s().p("AgkCQIAAkjIBJBRIAADWgAgfCMIA/ADIAAjPIg/hGg");
	this.shape_414.setTransform(-12.05,-56.175);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#88828E").s().p("AgiCMIAAkbIBEBMIAADTg");
	this.shape_415.setTransform(-12.05,-55.975);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#655268").s().p("AgsBiIAAjKIBZBkIAABtgAgnBeIBPAGIAAhmIhPhZg");
	this.shape_416.setTransform(-2.75,-51.15);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#88828E").s().p("AgpBeIAAjBIBTBeIAABqg");
	this.shape_417.setTransform(-2.75,-50.95);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#815CA7").s().p("AAABRIAAiaIgIgBIAAgHIARAFIAACdg");
	this.shape_418.setTransform(19.425,-26.95);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#815CA7").s().p("AAABUIAAieIgKgDIAAgHIAVAFIAACkg");
	this.shape_419.setTransform(16.3,-27.375);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#815CA7").s().p("AACBYIAAimIgNgCIAAgHIAXAGIAACpg");
	this.shape_420.setTransform(12.875,-27.8);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#815CA7").s().p("AADBbIAAisIgPgDIAAgHIAZAGIAACxg");
	this.shape_421.setTransform(9.2,-28.275);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#815CA7").s().p("AAHBgIAAi0IgYgFIAAgHIAjAIIAAC5g");
	this.shape_422.setTransform(4.525,-28.9);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#7D7084").s().p("AgIBQIAAihIARAFIAACdg");
	this.shape_423.setTransform(19.425,-26.95);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#7D7084").s().p("AgKBUIAAioIAVAFIAACkg");
	this.shape_424.setTransform(16.3,-27.375);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#7D7084").s().p("AgLBYIAAivIAXAGIAACpg");
	this.shape_425.setTransform(12.875,-27.8);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#7D7084").s().p("AgMBbIAAi2IAZAGIAACxg");
	this.shape_426.setTransform(9.2,-28.275);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#7D7084").s().p("AgRBgIAAjAIAjAIIAAC5g");
	this.shape_427.setTransform(4.525,-28.9);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#EF7CF2").s().p("AkJgZIITAAIAAAkIoTAPgAkGAYIINgQIAAgfIoNAAg");
	this.shape_428.setTransform(-4.95,-16.175);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#EF7CF2").s().p("AkIgYIIRAAIAAAhIoRAQg");
	this.shape_429.setTransform(-4.975,-16.15);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#F2C549").s().p("AqBAoIAAhPIUDAAIAABPgAp8AjIT5AAIAAhFIz5AAg");
	this.shape_430.setTransform(-361.025,-238.875);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#F2C549").s().p("Ap+AlIAAhJIT9AAIAABJg");
	this.shape_431.setTransform(-361.025,-238.875);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#7C555E").s().p("AhlgSIAAgQIDLA5IAAAMg");
	this.shape_432.setTransform(12.95,-39.875);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#A38DB5").s().p("AhlgEIAAggIDLA1IgPAIIAAAMg");
	this.shape_433.setTransform(12.95,-38.075);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#040460").s().p("AiajNIE3AAIAAFSIk5BJgAiSDCIBcgWIAAlvIhbAAgAgsCqIB0gcIAAlRIh0AAgABSCMIBBgPIAAlAIhBAAg");
	this.shape_434.setTransform(-47.25,5.7);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#EBEAEC").s().p("AiWjIIEuAAIAAFJIkvBIg");
	this.shape_435.setTransform(-47.25,5.65);

	this.instance_34 = new lib.Group_32();
	this.instance_34.setTransform(-41.45,9.1,1,1,0,0,0,6,9.1);
	this.instance_34.alpha = 0.2891;

	this.instance_35 = new lib.Group_33();
	this.instance_35.setTransform(-43.9,5.8,1,1,0,0,0,10.5,17.1);
	this.instance_35.alpha = 0.2891;

	this.instance_36 = new lib.Group_34();
	this.instance_36.setTransform(-46.05,2.55,1,1,0,0,0,11.2,17.1);
	this.instance_36.alpha = 0.2891;

	this.instance_37 = new lib.Group_35();
	this.instance_37.setTransform(-48.45,1.05,1,1,0,0,0,8.8,14.6);
	this.instance_37.alpha = 0.2891;

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#513043").s().p("AibgEIEjgJIAAANIAUgKIgBARIk2AHg");
	this.shape_436.setTransform(-47.175,-75.5);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#7C555E").s().p("AhViTIhlA5IAAgOIBng4IEOEzIgBAOg");
	this.shape_437.setTransform(-14.95,-66.4);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#821A17").s().p("AgOAMIAAgXIAdAAIAAAXg");
	this.shape_438.setTransform(-54.15,-20);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#821A17").s().p("AgSAMIAAgXIAlAAIAAAXg");
	this.shape_439.setTransform(-61.725,-20);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#821A17").s().p("AgQAMIAAgXIAgAAIAAAXg");
	this.shape_440.setTransform(-68.75,-20);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#821A17").s().p("AgPAMIAAgXIAfAAIAAAXg");
	this.shape_441.setTransform(-75.525,-20);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FEFDFF").s().p("Ah5AMIAAgXIDzAAIAAAXg");
	this.shape_442.setTransform(-64.85,-20);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FEFDFF").s().p("AAQAaIhIgzIAdABIBUAyg");
	this.shape_443.setTransform(-61.425,-23.75);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#BA352B").s().p("AAbAZIhUgxIAMABIBnAwg");
	this.shape_444.setTransform(-58.4,-23.675);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#BA352B").s().p("AAPAbIhEg1IAiACIBJAzg");
	this.shape_445.setTransform(-65.175,-23.875);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FEFDFF").s().p("AAQAcIhCg3IAhACIBEA1g");
	this.shape_446.setTransform(-68.75,-23.975);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#BA352B").s().p("AAQAdIhBg5IAgACIBCA3g");
	this.shape_447.setTransform(-72.05,-24.05);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FEFDFF").s().p("AAOAeIg/g7IAiACIBBA5g");
	this.shape_448.setTransform(-75.375,-24.175);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#BA352B").s().p("AANAfIg4g9IAYABIA/A8g");
	this.shape_449.setTransform(-78.375,-24.25);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#A39FF4").s().p("AicjmIE5AKIAAF4Ik3BLg");
	this.shape_450.setTransform(-47.275,3.325);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#332333").s().p("AgfhuQAAgyAJgiQAIgjANABIABAAIAEABQALACAIAjQAJAhgBAwIAAFDIg+AQgAgRjBQgJAiABAxIAAFOIA0gOIAAk/QgBgwgHgiQgIgegIgCIgEgBIAAAAQgIABgIAeg");
	this.shape_451.setTransform(-66.55,5.15);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#574B5E").s().p("AgchuQAAgxAIgiQAJghAKAAIABAAIADABQAKADAIAgQAIAiAAAvIAAFBIg5APg");
	this.shape_452.setTransform(-66.55,5.125);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#332333").s().p("Agfh+QAAgyAJgiQAIgiANAAIABAAIAEABQAKACAIAcQAHAbACAoIABF3IgBABIg+APgAgRjRQgJAiAAAxIAAFtIA1gOIgBlzQgCgpgIgbQgHgWgHgCIgDgBIAAAAQgJAAgHAeg");
	this.shape_453.setTransform(-79.125,6.725);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#574B5E").s().p("Agch+QAAgxAIgiQAIggALAAIABAAIADABQAIACAIAYQAIAbACApIAAF2Ig5AOg");
	this.shape_454.setTransform(-79.125,6.675);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#332333").s().p("AgeiLQABgmAHgZQAIgjANABIABAAIAEABQALACAIAjQAIAhAAAwIABFTIg+APIgBAAgAgRjJQgHAYgBAmIgBFyIA1gNIgBlPQAAgwgIgiQgHgegJgCIgDgBIAAAAQgJABgHAeg");
	this.shape_455.setTransform(-72.875,5.95);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#574B5E").s().p("AgciKQACgnAGgYQAIghALAAIABAAIADABQAKADAIAfQAIAiAAAwIAAFRIg5AOg");
	this.shape_456.setTransform(-72.875,5.9);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#6E6572").s().p("AheipQAAgxAagiQAbgjAjABIARABQAjADAYAiQAZAhAAAvIAAGYIgBAAIh8AgIgBAAIg/AQg");
	this.shape_457.setTransform(-72.8,2.5);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#339933").s().p("AjEmSQAAgzA3gjQA1gjBLAAQAOAAAXADIArAGQA5AHAlAeQAkAeAAAlIAANmImJBAgAikgeIAAClICogTIAAibgAAUgoIAACbICQgQIAAiSgAikgpICogIIAAjzIiogEgAAUgyICQgIIAAjnIiQgDgAAUkvICQADIAAhuQAAgegdgXQgdgYgtgGIgpgFgAh3nYQgsAdgBApIAABfICoAEIAAjGIgRAAQg/AAgrAdg");
	this.shape_458.setTransform(-294.1,40.425);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#66CC66").s().p("AgHEqIAApTIAPAAIAAJTg");
	this.shape_459.setTransform(-294,21.498,1,1.047);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#EBEAEC").s().p("Ahtl0QAAgqAegeQAegdApAAIAUABIAbAGQAfAHAUAYQAUAZAAAfIAAMfIjbA2g");
	this.shape_460.setTransform(-295.8069,41.3397,1.6644,1.1012);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#EF7CF2").s().p("Ahej+IC8AxIAAGeIi8Aug");
	this.shape_461.setTransform(12.2,-15);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#EF7CF2").s().p("AiqnMIBQgsIEFErIAAJvIlVBXg");
	this.shape_462.setTransform(-14.4,-31.275);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#F2C549").s().p("Aq4ANIAAgZIVwAAIAAAZg");
	this.shape_463.setTransform(-391.7,-26.15);

	this.instance_38 = new lib.Group_42();
	this.instance_38.setTransform(-203,-105.55,1,1,0,0,0,8.8,12.5);
	this.instance_38.alpha = 0.3281;

	this.instance_39 = new lib.Group_43();
	this.instance_39.setTransform(-232.1,-114.55,1,1,0,0,0,11,15.5);
	this.instance_39.alpha = 0.3281;

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#F4ED6E").s().p("AgNGZIAApoIh2giIAAgUIB2AhIAAi6IATAHIAAC5IB+AjIAAAVIh+gkIAAJpg");
	this.shape_464.setTransform(-268.675,-94.75);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#F4ED6E").s().p("AgJGsIAApfIh9gjIAAgVIB9AjIAAjoIATAJIAADlIB9AjIAAAVIh9gjIAAJeg");
	this.shape_465.setTransform(-305.575,-107.175);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#F2C549").s().p("Akqr0IJVCcIAATGIpVCHgAkCLDICcgkIAA02IicgpgAhSKbIC8grIAAzQIi8gygAB+JsICFgeIAAyHIiFgig");
	this.shape_466.setTransform(-222.65,-2.2,0.9358,0.7315,0,0,0,-8.3,-28.4);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#EBEAEC").s().p("AkWp5IItB+IAAQIIotBtg");
	this.shape_467.setTransform(-215.275,25.975);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#F2C549").s().p("AB2HXIAAsxIkGhiIAAgjIEhBsIAANSg");
	this.shape_468.setTransform(-267.275,-96.2);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#EBEAEC").s().p("AiSGAIAFtfIEgBsIAANSg");
	this.shape_469.setTransform(-267.525,-96.2);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#F4ED6E").s().p("AiSGAIAFtfIEgBsIAANSg");
	this.shape_470.setTransform(-267.525,-108.1);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#EBEAEC").s().p("AidGeIAAuVIE7CKIAANkg");
	this.shape_471.setTransform(-303.275,-109.4);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#F4ED6E").s().p("AidGeIAAuVIE7CKIAANkg");
	this.shape_472.setTransform(-303.275,-121.3);

	this.instance_40 = new lib.Group_45();
	this.instance_40.setTransform(-389.05,-145,1,1,0,0,0,13.4,26.7);
	this.instance_40.alpha = 0.6406;

	this.instance_41 = new lib.Group_46();
	this.instance_41.setTransform(-426.55,-75.6,1,1,0,0,0,13.3,26.7);
	this.instance_41.alpha = 0.6406;

	this.instance_42 = new lib.Group_47();
	this.instance_42.setTransform(-392.95,-75.6,1,1,0,0,0,13.4,26.7);
	this.instance_42.alpha = 0.6406;

	this.instance_43 = new lib.Group_48();
	this.instance_43.setTransform(-349.5,-72.35,1,1,0,0,0,13.4,26.7);
	this.instance_43.alpha = 0.6406;

	this.instance_44 = new lib.Group_49();
	this.instance_44.setTransform(-362.85,-171.4);
	this.instance_44.alpha = 0.6406;

	this.instance_45 = new lib.Group_50();
	this.instance_45.setTransform(-423.05,-144.75,1,1,0,0,0,13.3,26.7);
	this.instance_45.alpha = 0.6406;

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#F2C549").s().p("AqiAiIAAhDIVFAAIAABDgAqdAdIU7AAIAAg5I07AAg");
	this.shape_473.setTransform(-391.225,-108.975);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#F2C549").s().p("AqgAgIAAg/IVBAAIAAA/g");
	this.shape_474.setTransform(-391.225,-108.975);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#F2C549").s().p("AghMbIAA41IBDAAIAAY1gAgcMUIA5AAIAA4oIg5AAg");
	this.shape_475.setTransform(-326.825,-105.5278,1,1.009);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#F2C549").s().p("AgfKrIAA1VIA/AAIAAVVg");
	this.shape_476.setTransform(-323.9,-91.85,1,1.1829,0,0,0,2.9,11.9);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#F2C549").s().p("AqiAiIAAhDIVFAAIAABDgAqdAdIU7AAIAAg5I07AAg");
	this.shape_477.setTransform(-391.725,-184.075);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#F2C549").s().p("AqfAgIAAg/IU/AAIAAA/g");
	this.shape_478.setTransform(-391.725,-184.075);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#EF854B").s().p("AgqB4IgtjvIB5AAIA2Dvg");
	this.shape_479.setTransform(-339.5,-12.875);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#FFDFCA").s().p("AgvB4IgljvIB9AAIAsDvg");
	this.shape_480.setTransform(-352.325,-12.875);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#EF854B").s().p("Ag1B4IggjvICGAAIAlDvg");
	this.shape_481.setTransform(-365.675,-12.875);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#FFDFCA").s().p("AgzB4IgZjvIB5AAIAgDvg");
	this.shape_482.setTransform(-378.775,-12.875);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#EF854B").s().p("Ag8B4IgXjvICOAAIAZDvg");
	this.shape_483.setTransform(-392.375,-12.875);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#EF854B").s().p("AhPB4IAMjvICJAAIAKDvg");
	this.shape_484.setTransform(-421.175,-12.875);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#FFDFCA").s().p("AhUB4IAsjvIB9AAIgMDvg");
	this.shape_485.setTransform(-436.475,-12.875);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#EF854B").s().p("AhQB4IAAhQIAmifIB7AAIgrDvg");
	this.shape_486.setTransform(-448.725,-12.875);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#FFDFCA").s().p("AgShPIAlAAIglCfg");
	this.shape_487.setTransform(-454.925,-16.875);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FFDFCA").s().p("AhEBzIgKjlICGAAIAXDlg");
	this.shape_488.setTransform(-406.35,-13.35);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#F4ED6E").s().p("Alu1qILdEzMAAAAjtIrdC0gAlqVkILVizMAAAgjkIrVkvg");
	this.shape_489.setTransform(-287.45,-47);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#514E51").s().p("Aq/B6IAAjzIVFAAIA6DzgAK5B1Ig3jpI08AAIAADpIVzAAg");
	this.shape_490.setTransform(-386.725,-12.875);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#F2C549").s().p("AhuBmIAAjLIDdAAIAAANIjPAAIAAC+g");
	this.shape_491.setTransform(-386.725,72.825);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#F2C549").s().p("AhuBmIAAjLIDdAAIAAANIjPAAIAAC+g");
	this.shape_492.setTransform(-362.35,72.825);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#F2C549").s().p("AhuBmIAAjLIDdAAIAAANIjPAAIAAC+g");
	this.shape_493.setTransform(-336.25,72.825);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#F4ED6E").s().p("AieC5IAAlxIE9AAIAAFxgAiYC0IExAAIAAlnIkxAAg");
	this.shape_494.setTransform(-434.875,69.475);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#F4ED6E").s().p("AibC2IAAlrIE3AAIAAFrg");
	this.shape_495.setTransform(-434.875,69.475);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#F2C549").s().p("AjKITIAAwlIGVAAIAAQlgAjFIOIGLAAIAAwbImLAAgAinBRIAApAIFPAAIAAJAgAiiBMIFFAAIAAo2IlFAAg");
	this.shape_496.setTransform(-433.425,37.775);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#F2C549").s().p("AjIIQIAAwfIGRAAIAAQfgAilBPIFLAAIAAo7IlLAAg");
	this.shape_497.setTransform(-433.425,37.775);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#EBEAEC").s().p("Ai2H/IAAv9IFtAAIAAP9g");
	this.shape_498.setTransform(-433.425,37.775);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#F2C549").s().p("AmdFiIAArEIM7AAIAALEgAmYFeIMxAAIAAq6IsxAAgAl2E7IAAp0ILtAAIAAJ0gAlxE1ILkAAIAApqIrkAAg");
	this.shape_499.setTransform(-365.175,20.15);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#F2C549").s().p("AmcFgIAAq/IM5AAIAAK/gAl1E4ILrAAIAApvIrrAAg");
	this.shape_500.setTransform(-365.05,20.15);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#EBEAEC").s().p("AmKFMIAAqXIMVAAIAAKXg");
	this.shape_501.setTransform(-364.875,20.15);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#F2C549").s().p("AqlBHIAAiNIVLAAIAACNg");
	this.shape_502.setTransform(-391.6,-32.05);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#F4ED6E").s().p("AqGF7IAAr1IUNAAIAAL1gAE1FxIFIAAIAArhIlIAAgAgbFxIFGAAIAArhIlGAAgAlsFxIFHAAIAArhIlHAAgAp8FxIEGAAIAArhIkGAAg");
	this.shape_503.setTransform(-388.625,-68.325);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#F4ED6E").s().p("An9F3IAArtIP7AAIAALtgACtFtIFHAAIAArZIlHAAgAiiFtIFFAAIAArZIlFAAgAnzFtIFHAAIAArZIlHAAg");
	this.shape_504.setTransform(-375.175,-149.175);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#F4ED6E").s().p("AiqF0IAArnIFVAAIAALngAilFvIFLAAIAAreIlLAAg");
	this.shape_505.setTransform(-341.325,-149.175);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#F4ED6E").s().p("AiqF0IAArnIFVAAIAALngAilFvIFLAAIAAreIlLAAg");
	this.shape_506.setTransform(-375.05,-149.175);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#F4ED6E").s().p("AiqF0IAArnIFVAAIAALngAilFvIFLAAIAAreIlLAAg");
	this.shape_507.setTransform(-408.775,-149.175);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#F4ED6E").s().p("AiMF3IAArtIEZAAIAALtgAiCFtIEFAAIAArZIkFAAg");
	this.shape_508.setTransform(-439.225,-149.175);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#F4ED6E").s().p("AiJF0IAArnIETAAIAALngAiEFvIEJAAIAAreIkJAAg");
	this.shape_509.setTransform(-439.225,-149.175);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#F4ED6E").s().p("Aqj1oIVHAAMgACArRI1FAAgAqeVkIU7AAMAACgrHI09AAg");
	this.shape_510.setTransform(-398.35,-48.325);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#F4ED6E").s().p("Aqh1mIVDAAMgACArMI1BABg");
	this.shape_511.setTransform(-398.35,-48.325);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#B7848E").s().p("AjEgNIGJgSIhmA2IkjAJg");
	this.shape_512.setTransform(-43.075,-79.225);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#010156").s().p("AADB7IAAg4IglgCIAAgGIAlADIAAg7IglgDIAAgFIAlAEIAAg9IglgFIABgFIAkAFIAAg3IAFAAIAAA4IAcAEIgBAEIgbgDIAAA8IAaACIAAAFIgagCIAAA7IAcABIgBAFIgbgCIAAA4g");
	this.shape_513.setTransform(-37.1,-34.4);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#010156").s().p("AhnCRIgBgBIAAkcIAAgBIABAAIBYARQAJgPAOgIQAPgIASAAQATABAOAKQAPAKAHAQIAJASIAAD+IAAABIgBABgAAJiRQgOAIgIAPIAAENIB0AGIAAj8IgJgSQgIgQgOgJQgNgJgSgBIgCAAQgQAAgOAHgAg5CRIAoACIAAg4IgogDgAhmCPIAoACIAAg5IgogCgAg5BTIAoADIAAhBIgogEgAhmBRIAoACIAAhDIgogEgAg5AMIAoADIAAhBIgogFgAhmAHIAoAEIAAhDIgogFgAg5g8IAoAFIAAhDIgogHgAhmhCIAoAFIAAhFIgogIg");
	this.shape_514.setTransform(-51,-37.6265);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#7C555E").s().p("AgiB/QAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAAj+IAAgBIABAAIBGANIABABIAAD0IgBABIgBAAgAghB8IBDAEIAAjyIhDgNg");
	this.shape_515.setTransform(-37.1,-34.725);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#8890A5").s().p("AgiB+IAAj+IBFAOIAADzg");
	this.shape_516.setTransform(-37.1,-34.75);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#EBEAEC").s().p("Ag7CUIAAkPQATggAmACQAkABARAiIAJASIAAD+g");
	this.shape_517.setTransform(-46.6,-37.5784);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#8890A5").s().p("AgrCMIAAkcIBXARIAAEQg");
	this.shape_518.setTransform(-57.025,-37.2);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#C7CEE5").s().p("AibmOIBaAUQADgOAZgLQAagMAWAEQAkAHARAdQAJAPABAOIBSASIAAKbIk3BKg");
	this.shape_519.setTransform(-47.175,-14.9016);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#00632F").s().p("AjuAaQAHgwA8gkQA+gmBRAAQAWAAAUADQBbANBGA+QBBA7gBA4gADpBbQgDg2g/g2QhDg7hWgMQgUgDgWAAQhOAAg7AlQg4AigJAsIHPBDIAAAAg");
	this.shape_520.setTransform(-107.1742,-33.675);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#58B775").s().p("AjqAaQAIgtA4gkQA9gmBQAAQAWAAAUACQBZANBEA9QBAA4ABA4g");
	this.shape_521.setTransform(-107.075,-33.7);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#58B775").s().p("AgZFgIAArHIAzAeIAAKxg");
	this.shape_522.setTransform(-128.975,-66.325);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#00632F").s().p("Ajzq9IHnESIAAPuInnB7gAjuK4IHdh5IAAvnIndkNg");
	this.shape_523.setTransform(-107.175,-26.575);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#00632F").s().p("ADxB2InjgqIAAjBIACAAIHjBFIAACmgAjvBJIHfArIAAiiInfhFgADnBsInPgqIAAisIACAAIHPBCIAACUgAjlBAIHLApIAAiOInLhCg");
	this.shape_524.setTransform(-107.2,-19.25);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#00632F").s().p("AjwBKIAAi+IHhBFIAACkgAjmBBIHNApIAAiQInNhDg");
	this.shape_525.setTransform(-107.175,-19.25);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#EBEAEC").s().p("AjrBGIAAi0IHXBDIAACagAjpBEIHTApIAAiWInThCg");
	this.shape_526.setTransform(-107.175,-19.225);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#EBEAEC").s().p("AjqBFIAAiyIHVBDIAACYg");
	this.shape_527.setTransform(-107.2,-19.225);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#00632F").s().p("Ag+jXIACAAIB7ALIAAGEIgBABIh8AfgAg7DVIB3gfIAAmAIh3gKgAg0jMIBpAJIAAFzIgBABIhoAagAgxDIIBjgZIAAlvIhjgJg");
	this.shape_528.setTransform(-89.225,12.825);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#00632F").s().p("Ag9jVIB7AKIAAGCIh7AfgAgzDJIBngZIAAlyIhngJg");
	this.shape_529.setTransform(-89.2,12.825);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#EBEAEC").s().p("Ag3jQIBvAKIAAF6IhvAdg");
	this.shape_530.setTransform(-89.2,12.75);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#CC8662").s().p("AgDA0IAAhoQAAgDADAAQABAAABAAQAAAAABABQAAAAABABQAAAAAAABIAABoQAAAEgEAAQgDAAAAgEg");
	this.shape_531.setTransform(-104.375,14.775);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#00632F").s().p("AhVjKICrgCIAAFuIirArgAhLjAIAAGAIBTgVIAAlsgAASjBIAAFqIA6gPIAAlcg");
	this.shape_532.setTransform(-103.975,18.075);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#EBEAEC").s().p("AhQjEIChgCIAAFkIihAqg");
	this.shape_533.setTransform(-103.975,18);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#00632F").s().p("Ag+gOQAVgVAeAAIAjADQAaACASATQASATAAAaIirACQABgeAWgUgAg0gKQgSAOgEAWICVgCQgEgTgOgNQgOgNgUgCIgcgCIgGAAQgXAAgSAPg");
	this.shape_534.setTransform(-103.975,-5.825);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#EBEAEC").s().p("Ag5gMQATgSAbAAIAiADQAXACARAQQAQAPACAXIihACQADgaAUgRg");
	this.shape_535.setTransform(-103.975,-5.825);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#00632F").s().p("AhekUIACAAIC7ARIAAHoIgBAAIi8AwgAhbESIC3gvIAAnkIi3gQgAhUkJIACAAICnAPIAAHXIgBABIioAqgAhREFICjgqIAAnTIijgOg");
	this.shape_536.setTransform(-121.975,15.775);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#00632F").s().p("AhckTIC5ARIAAHmIi5AvgAhSEHIClgrIAAnVIilgPg");
	this.shape_537.setTransform(-121.95,15.75);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#EBEAEC").s().p("AhYkNICxAQIAAHeIixAsg");
	this.shape_538.setTransform(-121.95,15.7);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#58B775").s().p("AjzhuIAAg3IHnEYIAAAzgAjuhxIHdEPIAAgoIndkSg");
	this.shape_539.setTransform(-107.175,-85.675);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#58B775").s().p("AjwhwIAAgxIHhEVIAAAug");
	this.shape_540.setTransform(-107.175,-85.65);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#58B775").s().p("AjwmmIHhCPIAAJFInhB5g");
	this.shape_541.setTransform(-107.175,0.975);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#00632F").s().p("AjwDMIAAomIHhEQIAAGlgADnFNIAAh1IhcgfIAAB5IgBAAgAAMENIB1AiIAAh6Ih1gngAh1DmIB3AkIAAiAIh3gogAjmDEIBnAfIAAiFIhngjgACLCuIBcAfIAAiXIhcgqgAAMCDIB1AoIAAikIh1g0gAh1BXIB3ApIAAixIh3g3gAjmAxIBnAjIAAjBIhngvgACLABIBcAqIAAhvIhcg0gAAMg4IB1A1IAAh7Ih1hBgAh1hzIB3A3IAAiJIh3hDgAjminIBnAvIAAiWIhng7g");
	this.shape_542.setTransform(-107.175,-61.725);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#EBEAEC").s().p("AjrDHIAAoZIHXEKIAAGbg");
	this.shape_543.setTransform(-107.175,-61.65);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFD7B6").s().p("Ajwq6IHhEQIAAPrInhB5g");
	this.shape_544.setTransform(-107.175,-26.55);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#F4ED6E").s().p("Alt1mILbEvMAAAAjuIrbCwg");
	this.shape_545.setTransform(-287.3573,-47.75,1.0628,1);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#F4ED6E").s().p("Ai5ZqIB2ggIh2AjgAi/5sIF/EIMAAAAtnIkDBHID+hLMAAAgthIl2kCMAACAzOIgCABg");
	this.shape_546.setTransform(-278.025,-80.7);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#F4ED6E").s().p("Ai85rIF5EDMAAAAtkIl4Bvg");
	this.shape_547.setTransform(-278.025,-80.2);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#585C68").s().p("AABAaIhigGIgBAAIgBgBIAAgdIABABIABAAIBiAGIAAkBIhigVIgBgBIgBAAIAAgfIABABIABAAIBiAVIAAkhIAfANIAAEbIBCAOIAAAAIACABIAAAeIgCAAIAAAAIhCgOIAAD7IBCADIAAABIACAAIAAAeIgCAAIhCgEIAAIiIgfAHg");
	this.shape_548.setTransform(-72.8,-29.275);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#39323D").s().p("AgJEzIAApmIATAJIAAJeg");
	this.shape_549.setTransform(-73.425,-57.3);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#555760").s().p("AhjpnIDHBZIAARFIjHAygAhhJlIDDgwIAAxBIjDhYg");
	this.shape_550.setTransform(-72.8,-30.3);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#83798E").s().p("AhjpnIDHBZIAARFIjHAygAhhJlIDDgwIAAxBIjDhYg");
	this.shape_551.setTransform(-72.8,-30.3);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#555760").s().p("AhipmIDFBYIAAREIjFAxgAhdJgIC7guIAAw8Ii7hUg");
	this.shape_552.setTransform(-72.825,-30.275);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#83798E").s().p("AhfpiIC/BVIAARBIi/Avg");
	this.shape_553.setTransform(-72.825,-30.25);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#766477").s().p("AkHi8IgBhFIIRHLIAAA4g");
	this.shape_554.setTransform(-154.85,-184.275);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#8F7B91").s().p("Ao6AlIR1h8IABBFIx2Bqg");
	this.shape_555.setTransform(-238.4,-201.3);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#544D54").s().p("AE2ivIwgBsIhZg6IR3htIIQHBIggAUg");
	this.shape_556.setTransform(-211.975,-179.9);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#83798E").s().p("Ag6hrIB1gLIAADQIh1AdgAgwhiIAADNIBhgYIAAi/g");
	this.shape_557.setTransform(-140.925,35.4);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#979DB7").s().p("Ag1hmIBrgLIAADIIhrAbg");
	this.shape_558.setTransform(-140.925,35.375);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#727993").s().p("Ag6gKIB1gIIAAAZIh1AMg");
	this.shape_559.setTransform(-140.925,22.75);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#83798E").s().p("Ag6j5IAAABQA1APAgArQAgArAAA3IAAFNIh1AJgAgwDvIBhgHIAAlEQAAgwgbgnQgagngsgRg");
	this.shape_560.setTransform(-140.925,-3.275);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#979DB7").s().p("Ag1jzQAwAQAdAqQAeApAAAzIAAFJIhrAIg");
	this.shape_561.setTransform(-140.925,-3.175);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#83798E").s().p("AhOh0ICdgQIAADiIidAngAhEhrIAADjICJghIAAjQg");
	this.shape_562.setTransform(-154.725,37.925);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#979DB7").s().p("AhJhvICTgPIAADZIiTAkg");
	this.shape_563.setTransform(-154.725,37.875);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#83798E").s().p("AhOkQIAMAAQAXAAAWAHIBkAcIAAHyIidAMgAhEEHICJgLIAAnhIhdgbQgUgGgWAAIgCAAg");
	this.shape_564.setTransform(-154.725,-4.45);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#979DB7").s().p("AhJkLIAHAAQAWAAAVAGIBhAcIAAHqIiTALg");
	this.shape_565.setTransform(-154.725,-4.475);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#727993").s().p("AhOgKICdgMIAAAdIidAPg");
	this.shape_566.setTransform(-154.725,23.95);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#83798E").s().p("AhKiAICVgPIAAD5IiVAlgAhAh3IAAD6ICBggIAAjmg");
	this.shape_567.setTransform(-170.125,40.55);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#979DB7").s().p("AhFh7ICLgNIAADvIiLAig");
	this.shape_568.setTransform(-170.125,40.5);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#727993").s().p("AhKgMICVgLIAAAgIiVAPg");
	this.shape_569.setTransform(-170.125,25.25);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#83798E").s().p("AhKhzQAAhBAsgvQArguA+gEIAAIgIiVALgAgbjXQglArAAA5IAAF+ICBgJIAAoMQg3AIglArg");
	this.shape_570.setTransform(-170.125,-3.875);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#979DB7").s().p("AhFhzQAAg8AogtQAogtA7gHIAAIXIiLAKg");
	this.shape_571.setTransform(-170.125,-3.875);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#747B93").s().p("AARE9IAApYIgpgWIAAgOIAxAbIAAJjg");
	this.shape_572.setTransform(-148.25,-76.7);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#747B93").s().p("AAMExIAApGIgfgQIAAgNIAnAVIAAJQg");
	this.shape_573.setTransform(-139.45,-72.925);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#747B93").s().p("AATFIIAApsIgsgYIAAgNIAzAcIAAJ3g");
	this.shape_574.setTransform(-157.1,-80.425);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#747B93").s().p("AAYFVIAAqAIg3geIAAgNIA+AiIAAKLg");
	this.shape_575.setTransform(-166.6,-84.5);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#979DB7").s().p("AgYEwIAApvIAxAbIAAJjg");
	this.shape_576.setTransform(-148.25,-76.7);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FF64F4").s().p("AgOEkIAApRIAdARIAAJJg");
	this.shape_577.setTransform(-135.95,-71.4);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#979DB7").s().p("AgTEnIAApZIAnAVIAAJQg");
	this.shape_578.setTransform(-139.45,-72.925);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FF64F4").s().p("AgVErIAApjIArAYIAAJZg");
	this.shape_579.setTransform(-143.6,-74.7);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FF64F4").s().p("AgSE3IAAp4IAlAUIAAJvg");
	this.shape_580.setTransform(-152.6,-78.45);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#979DB7").s().p("AgZE6IAAqDIAzAcIAAJ3g");
	this.shape_581.setTransform(-157.1,-80.425);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FF64F4").s().p("AgSFAIAAqLIAlAUIAAKDg");
	this.shape_582.setTransform(-161.6,-82.225);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#979DB7").s().p("AgfFEIAAqaIA+AiIAAKLg");
	this.shape_583.setTransform(-166.6,-84.5);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FF64F4").s().p("AgXE2IAAqEIAuAnIAAJ2g");
	this.shape_584.setTransform(-172.1,-157.825);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FF64F4").s().p("AgOEHIAAodIAdAYIAAIVg");
	this.shape_585.setTransform(-135.95,-132.7);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#747B93").s().p("AAMEaIAAoMIgfgaIAAgSIAnAhIAAIdg");
	this.shape_586.setTransform(-139.45,-135.2);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#747B93").s().p("AARErIAAolIgpgjIAAgRIAxApIAAI0g");
	this.shape_587.setTransform(-148.25,-141.375);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#747B93").s().p("AASE4IAAo9IgrglIAAgRIAzAsIAAJLg");
	this.shape_588.setTransform(-157.1,-147.5);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#747B93").s().p("AAXFJIAApWIg2guIAAgRIA+A0IAAJlg");
	this.shape_589.setTransform(-166.6,-154.125);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#747B93").s().p("AAXFZIAAp0Ig2gvIAAgRIA/A1IgDKCg");
	this.shape_590.setTransform(-177.35,-161.625);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#979DB7").s().p("AgTEJIAAonIAnAhIAAIdg");
	this.shape_591.setTransform(-139.45,-135.2);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FF64F4").s().p("AgVEOIAAozIArAkIAAIng");
	this.shape_592.setTransform(-143.6,-138.1);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#979DB7").s().p("AgYEUIAApCIAxApIAAI0g");
	this.shape_593.setTransform(-148.25,-141.375);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FF64F4").s().p("AgSEcIAApMIAlAfIAAJCg");
	this.shape_594.setTransform(-152.6,-144.275);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#979DB7").s().p("AgZEfIAApaIAzAsIAAJLg");
	this.shape_595.setTransform(-157.1,-147.5);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FF64F4").s().p("AgREpIAAplIAjAeIAAJbg");
	this.shape_596.setTransform(-162.075,-146.525);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#979DB7").s().p("AgfEqIAAp2IA+A0IAAJlg");
	this.shape_597.setTransform(-166.6,-154.125);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#979DB7").s().p("AgfE5IAAqVIA/A1IAAKEg");
	this.shape_598.setTransform(-177.35,-161.55);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FF64F4").s().p("Aj2z4IHuGUIAAfkInuB4gAjyTzIHkh3IAA/dInkmMg");
	this.shape_599.setTransform(-156.3,-71.55);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FF64F4").s().p("Aj0zzIHpGPIAAfhInpB3g");
	this.shape_600.setTransform(-156.3,-71.425);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#F4ED6E").s().p("AlbpLIK3CdIAAAnIqNiIIACRQIgsALg");
	this.shape_601.setTransform(-215.875,14.1);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#F2C549").s().p("AlbgSIAAh2IK3CdIAAB1g");
	this.shape_602.setTransform(-215.875,-42.8);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#F2C549").s().p("ABaDfIAAlQIjMhWIAAgfIDlBhIAAFsg");
	this.shape_603.setTransform(-201.6,-107.45);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#F2C549").s().p("ABZDYIAAleIjKg8IAAgbIDjBDIAAF4g");
	this.shape_604.setTransform(-201.675,-65.65);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#F2C549").s().p("ABrD0IAAlzIjuhdIAAgfIEHBoIAAGOg");
	this.shape_605.setTransform(-230.925,-117.6);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#F2C549").s().p("ABrDjIAAltIjuhDIAAgbIEHBKIAAGHg");
	this.shape_606.setTransform(-230.925,-73.025);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#EBEAEC").s().p("AhyCjIAAmJIDlBhIAAFsg");
	this.shape_607.setTransform(-201.6,-107.45);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#EBEAEC").s().p("AhxCoIAAmFIDjBDIAAF4g");
	this.shape_608.setTransform(-201.675,-65.65);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#EBEAEC").s().p("AiDCpIAAmkIEHBoIAAGOg");
	this.shape_609.setTransform(-230.925,-117.6);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#EBEAEC").s().p("AiDCnIAAmPIEHBKIAAGHg");
	this.shape_610.setTransform(-230.925,-73.025);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#A38EA5").s().p("AhyCjIAAmJIDlBhIAAFsg");
	this.shape_611.setTransform(-201.6,-107.45);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#A38EA5").s().p("AhxCfIAAl8IDjBDIAAF4g");
	this.shape_612.setTransform(-201.675,-65.65);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#A38EA5").s().p("AiDCpIAAmkIEHBoIAAGOg");
	this.shape_613.setTransform(-230.925,-117.6);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#A38EA5").s().p("AiDCrIAAmOIEHBJIAAF/g");
	this.shape_614.setTransform(-230.925,-73.5);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#F4ED6E").s().p("AlXqEIKvBsIAAPzIqvCqg");
	this.shape_615.setTransform(-216,7.975);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#F4ED6E").s().p("AlYG4IAAvbIKxEgIAAMng");
	this.shape_616.setTransform(-216.032,-100.5,1.0087,1);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#705C6F").s().p("AlWqBIKtgtIAATQIqtCNg");
	this.shape_617.setTransform(-117.05,-23.2);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#A39FF4").s().p("AjdHSIAAucIG8gYIAAPFg");
	this.shape_618.setTransform(-53.8,-29.375);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#FFFFFF").s().p("AAAEeIAAmVIhcAHIAAgKIBcgHIAAibIAKgBIAACbIBTgGIAAAKIhTAGIAAGWg");
	this.shape_619.setTransform(-227.45,-157.95);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#FFFFFF").s().p("AAAErIAAmrIhiAIIAAgKIBigIIAAifIAKgBIAACfIBZgHIAAAKIhZAHIAAGsg");
	this.shape_620.setTransform(-199.9,-159.275);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#FFFFFF").s().p("AAAEVIAAmHIheAIIAAgKIBegIIAAiXIAKgBIAACXIBVgHIAAAKIhVAHIAAGIg");
	this.shape_621.setTransform(-253.275,-156.325);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#737887").s().p("ABYEvIAApDIi5ASIAAgZIDDgTIAAJdg");
	this.shape_622.setTransform(-226.925,-159.65);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#737887").s().p("ABaEiIAAoqIi9ATIAAgZIDHgTIAAJDg");
	this.shape_623.setTransform(-252.75,-158.4);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#737887").s().p("ABdE9IAApeIjEATIAAgZIDPgVIAAJ5g");
	this.shape_624.setTransform(-199.375,-161.025);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#979DB7").s().p("AhhEvIAApKIDDgTIAAJdg");
	this.shape_625.setTransform(-226.925,-159.65);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#979DB7").s().p("AhjEiIAAowIDHgTIAAJDg");
	this.shape_626.setTransform(-252.75,-158.4);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#979DB7").s().p("AhnE9IAApkIDPgVIAAJ5g");
	this.shape_627.setTransform(-199.375,-161.025);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#FF64F4").s().p("An50KIACAAIPxhpMAAAAnuIvzD4gAn00GMAAAApzIPpj2MAAAgnkg");
	this.shape_628.setTransform(-231.65,-59);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#FF64F4").s().p("An20JIPthoMAABAnzIvuDwg");
	this.shape_629.setTransform(-231.6,-59.625);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#F2C549").s().p("Ap/AZIAAgxIT/AAIAAAxgAp6AUIT1AAIAAgnIz1AAg");
	this.shape_630.setTransform(-361.2,-194.95);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#F2C549").s().p("Ap8AWIAAgsIT6AAIAAAsg");
	this.shape_631.setTransform(-361.2,-194.95);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#F4ED6E").s().p("Ap/5sIT8gDIgCDrIgDjlIzzADMAAAAzQIT7gVIAAASIz/AJg");
	this.shape_632.setTransform(-360.9,-74.05);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#F4ED6E").s().p("Ap8ZtMAAAgzWIT4gDMAABAzZg");
	this.shape_633.setTransform(-361.025,-74.05);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#8B768C").s().p("EhZSAAXIAAgtMCylAAAIAAAtg");
	this.shape_634.setTransform(123.425,0.675);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#C3C3E2").s().p("Ah3CqIAAhxIguAAIAABxIgdAAIAAhxIguAAIAABxIgcAAIAAhxIguAAIAABxIgcAAIAAhxIgvAAIAABxIgcAAIAAhxIhLAAIAABxIj8AAIAAkYIA8AAIAAg7ICUAAIAAA7IAsAAIAABfIHWAAIAAgqIgSAAIAAgQIBaAAIAAglIJCAAIAAAlIB1AAIAAAQIgmAAIAADfIrZAAIAAhtIhEAAIAABxg");
	this.shape_635.setTransform(91.05,-15.1);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#E8D6C4").s().p("AimCtUgoZgDhgJ6gChQmghphihIQhPg7CIgjMB5bAAAIAAPJUgk2gCggbJgCYg");
	this.shape_636.setTransform(310.6336,45.775);

	this.instance_46 = new lib.Path_97();
	this.instance_46.setTransform(-360.6,132.9,1,1,0,0,0,154.6,135.6);
	this.instance_46.alpha = 0.1289;

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#DDCEBC").s().p("EhdxASHIACC8IBcADIAAAGIh8AAQAahgAEhlgEhYaANyQAFkWgMlcQgIjQgXmZIAAiFIAiABIAHguQAFgBATAAQAOAAAGgGQAEgGAAgQQgCg0ABiKQACh4gHhGIgSiPQgKhVAGg6IgpgHIgVhJMC3RgApMAAAApsMi3DAAqQATjoAGjxgEhcyABPIADgDIABgCIgIA7gEhbSgTuIABgGIAAAGg");
	this.shape_637.setTransform(100.35,132.9);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#827B73").s().p("EhdyASHIADC8IBcAEIAAAEIh8ABQAahgADhlgEhYbANzQAHkXgOlcQgHjPgXmaIAAiEIAiAAIAHgtQAGgCARAAQAPAAAFgGQAGgFgBgRQgCg0ACiKQABh4gHhGIgTiPQgKhVAIg6IgqgGIgVhJMC3RgAqMAAAApsMi3CAApQASjoAFjvgEhcyABQIACgEIACgCQgDAdgFAdgEhbRgTuIAAgHIAAAHg");
	this.shape_638.setTransform(100.35,132.875);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("rgba(156,79,51,0.996)").s().p("AG5AhQgBgBAAAAQAAgBAAAAQAAAAAAAAQAAAAAAABIAAAFIAAAAIAAgCQAAgGABgBIgBgCIAAADIAAgJIgBAEIAAgBQgBAIgBgGIABgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAIAAAFQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBIgBAEQgGgBgFgEQgHgGgBgIIgBAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAIABgBQABgGAFgGQAGgIALgBIAWgCIgBAAIBogNQAKgBAIAGQAIAGACAKQABALgGAHQgHAIgKABIhZAMIAzgEQABAAAAAAQABAAAAAAQAAABABAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAAAABQAAAAABABQAAAAgBABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAIhbAHgAGnAlQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAIAJgBIAAABQgBgBgHAJIAAgBIgEACgApJAhQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAIDVAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQABAAAAABQAAAAgBABQAAAAAAABQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAAAAAg");
	this.shape_639.setTransform(-299.5008,19.7759);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("rgba(102,0,0,0.996)").s().p("ARvETIgBADIABAKQgBAEgFgKIAAAAIAAgBIAAgBQAAADgBgDIAAAFIgBgDIAAAEQAAAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAABAAAAIAAgHIgCAEIABgDQgBABgEgJIAAgJIgBAEIAAgGIAAgBIAAABIAAgYIgCAAIgBAFIAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIgBALIAAgGIAAAAIAAAPQAAAAAAABQAAAAAAAAQAAABAAgBQAAAAAAAAIAAgGIgBAGIAAgKQAAgEgFAFIAAgHIgDAYIAAABIgBAFIAAgDIAAgGIAAADQAAACAAABQAAABAAAAQAAAAgBAAQAAgBAAgBIAAACQAAABAAgBIAAgFIgBAEQAAAEAAgDIAAAEIgBAHIgBgDIAAAFIAAACIgBgPIAAANQAAAAAAABQAAAAgBAAQAAAAgBgBQAAAAgBgBIgCgFIAAgHIgBADIAAAEIAAADIAAgFIgBAFQAAACgBgJIAAAIQAAAAAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIgBAEIAAgIIgBAEIAAgDQgBABgEgJIAAgJIgBAFIAAgHIAAgBIAAABIAAgFIAAgTIgngBQgBAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBgGgBIgGAAIACgBIAGABQAAgBAAAAQAAgBAAgBQAAAAAAAAQABgBAAAAIgKgCIAFAAIAAAAIgOAAIgCgBIAGAAIgGAAIAKgBQADgBgBgEIgDgGIAHAAQgGAAgHgDIgLgEIgBABQgEgBgBgBIADAAQAIAAgBgBIgEABQgHgBAFgBIgCAAQgCgBACAAIAIAAIgHgBQAAAAABgBQAAAAAAAAQAAAAAAAAQAAAAAAAAQgDAAADgBIgFABQAAAAAAAAQABAAgBAAQAAgBgBAAQAAAAgBAAIgFgCIACgBIgEgBIgDAAQADgCAMABQgBgBgBAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQgIAAgCABQgCgCADgFIAFgFIAHAAIgDgBIgEAAIABAAIgEgBIAFAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAAAQgBAAgBAAQgBAAgCgBQAIAAAAgBIgJAAQAAAAABAAQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAIAHAAIgEgDIADAAQAAgCAIgHIAJgBIgEgBIgDAAIACgBIAHABIgBAAIACAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAABAAIAEAAQAPgBAvAAIAAhmIAAANQAAgBABgBQAAAAAAAAQAAAAAAAAQABAAAAABIABAFQAAAAAAAAQAAAAAAAAQAAgBABAAQAAgBAAgBIAAAEIABgKIAAACIABgOQAAAKAAgEIAAgCQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABABAAQAAAAAAAAQAAgBAAAAIAAACQABABABgIQABAEACADQAAAAABAAQAAABABAAQAAgBAAAAQABgBAAAAQAAgHABABIAAgHIAAAGQABgEADgDIADgCIAAABQAGgJABABIAAgFQAAABAAABQAAABABAAQAAABAAAAQAAAAAAAAIAAgFIABACIAAABQAAABAAABQAAABAAgBQAAAAAAgBQABgBAAgDIAAACQAAAAAAAAQAAABAAgBQAAAAAAgCQAAgBAAgCIABAKIAAgDIAAABIAAAIQAAABAAABQAAABAAAAQAAABAAAAQAAAAAAgBIAABwIABAAIAAhmIAAANQAAgBAAgBQABAAAAAAQAAAAAAAAQAAAAAAABIABAFIABAAIABgDIAAAEIABgKIAAACIAAgOQABAKAAgEIAAgCQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAAAIACACIAAABQABABABgIQAAADACAEQABAAAAAAQABABAAAAQABgBAAAAQAAgBAAAAQAAgHABABIAAgHIABAGQABgEACgDIAEgCIAAABIADgFIADgDIAAgGIABAFIAAgFIABACIAAABQAAABAAABQAAABAAgBQAAAAABgBQAAgBAAgDIAAACQAAAAAAAAQAAABAAgBQAAAAAAgCQAAgBAAgCIABAKIAAgDIAAABIAAAAIAAAIQAAABAAABQAAABAAAAQAAABAAAAQAAAAAAgBIAABwIBCABIgOABQABAAABAAQAAAAAAABQABAAgBAAQAAABgBAAIgFACIAAACIAEABIgFAAIAKADIgCAAQADABAMAAIgGABQgDAAACAAIACAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAABQgBABAAABQAAAAAAABQAAAAAAABQAAAAAAAAIgCAAQABAAAAAAQABABAAAAQAAAAAAAAQABABAAAAQAAAAAAAAQAAABABAAQAAAAABAAQABAAABABQgEABgCAEQgDAGAEABIAEABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAIAGAAIgGACQAFACACAFIADAIIgBAAIAEAHQAEAGgBABIAGABQgBAAgBAAQgBAAgBAAQAAAAAAABQgBAAAAAAIAGABQgBAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIgCgBQAAABgBAAQAAAAAAAAQAAAAABABQABAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAgBAAIgBAAIAEABIgJABIADABIgCAAQgBgBgGAAQgCAAgBAAQgBAAAAAAQgBAAABABQAAAAAAAAIhMgBQAAAFgBAAIAAgBQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAgBAAAAIgBALIAAAEIAAAEIAAgIQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAgBABIgDACIABgOIgBAAIAAAHQAAALgDANIABABIgBAFIgBgJIAAADQAAACAAABQAAABAAAAQAAAAAAAAQAAgBAAgBIAAACQAAACgBgCIAAgFIAAAEQgBAEAAgDIAAAEIgBAHIAAgDIgBAFIAAACgATTCgIABAAIgDAAgAwZgKQAAABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIABAJQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBgBAAAAIgEgEIAAgHIAAAGIgBAEIAAgFQAAACAAgCQAAAAAAAAQgBAAAAAAQAAABAAABQAAABAAACIgBgEIAAAFQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAABIAAgGIgCAEIAAgEQAAABAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBIgDgGIgBgIIAAAEIAAADIgBgDIAAgGIgQAAIgCAHIAAAAQAAAEgBACIABgDIgBgHIAAADIAAAEIgBgCIAAACQAAADAAgCIAAgFIgBAEQAAABAAAAQAAABAAAAQAAgBAAAAQAAgBAAgCIAAAGQgBAGgBABIAAgCIgBADIAAgEIAAAGIgBgOQAAACAAABQAAAAAAABQAAAAAAAAQAAAAAAAAIAAAJQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAgBgBAAIgDgEQABgDgBgEIAAAGIgBAAIAAAEIAAgGQAAAHgBgBIgBgEIAAAFQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAABIgBABIgBgFIgBAEIAAgEQgBABAAAAQAAgBAAAAQgBAAAAgBQAAAAgBgBIgDgGIAAgIIAAAEIAAADIgBgDIAAgGIgCAAIAAAIIgBgFIAAAKIABgFIAAACIgBADIAAABIAAAFIAAADIgBgEIAAADIAAgGIAAAJIgBgGIAAgIIAAgKIgbgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgCgGAAIgGgBIACAAIAGAAQgBgEACgCQABAAAAAAQgBAAAAAAQgBAAgBAAQgBAAgBgBIgGAAIAFAAIAAgBIgOABQgBAAAAgBQgBAAAAAAQAAAAAAAAQAAAAAAAAIAGAAQAAAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAIAHAAQADgBgBgHIgDgIIAMABIAAgBIgFAAQgGAAgHgDQgIgFgDAAIgBAAQgEgBgBgBIADAAQAIgBgBAAIgEAAQgBAAAAAAQgBAAgBgBQAAAAAAAAQAAAAAAAAIABgCIgCAAQgCAAACAAIAJgBQgGABgCgCQABAAAAAAQAAAAABAAQAAAAgBAAQAAAAAAgBQgCAAACAAIgFAAQAAAAAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAIgFgCIACgBIgEgCIAEgBIgHAAQADgBAMgBIgDAAIgDAAIgCAAIgFABQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAgBIgBAAIgGAAIACAAIAGAAIAAgBIAAgBIAAgBIgJgBIAFAAIAAAAIgKAAIgEgBIAIAAQABAAAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBIgDgDIAHAAQgKgBgOgEIgBAAIgFgBIADAAIAHAAIgEAAQgBAAgBAAQgBAAAAAAQgBgBAAAAQAAAAABAAIgBAAQgCgBACABIAGgBIgFAAQgDgBADAAIgEAAQgGAAgBgCIACAAIgEgBIAEAAIgHAAIAPgBQgBAAgBAAQgBAAAAAAQAAAAAAAAQAAAAAAgBIgKABQgEgBAKgGIAHAAIgHAAIgDgBIAFAAQgGAAABgBIADgBIgEAAQAAAAABAAQAAAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAIAGgBIgEgBIADAAQAAgCAIgEIAJgBIgEAAIgDAAIACgBQAFABACgBIgBABIACAAQgBgBABAAIAEAAIA+gBIAAAAIgnAAQgIgBgBgBIgGAAIACgBIAGABQAAAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAgBIgKAAIAFAAIAAgBIgIAAIACAAQABAAAAAAQABAAAAgBQAAAAAAAAQAAgBAAAAIgDgCIAMAAIgFAAQgKAAgOgDIgBAAIgFgBIADAAIAHAAIgHAAIABgBIgCAAIAJAAIgIgBIgEAAIgHAAIACgBIgEAAIAMgBQgBAAgBAAQgBAAAAAAQAAAAAAAAQAAAAAAAAIgKAAQAAAAAAAAQgBgBAAAAQABAAAAAAQABgBAAAAIAFgDIAAAAIABAAIABAAQgGAAABgBIAIgBIgJAAQAAAAABAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIgDgBIAHAAIgEgBIADAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAABgBIAFgCIAJAAIgEAAIAHAAIgBgBIBDAAIAAhlIAAAMQAAgBABAAQAAgBAAAAQAAAAAAAAQAAABABAAIABAGQAAAAAAAAQAAAAAAgBQAAAAABgBQAAgBAAgBIAAAFIABgKIAAACIABgPQAAALAAgEIAAgCQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAABAAQAAAAAAAAQAAAAAAAAIAAABQABABABgIQABAEACADQAAABABAAQAAAAABAAQAAAAAAgBQABAAAAgBQAAgHABABIAAgGIAAAFQABgEADgCIADgDIAAABQAGgJABACIAAgFQAAABAAAAQAAABABABQAAAAAAAAQAAAAAAAAIAAgFIABACIAAABQAAACAAABQAAAAAAAAQAAAAAAgCQABgBAAgCIAAABQAAABAAAAQAAAAAAAAQAAgBAAgBQAAgBAAgCIABAKIAAgEIAAACIAAAHQAAABAAABQAAABAAABQAAAAAAAAQAAAAAAAAIAABlIABAAIAAhbIAAAMQAAgBABAAQAAgBAAAAQAAAAAAAAQAAABAAAAIABAGIABAAIABgEIAAAFIABgKIAAACIAAgPQABALAAgEIAAgCQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAABIACABIAAABQABABABgIQAAAEACADQABABAAAAQABAAAAAAQABAAAAgBQAAAAAAgBQAAgHABABIAAgGIABAFQABgEACgCIAEgDIAAABQAFgJABACIAAgGIABAEIAAgFIABACIAAABQAAACAAABQAAAAAAAAQAAAAAAgCQABgBAAgCIAAABQAAABAAAAQAAAAAAAAQAAgBAAgBQAAgBAAgCIABAKIAAgEIAAABIAAABIAAAHQAAABAAABQAAABAAABQAAAAAAAAQAAAAAAAAIAAAXQABAAAAgBQABAAAAAAQAAgBABAAQAAAAAAAAIAAgFIABAFIAAgHQAAABAAABQABABAAAAQAAAAAAAAQAAAAAAAAIAAACQAAAAAAABQABAAAAAAQAAAAAAgBQAAAAAAgBQAAgCAAAAQABgBAAAAQAAAAAAAAQAAAAAAABIAAABIAAgEIABAJIAAgDIAAACIAAAKIAAgGIAABMIAAAAIABg9IABAPQAAgCAAAAQAAgBAAAAQABAAAAAAQAAABAAABIABAEIABAAIABgDIAAAEIACgKIAAACIAAgOQABALAAgEIAAgCQAAAAABAAQAAAAAAAAQAAAAABAAQAAABABAAQAAAAABABQAAAAABAAQAAAAAAAAQAAAAAAAAIAAACQACABAAgJQABAEADADQAAABABAAQABAAAAAAQABAAAAgBQABAAAAgBQAAgGABAAIAAgGIABAGQABgEADgDIABgBIAEgCIAAABQAHgIABAAIAAAAIABgFQAAABAAABQAAABAAAAQAAABAAAAQAAAAABABIAAgGQAAABAAAAQAAABAAAAQAAAAAAAAQABAAAAAAIgBACQABAGABgJIAAABIABgEIAAAJIAAgDIABACQgBABAAAGIAAACIAAABIAAgBIAAgFQAAAAAAgBQABAAAAAAQAAABAAAAQAAABAAAAIAAAEIAABIIAIAAQAAAAAAAAQAAAAAAABQAAAAAAAAQgBAAAAAAIgBAAIgCAAIAHABIgGAAQgBABAAAAQAAAAAAAAQAAAAAAAAQABAAABAAIAGABIAAAAIAKACIgBAAIAHACIABAAIABABQgBAAAAAAQAAAAAAAAQAAAAABAAQABAAACAAIgIAAIgDAAIACAAIgYAAIAAAAIAIAAIgIABIAAAEIANABQgLAAAEAAIACAAQAAAAAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAAAAAQAAAAAAAAQAAAAAAAAIgCAAIAHABIgGADQgBAAAAABQAAAAAAABQAAAAAAAAQABAAABABQAGAAAAABIAGAAIgGAAIAFABIAXAAQABABABAAQAAAAABAAQAAAAgBAAQAAAAgBAAIgFAAIAEABIAFAAIAIAAQgBABgBAAQgBAAAAAAQAAAAAAAAQAAAAABAAIACAAQgBAAgBAAQgBABAAAAQAAAAAAAAQAAAAABAAIgCAAIAHABIgGABQgBAAAAAAQAAAAAAAAQAAABAAAAQABAAABAAIAGABIAAAAIAKACIgBAAIAHACIAGAAIgFABIACAAQgBAAgBAAQAAAAAAAAQAAAAABAAQABAAACABIAEAAIgMAAIgDABIACgBIgmAAIgCAAIgEAAIgDABIACgBIgZAAIAAABIAKAAIgDAAIAvAAIABABIgOABQABAAABAAQAAABABAAQAAABgBAAQAAABgBAAIgFADIAAACQAAAAABAAQAAABAAAAQABAAAAAAQABAAABABIgFAAIAKADIgCAAQADACAMAAQgLABAEABIACAAQABABgCAEQgCAGABAAIgCgBQABABAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAABQAAAAABAAQAAABABAAQABAAABAAQgEACgCAGQgDAGAEACQAAABABAAQAAAAAAABQABAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAGgBIgGADQAFADACAGIADAKIgBAAIAEAKQAEAHgBACIAGAAQgFABAAACIAGAAIgBABQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAAAABQAAAAABAAQABAAABABQABAAAAAAQABAAAAAAQAAABAAAAQgBAAAAAAIgBAAQgBAAAAAAQAAABAAAAQABAAABAAQABABACAAIgJAAIADABIgCABQgBgCgGAAQgCAAgBABQgBAAAAAAQgBAAABAAQAAAAAAAAIAHAAQAAABABAAQAAAAgBAAQAAAAgBABQAAAAgCAAIACgBIhWgBIgBAGIAAAAIgCAGIABgDIgBgHIAAADIAAAEIgBgCIAAACQAAADAAgCIAAgFIgBAEQAAABAAAAQAAABAAAAQAAgBAAAAQAAgBAAgCIgBAEIABACIgCAHIAAgCIgBADIAAACIgBgMgAxbgWIAAAAIgBAAgAwwh/IAAAAIAAAAIAAAAgAwwifIAAAAIAAAAIAAAAgAxdifIABAAIAAAAIgBAAgAzMijIgDAAIAHAAIgEAAgAzdilIAKAAQAAAAAAAAQAAAAAAAAQAAAAABAAQAAAAABAAg");
	this.shape_640.setTransform(-153.025,47.55);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#71CEFC").s().p("Ag0AoIAAhPIBpAAIAABPg");
	this.shape_641.setTransform(695.975,-294.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.instance_46},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.instance_39},{t:this.instance_38},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.instance_25},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.instance_7},{t:this.instance_6},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.instance_5},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.street, new cjs.Rectangle(-502.8,-319.3,1216.3,602.2), null);


(lib.shoko2shoes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.shoko2walkingshoe();
	this.instance.setTransform(66.5,48.3,1,1,0,0,180,3.6,-12.6);

	this.instance_1 = new lib.shoko2walkingshoe();
	this.instance_1.setTransform(-8,48.3,1,1,0,0,0,3.6,-12.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko2shoes, new cjs.Rectangle(-36.5,9.4,131.5,77.89999999999999), null);


(lib.shoko2eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// blinking
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660100").s().p("AgZAsQgCgBgBgEIACgHIAEgJQADgFAFgEIAEgEQAFgEAFgKIADgDIABgEIAGgKQAAgDADgEIAFgIIACgFQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQACABAAAEIgBAFIgDAGIgEAGIgBAEIgEAFIgCAEIgLARIgDAFIgMAOIgCADIAAADIgCACQgCAGgBABQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgCgBg");
	this.shape.setTransform(29.975,-34.5219);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#660100").s().p("AgBAIIgDgBQgDgCABgEQABgBADgBIACgEIAAgBQACgBAEACIABAEIgBACIAAADIgBACQgDACgCAAIgBAAg");
	this.shape_1.setTransform(85.5625,-50.1125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#660100").s().p("AgBAEIgCgBIAAgBIgBgBIAAgBIABgCQABAAAAgBQAAAAABAAQAAAAABAAQAAgBAAAAIAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAIABACIABABIgCADQAAABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAg");
	this.shape_2.setTransform(85.975,-50.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660100").s().p("ABWBNQgSgEgJgIQgGgGgDgFIgGgJIgEgIIgHgGIgsgfQgFgDgBgCQgCgFADgCIgQgJIgQgIIgNgHIgcgZQgEgEgBgDQgBgHAIgCQAFAAAGADIAJAIQAEADAJAFIANAIIAJAHIAGADIAHAHQACADAOAJQAJAFAEAGIAFAIIAIAEQAIAEAEAHIAEAHQACAEADACQAEAEAJAFQADACAEAHIAJANQAEAGADACIAKADQADABABADQAAAAABABQAAABAAAAQAAABgBAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAgBAAIgDgBgAg5guIADABIAEADIACACIACACIAEABIgBgCIgCgBIgDgCQgDgDgGgDQgFgCgBgCIgBAAQADAEAEACg");
	this.shape_3.setTransform(103.3513,-38.4365);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#660100").s().p("AgEAWQgBgBAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIgBgDIAAgWIABgEIABgDIAAAAQABgCADgDIABgCIACgBIAEABIABABIABAEIAAAaIgBADIAAABIgCABIgDABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAIgCAAg");
	this.shape_4.setTransform(113.575,-25.855);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660100").s().p("AA5BEQgIgEgGgFQgBAFgFAAQgFABgDgFQgDAEgEgEIgEgIIgEgKIgBgMQgBgIgBgEQgBgDgKgLQgGgEgHgKIgLgQQgLgMgYgRQgFgDgBgDQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAgBIAFACIAJAHQAQAMAKAJQAKAKAIAPQAEgFAIADQAIADAIAJIANAPIAPATIAGAJQACADACAGIADAJIACAGQAAAEgDACIgDABIgEgCg");
	this.shape_5.setTransform(110.325,-30.4429);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660100").s().p("AAfAhIgDgIIgEACQgEABgCgFQgBgGgCgCQgEABgHgFIgEgGIAAgFIgDgEQgGgGgDgGIgDAAQACAFgEACIgGABIgIAAQgFAAgCgCIgBgFIABgGQgEgCAAgEQABgEAEAAIAHADIADABQAFACAKgBQgCgDAAgDQABgDADgBQACgBAEADIAMAKQADADgBADIADAHIAEAFIADADIAFAEIADACIACAEIAGAMIAEAIIADAEQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAIgEACQgEAAgDgEg");
	this.shape_6.setTransform(116.8313,-22.0792);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660100").s().p("AARAPIgGAAIgEAAIgCABIgWAAIgEAAIgEgDQgDgEAFgDIAIgBIgEgFIgCgDIAAgDQAAgDADgCQADgCADAAIABAAIAFgBIAAAAIAGgBIAEAAQAAAAABAAQABABAAAAQAAAAABABQAAAAAAABIABAAIAEAJIABACQABACAGACIADACIADACIABACIAAACIAAADIgCACIgFAAg");
	this.shape_7.setTransform(117.8438,-19.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660100").s().p("ABnAWIgQgDQgKgBgHABIgIACIgKAAIimgBIgHgCQgEgDABgDQABgEADgBIAGgBIC9gBQAQAAAIABQgLgKgJgFQgFgDgBgCQgDgFAEgDQADgCAFAEQAPAKAHAIIAHAIQAFAFAEACQAFACAAADQAAAEgDABIgFABIgOgCg");
	this.shape_8.setTransform(110.2719,-18.7083);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660100").s().p("AgOANIgggCIgKABIgKAAIgvABQgZAAgMgCQgEAAgCgCQgCgCABgDQAAgDADgBQAEgCAHAAIBlgCQArgCA4ABQATAAAJgDIAJgEIAKAAQAVACAVgBQAEgBAEACQAFACgBAEQgBADgFABIgKABIgLABQgBAEgFAAIgHAAIgIACIgOACQghADgzAAIgaAAg");
	this.shape_9.setTransform(88.7033,-18.09);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660100").s().p("AggAOIgvgBIgGgCQgDgDADgEQADgCAEAAQgEgCABgEQAAgFAFAAIAEADIAKACQALACAFgBQAGgBAKgEQAGgCALAAQALAAAEgCIAHgBQAFAAABACIABADQAAABgBABQAAAAAAAAQAAABAAAAQgBAAAAAAIAyABIAIABIAGACIAEAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABAAAAAAQAAABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAIgFABIgFAAQgGgBgLACIg2AEIgZABIgKAAg");
	this.shape_10.setTransform(67.3417,-18.0417);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660100").s().p("AiPAKQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQABAAAAgBQAAAAABgBQAAAAABAAQAEgCAFABIAFAAIAEgDQAEgDAIgBQARgDAiAAIASAAIARABIAKACQAFABAEgBIAGgDQACgBAFAAIAHABQAKgBADABIAFACIADABIAagBIAGAAIATgBIAGAAQAAABABAAQAAABABAAQAAABAAAAQAAABAAABIAnAAQAFAAAEACQAGADgEAFQgCACgFAAIgwAAQgdgBgTACQgJACgHgBIgGgCIgKAAQgbACgcgCIgMAAIgJACIhGAAQgEAAgCgBg");
	this.shape_11.setTransform(45.7383,-17.9083);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#660100").s().p("AAAAFIgDgCIAAgBIAAgBIgBgBIABAAIAAgBIABgCQACgCADACIACABIAAACIAAACIgBACIgDABIgBAAIAAAAg");
	this.shape_12.setTransform(24.1,-18.0125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#660100").s().p("AgEASQAAAAgBAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIgNACIgIABQgGgBABgEIgOADQgFABgCgCQgFgDAEgEQABgCAHgBIAGgBQAAgBAAAAQABgBAAAAQAAgBAAAAQABgBAAAAIAFAAQANgBANgCIAEgEIANgHIARgEIAGAAQAEAAABADQABAEgFAFIgBACQACAAAFgCQAGgCACABQABABAAAAQABAAAAAAQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAFAAACABQABADgBADIgDAEIgEADIgHABIgKABQgTAEgOAAIgBAAIgDgBg");
	this.shape_13.setTransform(28.0184,-18.4383);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#660100").s().p("AgCAFIgCgBIgCgCIAAgDIAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAgBAAAAIAEAAIAGACQACACgCACIgCADIgEAAg");
	this.shape_14.setTransform(24.5571,-25.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#660100").s().p("AgTAlIADgGIABgKIABgGIAMgaIABgFIABgGIAJgPQADgEACAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABIgCAEQgCAEgCABIAAADIgDADIgEANIgHAOQAIABACAFIABAEQAAADgDAEIgFAHIgMAKQgEACgCAAQgEgBAAgEg");
	this.shape_15.setTransform(23.525,-21.0812);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#660100").s().p("AgWAZQACgEADgDIACgCIABgDIAEgFIABgDQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQADgGAEgEIAAgCIAAgBIAAgCQACgDADgBQAAgFAFAAQACgGADgBQAFgDADAFIgBAFIgHANIAAADIgBAGIgEAKIgEAFIgIAIIgFADIgEADQgCACgEAAQgFgBAAgFg");
	this.shape_16.setTransform(27.3833,-29.7812);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#660100").s().p("AAAAFIgBAAIgCgCIgBgCIAAgCIABgBIABAAIABgBIABgBIACABIABABIABAAIAAABIABACIgBABIAAABIgDACIgBAAg");
	this.shape_17.setTransform(30.375,-35.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#660100").s().p("AgjAqQgBgDACgDIAEgFIADgEIAHgHIACgEQABgEABgBIADgDIACgDQACgFAJgHQAAgBAAAAQABgBAAAAQAAgBABAAQAAgBAAAAIAAgDQAAgDAHgFIAEgHIANgLQAAgBABgBQABAAAAAAQABgBAAAAQAAAAABAAQACgBADADIABAFQABAHgGAGIgLAJIgNANIgKALIgEAKQgDAKgNALIgGADIgCAAQgDAAgBgCg");
	this.shape_18.setTransform(32.1219,-37.1032);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#660100").s().p("AhmBBQgBgEACgCIAFgFIAFgGIARgTIAHgGIAGgDIAPgKIAKgJIAPgMIAMgGIAKgKIAYgRIAhgMIAJgDIAOgFQAIgDAGAAQAEAAACACQADABgBAEQgBAEgFAAIgIABQABACgCADIgGACIgTABIgIADIgWAIQACAGgHAEIgLAFQgDACgFAHIgIAJQgCACgIADQgIADgDADQAAAAABAAQAAABABAAQAAAAABABQAAABAAAAIAAAFQgCADgGADQgSAIgeAYQgLALgKACIgDABQgDAAgCgDg");
	this.shape_19.setTransform(44.733,-46.8917);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#660100").s().p("ABjAQQgGgDgJgBIgMgBQgIAAgPgEIgUgFQgKgCgHAAIgPAAIgagDIgNgBQgXgDggAAIgHgBQgFgBABgEQABgDAHgCIBaABQAYADApAJIALACIAHADIADAAIAIABQAGAAAKAEQAGACACADQAAABABAAQAAABAAABQAAAAAAABQAAAAAAABQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAIgCABQgCAAgEgDg");
	this.shape_20.setTransform(70.1972,-53.6375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#660100").s().p("AAtAVIgvgNIgFgBQgEgBAAgDIgHgCQgFgBgCAAIgEgDIgEgBIgDgCIgDgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBIgHgBQgDgCgBgDQgBgEAEgCIAEAAIAiAGQAJAAACABIAEACIARAKQADACAEACIAJABQANABADAJQACAGgEACIgDABIgDgBg");
	this.shape_21.setTransform(83.2483,-50.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#660100").s().p("AAgA+QgDgBgBgEIgCgGIgDgFQgTgYgIgRQgMgYgIgMIgLgSQgCgFABgDQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAIAEgBQADACABAGIAGAKQAHAKALAVQAKAUAGAJIAPATQAJAMAAAHQgBAHgEAAIgBAAg");
	this.shape_22.setTransform(92.5846,-37.4275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#660100").s().p("AhEAeQgQgFgHgLQgFgGAAgJQgBgLAEgHQAGgKALgEQAMgEAKAFIAMAHQAFACAIgBIANgCIAVgCIAogCQAdgBALAJQAOALgCARQgBAIgGAGQgFAHgIACQgHACgOgBQgZAAgcADQgeADgJAAQgRgBgPgFg");
	this.shape_23.setTransform(108.0839,-20.9592);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#660100").s().p("AgrBUQgIgEgEgHQgEgIAAgIQABgJAFgHIAHgKQACgDABgHIAAgLQABgHAGgIIAKgPIALgVQAFgOAFgHQAFgLAJgHQAKgHALAAQASABAIAPQAIARgKAOIgJALIgHAOQgEAMgOAVQAHAJACAJQABAOgLANQgIAIgPAIQgOAIgJABIgDAAQgHAAgGgEg");
	this.shape_24.setTransform(29,-26.2409);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#660100").s().p("ACCA6QgGgCgMgHIgRgLIgdgRQgWgKgegEQgSgDgjgBQgzgCgZADQgYADgKgFQgOgGgCgRQgBgQANgKQAKgHAXgCQBIgFBLAKQAnAGARAIIAcAOIAYAPQAZANAFAOQACAHgBAJQgCAIgFAGQgKAKgLAAIgIgBg");
	this.shape_25.setTransform(69.9994,-48.8863);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#660100").s().p("ABCBiQgLgFgRgRQgXgVghgdIgLgIIgPgFIgOgHQgFgCgIgBIgNAAQgOAAgMgHQgMgHgGgMQgHgMAAgOQAAgOAHgMQAHgMAMgHQAMgHANAAQAHAAASADIAdAFIAaAKIATAJQAIAEAWASIA7AzQAbAZAEAVQADANgGANQgFANgLAIQgKAIgOACIgGAAQgKAAgKgEg");
	this.shape_26.setTransform(90.9891,-40.3339);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#660100").s().p("ADHCuQj+gFkeADQgzABgTgVQgOgRABgrQABgcAFgLQAFgLAOgSQAFgLAGgWQAHgRAfgaIBehMQAXgUAQgIQAfgQA5gBQBPgCBGAIQAjADAXAIQASAFAhASIAvAZQBJAnAfAWIAmAbIAxAcQAbASAMAUQAGALAHAXQAIAagCAOQgDAXgUANQgUAMgWgIIgOgGQgJgDgGABQgEAAgLAGQgYAMghADQgOABgWAAIgYAAg");
	this.shape_27.setTransform(70.4336,-35.3131);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AhxiEQB8BlBmCk");
	this.shape_28.setTransform(111.55,-29.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ABNiEQhiBdg3Cs");
	this.shape_29.setTransform(28.575,-29.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("Ak/A+QEPj3FwD3");
	this.shape_30.setTransform(68.25,-49.4875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#660100").s().p("AgBAJQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBgBAAAAIAAgIIAAgEQABgBAAAAQAAgBABAAQAAAAABgBQABAAAAAAQAAAAAAAAQABABABAAQAAAAAAAAQABABAAAAQABABAAAAQAAAAAAABQABAAAAABQAAABAAAAIAAAGQAAAEgCACIgCABIgCgBg");
	this.shape_31.setTransform(-23.725,-27.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#660100").s().p("AACAOIAAgBIgBAAIgBgCIAAgDIAAgDIAAgDIgEgDIgBgBIgDgDIgCgDIgBAAIAAgDIAAgDIABgBIAEgBIADABIADADIAAACIACACIAAABIABAAIADADIAEAFIAAACIAAAFIABAAIABAEIAAADQAAAAgBABQAAAAAAAAQAAAAgBAAQAAAAgBAAIgDABQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAgBgBgBg");
	this.shape_32.setTransform(-23.825,-27);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#660100").s().p("AgBAEIgCgCIgBAAIAAgCIABgCIADgCIABAAIADABIAAABIABACIgBADIgCACIgCAAg");
	this.shape_33.setTransform(-24.075,-27.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#660100").s().p("AgSAVQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAgBQAAAAABgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAIABgBQgBAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBIAAgBIAAgBIABgBQAAAAABAAQAAAAAAgBQAAAAAAAAQABAAAAAAIAGgBIADABIACgBIADgCQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAIAAgGIgBgDIAAgDQAAgEABgBQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIABADIAAABIAAABIACAEIAAADQAAAEADAEIABACIAAABIAEADIABABQABACgCAEIgDABIgEABIgJgBIgDAAIgGAAIgCABIAAABIgBADQgDACgDAAIgBAAIgDgBg");
	this.shape_34.setTransform(-23.0429,-20.8937);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#660100").s().p("AA2APQgDACgKABQgLAAgYgCQgXgCgMABIgYAAIgLAAIgKgBQgIAAgQADQgIAAAAgFQAAgCADgDIAGgBIAJgEIAMgBIASgBIA1gBIALgBIAGgCQADgBAHABIAJgBQAKgEAGgBIAFAAQADAAADgCIALgEQAGgCADADQABAAAAAAQABABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAFAAADAEQADAEgDAEIAIgCQAGAAADABQAAAAABABQAAAAABAAQAAABAAAAQAAABAAABQABAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgFACIgDACIgGACIgZABIgDAAQgGAAgDgDg");
	this.shape_35.setTransform(-41.0469,-20.8059);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#660100").s().p("AhGAMQgBgCACgDIAFgEQgUAAgOgDQgHAAAAgFQABgDAEgBIAGAAQAeAFAagGIATgEIAkAAIAIAAQAFADgCAEQAUAAAFgBIANgDQAJgCAFABQAJAAABAGIAJgCQAGAAABAFQgBADgGACQgXAHgXACIgpABQgNABgOgBIgXAAIgYADQgGAAgCgDg");
	this.shape_36.setTransform(-57.65,-20.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#660100").s().p("AhZASQgBgBAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQgDAAgEgCQgDgEADgDQgJABgDgCQgDgBgBgCQgCgDACgCQADgDADAAQAFgBAKACIAQACIAKgDIAKgDQAHgCAJAAQAEgBADACIADADIADAAIAbgGIAEAAQAEABgBAFIgDAFIAWgEIAOgCIAHAAIADACIAAADQASAAAOADQAIADAAADIARAAQAIAAACAEQACAFgIAEQgFACgLAAIhpgBIgXgBIgHAAIgGABIgHgBIgGAAIgVADIgEAAIgEAAg");
	this.shape_37.setTransform(-75.3537,-20.705);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#660100").s().p("ABFAZIgTgCIgdABIh6ABQgJAAgBgEQgBgCACgDQADgCADAAQAAgDAEgDIAFgCIAEABIARACIATAAIAXgBQgBgGAEgFQADgFAHgCIAKgBQAHAAACgCIAFgCQADAAACAEQAAACgBAEIAfgTQAGgCACABQAEADgDAFQgBADgGACQAFACgBAGQAPAAAFABIAFABIASgDQAIAAABADQACADgEADQgCACgFABQADAAACADQADADgCADIALAAQABAAAAAAQABABAAAAQABAAABAAQAAABAAAAQABABAAAAQABABAAAAQAAABAAABQAAAAAAABQgBADgIAAIgigBgAgUABIAAAAIgBABIAAAAIACAAIABgBIACAAIACAAIgBgBIgEAAIAAAAg");
	this.shape_38.setTransform(-94.6367,-21.68);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#660100").s().p("AgyAoQgBgDADgEIAIgNIAVgXIAEgGIAPgUIAJgKIAEgDIAIABQAEABAAAGQgBAFgEACIgFAEIgDAFQAFgCAEAAQAFAAABAEQABADgDAFQgEAGgHAEQACABADgCIAFgBQADAAACACQABAEgBACQACABAAAEIAHAAQAEAAABADQACAEgFACIgIABQgFgBgCABQABAGACACIAPAAIAGABQAEADgDAEQgCADgGAAIhUABQgHAAgBgDg");
	this.shape_39.setTransform(-114.1857,-23.475);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#660100").s().p("AgdAdQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBQgCgCACgDQACgDADgBQADgDAEgBIAJgJIACgDIAHgFIAEgKIAEgFIAIgEQABgBAAAAQABAAAAgBQAAAAABAAQAAgBAAAAIACgCQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAABQACADgDAFQAGgBACACQAEADgDAFQgBAEgEADIgBABIABACQABACgBADIgEADIgEACIgDACIgFAHIgEADQgCABgDgCQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAIgLADIgJAFQgEACgEAAIgCAAg");
	this.shape_40.setTransform(-107.8479,-32.3658);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#660100").s().p("AgFAFIABgDIAAgBIABgFIABgDIABgBQAAAAABAAQAAgBAAAAQAAAAABAAQAAAAABAAIADACIABAEIgBAHIAAABIgBACIgBACIgDABIAAAAQgEAAgBgFg");
	this.shape_41.setTransform(-91.275,-45.7923);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#660100").s().p("Ag9AxQgDgCABgEIADgFQAOgNAGgHIAHgHIA0glIAhgUIAGgCQAFAAABAEQABAEgFACIgHADQgEABgHAGQAAAAgBAAQgBAAAAABQgBAAAAAAQAAABAAAAIgBAFQAAACgGAFIgHAJQgEAEgLAFQgKAGgEAEIgIAMQgFAIgEAEQgFAFgPADIgNADIgDAAIgEAAg");
	this.shape_42.setTransform(-96.2284,-42.705);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#660100").s().p("AgZAHQgDgDACgDIABgBQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAIABgBIAHgDIAHAAIAHgCIADAAIADgBIAEAAIALABIAEACIADACIAAADIAAABQgCADgDAAIgJgDIgDAAIgCAAIgCAAIgPADIgEAAIgHADIgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape_43.setTransform(-75.49,-53.1825);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#660100").s().p("AANAJIgGgBIgCAAIgCAAIgCgBIgBAAIgEgBIgKgDQgEgBAAgCIgBgCIABAAIAAgCIAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAIAAgBIACgBIACgBIABgBIACAAIAEABQAAAAAAAAQABAAAAAAQAAABABAAQAAAAAAABIABAAIABAEIAAgBIABgBIAAgCIACAAIACgBIADAAQADAAADADIABABIABABIAEADIAAAAIABADIgBADIAAAAIgBABIgEACIgBgBg");
	this.shape_44.setTransform(-66.2667,-53.9437);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#660100").s().p("AgDADIgBgBIAAgBIAAgBIAAgBIABgBQAAgBABAAQAAAAAAAAQAAgBABAAQAAAAAAAAIABAAIADABIABABIAAAAIABADIgBACIgBABIgDABQAAAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBg");
	this.shape_45.setTransform(-66.8417,-54.3808);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#660100").s().p("AgDADIgBgBIAAgCIAAgBIAAAAIABgBIABgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAAAAAIADABIABABIABAAIAAACIAAACIAAAAIgBACIgEABQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAg");
	this.shape_46.setTransform(-61.925,-54.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#660100").s().p("AAeAnQgngXgXgQIgJgJIgCgEIgDgCQgKgEgFgKIgBgGQACgCADgCQADgCACABIAHACQAKAGALAFIAKADIAIAFIAKAFIARAHIAJAFIAFAFQADACAHACIAJAFIAGAHIADAFQABAEgDACQgCACgEgCIgGgEQgFgGgHgCIAEAIQAEAGgCADIgDAEIgEACIgBAAIgFgCgAgigTIADAGIANAKIAXAPIACABIgBgBIgHgHIgKgKIgHgFIgIgFIgDgDIgHgDg");
	this.shape_47.setTransform(-42.7107,-47.3771);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#660100").s().p("AAoAhQgCAAgDgCQgMgNgDgFIAAAIQgBAEgEABQgDAAgEgDQgDgEgDgFQgBABgDAAIgGAAIgJgBIgFgDIgFgEQgFgFACgGQACgGAHgBQgCgEABgFQgGgCgHAAIgGgBQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQAAAAABgBIADgBQAGgBALADIAVAFIAIADIADACIAEABQAAAAABAAQAAAAABABQAAAAABABQAAAAABABQABACgBADIAHACIAEADIALAPIADAGQAAAFgCACQAEADAAADQAAABgBAAQAAABAAABQAAAAAAAAQgBABAAAAIgCABIgBAAg");
	this.shape_48.setTransform(-36.9062,-43.3312);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#660100").s().p("AAAAIIgCgCIgBgEQgBAAAAAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAgBAAAAIABgBIADgCIADAAIACABIAEAEIABACIAAAAQACACgCAEQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAIgCAAg");
	this.shape_49.setTransform(-30.7379,-38.2357);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#660100").s().p("AgDADIgBgBIAAgBIAAgBIAAgBIAAgBIABAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAIABAAIADAAIABACIABAAIAAADIgBACIgBABIgDABQAAAAAAAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_50.setTransform(-31.0667,-38.1308);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#660100").s().p("AgUA3QgOgFgKgLQgJgLgEgOQgDgOADgNQAEgPAKgLQAOgQAXgCQAWgDASAMQASAMAFAXQAGAWgKATQgKATgWAIQgLAEgKAAQgKAAgKgEg");
	this.shape_51.setTransform(-100.6399,-33.054);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#660100").s().p("AgGA7QgUgCgPgQQgPgQgCgUQgCgZAQgSQANgPAWgEQAVgEARAKQASAKAIAUQAIAVgGASQgHAUgSAMQgQAJgQAAIgGAAg");
	this.shape_52.setTransform(-36.3607,-36.6848);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#660100").s().p("AgTA4QgSgHgLgPQgLgPABgUQAAgUAMgPQAMgPATgFQASgFASAGQARAHALAQQALAQgBASQAAASgMAQQgMAPgSAGQgIACgJAAQgIAAgLgDg");
	this.shape_53.setTransform(-32.0719,-31.0327);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#660100").s().p("AgdAzQgQgJgHgQQgIgPACgRQADgSALgNQAPgTAagCQAYgCATARQANAMAEASQAFARgGAQQgGARgOALQgPALgSABIgDAAQgOAAgPgJg");
	this.shape_54.setTransform(-33.4198,-31.0513);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#660100").s().p("AgZA1QgUgJgJgTQgIgTAGgVQAHgWARgMQARgKASABQAVABAQAQQARAPACAVQACAUgNATQgMATgVAFQgHACgHAAQgMAAgOgHg");
	this.shape_55.setTransform(-33.6457,-31.0504);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#660100").s().p("AgVA2QgXgJgJgUQgGgPABgQQACgRAKgMQAKgNAQgGQAQgGAOACQAQADANALQAMALAFAQQAHAUgKAWQgLAWgVAIQgKAEgKAAQgKAAgMgFg");
	this.shape_56.setTransform(-30.4741,-28.4985);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#660100").s().p("AgTA4QgSgGgMgSQgLgSACgTQACgUAPgPQAOgPAUgDQATgCASALQATAKAHATQAHATgHATQgGAUgRALQgLAIgOACIgIAAQgKAAgJgDg");
	this.shape_57.setTransform(-33.9833,-33.4174);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#660100").s().p("AgDA7QgYgCgPgRQgMgMgDgRQgDgQAHgRQAHgRAPgKQATgMAXAEQAPADALAIIAAAAIABAGIADAKIABADIAHANIAFAGIABACIAEAIIAAACIAAAEQgDAYgSAOQgQANgVAAIgEAAg");
	this.shape_58.setTransform(-27.8557,-24.2773);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#660100").s().p("AgjAwQgSgNgEgZQgEgXAMgTQARgXAagDQAbgDAUATQAQAQACAYQABAYgOARQgPARgYADIgIAAQgTAAgPgLg");
	this.shape_59.setTransform(-31.3775,-26.5682);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#660100").s().p("AgYA2QgTgJgJgSQgHgNAAgOQAAgNAHgNQAJgSATgJQAUgJASAFQATAFANARQAOAQAAATQAAAUgOARQgNAQgTAFQgHACgHAAQgLAAgNgGg");
	this.shape_60.setTransform(-89.05,-40.625);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#660100").s().p("AgeAxQgSgLgHgTQgHgTAIgUQAIgUARgLQATgLAVAFQAXAEANARQANARgBAWQgBAXgPAPQgPAQgVACIgHAAQgPAAgPgKg");
	this.shape_61.setTransform(-83.1672,-45.1938);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#660100").s().p("AgYA2QgQgIgKgQQgJgRABgRQACgVAQgQQARgQAWgBQAUgBASAOQASAPAEAVQADAVgMATQgMAUgVAGQgIACgIAAQgMAAgNgFg");
	this.shape_62.setTransform(-85.8152,-43.9621);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#660100").s().p("AgMA6QgQgEgMgKQgLgLgFgQQgFgQAEgOQADgRAOgNQANgMATgCQARgDAQAHQAQAIAKAQQAJAQgBARQgBASgMAPQgLAOgRAGQgIACgJAAQgGAAgHgBg");
	this.shape_63.setTransform(-73.4468,-47.554);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#660100").s().p("AgCA8QgUgBgPgMQgOgLgFgTQgGgTAHgRQAFgPAMgKQAMgKAPgDQAVgFAVANQAWAOAFAWQAFARgIASQgHATgQAKQgOAJgSAAIgCAAg");
	this.shape_64.setTransform(-74.2167,-47.2033);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#660100").s().p("AgLA6QgUgDgNgPQgNgOgBgVQgCgUALgQQAJgPARgHQARgIARAEQARADAOAOQANANADARQAEASgJATQgKASgRAJQgMAFgNAAIgMgBg");
	this.shape_65.setTransform(-75.9354,-46.5167);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#660100").s().p("AgfAyQgZgQgCgeQgBgTAMgRQAMgSATgGQASgFAUAHQAUAIAKARQAKASgDAUQgDAVgPAOQgOANgWACIgFAAQgRAAgOgJg");
	this.shape_66.setTransform(-78.6692,-47.201);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#660100").s().p("AghAxQgRgMgGgVQgGgUAIgTQAIgTAUgKQAUgKATAFQAUAEAOASQANARgBAUQAAAUgPARQgPAQgUAEIgJAAQgRAAgQgKg");
	this.shape_67.setTransform(-69.7751,-49.1417);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#660100").s().p("AgNA5QgSgEgLgMQgNgOgDgUQgCgTAJgRQAKgQASgIQATgIARAEQATAEANAQQANAPABATQABASgLARQgLARgSAHQgJADgKAAQgGAAgIgCg");
	this.shape_68.setTransform(-70.4219,-49.1452);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#660100").s().p("AgHA7QgVgDgPgPQgMgNgDgTQgCgTAIgQQAIgQARgJQARgJARACQASADAPANQAOANAEARQAEARgHASQgIASgPAKQgOAIgQAAIgJAAg");
	this.shape_69.setTransform(-64.532,-49.161);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#660100").s().p("AgdAxQgUgMgHgVQgGgUAKgVQAJgWAVgJIADgBIAFAAIACACIAZAEIAGACIAOACIAEABIABAAQAJAHAFAKQAHAMAAAPQAAANgFAMQgMAbgeAGIgMACQgOAAgPgJg");
	this.shape_70.setTransform(-57.978,-49.639);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#660100").s().p("ABBB+QgPgEgKgLIgPgSQgFgFgJgGQghgagXgaQgMgOgHgGQgGgFgKgFIgSgIQgZgNgKgUQgHgMgBgPQAAgPAGgNQAHgNAMgJQAMgIAOgCQATgDAVAJQAOAFAXAOQAVANAKAKQAHAGAMANIASATQAGAGASANQAiAYAPAXQAVAigLAgQgFAOgLAKQgMALgPADIgLACQgJAAgKgEg");
	this.shape_71.setTransform(-45.8156,-40.4972);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#660100").s().p("AgTA4IgEgCQgQgHgKgPQgKgQABgQIAAgBIAAgEIACgIIAFgOIAGgJQAKgMANgGIAGgCQARgGATAHIAHADIAWAUIABABIAGALIABAGQADAJgBAJQgCAUgMAPIgIAIQgKAIgOADIgEAAIgJABQgKAAgJgDg");
	this.shape_72.setTransform(-100.1414,-25.8474);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#660100").s().p("AgQA5QgTgGgLgOQgLgOgBgUQgBgSAJgQQAKgPARgIQASgHARAEQASAEANAOQANAOADASQADATgMATQgMATgTAGQgJADgKAAQgHAAgJgCg");
	this.shape_73.setTransform(-107.4737,-24.8768);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#660100").s().p("AgJA6QgTgDgNgNQgMgMgEgTQgFgWAOgVQAKgPASgHQASgHARAFQARAEANAPQAMAOACASQACARgKARQgJARgQAIQgMAFgNAAIgKgBg");
	this.shape_74.setTransform(-101.4889,-28.6702);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#660100").s().p("AjWCUQgtgBgVgHIgPgGQgJgFgGgBIgfgJQgQgHgKgQQgJgQABgRQAAgOAIgPIARgbQATgbAMgNQATgVAUgKQAPgIAdgFQAjgHAKgDQASgGAagOIArgXQAxgXA3gCQA2gBAyAUIAjARIAkARIAtAUQAUAMAdAdQAgAiAPAKIAZARQAPAKAHAKQAPATgCAaQgBAZgRARQgQAQgcAHQgSAEghABIhZABQiaAAjqgIg");
	this.shape_75.setTransform(-66.9227,-36.3942);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#660100").s().p("ABCAPIAAgHQAHgEAEgFQgGgBgIACQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgCgDgFABQg5AEhigCQgDgEAEgDQACgCADgBQAFgCALAAIBnAAIAjgBIAUgDQAMgCAIABQAEACgEAGIgIAEQgIADgIAIQgFAGgEAAIgBAAg");
	this.shape_76.setTransform(-63.433,-38.5237);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AAsA3QAPAkAJAlAhDh/QBDBSAkBR");
	this.shape_77.setTransform(-27.6,-31.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AB6h/QhfA/iUDA");
	this.shape_78.setTransform(-108.2,-31.75);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AkzA1QEzjTE0DT");
	this.shape_79.setTransform(-65.2,-49.8579);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AoKAAIQVAA");
	this.shape_80.setTransform(71.8756,-16.65,0.9764,2.1369,0,62.0977,0);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AnBAAIODAA");
	this.shape_81.setTransform(-70.603,-18.95,1.1073,1);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#660100").s().p("AgyBOQgJgHABgKQAAgIAHgJIALgPIAHgNQAIgSAegnIAHgJIAFgLQADgHADgDQAFgHAIgCQAIgCAGAEQAGADACAHQACAHgBAHQgCAKgLAOIgWAeQgOAUgHAMIgUAjQgIAKgFACQgFADgEAAQgFAAgGgEg");
	this.shape_82.setTransform(113.4774,-4.422);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#660100").s().p("AhgCNQgGgHABgJQABgGAHgLIAJgQQAGgJAHgEIASgHQAHgEAIgUQAIgVAdg0QAZguAIgdQAHgYAEgHQALgSARACQAHABAMAKQAKAIACAHQABAHgDALQgLAkgKAQQgGAJgJAMIgRAUQgNARgSAjQgUAogKAPQgNAUgOgCIgFgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBABAAAAQgDABgCAGQgDALgHAHQgHAIgKAAQgIAAgGgHg");
	this.shape_83.setTransform(112.1654,-4.8353);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#660100").s().p("Ag3BOQgFgGgBgMQAAgJABgFQADgHAIgDQAIgEAHADQASguAQgTIAFgIIADgJIAGgSQAFgNAJgFQANgFALAKQAIAIACAQQABAKgEAQQgDAMgDAGQgDAFgMAJQgCAJgMAQIgOAPIgHAGIgDAIQgPAagVABIgCAAQgLAAgGgHg");
	this.shape_84.setTransform(103.2781,9.1107);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#660100").s().p("AhJBhQgJgCgEgGQgFgHABgIQABgJAHgEQAFgDAMgCIANgIIAegZQAKgKAFgIIAMgXIANgTIATgbIAQgWQAIgJAGgBQALgDAIAIQAHAJgCALQgCAHgGAIIgXAdQgNARgHAMIgHAPQgEAIgEAFQgFAHgKAJQgUAVgdAUQgKAHgIADIgJABIgHgBg");
	this.shape_85.setTransform(97.2246,15.0803);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#660100").s().p("AhQAwQgNgBgGgKQgDgGABgJQAAgIADgFQAGgIAPgBIAfgCQATgCALgFIAQgJQAKgGAIgBIASgBQAIgBARgNQAPgKALACQAKADAEAIQADAKgEAHQgDAGgMAHIgVAMIgFAEIgFAHQgIAMgTAGIgfAIIgXAGQgFABgZAAQgSAAgFgBg");
	this.shape_86.setTransform(83.0155,25.376);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#660100").s().p("ABKBCIgdgDQgRgCgJgDIgTgJQgKgEgLgBIgMAAQgHgBgEgDIgGgIQgDgDgIgEQgcgOgXgRQgQgNgEgKQgCgHACgIQACgIAGgDQAJgGAWAKQAOAFALACQgBgNAMgGQAGgDAGABQAGABAFADQAEAFAEAJIAHAPQArAQAyACQAaABAGACQASAEAHANQADAIAAAMQgBAWgMAEQgIABgEABIgKAIQgHAFgLAAIgHgBg");
	this.shape_87.setTransform(64.9306,23.4444);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#660100").s().p("ABRBUQgFgCgKgJIgVgUQgIgJgJgGQgIgFgSgGQgTgGgHgEIgRgMQgogfgRgWQgFgFgCgIQgCgMALgHQAKgGAMAEIANAIIAQAIQAbAMAHAPIAFALQACAHAEADQADAEAPAFQAUAFAVAPQANALAVAVQALALACAIQABAKgIAIQgFAFgIAAIgFgBg");
	this.shape_88.setTransform(54.4645,19.4633);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#660100").s().p("AApBOQgPgDgVgMIgMgJIgKgIQgIgHgMgQQgMgSgHgFIgNgPIgHgMIgMgNQgIgIgBgHQgCgLAIgIQAIgHALADQAFACAJAIQAPAOAHAIIAQAWQAIALAMAMIAVAWIARANQAHAFADABQAGABAKgEQALgEAGAAQALABAFAKQAEAJgGALQgEAIgLAEQgKAEgMAAQgIAAgJgCg");
	this.shape_89.setTransform(43.993,7.8985);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#660100").s().p("ABcB0Qg8gagagTQgPgLgbgbQg+g7gagvQgJgRAFgKQAEgJAPgGQAKgFAIAAQALABAFAKQAEAKgGAJIgDAGQgBACADAFQALAVAgAhQAuAyAgAUQAPAJAxAWQASAIAFAJQACAIgDAHQgEAIgHACIgGABQgIAAgMgFg");
	this.shape_90.setTransform(40.0271,1.0808);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#660100").s().p("AAzBRIgOgOIgTgRIgIgNIgIgMQgEgGgKgHIgQgMIgSgPIgNgKQgJgIgIgMQgIgNACgJQABgLAKgEQALgEAJAGQAEADAFAJQAFAIAEADQADAEAKAFQAEADAGAIQADAEAQAMQARAMALAOIALAQQAFAIAJAIIAPANQAHAJAAAJQgBALgMAFIgHABQgHAAgGgEg");
	this.shape_91.setTransform(35.4891,-2.1058);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#660100").s().p("AA+BQQgFgBgIgHIgdgVQgOgNgFgHIgBgBQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQgJAJgNgGQgJgDgJgMQgJgKgEgKIgEgOQgHgFgCgEIgDgJIgIgLQgJgLAFgLQADgIAKgEQAIgDAKADQAKACAGAEQAHAHAAAJIAAAFQABACADABQAbANASAYIAOARQAKANAVANQAKAGAEAFQAIAIABAIQABALgIAGQgGAEgGAAIgGAAg");
	this.shape_92.setTransform(30.0306,-10.8721);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#660100").s().p("AAIAgIgKgKIgHgEQgEgEgEgLQgOAEgKgJQgEgFAAgHQgBgGAEgGQAEgGAJgCQAGgCAKAAQANAAAGAFIAGAGIACACQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAQAFgDAGABQAGABAEAEQAFAEACAJIAAAPQgBAJgDAHQgDAHgHAFQgEACgFAAQgIAAgHgFg");
	this.shape_93.setTransform(26.4802,-15.33);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#660100").s().p("AAZAbQgCgBgCgEIgGgOIAAAEQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQgCACgDgCIgEgEQgHgEgCgDIgEgDIgEAAQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBAAAAAAIgDgCIgHgGQgFgDABgEQAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAAAQADgBACACQAAAAABAAQAAAAAAABQABAAAAAAQAAAAABAAIACgCQABgBAAAAQABAAAAAAQABAAAAAAQABAAABABIADADIAFAIQAGAAAAACIAAAEQABACAEAAIAAgQIABgEIADgEQACgDACAAQAGAAgBAGIgBAFQAEAEAAACIACAEIAHAPIABAGIACAGQABAEgDACIgDABIgDgBg");
	this.shape_94.setTransform(24.9792,-15.1056);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#660100").s().p("AAZEQQhMgIg8giQgkgUgngkQgXgVgrguQg2g6gZgkIgaglQgNgRgdgiIgbghQgYgcgFgRQgJgdASgdQASgcAegEQAJgCAXACQAVABAMgDIARgIIAQgHQAUgIAXAGQAWAFAOARQAQgVAcgIQAbgHAbAHIAgALQAUAHAMACQAQADAXgBIAngDQAbgCAhAEQAUADAoAHIBMAOQAjAHAOAIQAbAPAAAZQAPABATgOIAegXQARgKAUABQAUAAAQALQAQALAIASQAJASgCATQgCASgLAUQgHALgRAWIiICqQgzBAgcAeQgxA0grAPQgZAIghAAQgPAAgRgBg");
	this.shape_95.setTransform(72.569,-0.1225);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#660100").s().p("AiDCWQgLgCACgTQAEgeAKgkIAMgtQADgSAAggIgBgzQAAgIAEgDQADgCAFABQAEACACAEQACAEgBAMQgBAMACAEIAShLQACgJACgDQAGgHAGADQAGACABALQABAOgCAUIgFAiQgEAeABAwIAABQQAIAEANgJQAZgSAVgYQAOgQAZgiQA3hNAVgpQADgGAEgDQAFgEAFADQAFAEgGANQgFAKgDAQIgFAbQgDALgGADQgEACgEgCQgFgDABgEIg0BJQgQAXgNAPQgNAPgUARQgcAYgTACQgOACgGgIQgCgEAAgKIAAh/QgMAOgBAVIgCAlQgBAXgIAWQgGAOgBAIQgDAYgFALQgEALgHAAIgCAAg");
	this.shape_96.setTransform(85.9226,-8.4267);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#660100").s().p("AgeBcQgGAAgDgEQgEgEABgGQAAgGAEgEIAFgFIADgKIgKAGQgHACgDgDQgGgFAFgOQAFgPAFgJIALgPIALgMIANgRQAIgMAMgfQADgJADgDQAHgGAFAGQAGgHAFAAQAHAAACAHQADAFgCAHQAAAHgGAPIgNAlQgFANgEAEIgHAGIgDAHIgHAMIgHAOIgIAPQgGAJgCAHQgDAMgCACQgDAEgFAAIgCAAg");
	this.shape_97.setTransform(-26.8862,-11.3722);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#660100").s().p("AgbBLQgFgFACgHIAEgFQAFgHAHgNIABgDIgBgBQgEgEAAgGIABgKQAIgkgCgiQgBgHABgFQACgHAGgBQAFgCAEAHQADAFgBAIQADgJADgEQAGgGAGADQAFADAAAMIAAAPQgCAkgGAVQgCAKgFAJIgIAKQgIAKgHAOQgFAJgDABIgFABQgEAAgDgCg");
	this.shape_98.setTransform(-31.9917,-2.1282);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#660100").s().p("AgUBMQgEgEABgEIADgIIAGgQIADgFQAAgEgBgGQgDAHgDACQgFAFgFgBQgHgCgBgJQAAgFAEgJQAIgRAEgOIADgOIABgLQAEgGAEAAQAGgJACgLQACgIACgCQAEgEAGABQAGACABAGQADgCAEABQAEABACADQADAGAAAJQAAARgCAJIgHAcQgHAXgIAMIgLASIgDAOQgEAIgHACIgCAAQgDAAgDgDg");
	this.shape_99.setTransform(-35.725,2.9145);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#660100").s().p("AgjBTQgFgFAGgLIAJgLQAGgIABgEQgGAAgDgFIgDgEIgFgFQgDgDABgIIADgaQACgMADgFQAGgKAJABQADgUAMgXQAEgHAEgCQAIgCAEAGQACADAAAHQAAAMgDAPQADgDAFAAQAEAAADADQAFAFgCAKQgCAIgGAQIgDALQgCAKgGANQgIARgMARIgEAGIgCAGIgDAGQgEAEgIABIgDAAQgHAAgDgDg");
	this.shape_100.setTransform(-39.1339,8.1753);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#660100").s().p("Ag2BbQgDgDACgKQAFgYANggIAFgPIACgKQACgHAEgCIAGgDIAFgFIAKgSQAEgIACgCQAFgFAHAAQgBgEACgEIADgJIABgLQABgJAIgDQADgBAEABQAEACACADIABAHQAAAFABACIAFAFIAGAEQAEAFgDAMQgFAagGAOIgYAlQgGAKgGAAQgHAQgNAMQgLAJgBADIgGAMQgEAEgLAAQgIgBgCgDg");
	this.shape_101.setTransform(-45.305,16.9375);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#660100").s().p("AhsBSQgHgGAFgJQADgFAIgHIBwhbQAnggAVgNQAMgGAFAEQAHAGgGAKQgIANAAADQADgDACgFIAEgJQAFgLAJACQAHACAAAJQAAAGgFAHQgOAZgaAXQgSAOghAXIgRANQgIAHgDABQgGADgNACIgSALQgLAGgOACQgHAAgEABIgJAFQgEACgDAAQgFAAgDgDg");
	this.shape_102.setTransform(-58.8837,29.6092);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#660100").s().p("AgBAKQgEgBgDgEQgBgEAAgCQABgEAEgCQADgCACAAQAGABADAGQABAFgEAFQgDACgDAAIgCAAg");
	this.shape_103.setTransform(-70.0125,36.8333);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#660100").s().p("ABTA7QgJAAgSgCIgSABQgKAAgHgDIgLgFIgKgCIgMgEIgQgHQghgNgSgMIgTgMQgagUgLgMQgIgIAAgGQgBgEACgEQACgEAEAAQAEgBAEADIAHAGQAFAFAXAJQAdALAXAWIAGADIAHgDQADgCAEABQAEACABADQAbgGAbAGQAEgLAWgFQAdgGAdAAQAJAAAGADQAGAEABAIQACAHgFAFQgEAFgNAFQgNAFgDAGQAFAEAAAIQAAAHgFAFQgIAIgOAAIgDAAgABqAAIABAAIAFAAIgHgBg");
	this.shape_104.setTransform(-78.122,31.8764);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#660100").s().p("AArBCIgDgDIgGgBQgMACgGgLIgDgEQgBgBgDgBQgHgEgJgQIgNgTIgPgQIgWgdIgFgHIgCgMQAAgKAFgEQADgCAEABQAEABACADQACADACAGQADAGAIAHQAJAJADAEQAFAJADADIAIAGIAPANQAJAHgBAHIAAAEIACAEQAIALAMAHIANAIQAIAGABAGQACAJgIAEIgEAAQgGAAgFgGg");
	this.shape_105.setTransform(-95.281,21.0825);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#660100").s().p("AAoBCQgDAAgFgEQgSgRgNgUQAAAFgEADQgFADgEgDIgGgGQgPgWgNgYIgEgKQgBgGADgFQACgCAEgBQADgBADACQADABAFAKQgBgFADgFQADgFAFABIgDgGQgDgHAGgFQAGgEAGAEQADACACAFIADAJIAGANIATAfQATAgAEAPQACAKgBAEQgDAIgHAAIgBAAg");
	this.shape_106.setTransform(-100.2154,13.0859);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#660100").s().p("AAUBMIgOgHQgJgFgBgDQgBgDAAgHQgBgKgEgIIgNgOQgIgJgCgIIgCgHIgHgOQgFgIABgFQABgHAHgBQAGgCAEAGQABgBAEABQABAAAAAAQABAAABAAQAAAAABAAQAAAAAAgBIAAgDIgBgFIgCgQIACgIQACgFAEgBQAHgBAGAJIARAYQABgGAGgBQAGAAADADQAEAFgBAKQAAANACAKIAGAYIAEAiQABAKgDAGQgCADgEABQgEABgDgCQAAADgEADQgDACgDAAIgCAAg");
	this.shape_107.setTransform(-106.1208,3.7);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#660100").s().p("AgEAaQgDgFgBgGQgFgTAAgLQAAgIADgEQADgEAGABQAFABACAFIAAAJQAAAGADACIADADQACACAAAIIAAAPQgCAKgHAAQgFAAgEgFg");
	this.shape_108.setTransform(-106.075,-3.8841);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#660100").s().p("AgEBAQgEgBgFgGIgJgNIgKgUIgHgRIgDgGIgFgCQgDgCgCgFIgCgIIgDgHQAAgEADgDQADgDAEAAIAFgBIADgDQAEgGAIgCQAIgBAGADIACgHIACgIQADgFAEgBQAFgBAEAFQADADACAIQAFgDAGADQAEADAEAGIAHAMIANAsQAEALACAMQABAHgBAEQgBAGgHABQgEABgGgFIgNgLQABAHgBAGQgDAHgFABQgIACgDgGQgBADgEACIgDABIgDgBgAAbALIAAABIABACIACACIAAgDIgBgBIAAgBIgBgCIAAgBIAAgBIgBgDgAgbgQIgBAEIADACQACABACAHIACAEIABABQAAAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAIgBgCIgBgEIgFgUg");
	this.shape_109.setTransform(-109.1286,-4.3461);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#660100").s().p("AAhBRQgEgDgDgEIgegtQgQgagIgVIgGgRQgDgKgDgGQgHgLgBgFQgCgLAJgDQAEgBAFACIAMAFIAGADIAFgCQAJgBAEAFIAFADIAGAAQAFAAADAGQACAFAAAGIACAXQAAgNAFgEQADgDAFABQAEABACAEIABAIIAAAkQAAAJgBAEIgEAKQgCAFAAAEIADAKIADAMIACAJQABAFgBADQgBAFgFACIgFABIgEgBg");
	this.shape_110.setTransform(-114.4482,-10.4437);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#660100").s().p("AgIAFQgBgCAAgDIAAgBQABgEACgCIAEgBIACgBQAGAAACAFQAEAEgEAFQgDAFgFAAQgFAAgDgFg");
	this.shape_111.setTransform(-119.1875,-18.575);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#660100").s().p("AgCAJQgEgBgBgCIgBgEQgCgGAGgDIAEgBIAAgBQAGABACAEQADAEgCAEQgBADgDACIgEABIgDgBg");
	this.shape_112.setTransform(-118.3204,-18.2556);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#660100").s().p("AAlAoQgEgBgDgDQgCgDAAgIIAAgTQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBAAAAgBIAAAOQgBAIgFADQgFADgHgFQgEgEgDgGIgDgGIgDgDIgEgBIgNgCIgJAAQgFAAgDgCIgEgGIgEgEIgBgIQABgHACgCQADgFAGABQAGAAADAEQAEABAFgCIAIgFQAGgCAKADQgBgHAJgCQADgBAEABQAHACAIALIAKAPQABAEAAAJIAAAVQAAALgEAEQgCACgEAAIgBAAg");
	this.shape_113.setTransform(-114.675,-16.7458);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#660100").s().p("AgrFUIgzACQgeAAgUgFQg9gQgzhWQgcgygehHQgRgqgghTQgKgagKgLQgIgIgSgOQgcgbADgsQAEgtAggYQATgOAegHQANgDApgFQBFgIAdADIAXACQANABAJgCIAQgFIAPgHQAfgMAhATQAgATAEAhQgFg2AGgaQAFgVAMgQQAMgRASgHQAXgJAZAKQAZAKAOAWQAaAogOA5QAYgJAaAHQAaAGARATQAtg2AwgNQAegIAdAJQAfAIARAYQARAYgBAiQgBAfgPAeQgMAXgXAcIgpAwQgfAlggA1QgRAdgmBFQgRAfgKAOQgSAYgUALQgHAEgTAIQgQAHgJAGQgGAFgLALQgMAMgGAEQgVAPgjACIgJAAIg0gCg");
	this.shape_114.setTransform(-69.0664,-1.9403);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#660100").s().p("AgYCFQgDgCAAgGIAAhvQAAgQACgIQAEAAADAGIABAIQgCA7ACA5QADgDACgLIADgOQABgIACgEIAGgLQABgEAAgGIAAgJQABgIAEgMIAIgTQAFgPAAgiIAAhZQAAgFADgBQADgBABAFQACADAAAHIAABbQAAAVgCAJIgJAaQgGAQgBALIAAAIQAAAGgCADIgHALIgBAMIgEANIgEAPQgCAJgIACIgCAAIgEgBg");
	this.shape_115.setTransform(-65.225,-15.3641);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AnxAAIPjAA");
	this.shape_116.setTransform(-70.6,-18.95);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AnxkcQHfRzIExz");
	this.shape_117.setTransform(-70.6,9.5632);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AhDh/QBDBSAkBRAAsA3QAPAkAJAl");
	this.shape_118.setTransform(-27.6,-31.75);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("Ar/jrUAliAOugVNgOu");
	this.shape_119.setTransform(51.3031,6.9115,0.9764,2.1369,0,62.0977,0);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#660100").s().p("AAIBJQgDgDAAgNQAAgJgFgNIgQg2QgDgJgCgLIgDgUQgBgHACgEQABgEAFgCQAFgBAEAEQACACACAGIACARQABAKABAGIAJAVIACALQAGAZADAGIADAJQACAGAAANQABAMgGAEQgDACgCAAQgEAAgDgEg");
	this.shape_120.setTransform(-19.8373,-10.0274);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#660100").s().p("AAABeQgCgEAAgJIgEggIAAgeQAAgTgCgKQgDABgEgCQgDgCgCgEQgCgEABgKQACgWgEgYQgCgLADgEQACgEAFAAQAEAAADACQADADACAGIAEAQIAEARIADALIADAIIAGATIAFAgQADAVAAALQAAAFgCAEQgDAFgFAAQACAJAAAJQABAIgEAEQgDADgEAAQgFAAgCgDg");
	this.shape_121.setTransform(-18.89,0.4708);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#660100").s().p("AgTBiQgEgBgCgEQgCgDAAgFIgBgPQgBgNACgUIADghQAAgfADgQIAFgWIAFgTIAEgJQADgFAEABIAHACIAIAAQAHACABALIgBAQQAEAAACAFIABAJQAAAZgDAWIgEAVQgDAPABAIIAAAKQgBAFgDADQgDADgFgBQgEgBgCgDIgHAeQgDAKgDACQgDABgCAAIgDAAg");
	this.shape_122.setTransform(-19.4417,13.737);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#660100").s().p("AgUBTQgFgEAAgFQgFgBgCgEQgDgFAEgMIAEgUIAEgUQAFgPACgJIAHg2IADgLQAEgHAEAAQAEgBAEADQADACABAEIgDAMQgDAIAAALQAFgOABgHQACgKADgDQADgCAFAAQAEABACADQACAEgBALIgDAkQgBAWgDALIgEALIgKAYIgDAFIgDAOQgCAJgCAEQgEALgKABIgCAAQgEAAgDgDg");
	this.shape_123.setTransform(-21.2726,24.849);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#660100").s().p("AgkBRQgEgEACgGIADgFIADgIIAIgZIAAgEIgBgEQgBgGADgKQAEgTAIgMIAJgMQAEgHADgLIAFgTQAAgEADgEQAEgEADAAIAEABIAFACIAGACQAFADgBAMQgDAYgEALIgFANQgEAIgBAGIgDAMQgBAIgDAEIgOAOQgGATgIAPIgFAIQgEAFgEAAIgDAAQgEAAgDgDg");
	this.shape_124.setTransform(-25.275,37.8923);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#660100").s().p("AgmBCQgCgEABgGQAAgFADgFQAEgHAGgDQgJAAgDgJQgBgFAFgMIALgVQAHgOAHgEQAAgDABgEQACgEAEgBIADgBIACgDIAEgOQACgJAEgBQACgBAEAAIAGABIAHgBQAHABABAHQAAAFgDAIQgGATgFAIQgCADgBAEIABAGQACANgGAKQgDAFgHAHQgKAMgHALQgEAIgEADIgDADIgCADQgEAFgFAAQgGAAgDgFg");
	this.shape_125.setTransform(-29.5881,45.725);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#660100").s().p("AgoAuQgCgFACgFIAEgHIALgPIACgFIABgGIAEgGQASgUANgVQADgEACgBIAJgCIAJAAQAEACABAEQACAEgBAEQAAALgDAIIgDAJIgEAHIgCAGQgBAFgEAGIgFAHIgHAIIgIAEIgEACQgBABAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAIgJAJIgGAEQgCABgIAAIgFABQgGgBgCgFg");
	this.shape_126.setTransform(-34.8621,52.475);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#660100").s().p("Ag4ApQgGgFADgIQACgFAHgHQAFgEADgBIAMgDQAGgBAKgGQAFgCADgDIAEgFIAFgGQAJgJAKgHIAGgFIAFgFQAGgFAFAEIADACIAHACQAJAEgCAJQgCAFgFAEIgKAHIgFAGQgFAEgNAGQgIADgDADIgFAFQgGAHgIAAIgEABIgJAKQgDAEgDACQgDACgLABQgKAAgEgEg");
	this.shape_127.setTransform(-42.656,59.7234);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#660100").s().p("AhEA+QgDAAgGgEQgFgDgDgFQgCgFABgFQACgGAEgDQAEgDAGgBIAKgDIANgFIALgFQAGgDAIgIQAJgIAFgDQAEgDAOgEIAQgIQAcgPAKgNIAHgIQAFgEAEACQAIABgBAKQgBAHgHAGQgOARgWAKIgEACIgCAFQgDALgLAJIgLAHIgNALIggARQgMAGgMADIgJACIgCgBg");
	this.shape_128.setTransform(-48.1972,61.5095);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#660100").s().p("AhXAtQgCgCgBgEQAAgEACgDQAEgEAIgBQAhgEAQgFIASgGQAPgGANgHIAcgUIAQgOQAJgIACgBQAIgFAGAGQADADAAAHQABATgHAMQgIAQgPACIgMAAQgHAAgEACIgHAGQgEAEgDABQgDACgHAAQgJAEgCAAIgFgDQgCAAgFACQgIAEgXAEIggAFIgHAAQgGAAgDgCg");
	this.shape_129.setTransform(-63.0733,67.6697);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#660100").s().p("AAnAbQgZABgkgGIg7gNQgrgIgZgJQgJgEgDgEQgDgDAAgEQAAgFADgCQADgCAJABQAkAEAXAGIAjAJQAQACAUgBIAjgEQAigEARAAIAlAAQAWAAAOgGQANgFAFACQAHADAAAHQgBAHgGACQAGAQgLALQgHAHgVACIhIAGIgDAAQgJAAgCgGg");
	this.shape_130.setTransform(-85.225,70.092);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#660100").s().p("ABBAoIgLAAQgGAAgEgCQgFgBgIgFQgGgDgOgBQgGgBgKgFQgIgEgCgDIgDgEIgGgCQgZgDgcgWQgIgHAAgFQgBgEAEgEQADgDAFAAQADABAJAHQAFACAKADQAKADAFADIAJAIQAGAEAMADIASAFIANAGIALACQAVADARAHQAGACADADQADADgBAEQAAAFgEACQgDADgFAAIgJAAg");
	this.shape_131.setTransform(-107.424,64.6469);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#660100").s().p("AAvA8IgRgHQgRgGgPgKQgLgGgGgIIgGgHIgFgEIgDgGIgHgFQgEgCgGgJIgHgHIgFgIIgBgKIAAgNQAAgFACgDQACgFAGAAQAFAAADAFQACAEAAAJQgBAKADADIAGAGIAGAIQAEAFAGADIANAHIAKACQAJACANAIIAOAKIAIAIIAMAOQADAEABAEQABAEgDADQgCADgEABIgBAAIgIgCg");
	this.shape_132.setTransform(-124.2857,54.6893);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#660100").s().p("AAHBTQgCgDgCgKIgGgmQgEAAgDgFQgCgEAAgFIgBgIIgEgJQgMgSACgkQAAgGACgFQADgGAFAAQgBgKADgEQADgDAFAAQAEAAADADQACAEAAAIIAAAYQgBAOABAJQADAVAHARQAEAMAAAEQAIgDADAIQACADgBAJQgCAKAAAMQABAHgBAEQgCAHgGACIgCAAQgFAAgEgFg");
	this.shape_133.setTransform(-129.5943,47.2891);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#660100").s().p("AAIBJIgIgDIgHgEQgCgCgBgIIgDgKIgGhRIADgVQABgHABgCQACgGAFgBQAHgCAEAHQAGgDAFADQAFADgBAHIgCAGIgDATIgBAVQAFACAAAJIABA6QAAAJgDADQgCADgEAAIgCAAg");
	this.shape_134.setTransform(-131.0423,35.3538);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#660100").s().p("AgKA4QgDgBAAgHIgBgwIAAgwIAAgFQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAABAAQAAAAABAAQAAABABAAQAAAAAAABQABACAAAEIABgBQABgCADgBQAAAAAAAAQABAAAAAAQABABAAAAQABAAAAABIABAFIAAAQIADgFQAAAAABgBQAAAAABgBQAAAAABAAQABAAAAAAQADABABADQABADgDAEQgGAMgDAZIgDAMIgDAYIgDAFQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAIgCAAg");
	this.shape_135.setTransform(-129.9214,33.0143);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#660100").s().p("AgPBLQgCgDABgCQgEABgCgEQgBgCAAgEIAAgkIACgFIABgJIAFgSQAEgIABgKQADgWADgKQACgIAEgHQACgEADAAQADAAABAEIAAAGQgEARgFAiQAEgBAAgEIACgHIADgCQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAFABgBAIQgBAngIA1QAAAEgCACQgDADgDgCQgCgCgCgFQgBgFgCAAQAAACgBADQgDACgDgBQACADgCADQAAAAgBABQAAAAgBABQAAAAgBAAQAAAAgBAAQgDAAgBgCg");
	this.shape_136.setTransform(-130.9667,22.825);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#660100").s().p("AgJBcQgDgDABgFQgCAAgCgDIgBgGQABgZgBgyQgBgFACgFIAGgJQAFgIgBgUQAAgXADgPQABgFABgBQAEgDADAGQABADgBAGQgBAGABADQAEgCADACIACAFQACAogKAfQAFgDACACQACACAAADQACAogHAjQgBAHgEAAQgEAAgBgDIgCgFQgCABAAAGQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_137.setTransform(-129.7284,14.5882);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#660100").s().p("AgYBNIgCgFIAAgaIACgLIACgIIAIgRQAGgKAAgEQgBgIACgEIAFgHIACgGIALgoQAAgHADgBQADgCADAEQACADgBAEQADgCACAEQACADgCAEIgEAFQgBAEgBAJQAAAJgCAEIAAADIABAEQACADgEAIQgEALgFAHIgFAIIgCAKIgCAGIgCAKIgDAWQAAAFgDACQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQABADgDADIgDACQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAgBAAAAg");
	this.shape_138.setTransform(-126.9679,1.4644);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#660100").s().p("AgkBLQgCgDAAgDIACgKIAAgIIABgGIABgNQAAgJAFAAQgBgFADgHIAEgLIACgGIAGgJIAFgLIADgEIACgEIABgGQAAgDAEgFQACgEgBgDQgCgCABgFQAAgDADgDQAIgHAIAAQAHAAABAEQAAACgBADIgEAFIAGgEQAEgDADABQAEABAAAEQAAAEgEABIgIATQgHAMgDAEQADABgCAIIgJAPIgDAHIgCAGIgCADQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAIgMATIgDAEQgCACgCgBIgIAcQgCAGgDAAIAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_139.setTransform(-121.65,-9.97);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#660100").s().p("AAzHBQgSgIgCgRQhuAVhzgPQhygOhngxQhagrgcg5QgMgZgFgkQgFgjgBhGQgCh9AFhAQAJhpAehPQANgjASgdIAOgZQAIgPAEgMQAEgKAFgWQAFgSALgIQAMgJASADQAQAEALANQATAXgIAmQARgBATAMIAhAWQAMAIAmASQAhAPAQAOQAXASAbAsQAfAyAOAQQATAVAdASQATAMAjATIBwA4QAaANAPgBQAKgBANgJIAVgOIAYgLQAQgHAIgFQAUgOASgkIAbg8QAPglANgWQAnhFA3gRQALgLAEgTIAFgiQAHgvAagJQAPgFAPAIQAPAIAIAPQALAYgIAoQgFAaABAHQAAAHAGAbQAHAfgCAnQgCAZgHAuIgQBkQgJA7gJAdQgMApgmBHQgZAvgPAYQgXAmgaAZQgvAvhNAfIg1AVQgfANgUAOIgcAVQgRAMgNADQgHACgHAAQgKAAgKgFgAAeA7QAJAFADAAQAEgBAFgEIAUgQQgogVgpgQIgVA6QAFAAAIgDIAMgGQAHgCAHAAQALAAALAGgAkvjRQABAGADAEIAGAIIAIAIQAKAKgBAJQANAAALAHQALAHAGAMQAGANAAAaIAAA6QADgVAQgKQAPgMAUAEQAGACADgBQADAAAGgGQACgCAAgDQABgBgEgFQgRgPgcgtQgLgTgWgeQgFgIgGgFQgFgDgLgEQgOgGgJgHQgMgIgFgCQgCAcACALg");
	this.shape_140.setTransform(-74.5813,25.749);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#660100").s().p("AhXBPQAGgGADgNQAEgSADgEIAHgLIAIgKQAEgFAFgKIAJgOQAMgTAWgSQANgLAbgSQANgIAFAHQgfATgaAWQgVARgIAOIgHAQQgFAKgFAFIgIAJQgFAFgCAEQgCADgBAOQgCAKgFADIBlg8QArgYARgRQADADgEAGQgGAMgPAJQgHAFgUAJQgwAYgtAhQgNALgKAAQgFAAgEgEg");
	this.shape_141.setTransform(-72.9808,44.6719);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AAplxQB8Gij3FB");
	this.shape_142.setTransform(-24.931,18.025);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ABBlvQjHGlBuE6");
	this.shape_143.setTransform(-126.6512,18.2);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AIAhZQnHFno4ln");
	this.shape_144.setTransform(-81.2172,64.01,0.9371,1);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#660100").s().p("AgKA1QgEgCAAgHIACgQIAFgTIAHguQABgKAEgEIAFgBQADAAABADIAAAFIgDACIgBAFIgEAWQgDAWgDAMIgCANQgCAGABAGIAAAGQAAABAAAAQAAAAgBABQAAAAAAAAQgBABgBAAIgCAAIgCAAg");
	this.shape_145.setTransform(20.5083,-11.85);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#660100").s().p("AgJAuQgCgCABgEIABgMIABgHQABgVAFgVIAEgVIABgEQADgEAEAEQACACgBAGIgLA7IAAAFIAAAQIAAAEQgBADgEAAQgDAAgBgDg");
	this.shape_146.setTransform(19.3967,-4.3441);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#660100").s().p("AgCAoIgGgxIAAgVIABgEQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgDACgCQADgCADAEIABAFIgBBJQgCAFgDABIgBAAQgCAAgCgEg");
	this.shape_147.setTransform(19.475,2.7477);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#660100").s().p("AgCA3QgDgBgBgGQgCgMAAgSIAAgeQAAgNAEgEQAAgJADgKQABgFACgBQADgBACACIACAFIgCAFQgCAEAAAGIgBAIIgBADQgCAEAAAIIAAAlIABAEIABADIAAAHIAAAJQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAIgCABIgBAAg");
	this.shape_148.setTransform(19.12,1.9013);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#660100").s().p("AAEAuQgCgCgBgDIgBgGQgGgVgCgIQgCACgEgDQgCgCAAgDQgCgIAAgXQAAgBAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQACgDAEACIACgFQAAgBABAAQAAgBABAAQAAgBABAAQAAAAABAAQAEAAACAGQACAGABAJIACAKIABAEIACADIAHAXQAAABAAAAQAAABAAAAQABABAAABQAAAAABABIABAEQAAADgDACQgCABgDgBIAAAHQABADgCADQAAABgBAAQAAABgBAAQAAABgBAAQAAAAgBAAIgCAAg");
	this.shape_149.setTransform(20.8,9.1935);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#660100").s().p("AAEBEQgCgBgBgEIgEgZQgJgwACgyIABgGQADgEAEAEQACACAAAFQgCAgAEAkIAIAvQACAFgBAEQAAAAAAABQgBAAAAABQAAAAgBAAQAAABgBAAIgCABIgCgBg");
	this.shape_150.setTransform(19.4593,12.5509);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#660100").s().p("AgBAPIgBgBIAAgCIgBAAIAAgBIgBgEIAAgCIgBgDIAAgKIgBgBIAAgDIABAAIAAgCIAAAAIABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIACABIABABIABAAIAAADIABAAIAAALQAAAAAAAAQABABAAAAQAAAAAAAAQgBABAAAAIABAAIAAAEIAAABIABACIABAAIAAAFIgBAAIgBACIgEABQAAAAgBAAQAAAAAAAAQAAAAgBgBQAAAAAAgBg");
	this.shape_151.setTransform(20.025,18.075);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#660100").s().p("AAAAlIgCgIIgBgEIgDgsIgBgHIgBgEIABgFIADgEQAEgBABAGIAAADIACALIAAAHIACAGIACAeIABADIAAAEIAAAGQgBAEgDAAQgDAAgBgDg");
	this.shape_152.setTransform(19.85,13.085);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#660100").s().p("AgBBCQgCgDABgGIAAg+IgBgGIgCgEIgCgHIgIghIAAgGQABgIAGgBQAIgBACAGIACAFIAIAgIAEAPIAABGQAAAHgBADQgDAEgGAAQgFgBgCgEg");
	this.shape_153.setTransform(22.2,8.935);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#660100").s().p("AANB7QgCgBgFgJQgKgYgFgcIgEgXIgHgdQgCgKAAgNIgCg+QAAgTgCgNQgCgHABgDQABgFAFgCQAGgCAEAEQAEADABAJQADAUABApQABAqACATIAIApQAGAfAJASIAFANQABAHgGAEIgEABQgEAAgDgDg");
	this.shape_154.setTransform(21.841,20.5583);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#660100").s().p("AAHBxQgCgDgBgGIgMg7QgEgVgCgRIAAgbQgBghgJgqQgCgMADgEQAEgFAGABQAGACABAGQAFgBAEAFIAEAKIATBNQABAIgBADQgCAGgGABQgHACgEgGQgCgEAAgJQgBAXAHAhIAMA4QACAMgDAEQgDADgEAAQgFAAgDgDg");
	this.shape_155.setTransform(22.485,22.1827);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#660100").s().p("AgBAVIgEgIIgHgRQgEgJACgEQABgEAEgCQAEgCAEACQADACADAHIAEAKQAFAIABAHQABAGgCAEQgDAEgFAAQgFAAgCgEg");
	this.shape_156.setTransform(25.1168,36.4679);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#660100").s().p("AANBiQgFAAgEgGQgHgMgJgaIgGgTQgCgIAAgIIgCgXQgEgyAAgYQAAgJACgEQADgHAHAAQAFAAADAGIADAKIAJAjIALAiQADALgCAEQgBAEgEACQgEADgEgCIASA7QAFAOgBAFQgBAFgEAEQgEADgDAAIgCgBg");
	this.shape_157.setTransform(24.7841,29.4111);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#660100").s().p("AAUBMQgGgEgGgGIgIgJIgLgcIgKgdIgUg7IgCgJQAAgGAEgDQAGgEAHAHQAEADACAJIAUBAQAGARAIASIAFALQAFAHAFACIAIAEQAFACABADQACAEgDAEQgCAEgEABIgFABQgFAAgGgEg");
	this.shape_158.setTransform(27.4194,39.6905);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#660100").s().p("AgFASIgCgHIgEgGIgDgLIgCgIQAAgEADgDQACgEAEAAQAHAAADAIIAEANQACAFADAFIAEAIQABAEgDAEQgDADgEABIgCAAQgGAAgEgIg");
	this.shape_159.setTransform(28.3589,43.6352);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#660100").s().p("AAFAjQgCgCgDgSIgFAAIgRgpQABgGADgDQAEgEAGACQADACACADIADAEIACAIIACAFIAIAWIAFAHQAFAIAAAFQgBAGgDADQgCACgDAAQgEAAgEgDg");
	this.shape_160.setTransform(28,42.9053);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#660100").s().p("AASBcIgCgHQAAgFgBgCIgFgGIgCgMQgBgJgIgNIgOgVQgCgFgDgMQgIgcgCgQQgCgZgDgIQgCgLABgDQACgEAFgCQAEgBAEADQADACAEALQACAHAJANQADAIADAOIAGAXIAJAaQAGAQABAKIADAPIAJAdQACAOgJAEIgEABQgGAAgCgGg");
	this.shape_161.setTransform(27.0651,37.5266);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#660100").s().p("ACKBlIgvgUQgLgEgMgHIgpgWIgrgYQgfgQgMgIQgIgFgMgMIgUgRIgdgVQgRgNgHgNQgDgHAAgFQAAgIAHgBQAGgBAIALQAQAZAaAMQABgFAFgCQAFgBAFABQAFACALAIQAMAJAXAHIAjAOIAgAUIAkAaQAVAOACANIACAKQADAGALAEIAWAIQALAEADAEQADADAAAFQAAAFgEACQgCABgDAAQgEAAgFgCgAgOgHQAEAEAEACIAEABIAGAEIgKgJIgCgDIgBgBg");
	this.shape_162.setTransform(45.0714,55.4974);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#660100").s().p("AhZBQQgogDhbgQQgUgEgKgEQgKgEgOgIQgmgYgSgRQgGgFAAgEQAAgEADgDQADgCAEgBQAEgBAKAEIA0AQQAdAIAYACQAQABAFACIAJAEIAMABIBbgDQAIgBAGACIAIAEIAIABQAMABAIgDIAJgFQAFgCAEABQAGACAAAJQAAAEgEAKQgHAOgGAIQAOAAATgIIAhgOQAKgDATgCIAdgEQAQgEANgFIAdgKQAdgKAOgGQAMgFAegQIA2gfQAIgFACgEIACgJQACgEAGAAQAGgBADAEQAGAIgFALQgEAGgKAHQgOALgoAVIguAYQgVAKgmAMQgrAOgQAHIgXAJQgNAFgLACIgOAAIgOABIgdAJQgHABgWAAg");
	this.shape_163.setTransform(87.551,61.6722);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#660100").s().p("AhbAlQgDAAgCgDQgDgDABgDQAAgGALgIQANgKATgaIAHgGQAFgCAEAEQADADABAGIASgFQAHgDAEACQAIAEgDANQA2gSAXgJQAJgEAEABQAJAAABAHQACAFgGAFIgKAFIhrAjQgJADgGgBQgEgBgCgCQgDgEAAgDQgOAHgPALQgJAGgFAAIgCAAg");
	this.shape_164.setTransform(87.6869,62.6344);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#660100").s().p("Ah0BWQAAgFAIgHQARgOAJgGQAHgEAPgHQAUgJAGgEQAJgFAGgHIAPgQIAIgJIAEgJQACgDAJgIQADgDALgQQAGgIARgQIAVgTQAFgGAFABQAEAAACAEQADADgBAEQgCAHgIAGIADAUQAHgJAJAAQAFAAAEADQAEAEgBAEQAAAGgLAGQgQAKgKAQQgGALgEAEIgNAIIgMAKIgXALIgLAGQgHAEgEACQgLABgGACIgZAOIgOAHQgQAFgHAFIgMAKQgHAFgHAAQgKgBAAgIg");
	this.shape_165.setTransform(121.5031,51.8729);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AoLh8QHxHfImm4");
	this.shape_166.setTransform(80.35,56.9608);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#660100").s().p("AgTA5QgFgCgCgEQgCgFACgEIAHgRQAHgNADgPQABgGABgCQAFgGAJABQACgLgBgKQAAgNAEgDQADgDAEAAQAFAAADAFQABADAAAHQAAAXgBAWIgDAZQAAAIgBADQgCADgFACQgEABgDgDQgDgCgCgFIgDgIIgIAUIgEAGQgDADgDAAIgCAAg");
	this.shape_167.setTransform(130.2875,45.55);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#660100").s().p("AgQA3QgDgDAAgHIABgGIADgHIABgHIAOhBQAAgIAAgEQADgGAIABQAHABACAGIgBAJIgNBCIgBAEIgBAGIgDAJQgBAHAAADQgDAEgFAAIgBAAQgEAAgDgDg");
	this.shape_168.setTransform(132.3833,44.2215);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#660100").s().p("AgNA4QgGgCgBgGIAAgHQADgQAEgLIADgGQAEgJADgYIACgMIABgFIADgIQACgEAFgBQAFAAADAEQAEAEgBAGIgDALQgDAIgCAPIgIAeIgFAWIgEAIQgDADgEAAIgCAAg");
	this.shape_169.setTransform(131.7528,44.535);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#660100").s().p("AgOA6QgCgEACgEQABgFAEgCIADgaQADgfAAggQAAgKADgDQAFgHAHAGQAFAFgBAKQAAAXgCAWQgBAbgEAYQgBAGgCACQgBADgFABIgEABQgGAAgEgGg");
	this.shape_170.setTransform(133.3762,34.8451);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#660100").s().p("AgLAmIgBgFIAAgGIABgHIACgXIACgHIAAgLIACgNQABgGAFgCQAGgCADAFQAEAEAAAKIgBAOIgBAJIgCADIgCAaIgCAHIgBAFQgDAFgFAAQgFgBgDgFg");
	this.shape_171.setTransform(133,37.1964);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#660100").s().p("AgSA7QgCgDAAgGIABhbQAAgGADgFIACgGQACgEAFgBQAFgBACACQAFADABAJIAAAOQAAAIACAFQAFgBAEADQADADABAFQAAACgCAIIgGAYQgBAJgCADQgCAHgHABIgBAAIAAACIAAAGQAAAIgBACQgDAFgGAAQgFAAgDgFg");
	this.shape_172.setTransform(131.5792,38.1179);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#660100").s().p("AgEBiQgFgBgCgGQgCgDABgIIABgXIAEgaQABgNAAgaIAAgsIgEgWQgCgKABgFQADgJAIABQAGACACALQAGAagBA2IgBAcIgDAbQgCARABALQAAAMgDADQgDAEgEAAIgCAAg");
	this.shape_173.setTransform(133.4871,27.9239);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#660100").s().p("AAAAoQgFgDgBgDQgCgEAAgFIgFg3QAAgGAGgDQAFgDAEADQAEAEABAKIAEAtIAAAFIACAGQABADgEAFIgFADIgBAAIgEgCg");
	this.shape_174.setTransform(133.0031,20.6358);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#660100").s().p("AgCB9QgIgCAAgOIAAgwQAAgfgBgJIgDgVIgDgbIgCgYQAAgIACgDQAGgGAJAEIgEgWIgFgWQgBgIADgEQACgDAEgBQADgBAEACQAEADABAGIABAMIAFAWIACASQACAYAABBQAAAXgCALIgDAVQgDAMgBAIQAAAMgCAEQgDAHgFAAIgCAAg");
	this.shape_175.setTransform(132.1,24.0094);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#660100").s().p("AAABSQgEAAgEgGIgCgKIgBgWIAAgWQAAgagHgcQgCgKABgDQACgGAHgBIACAAIABgDIAEgMQAEgJADgCQAFgEAFADQAGABAAAHQAAADgDAGQgFAKgBAKIgCAHIAAALQgBARACAaIABAsIgCAMQgDAHgFAAIgBAAg");
	this.shape_176.setTransform(131.0083,21.0996);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#660100").s().p("AAAAWIgDgHQgDgHgJgOQgCgGABgEQABgFAEgDQAGgDAGAGQADADAGAMIAFAMIACAKQgBAHgGACIgEABQgEAAgCgEg");
	this.shape_177.setTransform(125.52,-8.2139);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#660100").s().p("AgEAaIgEgMIgEgZQAAgLAEgFQAGgEAEABQAGACABAGIAAAJQgCAIADAIQADAKAAAGQAAAKgIACIgBAAQgEAAgEgFg");
	this.shape_178.setTransform(125.2,-7.6417);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#660100").s().p("AANA5QgGgBgCgGIgBgKIgLgwIgMgYIgFgLQgBgHAEgEQADgCAEAAQAEAAADACIACAEIACAFIAJAUQAJAVABAFIABAHIAEALIAAAHIACAGQACAGAAAHQAAAFgDACQgDAFgEAAIgCAAg");
	this.shape_179.setTransform(129.515,3.5577);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#660100").s().p("AAGBMIgFgKIgMgtIgDgMIgGgdQgCgHABgEQABgGAEgCIgFgVIgEgHQgBgEACgEQADgEAEgBQAHAAAEAGQADAEADAIIAZBLQABAHABAPIgBAdIgDAKQgDAGgFAAIgBABQgEAAgEgFg");
	this.shape_180.setTransform(130.1,8.7505);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#660100").s().p("AAVBiQgHgEgBgJQgDADgFAAQgFAAgCgEQgDgDAAgIIgEg5QgBgPgCgGIgGgWIgDgXQgCgHgJgWQgCgIABgDQACgFAMgDQAJgBADACQAEACADAJQAZA8AEBBQACAjACAIQACAJgBADQgCAEgEABIgCAAIgFgBg");
	this.shape_181.setTransform(127.0274,1.525);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#660100").s().p("AAXBRQgEgDgBgIIAAgMIgCgMQgEgUABgaQAAgGgCgBIgEgBQgDAAgEgFIgOgVQgJgNgIgGQgFgEgBgDQgBgEACgEQACgDAEgCQAHgCAHAEQAAgFAFgCIAIgDQAGgBADABQAEABAEAIQARApABAcQAAAaADAOIACAMIABAPQABAKgCADQgCAEgEABIgDABQgDAAgCgCg");
	this.shape_182.setTransform(123.0129,-8.5857);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#660100").s().p("AASFwQgXgNgSgXQgagggUhDQgOgtgKgpQgLgtgHgwIgEgkIgGgjIgLgnIgKgnQgLg1AFg+QAEhMAegrQATgbAdgOQAfgOAeAIQAhAKASAjQASAigKAjQgDAKgIASQgIASgCAKQgIAcAIAnQAFAWANAsQAIAeAHAxQAJA8AEATIAOA9QAMAuAKASIAQAZQAKAPAEAKQAIATgCAVQgCAWgLARQgLARgSALQgTALgUACIgHAAQgXAAgWgMg");
	this.shape_183.setTransform(34.3942,14.592);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#660100").s().p("AjsFqQgWhYAGgrQAHguAegXQAbgUAlAFQAkAFAVAaQAJALADABQAIAEAPgFQATgGAtggQAngbAbgEQAFhPgBgoQAAhEgRgvQgEgMgQgkQgNgegFgTQgEgNgCgYIgFgmIgIgmQgDgWACgQQAFgfAegUQAdgUAhAFQAgAEAZAZQAYAYAIAgQAFAWAEAtQAEAcAPAnIAVA2QALAfAEAZQAFAbAAAmIgCBAIAABDQAAAogFAbQgHAkgVADQgVAEgSAXIglAuQgSAXgDAFQgDAFhDAoQhBAng5AHQg5AHgsAXQgJAFgJAAQgfAAgRhEg");
	this.shape_184.setTransform(106.3949,26.0473);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#660100").s().p("AhNGgIhcgYIg0gPQgdgJgTgMQgugbgfg5QgOgfgJgOQgPgZgRgLQgIgEgSgIQgRgGgIgGQgXgRgHglQgEgRgCgxQgBgxgWhqQgVhlAAg3QAAhIAigfQAZgYAygFQA6gFAnAWQAkATAYAsQAQAdASA4QAaAIAUASQAUATAKAYIAIARQAFAKAHADQAFADAJAAIAOgBQAjgBAfAXQAeAXAHAjQAIgtAMgaQASglAdgQQAlgTArAUQApAUARApQAWgYAigHQAhgHAeAMIgXiSQgIgzAHgYQAGgVAQgQQAPgQAUgGQAVgHAVAEQAWADASANQAeAWAMAwQAGAZAFA+QAEA/APA/IAMA2QAIAgADAWQAEAdAABGQAAA1gHAZQgOAtguAsQgYAXgjAZQgWAPgpAaQgdASgPAIQgZANgWAEQgSAEggAAQglAAgNABQgYADgtANQguAOgXADQgNABgNAAQgeAAgkgHg");
	this.shape_185.setTransform(74.25,22.0669);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("Ag0g7QAhAzBIBE");
	this.shape_186.setTransform(42.5,66.725);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#660100").s().p("AALAgQgOgGgKgOIgDgFIgEgDQgJgFgIgIIgDgFQgDgEABgGQAAgFAEgEQADgDAGgBQAGAAAEADIAHAHIAMAKQAHAFADAGIADAFQADACAEABIAHAEQAKAEADAEQAGAGgEAJQgEAIgGABIgCAAQgGAAgNgGg");
	this.shape_187.setTransform(54.3853,76.7422);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#660100").s().p("AAVAmQgJgBgKgKIgFgGQgHgDgCgDIgCgEIgDgDQgGgFgFgFIgMgMQgEgIADgHQAEgIAJgBQAIAAAGAGIAKAMIAPAPIAJAFIACACIAEAAQAIgBAFAHQAEAEAAAJQAAAFgDAFQgEAIgJAAIgGgBg");
	this.shape_188.setTransform(56.0107,77.1333);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#660100").s().p("AgRAuQgEgDgBgJIAAgMQAAgNABgGQAAgFACgGIADgIIABgHIABgFIACgLQADgKAJgBQAKgBAEAKIACAGQAAAGgBAJIgCAHIAAAHQgBAEgCACQAGAAAEAFQADAEAAAGQgBAGgHAJIgFAHQgJAMgGABIgDABQgFAAgEgFg");
	this.shape_189.setTransform(124.3198,66.2615);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#660100").s().p("AgkBWQgFgCgDgEQgFgKAGgJIAIgLIAEgFQACgEADgBIAJgEQAFgCACgGIAXgqQAFgJgBgEIgCgJIgBgMQgBgDgEgHQgDgHgBgEQgBgJAIgFQAHgFAIAFQAFADAFAIIAFAOIAEAPIACAQQAAAOgNAYQgTAkgPANIgOAMIgGAIQgEAFgEABIgFABIgEgBg");
	this.shape_190.setTransform(125.5435,62.6434);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#660100").s().p("AgyBeQgLgFgHgKQgIgLgBgMQgBgMAFgLQAFgMAKgHIAIgGQAEgEACgGQARglAOgXQAKgSAIgHQALgJAPgBQAPAAAMAHQALAIAGAOQAFAOgDANQgDAKgGAJIgfA7QgIATgEAHQgOAVgSAIQgLAGgMAAQgKAAgKgEg");
	this.shape_191.setTransform(119.9097,67.6811);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#660100").s().p("AAJBoQgcgFgLgZIgIgPIgKgKQgagTgPgHQgXgLgLgHQgUgMgLgWQgKgUADgSQACgMAJgKQAJgKAMgDQANgDAMAEQANAEAIAKIALAQQAEAEAIAEQAzAcAqAjQAHgCAFgJIAIgPQAHgPANgPQAVgZAVgDQALgBAKAEQAKAEAHAJQAPASgHAXQgDALgLAPIgSAYIgNAXQgGAJgUARQgXASgHAEQgUALgTAAIgMgBg");
	this.shape_192.setTransform(107.4923,72.8947);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#660100").s().p("AhNB4QgjgDgUgcQgPgVADgbQADgbATgQIAVgRQAIgIAOgRQATgUAcgBQAQAAAEgBQAEgCAIgJQAkgjAagGQASgEATAHQATAGAMAPQAMAPADATQADAUgIASQgHAQgSAPIggAcIgSASQgLAKgKAFIgRAGIgSAHIgMAKIgNAKQgZARgcAAIgIAAg");
	this.shape_193.setTransform(105.3384,76.6184);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#660100").s().p("AiXB+QgjgFgVgYQgYgZAEgiQADgQAJgNQALgNAOgGQgMgVAEgaQAFgbATgPQATgQAbABQAbABASARQAIAHAPARIAYATQAPALAFALQAWgPAdgIQARgFAFgCQALgGATgVQAhgiAggEQARgCASAHQARAHALAPQAKAOADASQACATgHAQQgIAUgaAXIgqAlQgbAXgUAGQgWADgKAEQgGACgKAGIgQAIQgIADgLADIgTAEQgaALgNADQgJACgiAAIghACIgIAAQgPAAgLgCg");
	this.shape_194.setTransform(94.92,78.7339);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#660100").s().p("ABpDPQgVAAgVgNQgSgMgOgTQgIgNgEgEIgSgLQgQgKgRgSQgKgLgSgYIhHhgQgUgbgJgRQgKgWgDgWQgFggAMgYQAJgSATgLQASgKAUABQAUABASANQARANAHATIAJAfQAEAKALAPIA/BYQAPAUALAIQAIAGATAKQAYAPAcArQAPAWADALQAFAQgDAQQgDARgKANQgKAMgPAIQgOAGgPAAIgCAAg");
	this.shape_195.setTransform(46.2077,57.9923);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#660100").s().p("ABSDKIgpgNQgPgFgdgOQghgPgOgMQgSgPgTgfIghgzQgRgVgHgLQgPgVgNgtIgMglQgMgoADgVQACgTANgPQAMgQASgHQASgGAUAEQATAEAOANQAQAQAKAhIAQA4QAGAOAOAVIAVAiIAKASQAHALAFAHQATAVA6ATQA4ASASAXQAMAPADAUQACAUgHARQgIARgQAMQgRALgSABIgCAAQgRAAgdgKg");
	this.shape_196.setTransform(63.2097,68.2841);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#660100").s().p("AjfD1QgOgHgJgNQgKgMgDgPQgHggAVgZQATgWAogHQAMgCAVgBIAhgCQAugFArgVQApgVAfgiQAYgaAgg1QAQgbAEgRQAEgQgCgsQgBgmAJgUQAJgRARgKQARgLATAAQAUABARAKQARALAJARQAKAVAAAsQgBA6gIAjQgNAzgwBFQg2BOgzAlQgvAihCATQg2APhIAGIgXABQgfAAgRgJg");
	this.shape_197.setTransform(106.9982,59.325);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#660100").s().p("ABkDsIgigNQgVgIgNgEIgggHQgUgFgMgGQgRgKgRgWIgcgnQgUgZg1gtQgzgqgUgcIgWggQgNgUgMgKQgHgGgSgLQgRgKgIgGQgQgOgIgUQgIgUADgUQAEgVAPgPQAPgRAUgDQAfgFAwAfQApAbAVAZQAKALARAbQARAaAKAMQAPARAxAlQAqAfAPAZIAOAWQAJANAJAGQAIAFANAEIAXAFQAJADAaAMQAVAKAOABQATADARgJQASgJAJgRQgGgOABgRQAAgQAIgOQAIgNAOgJQAOgJAQgCQAbgEAaASQAYARALAcQAPAngOAnQgLAdghAgQgnAmghAPQggAQgmACIgLAAQggAAgegJg");
	this.shape_198.setTransform(70.6597,62.8807);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#660100").s().p("AiFCqQgYgFgTgQQgUgRgEgXQglAGgWgBQghgDgTgRQgOgOgGgWQgFgUADgWQAEgbAQgYQARgYAYgOQAZgNAdgBQAdAAAZANQARAJAGABQAKACAUgHQBSgaBVABIAVAAQAMgBAIgFQAIgFAIgOIAPgUQALgLAUgFQAMgEAYgEIAbgGQAPgEALAAQAcAAAXATQAWARAJAbQAJAagFAdQgFAbgPAYQgIAMgNAOIgYAaIgVAWQgNAMgMAEQgcAJgngUQhNA9h1AcQgkAKgcAAQgRAAgOgEg");
	this.shape_199.setTransform(89.6966,63.9688);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AiHimQBoDRCnB8");
	this.shape_200.setTransform(41.325,62.1);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ABLiXQgICtiNCC");
	this.shape_201.setTransform(125.175,63.575);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("Ak5g9QEhD5FSj6");
	this.shape_202.setTransform(86.275,85.0164);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#660100").s().p("AgmBjQgMgHgPgVQgNgSgDgMQgCgFgBgLIgEgQIgLgWQgGgQACgQQACgRAIgOQAJgOAPgIQAOgJAQgBQAQgBAQAGQAPAHAKAMQAEAGAEACIAOACQASAAAPAKQAPAKAIAQQAQAfgOAjQgEAOgKAKQgGAHgOANIgVAXQgPANgaABIgFAAQgTAAgQgKg");
	this.shape_203.setTransform(-121.3311,52.6023);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#660100").s().p("AgbBPQgdgPgIgfQgCgFgCgTIgCgaQABghAbgUQAbgUAgAIQAPADAMALQAMAKAHAOQAJATgBAgQAAAQgDALQgDAOgLAMQgKAMgNAHQgPAHgPAAQgNAAgPgHg");
	this.shape_204.setTransform(-108.67,73.8732);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#660100").s().p("AALCnQgmgEgigYQgNgKgTgRQgXgWgKgOQgRgVgDgWQgCgWALgTQALgVAUgJQAVgKAXAFQAXAFAOAQQAVgjAKgrQAFgUAFgKQAIgRASgKQARgLAUABQATAAARAMQARALAIASQAKAVgEAcQgCAQgMAfQgLAagJATQgMAXgCAMQgBAFABAJIAAAPQACAZgJAVQgKAZgUALQgOAHgUAAIgQgBg");
	this.shape_205.setTransform(-100.1775,71.6192);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#660100").s().p("AhbCQQgmgDg5gVQgigOgNgQQgQgWAGgeQAEgSAKgOQAMgOAQgGQAXgIAiAJQAkANATACQAcAEApgHQA7gNA7gcQgHgSADgVQADgUAMgQQAMgPATgHQAUgHATAFQAfAIATAjQAMAaAEAoQAEAngMAVQgLAUgeARQgWANgpATQgcAOgUAGQgUAHgoAIQg+ANgoAAIgOgBg");
	this.shape_206.setTransform(-78.1552,76.2452);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#660100").s().p("AknDpQgOgLgHgQQgIgRACgSQADgRAKgPQALgOAPgIQAMgGARgCIAfgDQAjgEAxgMQAkgJAUgIQAQgHAfgSQAigUAPgMQAbgUAcghQAlgrAagpQAPgYAEgSQAFgYAEgLQANggAngMQAJgDAMgBIgMAAQATgCAQABQAZABAOAJQAUAMAHAZQAGAYgJAXIgPAZIgvBIQgSAcgTAaIgsA3QgmAsgPANQgZAXg5AiQgqAagcAMQgeAMg5ANQhEAPgeADIgUABQgnAAgVgQg");
	this.shape_207.setTransform(-58.0761,62.2358);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#660100").s().p("AiVCnQgugEhAgoQghgVgMgNQgVgVgFgbQgCgQAGgRQAFgPANgMQAMgLARgFQARgEARAFQAPADAcATIAeAUQATAOAOADQAPADAdgKQBCgVAdgOQA2gaBAg0QAcgXAQgIQAbgJAMgGQAYgQANgFQAQgGASACQARACAOAKQAOAKAHAQQAIAQgBARQgBAXgQAVQgPASgWAMQgPAIggANQgQAHgUAQIgiAbQhDAzh7AsQgkANgXAFQgYAFgVAAIgPgBg");
	this.shape_208.setTransform(-76.0812,73.4982);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#660100").s().p("ABuDDQhcgMgqgOQhMgZg/g3QgfgbgOgaQgIgOgNgdQgFgKgMgRIgSgbQgZguAOgnQAIgUASgOQARgNAVgDQAVgDAVAHQAVAHAPAPIAPAQIAYAOQAQAJAgAaQAbAYAJAKIAPAUQAJALAIAHQAHAFAdASQAmAVAgAhQAFgiAPgWQASgcAdgIQARgEAQAEQARAEAMALQANALAGAQQAHAPgDAQQgBAKgFAOIgJAXIgLAjQgHAUgJAMQgHAKgbAVQgZAUgOAEQgMAEgPAAIgcgDg");
	this.shape_209.setTransform(-101.3781,67.3571);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ABgiEQgLBSi0C3");
	this.shape_210.setTransform(-37.45,60.8);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AgtheQAcBmA/BX");
	this.shape_211.setTransform(-124.575,64.55);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AlshSQFDFLGWlL");
	this.shape_212.setTransform(-83.5,82.4017);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).to({state:[{t:this.shape_81},{t:this.shape_119},{t:this.shape_79},{t:this.shape_78},{t:this.shape_118},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82}]},3).to({state:[{t:this.shape_81},{t:this.shape_119},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120}]},3).to({state:[{t:this.shape_81},{t:this.shape_119},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186}]},3).to({state:[{t:this.shape_81},{t:this.shape_119},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_212}]},3).to({state:[{t:this.shape_81},{t:this.shape_119},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82}]},3).to({state:[{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_118},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).to({state:[]},3).wait(3));

	// Capa_1
	this.instance = new lib.eyebrows();
	this.instance.setTransform(6.9,-76.95,1,1,0,0,0,0.5,0);

	this.instance_1 = new lib.tlakingshoko2eyes();
	this.instance_1.setTransform(97.5,35.5,1,1,14.9992,0,0,62.8,38.9);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#D1D3D4").s().p("AitKtQh6gchwhVQBdAvBeAKQBiAKBagfQDahKBUkCQBVkChkkiQgwiHhJhtQhLhuhdhHQB+BBBmB/QBmCAA6CoQBkEhhTEEQgoB7hNBXQhQBZhrAlQhBAWhDAAQg1AAg3gNg");
	this.shape_213.setTransform(93.8498,20.9772);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#323031").s().p("AklJnQi9iihXkBQhrk2BckWQAriEBThcQBVhfB0goQBKgZBPAAQDRAAC9CiQC8CjBYEBQBrE2hcEVQgrCEhTBcQhVBfh0AoQhKAZhPAAQjRAAi9iigAjyrDQhrAkhOBaQhMBWgoB7QhTEFBkEkQBUDzCwCZQCxCaDCAAQBGAABEgXQDahKBTkFQBTkFhkkkQhTjzixiZQiwiajDAAQhIAAhCAXg");
	this.shape_214.setTransform(76.525,17.625);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AjSKIQjqifhnkuQhoktBXkNQAph/BQhZQBShdBwgmQBvgmB6AWQB0AWBvBLQDqCeBnEvQBoEthXENQgpB/hQBaQhSBchwAmQhKAahMAAQiZAAidhrg");
	this.shape_215.setTransform(76.525,17.7076);

	this.instance_2 = new lib.tlakingshoko2eyes();
	this.instance_2.setTransform(-65.1,30.3,1,1,14.9992,0,0,62.6,38.7);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#D1D3D4").s().p("AhDKlQhsglhPhZQhMhWgoh7QhTkDBkkiQA6inBqiDQBoiBB/hBQheBIhNBwQhPBwguCGQhkEhBUECQBVECDaBLQBaAfBigKQBegKBegwQhyBVh5AcQg2ANg0AAQhFAAhCgXg");
	this.shape_216.setTransform(-92.7498,20.7184);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#323031").s().p("AkBLwQhzgohVhdQhVhdgsiIQgriFAEiXQAEiXA0iVQBYkBC8ijQC9iiDRAAQBPAABKAZQBzAoBVBdQBVBdAsCIQArCFgECYQgECWg0CWQhYEBi8CiQi9CijRAAQhOAAhLgZgAkKpAQiwCZhUDzQgxCPgECPQgECQApB+QApB9BNBWQBOBWBoAjQBEAXBGAAQDDAACwiZQCwiaBUjzQAxiPAEiPQAEiQgph+Qgph9hNhVQhOhWhogkQhCgXhIAAQjCAAixCag");
	this.shape_217.setTransform(-75.275,17.625);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("Aj5LaQhwgmhShcQhQhagph/QhXkNBoktQBnkuDqifQBvhLB0gWQB6gWBvAmQBwAmBSBdQBQBZApB/QBXENhnEtQhoEvjqCeQhvBLh0AWQgtAIgsAAQhKAAhGgYg");
	this.shape_218.setTransform(-75.2698,17.6284);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.instance_2},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.instance_1},{t:this.instance}]}).wait(27));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137.9,-104.4,289.70000000000005,199.8);


(lib.shoko2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250000").s().p("AKQD2QgqgFgrgcQgvgigbgQQgugbg1gDQgtgChEAWQhXAcgRADQg4AKgngaQgwgggmhdQgkBdgwAgQgoAag4gKQgRgDhXgcQhEgWguACQg0ADguAbIhKAyQgrAcgqAFQg4AHhOgcQiPgzgth7QgXg9AFgzQANAHAVAmQAdA2AMASQBBBdBmgZQA2gNAlg6IA6h1QAmhNAugnQBBg3BngJQCVgNBkAzQBDAiAkA5QAlg5BDgiQBkgzCVANQBnAJBBA3QAuAnAmBNIA6B1QAkA6A3ANQBmAZBBhdQAMgSAdg2QAUgmANgHQAGAzgXA9QgtB7iPAzQg/AXgxAAIgWgCg");
	this.shape.setTransform(10.5297,-34.1085,0.4982,0.4982);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// OBJECTS
	this.instance = new lib.shoko2shoes();
	this.instance.setTransform(-4.8,189.3,0.7176,0.7176,0,0,0,29.2,48.3);

	this.instance_1 = new lib.talkingmouth("synched",0);
	this.instance_1.setTransform(10.3,-26.1,0.1878,0.1878,0,0,0,-423.8,181.3);

	this.instance_2 = new lib.shoko2eyes();
	this.instance_2.setTransform(13.85,-81.35,0.3408,0.3408,0,0,0,7.2,-4.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E6E6E6").s().p("AI2HpIgzgdQgggRgUgGIhlghQhSgbgWgEQgTgFgkgbIhHg2QgegUiKgrIgYhNQgQgvhIg2QhLgvgIgIQgPgNgKAIQgNAKgGAqIgGAoIgFAUQgEAQALATQgxgTgsgVQAOgXAegWQARgNABgWQgEgbACgTQACgagOgiQgMgcgPgSQgMgPgWgDQgWgEgJALQgHAJgHgGQgEgDgFgJQgCgFgVADQgcAEgIgBQgQgBgEgCQgFgDgGgJQgHgIgBADIgMARQgNARgGBGQgHhEgIgKQgGgFAIggQAIgmAAgHQADgXAAgMQAAgWgRgLQgNgIAAgTQAAgUgLgJQgRgNgHgMQgGgIgTgrQgQghgCgqQAFgJACAPQACATBABPIBPBhQAMATgIAdIgNA1QgDAYBEgDQAlgBA1gFQAWABAPAQQASARAXAvQAVArAHAFQAHAEAjANQAgAPAoAlQAUATANAQQApAgAcACQAdACAcAhQBJBXAUATQA3A5BJAaQBeAiAgAWQA3AkBVAdQBcAgAUALIAuAbQAVAMAPALQhQgHgigRg");
	this.shape_1.setTransform(7.45,-27.8321);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AJBHqIg0gdQgfgRgUgGIhmghQhSgbgVgEQgTgFgkgbIhHg2QgegUiFgpQiQgugegPQhfgng/gcQh1g1g1g0IhhheQghgigGgVQgIgcAIgjIABgGIgRhCQgRhBACgtQAEg1ALgmQALglADAaQACATBABPIBOBhQAMATgHAdIgNA1QgDAYBEgDQAkgBA2gFQAWABAPAQQASARAXAvQAUArAIAFQAHAEAjANQAgAPAoAlQAUATANAQQApAgAcACQAdACAbAhQBKBXATATQA4A5BJAaQBdAiAhAWQA2AkBWAdQBcAgAUALIAuAbQAVAMAOALQhPgHgigRg");
	this.shape_2.setTransform(6.384,-27.9073);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#17431F").s().p("AGjEkQgWgMgigDQgagDg4ABQgtABgYgGIhDgVQglgLg0ACQgrACgDgEQgHgHhEgdQhGgdgegIQgbgHg6AGQgyAFgQAGQgHADgBgGQAAgTgIgUQgJgagTgZIgRgVQgFgJgHgGQgVgTgbgUQgkgagYgLQgWgJghADQgRACgMAEQARgWAYgYQAvgvAlgKQAmgKAignQAdghABgRQAAgEgLgnQgNgtgEgfQA1AuBtBVIgBAGQgDASAmADQCZB4CvCGIG4EjQiDgrgggRg");
	this.shape_3.setTransform(-23.925,-27.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#17431F").s().p("Aq4AVIAIh6IVoBSIgHB6g");
	this.shape_4.setTransform(0.1,120.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FAC7C7").s().p("AC1K4IA/wdIAnANIg+QTgAAPKgIACgvQACgTgNAAQgGgBgDAEQgDAFgBALIgDAqIg3gEIADgxQAAgKgDgEQgCgEgHAAQgJAAgCADQgDAFgBAMIgCAzIhIgFIAEg6QACgpAVgVQAWgVAkACIBhAGQAkACATAWQATAWgDAmIgEBAgAkaKdIBR1XQARAKAWASIhQU9gAAYH7IAEg5IiygKIAFhLICxAKIADg5IBIAFIgLC8gAAUEnIiggKIAEhKICcAJQANABAHgDQAGgDAAgJQABgSgZgCIgegBIgBAVIhDgEIACgVIg8gEIAEhKICfAJQAtADAYAbQAZAbgDAuQgCArgZAVQgVAQgnAAIgNAAgAiABTIABgUQACgoAZgWQAagUAqACICfAKIgEBJIiUgJQgRgBgGAGQgGAFgBARIgBADgAAEgsQg2gEgkgoQgkgpADg3QADg2ApglQApgkA2ADQA2AEAkApQAkApgEA4QgDA1gpAkQgmAhgwAAIgIAAgAgajaQgRAPgCAYQgBAXAQAQQAPARAXACQAYACARgPQASgPACgYQABgXgQgRQgRgRgWgBIgDgBQgVAAgRAOgAAqmXQApgLACgmIAAgKIAYAXQASAUAXARQgLAbgXAUQgaAXgwAJgAhKl3QgfglADg3QAEg4AngjQAQgOATgJQAQAFAPASIAnAvQgJgDgGAAQgZgBgQAOQgRAOgBAXQgBAYANAPQANAQAaADIgHBOQg7gLgfgkg");
	this.shape_5.setTransform(5.725,38.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0A783D").s().p("AqNOLIBM0HQABgYgTgRQgUgTgbgUQglgbgYgKQgWgKghAEQgQACgMADQAQgVAYgYQAvgwAlgJQAmgLAjgnQAcghABgQIgRhCQgRhCACgsQAEg1ALgmQALgmADAaQACAUBABPIBPBhQAMATgIAcIgNA2QgDAXBEgCQAlgCA1gFQAWABAPAQQASASAXAvQAVAqAHAFQAHAFAjAMQAgAQAoAmQAUATANAPQAoAhAcACQAdABAcAhQBKBXATAUQA4A4BJAbQBdAiAiAWQA1AkBWAdQBcAfAUAMIAuAZQAWANAOALIg5O2g");
	this.shape_6.setTransform(-3.35,19.6177);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBbQggArgDArg");
	this.shape_7.setTransform(42.2625,38.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_8.setTransform(27.775,46.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_9.setTransform(44.25,67.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#633321").s().p("AgYC2IAVlvIAcgdIgZGtg");
	this.shape_10.setTransform(63.275,48.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_11.setTransform(46.8,27.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AWIgaGtg");
	this.shape_12.setTransform(45.525,47.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CE714F").s().p("Ah2hiID5APQieAFhDBaQggAsgEArg");
	this.shape_13.setTransform(1.6875,35.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_14.setTransform(-12.8,44.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#81412A").s().p("Ai9ACIAhgZIFBATIAZAcg");
	this.shape_15.setTransform(3.65,65.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#633321").s().p("AgYC3IAWlwIAbgdIgZGsg");
	this.shape_16.setTransform(22.65,46.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_17.setTransform(6.2,25.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_18.setTransform(4.925,45.15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CE714F").s().p("Ah3hhID6APQieAFhEBbQgfAqgEAqg");
	this.shape_19.setTransform(-38.725,33.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#8C462D").s().p("AAAjWIAaAgIgTFyIggAbg");
	this.shape_20.setTransform(-53.25,41.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#81412A").s().p("Ai9ACIAggZIFCASIAZAdg");
	this.shape_21.setTransform(-36.8,62.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#633321").s().p("AgYC3IAVlwIAcgcIgZGrg");
	this.shape_22.setTransform(-17.75,43.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_23.setTransform(-34.225,22.725);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_24.setTransform(-35.5,42.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_25.setTransform(45.0125,-8.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8C462D").s().p("AAAjVIAZAfIgSFyIgfAbg");
	this.shape_26.setTransform(30.5,0.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_27.setTransform(46.975,21.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#633321").s().p("AgZC2IAXlvIAcgdIgaGtg");
	this.shape_28.setTransform(66,2.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_29.setTransform(49.525,-18.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#9C4F33").s().p("AjKDLIAZmsIF8AXIgZGsg");
	this.shape_30.setTransform(48.25,1.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CE714F").s().p("Ah2hhID5AOQieAEhDBbQggAsgEArg");
	this.shape_31.setTransform(4.4375,-10.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8C462D").s().p("AAAjWIAaAhIgTFxIggAbg");
	this.shape_32.setTransform(-10.05,-2.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#81412A").s().p("Ai9ACIAhgaIFBAUIAZAdg");
	this.shape_33.setTransform(6.375,19.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#633321").s().p("AgZC2IAXlvIAcgdIgaGtg");
	this.shape_34.setTransform(25.4,0.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CE714F").s().p("AijAHIgaggIF7AXIgdAcg");
	this.shape_35.setTransform(8.95,-20.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AXIgaGsg");
	this.shape_36.setTransform(7.675,-0.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#CE714F").s().p("Ah3hhID6APQieAFhEBaQgfArgEAqg");
	this.shape_37.setTransform(-36.025,-12.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_38.setTransform(-50.525,-4.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_39.setTransform(-34.05,16.775);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#633321").s().p("AgYC3IAWlwIAbgdIgZGtg");
	this.shape_40.setTransform(-15.025,-2.225);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgcAcg");
	this.shape_41.setTransform(-31.5,-23.375);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AWIgaGtg");
	this.shape_42.setTransform(-32.775,-3.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#CE714F").s().p("Ah3hiID6AQQieAEhEBbQggArgDAqg");
	this.shape_43.setTransform(47.7625,-54.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#8C462D").s().p("AAAjVIAaAfIgTFyIggAag");
	this.shape_44.setTransform(33.25,-45.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_45.setTransform(49.725,-24.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#633321").s().p("AgYC3IAVlvIAcgdIgZGrg");
	this.shape_46.setTransform(68.75,-43.5);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_47.setTransform(52.275,-64.625);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_48.setTransform(51,-44.625);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#CE714F").s().p("Ah2hhID5APQieAEhDBcQggAqgEAqg");
	this.shape_49.setTransform(7.15,-56.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_50.setTransform(-7.325,-48.175);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_51.setTransform(9.125,-26.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#633321").s().p("AgYC2IAWlvIAbgcIgZGsg");
	this.shape_52.setTransform(28.125,-45.9);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_53.setTransform(11.675,-67.075);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#9C4F33").s().p("AjJDMIAZmtIF7AXIgaGsg");
	this.shape_54.setTransform(10.4,-47.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#CE714F").s().p("Ah3hiID6AQQieAEhEBbQggArgDAqg");
	this.shape_55.setTransform(-33.2875,-59);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_56.setTransform(-47.775,-50.575);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_57.setTransform(-31.3,-29.325);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#633321").s().p("AgYC3IAWlwIAbgdIgZGtg");
	this.shape_58.setTransform(-12.275,-48.325);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_59.setTransform(-28.75,-69.475);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_60.setTransform(-30.025,-49.45);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#CE714F").s().p("Ah2hjID5APQieAEhEBbQgVAdgJAiQgFAPgBALg");
	this.shape_61.setTransform(50.5,-100.4875);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_62.setTransform(36.025,-92.225);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#81412A").s().p("Ai9ACIAggaIFBAUIAaAdg");
	this.shape_63.setTransform(52.5,-70.975);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#633321").s().p("AgYC3IAVlwIAcgdIgZGtg");
	this.shape_64.setTransform(71.525,-89.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_65.setTransform(55.05,-111.125);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_66.setTransform(53.775,-91.1);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#CE714F").s().p("Ah2hhID5APQieAEhDBaQggAsgEArg");
	this.shape_67.setTransform(9.9375,-103.05);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIggAag");
	this.shape_68.setTransform(-4.55,-94.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#81412A").s().p("Ai9ACIAggaIFBATIAaAeg");
	this.shape_69.setTransform(11.9,-73.375);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#633321").s().p("AgZC2IAXlvIAcgdIgaGtg");
	this.shape_70.setTransform(30.9,-92.375);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_71.setTransform(14.45,-113.525);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AWIgaGtg");
	this.shape_72.setTransform(13.175,-93.5);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#CE714F").s().p("Ah3hiID6AQQieAEhEBbQggArgDAqg");
	this.shape_73.setTransform(-30.4875,-105.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#8C462D").s().p("AAAjVIAaAfIgTFyIgfAag");
	this.shape_74.setTransform(-45,-97.05);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_75.setTransform(-28.55,-75.8);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#633321").s().p("AgZC3IAXlvIAcgdIgaGrg");
	this.shape_76.setTransform(-9.5,-94.8);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_77.setTransform(-25.975,-115.925);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#9C4F33").s().p("AjKDLIAZmsIF8AXIgaGsg");
	this.shape_78.setTransform(-27.25,-95.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#633321").s().p("AhOOwIBv9kIAuguIh1fFg");
	this.shape_79.setTransform(75.2,-23.225);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#81412A").s().p("AqggQIAoguITxBKIAoAzg");
	this.shape_80.setTransform(3.975,69.975);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#8C462D").s().p("AAnviIAoAzIhvddIguA1g");
	this.shape_81.setTransform(-55.375,-31.275);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#CE714F").s().p("Ap4gLIgogzIVBBPIguAug");
	this.shape_82.setTransform(15.825,-124.475);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#9C4F33").s().p("ArbO7IB3/GIVABRIh2fFg");
	this.shape_83.setTransform(9.9,-27.25);

	this.instance_3 = new lib.shoko1hand();
	this.instance_3.setTransform(93.65,-43.05,0.4446,0.4446,-44.4244,0,0,175,-197.2);

	this.instance_4 = new lib.shoko1hand();
	this.instance_4.setTransform(-58.5,-53.05,0.4446,0.4446,0,52.688,-127.312,174.9,-196.9);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("rgba(156,79,51,0.996)").ss(10,1,1).p("ADtm4IAANOAjskOIAALH");
	this.shape_84.setTransform(-1.425,139.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_84},{t:this.instance_4},{t:this.instance_3},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko2, new cjs.Rectangle(-139.6,-130.8,295.2,348.1), null);


(lib.shoko1eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// blinking
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ACvDkIQfAAQhZi9iiiOQl4kAkZERQiBCPgSCrgAzNCoIP2AAQgsi3iXh4Qjviuk5CuQhLAsg8BIQhNBPg3Bsg");
	this.shape.setTransform(2.2,-32.7396);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#660100").s().p("ACvDkQASirCBiPQEZkRF4EAQCiCOBZC9gAzNCoQA3hsBNhPQA8hIBLgsQE5iuDvCuQCXB4AsC3g");
	this.shape_1.setTransform(2.2,-32.7396);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ACvgWQICPpIdvpQhZi9iiiPQl4j/kZEQQiBCQgSCrgAzNhSQHfOHIXuHQgsi4iXh3Qjvivk5CvQhLArg8BJQhNBQg3Brg");
	this.shape_2.setTransform(2.2,-7.6923);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660100").s().p("ACvgWQASirCBiQQEZkQF4D/QCiCPBZC9QkOH0kIAAQkIAAkBn0gAzNhSQA3hrBNhQQA8hJBLgrQE5ivDvCvQCXB3AsC4QkMHDj9AAQj+AAjvnDg");
	this.shape_3.setTransform(2.2,-7.6923);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ACvjRQLSZ/FN5/QhZi9iiiPQl4kAkZERQiBCQgSCrgAzNkNQDNdOMp9OQgsi4iXh3Qjvivk5CvQhLArg8BJQhNBQg3Brg");
	this.shape_4.setTransform(2.2,11.0194);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660100").s().p("AzNkNQA3hrBNhQQA8hJBLgrQE5ivDvCvQCXB3AsC4QmUOmj+AAQj9AAhnumgACvjRQASirCBiQQEZkRF4EAQCiCPBZC9QinM/kHAAQkIAAlps/g");
	this.shape_5.setTransform(2.2,11.0194);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660100").s().p("AAGANQgBgHgFgFIgDgBIgEgFQgCgCAAgHIACgCIAFAFIACACIACACIADAEQAFAHAAAJQgBABAAAAQAAABAAABQAAAAgBABQAAAAAAAAg");
	this.shape_6.setTransform(127.375,-3.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#660100").s().p("AAGAVIgBgJIgBgIIgBgLQAAgGgFgGIgEABQgEgGAEgFQAEAAAEAHQAEAHABAEIAAALIACAIQABAGgBAMQAAABgBABQAAABAAAAQAAABgBAAQAAAAAAAAQgCgDABgGg");
	this.shape_7.setTransform(133.2433,17.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#660100").s().p("AgoAgQABgDADgCIAGgDIAMgLIAGgEIABgCIABgBIACgCIAJgEIAKgIIAEgBQAEgCAEgGQAGgHACgFQADgFADgDIACgBQAAAAAAAAQABAAAAABQAAAAABABQAAAAAAABIgBAIIgEAFIgFAMQgDAEgFADQAAABAAABQAAAAAAABQgBAAAAAAQAAAAgBABIgBAAIgCgCIgFACQgFACgDADIgFAEIgHAEQgEAFgBABIgBACQgEABgEADIgHAGQgIAEgCADQgDgFABgCg");
	this.shape_8.setTransform(116.4357,77.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#660100").s().p("AgeAeIABgFQACgDADAAIAFgBQAAgBABAAQAAgBAAAAQABAAAAgBQABAAABAAIADgBIAAgCQABAAABAAQAAgBAAAAQABAAAAgBQAAgBAAAAIAFgCIACgBIABgDIADgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABgBAAgBIADgBIAEgFIACgDIABgDIAFgGIAEgGIAGgOIABABIABABIAAACQAAADAAADIgDAHQgDAHgEAFIgEAEIgBAEIgDACIgDAGIgFADQAAABAAAAQgBABAAAAQAAABgBAAQAAAAAAAAIgDABIgBADIgEABIgHAIIgEABIgCABIgBABIgIACQAAABAAAAQAAABAAAAQAAABAAAAQgBABgBAAQgBgCAAgFg");
	this.shape_9.setTransform(107.1,83.8167);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#660100").s().p("Ag0AkQgBgDADgEQABgCAFgCQAFgDAHgCIAHgCIAQgHIARgKIAQgLIAEgEIAHgDIADgDQAEgDAHgCQgDgEACgGQAAAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAABIABAAQADAEAAAKQgBAFgBABIgHADIgFAEIgFADIgDABIgEADIgEADIgKAFQAAADgEACIglATIgFAAIgOAHIgDABg");
	this.shape_10.setTransform(108.975,83.3857);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#660100").s().p("Ag3AoQAAgEACgCIADgCIAWgGIAQgKIAEgCIACgCIADgDIAFgDIATgLQAAgCAEgBIAIgFIATgOQABgCgBgFIgCgGQAAgFAEABIACAEIAAAPQAAAEgCADIgDADIgKAGIgEAEQgEAEgIADIgaARIgEACQAAADgFACQgFABAAADQgDAAgEADIgDACIgEACIgUAFQgBAAgBABQAAAAgBAAQAAABgBAAQAAABAAAAQgCAAAAgFg");
	this.shape_11.setTransform(109.275,82.6327);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#660100").s().p("AgnApIAAgCQAAgJABgDIADgFIABgDIACgDIAEgGQAEgEADADQAAgBAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABIAAADQADgBAFgFIAEgFIAGgBQAEgBAEgEIADgFIACgFQABgBAAAAQAAgBABAAQAAAAABgBQABAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAABgBIABgEIACgDIADgEIAJgJQACgBADACQABADAAACQgBAEgGAHIgEADIgCACIgFAHIgHAJQgEAFgEADIgCADQgIABgEAEIgCAEQgGACgBADIgBAFIgGADIgCACQgFAGgDABQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAABIgBACIAAAAIgCgBg");
	this.shape_12.setTransform(117.0063,77.4783);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#660100").s().p("AhTA/QACgEAFgBIAggQQARgHALgHIAtgeIARgRIAfgjIgGgFQgEgDAAgEQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAGAHAAIAFABQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAFgHAIIghAlQgIAJgJAGIgKAIIgUANQgPAKgNAIIgzAZIgGABQgCgEAEgEg");
	this.shape_13.setTransform(112.7285,79.3188);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#660100").s().p("AgCAFQAAgIACgEIAAgEIAAgCIABgBIACABIAAAIIgBAEIgBABIAAADIgBAKQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBAAQgBgDAAgHg");
	this.shape_14.setTransform(132.125,11.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#660100").s().p("AgEAJQAAgDADgDIACgBIgBgCIgCgDIgBgDIAAgIIABgBIABAAIABAEQAIAIgEAJIgBAEIgGAGg");
	this.shape_15.setTransform(132.076,11);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#660100").s().p("AAGAhIgBgFIgCgGQAAgKgBgEIgCgEIgDgWIAAgBIgDgEQgFgFAEgGQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIACgBQAAAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAIACAIIABABIACAGIAHArQABAEgBACIgBADIgCABg");
	this.shape_16.setTransform(132.3984,12.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#660100").s().p("AAEAVIAAgBIgBgCIAAAAIgBACIgBAAIgBAAIAAgCIgEAAIgBgBQABgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIAAgDIABAAIAAgCIAEAAIABgBIgBgCQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIAAAAIgCgEIAAgBIgBgFIgBgCIgBgCIAAAAIgBgDIAAgBIAAgBIAAgBIAAgBIABgDIABAAIABABIABAAIABADIABACIAAACIAAACIAAAAIABAFIAAAAQAAAAAAABQAAAAAAABQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAAAAAAAQABAAAAAAIAAACIABAAIAAAFIABAAIAAABIAAAAQACAGgCAGIAAAAIAAACIgBAAIgBAAg");
	this.shape_17.setTransform(128.5125,-1.7875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#660100").s().p("AAPA5IgIglIgFgOIgCgFIgCgGIgDgLIgDgIIgCgGIgIgVIgDgIQAAgEADgDQACAFADAJIAFAOIAEAHQAEAIADATIAEAGIAGAaQACAPAFALIACAHQAAAEgCACQgEgDgBgHg");
	this.shape_18.setTransform(130,3.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#660100").s().p("AANAXIgBgEQgDgCAAgDIAAgBIgBgBIgBgEIgBAAIgBgKIgBgBQgBgBAAAAQAAAAAAAAQgBgBAAAAQAAgBAAgBIAAAAIAAgBIgBAAIgBgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBgBAAAAIgBAAIgBgBIgBgBIgEABIAAABIgFAAIgBgDIgBgDIABgDIABgBIADAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAgBAAAAIAEAAIABAAIABABIABAAIAAABIACABIABAAIABABIACACIABADIACADIABAAIAAABIACALIAAACQAAAAABAAQAAAAAAAAQAAAAAAAAQAAAAAAABIABABIAAABIAAABIABACQAAAAAAAAQAAAAAAAAQABABAAAAQAAAAAAAAIABADIACAEIgBAEIAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBABAAAAg");
	this.shape_19.setTransform(128.075,-0.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#660100").s().p("AgBADIgCAAIgBgBIAAgBIgDgBIABgBIABgBQAAAAABAAQAAAAAAAAQABAAABAAQAAAAABAAIAAgBIACABIAEACIACABIAAABIgBABIgFABIgCgBg");
	this.shape_20.setTransform(127.6,-0.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#660100").s().p("Ag2CYQgJhOABiSQAAgMADgEIAHgHQADgEACgMQACgLAFgNQAFgPALgCQAJAAAGAMIAGAUIAGAMIAHAQQAUAwAHAsIACAHQABACAEAEQAHAHgBAKIgBAIIgBAJIAIANQAIAMgBAgQAAAMgFAFQgHAIgKgGQgJgGAAgLQgGAFgPAAQgLABgGgFQAEAPgLAKIgFAGQgBACAAAFIAAAIg");
	this.shape_21.setTransform(126.3755,5.374);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#660100").s().p("AA2B9QgFgEgCgGQgCgFgDgTQgCgVgMglIgJABQABAcgDARQgCAJgCADQgFAHgGgBQACALgHAHQgKAHgIgHQgHgFABgRIABgwIgBhrIgCgVQgEAHgBALIgCATQgCAZgNAJQgJAHgJgEQgJgEgBgMQAAgIADgLQgEgCgCgFQgCgFABgFQABgHAJgKQAJgKACgHIADgPQABgJAEgEQAFgFAKAAQAEAAALAEIAWAHQAOAFAGAHQAEgEAIAAQAHAAAGAEQAJAHAHAQQAMAdAGAwQAFAlACA7QABAQgCAHQgGAPgMAAIgBAAQgFAAgFgEg");
	this.shape_22.setTransform(126.2226,23.5775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#660100").s().p("AAPBkQgEgGABgKQgFAPgHAEQgGAEgIgFQgIgFABgJQABgFAEgIQAEgIADgOQAJgngDgoQgUAXgLAbQgEALgFAEQgFADgHgBQgHgCgCgFQgEgHAGgSQADgKADgVIAGggQAEgOABgHQABgPADgEQADgEAFgCQAGgBAEADQAKAGgCATQgBAKgDAJIAIgIQAFgFABgEIgBgGQgEgQACgNIAhAAQABAFgBANQgBALADAGQADAFAIAHQAGAHAGAPIAIAKQAGAGABAFQAEALgFAXIAAAVQABAFgDASIgEAZQgBAIgCADQgDAGgGABIgJAAIgIACIgDAAQgHAAgEgHg");
	this.shape_23.setTransform(128.0412,36.3363);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#660100").s().p("AhfChQAbhBAUg9IATg3QALghALgWQAUgoAhgiQAKgKAHgBQAIgBAGAGQAGAHgBAIQAFAAAFAFQAEAEAAAGQAAADgFAOQgCAFAAARQADA9gMAiIgGAVQgCALAEAIIADAFIACAFIgCAHIgCAHIACAIIALAVQAKAUgHAJQgEAGgJAAQgIAAgHgFQgQgLABgVQgLAKgKADQgGACgGgCQgGgCgDgFQgFgIAGgPIAEgLQACgGgBgFIgMAvQgCAMgFAEQgFAEgHgBQgHgCgDgGQgDgGADgKQAEgOAAgEQgSAjgNApg");
	this.shape_24.setTransform(117.6563,29.8859);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#660100").s().p("AA9CLQgIgFABgIQAAgGAHgJQATgaAKghQgQAWgRASQgMANgKABQgHABgGgFQgGgFACgGQgEgGgJADIgNAFQgMABgGgNQgFgKACgNIABgMQAAgHgDgEQgPATgMAVQgFALgHAFQgFADgFgBQgGgBgCgEQgDAKgKABQgKABgFgJQgFgJAJgUQAJgRAAgNIAAgNQABgQgGgCQgGACgGgDQgHgEgCgHQgCgKAJgPQAJgPASgPQARgPAPgFQAHgCABgCIAFgJQACgFAEgDQAFgDAFABQALABADALQADgJAKgDQAJgDAIAGIAMgRQAKgIAJACQAGABADAEQAEAEgBAFIASgPQAIgHAHgCIgBAAQAFgDAEADIADABQAGAEABAGQACAKgHAPIgYA8QARgHAQAIQARAIAEARQACAIgBAUIgBAUQgBAMgDAJQgDAHgIAPIgLAaQgEAJgMASQgHALgFACIgGABQgEAAgEgCgABiAiIgFAHIAAABIAAAGIABgDIAFgJIAAgDIgBAAgAArgrIAAABIgCACIgBABIACAAIABgBIAAgBIAAAAIABgCIAAgCIAAAAg");
	this.shape_25.setTransform(120.5145,45.6255);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#660100").s().p("AgTBfQgDgDgDgIIgEgMQgEgFgFAFIgFAHQgFAHgIABQgIAAgEgGQgEgGACgIIAFgNQAFgNAHgaQgFAFgHgBQgHgBgEgGQgEgFAAgHQgBgFAEgGQAEgIAMgFIATgJQAGgEADgDQAEgEACgHIAIgRQAEgJAEgCQAGgEAGADQAHADACAHQADgFAGgBIAKAAIAVgEQABgMAJgFQAFgDAGACQAGABACAEQAFAHgEANQgDANgDALIgNAmIgFAVQgCAIgHAOIgPAYIgFAMQgEALgKAKQgGAHgIADIgGABQgHAAgFgFgAgCAxIAAACIAAABIABABIAAAEIAAAAIABgCIABgDIAAgCIAAgBIAAgBIABAAIAAgBIAAgBg");
	this.shape_26.setTransform(124.541,57.7816);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#660100").s().p("ABDCEQgLgEAAgLQgBgFAFgIIAIgNQgEADgGgCIgLgEQgHgCgJABQgFAAgCACQgDABgCAFIgDAHQgEAGgGABQgGACgFgDQgFgDgCgHQgBgGADgGQgOABgUAKIgiAOQgKADgFgBQgIgDgCgJQgBgKAHgEIhngBQgQgBgGgCQgNgGACgLQABgOAWgEQAVgFAogEQAqgEATgEQAWgFAjgNQApgQAOgEQAIgCADgCQAEgEAEgGIAYgtQAPgcALgRQAHgLAHgFIAGgEIgDAAIAEAAIAKABQAHABADAHQABAFgFAKIgNAVQAFgBAIAEQAIAEAFAAIAIgEIAKgDQAGgCADgCQADgDACgHIAEgLQAEgGAIAAQAIAAAEAGQAEgKAIgDQAJgDAHAHQAFAGgDARQgIAhgVAuQgDAGgBAEIAAAJQAAAJgKANQgMAPgCAGQATgFALAEQAHACAFAHQAEAHgDAHQgCAFgFACQgFADgFgBQAFACABAHQABAHgFAFQgFAFgRAGQgQAEgOAIQgRAIgEABQgGABgGgCQgGgDgCgFQgDAIgJACQgJACgHgGQgEAHgIAAIgEAAgAgQAnIg5ASIAcgBIAFAAIAFgCQAUgKAagRIgbAMg");
	this.shape_27.setTransform(101.2202,55.2356);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#660100").s().p("AgnAbQgGgDgCgGQgCgGADgGQgHgFABgHQACgIAHgEQADgBAFAAIAJgBIAJgBIANgBQAHAAAEACIAFABQACABAEgCIAJgEIAJgDQAJgBAFAIQAFAIgFAIQgDAEgIAEIgNAEIgJAFIgVAJQgKAEgKACIgGAAQgFAAgEgBg");
	this.shape_28.setTransform(118.3124,67.3476);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#660100").s().p("AhJBbQgGgCgCgGQgCgGACgGQADgGANgIQAUgLAQgTIAQgTIARgPQAJgKAOgXIALgNQAHgJADgGIAGgNQAFgIAGgCQAFgBAFACQAFACACAFQADAHgFANQgGAMgQAWIgQAVQgPATgIAJIgTATQgHALgFAFQgDAEgMAJQgRANgJAGQgJAFgGAAIgFgBg");
	this.shape_29.setTransform(117.6736,73.0548);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#660100").s().p("AhOBlQgHgJAGgMQAEgGALgJQgIgLAJgOIAPgUQADgFADgJIAEgOIAMgZQAEgMADgGQADgHAKgIIAOgOIANgPQAJgIAQgCQAIgBAFACQAHADACAGQAIAAAEAGQAFAHgDAHQgBAEgFAEIgHAGQgFAGgGANIgJAUQgGAJgKAJIgUATQgMAJgEAGQgHAHgKAUQgJASgJAHIgKAKIgGAHQgEAEgDACIgHABQgGAAgEgFgAAMgqIgDADIgCACIgCACIgBAFIAFgFIAEgHIACgCg");
	this.shape_30.setTransform(117.8285,70.4862);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#660100").s().p("AASBZQgOgGgEgLQgFgKADgSQAEgeAVgaQgjAAgVgEQgLgCgFACIgJAEQgKAEgTAEIgxAJQgIABgHAAQgIgBgDgGQgDgHAGgIQADgEAJgFQAfgQAZgIQgCgEABgFQABgFAEgDQAGgGAMgBQAKgBATABQAUABAJgBQAAgJADgJIAfAAIgDAHQAGADAJgCIAQgFQALgEATABIAeAAIgKANIAogCQAQAAAFAGQADAFgCAHQgCAGgFAEQgHAEgRACQgQABgHAGQAHABAEAGQAFAHgDAGQgCAEgGAHQgCACgBAIQgCAXgQArQgFAOgGAEQgEAEgGgBQgHgBgCgFQgNAJgOAAQgIAAgKgDg");
	this.shape_31.setTransform(104.0614,66.9362);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#660100").s().p("AhGA3IgHgCQgDgBgGABIgPACQgJAAgEgGQgFgFABgKQABgLAGgFQAEgDAJgBIAqgFIAigJQAbgIAMgFIAUgKIAvgaQANgFAEgBQAKAAAFAHQAGAHgEAIQgCADgEADIgHAFQgGAEgLAMQgKAKgHADIgUAIIgRAKQgNAGgRAFIg3ASQgIACgGAAIgFgBg");
	this.shape_32.setTransform(99.7959,84.7981);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#660100").s().p("AhLB+QgHgCgDgJQgCgGABgJQgEgBgDgFQgDgEAAgFQABgLAKgGIAKgEQAGgDADgEQgJgFAAgQQAAgKAEgGQAFgHAOgDQANgDAPgBIg2gBQgNAAgEgDQgKgHAFgOQADgLATgQIA5guQAMgJAIAAQAEABAEAEQAEAEAAAFQAAAHgHAIQgIALgBAEQAQgWAWgPQAIgFABgCQADgFACgLQAFgIAJAAQAKgBAFAIQACAEABAHIAAAMIADARQACAUgPAbQALgCAGABQAKACAEAHQADAEAAAMIgCAfIgEAPQgFAQgKAFIgKADIgKABIgJAEIgKAFIgZAHIgRAFQgKADgGgHQgEALgOALIgYARQgIAGgHAAIgDAAgAgcglIgQANIAZAAQAAgLAJgPQgJAFgJAIg");
	this.shape_33.setTransform(102.7917,76.0245);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#660100").s().p("Ag2BcQgIgEAAgIQAAgIANgJQAOgIADgGQgKAHgJgDQgMgEABgLQAAgGAIgIIAegWQATgMAFgNQgcgCgaAFQgpALgWABQgQAAgEgJQgDgEACgGQADgGAEgDQAHgFAPgCQAxgGAsgMQABgHAHgEQAHgEAHAAIAPABQAJABAGgBQAGgCALgGQAagMAmABQAQABAFAHQAFAJgIAJQgGAHgMACQAFADAAAHQAAAGgEAFQgFAHgPAGQgXAJgaACQABANgQATIgyA6QgNAQgLACIgFABQgFAAgEgDg");
	this.shape_34.setTransform(99.2806,72.4046);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#660100").s().p("AgjBXIgKgFIgMgDQgFgCgDgGQgDgGACgGIgQABQgKgCgEgGQgDgFABgGQACgHAFgDQAEgDAIAAIAOABQARAAADABQANAEgCALIAOgMQgVgCgHgLQgGgIACgKQACgKAIgHQANgMAYACIAHgBIAFgGQAOgZANgMQAUgTAWAAQARAAAFALQADAGgDALIgFAPQgCADAAADIADAGQAGAKgGAMQgEAIgKAJIgPAOIgGANQgKAVgiAWQgPAJgJADQgGABgGAAQgIAAgGgCg");
	this.shape_35.setTransform(88.4775,82.3889);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#660100").s().p("AAZAlQgGgBgIgEIgNgHIhAgVQgQgEgMgGQgIgFgDgGQgCgGADgGQAEgHAGgBQAGgBAMAGIAfANQAIAEAIABIARADQAIACAOAIQAQAHAKACIAxABQAJgBAFADQAIAEAAAJQgBAJgIAEQgEABgIAAg");
	this.shape_36.setTransform(74.0229,86.4429);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#660100").s().p("ABVBIIgRgCIgZgBIgagBQgTgBgZgJIgsgRIgRgGQgMgBgDgCQgDgBgDgFIgFgGQgEgDgJgBQgKgCgEgDIgGgHIgGgHQgDgCgFgCIgJgEQgMgGgNgXQgHgOACgHQACgGAHgDQAHgDAGAEQADACAEAGQAEAGADACQAEAEAJABQALABAEACQgCgJALgFQAFgDAMAAQAiABAfAJQAMACAHAGQAEAEABAGQABAFgCAFQAuAJApACQAGAAACgCQACgCAAgDIAAgHQAAgJALgGQAGgDAOgBIAhgBQAkgCAOAKQAJAGADAKQADAKgFAHIgFAGIgEAKQgEAIgTAAQADAEAAAFQgBAGgDADQAEAEABAGQABAFgDAFQgFAIgOAAIgVgEQgKgCgJAEIgKAHQgFADgIAAIgCAAg");
	this.shape_37.setTransform(70.6852,80.626);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#660100").s().p("AANBNIgagEQgSAAgJgCIgQgFIgQgGQgSAAgIgDQgHgCgFgFQgFgGABgGIgHAAQAHAQgFAJQgHANgTgCQgQgCgTgMQgbgQgXgWIg4g4QgIgJAAgFQAAgFAEgEQAEgEAFgBQAHgBAMACQAZAFALAFIATAHIAJAAQAFgBADABQAEABAFADIAKAEQAJACATgHQAQgFAhgGIBFgMQAJgCAFACQAHADABAIQABAIgFAGQgFAHgTAIQA6AOA6gGQAbgCAMgLIAMgLQAIgGAGACQALACABAPIgDAWQAmgWAaggQAMgPAJgCQALgDAIAKQAHAHAAAMQAAATgSAQQgHAHgaANQAHABAEAGQAEAFgBAHQAIABAQgBQAQgBAIACQAJACAEAHQACAEgBAEQgBAFgDADQgFAEgNAAIiBABQACAEgDAFQgDAFgFACQgGADgOAAIghAAQgUgBgQABQgWAEgJAAIgCgBgAhegVIAYAFQAAgGACgEg");
	this.shape_38.setTransform(71.9417,72.6021);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#660100").s().p("ABHA7Qg8gDgiACQgUABgHgGIgIgIIgIgDQgTgDgPAAQgVAAgGgIQgCAFgGABQgFABgFgCQgIgEgGgKQgJgNgDgDQgJgFgDgCQgFgEgBgHQgBgGADgFQACgGAGgDQAGgCAGABQgHgMAIgKQAHgIAMADIAUAHQAIAEALABQAMACAVABQAWABAKACQAPACAHAFIAIAGQAEACAIAAIB0gBQAMAAAEADQAFACACAFQABAFgBAFQgCAFgEADQgEACgFgBIAmAFQAOACAFADQAKAGAAAKQAAAEgDAJIAAALQgCAKgTABIhfgDg");
	this.shape_39.setTransform(58.025,65.1841);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#660100").s().p("ABJBfIgLgBIgXgCQgGgCgDgFQgEgFABgFQgYgDgegGIgggFQgSgDgOACQABAOgBAFQgDAKgJADQgJAEgMgMQgHgHgGgLIgFgLIgOgNQgHgFgEgHQgDgIADgHQADgGAKgEIARgGQAIgJAFgDQAGgCAMAAQAoAAAngLQAAgFgBgIIgCgNQgDgRADgJQAGgQAOAAQAKgBAFALQACAFAAALQgBALABAEIAFAAQgBgHAGgGQAGgFAHABQAHACADAHQAEAHgEAGQALAFgBALQAHABANgDQANgDAHAAQAMABAFAIQADAEgBAGQgBAFgFADIADAGQAGADAWACQASADAIAGQAGAFACAHQADAHgDAGQgGANgUgBIgPgBQgJgBgGACQALANgDAIQgEAMgTgCQACAGgEAFQgEAEgGABIgHABIgFAAg");
	this.shape_40.setTransform(50.5693,54.8292);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#660100").s().p("ABVBcIgHgOQgEgIgGgDQgGAEgJgDQgIgDgCgIIgHABQAEAGgEAJQgDAHgIADQgPAEgMgPQgBAFgFADIgJAFIgIAHQgHAEgIgEQgIgDgGgHQgJgLgMgcQgQgkgRggQgMgWgJgOQgIgLgCgGQgEgKAEgJQACgEAFgCQAFgDAEACIAIADIALAAQAMAAAFAQIADANQACAHADAEQAEAGAGACQAHACAFgEQACgHAAgLIAAgTQABgJAEgFQAGgGAGACQADABAEADQAGAGgBAHIAEgQIAkAAQAJARAGASQAIABAEAHQACAFADAKQACAEAEABQAEABADgDQgEgKAAgIQABgMAHgFQAHgFAIADQAJAEABAIQAEgHAJAAQAJgBAEAHQAEAGgCALIgEAMIgEANQgCANAIAWIAZBJQAGARgHAGQgCADgKADIgJAEQgFADgEAAQgNgBgKgTg");
	this.shape_41.setTransform(37.7694,47.6378);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#660100").s().p("ABlByQgIgDgGgPQgHgRgHgEQADAHgDAHQgEAHgHACQgGADgHgFQgHgFgBgHQgEAKgIACQgJAEgHgGQgFgEgCgLIgJgtIgCAeQgCASgIAGQgJAFgKgGQgGgDgJgLQgEAFgHABQgHABgGgDQgIgEgHgLIgQgbIgHgMIgGgNQgEgJAAgOQAAgMAFgFQAGgGAMAEQADgGAHgDQgHgTAGgIQADgFAHgBQAGgCAFAEQAFAEAEAPQAHAfALAZIAMgpQAFgRAGgGQAFgEAHAAQAGAAADAFQADgIgGgOQgGgPACgHQACgGAGgDQAHgCAFADQAGAEAEAJQAbA7ANAYIAVAkQAMAVAGARIAKAXQAHAPAAAFQgBAHgHAEQgEADgEAAIgFgBg");
	this.shape_42.setTransform(33.8766,33.8426);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#660100").s().p("AALBbQgGgFgFgJQgKgYgCgaIgCgUIgEgLIgFgNIgCgMIgGgRQgEgLAAgKQAAgJADgFQAEgIAHAAIAHAAIAHgEQAEgDAEABQAFABADAEQAEAFAAANIAAA+IACAJQACAJABAVIADAQIAFAPIAHAMQAEAHgBAFQgBAIgIADIgFABQgFAAgGgFg");
	this.shape_43.setTransform(21.6281,26.2081);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#660100").s().p("AA+BmQgJgBgDgIQgCgEgCgBIgEAAQgKABgKgQIgNgUIgEgEIgFgBQgMAAgDgQIgBgMIgCgLQgHAKgMgEQABAJgJAEQgIAEgHgGQgGgFgBgSQgBgLgEgVIgGggQgCgKACgFQAEgKAIABQgCgJACgIIAYAAIAGABQAFACAFALQABgBACgGQABgEACgCIAFgBIAyAAIAHABQAFABAEAEQAJAJABAIIAAAJIAFAHQAEAGACANQADAPABATQAFA6gBAeQAAANgEAFQgEAHgIAAIgCgBg");
	this.shape_44.setTransform(28.2828,29.4559);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#660100").s().p("AgOBBQgEgFgBgIIAAgOQADgVAAgTQABgWACgFIADgMIABgJIADgJQAEgJAIABQAJAAAEAJQABAEAAAIIgCARIgDAIIgCARIgDA0QgBAKgDAEQgEAFgFABIgCAAQgFAAgEgDg");
	this.shape_45.setTransform(20.1667,-2.6203);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#660100").s().p("AAOB9QgCgFACgQQADgQgCgZQgDACgCAEIgCAHQgDAHgHACQgIADgHgEQgGAKgFADQgJAHgIgGQgHgEAAgQIAAgiIgBgMIgEgJQgDgIABgPQAFhCASguQAEgJAEgEQAHgHAHAAQAHABAEAHQADAHAAAHQAKgGAIAGQAFAEADAKQAGAaABATQANgDAFAFQADAEABAKIAEBCQACAVgDAMQgCAKgHAUIgEAXQgEAOgMACIgDAAQgIAAgEgIg");
	this.shape_46.setTransform(23.1275,7.89);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#660100").s().p("AAiBZQgCgEAAgIQAAgJgCgDQgNAKgFACQgNAFgIgIQgFgFgCgSQgBgFgDgEQgIgHgBgGQABAKgLAFQgJADgHgIQgFgFAAgMQAAgjgCgSIAAgMQAAgHADgEQAGgIAJACQAJACACAKIABALQABAIAIADQABgMAGgFQAEgEAFgBQAFAAADACQAIAFAAASQgBAuADASQAIgDACgLQABgGgCgMQgEgeABg2QAAgLADgFQAEgGAIAAQAIAAAEAHQADAEAAALIACAlQAEBGAJAmQADAMgCAGQgDAJgLABQgLAAgEgJg");
	this.shape_47.setTransform(24.54,16.025);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#660100").s().p("AAOBMQgCgDAAgKQABgRgGgRQgEgIgLgUQgKgQgDgLIgDgNQgDgHgEgDQgIgDgDgDQgFgEABgHQAAgHAFgEQAKgIAOAGQAKAFAGAOIAIAXQAEALAIAPIANAZIALAaQAFALAAAIQgBAKgGAHQgGAGgJABIgBAAQgIAAgDgHg");
	this.shape_48.setTransform(30.7977,19.1858);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("Aj0g7QD7CvDuhS");
	this.shape_49.setTransform(77,84.6876);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AiXm6QhxHRG3Gk");
	this.shape_50.setTransform(34.9782,34.375);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ABGnpQEVLMoBEH");
	this.shape_51.setTransform(118.1945,39.05);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AjBlWIGDKt");
	this.shape_52.setTransform(39.1,24.375);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#660100").s().p("AAMBqQgIAAgEgHQgCgFAAgHIABgbIgBgcIgKg6IgIgkQgGgRgBgFQgBgOAKgFQAFgDAGACQAHACABAFQABACABAKQABAIAEALIAHATIACAVIAFAbQAGAcgBA4QAAAKgDAFQgDAGgHAAIgCAAg");
	this.shape_53.setTransform(-19.4974,-4.5591);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#660100").s().p("AgLBsQgJgDgBgJQAAgFAFgLQAFgMACgUQABgJAAgKQABgTgIgoQgHgnACgVQABgIACgDQAEgHAHAAQAGAAAFAGQAEAFAAAPQgBASAGAcQAGAiABALQADAjgLAsQgEANgFAEQgEAEgGAAIgFgBg");
	this.shape_54.setTransform(-20.6862,-2.0019);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#660100").s().p("AgSAgQgDgFABgHQACgGADgFIACgGIABgEIAEgRIABgKQADgKAIgBQAKgBAFAJIACAIIgBANIgCAHIgCALQgCAHgCAEIgCAGIgCAFQgEAJgJABIgBAAQgIAAgEgIg");
	this.shape_55.setTransform(-22.3,16.5195);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#660100").s().p("AgGBuQgEgEgBgIQgCgKAFgUIAFgPQgOAMgJgDQgJgDgBgIQgCgJAHgGIAJgIIACgGQAHgbAAgaQAAgbABgNQAEgXAMgMQAJgIAKACQAHACADAIQADAFABAJIAAAfIgCAvIgIAvIgCAXIgEAQIgDARQgBALgCADQgDAFgHACIgDAAQgEAAgEgEg");
	this.shape_56.setTransform(-20.5391,14.7891);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#660100").s().p("AgdBzIgHgGIgIgBQgNgDgEgTQgDgQABgTQAAgVAEgMQAEgMAKgKIAPgPQADgCACgEIABgIIgBgXQAAgPADgFQACgEAEgDQAFgDAEABQgBgHAEgGQADgFAGgDQAGgCAGACQAHADADAFQAFgLAHgEQAKgGAIAGQAHAFAAARIgBAiQgCAlgDATQgCANgHAEQgEADgGgBQgFgBgEgEQgKAMgBAGIABAQQgBAJgLANQgLAPgCAHIgCALQgCAGgCAEQgDADgFABIgDABQgEAAgDgCg");
	this.shape_57.setTransform(-25.3875,28.8018);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#660100").s().p("AgQBUQgHgBgDgGQgDgFACgOIAEgUQACgKADgFQAGgKACgFIAGgfIACgVQAAgQABgHQACgNALgDQAFgBAFADQAFADABAFQABACgBAKIgBASIAAAQIgDAKIgBAOIgFAVIgGAOIgEAHIgCAGIgEATQgCAMgEAFQgEAEgFAAIgDgBg");
	this.shape_58.setTransform(-22.8444,31.3813);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#660100").s().p("AgyBFQgFgFABgHQABgEAEgHIAPgYQAGgIADgHQAHgRAGgIIAHgJIAFgLQAEgIAMgNIAIgJIAFgDIACgBIAJAAIAGAAIAFAAQADACABAEQABAFgCAFQgCAFgHAGQgHAGgCAEIgFAMQgCAEgHAGIgFALIgHAJIgLASIgSAgQgKAPgIACIgDAAQgGAAgEgFg");
	this.shape_59.setTransform(-34.2129,57.241);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#660100").s().p("AgdA6QgFgCgBgFIgDgIIgEgFQgFgHAFgNQALgbAfghIAKgJIAKgFQAEgDAEAAQAJgCAGAIQADAGgBAIQgBAHgEAHQgHAOgFAGIgHAHIgIAOIgEAGIgFAKIgEALIgGAIQgIAIgFABIgEAAQgDAAgDgCg");
	this.shape_60.setTransform(-38.8705,62.1125);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#660100").s().p("AgcA7IgIAAQgKABgEgKQgDgJAHgIIAIgFIAEgGIAJgRQABgEAAgJQAAgJABgEQACgHAFgHQAHgJAHgDIAMgFIAKgFQAGgCAFAAQANAAAGAPQAEAMgEAPQgCAGgDAGIgNANIgIAGQgFAEgCAEIgFALIgHAFQgFADgGAKQgHAJgIAAg");
	this.shape_61.setTransform(-45.3509,68.75);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#660100").s().p("Ag3AxQgHgDgCgGQgCgGADgGQADgEAHgFQAPgKAhgYIAMgLQAOgLAJAAIADAAIAEgEQAHgLAMAEQAFACADAFQADAEgBAFQgBAFgIAJIgPASQgGAFgUAKIgWAQQgDADgJAEIgQAHQgJAFgHAAIgFgBg");
	this.shape_62.setTransform(-53.7146,77.3648);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#660100").s().p("Ag7BBQgFgHADgJQgJABgFgIQgGgHADgHQACgHAGgGQAUgWAigWQASgMArgVIANgGQAGgCAFABQAJACACAJQABAJgGAGIgKAFIgJAJIgNAPIABAEQACAHgIAIQgKAMgOAIIgOAIQgHAGgKAJIgQAQQgFAFgFABIgFABQgGAAgFgGg");
	this.shape_63.setTransform(-53.875,74.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#660100").s().p("AgdAiIgIgBQgIgCgCgHQgEgHAEgGQADgFAJgFIAfgSIAHgDIAFAAIAEgCIAHgFIAKgHQAIgEAIAGQAGAHgCAJQgCAHgNAJIgHADQAHAFAAAJQAAAIgHAFQgFAEgLAAIgRAAIgGABIgLACg");
	this.shape_64.setTransform(-62.6969,80.1738);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#660100").s().p("AgWAUQgFgHAEgIQABgCAIgIIALgNQAGgHAHAAQAHgBAEAGQAFAFgBAHQgBAFgFAFIgJAJIgJAJQgEAFgFABIgCAAQgHAAgFgGg");
	this.shape_65.setTransform(-59.4387,79.9042);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#660100").s().p("AiOCUQgEgDgBgFQgBgFACgFQADgHAJgJIBQhKQAYgWAOgJIAWgLIARgNIAZgPQATgMAUgbQAWgcAFgWIACgKIAEgLQAIgMAKADQAIADACAJQABAHgDAJQgJAkgbAkQgQAUgPANQgQANgUAMIgaAQIgVAMQgGADgUASIhVBRQgJAIgEABQgEACgDAAQgEAAgDgCg");
	this.shape_66.setTransform(-50.1917,65.5641);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#660100").s().p("Ag+B1QgEgEgBgIIAAgTQAAgHgBgCIgEgEIgDgEQgDgFADgMQAIgcgBgeIgBgWQABgOAIgHIALgJIAIgHQAHgDAPAFIAGgiQADgSAKgEQAIgEALAIQAOALADATQAQgIAIACQAPAEACARQACAKgEASQgBAKgEAGIgKAOQgKAOgDAVQgCANgDAGQgEAGgMAIQgMAIgEAFIgGAKQgEAHgDACIgIACIgIACQgEACgGAKQgHAKgHAFQgFACgEAAQgFAAgFgEg");
	this.shape_67.setTransform(-31.0609,44.9677);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AB2m/QBvH6l0GF");
	this.shape_68.setTransform(-31.2277,28.825);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#660100").s().p("Ah6A0QgKgEgEgJQgCgEACgFQABgFAEgDQAEgDAHABIANACQAHACAHAAIARgCIAXgHIAdgHIAcgHQA4gNAughQALgJAHABQAGAAAEAFQAEAFAAAGQgBAJgPAJQg+Apg7AMIgdAGIgVAHIgVAGQgLACgVAAQgPgBgFgCg");
	this.shape_69.setTransform(-72.2294,85.8986);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#660100").s().p("AhbAoQgFgDAAgIQAAgHAFgEQAFgFAPAAQA5gBArgRQAJgDAFgFQAGgFADgBQACgBAIAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQABgBAAgEQAAgJAHgFQAIgFAIAFQAIAFgBAOQAAAJgDAHQgDAEgIAFQgPAKgGACIgQAEIgcALIggAIQgXAEgkABIgFAAQgJAAgEgEg");
	this.shape_70.setTransform(-74.7197,86.0341);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#660100").s().p("AgGAWIgOgFIgEgDIgDgFIgBgDIgCgDQgHgJAGgJQADgGAHgBQAHgBAGAFIAGAGIAGABIAJAEIAHABQAJABAEAGQAEAHgEAHQgEAGgGACIgRAAQgIAAgEgBg");
	this.shape_71.setTransform(-94.426,87.7417);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#660100").s().p("AgfAVIgTgDIgdgHIgKgFQgHgGACgHQACgJAJgDQAEgBAOAEQAQAFANABIAPABQAOAEAHAAIAOgBIAogFIANgHQAIgFAGAAQAJABADAHQAEAGgDAIIgGAHIgFAHQgFAFgPAAIgZADQgRADgIAAIgFAAQgQAAgXgDg");
	this.shape_72.setTransform(-86.8746,88.5259);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#660100").s().p("AhQAgIgMgDQgHgEAAgHQgBgIAGgEQAEgEANgBIAygBIBXgZIAMgCIAKgEQAJgBAFAGQAGAGgDAIQgCAKgNADQgHACgOACIhJAWIgSADQgSACgUAAIgOAAg");
	this.shape_73.setTransform(-74.9931,86.9304);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#660100").s().p("AgcAKQgDgHADgEQADgFAGgDQAIgDAGAAIAHgBIAJgEQAIgDAGAFQAHAGgCAIQAAADgEAFQgCADgEACIgFACIgLADIgGAAIgJACIgEABQgKgBgDgJg");
	this.shape_74.setTransform(-66.6678,85.1971);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#660100").s().p("AhNAeQgGgFABgGQAAgHAGgEQACgCAKgCQAXgDAWgFIAbgIIAWgGQAOgDAIgGQAEgEADgBQAFgDAHACQAGACAEAFQADAFgBAGQAAAHgFAEQgCADgHACQgKAEgOAEIhIATQgUAGgNAAIgEAAQgIAAgFgEg");
	this.shape_75.setTransform(-71.716,86.0183);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#660100").s().p("AhkAcQgHgFAAgIQgBgIAIgEQAEgDAOAAQAPABAngFIAagFQAcgJAPgDQAZgEAMgDQANgDAFABQAIADACAGQADAHgEAGQgDAGgOACQgOAEgeAEIgjALIgNADQgOADgQACIgxAEQgMAAgFgDg");
	this.shape_76.setTransform(-76.2492,85.8625);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#660100").s().p("AAAAQIgFgCIgCgBQgEgCgCgDIgCgBIgBgEQgBgDABgEIABgCIAAgCIABAAIAAgBQAEgEAEgCIADAAIAKAAIAGAEIADAEIABAEIAAADIgBAHIAAAAIgDAEQgBADgFABIgFABIgCAAg");
	this.shape_77.setTransform(-99.9375,86.7813);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#660100").s().p("AADAUIgDgDIgCgBIgCgBQgGAAgHgIIgDgEIgBgDQgCgEABgDIABgEIABgCIAEgEQAEgDAFAAQAGAAADAEIADACIACAAQAFABAEAEQAGAHABAEQACAIgFAGQgIAFgDAAg");
	this.shape_78.setTransform(-100.3639,86.075);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#660100").s().p("AAAAaIhPgLIgSgDQgKgEgGgFQgGgFgCgEQgDgIAGgHQAFgGAJACIAHADIAGADQAGADALACIBBAKQAOACAUgBIBNgBQAKAAAEADQAHACAAAIQABAIgHAFQgDACgMABIhAACIgmgBg");
	this.shape_79.setTransform(-88.8078,87.7418);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#660100").s().p("AAfAXIgZgBIgUgCIgngCQgYgBgOgGQgGgCgEgEQgJgIAGgKQACgFAFgCQAFgDAFACIAJAEQAEADAFAAQAJACAPABIAYABIAgADIBHAAIANgCQAIACADAHQAEAIgFAGQgEAGgJABQgGACgOAAg");
	this.shape_80.setTransform(-91.5073,86.1969);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#660100").s().p("AAhAWIgXgDQgXgEgNgBIgMgBIgKgEQgJgDgEgGQgGgIAFgIQAGgJAKACIAJAEQAFACAJABIBCAJQAOADAEADQAEADAAAHQAAAGgEAEQgFAFgIAAIgCAAIgNgCg");
	this.shape_81.setTransform(-95.494,85.5528);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#660100").s().p("AgqB0QgEgGADgHQgMgNAFgVQABgHAEgLIAFgRIAEgUIAJgYIAIgaIALgbQAIgQACgLIAHgVQAHgNALACQAFABAHAHQAIAHACAGQADAGAAALQAAAqgFAYIgHAYIgLAiIgOAcQgOAXgLAQQgKAQgKAAQgIAAgEgHg");
	this.shape_82.setTransform(-125.9383,5.0612);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#660100").s().p("AgVCKQgGgCgDgGQgFgJAAgQIgDhTQgBgYAHgMQAEgHgBgCQAAgCgDgFQgCgFAAgMQACgkAJggQACgJAFgEQAHgHAJAGQAAgGAIgDIADgBIgEAAIAJAAQAGABAEADQAFAEACALQAJAjgEAlQgCAVgIAoQgFAfABAjIAAAVQgBAMgHAHQgEAEgKAHIgLAJIgFABQgDAAgEgCg");
	this.shape_83.setTransform(-129.3697,27.1309);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#660100").s().p("AgEBzQgDgEAAgJQgEguAAgXIAAgqQAAgagDgRQgGgdAAgPQAAgMAEgFQAEgEAGgBQAGAAADAEQAFAFABAPIAGApQADAWAAAsQAAAuACAWIABATQgBAKgHAGQgFADgFAAQgEgBgDgDg");
	this.shape_84.setTransform(-120.0687,51.725);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#660100").s().p("AARBqQgDgDgFgJQgRgogEgcQgCghgEgQIgLgeQgGgOgDgNQgDgNADgHQAFgIAIAAQAJAAAEAIQADAEABAJQADARANAfQAFAOACAYQADAbACAKQAEARAJATIAHAPQACAJgFAHQgDAEgGABIgDABQgEAAgEgDg");
	this.shape_85.setTransform(-129.0692,50.3611);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#660100").s().p("AAYCHQgHgBgFgGQgEgFgCgLQgGghgFggIgFgeIgOgzQgKgkgEgpQgCgLAEgGQAEgGAIAAQALABAEAMQACAFABAPQACAWAIAhIAOA1IAIAyQAFAfAFASQAGARgGAHQgDAFgHAAIgCAAg");
	this.shape_86.setTransform(-126.9958,51.5021);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#660100").s().p("AAJBGIgHgKIgEgGIgDgJQgCgGgCgCQgFgGgCgEIgCgHIgEgGIgEgFQgDgEgBgFIgDgKQgEgMAFgGIACgDIAAgFQgDgNABgHQACgMAJgDQALgEAHALQADALADAFIAGAGQACAFABAKIAEAMIACAKIAHAVIAGASQAFANgBAIQAAANgJAEIgHACQgFAAgFgEg");
	this.shape_87.setTransform(-122.0418,65.3496);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#660100").s().p("AgCASQgGgDgGgHQgEgFAAgFQgBgJAHgEQAHgFAHAEIAIAHIAFAEQAFAFgBAGQgCAHgGAEQgDACgFAAIgFgBg");
	this.shape_88.setTransform(-115.2975,76.8882);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#660100").s().p("AA+BDIgNgIIgSgKIgSgKIgWgPQgzgfgXgiQgGgJAAgGQAAgHAGgEQAGgFAHACQAHADAHALQAWAdApAbIBEAnQAMAHACAHQACAGgEAGQgEAGgHAAIgCAAQgGAAgGgEg");
	this.shape_89.setTransform(-108.721,81.0217);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#660100").s().p("AAdAcIgPgEQgIgBgGgEIgGgFIgIgDIgNgEIgNgHQgEgCgBgFQgCgFACgEQADgLALAAIAIACIARAHIARAIIAGAEIAKACIAIADIAIAEQAHAIgFAKQgFAHgIAAIgDAAg");
	this.shape_90.setTransform(-113.3212,76.7863);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#660100").s().p("AAFAkQgIgDgMgNIgNgMQgJgIABgMQABgMALgHQALgHALAFQAGACAHAIIAOANIAGAGQAIAKgEANQgCAJgJAFQgFADgHAAIgHAAg");
	this.shape_91.setTransform(-117.1462,73.7496);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#660100").s().p("ABHBQQgjgPgdgbIgTgTIgVgPIg0geQgXgOgEgOQgCgGACgHQACgHAFgFQAFgEAHgCQAHgBAHACIAQALQAPAGAHAEQAJAKAGADIAQAIQAHAEAFAFIAPALIAUASQAYAVAMAHIAVAKQAMAHAFAJQAGALgFALQgFAMgMABIgEABQgIAAgMgGg");
	this.shape_92.setTransform(-109.0364,76.7056);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#660100").s().p("AlaH+QgYgHgUgYQgOgRgQgfQg4hpgchUQgihqAChfQAAghAHgxQAIg3ADgcQAGgtAFhaQAGhaAFgtQAIg8AWgbQATgYAhgGQAhgGAbAQQAcAQAOAiQANAfgBAlQgBAagIApIgLBDQgDAZABAxQAAAxgDAYQgCASgGAlQgHAkgCARQgHA6ALA5QALA6AcAyQAxhCBbg3QAqgaB+g9QAYgMAKgIQAJgIATgcQAOgWAjgsQAhgqAPgYQAPgYATgoIAhhCQAjhDA0g9QA+hJA3AGQAdADAXAWQAWAUALAdQAKAZACAhQACAUgBAoQgBA8gDAgQgGAygOAmQgJAWgRAfIgdAzQggA6gfBcIgTA5QgLAhgLAXQgkBPhHBAQhDA7hWAlQg5AZglgKQgYgGgTgUQgSgUgEgaQgFgZAJgZQAJgZATgSQAPgOAagNQAggNAPgHQAvgXAlgoQAkgnAUgxIjQBsQg2AdgaAUQgbAUgxA2QgiAlgQAXIgQAcQgKAQgJAJQgSAUgYAIQgOAEgNAAQgMAAgLgEg");
	this.shape_93.setTransform(-74.7242,31.5477);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("ADtkKQLRZ+FN5+QhZi+iiiOQl4kAkZERQiBCPgRCsgAqBKmQDTlFEUqnQgri4iYh4Qjvivk4CvQhLArg9BJQhNBQg3BsQj1H4D1GGIDJBuIFGAAQBqAGB3h0AvHKmQCMBaC6haAyQlGQBGKnCDFF");
	this.shape_94.setTransform(-3.9256,16.7838);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#660100").s().p("AwEKmIFGAAQhdAthSAAQhRAAhGgtgAwEKmQiDlFhGqnQA3hsBNhQQA8hJBLgrQE5ivDvCvQCXB4AsC4QkUKnjTFFgACvkKQASisCBiPQEZkRF4EAQCiCOBZC+QinM+kHAAQkIAAlps+g");
	this.shape_95.setTransform(2.2,16.7838);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).to({state:[{t:this.shape_3},{t:this.shape_2}]},3).to({state:[{t:this.shape_5},{t:this.shape_4}]},3).to({state:[{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},3).to({state:[{t:this.shape_5},{t:this.shape_4}]},3).to({state:[{t:this.shape_3},{t:this.shape_2}]},3).to({state:[]},3).wait(3));

	// Capa_1
	this.instance = new lib.eyebrows();
	this.instance.setTransform(6.9,-76.95,1,1,0,0,0,0.5,0);

	this.instance_1 = new lib.tlakingshoko1eyes();
	this.instance_1.setTransform(-8.7,-4.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#D1D3D4").s().p("AitKtQh6gchwhVQBdAvBeAKQBiAKBagfQDahKBUkCQBVkChkkiQgwiHhJhtQhLhuhdhHQB+BBBmB/QBmCAA6CoQBkEhhTEEQgoB7hNBXQhQBZhrAlQhBAWhDAAQg1AAg3gNg");
	this.shape_96.setTransform(93.8498,20.9772);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#323031").s().p("AklJnQi9iihXkBQhrk2BckWQAriEBThcQBVhfB0goQBKgZBPAAQDRAAC9CiQC8CjBYEBQBrE2hcEVQgrCEhTBcQhVBfh0AoQhKAZhPAAQjRAAi9iigAjyrDQhrAkhOBaQhMBWgoB7QhTEFBkEkQBUDzCwCZQCxCaDCAAQBGAABEgXQDahKBTkFQBTkFhkkkQhTjzixiZQiwiajDAAQhIAAhCAXg");
	this.shape_97.setTransform(76.525,17.625);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AjSKIQjqifhnkuQhoktBXkNQAph/BQhZQBShdBwgmQBvgmB6AWQB0AWBvBLQDqCeBnEvQBoEthXENQgpB/hQBaQhSBchwAmQhKAahMAAQiZAAidhrg");
	this.shape_98.setTransform(76.525,17.7076);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#D1D3D4").s().p("AhDKlQhsglhPhZQhMhWgoh7QhTkDBkkiQA6inBqiDQBoiBB/hBQheBIhNBwQhPBwguCGQhkEhBUECQBVECDaBLQBaAfBigKQBegKBegwQhyBVh5AcQg2ANg0AAQhFAAhCgXg");
	this.shape_99.setTransform(-92.7498,20.7184);

	this.instance_2 = new lib.tlakingshoko1eyes();
	this.instance_2.setTransform(-94,36.1,1,1,14.9982,0,0,69.5,40.2);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#323031").s().p("AkBLwQhzgohVhdQhVhdgsiIQgriFAEiXQAEiXA0iVQBYkBC8ijQC9iiDRAAQBPAABKAZQBzAoBVBdQBVBdAsCIQArCFgECYQgECWg0CWQhYEBi8CiQi9CijRAAQhOAAhLgZgAkKpAQiwCZhUDzQgxCPgECPQgECQApB+QApB9BNBWQBOBWBoAjQBEAXBGAAQDDAACwiZQCwiaBUjzQAxiPAEiPQAEiQgph+Qgph9hNhVQhOhWhogkQhCgXhIAAQjCAAixCag");
	this.shape_100.setTransform(-75.275,17.625);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("Aj5LaQhwgmhShcQhQhagph/QhXkNBoktQBnkuDqifQBvhLB0gWQB6gWBvAmQBwAmBSBdQBQBZApB/QBXENhnEtQhoEvjqCeQhvBLh0AWQgtAIgsAAQhKAAhGgYg");
	this.shape_101.setTransform(-75.2698,17.6284);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("rgba(102,1,0,0.996)").ss(1,1,1).p("AkTAAIInAA");
	this.shape_102.setTransform(-66.475,-46.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.instance_2},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.instance_1},{t:this.instance}]}).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137.9,-104.4,289.70000000000005,199.8);


(lib.shoko1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250000").s().p("Av7DMQhmmuFFhsQA4gNBEADQCIAIA7BVQBzhHBxg2QC3hZB0gPQBJgJBcAfQA6AUBpA0QBrA2AuAQQBQAcA2gOQBwgcgTh/QgIgygbgtQgbgsgfgQIBFANQBRAWBAAsQDMCNgwE5QgyFDlSBLQjCArkhgtQg8gKiMhAQjEhagjgNQh6gvgsAUQg2AYAzCCQgwg4g7grQh1hWg2BCQg7BIgnBSQgvBkgFBeQAGBHAHAuQh0jCg0jXg");
	this.shape.setTransform(-24.8376,-137.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// OBJECTS
	this.instance = new lib.talkingmouth("synched",0);
	this.instance.setTransform(-47.6,-30.85,0.2155,0.2155,0,0,0,-423.9,181.2);

	this.instance_1 = new lib.shoko1eyes();
	this.instance_1.setTransform(-45.35,-80.95,0.2682,0.2682,0,0,0,6.9,-4.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E6E6E6").s().p("AI2HpIg0gdQgfgRgUgHQirg4ghgHQgUgFgkgbIhHg2QgegUiLgrIgXhNQgQgvhJg2QhKgvgJgIQgPgNgKAIQgMAKgHAqIgFAnIgFAUQgEARALATIhegoQAPgXAdgWQASgNAAgWQgDgcABgTQACgZgNgiQgMgcgPgSQgMgPgWgDQgWgEgJALQgHAJgHgGQgDgCgGgKQgDgFgVADQgcADgHAAQgQgBgEgCQgFgDgHgJQgFgIgDADIgLARQgNARgGBGQgHhEgJgKQgFgGAHgfQAJgmAAgHQADgXAAgMQAAgWgRgLQgNgIAAgTQAAgUgLgJQgRgNgIgMQgFgIgTgrQgQgigCgpQACgFACACQACABABAIQACATBABPIBOBhQANATgHAdIgOA1QgDAYBEgDQAkgBA2gFQAWABAPAQQASARAXAvQAVArAHAFQAHAEAjANQAgAPAnAlQAUATAOAQQApAgAbACQAdACAcAhQBIBVAVAVQA4A4BJAbQBdAiAhAWQA2AkBWAdQBcAgAUALIAuAbQAVAMAOALQhPgHgigRg");
	this.shape_1.setTransform(-45.2393,-34.8822,0.9998,0.9998,-4.9846);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AJAHqIgzgdQgfgRgUgHQirg4gigHQgUgFgkgbIhHg2QgdgUiFgpQiRgugegPQhfgng+gcQh1g1g1g0QhLhHgWgXQgigjgGgUQgHgeAHghIABgGIgRhCQgQhBACgtQADg1ALgmQALglADAaQACATBABPIBPBhQAMATgHAdIgOA1QgDAYBFgDQAkgBA2gFQAVABAQAQQARARAXAvQAVArAHAFQAIAEAjANQAfAPAoAlQAUATANAQQApAgAcACQAdACAbAhQBJBVAVAVQA4A4BJAbQBcAiAiAWQA2AkBVAdQBcAgAUALIAuAbQAVAMAPALQhQgHgigRg");
	this.shape_2.setTransform(-46.3073,-34.8571,0.9998,0.9998,-4.9846);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BB1D2E").s().p("AGjEkQgWgMgigDQgZgDg6ABQgtABgYgFIhCgVQglgMg0ACQgsACgCgDQgIgIhEgdQhFgdgegIQgbgHg6AGQgzAFgPAGQgIADABgGQgBgSgIgVQgKgZgTgaIgQgVQgHgKgFgFQgUgSgcgVQgkgagYgKQgXgKggADQgRACgMAEQARgWAXgXQAwgwAlgJQAmgLAjgnQAcghAAgQQABgFgLgmQgNgugFgfQApAjB5BgIAAAGQgDASAmADQCYB5CwCGIG3EiQiCgrgggRg");
	this.shape_3.setTransform(-76.4307,-31.4907,0.9998,0.9998,-4.9846);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BB1D2E").s().p("Aq3AUIAHh5IVoBSIgHB6g");
	this.shape_4.setTransform(-39.6541,113.59,0.9999,0.9999,-4.9847);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCB00").s().p("AC1K4IA/wdIAnANIg+QTgAAOKgIADgvQABgTgMAAQgHgBgDAEQgDAFgBALIgCApIg4gDIADgxQABgJgDgFQgDgEgHAAQgIAAgCADQgDAEgBANIgDAyIhHgEIAEg6QACgpAVgVQAVgVAlACIBhAGQAkACATAWQASAVgCAnIgEBAgAkaKdIBS1XQARAKAVASIhQU9gAAYH6IADg4IixgKIAFhLICxAKIADg5IBIAFIgLC8gAAUEnIiggKIAEhKICcAJQANABAHgDQAGgDAAgJQABgSgZgCIgfgCIgBAWIhCgEIABgVIg7gEIAEhKICeAJQAuACAZAcQAYAagDAvQgDAsgYATQgWARgnAAIgMAAgAiABTIABgUQACgoAZgWQAZgUAqACICgAKIgEBJIiUgJQgSgBgGAGQgGAFgBAQIAAAEgAADgsQg1gEgkgoQgkgnADg5QADg2ApglQApgkA1ADQA3AEAkAoQAkAqgDA4QgEA2gpAjQgmAhgwAAIgJAAgAgajaQgSAQgBAXQgCAXAQAQQAQARAXACQAYACASgPQARgPACgYQABgWgQgSQgQgRgYgBIgEgBQgTAAgRAOgAAqmYQApgKADgmIgBgLIAYAYQAVAWAUAPQgLAbgWAUQgcAYgvAIgAhLl3QgfgmAEg2QADg3AogkQAPgOAUgJQAPAFAQASIAnAuIgQgDQgYgBgQAPQgRAOgBAXQgCAYAOAPQAMAPAaAEIgGBOQg8gLgfgkg");
	this.shape_5.setTransform(-41.2349,31.0216,0.9999,0.9999,-4.9847);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F42B3B").s().p("AqOOLIBN0HQABgYgTgRQgTgSgcgVQglgbgYgKQgWgKghADQgQACgMAEQAQgWAYgXQAvgwAlgJQAmgLAjgnQAcghABgQIgRhCQgRhCADgsQADg1ALgnQALglADAaQACAUBABPIBOBgQANATgHAdIgOA1QgDAYBEgCQAkgCA2gFQAWABAPAQQASASAXAvQAVAqAHAFQAHAFAjAMQAgAQAnAmQAUATAOAPQAoAhAbABQAdACAcAhQBJBWAVAVQA4A4BJAbQBdAhAhAXQA2AkBWAdQBcAfAUAMIAuAZQAVANAOALIg4O2g");
	this.shape_6.setTransform(-51.8605,13.3429,0.9999,0.9999,-4.9847);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBaQggAsgDArg");
	this.shape_7.setTransform(-4.6023,27.9387,0.9996,0.9996,-4.984);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_8.setTransform(-18.2989,37.5612,0.9996,0.9996,-4.984);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#81412A").s().p("Ai9ACIAggaIFBATIAaAeg");
	this.shape_9.setTransform(-0.0485,57.2904,0.9996,0.9996,-4.984);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#633321").s().p("AgYC2IAWlvIAbgdIgZGtg");
	this.shape_10.setTransform(17.2459,36.7189,0.9996,0.9996,-4.984);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_11.setTransform(-0.9936,17.1141,0.9996,0.9996,-4.984);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_12.setTransform(-0.5265,37.14,0.9996,0.9996,-4.984);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CE714F").s().p("Ah2hhID5APQieAFhEBaQgfArgEAqg");
	this.shape_13.setTransform(-45.2098,28.9717,0.9996,0.9996,-4.984);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8C462D").s().p("AAAjWIAaAgIgTFyIggAbg");
	this.shape_14.setTransform(-58.9123,38.6699,0.9996,0.9996,-4.984);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_15.setTransform(-40.6868,58.4013,0.9996,0.9996,-4.984);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#633321").s().p("AgYC3IAVlwIAdgdIgaGtg");
	this.shape_16.setTransform(-23.4173,37.8319,0.9996,0.9996,-4.984);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_17.setTransform(-41.6093,18.198,0.9996,0.9996,-4.984);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_18.setTransform(-41.1648,38.2509,0.9996,0.9996,-4.984);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBbQggArgDArg");
	this.shape_19.setTransform(-85.6798,30.1432,0.9996,0.9996,-4.984);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_20.setTransform(-99.3992,39.7927,0.9996,0.9996,-4.984);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_21.setTransform(-81.1487,59.5219,0.9996,0.9996,-4.984);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#633321").s().p("AgZC3IAXlwIAcgdIgaGtg");
	this.shape_22.setTransform(-63.8544,38.9504,0.9996,0.9996,-4.984);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_23.setTransform(-82.0961,19.3207,0.9996,0.9996,-4.984);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#9C4F33").s().p("AjKDLIAZmsIF8AWIgaGtg");
	this.shape_24.setTransform(-81.6268,39.3715,0.9996,0.9996,-4.984);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_25.setTransform(-5.8672,-18.2045,0.9996,0.9996,-4.984);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_26.setTransform(-19.5659,-8.607,0.9996,0.9996,-4.984);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_27.setTransform(-1.3133,11.1471,0.9996,0.9996,-4.984);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#633321").s().p("AgYC2IAVlvIAcgcIgZGsg");
	this.shape_28.setTransform(15.981,-9.4244,0.9996,0.9996,-4.984);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_29.setTransform(-2.2629,-29.0789,0.9996,0.9996,-4.984);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AXIgaGsg");
	this.shape_30.setTransform(-1.7935,-9.0281,0.9996,0.9996,-4.984);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CE714F").s().p("Ah2hiID5AQQieAEhDBbQggArgEAqg");
	this.shape_31.setTransform(-46.4828,-17.1207,0.9996,0.9996,-4.984);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_32.setTransform(-60.1772,-7.4734,0.9996,0.9996,-4.984);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#81412A").s().p("Ai9ACIAhgaIFBAUIAZAdg");
	this.shape_33.setTransform(-41.9517,12.258,0.9996,0.9996,-4.984);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#633321").s().p("AgYC3IAVlwIAcgdIgZGtg");
	this.shape_34.setTransform(-24.6822,-8.3113,0.9996,0.9996,-4.984);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_35.setTransform(-42.8991,-27.9431,0.9996,0.9996,-4.984);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AXIgaGsg");
	this.shape_36.setTransform(-42.4297,-7.8923,0.9996,0.9996,-4.984);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBbQggArgDAqg");
	this.shape_37.setTransform(-86.9447,-16.0001,0.9996,0.9996,-4.984);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#8C462D").s().p("AAAjWIAaAgIgTFyIggAbg");
	this.shape_38.setTransform(-100.6641,-6.3506,0.9996,0.9996,-4.984);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_39.setTransform(-82.4136,13.3786,0.9996,0.9996,-4.984);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#633321").s().p("AgYC3IAVlwIAcgdIgZGtg");
	this.shape_40.setTransform(-65.1193,-7.1929,0.9996,0.9996,-4.984);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_41.setTransform(-83.361,-26.8225,0.9996,0.9996,-4.984);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AWIgaGtg");
	this.shape_42.setTransform(-82.8917,-6.7717,0.9996,0.9996,-4.984);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_43.setTransform(-7.132,-64.3478,0.9996,0.9996,-4.984);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#8C462D").s().p("AABjWIAYAhIgSFxIgfAbg");
	this.shape_44.setTransform(-20.8557,-54.7481,0.9996,0.9996,-4.984);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_45.setTransform(-2.6031,-34.994,0.9996,0.9996,-4.984);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#633321").s().p("AgZC3IAXlwIAcgcIgaGrg");
	this.shape_46.setTransform(14.6913,-55.5655,0.9996,0.9996,-4.984);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_47.setTransform(-3.5278,-75.2222,0.9996,0.9996,-4.984);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgZGsg");
	this.shape_48.setTransform(-3.0833,-55.1692,0.9996,0.9996,-4.984);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#CE714F").s().p("Ah3hhID6APQifAEhDBcQgfAqgEAqg");
	this.shape_49.setTransform(-47.7396,-63.3148,0.9996,0.9996,-4.984);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_50.setTransform(-61.467,-53.6144,0.9996,0.9996,-4.984);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#81412A").s().p("Ai9ACIAggaIFBAUIAaAdg");
	this.shape_51.setTransform(-43.2166,-33.8852,0.9996,0.9996,-4.984);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#633321").s().p("AgZC3IAXlwIAcgdIgaGtg");
	this.shape_52.setTransform(-25.9471,-54.4546,0.9996,0.9996,-4.984);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_53.setTransform(-44.1639,-74.0864,0.9996,0.9996,-4.984);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AWIgaGtg");
	this.shape_54.setTransform(-43.6946,-54.0356,0.9996,0.9996,-4.984);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#CE714F").s().p("Ah2hhID5APQieAEhEBbQgfArgEAqg");
	this.shape_55.setTransform(-88.2616,-62.1639,0.9996,0.9996,-4.984);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_56.setTransform(-101.9538,-52.4917,0.9996,0.9996,-4.984);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_57.setTransform(-83.7034,-32.7625,0.9996,0.9996,-4.984);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#633321").s().p("AgYC3IAWlwIAbgdIgZGtg");
	this.shape_58.setTransform(-66.409,-53.334,0.9996,0.9996,-4.984);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgcAcg");
	this.shape_59.setTransform(-84.6508,-72.9636,0.9996,0.9996,-4.984);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_60.setTransform(-84.1814,-52.9128,0.9996,0.9996,-4.984);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#CE714F").s().p("Ah3hjID7APQieAEhEBbQgWAdgJAiQgFAQAAAKg");
	this.shape_61.setTransform(-8.4289,-110.714,0.9996,0.9996,-4.984);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#8C462D").s().p("AAAjVIAZAgIgSFxIgfAbg");
	this.shape_62.setTransform(-22.1283,-101.2669,0.9996,0.9996,-4.984);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_63.setTransform(-3.8757,-81.5128,0.9996,0.9996,-4.984);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#633321").s().p("AgYC2IAWlvIAbgdIgZGtg");
	this.shape_64.setTransform(13.4187,-102.0843,0.9996,0.9996,-4.984);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgcAcg");
	this.shape_65.setTransform(-4.823,-121.7139,0.9996,0.9996,-4.984);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_66.setTransform(-4.3537,-101.6631,0.9996,0.9996,-4.984);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#CE714F").s().p("Ah3hhID6APQieAEhEBaQggAsgDArg");
	this.shape_67.setTransform(-49.0679,-109.7535,0.9996,0.9996,-4.984);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_68.setTransform(-62.7666,-100.156,0.9996,0.9996,-4.984);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_69.setTransform(-44.514,-80.4019,0.9996,0.9996,-4.984);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#633321").s().p("AgYC2IAVlvIAcgdIgZGsg");
	this.shape_70.setTransform(-27.2446,-100.9712,0.9996,0.9996,-4.984);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_71.setTransform(-45.4636,-120.6279,0.9996,0.9996,-4.984);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_72.setTransform(-44.9942,-100.5771,0.9996,0.9996,-4.984);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_73.setTransform(-89.5049,-108.6351,0.9996,0.9996,-4.984);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIggAbg");
	this.shape_74.setTransform(-103.2286,-99.0354,0.9996,0.9996,-4.984);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_75.setTransform(-84.976,-79.2813,0.9996,0.9996,-4.984);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#633321").s().p("AgYC3IAVlwIAcgcIgZGrg");
	this.shape_76.setTransform(-67.6816,-99.8528,0.9996,0.9996,-4.984);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_77.setTransform(-85.9255,-119.5073,0.9996,0.9996,-4.984);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_78.setTransform(-85.4562,-99.4565,0.9996,0.9996,-4.984);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#633321").s().p("AhOOwIBv9kIAuguIh1fFg");
	this.shape_79.setTransform(22.8702,-35.9864,0.9996,0.9996,-4.984);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#81412A").s().p("AqggQIAoguITxBKIAoAzg");
	this.shape_80.setTransform(-39.9345,63.0011,0.9996,0.9996,-4.984);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#8C462D").s().p("AAnviIAoAzIhvddIguA1g");
	this.shape_81.setTransform(-107.8456,-32.6136,0.9996,0.9996,-4.984);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#CE714F").s().p("Ap4gLIgogzIVBBPIguAug");
	this.shape_82.setTransform(-45.0409,-131.6011,0.9996,0.9996,-4.984);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#9C4F33").s().p("ArbO7IB3/FIVABQIh2fFg");
	this.shape_83.setTransform(-42.5002,-34.2989,0.9996,0.9996,-4.984);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("rgba(0,0,0,0.996)").ss(4,1,1).p("AiQAEIEhgH");
	this.shape_84.setTransform(-1.925,105.9);

	this.instance_2 = new lib.shoko1shoes();
	this.instance_2.setTransform(-30.25,169.65,0.4551,0.4551,0,0,0,22.8,0.1);

	this.instance_3 = new lib.shoko1hand();
	this.instance_3.setTransform(40.15,28.5,0.3469,0.3823,-44.9984,0,0,-1.9,-0.2);

	this.instance_4 = new lib.shoko1hand();
	this.instance_4.setTransform(-130.2,33.1,0.3469,0.3823,0,44.9984,-135,-1.9,-0.2);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("rgba(156,79,51,0.996)").ss(10,1,1).p("AEQmWIAALGAkPkvIAALG");
	this.shape_85.setTransform(-39.025,123.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_85},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shoko1, new cjs.Rectangle(-177.7,-198.8,265.4,395.4), null);


(lib.Scene_1_sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sun
	this.instance = new lib.sun();
	this.instance.setTransform(317.85,-45.6,0.1843,0.1843,0,0,0,206.5,-63.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(187).to({_off:false},0).wait(1).to({regX:199,regY:0,x:316.45,y:-32.9},0).wait(1).to({y:-31.85},0).wait(1).to({y:-30.85},0).wait(1).to({y:-29.8},0).wait(1).to({y:-28.8},0).wait(1).to({y:-27.8},0).wait(1).to({y:-26.85},0).wait(1).to({y:-25.85},0).wait(1).to({y:-24.9},0).wait(1).to({y:-23.95},0).wait(1).to({y:-23},0).wait(1).to({y:-22.1},0).wait(1).to({y:-21.2},0).wait(1).to({y:-20.25},0).wait(1).to({y:-19.35},0).wait(1).to({y:-18.5},0).wait(1).to({y:-17.6},0).wait(1).to({y:-16.75},0).wait(1).to({y:-15.9},0).wait(1).to({y:-15.05},0).wait(1).to({y:-14.2},0).wait(1).to({y:-13.4},0).wait(1).to({y:-12.6},0).wait(1).to({y:-11.8},0).wait(1).to({y:-11},0).wait(1).to({y:-10.2},0).wait(1).to({y:-9.45},0).wait(1).to({y:-8.65},0).wait(1).to({y:-7.9},0).wait(1).to({y:-7.2},0).wait(1).to({y:-6.45},0).wait(1).to({y:-5.75},0).wait(1).to({y:-5.05},0).wait(1).to({y:-4.35},0).wait(1).to({y:-3.65},0).wait(1).to({y:-2.95},0).wait(1).to({y:-2.3},0).wait(1).to({y:-1.65},0).wait(1).to({y:-1},0).wait(1).to({y:-0.35},0).wait(1).to({y:0.2},0).wait(1).to({y:0.8},0).wait(1).to({y:1.4},0).wait(1).to({y:2},0).wait(1).to({y:2.6},0).wait(1).to({y:3.15},0).wait(1).to({y:3.75},0).wait(1).to({y:4.3},0).wait(1).to({y:4.8},0).wait(1).to({y:5.35},0).wait(1).to({y:5.85},0).wait(1).to({y:6.35},0).wait(1).to({y:6.85},0).wait(1).to({y:7.35},0).wait(1).to({y:7.85},0).wait(1).to({y:8.3},0).wait(1).to({y:8.75},0).wait(1).to({y:9.2},0).wait(1).to({y:9.65},0).wait(1).to({y:10.05},0).wait(1).to({y:10.45},0).wait(1).to({y:10.9},0).wait(1).to({y:11.25},0).wait(1).to({y:11.65},0).wait(1).to({y:12.05},0).wait(1).to({y:12.4},0).wait(1).to({y:12.75},0).wait(1).to({y:13.1},0).wait(1).to({y:13.4},0).wait(1).to({y:13.75},0).wait(1).to({y:14.05},0).wait(1).to({y:14.35},0).wait(1).to({y:14.6},0).wait(1).to({y:14.9},0).wait(1).to({y:15.15},0).wait(1).to({y:15.4},0).wait(1).to({y:15.65},0).wait(1).to({y:15.9},0).wait(1).to({y:16.15},0).wait(1).to({y:16.35},0).wait(1).to({y:16.55},0).wait(1).to({y:16.75},0).wait(1).to({y:16.95},0).wait(1).to({y:17.1},0).wait(1).to({y:17.25},0).wait(1).to({y:17.4},0).wait(1).to({y:17.55},0).wait(1).to({y:17.7},0).wait(1).to({y:17.8},0).wait(1).to({y:17.9},0).wait(1).to({y:18},0).wait(1).to({y:18.1},0).wait(1).to({y:18.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_street = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// street
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,0,0,0.996)").s().p("AAJAtIAAgBIAAAAIAAABIgOgCIgBgEIAAAAIAAgBIABABIAAgFIgBgBIAAAAIAAgBIgBABIAAgCIABAAIAAgNIABABIAAgBIgBAAIgCgHIAAgCIAAABIABgCIgBABIAAgDIABgBIgBgBIAAAAIAAAAIgBgDIAAgBIABgBIgBAAIABgBIAAgBIgBABQgBgGACgHIAAAAIgBgBIABgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAgBAAIABgBIgBAAIAAgGIABAAIgBgDIABAAIAAgLIABgBIgBgBIAAAAIABAAIAAAAIAAAAIAAgBIAAAAQACgBAGAAIAHABIgBABIAAAIIgBAAIABADIABACIAAACIAAAJIAAADQgCAIACAGIAAABIABAAIgBADIABAgIABAAIgBACIABAAIAAACIAAADIAAABIgBABIAAABg");
	this.shape.setTransform(104.8679,199.9688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(102,0,0,0.996)").s().p("AgCAJIgBAAIABABQgEABgHgCIAAAAIgBABIgBgBIgBABIgCgBIAAABIgFAAIAAgBIgDABIAAgBIgJAAIgBgBIgBABIAAAAIAAgBIAAAAQgCgCABgGIAAgHIABABIAIAAIAAABIACgBIABgBIACAAIAIAAIADAAQAHACAFgCIABAAIAAgBIACABIAdgBIAAgBIACABIAAgBIABAAIADAAIABAAIAAABIABAAIAAAAIgBAOIgDABIgBAAIAAAAIAAgBIgEAAIgBABIAAAAIgBAAIABABIgBAAIgBAAIAAgBIgLAAIABgBIgBAAIAAABIgGACIgCAAIAAAAIgBgBIABABIgDAAIAAgBIgBABIgBAAIAAAAIgCABIgBAAIAAgBIgBABIgBgBg");
	this.shape_1.setTransform(104.8688,195.475);

	this.start = new lib.start();
	this.start.name = "start";
	this.start.setTransform(191.6,80.3,0.1034,0.1034);
	new cjs.ButtonHelper(this.start, 0, 1, 1);

	this.instance = new lib.street();
	this.instance.setTransform(317.95,173.15,0.6083,0.6083,0,0,0,86.2,-1.8);

	this.replay = new lib.walkagain();
	this.replay.name = "replay";
	this.replay.setTransform(67.4,197.9,0.147,0.147,0,0,0,0.4,0.4);
	new cjs.ButtonHelper(this.replay, 0, 1, 2, false, new lib.walkagain(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.start},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},276).to({state:[{t:this.instance}]},75).to({state:[{t:this.instance}]},18).to({state:[{t:this.instance},{t:this.replay}]},121).wait(39));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(531));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bell = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bell
	this.instance = new lib.bell("synched",0);
	this.instance.setTransform(90.4,202.35,0.061,0.061,0,0,0,-136.2,-77.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,223,202,0.996)").ss(0.5,1,1).p("ABRAdQhbAShJgSQgHgQAHgqQBSgQBSAQQANAggNAag");
	this.shape.setTransform(108.3752,188.4467);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(255,223,202,0.996)").ss(0.5,1,1).p("AACAeQgGgQAGgq");
	this.shape_1.setTransform(99.778,188.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape},{t:this.instance}]},260).to({state:[{t:this.shape_1},{t:this.instance}]},10).to({state:[{t:this.instance}]},134).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},3).wait(112));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(260).to({startPosition:0},0).wait(10).to({startPosition:0},0).wait(134).to({regX:-135.6,regY:-76.5,scaleX:0.0609,scaleY:0.0609,rotation:-5.1866,x:90.3,y:202.25},0).wait(3).to({regX:-134.4,regY:-76,rotation:0.5166,x:90.25,y:202.3},0).wait(3).to({regX:-134,regY:-75.2,rotation:-7.6895,x:90.15,y:202.15},0).wait(3).to({regX:-132.8,regY:-74.8,rotation:-4.1961,x:90.2,y:202.25},0).wait(3).to({regX:-133.6,regY:-75.7,rotation:-4.2094},0).wait(3).to({regX:-122.7,regY:-66.3,scaleX:0.0607,scaleY:0.0607,rotation:1.3684,x:91.1,y:202.05},0).wait(112));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.knockingbackhand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.instance = new lib.Symbol1();
	this.instance.setTransform(83.15,-30.3,1,1,0,0,0,54.2,144.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.knockingbackhand, new cjs.Rectangle(38.6,-175,111.20000000000002,285.3), null);


(lib.Group_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CompoundPath();
	this.instance.setTransform(80.3,23.9,1,1,0,0,0,80.3,23.9);
	this.instance.alpha = 0.7383;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,160.7,47.8), null);


(lib.Group_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CompoundPath_0();
	this.instance.setTransform(104.2,30.9,1,1,0,0,0,104.2,30.9);
	this.instance.alpha = 0.7383;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,208.4,62), null);


(lib.Group = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CompoundPath_1();
	this.instance.setTransform(129.2,38.4,1,1,0,0,0,129.2,38.4);
	this.instance.alpha = 0.7383;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,258.3,76.9), null);


(lib.backhand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Isolation_Mode
	this.ikNode_4 = new lib.Symbol1();
	this.ikNode_4.name = "ikNode_4";
	this.ikNode_4.setTransform(38.9,-133.3,1,1,0,0,0,28.1,19.4);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.backhand, new cjs.Rectangle(20.5,-152.7,111.1,285.29999999999995), null);


(lib.walkingshoko1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// right
	this.instance = new lib.shoko1walkingshoe();
	this.instance.setTransform(-52.4,211.95,0.5531,0.5531,0,0,180,67,86.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-10.8,regY:13.3,x:-9.4,y:171.75},0).wait(1).to({y:172.1},0).wait(1).to({y:172.45},0).wait(1).to({y:172.8},0).wait(1).to({y:173.15},0).wait(1).to({y:173.5},0).wait(1).to({y:173.8},0).wait(1).to({y:174.15},0).wait(1).to({y:174.5},0).wait(1).to({y:174.85},0).wait(1).to({y:175.2},0).wait(1).to({y:175.55},0).wait(1).to({y:175.9},0).wait(1).to({y:176.2},0).wait(2).to({y:175.7},0).wait(1).to({y:175.2},0).wait(1).to({y:174.7},0).wait(1).to({y:174.2},0).wait(1).to({y:173.7},0).wait(1).to({y:173.2},0).wait(1).to({y:172.65},0).wait(1).to({y:172.15},0).wait(1).to({y:171.65},0).wait(1).to({y:171.15},0).wait(1).to({y:170.65},0).wait(1).to({y:170.15},0).wait(1).to({y:169.6},0).wait(1).to({y:169.1},0).wait(1).to({y:168.6},0).wait(1).to({y:168.1},0).wait(1).to({y:167.6},0).wait(1).to({y:167.1},0).wait(1).to({y:166.55},0).wait(1));

	// left
	this.instance_1 = new lib.shoko1walkingshoe();
	this.instance_1.setTransform(-65.1,168,0.5531,0.5531,0,0,0,-10.7,14.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:-10.8,regY:13.3,y:167.15},0).wait(1).to({y:166.9},0).wait(1).to({y:166.65},0).wait(1).to({y:166.4},0).wait(1).to({y:166.15},0).wait(1).to({y:165.9},0).wait(1).to({y:165.65},0).wait(1).to({y:165.4},0).wait(1).to({y:165.15},0).wait(1).to({y:164.9},0).wait(1).to({y:164.65},0).wait(1).to({y:164.4},0).wait(1).to({y:164.15},0).wait(1).to({y:163.85},0).wait(1).to({y:163.6},0).wait(1).to({y:164.25},0).wait(1).to({y:164.9},0).wait(1).to({y:165.5},0).wait(1).to({y:166.15},0).wait(1).to({y:166.8},0).wait(1).to({y:167.4},0).wait(1).to({y:168.05},0).wait(1).to({y:168.65},0).wait(1).to({y:169.3},0).wait(1).to({y:169.95},0).wait(1).to({y:170.55},0).wait(1).to({y:171.2},0).wait(1).to({y:171.85},0).wait(1).to({y:172.45},0).wait(1).to({y:173.1},0).wait(1).to({y:173.7},0).wait(1).to({y:174.35},0).wait(1).to({y:175},0).wait(1).to({y:175.6},0).wait(1));

	// OBJECTS
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250000").s().p("Av7DMQhmmuFFhsQA4gNBEADQCIAIA7BVQBzhHBxg2QC3hZB0gPQBJgJBcAfQA6AUBpA0QBrA2AuAQQBQAcA2gOQBwgcgTh/QgIgygbgtQgbgsgfgQIBFANQBRAWBAAsQDMCNgwE5QgyFDlSBLQjCArkhgtQg8gKiMhAQjEhagjgNQh6gvgsAUQg2AYAzCCQgwg4g7grQh1hWg2BCQg7BIgnBSQgvBkgFBeQAGBHAHAuQh0jCg0jXg");
	this.shape.setTransform(-21.5376,-135.625);

	this.instance_2 = new lib.talkingmouth("synched",0);
	this.instance_2.setTransform(-47.6,-30.85,0.2155,0.2155,0,0,0,-423.9,181.2);

	this.instance_3 = new lib.shoko1eyes();
	this.instance_3.setTransform(-45.35,-80.95,0.2682,0.2682,0,0,0,6.9,-4.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E6E6E6").s().p("AI2HpIg0gdQgfgRgUgHQirg4ghgHQgUgFgkgbIhHg2QgegUiLgrIgXhNQgQgvhJg2QhKgvgJgIQgPgNgKAIQgMAKgHAqIgFAnIgFAUQgEARALATIhegoQAPgXAdgWQASgNAAgWQgDgcABgTQACgZgNgiQgMgcgPgSQgMgPgWgDQgWgEgJALQgHAJgHgGQgDgCgGgKQgDgFgVADQgcADgHAAQgQgBgEgCQgFgDgHgJQgFgIgDADIgLARQgNARgGBGQgHhEgJgKQgFgGAHgfQAJgmAAgHQADgXAAgMQAAgWgRgLQgNgIAAgTQAAgUgLgJQgRgNgIgMQgFgIgTgrQgQgigCgpQACgFACACQACABABAIQACATBABPIBOBhQANATgHAdIgOA1QgDAYBEgDQAkgBA2gFQAWABAPAQQASARAXAvQAVArAHAFQAHAEAjANQAgAPAnAlQAUATAOAQQApAgAbACQAdACAcAhQBIBVAVAVQA4A4BJAbQBdAiAhAWQA2AkBWAdQBcAgAUALIAuAbQAVAMAOALQhPgHgigRg");
	this.shape_1.setTransform(-45.2379,-34.8807,0.9998,0.9998,-4.9845);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AJAHqIgzgdQgfgRgUgHQirg4gigHQgUgFgkgbIhHg2QgdgUiFgpQiRgugegPQhfgng+gcQh1g1g1g0QhLhHgWgXQgigjgGgUQgHgeAHghIABgGIgRhCQgQhBACgtQADg1ALgmQALglADAaQACATBABPIBPBhQAMATgHAdIgOA1QgDAYBFgDQAkgBA2gFQAVABAQAQQARARAXAvQAVArAHAFQAIAEAjANQAfAPAoAlQAUATANAQQApAgAcACQAdACAbAhQBJBVAVAVQA4A4BJAbQBcAiAiAWQA2AkBVAdQBcAgAUALIAuAbQAVAMAPALQhQgHgigRg");
	this.shape_2.setTransform(-46.306,-34.8555,0.9998,0.9998,-4.9845);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BB1D2E").s().p("AGjEkQgWgMgigDQgZgDg6ABQgtABgYgFIhCgVQglgMg0ACQgsACgCgDQgIgIhEgdQhFgdgegIQgbgHg6AGQgzAFgPAGQgIADABgGQgBgSgIgVQgKgZgTgaIgQgVQgHgKgFgFQgUgSgcgVQgkgagYgKQgXgKggADQgRACgMAEQARgWAXgXQAwgwAlgJQAmgLAjgnQAcghAAgQQABgFgLgmQgNgugFgfQApAjB5BgIAAAGQgDASAmADQCYB5CwCGIG3EiQiCgrgggRg");
	this.shape_3.setTransform(-76.4299,-31.4891,0.9998,0.9998,-4.9845);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BB1D2E").s().p("Aq3AUIAHh5IVoBSIgHB6g");
	this.shape_4.setTransform(-39.6541,113.59,0.9999,0.9999,-4.9847);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCB00").s().p("AC1K4IA/wdIAnANIg+QTgAAOKgIADgvQABgTgMAAQgHgBgDAEQgDAFgBALIgCApIg4gDIADgxQABgJgDgFQgDgEgHAAQgIAAgCADQgDAEgBANIgDAyIhHgEIAEg6QACgpAVgVQAVgVAlACIBhAGQAkACATAWQASAVgCAnIgEBAgAkaKdIBS1XQARAKAVASIhQU9gAAYH6IADg4IixgKIAFhLICxAKIADg5IBIAFIgLC8gAAUEnIiggKIAEhKICcAJQANABAHgDQAGgDAAgJQABgSgZgCIgfgCIgBAWIhCgEIABgVIg7gEIAEhKICeAJQAuACAZAcQAYAagDAvQgDAsgYATQgWARgnAAIgMAAgAiABTIABgUQACgoAZgWQAZgUAqACICgAKIgEBJIiUgJQgSgBgGAGQgGAFgBAQIAAAEgAADgsQg1gEgkgoQgkgnADg5QADg2ApglQApgkA1ADQA3AEAkAoQAkAqgDA4QgEA2gpAjQgmAhgwAAIgJAAgAgajaQgSAQgBAXQgCAXAQAQQAQARAXACQAYACASgPQARgPACgYQABgWgQgSQgQgRgYgBIgEgBQgTAAgRAOgAAqmYQApgKADgmIgBgLIAYAYQAVAWAUAPQgLAbgWAUQgcAYgvAIgAhLl3QgfgmAEg2QADg3AogkQAPgOAUgJQAPAFAQASIAnAuIgQgDQgYgBgQAPQgRAOgBAXQgCAYAOAPQAMAPAaAEIgGBOQg8gLgfgkg");
	this.shape_5.setTransform(-41.2349,31.0216,0.9999,0.9999,-4.9847);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F42B3B").s().p("AqOOLIBN0HQABgYgTgRQgTgSgcgVQglgbgYgKQgWgKghADQgQACgMAEQAQgWAYgXQAvgwAlgJQAmgLAjgnQAcghABgQIgRhCQgRhCADgsQADg1ALgnQALglADAaQACAUBABPIBOBgQANATgHAdIgOA1QgDAYBEgCQAkgCA2gFQAWABAPAQQASASAXAvQAVAqAHAFQAHAFAjAMQAgAQAnAmQAUATAOAPQAoAhAbABQAdACAcAhQBJBWAVAVQA4A4BJAbQBdAhAhAXQA2AkBWAdQBcAfAUAMIAuAZQAVANAOALIg4O2g");
	this.shape_6.setTransform(-51.8605,13.3429,0.9999,0.9999,-4.9847);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBaQggAsgDArg");
	this.shape_7.setTransform(-4.5959,27.892,0.9996,0.9996,-4.9847);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_8.setTransform(-18.2928,37.5149,0.9996,0.9996,-4.9847);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#81412A").s().p("Ai9ACIAggaIFBATIAaAeg");
	this.shape_9.setTransform(-0.0416,57.2445,0.9996,0.9996,-4.9847);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#633321").s().p("AgYC2IAWlvIAbgdIgZGtg");
	this.shape_10.setTransform(17.2531,36.6721,0.9996,0.9996,-4.9847);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_11.setTransform(-0.9873,17.067,0.9996,0.9996,-4.9847);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_12.setTransform(-0.5199,37.0935,0.9996,0.9996,-4.9847);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CE714F").s().p("Ah2hhID5APQieAFhEBaQgfArgEAqg");
	this.shape_13.setTransform(-45.2047,28.9255,0.9996,0.9996,-4.9847);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8C462D").s().p("AAAjWIAaAgIgTFyIggAbg");
	this.shape_14.setTransform(-58.9076,38.6242,0.9996,0.9996,-4.9847);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_15.setTransform(-40.6812,58.3559,0.9996,0.9996,-4.9847);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#633321").s().p("AgYC3IAVlwIAdgdIgaGtg");
	this.shape_16.setTransform(-23.4114,37.7857,0.9996,0.9996,-4.9847);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_17.setTransform(-41.6042,18.1514,0.9996,0.9996,-4.9847);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_18.setTransform(-41.1595,38.205,0.9996,0.9996,-4.9847);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBbQggArgDArg");
	this.shape_19.setTransform(-85.676,30.0975,0.9996,0.9996,-4.9847);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_20.setTransform(-99.3957,39.7475,0.9996,0.9996,-4.9847);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_21.setTransform(-81.1444,59.4771,0.9996,0.9996,-4.9847);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#633321").s().p("AgZC3IAXlwIAcgdIgaGtg");
	this.shape_22.setTransform(-63.8497,38.9047,0.9996,0.9996,-4.9847);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_23.setTransform(-82.0923,19.2747,0.9996,0.9996,-4.9847);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#9C4F33").s().p("AjKDLIAZmsIF8AWIgaGtg");
	this.shape_24.setTransform(-81.6227,39.3261,0.9996,0.9996,-4.9847);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_25.setTransform(-5.8614,-18.2527,0.9996,0.9996,-4.9847);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_26.setTransform(-19.5605,-8.6547,0.9996,0.9996,-4.9847);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_27.setTransform(-1.3071,11.0998,0.9996,0.9996,-4.9847);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#633321").s().p("AgYC2IAVlvIAcgcIgZGsg");
	this.shape_28.setTransform(15.9876,-9.4726,0.9996,0.9996,-4.9847);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_29.setTransform(-2.2571,-29.1275,0.9996,0.9996,-4.9847);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AXIgaGsg");
	this.shape_30.setTransform(-1.7875,-9.0761,0.9996,0.9996,-4.9847);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CE714F").s().p("Ah2hiID5AQQieAEhDBbQggArgEAqg");
	this.shape_31.setTransform(-46.4783,-17.1683,0.9996,0.9996,-4.9847);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_32.setTransform(-60.1731,-7.5205,0.9996,0.9996,-4.9847);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#81412A").s().p("Ai9ACIAhgaIFBAUIAZAdg");
	this.shape_33.setTransform(-41.9467,12.2112,0.9996,0.9996,-4.9847);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#633321").s().p("AgYC3IAVlwIAcgdIgZGtg");
	this.shape_34.setTransform(-24.6769,-8.3589,0.9996,0.9996,-4.9847);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_35.setTransform(-42.8946,-27.9911,0.9996,0.9996,-4.9847);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AXIgaGsg");
	this.shape_36.setTransform(-42.425,-7.9397,0.9996,0.9996,-4.9847);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#CE714F").s().p("Ah3hhID6AOQieAFhEBbQggArgDAqg");
	this.shape_37.setTransform(-86.9415,-16.0472,0.9996,0.9996,-4.9847);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#8C462D").s().p("AAAjWIAaAgIgTFyIggAbg");
	this.shape_38.setTransform(-100.6612,-6.3972,0.9996,0.9996,-4.9847);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_39.setTransform(-82.4099,13.3324,0.9996,0.9996,-4.9847);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#633321").s().p("AgYC3IAVlwIAcgdIgZGtg");
	this.shape_40.setTransform(-65.1152,-7.24,0.9996,0.9996,-4.9847);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_41.setTransform(-83.3578,-26.87,0.9996,0.9996,-4.9847);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AWIgaGtg");
	this.shape_42.setTransform(-82.8882,-6.8186,0.9996,0.9996,-4.9847);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_43.setTransform(-7.1269,-64.3974,0.9996,0.9996,-4.9847);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#8C462D").s().p("AABjWIAYAhIgSFxIgfAbg");
	this.shape_44.setTransform(-20.8509,-54.7972,0.9996,0.9996,-4.9847);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_45.setTransform(-2.5975,-35.0427,0.9996,0.9996,-4.9847);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#633321").s().p("AgZC3IAXlwIAcgcIgaGrg");
	this.shape_46.setTransform(14.6972,-55.6151,0.9996,0.9996,-4.9847);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_47.setTransform(-3.5226,-75.2722,0.9996,0.9996,-4.9847);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgZGsg");
	this.shape_48.setTransform(-3.0779,-55.2186,0.9996,0.9996,-4.9847);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#CE714F").s().p("Ah3hhID6APQifAEhDBcQgfAqgEAqg");
	this.shape_49.setTransform(-47.7357,-63.3639,0.9996,0.9996,-4.9847);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_50.setTransform(-61.4635,-53.6631,0.9996,0.9996,-4.9847);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#81412A").s().p("Ai9ACIAggaIFBAUIAaAdg");
	this.shape_51.setTransform(-43.2122,-33.9335,0.9996,0.9996,-4.9847);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#633321").s().p("AgZC3IAXlwIAcgdIgaGtg");
	this.shape_52.setTransform(-25.9424,-54.5036,0.9996,0.9996,-4.9847);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgdAcg");
	this.shape_53.setTransform(-44.1601,-74.1358,0.9996,0.9996,-4.9847);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#9C4F33").s().p("AjKDMIAamtIF7AWIgaGtg");
	this.shape_54.setTransform(-43.6905,-54.0844,0.9996,0.9996,-4.9847);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#CE714F").s().p("Ah2hhID5APQieAEhEBbQgfArgEAqg");
	this.shape_55.setTransform(-88.259,-62.2124,0.9996,0.9996,-4.9847);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#8C462D").s().p("AAAjWIAZAgIgSFyIgfAbg");
	this.shape_56.setTransform(-101.9516,-52.5397,0.9996,0.9996,-4.9847);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#81412A").s().p("Ai9ACIAggaIFCAUIAZAdg");
	this.shape_57.setTransform(-83.7003,-32.8101,0.9996,0.9996,-4.9847);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#633321").s().p("AgYC3IAWlwIAbgdIgZGtg");
	this.shape_58.setTransform(-66.4056,-53.3825,0.9996,0.9996,-4.9847);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgcAcg");
	this.shape_59.setTransform(-84.6482,-73.0125,0.9996,0.9996,-4.9847);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_60.setTransform(-84.1786,-52.9611,0.9996,0.9996,-4.9847);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#CE714F").s().p("Ah3hjID7APQieAEhEBbQgWAdgJAiQgFAQAAAKg");
	this.shape_61.setTransform(-8.4244,-110.7651,0.9996,0.9996,-4.9847);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#8C462D").s().p("AAAjVIAZAgIgSFxIgfAbg");
	this.shape_62.setTransform(-22.1241,-101.3175,0.9996,0.9996,-4.9847);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#81412A").s().p("Ai9ACIAggaIFCATIAZAeg");
	this.shape_63.setTransform(-3.8707,-81.563,0.9996,0.9996,-4.9847);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#633321").s().p("AgYC2IAWlvIAbgdIgZGtg");
	this.shape_64.setTransform(13.424,-102.1354,0.9996,0.9996,-4.9847);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#CE714F").s().p("AikAGIgZgfIF7AXIgcAcg");
	this.shape_65.setTransform(-4.8186,-121.7654,0.9996,0.9996,-4.9847);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_66.setTransform(-4.349,-101.714,0.9996,0.9996,-4.9847);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#CE714F").s().p("Ah3hhID6APQieAEhEBaQggAsgDArg");
	this.shape_67.setTransform(-49.0646,-109.8041,0.9996,0.9996,-4.9847);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIgfAbg");
	this.shape_68.setTransform(-62.7637,-100.2061,0.9996,0.9996,-4.9847);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_69.setTransform(-44.5103,-80.4516,0.9996,0.9996,-4.9847);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#633321").s().p("AgYC2IAVlvIAcgdIgZGsg");
	this.shape_70.setTransform(-27.2405,-101.0218,0.9996,0.9996,-4.9847);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_71.setTransform(-45.4604,-120.6789,0.9996,0.9996,-4.9847);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_72.setTransform(-44.9908,-100.6275,0.9996,0.9996,-4.9847);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#CE714F").s().p("Ah3hiID6APQieAFhEBbQggArgDAqg");
	this.shape_73.setTransform(-89.5029,-108.6851,0.9996,0.9996,-4.9847);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#8C462D").s().p("AAAjWIAZAhIgSFxIggAbg");
	this.shape_74.setTransform(-103.2269,-99.0849,0.9996,0.9996,-4.9847);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#81412A").s().p("Ai9ACIAggZIFCATIAZAcg");
	this.shape_75.setTransform(-84.9735,-79.3304,0.9996,0.9996,-4.9847);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#633321").s().p("AgYC3IAVlwIAcgcIgZGrg");
	this.shape_76.setTransform(-67.6788,-99.9028,0.9996,0.9996,-4.9847);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#CE714F").s().p("AikAHIgZggIF7AXIgdAcg");
	this.shape_77.setTransform(-85.9236,-119.5577,0.9996,0.9996,-4.9847);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#9C4F33").s().p("AjKDLIAamsIF7AXIgaGsg");
	this.shape_78.setTransform(-85.454,-99.5063,0.9996,0.9996,-4.9847);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#633321").s().p("AhOOwIBv9kIAuguIh1fFg");
	this.shape_79.setTransform(22.8766,-36.0355,0.9996,0.9996,-4.9847);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#81412A").s().p("AqggQIAoguITxBKIAoAzg");
	this.shape_80.setTransform(-39.9288,62.956,0.9996,0.9996,-4.9847);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#8C462D").s().p("AAnviIAoAzIhvddIguA1g");
	this.shape_81.setTransform(-107.8433,-32.6609,0.9996,0.9996,-4.9847);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#CE714F").s().p("Ap4gLIgogzIVBBPIguAug");
	this.shape_82.setTransform(-45.0378,-131.6524,0.9996,0.9996,-4.9847);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#9C4F33").s().p("ArbO7IB3/FIVABQIh2fFg");
	this.shape_83.setTransform(-42.4958,-34.3471,0.9996,0.9996,-4.9847);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("rgba(0,0,0,0.996)").ss(4,1,1).p("AiQAEIEhgH");
	this.shape_84.setTransform(-1.925,105.9);

	this.instance_4 = new lib.shoko1hand();
	this.instance_4.setTransform(-130.2,33.1,0.3469,0.3823,0,44.9984,-135,-1.9,-0.2);

	this.instance_5 = new lib.shoko1hand();
	this.instance_5.setTransform(32.1,-94.15,0.3831,0.4218,-44.4239,0,0,175.1,-197);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("rgba(156,79,51,0.996)").ss(10,1,1).p("AkPkvIAALGAEQmWIAALG");
	this.shape_85.setTransform(-39.025,123.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_85},{t:this.instance_5},{t:this.instance_4},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_3},{t:this.instance_2},{t:this.shape}]}).wait(35));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-177.7,-196.9,271.79999999999995,399.8);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Group();
	this.instance.setTransform(-117.7,-45.25,1,1,0,0,0,129.2,38.4);
	this.instance.alpha = 0.8203;

	this.instance_1 = new lib.Group_1();
	this.instance_1.setTransform(142.7,-18.35,1,1,0,0,0,104.2,30.9);
	this.instance_1.alpha = 0.8203;

	this.instance_2 = new lib.Group_2();
	this.instance_2.setTransform(98.4,59.8,1,1,0,0,0,80.3,23.9);
	this.instance_2.alpha = 0.8203;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.9,-83.6,493.8,167.3);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(321,-28.45);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(39).to({_off:false},0).to({_off:true},1).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(74.1,-112.1,493.79999999999995,167.3);


(lib.shoko2walking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// right
	this.instance = new lib.shoko2walkingshoe();
	this.instance.setTransform(36.8,-23.3,0.8329,0.8329,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:3.6,regY:-13.6,x:33.8,y:-35.4},0).wait(1).to({y:-36.2},0).wait(1).to({y:-37},0).wait(1).to({y:-37.8},0).wait(1).to({y:-38.55},0).wait(1).to({y:-39.35},0).wait(1).to({y:-40.15},0).wait(1).to({y:-40.95},0).wait(1).to({y:-41.75},0).wait(1).to({y:-42.5},0).wait(1).to({y:-43.3},0).wait(1).to({y:-44.1},0).wait(1).to({y:-44.9},0).wait(1).to({y:-45.7},0).wait(1).to({y:-46.45},0).wait(1).to({y:-47.25},0).wait(1).to({y:-48.05},0).wait(1).to({y:-48.85},0).wait(1).to({y:-49.65},0).wait(1).to({y:-48.9},0).wait(1).to({y:-48.2},0).wait(1).to({y:-47.5},0).wait(1).to({y:-46.75},0).wait(1).to({y:-46.05},0).wait(1).to({y:-45.35},0).wait(1).to({y:-44.65},0).wait(1).to({y:-43.9},0).wait(1).to({y:-43.2},0).wait(1).to({y:-42.5},0).wait(1).to({y:-41.75},0).wait(1).to({y:-41.05},0).wait(1).to({y:-40.35},0).wait(1).to({y:-39.65},0).wait(1).to({y:-38.9},0).wait(1).to({y:-38.2},0).wait(1).to({y:-37.5},0).wait(1).to({y:-36.75},0).wait(1).to({y:-36.05},0).wait(1).to({y:-35.35},0).wait(1).to({y:-34.65},0).wait(8));

	// left
	this.instance_1 = new lib.shoko2walkingshoe();
	this.instance_1.setTransform(-32.35,-12.4,0.8329,0.8329,0,0,0,-10.8,9.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:3.6,regY:-13.6,x:-20.35,y:-31.1},0).wait(1).to({y:-30.45},0).wait(1).to({y:-29.85},0).wait(1).to({y:-29.2},0).wait(1).to({y:-28.55},0).wait(1).to({y:-27.95},0).wait(1).to({y:-27.3},0).wait(1).to({y:-26.65},0).wait(1).to({y:-26.05},0).wait(1).to({y:-25.4},0).wait(1).to({y:-24.8},0).wait(1).to({y:-24.15},0).wait(1).to({y:-23.5},0).wait(1).to({y:-22.9},0).wait(1).to({y:-22.25},0).wait(1).to({y:-21.6},0).wait(1).to({y:-21},0).wait(1).to({y:-20.35},0).wait(1).to({y:-19.7},0).wait(1).to({y:-20.85},0).wait(1).to({y:-22},0).wait(1).to({y:-23.15},0).wait(1).to({y:-24.3},0).wait(1).to({y:-25.45},0).wait(1).to({y:-26.6},0).wait(1).to({y:-27.7},0).wait(1).to({y:-28.85},0).wait(1).to({y:-30},0).wait(1).to({y:-31.15},0).wait(1).to({y:-32.3},0).wait(1).to({y:-33.45},0).wait(1).to({y:-34.6},0).wait(1).to({y:-35.7},0).wait(1).to({y:-36.85},0).wait(1).to({y:-38},0).wait(1).to({y:-39.15},0).wait(1).to({y:-40.3},0).wait(1).to({y:-41.45},0).wait(1).to({y:-42.6},0).wait(1).to({y:-43.7},0).wait(8));

	// OBJECTS
	this.instance_2 = new lib.shoko2();
	this.instance_2.setTransform(17.65,-183.2,1,1,0,0,0,8.1,37.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(48));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130,-351.5,295.1,364.1);


(lib.shoko2back = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// OBJECTS
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#17431F").s().p("Aq3AUIAGh5IVpBSIgGB6g");
	this.shape.setTransform(-14,118.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0A783D").s().p("As+NhIA4u1QAPgJAXgKIAwgVQAVgJBdgVQBYgTA5gdQAjgSBfgXQBLgRA9gyQAUgQBVhPQAfgdAbACQAbABAsgbQAQgOAVgRQAsggAhgMQAagKASgCQAHgFAZgnQAcgsAUgPQARgOAVABQANABBLAQQBCAKAAgXIgIg3QgDgdAOgSIBYhWQBIhHAFgTQAGgaAGAmQAHAngEA2QgCAsgZA/IgYBAQgBAQAYAkQAdArAkAPQAjAOApA0QAVAbANAXQgLgFgQgEQgggHgXAHQgZAIgnAWQgcARgXAQQgNAKgFAPQgEAIAAAGIhMUHg");
	this.shape_1.setTransform(1.6,23.938);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#633321").s().p("AhOOwIBw9kIAtguIh1fFg");
	this.shape_2.setTransform(61.1,-22.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#81412A").s().p("AqggQIAoguITxBKIAoAzg");
	this.shape_3.setTransform(-10.125,70.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8C462D").s().p("AAnviIAoAzIhvddIguA1g");
	this.shape_4.setTransform(-69.525,-30.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CE714F").s().p("Ap4gLIgogzIVBBPIgtAug");
	this.shape_5.setTransform(1.7,-123.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#9C4F33").s().p("ArbO7IB2/FIVBBQIh2fFg");
	this.shape_6.setTransform(-4.225,-26.725);

	this.instance = new lib.knockingbackhand();
	this.instance.setTransform(91.4,39.2,0.4826,0.4826,-14.9982,0,0,94.4,-32);

	this.instance_1 = new lib.backhand();
	this.instance_1.setTransform(-85.45,51.3,0.5194,0.5194,44.9976,0,0,83.1,-17.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("rgba(156,79,51,0.996)").ss(10,1,1).p("AEQmWIAALGAkPkvIAALG");
	this.shape_7.setTransform(-13.975,153.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.instance_1},{t:this.instance},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-158,-130.2,292.9,329.2);


(lib.shoko1back = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// OBJECTS
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250000").s().p("Av7DMQhmmuFFhsQA4gNBEADQCIAIA7BVQBzhHBxg2QC3hZB0gPQBJgJBcAfQA6AUBpA0QBrA2AuAQQBQAcA2gOQBwgcgTh/QgIgygbgtQgbgsgfgQIBFANQBRAWBAAsQDMCNgwE5QgyFDlSBLQjCArkhgtQg8gKiMhAQjEhagjgNQh6gvgsAUQg2AYAzCCQgwg4g7grQh1hWg2BCQg7BIgnBSQgvBkgFBeQAGBHAHAuQh0jCg0jXg");
	this.shape.setTransform(-13.6986,-123.8029,0.9039,0.8937,0,0,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BB1D2E").s().p("Aq3AUIAGh5IVpBSIgGB6g");
	this.shape_1.setTransform(-14,118.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F42B3B").s().p("As+NhIA5u1QAPgJAWgKIAwgVQAVgJBegVQBWgTA6gdQAjgSBfgXQBKgRA+gyQAVgQBThPQAggdAcACQAaABAtgbQAPgOAWgRQArggAhgMQAbgKAQgCQAIgFAagnQAcgsASgPQASgOAVABQAOABBJAQQBEAKgBgXIgHg3QgEgdAOgSIBZhWQBHhHAFgTQAGgaAGAmQAGAngCA2QgDAsgYA/IgZBAQgBAQAYAkQAdArAlAPQAiAOApA0QAUAbAOAXQgLgFgQgEQgggHgXAHQgYAIgnAWQgeARgWAQQgMAKgHAPQgDAIAAAGIhNUHg");
	this.shape_2.setTransform(1.6,23.938);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#633321").s().p("AhOOwIBw9kIAtguIh1fFg");
	this.shape_3.setTransform(61.1,-22.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#81412A").s().p("AqggQIAoguITxBKIAoAzg");
	this.shape_4.setTransform(-10.125,70.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C462D").s().p("AAnviIAoAzIhvddIguA1g");
	this.shape_5.setTransform(-69.525,-30.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CE714F").s().p("Ap4gLIgogzIVBBPIgtAug");
	this.shape_6.setTransform(1.7,-123.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#9C4F33").s().p("ArbO7IB2/FIVBBQIh2fFg");
	this.shape_7.setTransform(-4.225,-26.725);

	this.instance = new lib.backhand();
	this.instance.setTransform(-85.45,51.3,0.5194,0.5194,44.9976,0,0,83.1,-17.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(156,79,51,0.996)").ss(10,1,1).p("AEQmWIAALGAkPkvIAALG");
	this.shape_8.setTransform(-17.975,147.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.instance},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-158,-178.5,242.7,371.3);


(lib.Scene_1_walking_shoko2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// walking_shoko2
	this.instance = new lib.shoko2walking();
	this.instance.setTransform(322.2,168.4,0.1144,0.1196,0,0,0,17.9,-166.8);

	this.instance_1 = new lib.shoko2();
	this.instance_1.setTransform(324.6,212.95,0.1146,0.1146,0,0,0,8.7,52.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance_1}]},10).wait(213));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(13).to({regX:18.8,regY:-174.2,scaleX:0.1094,scaleY:0.1142,skewX:5.3656,skewY:7.1954,x:322,y:175.8},0).wait(12).to({regX:17.9,regY:-173,scaleX:0.1111,scaleY:0.1175,skewX:-7.5322,skewY:-8.9784,x:323.15,y:176.6},0).wait(13).to({regX:18.6,regY:-172.7,scaleX:0.1345,scaleY:0.1367,skewX:0,skewY:0,x:323.55,y:178.4},0).wait(13).to({regX:-21.4,regY:-156.2,scaleX:0.1433,scaleY:0.1468,skewX:-6.3665,skewY:-6.4628,x:320.75,y:183},0).wait(13).to({regX:-298.4,regY:-110,scaleX:0.1493,scaleY:0.1517,skewX:6.421,skewY:6.5316,x:276.7,y:191.55},0).wait(13).to({regX:-298,regY:-111,scaleX:0.1605,scaleY:0.161,rotation:-4.5053,skewX:0,skewY:0,x:275,y:202.9},0).wait(13).to({regX:-298.2,regY:-110.3,scaleX:0.1611,scaleY:0.1623,rotation:6.4794,x:274.5,y:199.7},0).wait(10).to({regX:-297.9,regY:-110,scaleX:0.1619,scaleY:0.1637,rotation:0,skewX:-8.4624,skewY:-8.5487,x:278.9,y:217.35},0).wait(10).to({regX:-298,regY:-110.2,scaleX:0.1729,scaleY:0.1729,skewX:6.5222,skewY:6.4183,x:270,y:218.25},0).to({_off:true},10).wait(213));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_walking_shoko1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// walking_shoko1
	this.instance = new lib.walkingshoko1();
	this.instance.setTransform(256.3,125.75,0.1163,0.1171,3.6681,0,0,-330.2,-305.2);

	this.instance_1 = new lib.shoko1();
	this.instance_1.setTransform(284.45,211.45,0.1236,0.1215,5.1091,0,0,-40.7,8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},12).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance_1}]},10).wait(213));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(13).to({regX:-329.4,regY:-305.1,scaleX:0.1134,scaleY:0.1176,rotation:0,skewX:7.3555,skewY:7.9371,x:257.2,y:128.75},0).wait(12).to({regX:-328.7,regY:-303.7,scaleX:0.1404,scaleY:0.1312,skewX:-0.5729,skewY:-0.4981,x:249.15,y:130.85},0).wait(13).to({regX:-328.4,regY:-304.1,scaleX:0.1396,scaleY:0.1328,skewX:3.0962,skewY:2.8014,x:249.65,y:131.35},0).wait(13).to({regX:-328,regY:-303.2,scaleX:0.1562,scaleY:0.1418,rotation:-0.296,skewX:0,skewY:0,x:245.05,y:133.65},0).wait(13).to({regX:-328.2,regY:-303.7,scaleX:0.1521,scaleY:0.1417,rotation:0,skewX:3.5617,skewY:3.2733,x:246.9,y:137.8},0).wait(13).to({regX:-328.3,regY:-302.6,scaleX:0.1693,scaleY:0.1509,skewX:-0.7993,skewY:-0.7335,x:241.9,y:140.05},0).wait(13).to({regX:-328.2,regY:-302.9,scaleX:0.1638,scaleY:0.1503,skewX:4.2104,skewY:4.0164,x:244.6,y:142.95},0).wait(10).to({regX:-328.1,regY:-302.6,scaleX:0.1814,scaleY:0.16,skewX:-1.443,skewY:-1.2823,x:233.95,y:151.5},0).wait(10).to({regX:-327.6,regY:-302.4,scaleX:0.1741,scaleY:0.1582,skewX:5.28,skewY:4.9384,x:238.05,y:157.5},0).to({_off:true},10).wait(213));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_knocking_hand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// knocking_hand
	this.ikNode_1 = new lib.backhand();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(97.15,242.15,0.0588,0.0588,-31.0199,0,0,0.3,1.2);
	this.ikNode_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.ikNode_1).wait(345).to({_off:false},0).wait(14).to({regX:0.6,regY:2.4,rotation:-31.0148,y:223.7},0).wait(1).to({regX:0,regY:0,rotation:-31.025,y:216.3},0).wait(1).to({regX:78.5,regY:-3,rotation:-33.0698,x:100.95,y:213.45},0).wait(1).to({rotation:-35.1094,x:101,y:213.15},0).wait(1).to({rotation:-37.149,x:100.95,y:212.85},0).wait(1).to({rotation:-39.1886,y:212.6},0).wait(1).to({rotation:-41.2282,x:100.9,y:212.3},0).wait(1).to({rotation:-43.2679,x:100.85,y:212.05},0).wait(1).to({rotation:-45.3075,x:100.8,y:211.8},0).wait(1).to({rotation:-47.3471,x:100.75,y:211.5},0).wait(1).to({rotation:-49.3867,x:100.7,y:211.25},0).wait(1).to({rotation:-51.4263,y:211},0).wait(1).to({rotation:-53.4659,x:100.6,y:210.75},0).wait(1).to({rotation:-55.5055,x:100.55,y:210.5},0).wait(1).to({rotation:-57.5451,y:210.25},0).wait(1).to({rotation:-59.5847,x:100.45,y:210},0).wait(1).to({rotation:-61.6243,x:100.4,y:209.75},0).wait(1).to({rotation:-63.6639,x:100.3,y:209.5},0).wait(1).to({rotation:-65.7036,x:100.25,y:209.35},0).wait(1).to({rotation:-67.7432,x:100.2,y:209.15},0).wait(1).to({rotation:-69.7828,x:100.1,y:208.9},0).wait(1).to({rotation:-71.8224,x:100.05,y:208.7},0).wait(1).to({rotation:-73.862,x:100,y:208.5},0).wait(1).to({rotation:-75.9016,x:99.85,y:208.3},0).wait(1).to({rotation:-77.9412,x:99.8,y:208.1},0).wait(1).to({rotation:-79.9808,x:99.7,y:207.9},0).wait(1).to({rotation:-82.0204,x:99.65,y:207.8},0).wait(1).to({rotation:-84.06,x:99.55,y:207.6},0).wait(1).to({rotation:-86.0996,x:99.4,y:207.45},0).wait(1).to({rotation:-88.1393,x:99.35,y:207.3},0).wait(1).to({rotation:-90.1789,x:99.3,y:207.15},0).wait(1).to({rotation:-92.2185,x:99.15,y:206.95},0).wait(1).to({rotation:-94.2581,x:99.1,y:206.8},0).wait(1).to({rotation:-96.2977,x:99,y:206.65},0).wait(1).to({rotation:-98.3373,y:206.6},0).wait(1).to({rotation:-100.3769,x:98.9,y:206.45},0).wait(1).to({rotation:-102.4165,x:98.8,y:206.35},0).wait(1).to({rotation:-104.4561,x:98.75,y:206.25},0).wait(1).to({rotation:-106.4957,x:98.7,y:206.1},0).wait(1).to({rotation:-108.5353,x:98.55,y:205.75},0).wait(1).to({rotation:-110.575,x:98.4,y:205.5},0).wait(1).to({rotation:-112.6146,x:98.2,y:205.15},0).wait(1).to({rotation:-114.6542,x:98.05,y:204.85},0).wait(1).to({rotation:-116.6938,x:97.95,y:205.3},0).wait(1).to({rotation:-118.7334,x:97.8,y:205.8},0).wait(1).to({rotation:-120.773,x:97.65,y:206.3},0).wait(1).to({y:207},0).wait(1).to({y:207.75},0).wait(4).to({regX:0,regY:0,rotation:-120.7648,x:100.15,y:210.15},0).wait(1).to({regX:78.5,regY:-3,rotation:-120.773,x:97.65,y:206.65},0).wait(1).to({y:207},0).wait(1).to({y:207.35},0).wait(1).to({y:207.75},0).wait(4).to({regX:0,regY:0,rotation:-120.7648,x:100.15,y:210.15},0).wait(1).to({regX:78.5,regY:-3,rotation:-120.773,x:97.65,y:206.65},0).wait(1).to({y:207},0).wait(1).to({y:207.35},0).wait(1).to({y:207.75},0).wait(1).to({rotation:-116.4867,x:97.75,y:207.85},0).wait(1).to({rotation:-112.2003,x:97.9,y:207.95},0).wait(1).to({rotation:-107.914,x:98.1,y:208.2},0).wait(1).to({rotation:-103.6276,x:98.25,y:208.4},0).wait(1).to({rotation:-99.3413,x:98.45,y:208.7},0).wait(1).to({rotation:-95.0549,x:98.55,y:208.9},0).wait(1).to({rotation:-90.7686,x:98.75,y:209.25},0).wait(1).to({rotation:-86.4823,x:98.95,y:209.55},0).wait(1).to({rotation:-82.1959,x:99.2,y:209.9},0).wait(1).to({rotation:-77.9096,x:99.35,y:210.25},0).wait(1).to({rotation:-73.6232,x:99.5,y:210.6},0).wait(1).to({rotation:-69.3369,x:99.7,y:211.1},0).wait(1).to({rotation:-65.0505,x:99.85,y:211.5},0).wait(1).to({rotation:-60.7642,x:100,y:211.95},0).wait(1).to({rotation:-56.4779,x:100.15,y:212.45},0).wait(1).to({rotation:-52.1915,x:100.25,y:212.95},0).wait(1).to({rotation:-47.9052,x:100.35,y:213.5},0).wait(1).to({rotation:-43.6188,x:100.5,y:214},0).wait(1).to({rotation:-39.3325,x:100.55,y:214.6},0).wait(1).to({rotation:-35.0461,x:100.65,y:215.2},0).wait(1).to({rotation:-30.7598,y:215.85},0).wait(88));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.clouds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween1("synched",39);
	this.instance.setTransform(-675.95,28.45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-601.8,-83.6,493.69999999999993,167.3);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shoko2back("synched",0);
	this.instance.setTransform(51.15,21.85,0.105,0.105,0,0,0,-11.5,2.4);

	this.ikNode_2 = new lib.shoko1back("synched",0);
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(32.3,25.85,0.1132,0.1132,-0.9426,0,0,118,50.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_2},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(1.8,0.3,63.60000000000001,42.7), null);


(lib.Scene_1_knocking_shoko = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// knocking_shoko
	this.instance = new lib.Symbol4();
	this.instance.setTransform(103.2,239.95,1,1,0,0,0,33.2,21.2);
	this.instance._off = true;

	this.instance_1 = new lib.shoko2back("synched",0);
	this.instance_1.setTransform(121.15,214.75,0.1051,0.1051,0,0,0,-11.9,1.9);

	this.ikNode_2 = new lib.shoko1back("synched",0);
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(102.3,218.75,0.1132,0.1132,-0.9501,0,0,117.5,50.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},345).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.ikNode_2},{t:this.instance_1,p:{regX:-11.9,regY:1.9,scaleX:0.1051,scaleY:0.1051,rotation:0,x:121.15,y:214.75}}]},1).to({state:[{t:this.ikNode_2},{t:this.instance_1,p:{regX:-14.3,regY:-0.5,scaleX:0.105,scaleY:0.105,rotation:-7.5154,x:120.7,y:212.65}}]},22).to({state:[{t:this.ikNode_2},{t:this.instance_1,p:{regX:-14.3,regY:-0.5,scaleX:0.105,scaleY:0.105,rotation:-7.5154,x:120.7,y:212.65}}]},18).to({state:[{t:this.ikNode_2},{t:this.instance_1,p:{regX:-14.3,regY:-0.5,scaleX:0.105,scaleY:0.105,rotation:-7.5154,x:120.7,y:212.65}}]},8).to({state:[{t:this.ikNode_2},{t:this.instance_1,p:{regX:-14.3,regY:-0.5,scaleX:0.105,scaleY:0.105,rotation:-7.5154,x:120.7,y:212.65}}]},9).to({state:[{t:this.ikNode_2},{t:this.instance_1,p:{regX:-14.3,regY:-0.5,scaleX:0.105,scaleY:0.105,rotation:-7.5154,x:120.7,y:212.65}}]},10).wait(104));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(345).to({_off:false},0).wait(1).to({y:238.6},0).wait(1).to({y:237.3},0).wait(1).to({y:235.95},0).wait(1).to({y:234.65},0).wait(1).to({y:233.3},0).wait(1).to({y:232},0).wait(1).to({y:230.7},0).wait(1).to({y:229.35},0).wait(1).to({y:228.05},0).wait(1).to({y:226.7},0).wait(1).to({y:225.4},0).wait(1).to({y:224.05},0).wait(1).to({y:222.75},0).wait(1).to({y:221.45},0).to({_off:true},1).wait(171));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_clouds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// clouds
	this.instance = new lib.clouds("synched",0);
	this.instance.setTransform(594.4,48.15,0.3813,0.3813,0,0,0,1409.9,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-355,x:-76.5},0).wait(1).to({x:-74.3},0).wait(1).to({x:-72.15},0).wait(1).to({x:-69.95},0).wait(1).to({x:-67.75},0).wait(1).to({x:-65.6},0).wait(1).to({x:-63.4},0).wait(1).to({x:-61.25},0).wait(1).to({x:-59.05},0).wait(1).to({x:-56.85},0).wait(1).to({x:-54.7},0).wait(1).to({x:-52.5},0).wait(1).to({x:-50.35},0).wait(1).to({x:-48.15},0).wait(1).to({x:-45.95},0).wait(1).to({x:-43.8},0).wait(1).to({x:-41.6},0).wait(1).to({x:-39.45},0).wait(1).to({x:-37.25},0).wait(1).to({x:-35.05},0).wait(1).to({x:-32.9},0).wait(1).to({x:-30.7},0).wait(1).to({x:-28.55},0).wait(1).to({x:-26.35},0).wait(1).to({x:-24.15},0).wait(1).to({x:-22},0).wait(1).to({x:-19.8},0).wait(1).to({x:-17.6},0).wait(1).to({x:-15.45},0).wait(1).to({x:-13.25},0).wait(1).to({x:-11.1},0).wait(1).to({x:-8.9},0).wait(1).to({x:-6.7},0).wait(1).to({x:-4.55},0).wait(1).to({x:-2.35},0).wait(1).to({x:-0.2},0).wait(1).to({x:2},0).wait(1).to({x:4.2},0).wait(1).to({x:6.35},0).wait(1).to({x:8.55},0).wait(1).to({x:10.7},0).wait(1).to({x:12.9},0).wait(1).to({x:15.1},0).wait(1).to({x:17.25},0).wait(1).to({x:19.45},0).wait(1).to({x:21.6},0).wait(1).to({x:23.8},0).wait(1).to({x:26},0).wait(1).to({x:28.15},0).wait(1).to({x:30.35},0).wait(1).to({x:32.5},0).wait(1).to({x:34.7},0).wait(1).to({x:36.9},0).wait(1).to({x:39.05},0).wait(1).to({x:41.25},0).wait(1).to({x:43.45},0).wait(1).to({x:45.6},0).wait(1).to({x:47.8},0).wait(1).to({x:49.95},0).wait(1).to({x:52.15},0).wait(1).to({x:54.35},0).wait(1).to({x:56.5},0).wait(1).to({x:58.7},0).wait(1).to({x:60.85},0).wait(1).to({x:63.05},0).wait(1).to({x:65.25},0).wait(1).to({x:67.4},0).wait(1).to({x:69.6},0).wait(1).to({x:71.75},0).wait(1).to({x:73.95},0).wait(1).to({x:76.15},0).wait(1).to({x:78.3},0).wait(1).to({x:80.5},0).wait(1).to({x:82.65},0).wait(1).to({x:84.85},0).wait(1).to({x:87.05},0).wait(1).to({x:89.2},0).wait(1).to({x:91.4},0).wait(1).to({x:93.6},0).wait(1).to({x:95.75},0).wait(1).to({x:97.95},0).wait(1).to({x:100.1},0).wait(1).to({x:102.3},0).wait(1).to({x:104.5},0).wait(1).to({x:106.65},0).wait(1).to({x:108.85},0).wait(1).to({x:111},0).wait(1).to({x:113.2},0).wait(1).to({x:115.4},0).wait(1).to({x:117.55},0).wait(1).to({x:119.75},0).wait(1).to({x:121.9},0).wait(1).to({x:124.1},0).wait(1).to({x:126.3},0).wait(1).to({x:128.45},0).wait(1).to({x:130.65},0).wait(1).to({x:132.8},0).wait(1).to({x:135},0).wait(1).to({x:137.2},0).wait(1).to({x:139.35},0).wait(1).to({x:141.55},0).wait(1).to({x:143.7},0).wait(1).to({x:145.9},0).wait(1).to({x:148.1},0).wait(1).to({x:150.25},0).wait(1).to({x:152.45},0).wait(1).to({x:154.65},0).wait(1).to({x:156.8},0).wait(1).to({x:159},0).wait(1).to({x:161.15},0).wait(1).to({x:163.35},0).wait(1).to({x:165.55},0).wait(1).to({x:167.7},0).wait(1).to({x:169.9},0).wait(1).to({x:172.05},0).wait(1).to({x:174.25},0).wait(1).to({x:176.45},0).wait(1).to({x:178.6},0).wait(1).to({x:180.8},0).wait(1).to({x:182.95},0).wait(1).to({x:185.15},0).wait(1).to({x:187.35},0).wait(1).to({x:189.5},0).wait(1).to({x:191.7},0).wait(1).to({x:193.85},0).wait(1).to({x:196.05},0).wait(1).to({x:198.25},0).wait(1).to({x:200.4},0).wait(1).to({x:202.6},0).wait(1).to({x:204.8},0).wait(1).to({x:206.95},0).wait(1).to({x:209.15},0).wait(1).to({x:211.3},0).wait(1).to({x:213.5},0).wait(1).to({x:215.7},0).wait(1).to({x:217.85},0).wait(1).to({x:220.05},0).wait(1).to({x:222.2},0).wait(1).to({x:224.4},0).wait(1).to({x:226.6},0).wait(1).to({x:228.75},0).wait(1).to({x:230.95},0).wait(1).to({x:233.1},0).wait(1).to({x:235.3},0).wait(1).to({x:237.5},0).wait(1).to({x:239.65},0).wait(1).to({x:241.85},0).wait(1).to({x:244},0).wait(1).to({x:246.2},0).wait(1).to({x:248.4},0).wait(1).to({x:250.55},0).wait(1).to({x:252.75},0).wait(1).to({x:254.95},0).wait(1).to({x:257.1},0).wait(1).to({x:259.3},0).wait(1).to({x:261.45},0).wait(1).to({x:263.65},0).wait(1).to({x:265.85},0).wait(1).to({x:268},0).wait(1).to({x:270.2},0).wait(1).to({x:272.35},0).wait(1).to({x:274.55},0).wait(1).to({x:276.75},0).wait(1).to({x:278.9},0).wait(1).to({x:281.1},0).wait(1).to({x:283.25},0).wait(1).to({x:285.45},0).wait(1).to({x:287.65},0).wait(1).to({x:289.8},0).wait(1).to({x:292},0).wait(1).to({x:294.15},0).wait(1).to({x:296.35},0).wait(1).to({x:298.55},0).wait(1).to({x:300.7},0).wait(1).to({x:302.9},0).wait(1).to({x:305.05},0).wait(1).to({x:307.25},0).wait(1).to({x:309.45},0).wait(1).to({x:311.6},0).wait(1).to({x:313.8},0).wait(1).to({x:316},0).wait(1).to({x:318.15},0).wait(1).to({x:320.35},0).wait(1).to({x:322.5},0).wait(1).to({x:324.7},0).wait(1).to({x:326.9},0).wait(1).to({x:329.05},0).wait(1).to({x:331.25},0).wait(1).to({x:333.4},0).wait(1).to({x:335.6},0).wait(1).to({x:337.8},0).wait(1).to({x:339.95},0).wait(1).to({x:342.15},0).wait(1).to({x:344.3},0).wait(1).to({x:346.5},0).wait(1).to({x:348.7},0).wait(1).to({x:350.85},0).wait(1).to({x:353.05},0).wait(1).to({x:355.2},0).wait(1).to({x:357.4},0).wait(1).to({x:359.6},0).wait(1).to({x:361.75},0).wait(1).to({x:363.95},0).wait(1).to({x:366.15},0).wait(1).to({x:368.3},0).wait(1).to({x:370.5},0).wait(1).to({x:372.65},0).wait(1).to({x:374.85},0).wait(1).to({x:377.05},0).wait(1).to({x:379.2},0).wait(1).to({x:381.4},0).wait(1).to({x:383.55},0).wait(1).to({x:385.75},0).wait(1).to({x:387.95},0).wait(1).to({x:390.1},0).wait(1).to({x:392.3},0).wait(1).to({x:394.45},0).wait(1).to({x:396.65},0).wait(1).to({x:398.85},0).wait(1).to({x:401},0).wait(1).to({x:403.2},0).wait(1).to({x:405.35},0).wait(1).to({x:407.55},0).wait(1).to({x:409.75},0).wait(1).to({x:411.9},0).wait(1).to({x:414.1},0).wait(1).to({x:416.25},0).wait(1).to({x:418.45},0).wait(1).to({x:420.65},0).wait(1).to({x:422.8},0).wait(1).to({x:425},0).wait(1).to({x:427.2},0).wait(1).to({x:429.35},0).wait(1).to({x:431.55},0).wait(1).to({x:433.7},0).wait(1).to({x:435.9},0).wait(1).to({x:438.1},0).wait(1).to({x:440.25},0).wait(1).to({x:442.45},0).wait(1).to({x:444.6},0).wait(1).to({x:446.8},0).wait(1).to({x:449},0).wait(1).to({x:451.15},0).wait(1).to({x:453.35},0).wait(1).to({x:455.5},0).wait(1).to({x:457.7},0).wait(1).to({x:459.9},0).wait(1).to({x:462.05},0).wait(1).to({x:464.25},0).wait(1).to({x:466.4},0).wait(1).to({x:468.6},0).wait(1).to({x:470.8},0).wait(1).to({x:472.95},0).wait(1).to({x:475.15},0).wait(1).to({x:477.35},0).wait(1).to({x:479.5},0).wait(1).to({x:481.7},0).wait(1).to({x:483.85},0).wait(1).to({x:486.05},0).wait(1).to({x:488.25},0).wait(1).to({x:490.4},0).wait(1).to({x:492.6},0).wait(1).to({x:494.75},0).wait(1).to({x:496.95},0).wait(1).to({x:499.15},0).wait(1).to({x:501.3},0).wait(1).to({x:503.5},0).wait(1).to({x:505.65},0).wait(1).to({x:507.85},0).wait(1).to({x:510.05},0).wait(1).to({x:512.2},0).wait(1).to({x:514.4},0).wait(1).to({x:516.55},0).wait(1).to({x:518.75},0).wait(1).to({x:520.95},0).wait(1).to({x:523.1},0).wait(1).to({x:525.3},0).wait(1).to({x:527.45},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.AdonShokoNufarMeir = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,345,359,360,382,400,408,410,417,418,427,492,529,530];
	this.streamSoundSymbolsList[1] = [{id:"adonShokoMP3",startFrame:1,endFrame:531,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.street.start;
		var self= this;
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying ()
		{
			self.gotoAndPlay(1)
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("adonShokoMP3",0);
		this.InsertIntoSoundStreamData(soundInstance,1,531,1);
	}
	this.frame_2 = function() {
		this.start = undefined;
	}
	this.frame_345 = function() {
		this.ikNode_1 = this.knocking_hand.ikNode_1;
	}
	this.frame_359 = function() {
		this.ikNode_1 = undefined;this.ikNode_1 = this.knocking_hand.ikNode_1;
	}
	this.frame_360 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = this.knocking_shoko.ikNode_2;
		this.ikNode_1 = this.knocking_hand.ikNode_1;
	}
	this.frame_382 = function() {
		this.ikNode_2 = undefined;this.ikNode_2 = this.knocking_shoko.ikNode_2;
	}
	this.frame_400 = function() {
		this.ikNode_2 = undefined;this.ikNode_2 = this.knocking_shoko.ikNode_2;
	}
	this.frame_408 = function() {
		this.ikNode_2 = undefined;this.ikNode_2 = this.knocking_shoko.ikNode_2;
	}
	this.frame_410 = function() {
		this.ikNode_1 = undefined;this.ikNode_1 = this.knocking_hand.ikNode_1;
	}
	this.frame_417 = function() {
		this.ikNode_2 = undefined;this.ikNode_2 = this.knocking_shoko.ikNode_2;
	}
	this.frame_418 = function() {
		this.ikNode_1 = undefined;this.ikNode_1 = this.knocking_hand.ikNode_1;
	}
	this.frame_427 = function() {
		this.ikNode_2 = undefined;this.ikNode_2 = this.knocking_shoko.ikNode_2;
	}
	this.frame_492 = function() {
		this.replay = this.street.replay;
	}
	this.frame_529 = function() {
		var self= this;
		self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain ()
		{
			self.gotoAndPlay(1);
			}
	}
	this.frame_530 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(343).call(this.frame_345).wait(14).call(this.frame_359).wait(1).call(this.frame_360).wait(22).call(this.frame_382).wait(18).call(this.frame_400).wait(8).call(this.frame_408).wait(2).call(this.frame_410).wait(7).call(this.frame_417).wait(1).call(this.frame_418).wait(9).call(this.frame_427).wait(65).call(this.frame_492).wait(37).call(this.frame_529).wait(1).call(this.frame_530).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(344,167.4);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(120).to({regX:1.2,regY:1.7,scaleX:0.1749,scaleY:0.1749,rotation:2.9905,x:303.9,y:210.1},0).wait(68).to({regX:2.2,regY:2.4,scaleX:0.5049,scaleY:0.5049,rotation:0,x:323.7,y:17.2},0).wait(1).to({regX:0,regY:0,x:322.6,y:16},0).wait(84).to({regX:2.7,regY:2.8,scaleX:0.3719,scaleY:0.3719,x:109.35,y:190.05},0).wait(1).to({regX:0,regY:0,scaleX:0.3683,scaleY:0.3683,x:108.1927,y:189.186},0).wait(1).to({scaleX:0.3647,scaleY:0.3647,x:108.0357,y:189.3716},0).wait(1).to({scaleX:0.3612,scaleY:0.3612,x:107.8792,y:189.5567},0).wait(1).to({scaleX:0.3576,scaleY:0.3576,x:107.723,y:189.7415},0).wait(1).to({scaleX:0.3541,scaleY:0.3541,x:107.5671,y:189.9258},0).wait(1).to({scaleX:0.3505,scaleY:0.3505,x:107.4117,y:190.1096},0).wait(1).to({scaleX:0.347,scaleY:0.347,x:107.2565,y:190.2931},0).wait(1).to({scaleX:0.3435,scaleY:0.3435,x:107.1019,y:190.476},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:106.9475,y:190.6586},0).wait(1).to({scaleX:0.3365,scaleY:0.3365,x:106.7935,y:190.8407},0).wait(1).to({scaleX:0.333,scaleY:0.333,x:106.6399,y:191.0224},0).wait(1).to({scaleX:0.3295,scaleY:0.3295,x:106.4866,y:191.2038},0).wait(1).to({scaleX:0.326,scaleY:0.326,x:106.3337,y:191.3846},0).wait(1).to({scaleX:0.3225,scaleY:0.3225,x:106.1812,y:191.565},0).wait(1).to({scaleX:0.3191,scaleY:0.3191,x:106.0291,y:191.7448},0).wait(1).to({scaleX:0.3156,scaleY:0.3156,x:105.8773,y:191.9243},0).wait(1).to({scaleX:0.3122,scaleY:0.3122,x:105.7259,y:192.1034},0).wait(1).to({scaleX:0.3087,scaleY:0.3087,x:105.5749,y:192.282},0).wait(1).to({scaleX:0.3053,scaleY:0.3053,x:105.4242,y:192.4602},0).wait(1).to({scaleX:0.3019,scaleY:0.3019,x:105.2739,y:192.638},0).wait(1).to({scaleX:0.2985,scaleY:0.2985,x:105.1239,y:192.8154},0).wait(1).to({scaleX:0.2951,scaleY:0.2951,x:104.9743,y:192.9923},0).wait(1).to({scaleX:0.2917,scaleY:0.2917,x:104.8252,y:193.1687},0).wait(1).to({scaleX:0.2883,scaleY:0.2883,x:104.6763,y:193.3448},0).wait(1).to({scaleX:0.2849,scaleY:0.2849,x:104.5278,y:193.5204},0).wait(1).to({scaleX:0.2816,scaleY:0.2816,x:104.3798,y:193.6954},0).wait(1).to({scaleX:0.2782,scaleY:0.2782,x:104.232,y:193.8702},0).wait(1).to({scaleX:0.2748,scaleY:0.2748,x:104.0846,y:194.0445},0).wait(1).to({scaleX:0.2715,scaleY:0.2715,x:103.9377,y:194.2183},0).wait(1).to({scaleX:0.2682,scaleY:0.2682,x:103.791,y:194.3918},0).wait(1).to({scaleX:0.2648,scaleY:0.2648,x:103.6447,y:194.5647},0).wait(1).to({scaleX:0.2615,scaleY:0.2615,x:103.4989,y:194.7372},0).wait(1).to({scaleX:0.2582,scaleY:0.2582,x:103.3534,y:194.9093},0).wait(1).to({scaleX:0.2549,scaleY:0.2549,x:103.2083,y:195.081},0).wait(1).to({scaleX:0.2516,scaleY:0.2516,x:103.0635,y:195.2522},0).wait(1).to({scaleX:0.2483,scaleY:0.2483,x:102.9191,y:195.423},0).wait(1).to({scaleX:0.245,scaleY:0.245,x:102.775,y:195.5934},0).wait(1).to({scaleX:0.2418,scaleY:0.2418,x:102.6314,y:195.7632},0).wait(1).to({scaleX:0.2385,scaleY:0.2385,x:102.488,y:195.9328},0).wait(1).to({scaleX:0.2353,scaleY:0.2353,x:102.3451,y:196.1018},0).wait(1).to({scaleX:0.232,scaleY:0.232,x:102.2025,y:196.2705},0).wait(1).to({scaleX:0.2288,scaleY:0.2288,x:102.0603,y:196.4386},0).wait(1).to({scaleX:0.2256,scaleY:0.2256,x:101.9185,y:196.6064},0).wait(1).to({scaleX:0.2223,scaleY:0.2223,x:101.7771,y:196.7736},0).wait(1).to({scaleX:0.2191,scaleY:0.2191,x:101.636,y:196.9405},0).wait(1).to({scaleX:0.2159,scaleY:0.2159,x:101.4952,y:197.107},0).wait(1).to({scaleX:0.2127,scaleY:0.2127,x:101.3548,y:197.273},0).wait(1).to({scaleX:0.2095,scaleY:0.2095,x:101.2148,y:197.4386},0).wait(1).to({scaleX:0.2064,scaleY:0.2064,x:101.0753,y:197.6036},0).wait(1).to({scaleX:0.2032,scaleY:0.2032,x:100.936,y:197.7684},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:100.7971,y:197.9326},0).wait(1).to({scaleX:0.1969,scaleY:0.1969,x:100.6586,y:198.0964},0).wait(1).to({scaleX:0.1938,scaleY:0.1938,x:100.5263,y:198.2499},0).wait(1).to({scaleX:0.1921,scaleY:0.1921,x:100.4695,y:198.2748},0).wait(1).to({scaleX:0.1903,scaleY:0.1903,x:100.4129,y:198.2997},0).wait(1).to({scaleX:0.1885,scaleY:0.1885,x:100.3564,y:198.3244},0).wait(1).to({scaleX:0.1867,scaleY:0.1867,x:100.3001,y:198.3491},0).wait(1).to({scaleX:0.1849,scaleY:0.1849,x:100.2439,y:198.3738},0).wait(1).to({scaleX:0.1832,scaleY:0.1832,x:100.1879,y:198.3984},0).wait(1).to({scaleX:0.1814,scaleY:0.1814,x:100.1321,y:198.4229},0).wait(1).to({scaleX:0.1797,scaleY:0.1797,x:100.0763,y:198.4473},0).wait(1).to({scaleX:0.1779,scaleY:0.1779,x:100.0208,y:198.4717},0).wait(1).to({scaleX:0.1762,scaleY:0.1762,x:99.9654,y:198.496},0).wait(1).to({scaleX:0.1744,scaleY:0.1744,x:99.9101,y:198.5202},0).wait(1).to({scaleX:0.1727,scaleY:0.1727,x:99.855,y:198.5444},0).wait(1).to({scaleX:0.171,scaleY:0.171,x:99.8001,y:198.5685},0).wait(1).to({scaleX:0.1692,scaleY:0.1692,x:99.7453,y:198.5926},0).wait(1).to({scaleX:0.1675,scaleY:0.1675,x:99.6906,y:198.6166},0).wait(1).to({scaleX:0.1658,scaleY:0.1658,x:99.6361,y:198.6405},0).wait(1).to({scaleX:0.1641,scaleY:0.1641,x:99.5818,y:198.6643},0).wait(1).to({scaleX:0.1624,scaleY:0.1624,x:99.5276,y:198.6881},0).wait(1).to({scaleX:0.1607,scaleY:0.1607,x:99.4736,y:198.7118},0).wait(1).to({scaleX:0.159,scaleY:0.159,x:99.4197,y:198.7354},0).wait(1).to({scaleX:0.1573,scaleY:0.1573,x:99.3659,y:198.759},0).wait(1).to({scaleX:0.1556,scaleY:0.1556,x:99.3124,y:198.7825},0).wait(1).to({scaleX:0.1539,scaleY:0.1539,x:99.2589,y:198.8059},0).wait(1).to({scaleX:0.1522,scaleY:0.1522,x:99.2057,y:198.8293},0).wait(1).to({scaleX:0.1506,scaleY:0.1506,x:99.1525,y:198.8526},0).wait(1).to({scaleX:0.1489,scaleY:0.1489,x:99.0996,y:198.8759},0).wait(1).to({scaleX:0.1472,scaleY:0.1472,x:99.0467,y:198.8991},0).wait(1).to({scaleX:0.1456,scaleY:0.1456,x:98.994,y:198.9222},0).wait(1).to({scaleX:0.1439,scaleY:0.1439,x:98.9415,y:198.9452},0).wait(1).to({scaleX:0.1423,scaleY:0.1423,x:98.8892,y:198.9682},0).wait(1).to({scaleX:0.1406,scaleY:0.1406,x:98.8369,y:198.9911},0).wait(1).to({scaleX:0.139,scaleY:0.139,x:98.7849,y:199.0139},0).wait(1).to({scaleX:0.1374,scaleY:0.1374,x:98.7329,y:199.0367},0).wait(1).to({scaleX:0.1357,scaleY:0.1357,x:98.6812,y:199.0594},0).wait(1).to({scaleX:0.1341,scaleY:0.1341,x:98.6296,y:199.0821},0).wait(1).to({scaleX:0.1325,scaleY:0.1325,x:98.5781,y:199.1046},0).wait(1).to({scaleX:0.1309,scaleY:0.1309,x:98.5268,y:199.1272},0).wait(1).to({scaleX:0.1293,scaleY:0.1293,x:98.4757,y:199.1496},0).wait(1).to({scaleX:0.1276,scaleY:0.1276,x:98.4247,y:199.172},0).wait(1).to({scaleX:0.126,scaleY:0.126,x:98.3738,y:199.1943},0).wait(1).to({scaleX:0.1244,scaleY:0.1244,x:98.3231,y:199.2165},0).wait(1).to({scaleX:0.1229,scaleY:0.1229,x:98.2726,y:199.2387},0).wait(1).to({scaleX:0.1213,scaleY:0.1213,x:98.2222,y:199.2608},0).wait(1).to({scaleX:0.1197,scaleY:0.1197,x:98.1719,y:199.2829},0).wait(1).to({scaleX:0.1181,scaleY:0.1181,x:98.1218,y:199.3049},0).wait(1).to({scaleX:0.1165,scaleY:0.1165,x:98.0719,y:199.3268},0).wait(1).to({scaleX:0.115,scaleY:0.115,x:98.0221,y:199.3486},0).wait(1).to({scaleX:0.1134,scaleY:0.1134,x:97.9725,y:199.3704},0).wait(1).to({scaleX:0.1118,scaleY:0.1118,x:97.923,y:199.3921},0).wait(1).to({scaleX:0.1103,scaleY:0.1103,x:97.8737,y:199.4137},0).wait(1).to({scaleX:0.1087,scaleY:0.1087,x:97.8245,y:199.4353},0).wait(1).to({scaleX:0.1072,scaleY:0.1072,x:97.7755,y:199.4568},0).wait(1).to({scaleX:0.1057,scaleY:0.1057,x:97.7266,y:199.4783},0).wait(1).to({scaleX:0.1041,scaleY:0.1041,x:97.6778,y:199.4997},0).wait(1).to({scaleX:0.1026,scaleY:0.1026,x:97.6293,y:199.521},0).wait(1).to({scaleX:0.1011,scaleY:0.1011,x:97.5809,y:199.5422},0).wait(1).to({scaleX:0.0997,scaleY:0.0997,x:97.5312,y:199.5655},0).wait(1).to({scaleX:0.1003,scaleY:0.1003,x:97.4543,y:199.6277},0).wait(1).to({scaleX:0.101,scaleY:0.101,x:97.3778,y:199.6896},0).wait(1).to({scaleX:0.1016,scaleY:0.1016,x:97.3014,y:199.7515},0).wait(1).to({scaleX:0.1023,scaleY:0.1023,x:97.2254,y:199.8131},0).wait(1).to({scaleX:0.1029,scaleY:0.1029,x:97.1495,y:199.8745},0).wait(1).to({scaleX:0.1036,scaleY:0.1036,x:97.0739,y:199.9357},0).wait(1).to({scaleX:0.1042,scaleY:0.1042,x:96.9985,y:199.9967},0).wait(1).to({scaleX:0.1048,scaleY:0.1048,x:96.9234,y:200.0576},0).wait(1).to({scaleX:0.1055,scaleY:0.1055,x:96.8486,y:200.1182},0).wait(1).to({scaleX:0.1061,scaleY:0.1061,x:96.774,y:200.1786},0).wait(1).to({scaleX:0.1067,scaleY:0.1067,x:96.6995,y:200.2388},0).wait(1).to({scaleX:0.1074,scaleY:0.1074,x:96.6254,y:200.2988},0).wait(1).to({scaleX:0.108,scaleY:0.108,x:96.5515,y:200.3587},0).wait(1).to({scaleX:0.1086,scaleY:0.1086,x:96.4779,y:200.4183},0).wait(1).to({scaleX:0.1093,scaleY:0.1093,x:96.4044,y:200.4778},0).wait(1).to({scaleX:0.1099,scaleY:0.1099,x:96.3312,y:200.5371},0).wait(1).to({scaleX:0.1105,scaleY:0.1105,x:96.2584,y:200.5961},0).wait(1).to({scaleX:0.1111,scaleY:0.1111,x:96.1856,y:200.655},0).wait(1).to({scaleX:0.1117,scaleY:0.1117,x:96.1132,y:200.7136},0).wait(1).to({scaleX:0.1124,scaleY:0.1124,x:96.041,y:200.7721},0).wait(1).to({scaleX:0.113,scaleY:0.113,x:95.969,y:200.8304},0).wait(1).to({scaleX:0.1136,scaleY:0.1136,x:95.8973,y:200.8884},0).wait(1).to({scaleX:0.1142,scaleY:0.1142,x:95.8259,y:200.9463},0).wait(1).to({scaleX:0.1148,scaleY:0.1148,x:95.7546,y:201.004},0).wait(1).to({scaleX:0.1154,scaleY:0.1154,x:95.6836,y:201.0614},0).wait(1).to({scaleX:0.116,scaleY:0.116,x:95.6129,y:201.1188},0).wait(1).to({scaleX:0.1166,scaleY:0.1166,x:95.5424,y:201.1758},0).wait(1).to({scaleX:0.1172,scaleY:0.1172,x:95.4721,y:201.2327},0).wait(1).to({scaleX:0.1178,scaleY:0.1178,x:95.402,y:201.2895},0).wait(1).to({scaleX:0.1184,scaleY:0.1184,x:95.3323,y:201.3459},0).wait(1).to({scaleX:0.119,scaleY:0.119,x:95.2627,y:201.4023},0).wait(1).to({scaleX:0.1196,scaleY:0.1196,x:95.1935,y:201.4583},0).wait(1).to({scaleX:0.1202,scaleY:0.1202,x:95.1244,y:201.5142},0).wait(1).to({scaleX:0.1208,scaleY:0.1208,x:95.0556,y:201.57},0).wait(1).to({scaleX:0.1213,scaleY:0.1213,x:94.9871,y:201.6255},0).wait(1).to({scaleX:0.1219,scaleY:0.1219,x:94.9187,y:201.6808},0).wait(1).to({scaleX:0.1225,scaleY:0.1225,x:94.8507,y:201.7359},0).wait(1).to({scaleX:0.1231,scaleY:0.1231,x:94.7828,y:201.7909},0).wait(1).to({scaleX:0.1237,scaleY:0.1237,x:94.7152,y:201.8456},0).wait(1).to({scaleX:0.1242,scaleY:0.1242,x:94.6478,y:201.9002},0).wait(1).to({scaleX:0.1248,scaleY:0.1248,x:94.5807,y:201.9545},0).wait(1).to({scaleX:0.1254,scaleY:0.1254,x:94.5139,y:202.0086},0).wait(1).to({scaleX:0.1259,scaleY:0.1259,x:94.4472,y:202.0626},0).wait(1).to({scaleX:0.1265,scaleY:0.1265,x:94.3808,y:202.1163},0).wait(1).to({scaleX:0.1271,scaleY:0.1271,x:94.3147,y:202.1699},0).wait(1).to({scaleX:0.1276,scaleY:0.1276,x:94.2488,y:202.2233},0).wait(1).to({scaleX:0.1282,scaleY:0.1282,x:94.1831,y:202.2764},0).wait(1).to({scaleX:0.1287,scaleY:0.1287,x:94.1177,y:202.3294},0).wait(1).to({scaleX:0.1293,scaleY:0.1293,x:94.0525,y:202.3822},0).wait(1).to({scaleX:0.1299,scaleY:0.1299,x:93.9876,y:202.4348},0).wait(1).to({scaleX:0.1304,scaleY:0.1304,x:93.9229,y:202.4871},0).wait(1).to({scaleX:0.131,scaleY:0.131,x:93.8585,y:202.5393},0).wait(1).to({scaleX:0.1315,scaleY:0.1315,x:93.7943,y:202.5913},0).wait(1).to({scaleX:0.132,scaleY:0.132,x:93.7304,y:202.6431},0).wait(1).to({scaleX:0.1326,scaleY:0.1326,x:93.6666,y:202.6947},0).wait(1).to({scaleX:0.1331,scaleY:0.1331,x:93.6031,y:202.7461},0).wait(1).to({scaleX:0.1337,scaleY:0.1337,x:93.5399,y:202.7973},0).wait(1).to({scaleX:0.1342,scaleY:0.1342,x:93.4769,y:202.8483},0).wait(1).to({scaleX:0.1347,scaleY:0.1347,x:93.4141,y:202.8991},0).wait(1).to({scaleX:0.1353,scaleY:0.1353,x:93.3517,y:202.9497},0).wait(1).to({scaleX:0.1358,scaleY:0.1358,x:93.2894,y:203.0001},0).wait(1).to({scaleX:0.1363,scaleY:0.1363,x:93.2274,y:203.0503},0).wait(1).to({scaleX:0.1369,scaleY:0.1369,x:93.1656,y:203.1004},0).wait(1).to({scaleX:0.1374,scaleY:0.1374,x:93.1041,y:203.1502},0).wait(1).to({scaleX:0.1379,scaleY:0.1379,x:93.0428,y:203.1998},0).wait(1).to({scaleX:0.1384,scaleY:0.1384,x:92.9817,y:203.2493},0).wait(1).to({scaleX:0.1389,scaleY:0.1389,x:92.9209,y:203.2985},0).wait(1).to({scaleX:0.1395,scaleY:0.1395,x:92.8604,y:203.3475},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:92.8,y:203.3964},0).wait(1).to({scaleX:0.1405,scaleY:0.1405,x:92.7399,y:203.445},0).wait(1).to({scaleX:0.141,scaleY:0.141,x:92.6801,y:203.4935},0).wait(1).to({scaleX:0.1415,scaleY:0.1415,x:92.6205,y:203.5418},0).wait(1).to({scaleX:0.142,scaleY:0.142,x:92.5611,y:203.5898},0).wait(1).to({scaleX:0.1425,scaleY:0.1425,x:92.502,y:203.6377},0).wait(1).to({scaleX:0.143,scaleY:0.143,x:92.4431,y:203.6854},0).wait(1).to({scaleX:0.1435,scaleY:0.1435,x:92.3845,y:203.7328},0).wait(1).to({scaleX:0.144,scaleY:0.144,x:92.3261,y:203.7801},0).wait(1).to({scaleX:0.1445,scaleY:0.1445,x:92.268,y:203.8272},0).wait(1).to({scaleX:0.145,scaleY:0.145,x:92.2101,y:203.8741},0).wait(1).to({scaleX:0.1455,scaleY:0.1455,x:92.1524,y:203.9208},0).wait(1).to({scaleX:0.146,scaleY:0.146,x:92.095,y:203.9672},0).wait(1).to({scaleX:0.1465,scaleY:0.1465,x:92.0379,y:204.0135},0).wait(1).to({scaleX:0.1469,scaleY:0.1469,x:91.9809,y:204.0596},0).wait(1).to({scaleX:0.1472,scaleY:0.1472,x:91.9567,y:204.0792},0).wait(64));

	// sign_obj_
	this.sign = new lib.Scene_1_sign();
	this.sign.name = "sign";
	this.sign.depth = 0;
	this.sign.isAttachedToCamera = 0
	this.sign.isAttachedToMask = 0
	this.sign.layerDepth = 0
	this.sign.layerIndex = 0
	this.sign.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sign).wait(270).to({regX:148.8,regY:-68.4,scaleX:1.9807,scaleY:1.9807,x:-0.05,y:-0.05},0).wait(261));

	// sun_obj_
	this.sun = new lib.Scene_1_sun();
	this.sun.name = "sun";
	this.sun.depth = 0;
	this.sun.isAttachedToCamera = 0
	this.sun.isAttachedToMask = 0
	this.sun.layerDepth = 0
	this.sun.layerIndex = 1
	this.sun.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sun).wait(187).to({regX:245.1,regY:177.4,scaleX:5.7175,scaleY:5.7175,rotation:-2.9904,y:0.05},0).wait(1).to({regX:316.5,regY:-7.9,scaleX:1,scaleY:1,rotation:0,x:71.45,y:-185.25},0).wait(92).to({_off:true},1).wait(250));

	// walking_shoko2_obj_
	this.walking_shoko2 = new lib.Scene_1_walking_shoko2();
	this.walking_shoko2.name = "walking_shoko2";
	this.walking_shoko2.setTransform(322.2,167.4,1,1,0,0,0,322.2,167.4);
	this.walking_shoko2.depth = 0;
	this.walking_shoko2.isAttachedToCamera = 0
	this.walking_shoko2.isAttachedToMask = 0
	this.walking_shoko2.layerDepth = 0
	this.walking_shoko2.layerIndex = 2
	this.walking_shoko2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.walking_shoko2).wait(120).to({regX:299.9,regY:209.6,scaleX:5.7175,scaleY:5.7175,rotation:-2.9904,x:322.5,y:167.55},0).to({_off:true},213).wait(198));

	// walking_shoko1_obj_
	this.walking_shoko1 = new lib.Scene_1_walking_shoko1();
	this.walking_shoko1.name = "walking_shoko1";
	this.walking_shoko1.setTransform(280.6,157.6,1,1,0,0,0,280.6,157.6);
	this.walking_shoko1.depth = 0;
	this.walking_shoko1.isAttachedToCamera = 0
	this.walking_shoko1.isAttachedToMask = 0
	this.walking_shoko1.layerDepth = 0
	this.walking_shoko1.layerIndex = 3
	this.walking_shoko1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.walking_shoko1).wait(120).to({regX:292.7,regY:207.5,scaleX:5.7175,scaleY:5.7175,rotation:-2.9904,x:280.8,y:157.7},0).to({_off:true},213).wait(198));

	// knocking_shoko_obj_
	this.knocking_shoko = new lib.Scene_1_knocking_shoko();
	this.knocking_shoko.name = "knocking_shoko";
	this.knocking_shoko.depth = 0;
	this.knocking_shoko.isAttachedToCamera = 0
	this.knocking_shoko.isAttachedToMask = 0
	this.knocking_shoko.layerDepth = 0
	this.knocking_shoko.layerIndex = 4
	this.knocking_shoko.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.knocking_shoko).wait(345).to({regX:44.3,regY:171.8,scaleX:6.2243,scaleY:6.2243,x:0.05,y:0.35},0).wait(1).to({regX:104.5,regY:227.1,scaleX:1,scaleY:1,x:60.25,y:55.4},0).wait(14).to({regX:52,regY:176.2,scaleX:7.3694,scaleY:7.3694,x:0,y:-0.35},0).wait(22).to({regX:62.8,regY:182.6,scaleX:9.8967,scaleY:9.8967,y:0.05},0).wait(18).to({regX:58.3,regY:182.1,scaleX:9.0519,scaleY:9.0519,x:0.05,y:0.45},0).wait(8).to({regX:56,regY:181.7,scaleX:8.6676,scaleY:8.6676,y:0},0).wait(9).to({regX:53.6,regY:181.3,scaleX:8.2831,scaleY:8.2831,x:0.4,y:0.05},0).wait(10).to({regX:51,regY:180.9,scaleX:7.9064,scaleY:7.9064,y:0},0).wait(104));

	// knocking_hand_obj_
	this.knocking_hand = new lib.Scene_1_knocking_hand();
	this.knocking_hand.name = "knocking_hand";
	this.knocking_hand.depth = 0;
	this.knocking_hand.isAttachedToCamera = 0
	this.knocking_hand.isAttachedToMask = 0
	this.knocking_hand.layerDepth = 0
	this.knocking_hand.layerIndex = 5
	this.knocking_hand.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.knocking_hand).wait(345).to({regX:44.3,regY:171.8,scaleX:6.2243,scaleY:6.2243,x:0.05,y:0.35},0).wait(14).to({regX:51.5,regY:176,scaleX:7.2818,scaleY:7.2818,x:0,y:0.05},0).wait(1).to({regX:52,regY:176.2,scaleX:7.3694,scaleY:7.3694,y:-0.35},0).wait(1).to({regX:99.1,regY:223.3,scaleX:1,scaleY:1,x:47.15,y:47.1},0).wait(49).to({regX:55.5,regY:181.7,scaleX:8.578,scaleY:8.578,x:0.05,y:0.45},0).wait(1).to({regX:99.1,regY:223.3,scaleX:1,scaleY:1,x:43.65,y:41.7},0).wait(7).to({regX:53.3,regY:181.2,scaleX:8.2435,scaleY:8.2435,x:0.05,y:-0.4},0).wait(1).to({regX:99.1,regY:223.3,scaleX:1,scaleY:1,x:45.85,y:42.1},0).wait(112));

	// bell_obj_
	this.bell = new lib.Scene_1_bell();
	this.bell.name = "bell";
	this.bell.setTransform(99.5,201.6,1,1,0,0,0,99.5,201.6);
	this.bell.depth = 0;
	this.bell.isAttachedToCamera = 0
	this.bell.isAttachedToMask = 0
	this.bell.layerDepth = 0
	this.bell.layerIndex = 6
	this.bell.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bell).wait(260).to({regX:199.1,regY:33.4,scaleX:1.9807,scaleY:1.9807,x:99.55},0).wait(144).to({regX:68.4,regY:204.7,scaleX:8.8538,scaleY:8.8538,x:99.65,y:201.85},0).wait(3).to({regX:67.7,regY:204.9,scaleX:8.7126,scaleY:8.7126,x:99.35,y:201.7},0).wait(3).to({regX:67.1,regY:205.2,scaleX:8.578,scaleY:8.578,x:99.55,y:202.05},0).wait(3).to({regX:66.3,regY:205.3,scaleX:8.4475,scaleY:8.4475,x:98.85,y:201.45},0).wait(3).to({regX:65.8,regY:205.6,scaleX:8.3231,scaleY:8.3231,x:99.9,y:201.85},0).wait(3).to({regX:65.2,regY:205.8,scaleX:8.2033,scaleY:8.2033,x:100.1},0).wait(112));

	// street_obj_
	this.street = new lib.Scene_1_street();
	this.street.name = "street";
	this.street.setTransform(329.6,163.2,1,1,0,0,0,329.6,163.2);
	this.street.depth = 0;
	this.street.isAttachedToCamera = 0
	this.street.isAttachedToMask = 0
	this.street.layerDepth = 0
	this.street.layerIndex = 7
	this.street.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.street).wait(278).to({regX:102.5,regY:188.3,scaleX:2.8244,scaleY:2.8244,x:329.45,y:163},0).wait(75).to({regX:97,regY:198.2,scaleX:6.7927,scaleY:6.7927,x:329.8,y:162.7},0).wait(18).to({regX:96.4,regY:198.7,scaleX:8.4683,scaleY:8.4683,x:329.45,y:163.05},0).wait(121).to({regX:89.9,regY:203.4,scaleX:6.7962,scaleY:6.7962,x:330,y:163.15},0).wait(39));

	// clouds_obj_
	this.clouds = new lib.Scene_1_clouds();
	this.clouds.name = "clouds";
	this.clouds.setTransform(196.7,48.1,1,1,0,0,0,196.7,48.1);
	this.clouds.depth = 0;
	this.clouds.isAttachedToCamera = 0
	this.clouds.isAttachedToMask = 0
	this.clouds.layerDepth = 0
	this.clouds.layerIndex = 8
	this.clouds.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.clouds).wait(1).to({regX:224.5,regY:48.2,x:224.5,y:48.2},0).wait(277).to({_off:true},1).wait(252));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(171.3,95.8,528.2,250.5);
// library properties:
lib.properties = {
	id: '82CE74784903604394B99BDB1C4CAFF1',
	width: 688,
	height: 334,
	fps: 30,
	color: "#57B1EE",
	opacity: 1.00,
	manifest: [
		{src:"sounds/adonShokoMP3.mp3?1618938140521", id:"adonShokoMP3"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['82CE74784903604394B99BDB1C4CAFF1'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;