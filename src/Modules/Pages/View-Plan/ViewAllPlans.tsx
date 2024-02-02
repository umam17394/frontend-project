import React, { useState, useEffect } from "react";
import NavBar from "../../../Layouts/NavBar";
import Header from "../../../Layouts/Header";
import { Planservice } from "../../Services/PlanService";
import { IcreatePlan } from "../../Models/ICreatePlan";
import { Link } from "react-router-dom";

const ViewAllPlans = () => {
  const [plans, setPlans] = useState<IcreatePlan[]>([]);
  const [categories, setCategories] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    Planservice.getAllPlans()
      .then((response) => setPlans(response.data))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);
  useEffect(() => {
    console.log("Fetching categories...");
    Planservice.getAllCategories()
      .then((response) => {
        const categoryMap: { [key: number]: string } = {};
        response.data.forEach((category) => {
          categoryMap[category.categoryId] = category.categoryName;
        });
        setCategories(categoryMap);
        console.log("Categories fetched successfully:", categoryMap);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  const handleDelete = (planId: number) => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (userConfirmation) {
      Planservice.deletePlan(planId)
        .then((response) => {
          if (response.data) {
            setPlans((prevPlans) =>
              prevPlans.filter((plan) => plan.planId !== planId)
            );
            alert("Plan deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error deleting plan:", error);
          alert("Error deleting plan. Please try again.");
        });
    }
  };

  return (
    <>
      <NavBar color="bg-dark" />
      <Header heading="View All Plans Here" color={"text-warning"} />
      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table table-stripped table-hover shadow-lg">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Sno</th>
                  <th>Plan Name</th>
                  <th>Plan Start Date</th>
                  <th>Plan End Date</th>
                  <th>Plan Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white text-dark">
                {plans.map((plan, index) => (
                  <tr key={plan.planId}>
                    <td>{plan.planId}</td>
                    <td>{plan.planName}</td>
                    <td>{plan.startDate}</td>
                    <td>{plan.endDate}</td>
                    <td>{categories[plan.categoryId]}</td>
                    <td>
                      <td>
                        <Link
                          to={`/update/${plan.planId}`}
                          className="btn btn-primary"
                        >
                          <span className="bi bi-pencil-square"></span>
                        </Link>
                      </td>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(plan.planId)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-success">
                        <i className="bi bi-toggle-on"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to={`/createplan`} className="btn btn-secondary">
              <span className="bi bi-backspace-fill me-1"></span>Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllPlans;
