import svelte from "rollup-plugin-svelte"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import html from "@rollup/plugin-html"
import del from "rollup-plugin-delete"

import copy from "./plugins/copy.js"
import simpleLocation from "./plugins/simple-location"

import appInfo from "./app-info.js"
import template from "./html-template.js"

export default {
    input: "./src/main.js",
    output: {
        file: `${appInfo.output}/app-d${Date.now()}.js`,
        format: "iife",
    },
    plugins: [
        del({ targets: `${appInfo.output}/*` }),
        svelte(),
        simpleLocation,
        resolve(),
        commonjs(),
        html({
            filename: `${appInfo.output}/index.html`,
            title: appInfo.name,
            template,
        }),
        copy("static", appInfo.output)
    ]
}
