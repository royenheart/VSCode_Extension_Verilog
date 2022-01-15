'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "verilog-testbench-instance" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.instance', () => {
        // The code can get the document name and then it activates python code to generate instance
        let editor = vscode.window.activeTextEditor;
        if(!editor){
            return;
        }
        let ter1 = vscode.window.createTerminal({name:'instance'});
        ter1.show(true);
        ter1.sendText(`python ${__dirname}\\vInstance_Gen.py ${editor.document.fileName}`);

        // Display a message box to the user
        vscode.window.showInformationMessage('Generate instance successfully!');
    });

    context.subscriptions.push(disposable);

    let testbench = vscode.commands.registerCommand('extension.testbench', () => {
        // The code can get the document name and then it activates python code to generate testbench
        let editor = vscode.window.activeTextEditor;
        if(!editor){
            return;
        }
        let ter1 = vscode.window.createTerminal({name:'testbench'});
        ter1.show(true);
        ter1.sendText(`python ${__dirname}\\vTbgenerator.py ${editor.document.fileName}`);

        // Display a message box to the user
        vscode.window.showInformationMessage('Generate testbench successfully!');
    });

    context.subscriptions.push(testbench);

    let get_testbench_file = vscode.commands.registerCommand('extension.get_testbench_file', () => {
        // The code can get the document name and then it activates python code to generate testbench
        // Then it will generate the testbench file

        vscode.window.showSaveDialog( {
            filters: {
                v: ['v'],
            },
            saveLabel: "save as"
        }).then(__filename => {
            let editor = vscode.window.activeTextEditor;
            if(!editor || !__filename){
                return;
            }
            let ter1 = vscode.window.createTerminal({name:'get_testbench_file'});
            ter1.show(true);
            ter1.sendText(`python ${__dirname}\\vTbgenerator.py ${editor.document.fileName} ${__filename.fsPath}`);

            // Display a message box to the user
            vscode.window.showInformationMessage('Generate testbench file successfully!');
        });
    });

    context.subscriptions.push(get_testbench_file);
}

// this method is called when your extension is deactivated
export function deactivate() {
}