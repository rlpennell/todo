import events from "./eventsBus";

function initProjectHandler() {
  events.on('createProject', createNewProject);
  getExistingProjects();
  events.on('taskComplete', updateTaskStatus);
  events.on('addNewTask', addNewTask);
  events.on('removeTag', removeTag);
}

let projects = [];

function getExistingProjects() {
  if (projects[0] !== undefined) {
    events.emit('createProject', projects);
  }
}

class Project {
  constructor(title, description, dueDate, priority, notes, tags) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.id = `proj${document.getElementsByClassName('project').length}`;
    this.tasks = [];
    this.tags = tags;
  }

}

export const createNewProject = (data) => {
  let newProject = new Project(data[0], data[1], data[2], data[3], data[4], data[5]);
  projects.push(newProject);
  events.emit('newProject', newProject);
  console.log(newProject);
}

function addNewTask(task){
  const project = projects.find(project => project.id === task.parent);
  task.identifier = `${project.id}-task${project.tasks.length}`;
  project.tasks.push(task);
  events.emit('drawTask', [task, project]);
}

function updateTaskStatus(taskId) {
  const data = taskId.id.split('-');
  const project = projects.find(project => project.id === data[0])
  const task = project.tasks.find(task => task.id === taskId.id);
  task.status = !task.status;
  events.emit('taskStatusChanged', [taskId.id, task.status]);
}

function removeTag(tag) {
  const id = tag.parentNode.parentNode.id;
  const project = projects.find(project => project.id === id);
  const tagToDelete= tag.parentNode.firstChild.textContent;
  project.tags.splice(project.tags.indexOf(project.tags.find(item => item.content === tagToDelete)), 1);
}
export default initProjectHandler;