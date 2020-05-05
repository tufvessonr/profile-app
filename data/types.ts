
type Name = {
  title: string;
  firstname: string;
  lastname: string;
};

export type DateOfBirth = {
  date: Date;
  age: number;
};

type Street = {
  number: number;
  name: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Timezone = {
  offset: string;
  description: string;
};

export type Location = {
  city: string;
  street: Street;
  state: string;
  country: string;
  postcode: string;

  coordinates: Coordinates;
  timezone: Timezone;
};

type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

type Login = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

type Registered = {
  date: Date;
  age: number;
};

type Id = {
  name: string;
  value: string;
};

 type IProfile = {
  name: Name;
  gender: string;
  dob: DateOfBirth;

  email: string;
  phone: string;
  cell: string;

  location: Location;

  picture: Picture;

  login: Login;
  registered: Registered;
  id: Id;

  nat: string;
}

export default IProfile;