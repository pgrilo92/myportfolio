import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

const Header = (props) => {
    const [sideWidth, setSideWidth] = React.useState(0)
    return (
    <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper">
                <Link className="brand-logo" to="/" onClick={()=> setSideWidth(0)}>Joaquim Grilo</Link>
                <a href="javascript:void(0)" onClick={()=> setSideWidth(250)} class="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a className="switch-dark-btn" onClick={props.darkMode}><i className="material-icons">{props.darkImage}</i></a></li>
                </ul>
            </div>
        </nav>
        <ul className="side" style={{width: sideWidth}}>
            <a href="javascript:void(0)" className="closebtn" onClick={()=> setSideWidth(0)}>&times;</a>
            <li><Link to="/" onClick={()=> setSideWidth(0)}>Home</Link></li>
            <li><Link to="/portfolio" onClick={()=> setSideWidth(0)}>Portfolio</Link></li>
            <li><Link to="/about" onClick={()=> setSideWidth(0)}>About</Link></li>
            <li><a className="switch-dark-btn" onClick={() => {
                props.darkMode() 
                setSideWidth(0)
                }}><i className="material-icons">{props.darkImage}</i></a></li>
        </ul>
    </div>
    )
}

export default Header
