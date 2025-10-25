console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
      console.log(response);
   }
   const data = await response.json();
   return data;


  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export async function fetchGitHubData(username) {



  return fetchJSON(`https://api.github.com/users/${username}`);

}


export function renderProjects(project, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = '';


  for (let p of project) {
    const article = document.createElement('article');

    article.innerHTML = 
      `<${headingLevel}>${p.title}</${headingLevel}>
      <img src="${p.image}" alt="${project.title}">
      <p>${p.description}</p>`;
    containerElement.appendChild(article);

  }

  
}

export function addProjectTitle(len) {

  const titleContainer = document.querySelector('.projects-title');
  const h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode(`${len} Projects`));
  titleContainer.appendChild(h1);
}

function getUrl(url){
  
 const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:9999/"                  // Local server
    : "https://johnny-timmers.github.io/My-repo/";         // GitHub Pages repo name
 return !url.startsWith('http') ? BASE_PATH + url : url;
}

if (localStorage.colorScheme !== null) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  }

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  {url: 'https://github.com/Johnny-Timmers', title:'Profile'},
  {url: 'resume/', title:'Resume'}
];

let nav = document.createElement('nav');
document.body.prepend(nav);


for (let p of pages) {
  let url = p.url;
  let title = p.title;
  let a = document.createElement('a');
  a.href = getUrl(url);
  a.textContent = title;
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  if (a.host !== location.host) {
    a.target = "_blank";
  }
  nav.append(a);

}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
		</select>
	</label>`,
);

let select = document.querySelector('.color-scheme');

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  

document.documentElement.style.setProperty('color-scheme', event.target.value);
localStorage.colorScheme = event.target.value;
});




