export default async () => {
    let response = await fetch("http://localhost:3000/tourney");
    if (response.ok) {
        return response.json();
    } else {
        console.error("Response", response.status)
    }
}