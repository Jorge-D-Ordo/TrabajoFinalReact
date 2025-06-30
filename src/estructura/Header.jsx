import React from 'react'
import Nav from '../componentes/Nav'
import rosa128px from '../assets/img/logos/rosa_128px.png';
import millanelLogo from '../assets/img/logos/millanel_logo.png';

const Header = () => {

  let general = {
    backgroundColor: "#ea98ff",
    padding: "10px",
    textAlign: "center",
    color: "white",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    margin: '0',
    height: "115px"
  }
  let contenedorInterno = {
    maxWidth: "1280px",
    margin: "0 auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 40px',

    height: '60px',
  }
  let estiloTexto = {
    flexGrow: 1,              // Ocupa el espacio entre íconos
    textAlign: 'center',
    fontFamily: '"Playwrite AR", serif',
    fontSize: '35px',
    fontWeight: 'bold'
  }
  let estiloIcono = {
    width: '60px',
    height: '60px',
  }

  return (
    <header style={general}>
      <div style={contenedorInterno}>
        <img src={rosa128px} alt="LogoEmpresa" style={estiloIcono} />
        <h1 style={estiloTexto}>Fragancias Argentinas</h1>
        <img src={millanelLogo} alt="LogoMillanel" style={estiloIcono} />
      </div>
      <Nav />




    </header>
  )
}

export default Header
