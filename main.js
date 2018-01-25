//use to retrieve patient data json file
var xmlHttp = new XMLHttpRequest();
xmlHttp.overrideMimeType("application/json");

//used localhost to retrieve json file locally
xmlHttp.open('GET', 'http://localhost:8080/patientData.json', true);
xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

      //json object
      var patientData = JSON.parse(xmlHttp.responseText);

      //get name
      var name = patientData.name[0];
      var familyName = name.family;
      var givenName = name.given;

      //get organization name
      var organizationName = patientData.managingOrganization.display;

      //get gender
      var gender = patientData.gender[0].toUpperCase() + patientData.gender.substring(1);

      //get number of conditions
      var numConditions = patientData.conditions.length;

      //display patient name
      document.getElementById("patientName").innerHTML = "Name of patient: " + givenName + " " + familyName;

      //display organization name
      document.getElementById("organizationName").innerHTML = "Organization name: " + organizationName;

      //display gender
      document.getElementById("gender").innerHTML = "Gender: " + gender;

      //display number of conditions
      document.getElementById("numConditions").innerHTML = "Number of conditions they have: " + numConditions;

      //variable to reference list element
      var listConditions = document.getElementById("listConditions");

      //loop through each condition and create a paragraph block for each condition
      for(i = 0; i < numConditions; i++){
        var paragraph = document.createElement("p");
        var displayCondition = document.createTextNode("-" + patientData.conditions[i]);

        //add string to paragraph
        paragraph.appendChild(displayCondition);

        //add paragraph to list
        listConditions.appendChild(paragraph);
      }

    }
}
xmlHttp.send(null);
