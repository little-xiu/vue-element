let code = {};
code.base = `
import iCode from './components/code';
deleteRow(index, rows) {
  rows.splice(index, 1);
},
handleClick(tab, event) {
  // this.tabIndex = tab.index;
  this.getData();
},
uploadApp () {
  this.modifyVisible = true;
},




closeDialog () {
  this.modifyVisible = false;
},
`;
export default code;