import * as vscode from 'vscode';
import { GenerateGetter } from '../commands/generate_getter';

export const generateGetterController = () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const documentStr = editor.document.getText();

        // Edit range causing problems. Now generated text inserting in cursor position.
        editor.edit((editBuilder) => {
            // const editRange = editor.document.lineAt(editor.document.lineCount - 2).range.start;
            editBuilder.insert(editor.selection.active, GenerateGetter.exec(documentStr));
        });
    }
};