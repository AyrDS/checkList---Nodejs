const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List task`
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Completing task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task(s)`
            },
            {
                value: '0',
                name: `${'0.'.green} Out`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();

    console.log('==========================='.green);
    console.log('     Choose an option'.white);
    console.log('===========================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a description';
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listTaskDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete task',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'confirm',
            message
        }
    ]

    const { confirm } = await inquirer.prompt(question);

    return confirm;
}

const showListChecklist = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedOn) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTaskDelete,
    confirm,
    showListChecklist
}