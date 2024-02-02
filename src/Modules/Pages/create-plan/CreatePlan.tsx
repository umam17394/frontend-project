import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../Layouts/NavBar";
import Header from "../../../Layouts/Header";
import { Planservice } from "../../Services/PlanService";
import { IcreatePlan } from "../../Models/ICreatePlan";
import { IPlanCategory } from "../../Models/IPlanCategory";

const CreatePlan: React.FC = () => {
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState<IcreatePlan>({
    planId: 0,
    planName: "",
    startDate: "",
    endDate: "",
    categoryId: 0,
  });

  const [categories, setCategories] = useState<IPlanCategory[]>([]);

  useEffect(() => {
    Planservice.getAllCategories()
      .then((response) => {
        console.log("Categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPlanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !planDetails.planName ||
      !planDetails.startDate ||
      !planDetails.endDate ||
      planDetails.categoryId === 0
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    Planservice.createPlan(planDetails)
      .then((response) => {
        if (response.data != null) {
          alert("Plan added successfully!");
          navigate("/viewplan");
        }
      })
      .catch((error) => {
        console.error("Error creating plan:", error);
      });
  };

  return (
    <>
      <NavBar color="bg-dark" />
      <Header heading="Create A Plan" color={"text-success"} />
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="planName">Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="planName"
                    name="planName"
                    value={planDetails.planName}
                    onChange={handleInputChange}
                    placeholder="Enter Plan Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={planDetails.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={planDetails.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6 mt-2">
                  <label htmlFor="categoryId">Select Category</label>
                  <select
                    className="form-control mt-1"
                    id="categoryId"
                    name="categoryId"
                    value={planDetails.categoryId}
                    onChange={handleInputChange}
                  >
                    <option value=" ">Select a Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <Link to="/" className="btn btn-danger">
                  <span className="bi bi-backspace-fill me-1"></span>Back
                </Link>

                <button type="submit" className="btn btn-success">
                  <span className="bi bi-plus-circle-fill me-1"></span>Add Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlan;
