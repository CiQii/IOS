var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://raw.githubusercontent.com/CiQii/IOS/master/Html/supjav.css" type="text/css">');
$done({ body });
