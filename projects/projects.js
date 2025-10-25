import { fetchJSON, renderProjects, addProjectTitle} from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');



addProjectTitle(projects.length);
renderProjects(projects, projectsContainer, 'h2');
