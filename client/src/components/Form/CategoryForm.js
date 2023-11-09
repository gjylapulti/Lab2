import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#ff99cc",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
