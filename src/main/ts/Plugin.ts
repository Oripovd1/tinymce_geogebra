import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('tinymce-geogebra', {
    text: 'tinymce-geogebra button',
    onAction: () => {
      editor.setContent('<p>content added from tinymce-geogebra</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('tinymce-geogebra', setup);
};
