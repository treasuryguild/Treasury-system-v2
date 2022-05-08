let orgEl = document.getElementById("org").value
let repoEl = document.getElementById("repo").value
let budgetB = document.getElementById("budgetB").value
//Helper function to get value by id
function getValue(name){
    return document.getElementById(name).value
  }

  function validateSubmission(){
    //save all the input values
    const fund = getValue('fund')
    const project = getValue('project')
    const proposal = getValue('proposal')
    const ideascale = getValue('ideascale')
    const tfunds = getValue('total-funds-requested')   
    //generate a filename
    const filename = proposal.replace(/\s/g, '-') + ".html"  
    //Generate a string mimicing the file structure
    //Indentation is important here
    let fileText = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../core/style.css" rel="stylesheet">
    <title>Document</title>
</head>
<body>
</body>
</html>
`
    
    //Encode string to URI format
    const encodedFileText = encodeURIComponent(fileText)
    
    //Open in a new tab
  window.open(`https://github.com/${orgEl}/${repoEl}/new/main/webpage/transaction-files/` + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }
