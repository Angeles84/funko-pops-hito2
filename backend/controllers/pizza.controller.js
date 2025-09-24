import { pizzaModel } from "../models/pizza.model.js";

const readPizzas = async (req, res) => {
  const pizzas = await pizzaModel.getPizzas();
  res.json(pizzas);
};

const readPizza = async (req, res) => {
  const { id } = req.params;
  const pizza = await pizzaModel.getPizza(id.toLowerCase());
  if (!pizza) {
    return res.status(404).json({ message: "Pizza not found" });
  }
  res.json(pizza);
};

const updatePizza = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPizza = await pizzaModel.updatePizza(id.toLowerCase(), updatedData);
    res.json({ message: "Funko actualizado correctamente", data: updatedPizza });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const pizzaController = {
  readPizzas,
  readPizza,
  updatePizza,
};
