import {useRouter} from 'next/router'
import {useEffect, useRef, useState} from "react";
import {Bookbag, Notebook} from "../../interfaces";
import {getMonthDayY} from "../../lib/formating";
import {SaveFile} from "../../lib/fileManipulation";


export default function NotebookPage() {
    /*
    Unos de los temas mas  questionados en la historia humana definitivamente tendria que ser la mente humana. Uno de los temas mas topicos con respecto a esto seria la identidad.
    Un tema el cual el autor Amin Malouf, el cual debate el tema por medio de anecdotas personales y argumentos logicos y racionales

    La identidad esta relacionada a muchos aspectos de mi vida, tanto yo como todos los demas. Lo que me hace unico no seria solo mis huellas dactiles, mi cara particular, mis disgustos o disgustos.
    Esto significa que mi identidad es algo significativamente fragil, el cual esta en un constante estado de cambio y movimiento. Todas las decisioens que tomo ayudan  a moldear mi futura identidad, reflejando
    mi pasada identidad. Esto es lo correcto y se puede sustentar con siglos de filosofia, Hace miles de anyos, unas de las mas grandes mentes de la filosofia griega se questionaban esto mismo. Ellos llegaron a la
    conclusion que lo unico que te puede formar a ti, son tus memorias, alguien puede tener un cuerpo identico al tuyo, puede tener tu misma personalidad, todas tus amistades, tu gustos y disgustos, pero algo que no
    puede tener son tus memorias, tus memorias son solo tuyas y nadie mas puede ser tu, un ser puede ser creado con todas tus mismas memorias, pero en algun momento, ese ser se va a desviar tu volveras a ser tu.
     s


     segundo borrador de la resenya, mas informacion menos conocimiento
     */
    const pageRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const {id} = router.query;
    const [notebook, useNotebook] = useState<Notebook>(null), [page, usePage] = useState<number>(null),[refresh,useRefresh] = useState(0);
    function doc_keyUp(e) {

        if (e.ctrlKey && e.key === 'ArrowDown') {
            console.log("kys")
        }
    }
    const NewPage = () => {
        notebook.pages.push(<div> wow</div>)
        console.log("kys",notebook.pages[page],notebook.pages[0],page)
        useNotebook(notebook)
        useRefresh(refresh+1)
    }
    const GetNotebook = () => {
        useNotebook(JSON.parse<Bookbag>(localStorage.getItem("bag"))?.Notebooks[id])
        usePage(0);
    }
    useEffect(() => {
        GetNotebook();
        document.addEventListener('keyup', doc_keyUp, false);

        console.log(notebook)
    }, [])
    useEffect(() => {
        if (page === notebook?.pages.length) {
            console.log("wow")
            NewPage()
            console.log(notebook.pages)
        }
    }, [page])
    return (
        <div>
            <p className={"font-thin underline text-2xl underline-offset-4 text-center"}>Notebook
                number: {id * 1 + 1 /*I'm dead 💀💀💀, I was going to do type conversions and decided to try this as a joke, javascript is a meme man 💀💀💀*/}</p>
            {
                notebook != null &&
                <>

                    <div className={"flex justify-center mt-4"}>
                        <p className={"font-thin underline text-2xl underline-offset-4 m-6"}>Title: {notebook.title}</p>
                        <p className={"font-thin underline text-2xl underline-offset-4 m-6"}>Teacher: {notebook.teacher}</p>
                        <p className={"font-thin underline text-2xl underline-offset-4 m-6"}>Date: {getMonthDayY(notebook.date)}</p>
                        {notebook.pages.length > 1 ?
                            <p className={"font-thin underline text-2xl underline-offset-4 m-6"}>{notebook.pages.length} Pages</p>
                            :
                            <p className={"font-thin underline text-2xl underline-offset-4 m-6"}>{notebook.pages.length} Page</p>

                        }
                    </div>
                    <p className={"font-thin underline text-2xl underline-offset-4 text-center"}>{notebook.description}</p>
                    <div className={"flex justify-center border-y border-black w-[60%] m-auto mt-8"}>
                        <button className={"font-light text-2xl p-4 border border-black m-4"}>back</button>
                        <button onClick={()=>{SaveFile(notebook)}} className={"font-light text-2xl p-4 border border-black m-4"}>save</button>
                        <button className={"font-light text-2xl p-4 border border-black m-4"}>Go to page:</button>
                        <input max={notebook?.pages.length} className={"font-light text-2xl w-24 p-4 border border-black m-4"}/>
                    </div>
                    <div contentEditable={true} className={"border border-gray-500 mt-2 p-4 w-[80%] m-auto"} ref = {pageRef}>
                        {notebook.pages[page]}
                    </div>
                </>

            }

        </div>
    )
}