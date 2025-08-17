import { OpenLinkOptions } from '@telegram-apps/sdk';

type CssColorKey = 'bg_color' | 'bottom_bar_bg_color' | 'secondary_bg_color';
type ChooseChatType = 'bots' | 'channels' | 'groups' | 'users';
type ColorScheme = 'dark' | 'light';

type WebAppChatType = 'channel' | 'group' | 'supergroup';

/** This object represents a chat. */
export interface WebAppChat {
  /** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  id: number;
  /** Optional. URL of the chat’s photo. The photo can be in .jpeg or .svg formats. Only returned for Mini Apps launched from the attachment menu. */
  photo_url?: string;
  /** Title of the chat */
  title: string;
  /** Type of chat can be either “group,” “supergroup” or “channel” */
  type: WebAppChatType;
  /** Optional. Username of the chat */
  username?: string;
}

/** This object contains the data of the Mini App user. */
export interface WebAppUser {
  /** Optional. True, if this user added the bot to the attachment menu. */
  added_to_attachment_menu?: boolean;
  /** Optional. True, if this user allowed the bot to message them. */
  allows_write_to_pm?: boolean;
  /** First name of the user or bot. */
  first_name: string;
  /** A unique identifier for the user or bot. This number may have more than 32 significant bits, and some programming languages may have difficulty/silent defects in interpreting it. It has at most 52 significant bits, so a 64-bit integer or a double-precision float type is safe for storing this identifier. */
  id: number;
  /** Optional. True, if this user is a bot. Returns in the receiver field only. */
  is_bot?: boolean;
  /** Optional. True, if this user is a Telegram Premium user. */
  is_premium?: boolean;
  /** Optional. IETF language tag of the user's language. Returns in the user field only. */
  language_code?: string;
  /** Optional. Last name of the user or bot. */
  last_name?: string;
  /** Optional. URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. */
  photo_url?: string;
  /** Optional. Username of the user or bot. */
  username?: string;
}

/** This object contains data transferred to the Mini App when it is opened. It is empty if the Mini App was launched from a keyboard button or from inline mode. */
export interface WebAppInitData {
  /** Unix time when the form was opened. */
  auth_date: number;
  /** Optional. Time in seconds, after which a message can be sent via the answerWebAppQuery method. */
  can_send_after?: number;
  /** Optional. An object containing data about the chat where the bot was launched via the attachment menu. Returned for supergroups, channels, and group chats – only for Mini Apps launched via the attachment menu. */
  chat?: WebAppChat;
  /** Optional. Global identifier, uniquely corresponding to the chat from which the Mini App was opened. Returned only for Mini Apps launched from a direct link. */
  chat_instance?: string;
  /** Optional. Type of the chat from which the Mini App was opened. Can be either “sender” for a private chat with the user opening the link, “private,” “group,” “supergroup,” or “channel.” Returned only for Mini Apps launched from direct links. */
  chat_type?: string;
  /** A hash of all passed parameters, which the bot server can use to check their validity. */
  hash: string;
  /** Optional. A unique identifier for the Mini App session, required for sending messages via the answerWebAppQuery method. */
  query_id?: string;
  /** Optional. An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for private chats and only for Mini Apps launched via the attachment menu. */
  receiver?: WebAppUser;
  /** A signature of all passed parameters (except hash), which the third party can use to check their validity. */
  signature: string;
  /** Optional. The value of the `startattach` parameter, passed via a link. Only returned for Mini Apps when launched from the attachment menu via a link. The value of the start_param parameter will also, be passed in the GET-parameter tgWebAppStartParam, so the Mini App can load the correct interface right away. */
  start_param?: string;
  /** Optional. An object containing data about the current user. */
  user?: WebAppUser;
}

type ErrorFirstCallback<T = unknown> = (error: string | null, result?: T, extra?: unknown) => void;
type BiometricCallback = (isAuthenticated: boolean, biometricToken?: string | null) => void;

