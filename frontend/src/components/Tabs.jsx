import React from 'react'
import DashboardContent from './Dashboard'
import Project from './Project'
import Starred from './Starred'
import Recent from './Recent'


const Tab = ({activeTab}) => {

  console.log("active tab from tab component", activeTab)
  return (
    <div className='w-full'>

        {activeTab === "dashboard" && <DashboardContent/>}
        {activeTab === "projects" &&  <Project/>}
        {activeTab === "recent" && <Recent/>}
        {activeTab === "starred" && <Starred/>}
     </div>
  )
}

export default Tab
