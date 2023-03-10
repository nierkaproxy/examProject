
const adminFunc = () => {
const body = document.querySelector("body");
body.innerHTML = `
      <div id="logDiv">
        <div>
          <h5>Please Log in or Register</h5>
          <input type="text" id="user" placeholder="Enter email">
          <input type="password" id="pass" placeholder="Enter password">
          <input type="submit" id="submit" value="register">
          <input type="submit" id="login" value="login">
        </div>
      </div>
    `};

export { adminFunc }