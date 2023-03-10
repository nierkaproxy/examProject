const body = document.querySelector("body");

const adsPage = (e) => {
  body.innerHTML = `<div class="container">
    <div class="row my-5">
      <h1 class="text-center text-secondary">ADs Page</h1>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <form class="px-3">
          <div class="mb-3">
            <label for="enterID" class="form-label text-secondary">Ad Code</label>
            <select class="form-select" id="enterID" aria-label="Default select example">
                <option selected>Select a category</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
                <option value="TV's">TV's</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="enterName" class="form-label text-secondary">Ad Name</label>
            <input type="text" class="form-control" id="enterName">
          </div>
          <div class="mb-3">
            <label for="enterPrice" class="form-label text-secondary">Price</label>
            <input type="number" class="form-control" id="enterPrice">
          </div>
          <div class="mb-3">
            <label for="enterQuantity" class="form-label text-secondary">Quantity</label>
            <input type="number" class="form-control" id="enterQuantity">
          </div>
          <div class="mb-3">
            <label for="enterDesc" class="form-label text-secondary">Description</label>
            <textarea class="form-control" id="enterDesc" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="insertImg" class="form-label text-secondary">Insert Image</label>
            <input type="text" class="form-control" id="insertImg">
          </div>
          <div class="mb-3 d-flex justify-content-around align-items-center">
            <button type="submit" class="btn btn-secondary" id="insert">Insert</button>
            <button type="submit" class="btn btn-danger" id="remove">Delete</button>
          </div>
        </form>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="row">
          <h5 class="text-center text-secondary">Find Ad by Code</h5>
          <form class="px-3" id="forma">
            <div class="mb-3">
              <label for="findID" class="form-label text-secondary">Ad Code</label>
              <select class="form-select" id="findID" aria-label="Default select example">
                <option selected>Select a category</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
                <option value="TV's">TV's</option>
            </select>
            </div>
            <div class="mt-3 d-flex justify-content-center">
              <button type="submit" class="btn btn-secondary" id="find">Search</button>
            </div>
          </form>
        </div>
        <div class="row mt-5">
          <h5 class="text-center text-secondary mb-3">Search Results</h5>
          <div class="list-group list-group-flush px-3" id="findData">
            
          </div>
        </div>
      </div>`;
};

export { adsPage };
