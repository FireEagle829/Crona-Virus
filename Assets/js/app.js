const totalConfirmed = document.getElementById("value-infected"),
    totalDeath = document.getElementById("value-death"),
    totalRecovery = document.getElementById("value-recovery"),
    btnSearch = document.querySelector(".searchButton"),
    countryInput = document.getElementById("country"),
    tableBody = document.querySelector(".table-body"),
    ALERT = document.querySelector(".alert");

function getResult() {
    fetch("https://api.covid19api.com/summary")
        .then((response) => response.json())
        .then((data) => {
            const global = data["Global"];
            totalConfirmed.textContent = global.TotalConfirmed.toLocaleString('en')
            totalDeath.textContent = global.TotalDeaths.toLocaleString('en')
            totalRecovery.textContent = global.TotalRecovered.toLocaleString('en')
        });
}
getResult();
btnSearch.addEventListener("click", () => {
    let input = countryInput.value;
    tableBody.innerHTML = "";
    ALERT.textContent = "";
    let tr = document.createElement("tr");
    tr.classList.add("change-background");
    fetch("https://api.covid19api.com/summary")
        .then((response) => response.json())
        .then((data) => {
            let countries = data["Countries"];
            var countryTracer;
            for (const countryObj of countries) {
                if (
                    countryObj.Country.toLowerCase() === input.toLowerCase() ||
                    countryObj.Slug.toLowerCase() === input.toLowerCase()
                ) {
                    tr.innerHTML = `
            <td>${countryObj.Country}</td>
            <td>${countryObj.TotalConfirmed.toLocaleString('en')}</td>
            <td>${countryObj.NewConfirmed.toLocaleString('en')}</td>
            <td>${countryObj.TotalDeaths.toLocaleString('en')}</td>
            <td>${countryObj.NewDeaths.toLocaleString('en')}</td>
            <td>${countryObj.TotalRecovered.toLocaleString('en')}</td>
            <td>${countryObj.NewRecovered.toLocaleString('en')}</td>
            `;
                    countryTracer = 1;
                }
                if (countryTracer === 1) {

                    let date = data["Date"];
                    let newDate = Array.from(date);

                    let reversedDate = newDate.splice(2, 8).join(" ").split('-').reverse().join(" - ");
                    ALERT.textContent = `the data found for 
                    the day : ${reversedDate}`;
                } else {
                    ALERT.textContent = `Failed to find data for ${input}`;
                }
            }
        });
    tableBody.appendChild(tr);
});