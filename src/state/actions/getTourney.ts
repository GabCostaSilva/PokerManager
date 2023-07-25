export default async (uuid: string) => {
    let response = await fetch(`http://localhost:3000/tourney/${uuid}`);
    if (response.ok) {
        return response.json();
    } else {
        console.error("Response", response.status)
    }
}
