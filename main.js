// Require
var watchr = require('watchr');

// Watch a directory or file
console.log('Watch our paths');
watchr.watch({
    paths: ['./images'],
//    intervals: 2000, 
    preferredMethods: ['watchFile','watch'],
    listeners: {
        log: function(logLevel){
            console.log('a log message occured:', arguments);
        },
        error: function(err){
            console.log('an error occured:', err);
        },
        watching: function(err,watcherInstance,isWatching){
            if (err) {
                console.log("watching the path " + watcherInstance.path + " failed with error", err);
            } else {
                console.log("watching the path " + watcherInstance.path + " completed");
            }
        },
        change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
                console.log(filePath);
		if (changeType === 'create') {
                    var im = require('imagemagick');
                    console.log(filePath);
                    im.readMetadata('./' + filePath, function(err, metadata) {
                        if (err)
                            throw err;
                        console.log('Shot at ' + metadata.exif.dateTimeOriginal)
                    })
            }
            console.log('a change event occured:',arguments);
        }
    },
    next: function(err,watchers){
        if (err) {
            return console.log("watching everything failed with error", err);
        } else {
            console.log('watching everything completed', watchers);
        }

        // Close watchers after 60 seconds
        setTimeout(function(){
            var i;
            console.log('Stop watching our paths');
            for ( i=0;  i<watchers.length; i++ ) {
                watchers[i].close();
            }
        },60*1000);
    }
});
