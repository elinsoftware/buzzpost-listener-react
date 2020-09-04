import React from "react"; 
import {Toaster} from "@blueprintjs/core";
import parse from 'html-react-parser';
const App = () => {
  console.log("%cbuzzPost 1.4: listener loaded for "+window.buzzPostUserID,'color:blue')
  
  // window.prefixID is a prefix which can be used to isolated servicenow accoutns
  // when a user has the same sys_id on multiple environments 
  const CHANNEL = window.prefixID+"/"+window.buzzPostUserID
  
  // construct URL for evtSource - check if secret presented in the broker url
  let evtSourceURL = ''
  if (window.buzzPostBroker.indexOf('?secret')>=0) {
    evtSourceURL = window.buzzPostBroker+"&channels="+CHANNEL
    window.buzzPostBroker = '<removed due to a secret>'
  } else {
    evtSourceURL = window.buzzPostBroker+"?channels="+CHANNEL
  }

  const evtSource = new EventSource(evtSourceURL, { withCredentials: false } );
  evtSource.onmessage = function(event) {
      console.log('%cbuzzPost 1.4: received message ','color:blue',event.data)
      var payload = JSON.parse(event.data)

      let message = {}
      let position = "top-right"

      message.message = parse(payload.message)

      switch(payload.intent) {
        case "primary":
          message.intent = "primary"
          break;
        case "success":
          message.intent = "success"
          break;
        case "warning":
          message.intent = "warning"
          break;
        case "danger":
          message.intent = "danger"
          break;
        default:
          message.intent = "none"
      }

      if (payload.timeout!=undefined && parseInt(payload.timeout)>=0) {
        message.timeout = parseInt(payload.timeout)
      }

      if (payload.icon!=undefined && ICONS[payload.icon]!=undefined) {
        message.icon = payload.icon
      }

      if (payload.position!=undefined && POSITIONS[payload.position]!=undefined) {
        position = payload.position
      }

      const AppToaster = Toaster.create({
        position: position
      })
      AppToaster.show(message)
  }
  evtSource.onerror = function(err) {
      console.error("EventSource failed:", err);
  };
 
  return (<div></div>)
}

export default App

const POSITIONS = {
  "bottom":"true",
  "bottom-left":"true",
  "bottom-right":"true",
  "left":"true",
  "left-bottom":"true",
  "left-top":"true",
  "right":"true",
  "right-bottom":"true",
  "right-top":"true",
  "top":"true",
  "top-left":"true",
  "top-right":"true",
}