/**
 * This object provides access to a secure storage on the user’s device for sensitive data. On **iOS**, it uses the system **Keychain**; on **Android**, it uses the **Keystore**. This ensures that all stored values are encrypted at rest and inaccessible to unauthorized applications.
 * **Secure storage** is suitable for storing tokens, secrets, authentication state, and other sensitive user-specific information. Each bot can store up to 10 items per user.
 */
export interface SecureStorage {
  /** A method that clears all keys previously stored by the bot in the device's secure storage. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether all values were removed. */
  clear(callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives a value from the device's secure storage using the specified key. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the value will be passed as the second argument. If the key was not found, the second argument will be null, and the third argument will be a boolean indicating whether the key can be restored from the current device. */
  getItem(key: string, callback?: ErrorFirstCallback<string | null | boolean>): this;

  /** A method that removes a value from the device's secure storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was removed. */
  removeItem(key: string, callback?: ErrorFirstCallback<boolean>): this;

  /** Attempts to restore a key that previously existed on the current device. When called, the user will be asked for permission to restore the value. If the user declines or an error occurs, the first argument in the callback will contain the error. If restored successfully, the first argument will be null and the second argument will contain the restored value. */
  restoreItem(key: string, callback?: ErrorFirstCallback<string | null>): this;

  /** A method that stores a value in the device's secure storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was stored. */
  setItem(key: string, value: string, callback?: ErrorFirstCallback<boolean>): this;
}

interface DeviceStorage {
  /** A method that clears all keys previously stored by the bot in the device's local storage. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether all values were removed. */
  clear(callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives a value from the device's local storage using the specified key. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the value will be passed as the second argument. */
  getItem(key: string, callback?: ErrorFirstCallback<string | null>): this;

  /** A method that removes a value from the device's local storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was removed. */
  removeItem(key: string, callback?: ErrorFirstCallback<boolean>): this;

  /** A method that stores a value in the device's local storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was stored. */
  setItem(key: string, value: string, callback?: ErrorFirstCallback<boolean>): this;
}

export interface LocationData {
  /** Altitude above sea level in meters. null if altitude data is not available on the device. */
  altitude: number;
  /** The direction the device is moving in degrees (0 = North, 90 = East, 180 = South, 270 = West). null if course data is not available on the device. */
  course: number;
  /** Accuracy of the course value in degrees. null if course accuracy data is not available on the device. */
  course_accuracy: number;
  /** Accuracy of the latitude and longitude values in meters. null if horizontal accuracy data is not available on the device. */
  horizontal_accuracy: number;
  /** Latitude in degrees. */
  latitude: number;
  /** Longitude in degrees. */
  longitude: number;
  /** The speed of the device in m/s. null if speed data is not available on the device. */
  speed: number;
  /** Accuracy of the speed value in m/s. null if speed accuracy data is not available on the device. */
  speed_accuracy: number;
  /** Accuracy of the altitude value in meters. null if vertical accuracy data is not available on the device. */
  vertical_accuracy: number;
}

export interface LocationManager {
  /** Shows whether permission to use a location has been requested. */
  readonly isAccessGranted: boolean;
  /** Shows whether permission to use a location has been granted. */
  readonly isAccessRequested: boolean;
  /** Shows whether the LocationManager object has been initialized. */
  readonly isInited: boolean;
  /** Shows whether location services are available on the current device. */
  readonly isLocationAvailable: boolean;

  /** A method that requests location data. The callback function will be called with null as the first argument if access to location was not granted, or an object of type LocationData as the first argument if access was successful. */
  getLocation(callback: (data: LocationData | null) => void): this;

  /**
   * A method that initializes the LocationManager object.
   * It should be called before the object's first use.
   * If an optional callback parameter is provided, the callback function will be called when the object is initialized.
   */
  init(callback?: () => void): this;

