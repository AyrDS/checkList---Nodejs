const Task = require("./task");
require('colors');

class Tasks {

    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTaskFromArray(arr = []) {
        arr.forEach(task => {
            this._list[task.id] = task;
        });
    }


    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listComplete() {
        console.log();
        this.listArr.forEach((task, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completedOn } = task;
            const completed = completedOn ? `Completed on ${completedOn}`.green : 'Not completed'.red;

            console.log(`${idx} ${desc} : ${completed}`);

        })
    }

    listCompletedPending(completed = true) {
        console.log();
        let counter = 0;
        this.listArr.forEach(task => {
            const { desc, completedOn } = task;
            const state = completedOn ? `Completed on ${completedOn}`.green : 'Not completed'.red;

            if (completed) {
                if (completedOn) {
                    counter += 1;
                    console.log(`${(counter + '.').green} ${desc} : ${state}`);
                }
            } else {
                if (!completedOn) {
                    counter += 1;
                    console.log(`${(counter + '.').green} ${desc} : ${state}`);
                }
            }
        })
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completedOn) {
                task.completedOn = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedOn = null;
            }
        })
    }
}

module.exports = Tasks;