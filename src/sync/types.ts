export interface Property {
    holderType: 'var' | 'object' | 'map' | 'list' | 'key' | 'room';
    type?: any;
    remap?: string;
    variable?: string;
    addCallback?: Function;
    removeCallback?: Function;
}

export interface Synchable {
    properties?: Property[];
}
