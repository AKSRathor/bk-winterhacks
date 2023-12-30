import React from 'react'
import "./Notification.css"
import DashBoardNav from '../DashBoardNav'
import NotificationCard from './NotificationCard'


const allNotif = [
  
  {
    head: "Operation Successful",
    paraNoti: "Your request has been processed successfully."
},
{
  head: "Error Occurred",
  paraNoti: "An unexpected error occurred while processing your request. Please try again later."
},
{
  head: "Important Information",
  paraNoti: "Please note that our office will be closed for the upcoming holiday on [Date]. We apologize for any inconvenience this may cause."
},
{
  head: "Warning!",
  paraNoti: "Your account balance is running low. Please consider adding funds to avoid any service interruptions."
},
{
  head: "Account Update",
  paraNoti: "Your profile information has been updated. If you did not make this change, please contact our support team immediately."
},
{
  head: "Password Reset",
  paraNoti: "You have requested a password reset. Click the link below to create a new password: [Password Reset Link]"
}






]


const Notification = () => {
  return (
    <div className='notificationSection'>

      <div className="rightSideNotificationArea">
        <div className="notificationHead"><h1>Notifications</h1></div>
        <div className="allNotifications">
          {allNotif.map((i, index)=>{
            return <NotificationCard i  ={i} key = {index}/>
          })}
          
        </div>
      </div>
    </div>
  )
}

export default Notification