import {readFileSync} from 'fs'

export async function readWarningData(key: string) {
    return readFileSync(`./${key}.xml`, { encoding: "utf-8" });
}

