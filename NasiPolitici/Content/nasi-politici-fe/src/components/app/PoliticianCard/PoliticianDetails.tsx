import React from 'react';
import PoliticianAvatar from './PoliticianAvatar';
import { Box, Typography } from '@material-ui/core';
import { useDesktop } from '../../../hooks';
import { Link } from '../../ui';

interface PoliticianDetailsProps {
    firstName: string;
    lastName: string;
    photoUrl: string;
    description: string;
    birthDate: number;
    politicalParty: string;
}

const PoliticianDetails: React.FC<PoliticianDetailsProps> = ({
    firstName,
    lastName,
    photoUrl,
    description,
    birthDate,
    politicalParty
}) => {
    const isDesktop = useDesktop();

    return (
        <Box display="flex">
            <PoliticianAvatar image={photoUrl} />
            <Box ml={2}>
                {isDesktop ? (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h1">{`${firstName} ${lastName}`}</Typography>
                        <Link>show profile</Link>
                    </Box>
                ) : (
                    <Typography variant="h1">{`${firstName} ${lastName}`}</Typography>
                )}
                <Box display="flex">
                    <Typography variant={'h3'}>*{birthDate}</Typography>
                    {'\u00A0'}
                    <Typography variant={'h3'}>{politicalParty}</Typography>
                </Box>
                {isDesktop && <Typography variant="subtitle1">{description}</Typography>}
                {!isDesktop && <Link>show profile</Link>}
            </Box>
        </Box>
    );
};

export default PoliticianDetails;
