import {BaseDirectory, createDir, readDir, writeBinaryFile} from "@tauri-apps/api/fs";
import {getDateTime} from "./formating";
import {Notebook} from "../interfaces";
import {TextEncoder} from "util";


export async function SaveFile(notebook:Notebook) {
    const utf8Encode = new TextEncoder()
    try {
        await readDir("notebook//saves", {dir: BaseDirectory.Document});
    } catch (err) {
        await createDir('notebook//saves', {dir: BaseDirectory.Document, recursive: true});
    }
    try {
        await writeBinaryFile(`notebook//saves//${notebook.title}-${getDateTime(notebook.date)}.NTBK`, utf8Encode.encode(JSON.stringify(notebook)), {dir: BaseDirectory.Document});
        return 1;
    } catch (err) {
        return 0;
    }
}