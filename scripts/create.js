'use strict';

// path
const path =  require('path');
// generate new child process and pass args
const {spawn}= require('child_process');
// specify or match filenames or a set of arbitrary strings
const glob = require('glob');
// highlight console
const chalk = require('chalk');
// file operator
var fs = require("fs")
// template tool https://handlebarsjs.com/guide/
const handlebars = require('handlebars');
const { error } = require('console');

/**
 *  abc-xyz => AbcXyz
 *  @param {*} str
 */

const regularToUpperCase = str => str.replace(/-[a-zA-Z]/g, match => match.toUpperCase()).replace(/^.{1}/, match => match.toUpperCase());
const regularTolowerCase = str => str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`).replace(/^-/g,'');

const commandArg = process.argv[2];
const dirName = commandArg && regularTolowerCase(commandArg);
const componentName = commandArg && regularToUpperCase(commandArg);

const dirPath =  path.join( process.cwd(), `src/components/${componentName}`);
(()=>{
    // generate command to create the folder
    spawn('mkdir', ['-p',dirPath]);
    // search all template files sychronously 
    const templateFiles = glob.sync(path.join(__dirname, 'templates/*.hbs'));
    templateFiles.forEach(filePath => {
        try{
            fs.readFile(filePath,'utf-8',(error,data)=>{
                if(error){
                    console.log(chalk.red(error));
                    return;
                }
                const template = handlebars.compile(data);
                 const templateResult = template({
                    dirName,
                    componentName
                });
                // generate new path: component.tsx.hbs => Component.tsx
                const newFilePath = filePath.replace('scripts/templates',  `src/components/${componentName}`)
                                            .replace('Component', componentName)
                                            .replace('.hbs', '');
                fs.writeFile(newFilePath, templateResult, (error)=>{error && console.log(chalk.red(error))});
                console.log(chalk.green(`write ${newFilePath} successfully`));
            });
        }catch(error){
            console.log(chalk.red(error));
        }
    });


})();

