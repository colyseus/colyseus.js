// Use codes between 0~127 for lesser throughput (1 byte)

export enum Protocol {
    // User-related (0~8)
    USER_ID = 1,

    // Room-related (9~19)
    JOIN_REQUEST = 9,
    JOIN_ROOM = 10,
    JOIN_ERROR = 11,
    LEAVE_ROOM = 12,
    ROOM_DATA = 13,
    ROOM_STATE = 14,
    ROOM_STATE_PATCH = 15,

    // Match-making related (20~29)
    ROOM_LIST = 20,

    // Generic messages (50~60)
    BAD_REQUEST = 50,
}

export function utf8Read(view: DataView, offset: number) {
    const length = view.getUint8(offset++);

    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
      var byte = view.getUint8(i);
      if ((byte & 0x80) === 0x00) {
        string += String.fromCharCode(byte);
        continue;
      }
      if ((byte & 0xe0) === 0xc0) {
        string += String.fromCharCode(
          ((byte & 0x1f) << 6) |
          (view.getUint8(++i) & 0x3f)
        );
        continue;
      }
      if ((byte & 0xf0) === 0xe0) {
        string += String.fromCharCode(
          ((byte & 0x0f) << 12) |
          ((view.getUint8(++i) & 0x3f) << 6) |
          ((view.getUint8(++i) & 0x3f) << 0)
        );
        continue;
      }
      if ((byte & 0xf8) === 0xf0) {
        chr = ((byte & 0x07) << 18) |
          ((view.getUint8(++i) & 0x3f) << 12) |
          ((view.getUint8(++i) & 0x3f) << 6) |
          ((view.getUint8(++i) & 0x3f) << 0);
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