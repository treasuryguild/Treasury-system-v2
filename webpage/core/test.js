let poolEl = document.getElementById("pool")
let projectEl = document.getElementById("project")
let orgEl = document.getElementById("org").value
let fundEl = document.getElementById("fund")
let repoEl = document.getElementById("repo").value
let walletEl = document.getElementById("wallet").value
let saveEl = document.getElementById("save-el")
let saveEl2 = document.getElementById("save-el2")
let balEl = document.getElementById("bal-el")

let items = document.getElementsByClassName('title');
let budgetItems = [].map.call(items, item => item.textContent.replace(/\s/g, '-'));
let items2 = document.getElementsByClassName('value');
let budgetItemsId = [].map.call(items2, item => item.id);
let items3 = document.getElementsByClassName('bb');
let budgetItemsVal = [].map.call(items3, item => item.id);
console.log(budgetItemsId);
console.log(budgetItemsVal);

var object = Object.assign({}, ...Object.entries({...budgetItems}).map(([a,b]) => ({ [b]: 0 })))
object.outgoing = 0;
object["Proposal-Funds"] = parseInt(balEl.textContent.replace( /^\D+/g, ''));

let t1El = document.getElementById("t1")

const bi = []
const t = []
const bal = []
const b = []
const x = []

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
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectEl.innerText.replace(/\s/g, '-')}/${fundEl.innerText}/${poolEl.innerText.replace(/\s/g, '-')}`;   
    xhr.open('GET', url, true);
    xhr.onload = function() {
      const data = JSON.parse(this.response);
      for (let i in data) {
        t[i] = (data[i].name).replace(/\s/g, '-');  // t[i] is used in the next const url below to get the last folder name
        const xhr = new XMLHttpRequest();
        const url = `https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectEl.innerText.replace(/\s/g, '-')}/${fundEl.innerText}/${poolEl.innerText.replace(/\s/g, '-')}/${t[i]}`;
        xhr.open('GET', url, true);   
        xhr.onload = function() {
            const data = JSON.parse(this.response);           
            // Loop over each object in data array
            for (let i in data) {
              getJSON(data[i].download_url)
              .then( data2 => {
                bi.push(data2);
                // => Data from github!
              }).catch( error => {
                throw error; // Oh no, something bad happened!
              });   
            }
        }       
        // Send the request to the server
        xhr.send();  
          // => Data from github!       
      }
  } 
  // Send the request to the server
  xhr.send();
  console.log(bi);
  console.log(t);

console.log(fundEl.innerText);
console.log(document.getElementById("budgetB")[3].value);

let percEl = 0
let percEl2 = 0
let count = 0

const getBalance = () => {
    axios.get(`https://pool.pm/wallet/${walletEl}`)
    .then(response => {
      for (let i in bi) {
        y = bi[i].budget.replace(/\s/g, '-')
        for (let j in t) {    
          if ( y == t[j]) {
            object[y] = object[y] + (parseInt(bi[i].ada));
            object.outgoing = object.outgoing + (parseInt(bi[i].ada));
          }        
        }
      }
      let outgoing = object.outgoing
      const balance = object["Incoming"].toFixed(2); //(response.data.lovelaces/1000000+outgoing).toFixed(2);
      const wBalance = (response.data.lovelaces/1000000).toFixed(2);
      console.log(balance);
      saveEl.textContent = "₳ " + balance
      saveEl2.textContent = "₳ " + wBalance
      let perc = balance/object["Proposal-Funds"]*100
      let perc2 = wBalance/object["Proposal-Funds"]*100
      percEl2 = (perc2).toFixed(2)
      percEl = (perc).toFixed(2)
      document.getElementById("save-el").style.width = percEl+"%"
      document.getElementById("save-el2").style.width = percEl2+"%"
      balEl.textContent = "USD " + object["Proposal-Funds"].toFixed(2)
      for (let i in budgetItemsId) {
        if (i > 2) {
        b[i] = document.getElementById(budgetItemsId[i])
        b[i].textContent = "₳ " + (balance/(budgetItemsId.length-2) - object[budgetItems[i]]).toFixed(2)
        x[i] = ((balance/(budgetItemsId.length-2) - object[budgetItems[i]])/(balance/(budgetItemsId.length-2))*100).toFixed(2)
        document.getElementById(`${budgetItemsId[i]}`).style.width = x[i]+"%"
        }
      }
    })
    .catch(error => console.error(error));
  };

getBalance();
console.log(object)

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
    const pool = poolEl.innerText
    const idea = getValue('ideaScale')
    const xrate = getValue('xrate')
    const fund = fundEl.innerText
    const project = projectEl.innerText
    
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
  window.open(`https://github.com/${orgEl}/${repoEl}/new/main/Transactions/` + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2(budgetB) + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }

