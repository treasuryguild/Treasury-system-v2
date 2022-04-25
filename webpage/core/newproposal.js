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
    const idea = getValue('ideaScale')
    const xrate = getValue('xrate')
    const fund = getValue('fund')
    const project = getValue('project')
    
    //generate a filename
    const filename = new Date().getTime().toString() + '-' + name.replace(/\s/g, '-') + ".json"
    
    
    //Generate a string mimicing the file structure
    //Indentation is important here
    
    //Generate a string mimicing the file structure
    //Indentation is important here
    let fileText = `{
  "id" : "${new Date().getTime().toString()}",
  "date": "${new Date().toUTCString()}",
  "fund": "${fund}",
  "project": "${project}",
  "proposal": "${pool}",
  "ideascale": "${idea}",
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
      var answer = fund + "/" + pool.replace(/\s/g, '-') + "/";
      return answer;
    }

    function githubQueryLink2(budgetB) {
      var answer = budgetB.replace(/\s/g, '-') + "/";
      return answer;
    }
    //Open in a new tab
  window.open("https://github.com/treasuryguild/Treasury-system-v2/new/main/Transactions/" + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2(budgetB) + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }
