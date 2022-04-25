let saveEl = document.getElementById("save-el")
let saveEl2 = document.getElementById("save-el2")
let balEl = document.getElementById("bal-el")

let gahEl = document.getElementById("gah-el")
let caEl = document.getElementById("ca-el")
let fpEl = document.getElementById("fp-el")
let tamEl = document.getElementById("tam-el")
let spoEl = document.getElementById("spo-el")
let ucostEl = document.getElementById("ucost-el")
let percEl = 0
let percEl2 = 0
let count = 0
let gah = 0
let ca = 0
let fp = 291.032265 * 6 + 256.962177 + 34.252353 + 223.184 * 7
let tam = 555.555 + 555.555 + 555.555
let spo = 250.183 * 5
let prop = 37500.00  
let ucosts = 0    // aggregated unexpected cost expenses
let unCost = 0  //amount allocated 2500 USD

const outgoing = gah + ca + fp + tam + spo + ucosts

console.log(gahEl)
console.log(saveEl)

const getBalance = () => {
    axios.get('https://pool.pm/wallet/addr1qywhw76pn043rfu53eujfy7t6f52aef565z5jjrzx9kwva3tdl56g3r0jsp6zcdfzf4l6ysdz9u232z5mp28swllseesste93q')
    .then(response => {
     const balance = (response.data.lovelaces/1000000+outgoing).toFixed(2);
     const wBalance = (response.data.lovelaces/1000000).toFixed(2);
     const uCost = (unCost/5).toFixed(2);
     console.log(balance);
     saveEl.textContent = "₳ " + balance
     saveEl2.textContent = "₳ " + wBalance
     gahEl.textContent = "₳ " + (balance/5 - gah - uCost).toFixed(2)
     caEl.textContent = "₳ " + (balance/5 - ca - uCost).toFixed(2)
     fpEl.textContent = "₳ " + (balance/5 - fp - uCost).toFixed(2)
     tamEl.textContent = "₳ " + (balance/5 - tam - uCost).toFixed(2)
     spoEl.textContent = "₳ " + (balance/5 - spo - uCost).toFixed(2)
     balEl.textContent = "₳ " + prop.toFixed(2)
     let perc = balance/37500*100
     let perc2 = wBalance/37500*100
     percEl2 = (perc2).toFixed(2)
     percEl = (perc).toFixed(2)
     gahEl2 = ((balance/5 - gah - uCost)/(balance/5 - uCost)*100).toFixed(2)
     caEl2 = ((balance/5 - ca - uCost)/(balance/5 - uCost)*100).toFixed(2)
     fpEl2 = ((balance/5 - fp - uCost)/(balance/5 - uCost)*100).toFixed(2)
     tamEl2 = ((balance/5 - tam - uCost)/(balance/5 - uCost)*100).toFixed(2)
     spoEl2 = ((balance/5 - spo - uCost)/(balance/5 - uCost)*100).toFixed(2)
     document.getElementById("save-el").style.width = percEl+"%"
     document.getElementById("save-el2").style.width = percEl2+"%"
     document.getElementById("gah-el").style.width = gahEl2+"%"
     document.getElementById("ca-el").style.width = caEl2+"%"
     document.getElementById("fp-el").style.width = fpEl2+"%"
     document.getElementById("tam-el").style.width = tamEl2+"%"
     document.getElementById("spo-el").style.width = spoEl2+"%"
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

