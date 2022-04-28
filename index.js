    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/repos/treasuryguild/Treasury-system-v2/contents/webpage/transaction-files`;
    // Replace -username- with your GitHub username, -repo- with the repository name

    xhr.open('GET', url, true);

    xhr.onload = function() {
        const data = JSON.parse(this.response);
        
        // Loop over each object in data array
        for (let i in data) {

            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');
    
            // Create variable that will create li's to be added to ul
            let li = document.createElement('div');
        
            // Create the html markup for each li
            li.innerHTML = (`
                <button onclick="location.href='${data[i].path}';">${data[i].name.replace(/\..+$/, '')}</button>
            `);
            // Append each li to the ul
            ul.appendChild(li);
        
        }

    }
    
    // Send the request to the server
    xhr.send();
    

