import React, { useContext } from 'react';
import context from '../../context';
import Button from '../Button';
import { InititalState, Context } from 'typings';

interface TabProps {
    id: String;
    type: 'cap' | 'availability';
}

const stateFilterKeys = {
    cap: 'activeTab',
    availability: 'availabilityFilter',
};

function Tab(props: TabProps): JSX.Element {
    const { id, type } = props;
    const { state, dispatch } = useContext<Context>(context);
    const { filters }: InititalState = state;
    const typeKey = stateFilterKeys[type];

    function handleUpdateFilters(): void {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...filters,
                    [typeKey]: id === filters[typeKey] ? 'none' : id,
                },
            },
        });
    }

    const isActive = id === filters[typeKey];
    return (
        <Button
            onClick={() => handleUpdateFilters()}
            variant="primary"
            size="sm"
            className={isActive ? 'primary' : 'inverted'}
        >
            {id}
        </Button>
    );
}

export default Tab;
