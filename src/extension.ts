import * as vscode from 'vscode';

const IT = ' it(';
const IT_ONLY = ' it.only(';
const DESCRIBE = 'describe(';
const DESCRIBE_ONLY = 'describe.only(';
const OPPOSITES = new Map<string, string>([
    [IT, IT_ONLY],
    [DESCRIBE, DESCRIBE_ONLY]
]);

function replace(replacable: string, replacement: string, 
    index: number, document: vscode.TextDocument): Thenable<boolean> {
    const edit = new vscode.WorkspaceEdit();
    const line = document.lineAt(index);
    edit.replace(document.uri, line.range, line.text.replace(replacable, replacement));
    return vscode.workspace.applyEdit(edit);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.toggleOnly', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const {document} = editor;
        const position = editor.selection.active;
        const text = document.getText().split('\n');

        for (let i = position.line; i > 0; i--) {
            for (let [mode, opposite] of OPPOSITES) {
                if (text[i].includes(mode)) {
                    return replace(mode, opposite, i, document);
                }
                if (text[i].includes(opposite)) {
                    return replace(opposite, mode, i, document);
                }
            }
        }
    });

    context.subscriptions.push(disposable);
}
export function deactivate() {
}
