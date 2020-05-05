export type AppTheme = {
  background: { 
    default: string;
    dark: string;
    light: string;
    accent:string;
  },
  text: {
    icons: string;
    primary:string;
    primaryAlt: string;
    secondary: string;
  },
  border: {
    default: string;
    dark: string;
    divider: string;
    header: string;
  }
};

const primary: AppTheme = {
  background: {
    default: '#03A9F4',
    dark: '#0288D1',
    light: '#B3E5FC',
    accent: '#FF4081'
  },
  text: {
    icons: '#FFFFFF',
    primary: '#212121',
    primaryAlt: '#0288D1',
    secondary: '#757575',
  },
  border: {
    default: '#59a0ee',
    dark: '#0288D1',
    divider: '#BDBDBD',
    header: '#0288D1',
  }
}

const secondary: AppTheme = {
  background: {
    default: '#673AB7',
    dark: '#512DA8',
    light: '#D1C4E9',
    accent: '#E040FB'
  },
  text: {
    icons: '#FFFFFF',
    primary: '#212121',
    primaryAlt: '#512DA8',
    secondary: '#757575',
  },
  border: {
    default: '#673AB7',
    dark: '#512DA8',
    divider: '#BDBDBD',
    header: '#512DA8',
  }
}

export const Themes = {primary, secondary};
