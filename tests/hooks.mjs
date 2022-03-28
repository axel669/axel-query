import path from "path"

export function beforeFile(filename) {
    console.group(filename)
    process.chdir(
        path.dirname(filename)
    )
}
export function afterFile(filename) {
    console.groupEnd()
}
