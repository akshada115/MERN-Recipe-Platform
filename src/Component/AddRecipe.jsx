import React, { useContext, useState } from "react";
import { AppContext } from "../Context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();
  const { addRecipe } = useContext(AppContext);
  const [formData, setformData] = useState({
    title: "",
    instructions: "",
    ingrediant1: "",
    ingrediant2: "",
    ingrediant3: "",
    ingrediant4: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty4: "",
    imgURL: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const onSubmitHanlder = async (e) => {
    e.preventDefault();
  
    const {
      title,
      instructions,
      ingrediant1,
      ingrediant2,
      ingrediant3,
      ingrediant4,
      qty1,
      qty2,
      qty3,
      qty4,
      imgURL,
    } = formData;
  
    const result = await addRecipe(
      title,
      instructions,
      ingrediant1,
      ingrediant2,
      ingrediant3,
      ingrediant4,
      qty1,
      qty2,
      qty3,
      qty4,
      imgURL
    );
  
    if (result.success) {
      toast.success(result.data.message || "Recipe added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(result.data.message || "Failed to add recipe", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={11}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
     <div className="container my-5 pd-5" style={{ border: "3px solid grey", borderRadius: "10%", width: "500px" }}>
  <h2 className="text-center">Add Recipe</h2>
  <form onSubmit={onSubmitHanlder} style={{ width: "400px", margin: "auto" }} className="my-3 pd-3">
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          className="form-control"
          id="title"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="instructions" className="form-label">Instructions</label>
        <input
          value={formData.instructions}
          onChange={onChangeHandler}
          type="text"
          name="instructions"
          className="form-control"
          id="instructions"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="ingrediant1" className="form-label">Ingredient 1</label>
        <input
          value={formData.ingrediant1}
          onChange={onChangeHandler}
          type="text"
          name="ingrediant1"
          className="form-control"
          id="ingrediant1"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="qty1" className="form-label">Quantity 1</label>
        <input
          value={formData.qty1}
          onChange={onChangeHandler}
          type="text"
          name="qty1"
          className="form-control"
          id="qty1"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="ingrediant2" className="form-label">Ingredient 2</label>
        <input
          value={formData.ingrediant2}
          onChange={onChangeHandler}
          type="text"
          name="ingrediant2"
          className="form-control"
          id="ingrediant2"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="qty2" className="form-label">Quantity 2</label>
        <input
          value={formData.qty2}
          onChange={onChangeHandler}
          type="text"
          name="qty2"
          className="form-control"
          id="qty2"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="ingrediant3" className="form-label">Ingredient 3</label>
        <input
          value={formData.ingrediant3}
          onChange={onChangeHandler}
          type="text"
          name="ingrediant3"
          className="form-control"
          id="ingrediant3"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="qty3" className="form-label">Quantity 3</label>
        <input
          value={formData.qty3}
          onChange={onChangeHandler}
          type="text"
          name="qty3"
          className="form-control"
          id="qty3"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="ingrediant4" className="form-label">Ingredient 4</label>
        <input
          value={formData.ingrediant4}
          onChange={onChangeHandler}
          type="text"
          name="ingrediant4"
          className="form-control"
          id="ingrediant4"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="qty4" className="form-label">Quantity 4</label>
        <input
          value={formData.qty4}
          onChange={onChangeHandler}
          type="text"
          name="qty4"
          className="form-control"
          id="qty4"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12 mb-3">
        <label htmlFor="imgURL" className="form-label">Image URL</label>
        <input
          value={formData.imgURL}
          onChange={onChangeHandler}
          type="text"
          name="imgURL"
          className="form-control"
          id="imgURL"
        />
      </div>
    </div>

    <div className="container d-flex justify-content-between">
      <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Add Recipe
      </button>
    </div>
  </form>
</div>
</div>
  );
}

export default AddRecipe;