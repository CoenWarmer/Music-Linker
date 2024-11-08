import { Box, Typography } from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';
import { Result } from 'types';

export function Results({ results = [] }: { results: Result[] }) {
    return (
        <Box display="flex" width="100%">
            {results.map((result, index) => (
                <Box key={index} display="flex" flexDirection="row" width="100%" gap="4">
                    <Image src={result.image || ''} alt={result.name} width="100" height="100" />
                    <Typography>
                        {result.artistName} - {result.name}
                    </Typography>
                    <Link href={result.link}></Link>
                </Box>
            ))}
        </Box>
    );
}
