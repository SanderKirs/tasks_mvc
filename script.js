//-----Model-----//
class Model {
    constructor() {
        this.tasks = [
            {id:1, text:'Be Good', complete:false},
            {id:2, text:'Be Nice', complete:false}
        ]
    }
    addTask(taskText){
        let id
        if(this.tasks.length > 0) {
            id = this.tasks[this.tasks.lenght - 1].id + 1
        } else {
            id = 1
        }
        const task = {
            id: id, text: taskText, complete: false
        }
        this.tasks.push(task)
        this.ifTaskListChanged(this.tasks)
    }
    taskListChanged(callback){
        this.ifTaskListChanged = callback
    }
}

//-----View-----//
    class View {
        constructor() {
            this.app = this.getElement('#root')
            this.title = this.setElement('hl')
            this.title.textContent = 'Tasks'
            this.form = this.setElement('form')
            this.input = this.setElement('input')
            this.input.type = 'text'
            this.input.placeholder = 'Add task'
            this.submitButton = this.setElement('button')
            this.submitButton.textContent = 'Add'
            this.form.append(this.input, this.submitButton)
            this.taskList = this.setElement('ul')
            this.app.append(this.title, this.form,  this.taskList)
        }
        displayTasks(tasks){
            while(this.taskList.firstChild){
                this.taskList.removeChild(this.taskList.firstChild)
            }
            tasks.forEach(task => {
                const li = this.setElement('li')
                li.id = task.id
                const span = this.setElement('span')
                li.append(span)
                this.taskList.append(li)
            })
        }
        addTask(handler){
            this.form.addEventListener('submit', event => {
                event.preventDefault()
                if(this.input.value !== '') {
                    handler(this.input.value)
                    this.input.value = ''
                }
            })
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

//-----Controller-----//
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.taskListChanged(this.displayTasks)
        this.view.addTask(this.handleAddTask)
        this.displayTasks(this.model.tasks)
    }
    displayTasks = tasks => {
        this.view.displayTasks(tasks)
    }
    handleAddTask = taskText => {
        this.model.addTask(taskText)
    }
}

const app = new Controller(new Model(), new View())