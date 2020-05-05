import fetch from 'node-fetch';
import CONFIG from '../config/config';
import { fetchProfilesFailure, fetchProfilesSuccess } from '../redux/profiles/actions';
import IProfile from './types';

type Payload = {
  results: any[];
}

export const fetchProfiles = (dispatch: any) => {
    const { PROFILE_API_URL } = CONFIG;

    const url = new URL(PROFILE_API_URL);
    url.searchParams.append('results', '50');
    
    fetch(url, {
      method: 'GET'
    })
      .then(async (response) => {
        
        const body = await response.text();
        if (response.ok) {
          const payload: Payload = JSON.parse(body);
          const profiles = mapProfiles(payload.results);
          
          dispatch(fetchProfilesSuccess(profiles));
        }
      })
      .catch(async (error) => {        
        dispatch(fetchProfilesFailure(error.message));
      });
}

// Remove excess information
function mapProfiles(profiles: Record<string, any>[]): IProfile[] {
  return profiles.map((profile) => {
    const { name, gender, dob, email, phone, cell, location, picture, login, registered, id, nat} = profile;

    return {
      name:  {
        title: name.title,
        firstname: name.first,
        lastname: name.last
      },
      gender,
      dob: {
        age: parseInt(dob.age),
        date: new Date(dob.date)
      },
      email,
      phone,
      cell,

      location: {
        city: location.city,
        street: location.street,
        state: location.state,
        country: location.country,
        postcode: location.postcode,

        coordinates: {
          latitude: parseFloat(location.coordinates.latitude),
          longitude: parseFloat( location.coordinates.latitude),
        },
        timezone: {
          offset: location.timezone.offset,
          description: location.timezone.description,
        },
      },

      picture: {
        large: picture.large,
        medium: picture.medium,
        thumbnail: picture.thumbnail,
      },

      login: {
        uuid: login.uuid,
        username: login.username,
        password: login.password,
        salt: login.salt,
        md5: login.md5,
        sha1: login.sha1,
        sha256: login.sha256,
      },
      registered: {
        date: new Date(registered.date),
        age: parseInt(registered.age),
      },
      id: {
        name: id.name,
        value: id.value,
      },

      nat
    };
  });
}


