import { Distributor } from "../models/distributorsModel.js";

export async function addDistributor(request, response) {
  const distributor_details = request.body;

  try {
    const distributor = Distributor.create(distributor_details);
    return response
      .status(201)
      .json({ message: "Distributor added successfully.", Distributor: distributor });
  } catch (error) {
    console.error(`Error Adding Distributor:${error.message}`);
    return response
      .status(500)
      .json({ message: "Internal Server Error. Check console for details" });
  }
}
