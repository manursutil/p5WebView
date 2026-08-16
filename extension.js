const vscode = require('vscode');

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('p5webview.popout', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'javascript') {
        return vscode.window.showErrorMessage('Open a .js sketch file first');
      }
      const sketch = editor.document.getText();

      const panel = vscode.window.createWebviewPanel(
        'p5sketch',
        `p5: ${editor.document.fileName.split('/').pop()}`,
        vscode.ViewColumn.Active,
        { enableScripts: true, retainContextWhenHidden: true }
      );
      panel.webview.html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/p5@1/lib/p5.min.js"></script>
<style>html,body{margin:0;padding:0}canvas{display:block}</style>
</head><body>
<script>${sketch}</script>
</body></html>`;

      await vscode.commands.executeCommand('workbench.action.moveEditorToNewWindow');
    })
  );
}

module.exports = { activate };
