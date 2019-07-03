/** @OnlyCurrentDoc */

function Reset() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sign Up');
  var inputs = sheet.getRangeList([
    'E9:E13', // Word of the day
    'E16:E30'  // Roles
  ]);

  // Clear all the contents
  inputs.clearContent();

  // Reset all the font & wrap settings since it can get removed from pasting
  inputs.setFontFamily("Helvetica Neue");
  inputs.setFontSize(12);
  inputs.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  inputs.setBorder(null, null, null, null, null, /*horizontal*/ true, "white", SpreadsheetApp.BorderStyle.SOLID_THICK);

  // Reset conditional formatting since it can get removed from pasting
  var conditionalFormattingRule = SpreadsheetApp.newConditionalFormatRule()
  .whenCellEmpty()
  .setBackground("rgb(183, 225, 205)")
  .setRanges(inputs.getRanges())
  .build();
  sheet.setConditionalFormatRules([conditionalFormattingRule]);

  console.log("Ran reset()");
};

function Insertdivider() {
  var spreadsheet = SpreadsheetApp.getActive();
  var currentRow = spreadsheet.getActiveRange().getLastRow();
  spreadsheet.getActiveSheet().insertRowAfter(currentRow);
  spreadsheet.getActiveSheet().setRowHeight(currentRow + 1, 5);
  spreadsheet.getActiveRange().offset(1, 0).activate();
  spreadsheet.getActiveRangeList().clearFormat();
};