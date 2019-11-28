import React from 'react';
import Header from '../ui/shared/header';
import DetailCard from '../app/DetailCard/DetailCard';
import Table from '../app/DetailCard/Table';
import ArticlesList from '../app/DetailCard/ArticlesList';

export const Home = () => {
    return (
        <div>
            <Header />
            <br />
            <br />
            <br />
            <DetailCard
                title="Vyroky"
                tag="demagog.cz"
                link="mews.com"
                content={<Table rows={[{ name: 'Name', data: 'Data' }, { name: 'Name', data: 'Data' }]} sectionName="Section" />}
            />
            <br />
            <br />
            <br />
            <DetailCard
                title="V médiích"
                tag="Monitora"
                link="mews.com"
                content={<ArticlesList />}
            />
        </div>
    );
}
