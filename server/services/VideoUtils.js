const exec = require('child_process').exec;

const formatSeconds = seconds => {
    const time = seconds ? seconds : 0;

    return `${new Date(time * 1000).toISOString().substr(11, 11)}`;
}

const hmsToSeconds = hms => {
    const split  =  hms.split(':');
    const secondsArray = split.reverse().map((t, index) => t * Math.pow(60, index));

    return secondsArray.reduce((a, i) => a += i);
}

exports.exportImage = (inputPath, outputPath, startSeconds, callback) => {
    const time = startSeconds ? startSeconds : 0;
    
    const cmd = `ffmpeg -ss ${new Date(time * 1000).toISOString().substr(11, 11)} -i "${inputPath}" -vframes 1 -q:v 5 "${outputPath}" -y`;
    console.log(`Executing command "${cmd}"`);
    
    exec(cmd, (error, stderr, stdout) => {
        if (stderr) return callback(stderr);

        if (error) return callback(error);

        return callback();
    });
}

exports.exportVideoSegment = (inputPath, outputPath, startTime, endTime, callback) => {
    //Second parameter in FFMPEG is the amount of seconds after the seek
    //We take our start and end time from HHMMSS to seconds in order to calculate the difference
    //Then we format it as HHMMSS for FFMPEG
    const timeAfterSeek = formatSeconds(hmsToSeconds(endTime) - hmsToSeconds(startTime));

    //Our start time is already HH:MM:SS
    const cmd = `ffmpeg -ss ${startTime} -t ${timeAfterSeek} -i "${inputPath}" "${outputPath}" -y`;
    console.log(`Executing command "${cmd}"`);
    
    exec(cmd, function (error, stderr, stdout) {
        if (stderr) return callback(stderr);

        if (error) return callback(error);

        return callback();
    });
}
