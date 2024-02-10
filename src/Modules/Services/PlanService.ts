import { IcreatePlan } from "../Models/ICreatePlan";
import axios from "axios";
import { IPlanCategory } from "../Models/IPlanCategory";

export class Planservice {
  private static serverUrl: string = "http://javaapp.myapp22.xyz:8080/plans";

  public static getAllPlans(): Promise<{ data: IcreatePlan[] }> {
    let dataUrl: string = `${this.serverUrl}/all`;
    return axios.get(dataUrl);
  }

  public static getPlan(planId: number): Promise<{ data: IcreatePlan }> {
    let dataUrl: string = `${this.serverUrl}/${planId}`;
    return axios.get(dataUrl);
  }

  public static createPlan(plan: IcreatePlan): Promise<{ data: IcreatePlan }> {
    let dataUrl: string = `${this.serverUrl}/savePlan`;
    return axios.post(dataUrl, plan);
  }

  public static updatePlan(
    plan: IcreatePlan,
    planId: number
  ): Promise<{ data: IcreatePlan }> {
    let dataUrl: string = `${this.serverUrl}/update/${planId}`;
    return axios.put(dataUrl, plan);
  }

  public static deletePlan(planId: number): Promise<{ data: {} }> {
    let dataUrl: string = `${this.serverUrl}/delete/${planId}`;
    return axios.delete(dataUrl);
  }

  public static getAllCategories(): Promise<{ data: IPlanCategory[] }> {
    let dataUrl: string = `${this.serverUrl}/categories`;
    return axios.get(dataUrl);
  }

  public static getGroup(plan: IcreatePlan): Promise<{ data: IPlanCategory }> {
    let { categoryId } = plan;
    let dataUrl: string = `${this.serverUrl}/categories/${categoryId}`;
    return axios.get(dataUrl);
  }
}
