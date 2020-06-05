#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const fs = require('fs');

console.log(chalk.blue('APP CLI'))

program
  .version('1.0.0')
  .description('App cli system!');

program
  .command('add:user <name> [role]')
  .alias('add-user')
  .description('Add user to system')
  .action(async (name, role) => {
    console.log(chalk.green(`Added user ${name} with role ${role}`))
    process.exit();
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);
