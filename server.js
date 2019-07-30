let express = require('express');
let serveStatic = require('serve-static');
let history = require('connect-history-api-fallback');

app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));

app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers.host === 'ally-gg-frontend.herokuapp.com')
            return res.redirect(301, 'https://ally.gg');
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    } else
        return next();
});

let port = process.env.PORT || 5000;
app.listen(port);