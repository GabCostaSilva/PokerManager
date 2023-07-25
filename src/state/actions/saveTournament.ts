export const saveTournament = async (data) => {
  try {
    await fetch("http://localhost:3000/tourney", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.error("SAVE TOURNAMENT", e);
  }
};