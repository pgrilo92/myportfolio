import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="footer-copyright">
                <div className="container">
                    <p className="left">© 2020 Copyright Joaquim</p>
                    <a href="https://www.linkedin.com/in/joaquim-grilo" target="_blank" rel="noopener noreferrer" className="fa fa-linkedin right"></a>
                    <a href="https://www.github.com/pgrilo92" target="_blank" rel="noopener noreferrer" className="fa fa-github right"></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
