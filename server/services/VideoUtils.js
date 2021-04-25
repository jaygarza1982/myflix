const exec = require('child_process').exec;

const formatSeconds = seconds => {
    const time = seconds ? seconds : 0;

    return `${new Date(time * 1000).toISOString().substr(11, 11)}`;
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

exports.exportVideoSegment = (inputPath, outputPath, startSeconds, endSeconds, callback) => {

    //Format our seek seconds and time after seek with HH:MM:SS.XX
    const seekSeconds = formatSeconds(startSeconds);

    //Second parameter in FFMPEG is the amount of seconds after the seek
    const timeAfterSeek = formatSeconds(endSeconds - startSeconds);

    const cmd = `ffmpeg -ss ${seekSeconds} -t ${timeAfterSeek} -i "${inputPath}" "${outputPath}" -y`;
    console.log(`Executing command "${cmd}"`);
    
    exec(cmd, function (error, stderr, stdout) {
        if (stderr) return callback(stderr);

        if (error) return callback(error);

        return callback();
    });
}
