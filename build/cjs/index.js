// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./legacy.js');
var Client = require('./Client.js');
var Protocol = require('./Protocol.js');
var Room = require('./Room.js');
var Auth = require('./Auth.js');
var SchemaSerializer = require('./serializer/SchemaSerializer.js');
var NoneSerializer = require('./serializer/NoneSerializer.js');
var Serializer = require('./serializer/Serializer.js');

Serializer.registerSerializer('schema', SchemaSerializer.SchemaSerializer);
Serializer.registerSerializer('none', NoneSerializer.NoneSerializer);

exports.Client = Client.Client;
Object.defineProperty(exports, 'ErrorCode', {
	enumerable: true,
	get: function () {
		return Protocol.ErrorCode;
	}
});
Object.defineProperty(exports, 'Protocol', {
	enumerable: true,
	get: function () {
		return Protocol.Protocol;
	}
});
exports.Room = Room.Room;
exports.Auth = Auth.Auth;
Object.defineProperty(exports, 'Platform', {
	enumerable: true,
	get: function () {
		return Auth.Platform;
	}
});
exports.SchemaSerializer = SchemaSerializer.SchemaSerializer;
exports.registerSerializer = Serializer.registerSerializer;
//# sourceMappingURL=index.js.map
