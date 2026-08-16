const vscode = require('vscode');

function openSketch(viewColumn, popout) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'javascript') {
    return vscode.window.showErrorMessage('Open a .js sketch file first');
  }
  const sketch = editor.document.getText();

  const panel = vscode.window.createWebviewPanel(
    'p5sketch',
    `p5: ${editor.document.fileName.split('/').pop()}`,
    viewColumn,
    { enableScripts: true, retainContextWhenHidden: true }
  );
  panel.webview.html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/p5@1/lib/p5.min.js"></script>
<style>html,body{margin:0;padding:0;outline:none}canvas{display:block}</style>
</head><body tabindex="0">
<script>
window.focus();
document.body.focus();
document.body.addEventListener('click', () => document.body.focus());
${sketch}
</script>
</body></html>`;

  if (popout) {
    return vscode.commands.executeCommand('workbench.action.moveEditorToNewWindow');
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('p5webview.popout', () => openSketch(vscode.ViewColumn.Active, true)),
    vscode.commands.registerCommand('p5webview.split', () => openSketch(vscode.ViewColumn.Beside, false))
  );
}

module.exports = { activate };
