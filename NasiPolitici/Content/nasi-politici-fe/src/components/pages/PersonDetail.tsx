import React from 'react';
import { useParams } from 'react-router';
import { Entities } from '../../api';
import { EntityPage } from '../../enhancers';

export const PersonDetail = () => {
    let { id } = useParams();
    return (
        <EntityPage
            entity={Entities.Person}
            id={id}
            renderPage={(props: any) => (
                <div>
                    {JSON.stringify(props)}
                </div>
            )}
        />
    )
};