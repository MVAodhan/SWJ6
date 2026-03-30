import type { IEpisode } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

const EditorTab = ({ episode }: { episode: IEpisode }) => {
  const [transcript, setTranscript] = useState("");

  const editorRef = useRef(null);
  useEffect(() => {
    const saved = localStorage.getItem(`transcript_${episode.id}`);
    if (saved) setTranscript(saved);
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // Register Cmd+Shift+D (Mac) / Ctrl+Shift+D (Windows/Linux) for Select All Occurrences
    editor.addAction({
      id: "select-all-occurrences",
      label: "Select All Occurrences",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD,
      ],
      precondition: null,
      keybindingContext: null,
      run: (ed: typeof editor) => {
        const selection = ed.getSelection();
        if (!selection || selection.isEmpty()) return;

        const model = ed.getModel();
        if (!model) return;

        const selectedText = model.getValueInRange(selection);
        if (!selectedText || selectedText.length === 0) return;

        // Find all matches and create selections for each
        const matches = model.findMatches(
          selectedText,
          true,
          false,
          true,
          null,
          true,
        );

        if (matches.length > 0) {
          const selections = matches.map(
            (match: {
              range: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
              };
            }) =>
              new monaco.Selection(
                match.range.startLineNumber,
                match.range.startColumn,
                match.range.endLineNumber,
                match.range.endColumn,
              ),
          );
          ed.setSelections(selections);
        }
      },
    });
  }

  return (
    <div className="w-full p-4 h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      <Editor
        className="h-full w-full"
        // Use 'value' instead of 'defaultValue' for state-synced content
        value={transcript}
        onChange={(val) => setTranscript(val ?? "")}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          // This ensures the editor treats 'plaintext' with more 'code-like' features
          selectionHighlight: true,
          // Enable multi-cursor editing with selected text
          // Cmd+D (Mac) / Ctrl+D (Windows/Linux) - Add selection to next match
          // Cmd+Shift+D (Mac) / Ctrl+Shift+D (Windows/Linux) - Select all occurrences
          multiCursorModifier: "ctrlCmd",
        }}
      />
    </div>
  );
};

export default EditorTab;
