const template = (options) => `<!doctype html>
<html>
    <head>
        <title>${options.title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width" />
        <link rel="icon" type="image/png" href="https://axel669.net/images/megaman-rounded.png" />

        <link rel="stylesheet" type="text/css" href="/codemirror.css" />
        <link rel="stylesheet" type="text/css" href="/theme/the-matrix.css" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/default.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/base16/windows-high-contrast.css">
    </head>

    <body>
        <script src="/codemirror.js"></script>
        <script src="/mode/javascript/javascript.js"></script>

        <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/languages/json.min.js"></script>

        <script src="${options.files.js[0].fileName}"></script>
    </body>
</html>
`

export default template
