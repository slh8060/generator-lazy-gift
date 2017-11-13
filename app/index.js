'use strict';


const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the prime ' + chalk.red('generator-lazy-gift') + ' generator!'
        ));

        const prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What is your project name ?',
            default: "lazy-gift"
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        this.fs.copy(
            this.templatePath('lazy-gift-server/bin'),
            this.destinationPath('lazy-gift-server/bin')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-server/db/'),
            this.destinationPath('lazy-gift-server/db/')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-server/public/'),
            this.destinationPath('lazy-gift-server/public/')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-server/routes'),
            this.destinationPath('lazy-gift-server/routes')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-server/views/'),
            this.destinationPath('lazy-gift-server/views/')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-server/app.js'),
            this.destinationPath('lazy-gift-server/app.js')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-server/package.json'),
            this.destinationPath('lazy-gift-server/package.json')
        );




        this.fs.copy(
            this.templatePath('lazy-gift-ui/cfg'),
            this.destinationPath('lazy-gift-ui/cfg')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-ui/src'),
            this.destinationPath('lazy-gift-ui/src')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-ui/test'),
            this.destinationPath('lazy-gift-ui/test')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-ui/karma.conf.js'),
            this.destinationPath('lazy-gift-ui/karma.conf.js')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-ui/package.json'),
            this.destinationPath('lazy-gift-ui/package.json')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-ui/server.js'),
            this.destinationPath('lazy-gift-ui/server.js')
        );
        this.fs.copy(
            this.templatePath('lazy-gift-ui/webpack.config.js'),
            this.destinationPath('lazy-gift-ui/webpack.config.js')
        );
        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        );
    }

};


