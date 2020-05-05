import Router from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IRootState } from '../redux';
import { setTheme } from '../redux/profiles/actions';
import { AppTheme, Themes } from '../themes/themes';

const NavBar = styled.div`
  width: 100%;
  margin-bottom: 2em;

  border-bottom: 0.1em solid ${(props) => props.theme.border.header};
`;

const NavTitle = styled.div`
  display: inline-block;
  padding: 0.5em 0.75em 0em 0.75em;

  font-size: x-large;
  font-weight: bold;

  color: ${(props) => props.theme.text.primaryAlt};
`;

const NavItems = styled.div`
  display: inline-block;
`;

const NavItem = styled.div`
  display: inline-block;
  padding: 0.5em 0.75em;

  color: ${(props) => props.theme.text.secondary};

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.background.light};
  }
`;

const ThemeSelector = styled.select`
  color: ${(props) => props.theme.text.primary};

  cursor: pointer;

  float: right;
  width: 8em;
  height: 2em;

  border: 0.1em solid ${(props) => props.theme.border.default};
  background-color: ${(props) => props.theme.background.dark};
  color: ${(props) => props.theme.text.icons};

  &active,
  &:focus {
    outline: none;
  }
`;

const ThemeOption = styled.option`
  color: ${(props) => props.theme.text.primary};

  cursor: pointer;
`;

class Header extends Component<ReduxProps> {
  render() {
    return (
      <NavBar>
        <NavTitle>Profiles</NavTitle>
        <NavItems>
          <NavItem onClick={() => Router.push('/')}>Home</NavItem>
        </NavItems>
        <ThemeSelector onChange={this.setTheme}>
          <ThemeOption value="primary">Primary</ThemeOption>
          <ThemeOption value="secondary">Secondary</ThemeOption>
        </ThemeSelector>
      </NavBar>
    );
  }

  setTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setTheme(Themes[event.target.value]);
  };
}

const mapStateToProps = (state: IRootState) => {
  // const { loading, profiles, error } = state.profileState;
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTheme: (theme: AppTheme) => {
      dispatch(setTheme(theme));
    },
  };
};

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
