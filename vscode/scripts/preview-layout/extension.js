// Lays out the sample files in a 2x2 editor grid when the preview window starts.
// Files per quarter are listed in layout.json, relative to the sample/ folder.

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// editor groups are numbered depth-first: left column top to bottom, then right column
const QUARTERS = ['topLeft', 'bottomLeft', 'topRight', 'bottomRight'];

async function activate() {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder || path.basename(folder.uri.fsPath) !== 'sample') return;

  const layout = JSON.parse(fs.readFileSync(path.join(__dirname, 'layout.json'), 'utf8'));

  await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  await vscode.commands.executeCommand('vscode.setEditorLayout', {
    orientation: 0, // columns side by side, each split top / bottom
    groups: [{ groups: [{}, {}], size: 0.5 }, { groups: [{}, {}], size: 0.5 }],
  });

  for (const [i, quarter] of QUARTERS.entries()) {
    const files = layout[quarter] || [];
    for (const file of files) {
      const uri = vscode.Uri.joinPath(folder.uri, file);
      try {
        await vscode.window.showTextDocument(uri, { viewColumn: i + 1, preview: false, preserveFocus: true });
      } catch (err) {
        vscode.window.showWarningMessage(`preview layout: can't open ${file} (${err.message})`);
      }
    }
    // the first file of each quarter ends up as the visible tab
    if (files.length > 1) {
      await vscode.window.showTextDocument(vscode.Uri.joinPath(folder.uri, files[0]), { viewColumn: i + 1, preserveFocus: true });
    }
  }
  await vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
}

module.exports = { activate };
