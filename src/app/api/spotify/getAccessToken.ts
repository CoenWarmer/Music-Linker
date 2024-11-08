const client_id = process.env.SPOTIFY_CLIENT_ID || '';
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || '';

export async function getAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body.toString()
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        return data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}
