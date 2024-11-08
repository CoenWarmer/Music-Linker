'use client';

import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Results } from 'src/components/Results';
import { Result } from 'types';

export default function Page() {
    const [url, setUrl] = useState<string>('');
    const [results, setResults] = useState<Result[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async () => {
        const match = url?.match(/track\/([a-zA-Z0-9]+)\?/);

        const spotifyId = match ? match[1] : null;

        const spotifyResult = await fetch(`/api/spotify/getById/${spotifyId}`);

        const res = await spotifyResult?.json();

        setResults([res.data]);
    };

    return (
        <Box>
            <form>
                <Input name="url" value={url} onChange={handleChange} />
                <Button type="button" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>

            <Results results={results} />
        </Box>
    );
}
