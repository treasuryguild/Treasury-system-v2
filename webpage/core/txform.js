let poolEl = document.getElementById("pool")
let projectEl = document.getElementById("project")
let fundEl = document.getElementById("fund")
let saveEl = document.getElementById("save-el")
let saveEl2 = document.getElementById("save-el2")
let balEl = document.getElementById("bal-el")

let b1El = document.getElementById("b1")
let b2El = document.getElementById("b2")
let b3El = document.getElementById("b3")
let b4El = document.getElementById("b4")
let b5El = document.getElementById("b5")

let t1El = document.getElementById("t1")

const bi = []
var b1 = 0
let b2 = 0
let b3 = 291.032265 * 6 + 256.962177 + 34.252353 + 223.184 * 7
let b4 = 555.555 + 555.555 + 555.555
let b5 = 250.183 * 5

function getJSON(url) {
  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = () => {
      if (xhr.readyState < 4) {
        // The XHR request hasn't completed yet, so I'm just going to return here.
        return;
      }

      if (xhr.status !== 200) {
        // The Status code of the request is NOT 200, so it must have failed in some way. Reject the promise
        reject(xhr.response);
      }
      if (xhr.readyState === 4) {
        // The readyState of the request is '4', which means its done.
        // Parse the response into JSON format and resolve the promise
        resolve(JSON.parse(xhr.response));
      }
    }
    xhr.send();
  });
}

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/repos/treasuryguild/Treasury-system-v2/contents/Transactions/${projectEl.innerText.replace(/\s/g, '-')}/${fundEl.innerText}/${poolEl.innerText.replace(/\s/g, '-')}/${t1El.innerText}`;
    // Replace -username- with your GitHub username, -repo- with the repository name, and then :path with a path to the file or folder you want to get the content of (leave blank to ge all files of the repository)

    xhr.open('GET', url, true);

    xhr.onload = function() {
        const data = JSON.parse(this.response);
        
        // Loop over each object in data array
        for (let i in data) {
          getJSON(data[i].download_url)
          .then( data2 => {
            b1 = b1 + parseInt(data2.ada)
            bi.push(data2.ada);
            console.log(data2);
            
            // => Data from github!
          }).catch( error => {
            throw error; // Oh no, something bad happened!
          });   
        }
    }
    
    // Send the request to the server
    xhr.send();
console.log(fundEl.innerText);
console.log(bi);
let percEl = 0
let percEl2 = 0
let count = 0
let prop = 37500.00  
let ucosts = 0    // aggregated unexpected cost expenses
let unCost = 0  //amount allocated 2500 USD

const outgoing = b1 + b2 + b3 + b4 + b5 + ucosts

const getBalance = () => {
    axios.get('https://pool.pm/wallet/addr1qywhw76pn043rfu53eujfy7t6f52aef565z5jjrzx9kwva3tdl56g3r0jsp6zcdfzf4l6ysdz9u232z5mp28swllseesste93q')
    .then(response => {
     const balance = (response.data.lovelaces/1000000+outgoing).toFixed(2);
     const wBalance = (response.data.lovelaces/1000000).toFixed(2);
     const uCost = (unCost/5).toFixed(2);
     console.log(balance);
     saveEl.textContent = "₳ " + balance
     saveEl2.textContent = "₳ " + wBalance
     b1El.textContent = "₳ " + (balance/5 - b1 - uCost).toFixed(2)
     b2El.textContent = "₳ " + (balance/5 - b2 - uCost).toFixed(2)
     b3El.textContent = "₳ " + (balance/5 - b3 - uCost).toFixed(2)
     b4El.textContent = "₳ " + (balance/5 - b4 - uCost).toFixed(2)
     b5El.textContent = "₳ " + (balance/5 - b5 - uCost).toFixed(2)
     balEl.textContent = "₳ " + prop.toFixed(2)
     let perc = balance/37500*100
     let perc2 = wBalance/37500*100
     percEl2 = (perc2).toFixed(2)
     percEl = (perc).toFixed(2)
     b1El2 = ((balance/5 - b1 - uCost)/(balance/5 - uCost)*100).toFixed(2)
     b2El2 = ((balance/5 - b2 - uCost)/(balance/5 - uCost)*100).toFixed(2)
     b3El2 = ((balance/5 - b3 - uCost)/(balance/5 - uCost)*100).toFixed(2)
     b4El2 = ((balance/5 - b4 - uCost)/(balance/5 - uCost)*100).toFixed(2)
     b5El2 = ((balance/5 - b5 - uCost)/(balance/5 - uCost)*100).toFixed(2)
     document.getElementById("save-el").style.width = percEl+"%"
     document.getElementById("save-el2").style.width = percEl2+"%"
     document.getElementById("b1").style.width = b1El2+"%"
     document.getElementById("b2").style.width = b2El2+"%"
     document.getElementById("b3").style.width = b3El2+"%"
     document.getElementById("b4").style.width = b4El2+"%"
     document.getElementById("b5").style.width = b5El2+"%"
   })
    .catch(error => console.error(error));
   };

getBalance();


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

