import logo from '../img/logo.png'

function Login(props) {
    return(
      <div className="container align-content-center" id='login-cont'> 
        <div className="row justify-content-center">
          <div className="col-10">
            <img class="ratio" src={logo} alt="logo" id='login-logo'/>
          </div>
        </div>
        <main class="form-signin w-100 m-auto d-flex justify-content-center">
          <form>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
              <input type="email" class="form-control login" id="floatingInput" placeholder="name@example.com"/>
              <label for="floatingInput">Email address</label>
          
            </div>
            <div class="form-floating">
              <input type="password" class="form-control login" id="floatingPassword" placeholder="Password"/>
              <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary login" type="submit">Sign in</button>
            <br/>
            <button class="w-100 btn btn-lg btn-primary login" type="submit">Register</button>
            <p class="mt-5 mb-3 text-muted">©2022</p>
          </form>
        </main>
      </div>
    )
}

export default Login