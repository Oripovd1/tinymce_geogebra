import { TinyMCE } from "tinymce";

import Plugin from "../../main/ts/Plugin";

declare let tinymce: TinyMCE;

Plugin();

tinymce
  .init({
    selector: "textarea.tinymce",
    plugins: "code tinymce-geogebra",
    toolbar: "tinymce-geogebra",
  })
  .then((editors) =>
    editors[0].formatter.register("geogebra", {
      inline: "img",
      attributes: { alt: "geogebra" },
    })
  );
