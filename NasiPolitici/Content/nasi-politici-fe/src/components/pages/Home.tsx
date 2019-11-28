import React from 'react';
import Header from '../ui/shared/header';
import DetailCard from '../app/DetailCard/DetailCard';
import Table from '../app/DetailCard/Table';

export const Home = () => {
    return (
        <div>
            <Header/>
            <br />
            <br />
            <br />
            <DetailCard
                title="Vyroky"
                tag="demagog.cz"
                link="mews.com"
                content={<Table rows={[{ name: 'Name', data: 'Data'}, { name: 'Name', data: 'Data'}]} sectionName="Section" />}
            />
            {/* I am home */}
        </div>
    );
}
