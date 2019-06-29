var signUpSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sign Up");

function doGet() {
  var user = Session.getActiveUser().getEmail();
  console.log(user);

  var page = HtmlService.createTemplateFromFile("sign-up")
  page.meetingDate = getMeetingDate();
  page.data = getCurrentSignUps();

  var output = page.evaluate();
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
  return output;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

var locations = {
  "word": "E9",
  "word.pronunciation": "E10",
  "word.class": "E11",
  "word.definition": "E12",
  "word.usage": "E13",
  "toastmaster": "E16",
  "speaker1": "E17",
  "speaker1.projectNumber": "E18",
  "speaker1.projectName": "E19",
  "speaker1.speechName": "E20",
  "speaker2": "E21",
  "speaker2.projectNumber": "E22",
  "speaker2.projectName": "E23",
  "speaker2.speechName": "E24",
  "genEvaluator": "E25",
  "evaluator1": "E26",
  "evaluator2": "E27",
  "grammarian": "E28",
  "topicsmaster": "E29",
  "timer": "E30",
};

function getMeetingDate() {
  var meetingDate = signUpSheet.getRange("E7").getValue();
  return Utilities.formatDate(meetingDate, 'America/Los_Angeles', 'yyyy/MM/dd h:mm a');
}

function getCurrentSignUps() {
  var data = {};
  for (var field in locations) {
    var location = locations[field];
    data[field] = signUpSheet.getRange(location).getValue();
  }
  return data;
}

function updateCurrentSignUps(data) {
  var changeLog = {};
  for (var field in locations) {
    var location = locations[field];
    var newValue = data[field];
    var oldValue = signUpSheet.getRange(location).getValue();
    if (newValue != oldValue) {
      signUpSheet.getRange(location).setValue(newValue);
      changeLog[field] = newValue;
    }
  }

  var user = Session.getActiveUser().getEmail();
  console.log(user + JSON.stringify(changeLog));
}