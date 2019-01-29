// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Range, Position } from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsccodereview" is now active!');

	const highlight = vscode.window.createTextEditorDecorationType({
		overviewRulerColor: '#ff00ff',
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let codeReview = vscode.commands.registerCommand('extension.codeReview', () => {
		const filePath = vscode.window.activeTextEditor.document.fileName;
		const state = context.workspaceState.get(filePath, []);
		console.log(`Retrieved state for ${filePath}.`, state);
		const editor = vscode.window.activeTextEditor;
		const ranges = state.reduce((carry, decoration) => {
			let range = decoration;
			if (!(decoration instanceof Range)) {
				range = new Range(new Position(decoration[0].line,0), new Position(decoration[1].line,0));
			}
			carry.push(range);
			return carry;
		}, []);
		editor.setDecorations(highlight, ranges);
	});

	context.subscriptions.push(codeReview);
	
	let clearMarkAsRead = vscode.commands.registerCommand('extension.clearMarkAsRead', () => {
		console.log("extension.markAsRead");
		const filePath = vscode.window.activeTextEditor.document.fileName;
		const editor = vscode.window.activeTextEditor;
		context.workspaceState.update(filePath, []);
		editor.setDecorations(highlight, []);
	});

	context.subscriptions.push(clearMarkAsRead);

	// Permit updating of state.
	let markAsRead = vscode.commands.registerCommand('extension.markAsRead', () => {
		console.log("extension.markAsRead");
		const filePath = vscode.window.activeTextEditor.document.fileName;
		const state = context.workspaceState.get(filePath, []);
		const editor = vscode.window.activeTextEditor;
		console.log("Loaded state.", state);
		const ranges = state.reduce((carry, decoration) => {
			let range = decoration;
			if (!(decoration instanceof Range)) {
				range = new Range(new Position(decoration[0].line,0), new Position(decoration[1].line,0));
			}
			carry.push(range);
			return carry;
		}, []);
		console.log("Restored saved state.", ranges);
		if (editor.selections !== undefined && editor.selections.length > 0) {
			const selection = editor.selections[0];
			console.log("Current selection.", selection);
			if (selection !== undefined && !selection.isEmpty) {
				const range = new Range(new Position(selection.start.line, 0), new Position(selection.end.line + 1, 0));
				console.log(`Highlighting text in ${filePath} from ${selection.start.line} to ${selection.end.line}.`);
				ranges.push(range);
				context.workspaceState.update(filePath, ranges);
			}
		}
		editor.setDecorations(highlight, ranges);
	});

	context.subscriptions.push(markAsRead);
}

// this method is called when your extension is deactivated
export function deactivate() {}
