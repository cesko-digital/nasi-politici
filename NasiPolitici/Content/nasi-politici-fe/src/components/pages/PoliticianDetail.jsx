import React from 'react';
import { useParams } from 'react-router';

export const PoliticianDetail = () => {
    let { id } = useParams();
    return (
        <div>I am politican detail {id}</div>
    )
};