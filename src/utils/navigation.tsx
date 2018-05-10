import React from 'react';

/**
 * Helper function to map react-navigation navigation.state.params to props
 * of given React Component.
 * @param SomeComponent
 */
export const navigationParamsToProps = (SomeComponent: any) => {
    // turns this.props.navigation.state.params into this.params.<x>
    return class extends React.Component <any, any> {
        static navigationOptions = SomeComponent.navigationOptions;
        // everything else, call as SomeComponent
        render() {
            const {navigation, ...otherProps} = this.props;
            const {state: {params}} = navigation;
            return (<SomeComponent {...this.props} {...params} />);
        }
    };
};
