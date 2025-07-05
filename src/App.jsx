import { useState } from "react";

import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState,setProjectsState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[],
  })

  function handleAddTask(text){
    setProjectsState(pre=>{
      const taskId=Math.random()
      const newTask={
        text:text,
        id:taskId,
        projectId:pre.selectedProjectId
      }

      return{
        ...pre,
        tasks:[newTask,...pre.tasks]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectsState(pre=>{
      return{
        ...pre,
        tasks: pre.tasks.filter(
          (task)=> task.id !== id
        )
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState(pre=>{
      return{
        ...pre,
        selectedProjectId:id,
      }
    })
  }

  function handleStartAddProject(){
    setProjectsState(pre=>{
      return{
        ...pre,
        selectedProjectId:null
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState(pre=>{
      return{
        ...pre,
        selectedProjectId:undefined
      }
    })
  }

  function handleAddProject(projectData){
    setProjectsState(pre=>{
      const projectId=Math.random()
      const newProject={
        ...projectData,
        id:projectId
      }

      return{
        ...pre,
        selectedProjectId:undefined,
        projects:[...pre.projects,newProject ]
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(pre=>{
      return{
        ...pre,
        selectedProjectId:undefined,
        projects: pre.projects.filter(
          (project)=> project.id !== pre.selectedProjectId
        )
      }
    })
  }

  const selectedProject=projectsState.projects.find(
    (project)=> project.id=== projectsState.selectedProjectId
  )
  let content = (
  <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectsState.tasks}
  />
);
  if(projectsState.selectedProjectId===null){
    content=<NewProject  onAddProject={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>
  } 

  return (
    <>
    <main className="my-8 h-screen flex gap-8">
      <ProjectSideBar
      onSelectProject={handleSelectProject}
       onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
        />
      {content}
    </main>
      
    </>
  );
}

export default App;
