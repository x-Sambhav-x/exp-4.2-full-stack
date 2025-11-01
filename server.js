const express = require("express");
const app = express();
app.use(express.json());

// Sample card collection (Array acts like a temporary DB)
let cards = [
  { id: 1, suit: "Hearts", value: "A" },
  { id: 2, suit: "Spades", value: "K" }
];

// ✅ Get all cards
app.get("/api/cards", (req, res) => {
  res.json(cards);
});

// ✅ Get card by ID
app.get("/api/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);
  if (!card) return res.status(404).json({ message: "Card not found" });
  res.json(card);
});

// ✅ Add a new card
app.post("/api/cards", (req, res) => {
  const { suit, value } = req.body;
  const id = cards.length ? cards[cards.length - 1].id + 1 : 1;
  const newCard = { id, suit, value };
  cards.push(newCard);

  res.status(201).json(newCard);
});

// ✅ Update a card by ID
app.put("/api/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);
  if (!card) return res.status(404).json({ message: "Card not found" });

  const { suit, value } = req.body;
  card.suit = suit || card.suit;
  card.value = value || card.value;

  res.json({ message: "Updated Successfully", card });
});

// ✅ Delete a card by ID
app.delete("/api/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: "Card not found" });

  cards.splice(index, 1);
  res.json({ message: "Deleted Successfully" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running ➜ http://localhost:${PORT}`));
