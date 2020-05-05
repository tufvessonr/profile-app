import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AudioLoader } from '../components/loader';
import Pagination from '../components/pagination';
import ProfileCard from '../components/profileCard';
import { IRootState } from '../redux';
import { fetchProfilesRequest } from '../redux/profiles/actions';

const ProfileContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const ProfileInnerContainer = styled.div`
  margin: auto;
  width: 86em;

  @media only screen and (max-width: 92em) {
    width: 69em;
  }

  @media only screen and (max-width: 75em) {
    width: 52em;
  }

  @media only screen and (max-width: 58em) {
    width: 35em;
  }
`;

class Profiles extends Component<ReduxProps> {
  componentDidMount() {
    this.props.fetchProfiles();
  }

  render() {
    const { loading, profiles } = this.props;

    return (
      <ProfileContainer>
          <ProfileInnerContainer>
            {loading ? (
              <AudioLoader />
            ) : (
              <Pagination>
               {profiles.map((profile, index) => (<ProfileCard key={`profile_${index}`} entry={index} profile={profile}/>)) }
              </Pagination>
            )}
          </ProfileInnerContainer>
        </ProfileContainer>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const { loading, profiles, error } = state.profileState;
  return {
    loading,
    profiles,
    error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProfiles: () => {
      dispatch(fetchProfilesRequest(dispatch));
    },
  };
};

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