  /** A method that opens the location access settings for bots. Useful when you need to request location access from users who haven't granted it yet.
   * Note that this method can be called only in response to user interaction with the Mini App interface (e.g., a click inside the Mini App or on the main button). */
  openSettings(): this;
}

/** This object defines the parameters for starting gyroscope tracking. */
export interface GyroscopeStartParameters {
  /** Optional. The refresh rate in milliseconds, with acceptable values ranging from 20 to 1000. Set to 1000 by default. Note that refresh_rate may not be supported on all platforms, so the actual tracking frequency may differ from the specified value. */
  refresh_rate?: number;
}

/** This object provides access to gyroscope data on the device. */
export interface Gyroscope {
  /** Indicates whether gyroscope tracking is currently active. */
  readonly isStarted: boolean;
  /** The current rotation rate around the X-axis, measured in rad/s. */
  readonly x: number | null;
  /** The current rotation rate around the Y-axis, measured in rad/s. */
  readonly y: number | null;
  /** The current rotation rate around the Z-axis, measured in rad/s. */
  readonly z: number | null;

  /** Starts tracking gyroscope data using params of type GyroscopeStartParams. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully started. */
  start(parameters?: GyroscopeStartParameters, callback?: (started: boolean) => void): this;

  /** Stops tracking gyroscope data. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully stopped. */
  stop(callback?: (stopped: boolean) => void): this;
}

/** This object defines the parameters for starting device orientation tracking.
 * **Note**: Keep in mind that some devices may not support absolute orientation data. In such cases, you will receive relative data even if need_absolute=true is passed. Check the DeviceOrientation.absolute parameter to determine whether the data provided is absolute or relative.
 */
export interface DeviceOrientationStartParameters {
  /** Optional. Pass true to receive absolute orientation data, allowing you to determine the device's attitude relative to magnetic north. Use this option if implementing features like a compass in your app. If relative data is sufficient, pass false. Set to false by default. */
  need_absolute?: boolean;
  /** Optional. The refresh rate in milliseconds, with acceptable values ranging from 20 to 1000. Set to 1000 by default. Note that refresh_rate may not be supported on all platforms, so the actual tracking frequency may differ from the specified value. */
  refresh_rate?: number;
}

/** This object provides access to orientation data on the device. */
export interface DeviceOrientation {
  /** A boolean that indicates whether the device is providing orientation data in absolute values. */
  absolute: boolean;
  /** The rotation around the Z-axis, measured in radians. */
  alpha: number;
  /** The rotation around the X-axis, measured in radians. */
  beta: number;
  /** The rotation around the Y-axis, measured in radians. */
  gamma: number;
  /** Indicates whether device orientation tracking is currently active. */
  isStarted: boolean;

  /** Starts tracking device orientation data using params of type DeviceOrientationStartParams. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully started. */
  start(parameters?: DeviceOrientationStartParameters, callback?: (started: boolean) => void): this;

  /** Stops tracking device orientation data. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully stopped. */
  stop(callback?: (stopped: boolean) => void): this;
}

/** This object defines the parameters for starting accelerometer tracking. */
export interface AccelerometerStartParameters {
  /** Optional. The refresh rate in milliseconds, with acceptable values ranging from 20 to 1000. Set to 1000 by default. Note that refresh_rate may not be supported on all platforms, so the actual tracking frequency may differ from the specified value. */
  refresh_rate?: number;
}

/**
 * All these methods return the Accelerometer object so they can be chained.
 * This object provides access to accelerometer data on the device. */
export interface Accelerometer {
  /** Indicates whether accelerometer tracking is currently active. */
  isStarted: boolean;
  /** The current acceleration in the X-axis, measured in m/s². */
  x: number;
  /** The current acceleration in the Y-axis, measured in m/s². */
  y: number;
  /** The current acceleration in the Z-axis, measured in m/s². */
  z: number;

  /** Starts tracking accelerometer data using params of type AccelerometerStartParams. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully started. */
  start(parameters?: AccelerometerStartParameters, callback?: (started: boolean) => void): this;

