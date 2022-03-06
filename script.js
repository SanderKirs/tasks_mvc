class Model {
    constructor() {
        this.tasks = [
            {id:1, text:'Be Good', complete:false},
            {id:2, text:'Be Nice', complete:false}
        ]
    }
}
    class View {
        constructor() {
            this.app = this.getElement('#root')
            this.title = this.setElement('hl')
            this.title.textContent = 'Tasks'
            this.taskList = this.setElement('ul')
            this.app.append(this.title, this.taskList)
        }
        getElement(selector){
            const element = document.querySelector(selector)
            return element
        }
        setElement(tag, classname){
            const element = document.querySelector(tag)
            if(classname !== undefined){
                element.classlist.add(classname)
            }
            return element
        }
}
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())