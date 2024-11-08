export interface SpotifyTrack {
    album: {
        artists: { name: string }[];
        name: string;
        external_urls: { spotify: string };
        images: { width: number; height: number; url: string }[];
    };
    external_ids?: { isrc: string };
}
