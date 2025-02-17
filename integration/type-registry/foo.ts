/* eslint-disable */
import { messageTypeRegistry } from './typeRegistry';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';

export const protobufPackage = 'foo';

export interface Foo {
  $type: 'foo.Foo';
  timestamp: Date | undefined;
}

export interface Foo2 {
  $type: 'foo.Foo2';
  timestamp: Date | undefined;
}

const baseFoo: object = { $type: 'foo.Foo' };

export const Foo = {
  $type: 'foo.Foo' as const,

  encode(message: Foo, writer: Writer = Writer.create()): Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Foo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFoo } as Foo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Foo {
    const message = { ...baseFoo } as Foo;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    } else {
      message.timestamp = undefined;
    }
    return message;
  },

  toJSON(message: Foo): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Foo>): Foo {
    const message = { ...baseFoo } as Foo;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Foo.$type, Foo);

const baseFoo2: object = { $type: 'foo.Foo2' };

export const Foo2 = {
  $type: 'foo.Foo2' as const,

  encode(message: Foo2, writer: Writer = Writer.create()): Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Foo2 {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFoo2 } as Foo2;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Foo2 {
    const message = { ...baseFoo2 } as Foo2;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    } else {
      message.timestamp = undefined;
    }
    return message;
  },

  toJSON(message: Foo2): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Foo2>): Foo2 {
    const message = { ...baseFoo2 } as Foo2;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Foo2.$type, Foo2);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { $type: 'google.protobuf.Timestamp', seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
