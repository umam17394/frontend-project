import React, { useState, useEffect } from "react";
import NavBar from "../../../Layouts/NavBar";
import Header from "../../../Layouts/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Planservice } from "../../Services/PlanService";
import { IcreatePlan } from "../../Models/ICreatePlan";
import { IPlanCategory } from "../../Models/IPlanCategory";

const EditPlan: React.FC = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();
  const [categories, setCategories] = useState<IPlanCategory[]>([]);
  const [planDetails, setPlanDetails] = useState<IcreatePlan>({
    planId: 0,
    planName: "",
    startDate: "",
    endDate: "",
    categoryId: 0,
  });

  useEffect(() => {
    if (planId) {
      getPlanFromServer(planId);
    }
  }, [planId]);

  useEffect(() => {
    getAllCategoriesFromServer();
  }, []);

  const getAllCategoriesFromServer = () => {
    Planservice.getAllCategories()
      .then((categoryResponse) => {
        const categories = categoryResponse.data;
        setCategories(categories);
      })
      .catch((error) => console.log(error));
  };

  const getPlanFromServer = (planId: string) => {
    Planservice.getPlan(Number(planId))
      .then((planResponse) => {
        const plan = planResponse.data;
        setPlanDetails(plan);
      })
      .catch((error) => {
        console.error("Error fetching plan:", error);
      });
  };

  const updateInput = (
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
    if (planId) {
      const parsedPlanId = Number(planId);
      if (!isNaN(parsedPlanId)) {
        Planservice.updatePlan(planDetails, parsedPlanId)
          .then((response) => {
            if (response.data) {
              navigate("/viewplan");
              alert("Plan updated successfully!");
            }
          })
          .catch((error) => {
            console.error("Error updating plan:", error);
            alert("Error updating plan. Please try again.");
          });
      } else {
        console.error("Invalid planId");
      }
    }
  };

  return (
    <>
      <NavBar color="bg-dark" />
      <Header heading="Update Plan" color={"text-primary"} />
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <input
                  required={true}
                  name={"planName"}
                  value={planDetails.planName}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Plan Name"
                  type="text"
                />
              </div>
              <div className="mb-2">
                <input
                  required={true}
                  name={"startDate"}
                  value={planDetails.startDate}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Start Date"
                  type="date"
                />
              </div>
              <div className="mb-2">
                <input
                  required={true}
                  name={"endDate"}
                  value={planDetails.endDate}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="End Date"
                  type="date"
                />
              </div>
              <div className="mb-2">
                <select
                  required={true}
                  name={"categoryId"}
                  value={planDetails.categoryId}
                  onChange={updateInput}
                  className="form-control"
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
              <div className="mb-2">
                <input
                  className="btn btn-primary me-2"
                  type="submit"
                  value="Update"
                />
                <Link className="btn btn-dark" to="/viewplan">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPlan;