  /** Stops tracking accelerometer data. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully stopped. */
  stop(callback?: (stopped: boolean) => void): this;
}

/**
 * - finger, fingerprint-based biometrics,
 * - face, face-based biometrics,
 * - unknown, biometrics of an unknown type
 */
type BiometricType = 'face' | 'finger' | 'unknown';

/** This object controls biometrics on the device. Before the first use of this object, it needs to be initialized using the init method. */
interface BiometricManager {
  /** The type of biometrics currently available on the device */
  readonly biometricType: BiometricType;
  /** A unique device identifier that can be used to match the token to the device. */
  readonly deviceId: string;
  /** Shows whether permission to use biometrics has been granted. */
  readonly isAccessGranted: boolean;
  /** Shows whether permission to use biometrics has been requested. */
  readonly isAccessRequested: boolean;
  /** Shows whether biometrics is available on the current device. */
  readonly isBiometricAvailable: boolean;
  /** Shows whether the token is saved in secure storage on the device. */
  readonly isBiometricTokenSaved: boolean;
  /** Shows whether biometrics object is initialized. */
  readonly isInited: boolean;

  /** A method that authenticates the user using biometrics according to the params argument of type BiometricAuthenticateParams. If an optional callback parameter was passed, the callback function will be called and the first argument will be a boolean indicating whether the user authenticated successfully. If so, the second argument will be a biometric token. */
  authenticate(parameters: { reason?: string }, callback?: BiometricCallback): this;

  /** A method that initializes the BiometricManager object. It should be called before the object's first use. If an optional callback parameter was passed, the callback function will be called when the object is initialized. */
  init(callback?: () => void): this;

  /** A method that opens the biometric access settings for bots. Useful when you need to request biometrics access to users who haven't granted it yet.
   Note that this method can be called only in response to user interaction with the Mini App interface (e.g. a click inside the Mini App or on the main button) */
  openSettings(): this;

  /** A method that requests permission to use biometrics according to the params argument of type BiometricRequestAccessParams. If an optional callback parameter was passed, the callback function will be called and the first argument will be a boolean indicating whether the user granted access. */
  requestAccess(parameters: { reason?: string }, callback?: (granted: boolean) => void): this;

