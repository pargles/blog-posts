'use strict';
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const user_agent = headers['user-agent'];
    const host = headers['host'];
    if (user_agent && host) {
        var prerender = /googlebot|adsbot\-google|Feedfetcher\-Google|bingbot|yandex|baiduspider|Facebot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator/i.test(user_agent[0].value);
        prerender = prerender || /_escaped_fragment_/.test(request.querystring);
        prerender = prerender && ! /\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)$/i.test(request.uri);
        if (prerender) {
            console.log("crawler request, adding prerender headers")
            headers['x-prerender-token'] = [{ key: 'X-Prerender-Token', value: 'YOUR_TOKEN_HERE'}];
            headers['x-prerender-host'] = [{ key: 'X-Prerender-Host', value: host[0].value}];
            headers['x-prerender-cachebuster'] = [{ key: 'X-Prerender-Cachebuster', value: Date.now().toString()}];
        }
    }
    callback(null, request);
};