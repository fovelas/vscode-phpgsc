import * as vscode from 'vscode';
import { generateConstructorController } from './controllers/generate_constructor_controller';
import { generateGetterController } from './controllers/generate_getter_controller';
import { generateSetterController } from './controllers/generate_setter_controller';

export function activate(context: vscode.ExtensionContext) {
	const generateConstructorCmd = vscode.commands.registerCommand('phpgsc.generateConstructor', generateConstructorController);
	const generateGetterCmd = vscode.commands.registerCommand('phpgsc.generateGetter', generateGetterController);
	const generateSetterCmd = vscode.commands.registerCommand('phpgsc.generateSetter', generateSetterController);
	context.subscriptions.push(generateConstructorCmd, generateGetterCmd, generateSetterCmd);
}

export function deactivate() { }
