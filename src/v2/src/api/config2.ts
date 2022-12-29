
export const defaultConfig2: Config2 = {
    
    api2: {
        authUrl: 'http://www.fortem1.com.br/api/v2/auth',
        tradeUrl: 'http://www.fortem1.com.br/api/v2/trade',
        applogicUrl: 'http://www.fortem1.com.br/api/v2/applogic',
        rangerUrl: 'ws://www.fortem1.com.br/api/v2/ranger',
        finexUrl: ''
    },
    finex: false,
    withCredentials: true,
    incrementalOrderBook: true,
    isResizable: true,
    isDraggable: true,
    showLanding: true,
    sentryEnabled: false,
    captchaLogin: false,
    captcha_type: 'none',
    usernameEnabled: true,
    gaTrackerKey: '',
    minutesUntilAutoLogout: '5',
    msAlertDisplayTime: '5000',
    sessionCheckInterval: '15000',
    balancesFetchInterval: '3000',
    passwordEntropyStep: '14',
    storage: {
        defaultStorageLimit: '50',
        orderBookSideLimit: '25'
    },
    languages: ['pt', 'en'],
    kycSteps: [
        'email',
        'profile',
        'document',
    ]
};

export const Cryptobase2 = {
    config2: defaultConfig2,
};

//Cryptobase2.config2 = { ...defaultConfig2, ...window.env };
Cryptobase2.config2.storage = { ...defaultConfig2.storage, ...Cryptobase2.config2.storage };

export const tradeUrl = (): string => Cryptobase2.config2.api2.tradeUrl;
export const authUrl = (): string => Cryptobase2.config2.api2.authUrl;
export const applogicUrl = (): string => Cryptobase2.config2.api2.applogicUrl;
export const rangerUrl = (): string => Cryptobase2.config2.api2.rangerUrl;
export const finexUrl = (): string => Cryptobase2.config2.api2.finexUrl || tradeUrl();
export const withCredentials = (): boolean => Cryptobase2.config2.withCredentials;
export const incrementalOrderBook = (): boolean => Cryptobase2.config2.incrementalOrderBook;
export const isResizableGrid = (): boolean => Cryptobase2.config2.isResizable;
export const isDraggableGrid = (): boolean => Cryptobase2.config2.isDraggable;
export const isFinexEnabled = (): boolean => Cryptobase2.config2.finex ;
export const showLanding = (): boolean => Cryptobase2.config2.showLanding;
export const sentryEnabled = (): boolean => Cryptobase2.config2.sentryEnabled;
export const captchaLogin = (): boolean => Cryptobase2.config2.captchaLogin;
export const captchaType = () => Cryptobase2.config2.captcha_type;
export const minutesUntilAutoLogout = (): string => Cryptobase2.config2.minutesUntilAutoLogout;
export const sessionCheckInterval = (): string => Cryptobase2.config2.sessionCheckInterval;
export const balancesFetchInterval = (): string => Cryptobase2.config2.balancesFetchInterval;
export const gaTrackerKey = (): string => Cryptobase2.config2.gaTrackerKey;
export const msAlertDisplayTime = (): string => Cryptobase2.config2.msAlertDisplayTime;
export const defaultStorageLimit = (): number => Number(Cryptobase2.config2.storage.defaultStorageLimit);
export const orderBookSideLimit = (): number => Number(Cryptobase2.config2.storage.orderBookSideLimit);
export const passwordEntropyStep = (): number => Number(Cryptobase2.config2.passwordEntropyStep);
export const languages: string[] = (Cryptobase2.config2.languages && Cryptobase2.config2.languages.length > 0) ? Cryptobase2.config2.languages : ['en'];
export const kycSteps = (): string[] => Cryptobase2.config2.kycSteps;
export const isUsernameEnabled = (): boolean => Cryptobase2.config2.usernameEnabled;
