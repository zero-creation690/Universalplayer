declare global {
  interface Window {
    shaka: typeof import('shaka-player');
  }
}

// Basic Shaka Player types
declare namespace shaka {
  class Player {
    constructor(video: HTMLVideoElement);
    
    load(manifestUri: string): Promise<void>;
    destroy(): Promise<void>;
    
    getAudioLanguages(): Array<{
      language: string;
      role: string;
      audioChannelCount: number;
      label?: string;
    }>;
    
    getTextLanguages(): Array<{
      language: string;
      role: string;
      label?: string;
    }>;
    
    selectAudioLanguage(language: string): void;
    selectTextLanguage(language: string): void;
    setTextTrackVisibility(visible: boolean): void;
    
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    
    static isBrowserSupported(): boolean;
  }
  
  namespace util {
    class Error {
      static Code: {
        UNSUPPORTED_SCHEME: number;
        BAD_HTTP_STATUS: number;
        HTTP_ERROR: number;
        TIMEOUT: number;
        MALFORMED_DATA_URI: number;
        UNKNOWN_DATA_URI_ENCODING: number;
        REQUEST_FILTER_ERROR: number;
        RESPONSE_FILTER_ERROR: number;
        MALFORMED_XML: number;
        NETWORK_ERROR: number;
        TEXT_STREAM_NOT_FOUND: number;
        COULD_NOT_GUESS_MANIFEST_TYPE: number;
        COULD_NOT_GUESS_CONTENT_TYPE: number;
        NO_RECOGNIZED_KEY_SYSTEMS: number;
      };
      
      code: number;
      message: string;
      data: any[];
      handled: boolean;
      
      constructor(severity: number, category: number, code: number, ...args: any[]);
    }
  }
  
  namespace polyfill {
    function installAll(): void;
  }
}

export {};
