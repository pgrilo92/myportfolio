import React from 'react'
import './HomePage.css'

function HomePage() {
    return (
        <div className='Home-Page'>
            <div className="container intro">
                <h1 className="main-title">Software Engineering</h1>
                <br/>
                <h5 className="main-header-5">Helping shape the future one line at a time.</h5>
                <div className="mainpage-jumb"></div> 
            </div>
            <div className="row">
                <div className="col s4">
                    <i className="large material-icons">work</i>
                    <h3>Work</h3>
                    <p>Work can be done remotely with meetings over video chat. Work will be done by project basis instead of hourly. Avoid any surprise costs.</p>
                </div>
                <div className="col s4">
                    <i className="large material-icons">code</i>
                    <h3>Code</h3>
                    <p>Focus on efficient and easily read code. This assures that the code is ready for other developers.</p>
                </div>
                <div className="col s4">
                    <i className="large material-icons">cloud</i>
                    <h3>Cloud</h3>
                    <p>The time is now to move your presence online, especially at times like this. It shows us the importance of onlince presence.</p>
                </div>
            </div>
            <div className="container second">
                <h1>Dev Tools </h1>
                <br/>
                <h5>A list of the stacks I currently use</h5>
            </div>
            <h3 className="lang-title">Languages</h3>
            <div className="row">
                <div className="col s4">
                    <i className="large devicon-javascript-plain colored"></i>
                    <h3>JavaScript</h3>
                    <p>The most popular language today due to its versatility and cross-platform capabilities. This is the current language I use the most.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-python-plain colored"></i>
                    <h3>Python</h3>
                    <p>A very powerful language, yet very easy to read. So far, I am mainly focused on the web dev side, but I am looking to expand towards the machine learning side of the language.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-csharp-plain colored"></i>
                    <h3>C#</h3>
                    <p>This language can be used for multiple tasks. I currently used it mostly focused on Unity development for mobile apps.</p>
                </div>
            </div>
            <h3 className="lang-title">Frameworks</h3>
            <div className="row">
                <div className="col s4">
                    <i className="large devicon-nodejs-plain colored"></i>
                    <h3>NodeJS/Express</h3>
                    <p>Express is a great framework to develop with Javascript because it is very lightweight and customizable.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-django-plain colored"></i>
                    <h3>Django</h3>
                    <p>Great framework, comes with a lot of tools already implemented.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-rails-plain colored"></i>
                    <h3>Ruby on Rails</h3>
                    <p>Similar to Django, this was one of the first frameworks to come with all tools needed to create great webapps.</p>
                </div>
            </div>
            <h3 className="lang-title">Frontend</h3>
            <div className="row">
                <div className="col s4">
                    <i className="large devicon-react-plain colored"></i>
                    <h3>React</h3>
                    <p>React is a great framework that separates front-end and back-end as separates apps. It makes it easier to manage pages and control the state.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-jquery-plain colored"></i>
                    <h3>jQuery</h3>
                    <p>jQuery and vanilla JavaScript, help add functionality and cool effects to the UX.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-bootstrap-plain colored"></i>
                    <h3>BootStrap</h3>
                    <p>Bootstrap, Materialize and many other front end frameworks improve the UI of an application.</p>
                </div>
            </div>
            <h3 className="lang-title">Others</h3>
            <div className="row">
                <div className="col s4">
                    <i className="large devicon-swift-plain colored"></i>
                    <h3>XCode</h3>
                    <p>XCode is the main software used to create Apple apps, using a very dynamic language, Swift.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-python-plain colored"></i>
                    <h3>Adobe/Unity</h3>
                    <p>Adobe used for creating images, icons, and logos. Unity is a very powerful software for gaming but can be used for exploring tools for VR/AR as well.</p>
                </div>
                <div className="col s4">
                    <i className="large devicon-mongodb-plain colored"></i>
                    <h3>MongoDB</h3>
                    <p>NoSQL is great due to its flexibility, as long as it is properly set up from the beggining. SQL is great as well, although it is a more rigid database format.</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