  /** A method that updates the biometric token in secure storage on the device. To remove the token, pass an empty string. If an optional callback parameter was passed, the callback function will be called and the first argument will be a boolean indicating whether the token was updated. */
  updateBiometricToken(token: string, callback?: (applied: boolean) => void): this;
}

/** This object controls the cloud storage. Each bot can store up to 1024 items per user in the cloud storage. */
export interface CloudStorage {
  /** A method that stores a value in the cloud storage using the specified key. The key should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. The value should contain 0-4096 characters. You can store up to 1024 keys in the cloud storage. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was stored. */
  setItem(key: string, value: string, callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives a value from the cloud storage using the specified key. The key should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the value will be passed as the second argument. */
  getItem(key: string, callback: ErrorFirstCallback<string | null>): this;

  /** A method that receives values from the cloud storage using the specified keys. The keys should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the values will be passed as the second argument. */
  getItems(keys: string[], callback: ErrorFirstCallback<Record<string, string>>): this;

  /** A method that removes a value from the cloud storage using the specified key. The key should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was removed. */
  removeItem(key: string, callback?: ErrorFirstCallback<boolean>): this;

  /** A method that removes values from the cloud storage using the specified keys. The keys should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the values were removed. */
  removeItems(keys: string[], callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives the list of all keys stored in the cloud storage. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the list of keys will be passed as the second argument. */
  getKeys(callback: ErrorFirstCallback<string[]>): this;
}

/**
 * - light, indicates a collision between small or lightweight UI objects,
 * - medium, indicates a collision between medium-sized or medium-weight UI objects,
 * - heavy, indicates a collision between large or heavyweight UI objects,
 * - rigid, indicates a collision between hard or inflexible UI objects,
 * - soft, indicates a collision between soft or flexible UI objects.
 */
type ImpactStyle = 'heavy' | 'light' | 'medium' | 'rigid' | 'soft';

/**
 * - error, indicates that a task or action has failed,
 * - success, indicates that a task or action has completed successfully,
 * - warning, indicates that a task or action produced a warning.
 */
type NotificationType = 'error' | 'success' | 'warning';

interface HapticFeedback {
  /** A method tells that an impact occurred. The Telegram app may play the appropriate haptics based on style value passed. */
  impactOccurred(style: ImpactStyle): this;

  /** A method tells that a task or action has succeeded, failed, or produced a warning. The Telegram app may play the appropriate haptics based on type value passed. */
  notificationOccurred(type: NotificationType): this;

  /**
   * A method tells that the user has changed a selection. The Telegram app may play the appropriate haptics.
   * Do not use this feedback when the user makes or confirms a selection; use it only when the selection changes.
   */
  selectionChanged(): this;
}

/** This object controls the Settings item in the context menu of the Mini App in the Telegram interface. */
export interface SettingsButton {
  /** Shows whether the context menu item is visible. Set to false by default. */
  isVisible: boolean;

  /** A method to hide the Settings item in the context menu. */
  hide(): this;

  /** A method that removes the press event handler from the Settings item in the context menu. An alias for `Telegram.WebApp.offEvent('settingsButtonClicked', callback)` */
  offClick(callback: () => void): this;

  /** A method that sets the press event handler for the Settings item in the context menu. An alias for `Telegram.WebApp.onEvent('settingsButtonClicked', callback)` */
  onClick(callback: () => void): this;

  /** A method to make the Settings item in the context menu visible. */
  show(): this;
}

/**
 * left, displayed to the left of the main button,
 * right, displayed to the right of the main button,
 * top, displayed above the main button,
 * bottom, displayed below the main button.
 */
type BottomButtonPosition = 'bottom' | 'left' | 'right' | 'top';

/** This object controls the button that is displayed at the bottom of the Mini App in the Telegram interface. */
interface BottomButton {
  /** Current button color. Set to themeParams.button_color for the main button and themeParams.bottom_bar_bg_color for the secondary button by default. */
  readonly color: string;
  /** Shows whether the button has a shine effect. Set to false by default. */
  hasShineEffect: boolean;
  /** Shows whether the button is active. Set to true by default. */
  isActive: boolean;
  /** Readonly. Shows whether the button is displaying a loading indicator. */
  readonly isProgressVisible: boolean;
  /** Shows whether the button is visible. Set to false by default. */
  isVisible: boolean;
  /**
   * Position of the secondary button. Not defined for the main button. It applies only if both the main and secondary buttons are visible. Set to left by default.
   */
  position?: BottomButtonPosition;
  /** Current button text. Set to Continue for the main button and Cancel for the secondary button by default. */
  text: string;
  /** Current button text color. Set to themeParams.button_text_color for the main button and themeParams.button_color for the secondary button by default. */
  readonly textColor: string;
  /** Readonly. Type of the button. It can be either main for the main button or secondary for the secondary button. */
  readonly type: 'main' | 'secondary';

  /** A method to disable the button. */
  disable(): this;

  /** A method to enable the button. */
  enable(): this;

  /** A method to hide the button. */
  hide(): this;

  /** A method to hide the loading indicator. */
  hideProgress(): this;

  /** A method that removes the button's press event handler. An alias for `Telegram.WebApp.offEvent('mainButtonClicked', callback)` */
  offClick(callback: () => void): this;

  /** A method that sets the button's press event handler. An alias for `Telegram.WebApp.onEvent('mainButtonClicked', callback)` */
  onClick(callback: () => void): this;

  /**
   * A method to set the button parameters. The params parameter is an object containing one or several fields that need to be changed:
   * text - button text;
   * color - button color;
   * text_color - button text color;
   * has_shine_effect - Bot API 7.10+ enable shine effect;
   * position - position of the secondary button;
   * is_active - enable the button;
   * is_visible - show the button.
   * @param parameters
   */
  setParams(parameters: {
    color?: string | false | CssColorKey | null;
    has_shine_effect?: boolean;
    is_active?: boolean;
    is_visible?: boolean;
    position?: BottomButtonPosition;
    text?: string;
    text_color?: string | false | null;
  }): this;

  /** A method to set the button text. */
  setText(text: string): this;

  /**
   * A method to make the button visible.
   * Note that opening the Mini App from the attachment menu hides the main button until the user interacts with the Mini App interface.
   */
  show(): this;

  /**
   * A method to show a loading indicator on the button.
   * It is recommended to display loading progress if the action tied to the button may take a long time. By default, the button is disabled while the action is in progress. If the parameter leaveActive=true is passed, the button remains enabled.
   * @param leaveActive
   */
  showProgress(leaveActive?: boolean): this;
}

/** This object controls the back button, which can be displayed in the header of the Mini App in the Telegram interface. */
export interface BackButton {
  /** Shows whether the button is visible. Set to false by default. */
  isVisible: boolean;

  /** A method that sets the button press event handler. An alias for `Telegram.WebApp.onEvent('backButtonClicked', callback)` */
  onClick(callback: () => void): this;

  /** A method to make the button active and visible. */
  show(): this;

  /** A method to hide the button. */
  hide(): this;

  /** A method that removes the button press event handler. An alias for `Telegram.WebApp.offEvent('backButtonClicked', callback)` */
  offClick(callback: () => void): this;
}

/** This object represents the system-defined safe area insets, providing padding values to ensure content remains within visible boundaries, avoiding overlap with system UI elements like notches or navigation bars. */
interface SafeAreaInset {
  /** The bottom inset in pixels, representing the space to avoid at the bottom of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-bottom)`. */
  bottom: number;
  /** The left inset in pixels, representing the space to avoid on the left side of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-left)`. */
  left: number;
  /** The right inset in pixels, representing the space to avoid on the right side of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-right)`. */
  right: number;
  /** The top inset in pixels, representing the space to avoid at the top of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-top)`. */
  top: number;
}

/** This object represents the content-defined safe area insets, providing padding values to ensure content remains within visible boundaries, avoiding overlap with Telegram UI elements. */
type ContentSafeAreaInset = SafeAreaInset;

/** This object describes additional settings for setting an emoji status. */
interface EmojiStatusParameters {
  /** Optional. The duration for which the status will remain set, in seconds. */
  duration?: number;
}

/** This object describes the parameters for the file download request. */
interface DownloadFileParameters {
  /** The suggested name for the downloaded file. */
  file_name: string;
  /** The HTTPS URL of the file to be downloaded. */
  url: string;
}

/**
 * - default, a button with the default style,
 * - ok, a button with the localized text “OK”,
 * - close, a button with the localized text “Close”,
 * - cancel, a button with the localized text “Cancel”,
 * - destructive, a button with a style that indicates a destructive action (e.g. “Remove,” “Delete,” etc.).
 */
type PopupButtonType = 'cancel' | 'close' | 'default' | 'destructive' | 'ok';

/** This object describes the native popup button. */
interface PopupButton {
  /** Optional. Identifier of the button, 0-64 characters. Set to empty string by default.
   If the button is pressed, its id is returned in the callback and the popupClosed event. */
  id?: string;
  /** Optional. The text to be displayed on the button, 0-64 characters. Required if type is default or destructive. Irrelevant for other types. */
  text?: string;
  /** Optional. Type of the button. Set to default by default. */
  type?: PopupButtonType;
}

/** This object describes the native popup for scanning QR codes. */
export interface ScanQrPopupParameters {
  /** Optional. The text to be displayed under the 'Scan QR' heading, 0-64 characters. */
  text?: string;
}

/** This object describes a widget link to be included in the story. */
export interface StoryWidgetLink {
  /** Optional. The name to be displayed for the widget link, 0-48 characters. */
  name?: string;
  /** The URL to be included in the story. */
  url: string;
}

/** This object describes additional sharing settings for the native story editor. */
export interface StoryShareParameters {
  /** Optional. The caption to be added to the media, 0-200 characters for regular users and 0-2048 characters for premium subscribers. */
  text?: string;
  /** Optional. An object that describes a widget link to be included in the story. Note that only premium subscribers can post stories with links. */
  widget_link?: StoryWidgetLink;
}

export interface ThemeParameters {
  /** Optional. Bot API 7.0+ Accent text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-accent-text-color). */
  accent_text_color?: string;
  /** Optional. Background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-bg-color). */
  bg_color?: string;
  /** Optional. Bot API 7.10+ Bottom background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-bottom-bar-bg-color). */
  bottom_bar_bg_color?: string;
  /** Optional. Button color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-button-color). */
  button_color?: string;
  /** Optional. Button text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-button-text-color). */
  button_text_color?: string;
  /** Optional. Bot API 7.0+ Text color for destructive actions in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-destructive-text-color). */
  destructive_text_color?: string;
  /** Optional. Bot API 7.0+ Header background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-header-bg-color). */
  header_bg_color?: string;
  /** Optional. Hint text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-hint-color). */
  hint_color?: string;
  /** Optional. Link color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-link-color). */
  link_color?: string;
  /** Optional. Bot API 6.1+ Secondary background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-secondary-bg-color). */
  secondary_bg_color?: string;
  /** Optional. Bot API 7.0+ Background color for the section in the #RRGGBB format. It is recommended to use this in conjunction with secondary_bg_color. also, available as the CSS variable var(--tg-theme-section-bg-color). */
  section_bg_color?: string;
  /** Optional. Bot API 7.0+ Header text color for the section in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-section-header-text-color). */
  section_header_text_color?: string;
  /** Optional. Bot API 7.6+ Section separator color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-section-separator-color). */
  section_separator_color?: string;
  /** Optional. Bot API 7.0+ Subtitle text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-subtitle-text-color). */
  subtitle_text_color?: string;
  /** Optional. Main text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-text-color). */
  text_color?: string;
}

export interface TelegramWebApp {
  readonly Accelerometer: Accelerometer;
  /* Controls */
  readonly BackButton: BackButton;
  readonly backgroundColor: string;
  readonly BiometricManager: BiometricManager;
  readonly bottomBarColor: string;
  readonly CloudStorage: CloudStorage;
  /* Theme & layout */
  readonly colorScheme: ColorScheme;
  readonly contentSafeAreaInset: ContentSafeAreaInset;
  readonly DeviceOrientation: DeviceOrientation;
  readonly DeviceStorage: DeviceStorage;
  readonly Gyroscope: Gyroscope;
  /* Subsystems */
  readonly HapticFeedback: HapticFeedback;
  /* Colors (READ returns #RRGGBB; use setters below to assign keywords) */
  readonly headerColor: string;
  readonly initData: string;
  readonly initDataUnsafe: WebAppInitData;
  readonly isActive: boolean;
  /* Toggles / state */
  isClosingConfirmationEnabled: boolean;
  readonly isExpanded: boolean;
  readonly isFullscreen: boolean;
  isOrientationLocked: boolean;
  isVerticalSwipesEnabled: boolean;
  readonly LocationManager: LocationManager;
  readonly MainButton: BottomButton;
  readonly platform: string;
  readonly safeAreaInset: SafeAreaInset;
  readonly SecondaryButton: BottomButton;
  readonly SecureStorage: SecureStorage;
  readonly SettingsButton: SettingsButton;
  readonly themeParams: ThemeParameters;
  readonly version: string;
  readonly viewportHeight: number;
  readonly viewportStableHeight: number;

  addToHomeScreen(): void;

  checkHomeScreenStatus(
    callback?: (status: 'added' | 'missed' | 'unknown' | 'unsupported') => void,
  ): void;

  close(): void;

  closeScanQrPopup(): void;

  disableClosingConfirmation(): void;

  disableVerticalSwipes(): void;

  /* Files & clipboard */
  downloadFile(parameters: DownloadFileParameters, callback?: (accepted: boolean) => void): void;

  /* Confirmation & gestures */
  enableClosingConfirmation(): void;

  enableVerticalSwipes(): void;

  exitFullscreen(): void;

  expand(): void;

  hideKeyboard(): void;

  /* Version helper */
  isVersionAtLeast(version: string): boolean;

  lockOrientation(): void;

  offEvent(eventType: string, handler: (...arguments_: any[]) => void): void;

  /* Events */
  onEvent(eventType: string, handler: (...arguments_: any[]) => void): void;

  /* Payments & share */
  openInvoice(url: string, callback?: (status: 'cancelled' | 'failed' | 'paid') => void): void;

  /* Links */
  openLink(url: string, options?: OpenLinkOptions): void;

  openTelegramLink(url: string): void;

  readTextFromClipboard(callback?: (text: string | null) => void): void;

  /* Lifecycle */
  ready(): void;

  requestEmojiStatusAccess(callback?: (allowed: boolean) => void): void;

  requestWriteAccess(callback?: (allowed: boolean) => void): void;

  requestContact(callback?: (allowed: boolean) => void): void;

  requestFullscreen(): void;

  /* Bot channel */
  sendData(data: string): void;

  setBackgroundColor(color: Extract<CssColorKey, 'bg_color' | 'secondary_bg_color'> | string): void;

  setBottomBarColor(color: CssColorKey | string): void;

  /* Emoji status (8.0+) */
  setEmojiStatus(
    custom_emoji_id: string,
    parameters?: EmojiStatusParameters,
    callback?: (ok: boolean) => void,
  ): void;

  /* Color setters (accept keys or #RRGGBB) */
  setHeaderColor(color: Extract<CssColorKey, 'bg_color' | 'secondary_bg_color'> | string): void;

  shareMessage(message_id: number | string, callback?: (sent: boolean) => void): void;

  shareToStory(media_url: string, parameters?: StoryShareParameters): void;

  showAlert(message: string, callback?: () => void): void;

  showConfirm(message: string, callback?: (ok: boolean) => void): void;

  /* QR / popups */
  showPopup(
    parameters: { buttons?: PopupButton[]; message: string; title?: string },
    callback?: (buttonId: string | null) => void,
  ): void;

  showScanQrPopup(
    parameters: ScanQrPopupParameters,
    callback?: (data: string | null) => boolean,
  ): void;

  /* Inline mode (6.7+) */
  switchInlineQuery(query?: string, choose_chat_types?: ChooseChatType[]): void;

  unlockOrientation(): void;
}

interface TelegramWebView {
  initParams: Record<string, string>;
  isIframe: boolean;

  callEventCallbacks(
    eventType: string,
    function_: (callback: (et: string, ed?: any) => void) => void,
  ): void;

  offEvent(eventType: string, callback: (eventType: string, eventData?: any) => void): void;

  onEvent(eventType: string, callback: (eventType: string, eventData?: any) => void): void;

  postEvent(eventType: string, callback?: (error?: any) => void, eventData?: any): void;

  receiveEvent(eventType: string, eventData?: any): void;
}

interface TelegramUtils {
  sessionStorageGet<T = any>(key: string): T | null;

  sessionStorageSet(key: string, value: any): boolean;

  urlAppendHashParams(url: string, addHash: string): string;

  urlParseHashParams(hash: string): Record<string, string>;

  urlParseQueryString(qs: string): Record<string, string | null>;

  urlSafeDecode(s: string): string;
}

declare global {
  interface Window {
    Telegram: {
      TelegramGameProxy?: {
        receiveEvent: (eventType: string, eventData?: any) => void;
      };
      TelegramGameProxy_receiveEvent?: (eventType: string, eventData?: any) => void;
      Utils: TelegramUtils;

      WebApp: TelegramWebApp;
      WebView: TelegramWebView;
    };
    TelegramWebviewProxy?: {
      postEvent: (eventType: string, data: string) => void;
    };
  }
}

export {};
