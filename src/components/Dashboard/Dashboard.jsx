import React from 'react'
import dash from "./dashboard.module.css";
import logo from "../../assets/logo.svg"

const Dashboard = () => {
  return (
    <div className={dash.dash_container}>
        <div className={dash.side_nav}>
            <img src={logo} alt="logo" style={{width: '145px', height: '37px'}}/>

            <div className={dash.nav_top}>
                <div>
                    <div>
                        <a href="#">Find Jobs</a>
                    </div>
                    <div>
                        <a href="#">Contracts</a>
                    </div>
                    <div>
                        <a href="#">Messages</a>
                    </div>
                    <div>
                        <a href="#">Settings</a>
                    </div>
                </div>
                <div>
                    <a href="#">Logout</a>
                </div>
            </div>
        </div>

        <div className={dash.dash_right}>
            <nav><p>Find Jobs</p></nav>
        </div>
    </div>
  )
}

export default Dashboard;