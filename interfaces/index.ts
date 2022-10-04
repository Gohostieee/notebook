export interface NotebookFramework {
    pages:JSX.Element[],
    title:string,
    teacher:string,
    description:string,
    date?:Date
}

export class Notebook implements NotebookFramework {
    date: Date = new Date()
    title: string;
    teacher: string
    description: string;
    pages: JSX.Element[];
    constructor({title, pages, teacher, description}) {
        this.title = title
        this.pages = pages
        this.teacher = teacher
        this.description = description
    }


}
export interface Bookbag {
    Notebooks:Notebook[]
}
function AddNotebook (Bag:Bookbag,{title,teacher,description,pages}:NotebookFramework) {
    Bag.Notebooks.push(new Notebook({title, teacher, description, pages}))
}


