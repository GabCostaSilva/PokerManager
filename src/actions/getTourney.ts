export default async (uuid: string) => {
    try {
        let response = await fetch(`http://localhost:3000/tourney/${uuid}`);
        if (response.ok) {
            return response.json();
        } else {
            console.error("Response", response.status)
            throw new Error("Algo deu errado ao carregar torneios. Tente daqui alguns instantes.")
        }
    } catch (error) {
        console.error("LIST TOURNEY ERROR: ", error)
        alert(error)
    }
}