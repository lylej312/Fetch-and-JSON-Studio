window.addEventListener("load", function () {
  const fetchPromise = fetch(
    "https://handlers.education.launchcode.org/static/astronauts.json"
  ).then(function (response) {
    const jsonPromise = response.json();
    jsonPromise.then(function (json) {
      const div = document.getElementById("container");
      const length = json.length;
      let astronauts = json;
      let counter = 0;
      while (counter < length) {
        let currLargestAstronaut = astronauts[0];
        for (let i = 0; i < astronauts.length; i++) {
          let currAstronaut = astronauts[i];
          if (currAstronaut.hoursInSpace > currLargestAstronaut.hoursInSpace) {
            currLargestAstronaut = currAstronaut;
          }
        }

        let index = astronauts.indexOf(currLargestAstronaut);
        astronauts.splice(index, 1);

        div.innerHTML += `<div class="astronaut">
            <div class="bio">
            <h3>${currLargestAstronaut.firstName} ${currLargestAstronaut.lastName}</h3>
            <ul>
              <li>Hours in space: ${currLargestAstronaut.hoursInSpace}</li>
              
              <li class="activeStatus">Active: ${currLargestAstronaut.active}</li>
              <li>Skills: ${currLargestAstronaut.skills}</li>
            </ul>
          </div>
          <img class="avatar" src="${currLargestAstronaut.picture}">
          </div>`;

        counter++;
      }
      // Color change based on active status
      let activeStatus = document.getElementsByClassName("activeStatus");
      for (let i = 0; i < activeStatus.length; i++) {
        let statusText = activeStatus[i].innerText;
        if (statusText === "Active: true") {
          activeStatus[i].style.color = "green";
        } else {
          activeStatus[i].style.color = "red";
        }
      }
      // Astronaut count
      let astronautCount = document.getElementsByClassName("astronaut").length;
      let heading = document.querySelector(".heading");
      heading.innerText += ` (Count: ${astronautCount})`;
    });
  });
});
