import { Editor, TinyMCE } from "tinymce";
import fitSvg from "./fitSvg";

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  const setXMLAsObject = (applet) => {
    const element = editor.selection.getNode();
    const xml = element.getAttribute("data-xml");
    setTimeout(() => {
      const api = applet.getAppletObject();
      if (xml.startsWith("<?xml")) api.setXML(xml);
      else api.setBase64(xml);
    }, 1000);
  };
  const openDialog = () => {
    editor.windowManager.open({
      title: "Geogebra",
      size: "large",
      body: {
        type: "panel",
        items: [
          {
            type: "htmlpanel",
            html: "<div id='applet_container'></div>",
          },
        ],
      },
      buttons: [
        {
          type: "cancel",
          text: "Close",
        },
        {
          type: "submit",
          text: "Save",
          buttonType: "primary",
        },
      ],
      onSubmit: (api) => {
        const app = window.ggbApplet;
        const data = app.getBase64();
        // app.setAxesVisible(false, false);
        // app.setGridVisible(false);

        app.exportSVG((svg) => {
          const div = document.getElementById("svg_renderer");
          div.innerHTML = svg;
          const svgElement = div.querySelector("svg");
          fitSvg(svgElement);

          const src =
            "data:image/svg+xml;base64," +
            btoa(unescape(encodeURIComponent(svgElement.outerHTML)));
          editor.insertContent(
            `<img src='${src}' alt='geogebra' data-xml='${data}'/>`
          );
        });
        api.close();
      },
    });
    const parameters = {
      id: "ggbApplet",
      appName: "classic",
      width: 1150,
      height: 500,
      showToolBar: true,
      borderColor: null,
      showMenuBar: true,
      allowStyleBar: true,
      showAlgebraInput: true,
      enableLabelDrags: false,
      enableShiftDragZoom: true,
      capturingThreshold: null,
      showToolBarHelp: false,
      errorDialogsActive: true,
      showTutorialLink: true,
      showLogging: true,
      useBrowserForJS: false,
      showFullscreenButton: true,
    };
    const applet = new GGBApplet(parameters, true);
    applet.inject("applet_container");

    const isMatch = editor.formatter.match("geogebra");
    if (isMatch) {
      setXMLAsObject(applet);
    }
  };
  const geometryIcon = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-geometry"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 21l4 -12m2 0l1.48 4.439m.949 2.847l1.571 4.714" /><path d="M12 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 12c1.526 2.955 4.588 5 8 5c3.41 0 6.473 -2.048 8 -5" /><path d="M12 5v-2" /></svg>`;
  editor.ui.registry.addIcon("geometry", geometryIcon);
  editor.ui.registry.addToggleButton("tinymce-geogebra", {
    tooltip: "Geogebra",
    icon: "geometry",
    onAction: () => {
      openDialog();
    },
    onSetup: (buttonApi) => {
      buttonApi.setActive(editor.formatter.match("geogebra"));
      const changed = editor.formatter.formatChanged("geogebra", (state) =>
        buttonApi.setActive(state)
      );

      return () => changed.unbind();
    },
  });
};

export default (): void => {
  tinymce.PluginManager.add("tinymce-geogebra", setup);
};

declare global {
  const GGBApplet: any;
  interface Window {
    ggbApplet: any;
  }
}
