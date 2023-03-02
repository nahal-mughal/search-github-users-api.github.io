const APIURL = "https://api.github.com/users/";
const main = document.querySelector("main");
const searchBox = document.querySelector("#search");

const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    // console.log(data);
    const card = `
    <div>
    <img id="avatar" src="${data.avatar_url}" alt="profile">
    </div>
    <div class="card">
             <h2>${data.name}</h2>
             <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.following} <strong>Following </strong> </li>
                    <li>${data.followers} <strong>Followers </strong> </li>
                    <li>${data.public_repos} <strong>Repos </strong> </li>
                 </ul>

            <div class="repos">
            </div>
        </div>`

    main.innerHTML = card;
    getRepos(username)
}

// init call
getUser("c9s")


const getRepos = async (username) => {
    const repo = document.querySelector(".repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach(
        (item) => {

            const element = document.createElement("a");
            element.classList.add("repo");
            element.innerText = item.name;
            element.href = item.html_url;
            element.target = "_blank";
            repo.appendChild(element)

        })
}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}


searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit()
    }
)
