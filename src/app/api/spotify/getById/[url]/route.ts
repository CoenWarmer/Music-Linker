import { NextApiRequest } from 'next';
import { getAccessToken } from '../../getAccessToken';

interface Track {
    album: {
        artists: { name: string }[];
        name: string;
        external_urls: { spotify: string };
        images: { width: number; height: number; url: string }[];
    };
    external_ids?: { isrc: string };
}

export async function GET(_: NextApiRequest, { params }: { params: { url: string } }) {
    try {
        const accessToken = await getAccessToken();
        const { url } = await params;

        const track: Track = await getIRSCFromSpotifyId({ accessToken, spotifyId: url });

        const data = {
            artist: track.album.artists,
            artistName: track.album.artists.reduce((acc, curr, _, arr) => {
                if (arr.length === 1) {
                    return curr.name;
                } else return `${acc}, ${curr.name}`;
            }, ''),
            name: track.album.name,
            image: track.album.images.find((image) => image.width === 300)?.url,
            link: track.album.external_urls.spotify,
            isrc: track.external_ids?.isrc
        };

        return Response.json({ data });
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}

async function getIRSCFromSpotifyId({ accessToken, spotifyId }: { accessToken: string; spotifyId: string }) {
    const headers = new Headers();

    headers.append('Authorization', `Bearer ${accessToken}`);

    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching track data:', error);
        throw error;
    }
}
