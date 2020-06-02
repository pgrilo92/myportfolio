import React from 'react'
import image from'../../images/IMG_0060.jpg'
import './AboutPage.css'

const AboutPage = (props) => {
    return (
        <div>
            <div className="main-banner">
                <div className="about-joaquim">
                    <p className="info-joaquim">
                    About <br></br>
                    My name is Joaquim and I am a Software Engineering in Toronto looking to help your online Business.
                    </p>
                    <a
                        className="portfolio-link"
                        href="https://www.github.com/pgrilo92"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    Github Link
                    </a>
                </div>
                <img src={image} className="profile-foto" alt="joaquim-pic" />
            </div>
        </div>
    )
}

export default AboutPage
