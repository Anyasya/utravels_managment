import React from 'react';

export const USER_TYPES = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    SUPERVISOR: 'SUPERVISOR',
}

export const NOTIFICATION_TYPES = {
    WARNING: 'warning',
    ERROR: 'error',
    SUCCESS: 'success',
    UPDATED: 'updated'
}

export const API_RESPONSE_CODES = {
    SERVER_ERROR: 500,
    VALIDATION_ERROR: 422,
    AUTH_ERROR: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNDEFINED_ERROR: 0
}

export const OBJECT_VIEW_TYPES = {
    CARD: 'card',
    ROW: 'row',
    STRING: 'str'
}

export const VIEW_TYPES = {
    KANBAN: 'KANBAN',
    LIST: 'LIST',
    TABLE: 'TABLE'
}

export const FIELD_TYPES = {
    //default types
    STRING: 'str',
    NUMBER: 'num',
    BOOLEAN: 'bool',
    DATETIME: 'time',
    // media types
    LOCATION: 'geo',
    IMAGE: 'img',
    AUDIO: 'aud',
    VIDEO: 'vid',
    DOCUMENT: 'doc',
    URL: 'url',
    HTML: 'html',
    // special types
    COMPUTED: 'comp',
    BUTTON: 'btn',
    TRIGGER: 'trig'
}

export const WIDGET_TYPES = {
    TAG_LIST: 'TAG_LIST',
    USER: 'USER',
    DEFAULT: 'DEFAULT',
    DATE: 'DATE',
    DATE_FROM: 'DATE_FROM'
}

export const EDIT_WIDGET = {
    DATE: 'date',
    DATE_RANGE: 'date_range',
    INPUT: 'input',
    DROPDOWN: 'dropdown'
}
