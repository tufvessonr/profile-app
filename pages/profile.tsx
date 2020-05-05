import moment from 'moment';
import Router from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SimpleMap from '../components/googlemap';
import IProfile, { DateOfBirth, Location } from '../data/types';
import { IRootState } from '../redux';

const ProfileContainer = styled.div`
  display: table;

  width: 88%;
  max-width: 83em;

  padding: 2em;

  margin: auto;

  border-collapse: separate;
  border-spacing: 1em 0em;

  border: 0.1em solid ${(props) => props.theme.border.default};
  border-radius: 0.5em;

  -webkit-box-shadow: 0.1em 0.1em 0.5em ${(props) => props.theme.border.default};
  -moz-box-shadow: 0.1em 0.1em 0.5em ${(props) => props.theme.border.default};
  box-shadow: 0.1em 0.1em 0.5em ${(props) => props.theme.border.default};

  @media only screen and (max-width: 70em) {
    max-width: 40em;
  }

  @media only screen and (max-width: 47em) {
    max-width: 20em;

    padding: 2em 0.5em;
  }
`;

const ProfilePicBox = styled.div`
  width: 20em;
  max-width: 20em;
  
  height: 20em;
  max-height: 20em;

  border: 0.1em solid ${(props) => props.theme.border.default};
  `;

  const ProfilePic = styled.img`
  width: 20em;
  max-width: 20em;
  
  height: 20em;
  max-height: 20em;
`;

const SideColumn = styled.div`
  display: table-cell;
  vertical-align: top;

  width: 20em;
  height: 22em;

  @media only screen and (max-width: 70em) {
    display: inline-block;
  }
`;

const MainSection = styled.div`
  display: table-cell;
  vertical-align: top;
  
  width: 21em;
  height: 20em;

  padding-left: 1em;

  @media only screen and (max-width: 70em) {
    display: inline-block;

    border-spacing: initial;

    padding: 0em;
  }
`;

const PersonalInfo = styled.div`
`;

const InfoRow = styled.div`
`;

interface InfoColumnProps {
  block?: 'name' | 'header' | 'title';
}
const InfoColumn = styled.div<InfoColumnProps>`
  display: table-cell;

  min-width: 5em;
  padding-bottom: 0.5em;

  white-space: pre-line;

  ${(props) =>
    props.block === 'name'
      ? `color: ${props.theme.text.secondary}; font-size: 1.5em; font-weight: bold;`
      : 
      props.block === 'header' 
      ? `color: ${props.theme.text.secondary}; padding-top: 0.5em; font-weight: bold;` 
      : props.block === 'title' 
      ? `color: ${props.theme.text.secondary};` 
      : `color: ${props.theme.text.primaryAlt};`
    }
`;

const MapSection = styled.div`
  display: inline-block;

  width: 100%;
  min-width: 20em;
  height: 20em;
  
  border: 0.1em solid ${(props) => props.theme.border.default};

  @media only screen and (max-width: 70em) {
    max-width: 38em;
    margin-top: 1em;
  }
`;

interface IProfileProps {
  profile: IProfile;
}

class Profile extends Component<IProfileProps & ReduxType> {

  componentDidMount(){
    if(!this.props.profile){
      Router.push('/');
    }
  }
  
  render() {
    if(!this.props.profile){
      return null;
    }

    const {
      cell,
      dob,
      email,
      gender,
      location,
      name,
      phone,
      picture,
    } = this.props.profile;

    const { coordinates } = location;

    return (
      <ProfileContainer>
        <SideColumn>
          <ProfilePicBox>
            <ProfilePic src={picture.large} width={250} height={250} />
          </ProfilePicBox>
        </SideColumn>
        <MainSection>
          <PersonalInfo>
            <InfoRow>
              <InfoColumn block="name">
                {name.firstname} {name.lastname}
              </InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="header">Contact Information</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="title">Phone</InfoColumn>
              <InfoColumn>{phone}</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="title">Cell</InfoColumn>
              <InfoColumn>{cell}</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="title">Address</InfoColumn>
              <InfoColumn>{formatAddress(location)}</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="title">E-mail</InfoColumn>
              <InfoColumn>{email}</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="header">Basic Information</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="title">Birthdate</InfoColumn>
              <InfoColumn>{formatDOB(dob)}</InfoColumn>
            </InfoRow>
            <InfoRow>
              <InfoColumn block="title">Gender</InfoColumn>
              <InfoColumn>{gender}</InfoColumn>
            </InfoRow>
          </PersonalInfo>
        </MainSection>
        <MapSection>
          <SimpleMap
            lat={coordinates.latitude}
            lng={coordinates.longitude}
            text="Home"
            zoom={13}
          />
        </MapSection>
      </ProfileContainer>
    );
  }
}

const formatAddress = (location: Location) => {
  const { city, country, postcode, state, street } = location;
  return `${street.number} ${street.name}
  ${city}, ${state}, ${postcode}
  ${country}`;
};

const formatDOB = (dob: DateOfBirth) =>
  moment(dob.date).format('MMMM DD, YYYY');

const mapStateToProps = (state: IRootState) => {
  const { selectedProfile } = state.profileState;
  return {
    profile: selectedProfile,
  };
};

type ReduxType = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Profile);
