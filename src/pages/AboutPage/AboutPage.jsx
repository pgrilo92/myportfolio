import React from 'react'
import image from'../../images/IMG_0060.jpg'
import './AboutPage.css'

const AboutPage = (props) => {
    return (
        <div className={props.darkAbout}>
            <div className="col s12 m6">
                <img src={image} className="profile-foto" alt="joaquim-pic" />
            </div>
            <div className="about-joaquim col s12 m6">
                <h5 className="info-joaquim">
                    About
                </h5>
                <p>
                    My name is Joaquim and I am a Software Engineering in Toronto helping grow your online Business.
                </p>
                <p>My current main focus is on web developement in a variety of stacks.</p>
                <p>Began my journey creating an App for my startup for home cooked meal deliveries, MaMadeIt.</p>
                <p>Since then I have explored many of my passions such as creating my own game in the app store and exploring other technologies such as AR.</p>
            </div>
        </div>
    )
}

export default AboutPage
