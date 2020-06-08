import React from 'react'
import './PortfolioPage.css'
import alphaBlogImg from '../../images/alpha-blog.png'
import photoAppImg from '../../images/photo-app.png'
import blackcoaches from '../../images/blackcoaches.png'
import codex from '../../images/codex.png'

function PortfolioPage(props) {
    return (
        <div className={props.darkPortfolio}>
            <h3>Portfolio</h3>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={alphaBlogImg} alt="blog"/>
                        </div>
                        <div className="card-content">
                            <p>This is a blog I built using Ruby on Rail. Here you can create an account and comment on blog posts.</p>
                        </div>
                        <div className="card-action">
                            <a target="_blank" rel="noopener noreferrer" href="https://alpha-blog-joaquim.herokuapp.com/">View Website</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={photoAppImg} alt="pic-app"/>
                        </div>
                        <div className="card-content">
                            <p>Photo app allows users to post their photos to the cloud at a monthly subscription. Payments are done using Stripe.</p>
                        </div>
                        <div className="card-action">
                            <a target="_blank" rel="noopener noreferrer" href="https://joaquim-photo-app2.herokuapp.com/">View Website</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={blackcoaches} alt="blackcoaches"/>
                        </div>
                        <div className="card-content">
                            <p>Tour bus company based in europe.</p>
                        </div>
                        <div className="card-action">
                            <a target="_blank" rel="noopener noreferrer" href="https://blackcoaches.co.uk/">View Website</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={codex} alt="codex-app"/>
                        </div>
                        <div className="card-content">
                            <p>Software dev company website. Worked on some API's</p>
                        </div>
                        <div className="card-action">
                            <a target="_blank" rel="noopener noreferrer" href="https://codexperience.io/en">View Website</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    <iframe title="dancing-deboties" src="https://www.youtube.com/embed/JR6h-fFCQIc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>Game developed using Unity and deployed to the App store.</p>
                </div>
                <div className="col s12 m6">
                    <iframe title="escape-the-pyramid" src="https://www.youtube.com/embed/0HbtJJNirhE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>Developed on GameSalad.</p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioPage
