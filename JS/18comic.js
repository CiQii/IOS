var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/CiQii/IOS/Html/18comic.css" type="text/css">');
$done({ body });
