import { readFile } from "node:fs/promises";

const getPizzas = async () => {
  const data = await readFile("db/funkostienda.json", "utf-8");
  return JSON.parse(data);
};

const getPizza = async (id) => {
  const pizzas = await getPizzas();
  return pizzas.find((pizza) => pizza.id === id);
};

const updatePizza = async (id, updatedPizza) => {
  const pizzas = await getPizzas();
  const index = pizzas.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error("Pizza not found");
  }

  pizzas[index] = { ...pizzas[index], ...updatedPizza }; // actualiza solo los campos que vienen
  await writeFile("db/funkostienda.json", JSON.stringify(pizzas, null, 2));
  return pizzas[index];
};

export const pizzaModel = {
  getPizzas,
  getPizza,
  updatePizza,
};
