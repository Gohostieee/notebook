import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {Bookbag, NotebookFramework, Notebook} from "../interfaces";
import {BaseDirectory, createDir, readDir, writeBinaryFile, readBinaryFile} from '@tauri-apps/api/fs';
import {getDateTime, getMonthDayY} from "../lib/formating";
import {readFile} from "fs";
import Link from "next/link";

const Home: NextPage = () => {
    let utf8Encode = new TextEncoder();
    let utf8Decode = new TextDecoder()
    const buttonStyle = "rounded-lg border-2 w-[180px] h-[140px] bg-black hover:bg-cyan-400 hover:bg-opacity-30 bg-opacity-10 hover:border-blue-500 transition-colors duration-300 p-8 pb-12 pt-12 block m-auto border-gray-500\n"
    const [bag, useBag] = useState<Bookbag>(null), [menu, useMenu] = useState<string>("create"), [error, useError] = useState(""), [load, useLoad] = useState(false);

    function ChangeMenu(menu: string) {
        useMenu(menu)
    }

    async function SubmitData(x) {
        let val: string | null;
        let notebook = new Notebook({description: "", teacher: "", title: "", pages: []});
        let err = ""
        let tempMenu = menu
        x.preventDefault()
        for (const element in x.target.elements) {
            if (x.target.elements[element].type == "text") {
                val = x.target.elements[element].value
            } else {
                continue;
            }
            if (val == "" || val == undefined) {
                err = `${x.target.elements[element].id.toUpperCase()} is missing!`
                break;

            } else {
                notebook[x.target.elements[element].id] = val;
            }
        }
        useError(err);
        if (err === "") {
            try {
                await readDir("notebook//saves", {dir: BaseDirectory.Document});
            } catch (err) {
                await createDir('notebook//saves', {dir: BaseDirectory.Document, recursive: true});
            }
            try {
                await writeBinaryFile(`notebook//saves//${notebook.title}-${getDateTime(notebook.date)}.NTBK`, utf8Encode.encode(JSON.stringify(notebook)), {dir: BaseDirectory.Document});
                tempMenu = "main"
            } catch (err) {
                tempMenu = "main"
            }

        }
        useMenu(tempMenu)
    }

    const SwitchMenu = () => {
        switch (menu) {
            case "main":
                return (
                    <div
                        className={"grid grid-rows-2 font-mono text-black grid-cols-2 w-[420px] h-[340px] m-auto border-b-2 border-emerald-500 pb-8"}>
                        <button onClick={() => {
                            ChangeMenu("create")
                        }} className={buttonStyle}>New Notebook
                        </button>
                        <button className={buttonStyle}>More...</button>
                        <button className={buttonStyle}>Exit</button>
                        <button className={buttonStyle}>Settings</button>
                    </div>
                )
            case "create":
                return (
                    <div className={"flex flex-col w-[420px] m-auto border-2 border-emerald-500 p-8"}>
                        <p className={"text-red-400 text-xl"}>{error}</p>
                        <form onSubmit={SubmitData}>
                            <div className={"mt-4"}>
                                <h1 className={"text-xl font-mono border-b-2 border-emerald-500 mb-2 "}>Title</h1>
                                <input type={"text"} id={"title"}
                                       className={"w-[100%] border-2 border-fuchsia-500 focus:outline-1"}/>
                            </div>

                            <div className={"mt-4"}>
                                <h1 className={"text-xl font-mono border-b-2 border-emerald-500 mb-2 "}>Teacher</h1>
                                <input id={"teacher"}
                                       className={"w-[100%] border-2 border-fuchsia-500 focus:outline-1"}/>
                            </div>

                            <div className={"mt-4"}>
                                <h1 className={"text-xl font-mono border-b-2 border-emerald-500 mb-2 "}>Description</h1>
                                <input id={"description"}
                                       className={"w-[100%] border-2 border-fuchsia-500 focus:outline-1"}/>
                            </div>

                            <div className={"flex mt-4"}>
                                <button onClick={() => {
                                    ChangeMenu("main")
                                }} className={buttonStyle + " h-[46px] font-mono p-0 pt-0 pb-0 mr-4"}>Back
                                </button>
                                <button type={"submit"}
                                        className={buttonStyle + " h-[46px] font-mono p-0 pt-0 pb-0 mr-4"}>Create
                                </button>

                            </div>
                        </form>
                    </div>
                )
        }
    }

    async function GetBag() {
        let files;
        let tempBag = new Bookbag({Notebooks: [], Length: 0});
        let tempNote: Notebook;
        try {
            files = await readDir("notebook//saves", {dir: BaseDirectory.Document});
            for (const file in files) {
                try {
                    if (files[file].name.endsWith(".NTBK")) {
                        tempBag.Notebooks.push(JSON.parse(utf8Decode.decode(await readBinaryFile(files[file].path))));
                        tempBag.Length += 1;
                    }

                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            await createDir('notebook//saves', {dir: BaseDirectory.Document, recursive: true});
        }
        useBag(tempBag);
        localStorage.setItem("bag",JSON.stringify(tempBag));
    }

    function parseBookbag() {
        let element: JSX.Element[] = []
        if (bag == null) {
            return element
        }
        for (const notebook in bag.Notebooks) {
            element.push(
                <Link href={`/notebook/${notebook}`}>
                    <button
                        className={"h-[42px] w-[100%] bg-black border-x-2 border-gray-500 hover:bg-cyan-400 hover:bg-opacity-30 bg-opacity-10 hover:border-blue-500 transition-colors duration-300"}>{bag.Notebooks[notebook].title} {getMonthDayY(bag.Notebooks[notebook].date)}
                    </button>
                </Link>
            )
        }
        return element
    }

    useEffect(() => {
        GetBag()
    }, [])
    return (

        <div className={""}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={"mt-24"}>
                {SwitchMenu()}

                {load ?
                    <div onClick={function Edit() {
                        useLoad(false)
                    }}
                         className={"w-[460px] max-h-[9999px] transition-all duration-300 border-b-2 overflow-hidden z-0 relative border-black font-mono rounded-md mt-8 m-auto"}>
                        <button
                            className={"h-[42px] w-[100%] relative bg-black border-2 border-gray-500 hover:bg-cyan-400 hover:bg-opacity-30 bg-opacity-10 hover:border-blue-500 transition-colors duration-300"}>Load
                            notebooks
                        </button>
                        {parseBookbag()}
                    </div>
                    :
                    <div
                        className={"w-[460px] max-h-[42px] overflow-hidden z-0 relative transition-all duration-300 border-black font-mono rounded-md mt-8 mb-24 m-auto"}>
                        <button onClick={function Edit() {
                            useLoad(true)
                        }}
                                className={"h-[42px] w-[100%] relative bg-black border-2 border-gray-500 hover:bg-cyan-400 hover:bg-opacity-30 bg-opacity-10 hover:border-blue-500 transition-colors duration-300"}>Load
                            notebooks
                        </button>
                        {parseBookbag()}
                    </div>}
            </main>


        </div>
    )
}

export default Home
