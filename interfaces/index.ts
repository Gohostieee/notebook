export interface NotebookFramework {
    pages:JSX.Element[],
    title:string,
    teacher:string,
    description:string,
    date?:Date,
}

export class Notebook implements NotebookFramework {
    date: Date = new Date()
    title: string;
    teacher: string
    description: string;
    pages: JSX.Element[];
    constructor({title, pages, teacher, description}:NotebookFramework) {
        this.title = title
        this.pages = pages
        this.teacher = teacher
        this.description = description
    }

    setter({title, pages, teacher, description}:NotebookFramework) {
        this.title = title
        this.pages = pages
        this.teacher = teacher
        this.description = description
    }
    setPage({index,page}){
        this.pages[index] = page;
    }
}
export interface BookbagFramework {
    Notebooks:Notebook[]
    Length: number
}
export class Bookbag implements BookbagFramework {
    Notebooks: Notebook[];
    Length = 0;
    constructor({Notebooks,Length}:BookbagFramework) {
        this.Notebooks = Notebooks;
        this.Length = Length;
    }

}
function AddNotebook (Bag:Bookbag,{title,teacher,description,pages}:NotebookFramework) {
    Bag.Notebooks.push(new Notebook({title, teacher, description, pages}))
}


