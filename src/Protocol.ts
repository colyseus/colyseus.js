// Use codes between 0~127 for lesser throughput (1 byte)

export enum Protocol {
    // Room-related (10~19)
    HANDSHAKE = 9,
    JOIN_ROOM = 10,
    ERROR = 11,
    LEAVE_ROOM = 12,
    ROOM_DATA = 13,
    ROOM_STATE = 14,
    ROOM_STATE_PATCH = 15,
    ROOM_DATA_SCHEMA = 16,
    ROOM_DATA_BYTES = 17,
}

export enum ErrorCode {
    MATCHMAKE_NO_HANDLER = 4210,
    MATCHMAKE_INVALID_CRITERIA = 4211,
    MATCHMAKE_INVALID_ROOM_ID = 4212,
    MATCHMAKE_UNHANDLED = 4213,
    MATCHMAKE_EXPIRED = 4214,

    AUTH_FAILED = 4215,
    APPLICATION_ERROR = 4216,
}

export function utf8Read(view: number[], offset: number) {
  const length = view[offset++];

  var string = '', chr = 0;
  for (var i = offset, end = offset + length; i < end; i++) {
    var byte = view[i];
    if ((byte & 0x80) === 0x00) {
      string += String.fromCharCode(byte);
      continue;
    }
    if ((byte & 0xe0) === 0xc0) {
      string += String.fromCharCode(
        ((byte & 0x1f) << 6) |
        (view[++i] & 0x3f)
      );
      continue;
    }
    if ((byte & 0xf0) === 0xe0) {
      string += String.fromCharCode(
        ((byte & 0x0f) << 12) |
        ((view[++i] & 0x3f) << 6) |
        ((view[++i] & 0x3f) << 0)
      );
      continue;
    }
    if ((byte & 0xf8) === 0xf0) {
      chr = ((byte & 0x07) << 18) |
        ((view[++i] & 0x3f) << 12) |
        ((view[++i] & 0x3f) << 6) |
        ((view[++i] & 0x3f) << 0);
      if (chr >= 0x010000) { // surrogate pair
        chr -= 0x010000;
        string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
      } else {
        string += String.fromCharCode(chr);
      }
      continue;
    }
    throw new Error('Invalid byte ' + byte.toString(16));
  }
  return string;
}

// Faster for short strings than Buffer.byteLength
export function utf8Length(str: string = '') {
  let c = 0;
  let length = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length + 1;
}
