function ReloadPlugin() { };

ReloadPlugin.prototype.apply = function (compiler) {
    var io = require('socket.io')(8196);
    var files,
        refresh = false;
    const newConnection = function () {
        const socket = io.connect('http://localhost:8196/');

        socket.on('reload', function () {
            window.location.reload();
        });
    };

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            if (files) {
                refresh = files[htmlPluginData.outputName] !== htmlPluginData.html;
            } else {
                files = {};
            }
            files[htmlPluginData.outputName] = htmlPluginData.html;
            htmlPluginData.html += '<script src="http://localhost:8196/socket.io/socket.io.js"></script>';
            htmlPluginData.html += '<script>var socket = io.connect("http://localhost:8196");socket.on("reload", function(){window.location.reload()});</script>'
            callback(null, htmlPluginData);
        });

        compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
            if (refresh) {
                io.emit('reload');
            }
            refresh = false;
            callback(null, htmlPluginData);
        });
    });
};

module.exports = ReloadPlugin;