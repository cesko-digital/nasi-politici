import React from 'react';
import { connect } from 'react-redux';
import { getAPIData, fetchAPI } from '../redux/api';

interface MetaState {
    loading: boolean;
    error: boolean;
    data: any;
}

type EntityPageProps = {
    renderPage: ({ loading, error, data }: MetaState) => JSX.Element;
    fetchAPI: () => void;
} & MetaState;

class EntityPage extends React.Component<EntityPageProps> {
    componentDidMount() {
        const { data, fetchAPI } = this.props;
        if(data === null){
            fetchAPI()
        }
    }

    render() {
        const { loading, error, data, renderPage } = this.props;
        return renderPage({ loading, error, data });
    }
}

// @ts-ignore
const mapStateToProps = (state, { entity, id }) => ({ ...getAPIData(state, { entity, id }) });
// @ts-ignore
const mapDispatchToProps = (dispatch, { entity, id }) => ({
    fetchAPI: dispatch(fetchAPI({ entity, id })),
});

// @ts-ignore
export default connect<MetaState>(mapStateToProps, mapDispatchToProps)(EntityPage);