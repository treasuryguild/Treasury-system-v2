//Helper function to get value by id
function getValue(name){
    return document.getElementById(name).value
  }
  
  function validateSubmission(){
    //save all the input values
    const name = getValue('name')
    const budgetB = getValue('budgetB')
    const ada = getValue('ada')
    const description = getValue('description')
    const pool = getValue('pool')
    const xrate = getValue('xrate')
    
    //generate a filename
    const filename = new Date().getTime().toString() + '-' + name.replace(/\s/g, '-') + ".json"
    
    
    //Generate a string mimicing the file structure
    //Indentation is important here
    function ideascaleLink(pool) {
      var iLink = "";
      switch(pool) {
        case 'Community Governance Oversight':
          iLink = "https://cardano.ideascale.com/c/idea/383517";
          break;
        case 'Catalyst Audit Circle':
          iLink = "https://cardano.ideascale.com/c/idea/381354";
          break;
        default:
          iLink = "";
          break;
      }
      return iLink;
    }    
    
    //Generate a string mimicing the file structure
    //Indentation is important here
    let fileText = `{
  "id" : "${new Date().getTime().toString()}",
  "date": "${new Date().toUTCString()}",
  "project": "Community Governance Oversight",
  "pool": "${pool}",
  "ideascale": "${ideascaleLink(pool)}",
  "budget": "${budgetB}",
  "ada": "${ada}",
  "exchange-rate": "${xrate} USD per ADA",
  "name": "${name}",
  "txid": "",
  "description": "${description}"
}
`
    
    //Encode string to URI format
    const encodedFileText = encodeURIComponent(fileText)
  
    //Generate a github link with query parameter
    
    function githubQueryLink(pool) {
      var answer = "";
      switch(pool) {
        case 'Community Governance Oversight':
          answer = "Fund7/Community-Governance-Oversight/";
          break;
        case 'Catalyst Audit Circle':
          answer = "Fund7/Catalyst-Audit-Circle/";
          break;
        default:
          answer = "";
          break;
      }
      return answer;
    }

    function githubQueryLink2(budgetB) {
      var answer = "";
      switch(budgetB) {
        case 'Incoming IOG':
          answer = "Incoming-IOG/";
          break;
        case 'Meetings':
          answer = "Meetings/";
          break;
        case 'Comm/Org Tools':
          answer = "Comm-Org-Tools/";
          break;
        case 'Surveys':
          answer = "Surveys/";
          break;
        case 'Retrospectives':
          answer = "Retrospectives/";
          break;
        case 'Reports':
          answer = "Reports/";
          break;
        case 'Proposal':
          answer = "Proposal/";
          break;
        case 'Town Hall Slides':
          answer = "Town-Hall-Slides/";
          break; 
        case 'Meeting Minutes':
          answer = "Meeting-Minutes/";
          break;        
        default:
          answer = "";
          break;
      }
      return answer;
    }
    //Open in a new tab
  window.open("https://github.com/treasuryguild/Treasury-system-v2/new/main/Transactions/" + githubQueryLink(pool) + githubQueryLink2(budgetB) + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }
