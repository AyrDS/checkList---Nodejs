require('colors');
const { inquirerMenu, pause, readInput, listTaskDelete, confirm, showListChecklist } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');


const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if (tasksDB) {
        tasks.loadTaskFromArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':  //Create option
                const desc = await readInput('Enter a description:');
                tasks.createTask(desc);
                break;

            case '2':
                tasks.listComplete();
                break;

            case '3':
                tasks.listCompletedPending(true);
                break;

            case '4':
                tasks.listCompletedPending(false);
                break;

            case '5': //Complete tasks
                const ids = await showListChecklist(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;

            case '6':  //Delete Task
                const id = await listTaskDelete(tasks.listArr);
                if (id !== '0') {
                    const confirmDelete = await confirm(`Are you sure?`);
                    if (confirmDelete) {
                        tasks.deleteTask(id);
                        console.log('Task deleted'.green);
                    }
                }
                break;
        }

        saveDB(tasks.listArr);

        await pause();
    } while (opt !== '0');
}

main();