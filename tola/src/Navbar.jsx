function Navbar(props) {
    return(
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">Training</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">Maxes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page">Programs</a>
          </li>
        </ul>
    )
}

export default Navbar