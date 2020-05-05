import Head from 'next/head';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { IRootState } from '../redux';
import Header from './header';

const Container = styled.div`
`;

interface ILayoutContainer {
  children: JSX.Element[];
}

class LayoutContainer extends Component<ILayoutContainer & ReduxProps> {
  render() {
    const { theme, children } = this.props;
    return (
      <Container>
        <Head>
          <title>Profiles</title>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1" />
        </Head>
        <ThemeProvider theme={theme}>
          <Header />
          {children}
        </ThemeProvider>
      </Container>
    );
  }
}

// export default LayoutContainer;

const mapStateToProps = (state: IRootState) => {
  const { theme } = state.profileState;
  return {
    theme,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
