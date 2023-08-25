import Link from "next/link";

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/withAPI_4" className="navbar-item">
              Content Manager
            </Link>
            {/* <a className="navbar-item" href="../">
              <span>Content Manager</span>
            </a> */}
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <div className=" navbar-item">
                <div className="control has-icons-left">
                  <input
                    className="input is-rounded"
                    type="email"
                    placeholder="Search"
                  />
                  <span className="icon is-left">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
              <Link
                href="/withAPI_4"
                className="navbar-item is-active is-size-5 has-text-weight-semibold">
                Home
              </Link>
              {/* 
                // 1)
                <a className="navbar-item is-active is-size-5 has-text-weight-semibold">
                  Home
                </a> 
              */}
              {/* 
                We can use <a href="/resources/new_5" />. However,
                it refreshes the browser. We would need to implement the link
                in a different way with Link.

                <a
                  href="/resources/new_5"
                  className="navbar-item is-size-5 has-text-weight-semibold">
                  Add
                </a>
              */}

              {/* We can apply css into Link */}
              <Link
                href="/resources/new_5"
                className="navbar-item is-size-5 has-text-weight-semibold">
                {/* 2) */}
                Add
                {/* 1) <h1 className="is-size-5 has-text-weight-semibold">Add</h1> */}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;