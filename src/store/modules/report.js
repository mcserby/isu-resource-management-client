import A from "../../constants/actions";
import M from "../../constants/mutations";
import Vue from "vue";

const actions = {

  [A.SHOW_PDF_FILE]({ commit }, data) {
    commit(M.SHOW_PDF_FILE, data);
  }
}

const mutations = {

  [M.SHOW_PDF_FILE](state, param) {
    // create the blob object with content-type "application/pdf"
    let newBlob = new Blob([b64toBlob(param['response'])], { type: "application/xlsx" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    let link = document.createElement("a");
    link.href = data;
    link.download = param['fileName']//"Raport S61.xlsx";
    link.click();
  }
};
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
const getters = {};

const state = {};

export default {
  state,
  actions,
  getters,
  mutations
};


