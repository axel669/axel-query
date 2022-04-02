import path from "path"

const baseDir = process.cwd()

export function beforeFile(filename) {
    console.group(filename)
    process.chdir(
        path.dirname(filename)
    )
}
export function afterFile(filename) {
    process.chdir(baseDir)
    console.groupEnd()
}
