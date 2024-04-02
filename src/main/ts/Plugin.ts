import { Editor, TinyMCE } from "tinymce";

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  const openDialog = () =>
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
        const data = app.getXML();
        app.setAxesVisible(false, false);
        app.setGridVisible(false);

        app.exportSVG((svg) => {
          const src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
          editor.insertContent(
            `<div id="applet-container"><img src='${src}' alt='geogebra' data-xml='${data}'/></div>`
          );
        });
        api.close();
      },
    });
  editor.ui.registry.addButton("tinymce-geogebra", {
    tooltip: "Geogebra",
    icon: "browse",
    onAction: () => {
      openDialog();
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
      };
      const applet = new GGBApplet(parameters, true);
      applet.inject("applet_container");
      setTimeout(() => {
        const api = applet.getAppletObject();
        api.setXML(`<?xml version="1.0" encoding="utf-8"?>
      <geogebra format="5.0" version="5.2.820.0" app="classic" platform="w" id="ae215b6d-b0ff-4d0c-8e23-b9de79acb892"  xsi:noNamespaceSchemaLocation="http://www.geogebra.org/apps/xsd/ggb.xsd" xmlns="" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" >
      <gui>
        <window width="1100" height="600" />
        <perspectives>
      <perspective id="tmp">
        <panes>
          <pane location="" divider="0.34545454545454546" orientation="1" />
        </panes>
        <views>
          <view id="4097" visible="false" inframe="false" stylebar="true" location="1,1,1,1" size="400" window="100,100,700,550" />
          <view id="512" toolbar="0 | 1 501 5 19 , 67 | 2 15 45 18 , 7 37 | 514 3 9 , 13 44 , 47 | 16 51 | 551 550 11 ,  20 22 21 23 , 55 56 57 , 12 | 69 | 510 511 , 512 513 | 533 531 , 534 532 , 522 523 , 537 536 , 535 , 538 | 521 520 | 36 , 38 49 560 | 571 30 29 570 31 33 | 17 | 540 40 41 42 , 27 28 35 , 6 , 502" visible="false" inframe="false" stylebar="false" location="1,1,1" size="500" window="100,100,600,400" />
          <view id="4" toolbar="0 || 2020 , 2021 , 2022 || 2001 , 2003 , 2002 , 2004 , 2005 || 2040 , 2041 , 2042 , 2044 , 2043" visible="false" inframe="false" stylebar="false" location="1,1" size="300" window="100,100,600,400" />
          <view id="8" toolbar="1001 | 1002 | 1003  || 1005 | 1004 || 1006 | 1007 | 1010 || 1008 | 1009 || 6" visible="false" inframe="false" stylebar="false" location="1,3" size="300" window="100,100,600,400" />
          <view id="1" visible="true" inframe="false" stylebar="false" location="1" size="710" window="100,100,600,400" />
          <view id="2" visible="true" inframe="false" stylebar="false" location="3" size="380" tab="ALGEBRA" window="100,100,600,400" />
          <view id="16" visible="false" inframe="false" stylebar="false" location="1" size="300" window="50,50,500,500" />
          <view id="32" visible="false" inframe="false" stylebar="true" location="1" size="300" window="50,50,500,500" />
          <view id="64" toolbar="0" visible="false" inframe="false" stylebar="false" location="1" size="480" window="50,50,500,500" />
          <view id="128" visible="false" inframe="false" stylebar="false" location="1" size="480" window="50,50,500,500" />
          <view id="70" toolbar="0 || 2020 || 2021 || 2022" visible="false" inframe="false" stylebar="true" location="1" size="900" window="50,50,500,500" />
        </views>
        <toolbar show="true" items="0 73 62 | 1 501 67 , 5 19 , 72 75 76 | 2 15 45 , 18 65 , 7 37 | 4 3 8 9 , 13 44 , 58 , 47 | 16 51 64 , 70 | 10 34 53 11 , 24  20 22 , 21 23 | 55 56 57 , 12 | 36 46 , 38 49  50 , 71  14  68 | 30 29 54 32 31 33 | 25 17 26 60 52 61 | 40 41 42 , 27 28 35 , 6" position="1" help="false" />
        <input show="true" cmd="true" top="algebra" />
        <dockBar show="false" east="false" />
      </perspective>
        </perspectives>
        <labelingStyle  val="0"/>
        <font  size="16"/>
      </gui>
      <euclidianView>
        <viewNumber viewNo="1"/>
        <size  width="708" height="543"/>
        <coordSystem xZero="354.5" yZero="271" scale="50" yscale="49.999999999999986"/>
        <evSettings axes="true" grid="true" gridIsBold="false" pointCapturing="3" rightAngleStyle="1" checkboxSize="26" gridType="3"/>
        <bgColor r="255" g="255" b="255"/>
        <axesColor r="37" g="37" b="37"/>
        <gridColor r="192" g="192" b="192"/>
        <lineStyle axes="1" grid="0"/>
        <axis id="0" show="true" label="" unitLabel="" tickStyle="1" showNumbers="true"/>
        <axis id="1" show="true" label="" unitLabel="" tickStyle="1" showNumbers="true"/>
      </euclidianView>
      <spreadsheetView>
        <size  width="0" height="0"/>
        <prefCellSize  width="70" height="0"/>
        <selection  hScroll="0" vScroll="0" column="-1" row="-1"/>
      </spreadsheetView>
      <algebraView>
        <mode val="3"/>
      </algebraView>
      <kernel>
        <uses3D val="true"/>
        <continuous val="false"/>
        <usePathAndRegionParameters val="true"/>
        <decimals val="2"/>
        <angleUnit val="degree"/>
        <algebraStyle val="3" spreadsheet="0"/>
        <coordStyle val="0"/>
      </kernel>
      <tableview min="0" max="0" step="0"/>
      <scripting blocked="false" disabled="false"/>
      <construction title="" author="" date="">
      <expression label="C" exp="(4, 5)" type="point"/>
      <element type="point" label="C">
        <show object="true" label="true"/>
        <objColor r="77" g="77" b="255" alpha="0"/>
        <layer val="0"/>
        <labelMode val="0"/>
        <animation step="0.1" speed="1" type="1" playing="false"/>
        <pointSize val="5"/>
        <pointStyle val="0"/>
        <coords x="4" y="5" z="1"/>
      </element>
      <expression label="A" exp="(1, 1)" type="point"/>
      <element type="point" label="A">
        <show object="true" label="true"/>
        <objColor r="77" g="77" b="255" alpha="0"/>
        <layer val="0"/>
        <labelMode val="0"/>
        <animation step="0.1" speed="1" type="1" playing="false"/>
        <pointSize val="5"/>
        <pointStyle val="0"/>
        <coords x="1" y="1" z="1"/>
      </element>
      <expression label="B" exp="(4, 1)" type="point"/>
      <element type="point" label="B">
        <show object="true" label="true"/>
        <objColor r="77" g="77" b="255" alpha="0"/>
        <layer val="0"/>
        <labelMode val="0"/>
        <animation step="0.1" speed="1" type="1" playing="false"/>
        <pointSize val="5"/>
        <pointStyle val="0"/>
        <coords x="4" y="1" z="1"/>
      </element>
      <command name="Polygon">
        <input a0="A" a1="B" a2="C"/>
        <output a0="t1" a1="c" a2="a" a3="b"/>
      </command>
      <element type="polygon" label="t1">
        <lineStyle thickness="5" type="0" typeHidden="1" opacity="178"/>
        <show object="true" label="false"/>
        <objColor r="153" g="51" b="0" alpha="0.10000000149011612"/>
        <layer val="0"/>
        <labelMode val="0"/>
      </element>
      <element type="segment" label="c">
        <show object="true" label="true"/>
        <objColor r="153" g="51" b="0" alpha="0"/>
        <layer val="0"/>
        <labelMode val="1"/>
        <auxiliary val="false"/>
        <lineStyle thickness="5" type="0" typeHidden="1" opacity="178"/>
        <outlyingIntersections val="false"/>
        <keepTypeOnTransform val="true"/>
        <startStyle val="default"/>
        <endStyle val="default"/>
        <coords x="0" y="3" z="-3"/>
      </element>
      <element type="segment" label="a">
        <show object="true" label="true"/>
        <objColor r="153" g="51" b="0" alpha="0"/>
        <layer val="0"/>
        <labelOffset x="-5" y="8"/>
        <labelMode val="1"/>
        <auxiliary val="false"/>
        <lineStyle thickness="5" type="0" typeHidden="1" opacity="178"/>
        <outlyingIntersections val="false"/>
        <keepTypeOnTransform val="true"/>
        <startStyle val="default"/>
        <endStyle val="default"/>
        <coords x="-4" y="0" z="16"/>
      </element>
      <element type="segment" label="b">
        <show object="true" label="true"/>
        <objColor r="153" g="51" b="0" alpha="0"/>
        <layer val="0"/>
        <labelOffset x="-31" y="12"/>
        <labelMode val="1"/>
        <auxiliary val="false"/>
        <lineStyle thickness="5" type="0" typeHidden="1" opacity="178"/>
        <outlyingIntersections val="false"/>
        <keepTypeOnTransform val="true"/>
        <startStyle val="default"/>
        <endStyle val="default"/>
        <coords x="4" y="-3" z="-1"/>
      </element>
      </construction>
        </geogebra>`);
      }, 1000);
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
