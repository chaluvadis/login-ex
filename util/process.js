module.exports = {
    Encode : function(file, fs) {
        return fs.readFileSync(file);
    },
    Decode : function(data){
        return new Buffer(data.toString(), 'base64').toString('ascii');
    }
}