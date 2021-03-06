require('colors');

const showMenu = () => {
    return new Promise((resolve) => {
        console.clear();

        console.log('==========================='.green);
        console.log('     Choose an option'.green);
        console.log('===========================\n'.green);

        console.log(`${'1.'.green} Create task`);
        console.log(`${'2.'.green} List task`);
        console.log(`${'3.'.green} List completed tasks`);
        console.log(`${'4.'.green} List pending tasks`);
        console.log(`${'5.'.green} Completing task(s)`);
        console.log(`${'6.'.green} Delete task(s)`);
        console.log(`${'0.'.green} Out \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Choose an option: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    })
}

const pause = () => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPress ${'ENTER'.green} to continue\n`, () => {
            readline.close();
            resolve();
        });
    })

}

module.exports = {
    showMenu,
    pause
}