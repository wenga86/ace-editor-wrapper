# Ace Editor Wrapper

Simply add .ace-editor class to any textarea input and get a nice markup-highlighted editor.

```= f.text_area class: "text-editor" ```

To customize things like the language or theme simply add data attributes like so

```= f.text_area class: "text-editor", data: {texteditor: true, editortype: :markdown, theme: :github } ```
