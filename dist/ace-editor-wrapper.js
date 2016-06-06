const themes = ['chrome', 'clouds', 'clouds_midnight', 'crimson_editor', 'dawn', 'dreamweaver', 'eclipse', 'github', 'idle_fingers', 'iplastic', 'katzenmilch', 'kr_theme', 'kuroir', 'merbivore_soft', 'mono_industrial', 'monokai', 'pastel_on_dark', 'solarized_light', 'solarized_dark', 'sqlserver', 'terminal', 'textmate', 'tomorrow', 'tomorrow_night', 'tomorrow_night_blue', 'tomorrow_night_bright', 'tomorrow_night_eighties', 'twilight', 'vibrant_ink', 'xcode', 'cobalt'];

this.TextEditorImpl = (function() {
  function TextEditorImpl() {}

  TextEditorImpl.exec = function(textarea) {
    if (!window.textEditors) { window.textEditors = [] }

    var editor = new TextEditor(textarea);
    window.textEditors.push(editor);

    return true;
  };

  return TextEditorImpl;

})();

this.TextEditor = (function() {
  function TextEditor(textarea) {
    this.textarea = $(textarea);
    this.initEditor();
  }

  TextEditor.prototype.initEditor = function() {
    var scope = this;

    scope.pre = $("<pre></pre>");
    scope.pre.insertBefore(scope.textarea);
    scope.themeSelector = scope.buildThemeSelector();
    scope.themeSelector.insertAfter(scope.pre);
    scope.editor = ace.edit(scope.pre[0]);
    scope.editor.$blockScrolling = Infinity;
    scope.session = scope.editor.getSession();
    scope.hideTextArea();
    scope.setTheme(scope.getTheme());
    scope.setMode(scope.getMode());
    scope.session.setUseWorker(false);
    scope.session.setTabSize(2);
    scope.session.setValue(scope.textarea.val());
    scope.contentBox = scope.pre.find('.ace_scrollbar-inner');
    // scope.applyContentHeight();

    scope.themeSelector.on('change', function(){
      var value = $(this).val() || scope.editor.getTheme();
      scope.setTheme(value);
    })

    scope.session.on("change", function() {
      // scope.applyContentHeight();
      return scope.textarea.val(scope.session.getValue());
    });

    // Disabled for now but feature would allow editor boxes to work more like github
    scope.editor.on("focus", function(scrollTop) {
      return scope.applyContentHeight();
    });

    scope.session.on("changeScrollTop", function(scrollTop) {
      return scope.applyContentHeight();
    });

    return true;
  };

  TextEditor.prototype.buildThemeSelector = function() {
    var select = "<select class=\"ace-theme-selector\">";

    themes.forEach(function(theme){
      select += "<option value=\"" + theme + "\">" + theme + "</option>"
    });

    select += "</select>";

    select = $(select);
    select.val(this.getTheme());

    return select;
  };

  TextEditor.prototype.applyContentHeight = function() {

    this.editor.resize();
    this.pre.css('height', this.contentBox.height() + 14);
    return true;
  };

  TextEditor.prototype.hideTextArea = function() {
    return this.textarea.css('display', 'none');
  };

  TextEditor.prototype.setTheme = function(theme) {
    return this.editor.setTheme("ace/theme/" + theme);
  };

  TextEditor.prototype.getTheme = function() {
    return this.textarea.attr('data-theme') || 'sqlserver';
  };

  TextEditor.prototype.setMode = function(mode) {
    return this.session.setMode("ace/mode/" + mode);
  };

  TextEditor.prototype.getMode = function() {
    return this.textarea.attr('data-mode') || 'markdown';
  };

  return TextEditor;

})();