const ICONS = {
  "add":"true",
"add-column-left":"true",
"add-column-right":"true",
"add-row-bottom":"true",
"add-row-top":"true",
"add-to-artifact":"true",
"add-to-folder":"true",
"airplane":"true",
"align-center":"true",
"align-justify":"true",
"align-left":"true",
"align-right":"true",
"alignment-bottom":"true",
"alignment-horizontal-center":"true",
"alignment-left":"true",
"alignment-right":"true",
"alignment-top":"true",
"alignment-vertical-center":"true",
"annotation":"true",
"application":"true",
"applications":"true",
"archive":"true",
"arrow-bottom-left":"true",
"arrow-bottom-right":"true",
"arrow-down":"true",
"arrow-left":"true",
"arrow-right":"true",
"arrow-top-left":"true",
"arrow-top-right":"true",
"arrow-up":"true",
"arrows-horizontal":"true",
"arrows-vertical":"true",
"asterisk":"true",
"automatic-updates":"true",
"badge":"true",
"ban-circle":"true",
"bank-account":"true",
"barcode":"true",
"blank":"true",
"blocked-person":"true",
"bold":"true",
"book":"true",
"bookmark":"true",
"box":"true",
"briefcase":"true",
"bring-data":"true",
"build":"true",
"calculator":"true",
"calendar":"true",
"camera":"true",
"caret-down":"true",
"caret-left":"true",
"caret-right":"true",
"caret-up":"true",
"cell-tower":"true",
"changes":"true",
"chart":"true",
"chat":"true",
"chevron-backward":"true",
"chevron-down":"true",
"chevron-forward":"true",
"chevron-left":"true",
"chevron-right":"true",
"chevron-up":"true",
"circle":"true",
"circle-arrow-down":"true",
"circle-arrow-left":"true",
"circle-arrow-right":"true",
"circle-arrow-up":"true",
"citation":"true",
"clean":"true",
"clipboard":"true",
"cloud":"true",
"cloud-download":"true",
"cloud-upload":"true",
"code":"true",
"code-block":"true",
"cog":"true",
"collapse-all":"true",
"column-layout":"true",
"comment":"true",
"comparison":"true",
"compass":"true",
"compressed":"true",
"confirm":"true",
"console":"true",
"contrast":"true",
"control":"true",
"credit-card":"true",
"cross":"true",
"crown":"true",
"cube":"true",
"cube-add":"true",
"cube-remove":"true",
"curved-range-chart":"true",
"cut":"true",
"dashboard":"true",
"data-lineage":"true",
"database":"true",
"delete":"true",
"delta":"true",
"derive-column":"true",
"desktop":"true",
"diagnosis":"true",
"diagram-tree":"true",
"direction-left":"true",
"direction-right":"true",
"disable":"true",
"document":"true",
"document-open":"true",
"document-share":"true",
"dollar":"true",
"dot":"true",
"double-caret-horizontal":"true",
"double-caret-vertical":"true",
"double-chevron-down":"true",
"double-chevron-left":"true",
"double-chevron-right":"true",
"double-chevron-up":"true",
"doughnut-chart":"true",
"download":"true",
"drag-handle-horizontal":"true",
"drag-handle-vertical":"true",
"draw":"true",
"drive-time":"true",
"duplicate":"true",
"edit":"true",
"eject":"true",
"endorsed":"true",
"envelope":"true",
"equals":"true",
"eraser":"true",
"error":"true",
"euro":"true",
"exchange":"true",
"exclude-row":"true",
"expand-all":"true",
"export":"true",
"eye-off":"true",
"eye-on":"true",
"eye-open":"true",
"fast-backward":"true",
"fast-forward":"true",
"feed":"true",
"feed-subscribed":"true",
"film":"true",
"filter":"true",
"filter-keep":"true",
"filter-list":"true",
"filter-open":"true",
"filter-remove":"true",
"flag":"true",
"flame":"true",
"flash":"true",
"floppy-disk":"true",
"flow-branch":"true",
"flow-end":"true",
"flow-linear":"true",
"flow-review":"true",
"flow-review-branch":"true",
"flows":"true",
"folder-close":"true",
"folder-new":"true",
"folder-open":"true",
"folder-shared":"true",
"folder-shared-open":"true",
"follower":"true",
"following":"true",
"font":"true",
"fork":"true",
"form":"true",
"full-circle":"true",
"full-stacked-chart":"true",
"fullscreen":"true",
"function":"true",
"gantt-chart":"true",
"geolocation":"true",
"geosearch":"true",
"git-branch":"true",
"git-commit":"true",
"git-merge":"true",
"git-new-branch":"true",
"git-pull":"true",
"git-push":"true",
"git-repo":"true",
"glass":"true",
"globe":"true",
"globe-network":"true",
"graph":"true",
"graph-remove":"true",
"greater-than":"true",
"greater-than-or-equal-to":"true",
"grid":"true",
"grid-view":"true",
"group-objects":"true",
"grouped-bar-chart":"true",
"hand":"true",
"hand-down":"true",
"hand-left":"true",
"hand-right":"true",
"hand-up":"true",
"header":"true",
"header-one":"true",
"header-two":"true",
"headset":"true",
"heart":"true",
"heart-broken":"true",
"heat-grid":"true",
"heatmap":"true",
"help":"true",
"helper-management":"true",
"highlight":"true",
"history":"true",
"home":"true",
"horizontal-bar-chart":"true",
"horizontal-bar-chart-asc":"true",
"horizontal-bar-chart-desc":"true",
"horizontal-distribution":"true",
"id-number":"true",
"image-rotate-left":"true",
"image-rotate-right":"true",
"import":"true",
"inbox":"true",
"inbox-filtered":"true",
"inbox-geo":"true",
"inbox-search":"true",
"inbox-update":"true",
"info-sign":"true",
"inheritance":"true",
"inner-join":"true",
"insert":"true",
"intersection":"true",
"ip-address":"true",
"issue":"true",
"issue-closed":"true",
"issue-new":"true",
"italic":"true",
"join-table":"true",
"key":"true",
"key-backspace":"true",
"key-command":"true",
"key-control":"true",
"key-delete":"true",
"key-enter":"true",
"key-escape":"true",
"key-option":"true",
"key-shift":"true",
"key-tab":"true",
"known-vehicle":"true",
"lab-test":"true",
"label":"true",
"layer":"true",
"layers":"true",
"layout":"true",
"layout-auto":"true",
"layout-balloon":"true",
"layout-circle":"true",
"layout-grid":"true",
"layout-group-by":"true",
"layout-hierarchy":"true",
"layout-linear":"true",
"layout-skew-grid":"true",
"layout-sorted-clusters":"true",
"learning":"true",
"left-join":"true",
"less-than":"true",
"less-than-or-equal-to":"true",
"lifesaver":"true",
"lightbulb":"true",
"link":"true",
"list":"true",
"list-columns":"true",
"list-detail-view":"true",
"locate":"true",
"lock":"true",
"log-in":"true",
"log-out":"true",
"manual":"true",
"manually-entered-data":"true",
"map":"true",
"map-create":"true",
"map-marker":"true",
"maximize":"true",
"media":"true",
"menu":"true",
"menu-closed":"true",
"menu-open":"true",
"merge-columns":"true",
"merge-links":"true",
"minimize":"true",
"minus":"true",
"mobile-phone":"true",
"mobile-video":"true",
"moon":"true",
"more":"true",
"mountain":"true",
"move":"true",
"mugshot":"true",
"multi-select":"true",
"music":"true",
"new-drawing":"true",
"new-grid-item":"true",
"new-layer":"true",
"new-layers":"true",
"new-link":"true",
"new-object":"true",
"new-person":"true",
"new-prescription":"true",
"new-text-box":"true",
"ninja":"true",
"not-equal-to":"true",
"notifications":"true",
"notifications-updated":"true",
"numbered-list":"true",
"numerical":"true",
"office":"true",
"offline":"true",
"oil-field":"true",
"one-column":"true",
"outdated":"true",
"page-layout":"true",
"panel-stats":"true",
"panel-table":"true",
"paperclip":"true",
"paragraph":"true",
"path":"true",
"path-search":"true",
"pause":"true",
"people":"true",
"percentage":"true",
"person":"true",
"phone":"true",
"pie-chart":"true",
"pin":"true",
"pivot":"true",
"pivot-table":"true",
"play":"true",
"plus":"true",
"polygon-filter":"true",
"power":"true",
"predictive-analysis":"true",
"prescription":"true",
"presentation":"true",
"print":"true",
"projects":"true",
"properties":"true",
"property":"true",
"publish-function":"true",
"pulse":"true",
"random":"true",
"record":"true",
"redo":"true",
"refresh":"true",
"regression-chart":"true",
"remove":"true",
"remove-column":"true",
"remove-column-left":"true",
"remove-column-right":"true",
"remove-row-bottom":"true",
"remove-row-top":"true",
"repeat":"true",
"reset":"true",
"resolve":"true",
"rig":"true",
"right-join":"true",
"ring":"true",
"rotate-document":"true",
"rotate-page":"true",
"satellite":"true",
"saved":"true",
"scatter-plot":"true",
"search":"true",
"search-around":"true",
"search-template":"true",
"search-text":"true",
"segmented-control":"true",
"select":"true",
"selection":"true",
"send-to":"true",
"send-to-graph":"true",
"send-to-map":"true",
"series-add":"true",
"series-configuration":"true",
"series-derived":"true",
"series-filtered":"true",
"series-search":"true",
"settings":"true",
"share":"true",
"shield":"true",
"shop":"true",
"shopping-cart":"true",
"signal-search":"true",
"sim-card":"true",
"slash":"true",
"small-cross":"true",
"small-minus":"true",
"small-plus":"true",
"small-tick":"true",
"snowflake":"true",
"social-media":"true",
"sort":"true",
"sort-alphabetical":"true",
"sort-alphabetical-desc":"true",
"sort-asc":"true",
"sort-desc":"true",
"sort-numerical":"true",
"sort-numerical-desc":"true",
"split-columns":"true",
"square":"true",
"stacked-chart":"true",
"star":"true",
"star-empty":"true",
"step-backward":"true",
"step-chart":"true",
"step-forward":"true",
"stop":"true",
"stopwatch":"true",
"strikethrough":"true",
"style":"true",
"swap-horizontal":"true",
"swap-vertical":"true",
"symbol-circle":"true",
"symbol-cross":"true",
"symbol-diamond":"true",
"symbol-square":"true",
"symbol-triangle-down":"true",
"symbol-triangle-up":"true",
"tag":"true",
"take-action":"true",
"taxi":"true",
"text-highlight":"true",
"th":"true",
"th-derived":"true",
"th-disconnect":"true",
"th-filtered":"true",
"th-list":"true",
"thumbs-down":"true",
"thumbs-up":"true",
"tick":"true",
"tick-circle":"true",
"time":"true",
"timeline-area-chart":"true",
"timeline-bar-chart":"true",
"timeline-events":"true",
"timeline-line-chart":"true",
"tint":"true",
"torch":"true",
"tractor":"true",
"train":"true",
"translate":"true",
"trash":"true",
"tree":"true",
"trending-down":"true",
"trending-up":"true",
"truck":"true",
"two-columns":"true",
"unarchive":"true",
"underline":"true",
"undo":"true",
"ungroup-objects":"true",
"unknown-vehicle":"true",
"unlock":"true",
"unpin":"true",
"unresolve":"true",
"updated":"true",
"upload":"true",
"user":"true",
"variable":"true",
"vertical-bar-chart-asc":"true",
"vertical-bar-chart-desc":"true",
"vertical-distribution":"true",
"video":"true",
"volume-down":"true",
"volume-off":"true",
"volume-up":"true",
"walk":"true",
"warning-sign":"true",
"waterfall-chart":"true",
"widget":"true",
"widget-button":"true",
"widget-footer":"true",
"widget-header":"true",
"wrench":"true",
"zoom-in":"true",
"zoom-out":"true",
"zoom-to-fit":"true",
}