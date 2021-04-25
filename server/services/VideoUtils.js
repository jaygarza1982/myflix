const exec = require('child_process').exec;

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