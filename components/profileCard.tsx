import Router from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IProfile from '../data/types';
import { IRootState } from '../redux';
import { setSelectedProfile } from '../redux/profiles/actions';

const Card = styled.div`
  min-width: 15em;
  max-width: 15em;

  margin: 5em 1em 1em 1em;

  display: inline-block;

  border: 0.1em solid ${(props) => props.theme.border.default};
  border-radius: 1em;
  -webkit-box-shadow: 0.1em 0.1em 0.5em ${(props) => props.theme.border.default};
  -moz-box-shadow: 0.1em 0.1em 0.5em ${(props) => props.theme.border.default};
  box-shadow: 0.1em 0.1em 0.5em ${(props) => props.theme.border.default};

  &:hover {
    -webkit-box-shadow: 0.1em 0.3em 0.5em 0.2em ${(props) => props.theme.border.default};
    -moz-box-shadow: 0.1em 0.3em 0.5em 0.2em ${(props) => props.theme.border.default};
    box-shadow: 0.1em 0.3em 0.5em 0.2em ${(props) => props.theme.border.default};
  }

  cursor: pointer;
`;
0.3
const CardImage = styled.img`
  height: 8em;
  width: 8em;
  border-radius: 50%;

  position: relative;
  top: -4em;
  left: 3.33em;

  border: 0.1em solid ${(props) => props.theme.border.default};
`;

const CardInfo = styled.div`
  margin: auto;
  text-align: center;

  position: relative;
  top: -2.5em;

  > div {
    margin-bottom: 0.5em;

    &:first-child {
      color: ${(props) => props.theme.text.primaryAlt};
    }
    &:last-child {
      color: ${(props) => props.theme.text.secondary};
    }
  }
`;

const CardInfoSeperator = styled.hr`
  width: 75%;
`;

interface IProfileCardProps {
  entry: number;
  profile: IProfile;
}

class ProfileCard extends Component<IProfileCardProps & ReduxProps> {
  render() {
    const { location, name, picture } = this.props.profile;

    return (
      <Card onClick={this.goToProfilePage}>
        <CardImage src={picture.large}></CardImage>
        <CardInfo>
          <div>{`${name.firstname} ${name.lastname}`}</div>
          <CardInfoSeperator />
          <div>{location.city}</div>
        </CardInfo>
      </Card>
    );
  }

  goToProfilePage = () => {
    const { setSelectedProfile, profile } = this.props;
    setSelectedProfile(profile);

    Router.push('/profile');
  };
}

const mapStateToProps = (state: IRootState) => {
  // const { loading, profiles, error } = state.profileState;
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedProfile: (profile: IProfile) => {
      dispatch(setSelectedProfile(profile));
    },
  };
};

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
